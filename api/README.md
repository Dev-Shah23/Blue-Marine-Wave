# `/api` — Vercel Serverless Functions

This folder is deployed by Vercel as serverless functions **alongside** the React
site (Vercel auto-detects `/api/*.js` for any framework, including Create-React-App).
No separate backend service is needed.

## `POST /api/contact` — booking / quote intake

Receives the booking form (`src/components/Contact.js`). Because it ships in this
repo, the frontend posts **same-origin** (`/api/contact`) — no `REACT_APP_BACKEND_URL`
required.

This is the transaction in the broker-mediated flow (the broker books on the client's
behalf), so it's built so a booking is **never silently lost**:

- mints a booking **reference** (`BWM-XXXXXX`) returned to the client as proof;
- delivers **redundantly** to every configured sink — broker email, optional client
  confirmation email, and an optional durable **webhook** (Sheet/Zapier/Slack);
- **always logs** the full booking + reference (last-resort record in the function logs);
- returns **502 only if every configured sink failed**, with the reference, so the
  broker knows to record it manually.

**Also hardened:** POST-only + CORS preflight, server-side validation, honeypot
(`company_website`), payload caps, and required GDPR consent.

### Environment variables (Vercel → Project → Settings → Environment Variables)

| Var | Required | Default | Purpose |
|-----|----------|---------|---------|
| `RESEND_API_KEY` | for email | — | [Resend](https://resend.com) API key (`re_…`). Without it, bookings are logged only and the form still returns success. |
| `LEAD_NOTIFY_EMAIL` | no | `export@bluewavemarine.in` | Broker inbox that receives bookings. |
| `LEAD_FROM_EMAIL` | no | `onboarding@resend.dev` | Verified Resend sender. Use a verified domain in production. |
| `SEND_CLIENT_CONFIRMATION` | no | `false` | `"true"` also emails the client a copy with their reference. |
| `BOOKING_WEBHOOK_URL` | recommended | — | Durable bookings log — a URL that records each booking. **The audit trail; see recipe below.** |
| `ALLOWED_ORIGIN` | no | `*` | Lock CORS to your site origin (e.g. `https://bluewavemarine.in`). |

### Durable bookings log via Google Sheets (5-minute recipe)

So every booking lands in a spreadsheet the broker can open anywhere:

1. Create a Google Sheet with a header row: `reference, submittedAt, name, company, email, phone, destination_country, destination_port, product_interest, quantity, message`.
2. Extensions → **Apps Script**, paste:
   ```js
   function doPost(e) {
     const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
     const b = JSON.parse(e.postData.contents);
     sheet.appendRow([b.reference, b.submittedAt, b.name, b.company, b.email,
       b.phone, b.destination_country, b.destination_port, b.product_interest,
       b.quantity, b.message]);
     return ContentService.createTextOutput("ok");
   }
   ```
3. **Deploy → New deployment → Web app**, execute as *you*, access *Anyone*. Copy the
   `/exec` URL into `BOOKING_WEBHOOK_URL` in Vercel.

### Local development

```bash
npm i -g vercel        # one time
vercel dev             # serves the CRA app + /api functions on http://localhost:3000
```

Then the form (running same-origin) will hit `http://localhost:3000/api/contact`.

### Verifying the function logic (no browser needed)

The handler is a plain Node function, so it can be unit-tested by importing it and
calling it with a mock `req`/`res`. See the audit notes for an example harness; all
paths (valid, missing fields, no consent, bad email, honeypot, wrong method) are
exercised.

### Follow-ups worth adding
- **Real rate limiting** (per-IP) via Vercel KV / Upstash — serverless instances are
  ephemeral, so in-memory throttling doesn't hold across invocations.
- Persist leads (Postgres/Airtable/Sheets) in addition to email, so none are lost.
