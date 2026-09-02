# Contact automation

The website posts validated inquiries to `/api/contact`. The endpoint supports:

1. Supabase storage through `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`.
2. The existing Google Apps Script email/Sheets flow through
   `GOOGLE_APPS_SCRIPT_CONTACT_URL` and `CONTACT_FORM_SECRET`.
3. An optional n8n notification through `N8N_CONTACT_WEBHOOK_URL` and
   `N8N_CONTACT_WEBHOOK_SECRET`.

At least one of Supabase or Google Apps Script must be configured. When both are
configured, the endpoint attempts both so the existing email workflow remains
available while Supabase becomes the central inquiry record.

## Supabase setup

Run `supabase/portfolio_inquiries.sql` once in the Supabase SQL Editor. The table
has RLS enabled and grants no access to anonymous or authenticated browser roles.
Keep the service role key in Vercel server-side environment variables only.

## n8n payload

The optional webhook receives the validated inquiry fields plus `referenceId`.
When `N8N_CONTACT_WEBHOOK_SECRET` is configured, it is sent in the
`X-Portfolio-Webhook-Secret` header for verification inside n8n.
