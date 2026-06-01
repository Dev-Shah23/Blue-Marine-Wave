/**
 * Vercel Serverless Function — POST /api/contact  (booking / quote intake)
 *
 * This is the transaction for a broker-mediated workflow: the broker shows the
 * site to a client and submits the booking here, so a submission must be
 * captured, confirmed, and NEVER silently lost. To that end it:
 *
 *   1. validates server-side (the real gate) + honeypot + consent + payload caps
 *   2. mints a booking REFERENCE (BWM-XXXXXX) returned to the client as proof
 *   3. delivers to every configured sink, redundantly:
 *        - broker notification email      (Resend → LEAD_NOTIFY_EMAIL)
 *        - client confirmation email      (Resend → the client, opt-in)
 *        - durable webhook                (BOOKING_WEBHOOK_URL → Sheet/Zapier/Slack)
 *   4. always logs the full booking + reference (last-resort record in Vercel logs)
 *   5. returns 502 only if sinks were configured AND every one failed, so the
 *      broker knows immediately to retry / record it manually.
 *
 * Zero npm deps — uses global fetch (Node 18+).
 *
 * Env (Vercel → Settings → Environment Variables):
 *   RESEND_API_KEY          Resend key (re_…). Enables the emails.
 *   LEAD_NOTIFY_EMAIL       Broker inbox.           Default: export@bluewavemarine.in
 *   LEAD_FROM_EMAIL         Verified Resend sender. Default: onboarding@resend.dev
 *   SEND_CLIENT_CONFIRMATION  "true" to also email the client a copy.
 *   BOOKING_WEBHOOK_URL     Durable sink (e.g. a Google Apps Script that appends
 *                           the booking to a Sheet). Recommended for an audit log.
 *   ALLOWED_ORIGIN          Locks CORS to one origin. Default "*".
 */

const MAX_FIELD = 2000;
const MAX_MESSAGE = 5000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const REQUIRED = [
  "name",
  "company",
  "email",
  "phone",
  "destination_country",
  "product_interest",
  "quantity",
];

function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", process.env.ALLOWED_ORIGIN || "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Vary", "Origin");
}

function readBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string" && req.body.length) {
    try {
      return JSON.parse(req.body);
    } catch {
      return null;
    }
  }
  return {};
}

function makeReference() {
  const t = Date.now().toString(36).toUpperCase().slice(-5);
  const r = Math.random().toString(36).toUpperCase().slice(2, 4);
  return `BWM-${t}${r}`;
}

function validate(data) {
  const errors = [];
  const clean = {};

  for (const key of REQUIRED) {
    const val = typeof data[key] === "string" ? data[key].trim() : "";
    if (!val) errors.push(`${key} is required`);
    else if (val.length > MAX_FIELD) errors.push(`${key} is too long`);
    clean[key] = val.slice(0, MAX_FIELD);
  }

  if (clean.email && !EMAIL_RE.test(clean.email)) {
    errors.push("email is not a valid address");
  }

  clean.destination_port = String(data.destination_port || "").trim().slice(0, MAX_FIELD);
  clean.message = String(data.message || "").trim().slice(0, MAX_MESSAGE);

  if (data.consent !== true && data.consent !== "true") {
    errors.push("consent is required");
  }
  clean.consent = true;

  return { errors, clean };
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
  ));
}

function rows(lead, ref) {
  return [
    ["Booking reference", ref],
    ["Name", lead.name],
    ["Company", lead.company],
    ["Email", lead.email],
    ["Phone", lead.phone],
    ["Destination country", lead.destination_country],
    ["Destination port", lead.destination_port || "—"],
    ["Product of interest", lead.product_interest],
    ["Estimated quantity", lead.quantity],
    ["Message", lead.message || "—"],
  ];
}

function table(lead, ref) {
  const text = rows(lead, ref).map(([k, v]) => `${k}: ${v}`).join("\n");
  const html =
    `<table cellpadding="6" style="border-collapse:collapse">` +
    rows(lead, ref)
      .map(([k, v]) => `<tr><td style="font-weight:600">${escapeHtml(k)}</td><td>${escapeHtml(v)}</td></tr>`)
      .join("") +
    `</table>`;
  return { text, html };
}

