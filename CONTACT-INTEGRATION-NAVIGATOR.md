# Contact Integration — File Navigator

Use this navigator when updating the project.

## Files you must upload/commit

```text
Mae-Ann-s-Web-main/
│
├── api/
│   └── contact.js                         ← REPLACE / COMMIT
│
├── google-apps-script/
│   ├── Code.gs                            ← COPY INTO GOOGLE APPS SCRIPT
│   └── appsscript.json                    ← COPY INTO GOOGLE APPS SCRIPT
│
├── src/
│   └── components/
│       └── sections/
│           └── Contact.tsx                ← REPLACE / COMMIT
│
├── .env.example                           ← REPLACE / COMMIT (example only)
├── CONTACT-BACKEND-SETUP.md                ← REPLACE / COMMIT
└── CONTACT-INTEGRATION-NAVIGATOR.md        ← NEW GUIDE
```

## Files intentionally NOT changed

Do not replace the rest of the portfolio just for this contact repair.

Examples that remain as they were:

```text
src/App.tsx
src/index.css
src/components/layout/Navbar.tsx
src/components/layout/Footer.tsx
src/components/sections/About.tsx
src/components/sections/Achievements.tsx
src/components/sections/Experience.tsx
src/components/sections/Hero.tsx
src/components/sections/Highlights.tsx
src/components/sections/Journey.tsx
src/components/sections/Projects.tsx
src/components/sections/Services.tsx
src/components/sections/Skills.tsx
src/components/sections/Testimonials.tsx
src/data/content.ts
vite.config.ts
package.json
```

## What each changed file does

| File | Action | Purpose |
|---|---|---|
| `src/components/sections/Contact.tsx` | Replace | Existing UI + validation + loading/success/error + Reference ID + duplicate protection |
| `api/contact.js` | Replace | Secure same-origin Vercel bridge to Apps Script |
| `google-apps-script/Code.gs` | Replace in Apps Script | Writes Inquiries, sends both emails, logs email results, generates Reference ID |
| `google-apps-script/appsscript.json` | Replace in Apps Script | Adds required Sheets/email authorization scopes |
| `.env.example` | Replace | Documents exact private Vercel variables |
| `CONTACT-BACKEND-SETUP.md` | Replace | Exact deployment/testing instructions |
| `CONTACT-INTEGRATION-NAVIGATOR.md` | New | This file map |

## Vercel environment variables

These are server-side only:

```text
GOOGLE_APPS_SCRIPT_CONTACT_URL=https://script.google.com/macros/s/.../exec
CONTACT_FORM_SECRET=...
```

Never add either value to `src/` and never rename them to `VITE_...`.

## Google Sheet

```text
Spreadsheet ID:
1hFcVvnHDi1pW9b1i1q1sEOOz5dtEtuxBAy5JxMTdu0Y

Existing tab:
Inquiries

Auto-created tab:
Email Logs
```
