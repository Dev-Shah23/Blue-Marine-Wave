# `/api` — Vercel Serverless Functions

This folder is deployed by Vercel as serverless functions **alongside** the React
site (Vercel auto-detects `/api/*.js` for any framework, including Create-React-App).
No separate backend service is needed.

## `POST /api/contact`

Receives the "Request a Quote" lead form (`src/components/Contact.js`) and emails
it to the business. Because it ships in this repo, the frontend posts **same-origin**
(`/api/contact`) — no `REACT_APP_BACKEND_URL` required.

**Hardening built in:** POST-only + CORS preflight, server-side validation (the real
gate), a honeypot field (`company_website`) that silently absorbs bots, payload size
caps, and an explicit GDPR consent requirement.

### Environment variables (Vercel → Project → Settings → Environment Variables)

| Var | Required | Default | Purpose |
|-----|----------|---------|---------|
| `RESEND_API_KEY` | for email | — | [Resend](https://resend.com) API key (`re_…`). **Without it, leads are written to the function logs and the form still returns success** (handy for preview/dev). |
| `LEAD_NOTIFY_EMAIL` | no | `export@bluewavemarine.in` | Inbox that receives leads. |
| `LEAD_FROM_EMAIL` | no | `onboarding@resend.dev` | Verified Resend sender. Use a verified domain in production. |
| `ALLOWED_ORIGIN` | no | `*` | Lock CORS to your site origin (e.g. `https://bluewavemarine.in`). |

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