async function sendEmail({ to, subject, text, html, replyTo }) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { ok: false, skipped: true };
  const from = process.env.LEAD_FROM_EMAIL || "onboarding@resend.dev";
  const resp = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: `Blue Wave Marine <${from}>`,
      to: [to],
      reply_to: replyTo,
      subject,
      text,
      html,
    }),
  });
  if (!resp.ok) throw new Error(`Resend ${resp.status}: ${await resp.text()}`);
  return { ok: true };
}

async function postWebhook(payload) {
  const url = process.env.BOOKING_WEBHOOK_URL;
  if (!url) return { ok: false, skipped: true };
  const resp = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!resp.ok) throw new Error(`Webhook ${resp.status}`);
  return { ok: true };
}

/**
 * Deliver to every configured sink. Returns { configured, delivered, sinks }.
 * A sink that isn't configured (skipped) doesn't count against delivery.
 */
async function deliver(lead, ref) {
  const broker = process.env.LEAD_NOTIFY_EMAIL || "export@bluewavemarine.in";
  const { text, html } = table(lead, ref);
  const sinks = [];

  const attempt = async (name, fn) => {
    try {
      const r = await fn();
      if (!r.skipped) sinks.push({ name, ok: true });
    } catch (err) {
      console.error(`[contact] sink "${name}" failed:`, err.message);
      sinks.push({ name, ok: false });
    }
  };

  // 1. Broker notification (primary).
  await attempt("broker_email", () =>
    sendEmail({
      to: broker,
      replyTo: lead.email,
      subject: `Booking ${ref}: ${lead.product_interest} — ${lead.company}`,
      text: `New booking / quote request.\n\n${text}\n\nConsent given: yes`,
      html: `<h2>New booking / quote request — ${escapeHtml(ref)}</h2>${html}<p style="color:#888;font-size:12px">Consent given: yes</p>`,
    })
  );

  // 2. Client confirmation (opt-in) — gives the client a copy + the reference.
  if (process.env.SEND_CLIENT_CONFIRMATION === "true") {
    await attempt("client_email", () =>
      sendEmail({
        to: lead.email,
        replyTo: broker,
        subject: `Your Blue Wave Marine request — ${ref}`,
        text:
          `Hi ${lead.name},\n\nThank you for your request. Your reference is ${ref}. ` +
          `Our team will contact you within 24 hours.\n\nSummary:\n${text}\n\n— Blue Wave Marine`,
        html:
          `<p>Hi ${escapeHtml(lead.name)},</p><p>Thank you for your request. Your reference is ` +
          `<strong>${escapeHtml(ref)}</strong>. Our team will contact you within 24 hours.</p>${html}<p>— Blue Wave Marine</p>`,
      })
    );
  }

  // 3. Durable webhook (recommended — append to a Sheet for an audit log).
  await attempt("webhook", () =>
    postWebhook({ reference: ref, submittedAt: new Date().toISOString(), ...lead })
  );

  const configured = sinks.length;
  const delivered = sinks.filter((s) => s.ok).length;
  return { configured, delivered, sinks };
}

module.exports = async function handler(req, res) {
  setCors(res);

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST, OPTIONS");
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const data = readBody(req);
  if (data === null) {
    return res.status(400).json({ success: false, message: "Invalid JSON body" });
  }

  // Honeypot: real users never fill this hidden field. Pretend success, drop it.
  if (typeof data.company_website === "string" && data.company_website.trim() !== "") {
    console.log("[contact] honeypot triggered — dropping submission");
    return res.status(200).json({ success: true, message: "Thank you! We'll be in touch." });
  }

  const { errors, clean } = validate(data);
  if (errors.length) {
    return res.status(400).json({ success: false, message: errors[0], errors });
  }

  const reference = makeReference();
  // Last-resort durable record — always written, even if every sink fails.
  console.log("[contact] booking", reference, JSON.stringify(clean));

  const { configured, delivered } = await deliver(clean, reference);

  // Sinks were configured but every one failed → tell the broker to act.
  if (configured > 0 && delivered === 0) {
    return res.status(502).json({
      success: false,
      reference,
      message: `We couldn't deliver booking ${reference}. Please note this reference and email export@bluewavemarine.in.`,
    });
  }

  return res.status(200).json({
    success: true,
    reference,
    delivered,
    message: `Thank you! Your request has been submitted (reference ${reference}). We will contact you within 24 hours.`,
  });
};
