/**
 * Vercel Serverless Function — POST /api/contact
 *
 * Receives the "Request a Quote" lead form and emails it to the business.
 * Lives in the same repo as the frontend, so it deploys with it and the form
 * can post same-origin (no separate backend service or REACT_APP_BACKEND_URL).
 *
 * Hardening:
 *   - method allow-list (POST only) + CORS preflight
 *   - server-side validation (the real gate — the client can be bypassed)
 *   - honeypot field (`company_website`) to absorb dumb bots
 *   - payload size caps to blunt abuse
 *   - explicit GDPR consent required and recorded
 *
 * Email delivery uses Resend (https://resend.com) when RESEND_API_KEY is set;
 * with no key it logs the lead to the function logs and still returns success
 * so the form works in preview/dev. Zero npm deps — uses global fetch (Node 18+).
 *
 * Required env (Vercel → Project → Settings → Environment Variables):
 *   RESEND_API_KEY     Resend API key (re_...). Without it, leads are logged only.
 *   LEAD_NOTIFY_EMAIL  Where leads are sent.   Default: export@bluewavemarine.in
 *   LEAD_FROM_EMAIL    Verified Resend sender.  Default: onboarding@resend.dev
 *   ALLOWED_ORIGIN     Locks CORS to one origin. Default: same-origin / "*".
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
  const origin = process.env.ALLOWED_ORIGIN || "*";
  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Vary", "Origin");
}

function readBody(req) {
  // Vercel parses JSON bodies into req.body; fall back to manual parse.
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

  // Optional fields
  clean.destination_port = String(data.destination_port || "").trim().slice(0, MAX_FIELD);
  clean.message = String(data.message || "").trim().slice(0, MAX_MESSAGE);

  // GDPR: consent must be explicit and true.
  if (data.consent !== true && data.consent !== "true") {
    errors.push("consent is required");
  }
  clean.consent = true;

  return { errors, clean };
}

function leadEmail(lead) {
  const rows = [
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
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html =
    `<h2>New quote request — Blue Wave Marine</h2><table cellpadding="6">` +
    rows
      .map(
        ([k, v]) =>
          `<tr><td style="font-weight:600">${k}</td><td>${escapeHtml(String(v))}</td></tr>`
      )
      .join("") +
    `</table><p style="color:#888;font-size:12px">Consent given: yes</p>`;
  return { text, html };
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (c) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
  ));
}

async function sendViaResend(lead) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_EMAIL || "export@bluewavemarine.in";
  const from = process.env.LEAD_FROM_EMAIL || "onboarding@resend.dev";

  if (!key) {
    // Not configured yet — don't lose the lead; surface it in the function logs.
    console.log("[contact] lead received (email not configured):", JSON.stringify(lead));
    return { delivered: false };
  }

  const { text, html } = leadEmail(lead);
  const resp = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: `Blue Wave Marine <${from}>`,
      to: [to],
      reply_to: lead.email,
      subject: `Quote request: ${lead.product_interest} — ${lead.company}`,
      text,
      html,
    }),
  });

  if (!resp.ok) {
    const detail = await resp.text();
    throw new Error(`Resend failed (${resp.status}): ${detail}`);
  }
  return { delivered: true };
}

module.exports = async function handler(req, res) {
  setCors(res);

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST, OPTIONS");
    res.status(405).json({ success: false, message: "Method not allowed" });
    return;
  }

  const data = readBody(req);
  if (data === null) {
    res.status(400).json({ success: false, message: "Invalid JSON body" });
    return;
  }

  // Honeypot: real users never fill this hidden field. Pretend success, drop it.
  if (typeof data.company_website === "string" && data.company_website.trim() !== "") {
    console.log("[contact] honeypot triggered — dropping submission");
    res.status(200).json({ success: true, message: "Thank you! We'll be in touch." });
    return;
  }

  const { errors, clean } = validate(data);
  if (errors.length) {
    res.status(400).json({ success: false, message: errors[0], errors });
    return;
  }

  try {
    const result = await sendViaResend(clean);
    res.status(200).json({
      success: true,
      delivered: result.delivered,
      message: "Thank you! Your quote request has been submitted. We will contact you within 24 hours.",
    });
  } catch (err) {
    console.error("[contact] delivery error:", err.message);
    res.status(502).json({
      success: false,
      message: "We couldn't send your request right now. Please email export@bluewavemarine.in directly.",
    });
  }
};
