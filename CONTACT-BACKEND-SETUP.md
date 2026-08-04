# Mae Ann Portfolio — Google Apps Script Contact Backend Setup

This project is already connected to a same-origin Vercel endpoint at:

`/api/contact`

The Vercel endpoint securely forwards valid submissions to the included Google Apps Script backend.

## Required sender account

Create, authorize, and deploy the Apps Script while signed in as:

`maeannbodiongan.ie@gmail.com`

The script does not spoof a sender address. When deployed correctly using **Execute as Me**, outgoing notification and confirmation emails are sent by the Google account that deployed the script.

## Part 1 — Create the Google Apps Script backend

1. Sign in to Google using `maeannbodiongan.ie@gmail.com`.
2. Open `https://script.google.com`.
3. Click **New project**.
4. Rename it to `Mae Ann Portfolio Contact Backend`.
5. Open the included file:
   - `google-apps-script/Code.gs`
6. Copy all its contents and replace the default Apps Script code.
7. In Apps Script, open **Project Settings**.
8. Enable **Show "appsscript.json" manifest file in editor**.
9. Open `appsscript.json` in the editor.
10. Replace it with the included:
    - `google-apps-script/appsscript.json`
11. Save the project.

## Part 2 — Authorize and create the shared secret

1. From the function dropdown, select `setupContactBackend`.
2. Click **Run**.
3. Approve the Google authorization prompts using `maeannbodiongan.ie@gmail.com`.
4. Confirm that a test email arrives in the same Gmail inbox.
5. Open **Execution log**.
6. Copy the value shown after:

`CONTACT_FORM_SECRET=`

Keep this value private. Never place it in React files or any `VITE_...` variable.

## Part 3 — Deploy as a public Web App

1. Click **Deploy** → **New deployment**.
2. Select **Web app**.
3. Description: `Mae Ann Portfolio Contact Backend`.
4. Set **Execute as** to **Me**.
5. Confirm that the displayed account is `maeannbodiongan.ie@gmail.com`.
6. Set **Who has access** to **Anyone**.
7. Click **Deploy**.
8. Copy the Web App URL ending in `/exec`.

Do not use the testing URL ending in `/dev`.

## Part 4 — Add the Vercel environment variables

Open the Vercel project:

**Settings** → **Environment Variables**

Add these two variables:

### `GOOGLE_APPS_SCRIPT_CONTACT_URL`

Value: the Google Apps Script Web App URL ending in `/exec`.

### `CONTACT_FORM_SECRET`

Value: the exact secret printed by `setupContactBackend`.

Enable both variables for:

- Production
- Preview
- Development, when needed

Save the variables, then redeploy the latest Vercel deployment.

## Part 5 — Test the live contact form

1. Open the deployed website.
2. Complete all required contact fields.
3. Click **Send Message**.
4. Expected result:
   - The website displays **Message Sent**.
   - `maeannbodiongan.ie@gmail.com` receives the complete inquiry.
   - The visitor receives a professional confirmation email sent by Mae Ann's deployment account.
   - Replying to Mae Ann's notification goes directly to the visitor's submitted email.

## Updated website files

- `src/components/sections/Contact.tsx`
- `api/contact.js`
- `.env.example`
- `google-apps-script/Code.gs`
- `google-apps-script/appsscript.json`
- `CONTACT-BACKEND-SETUP.md`

## Important security behavior

- The Apps Script shared secret is stored only in Apps Script Script Properties and Vercel server-side environment variables.
- The secret is never exposed in browser JavaScript.
- A hidden honeypot blocks basic form bots.
- The backend validates and sanitizes all fields.
- Repeat submissions from the same email are temporarily rate-limited.
- Contact messages are emailed; this implementation does not save them to a public database.
