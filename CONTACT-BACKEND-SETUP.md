# Mae Ann Portfolio — Contact Form / Google Sheets / Email Setup

## Final architecture

```text
Portfolio Contact Form
        ↓
React Contact.tsx
        ↓
POST /api/contact
        ↓
Vercel serverless bridge
        ↓
Google Apps Script Web App
        ├── Google Sheet: Mae Ann Portfolio Contact Inquiries
        │     ├── Inquiries
        │     └── Email Logs (auto-created if missing)
        └── Google email service
              ├── Visitor Confirmation
              └── Mae Ann Notification
```

The browser does **not** call Apps Script directly. This intentionally keeps the shared secret server-side and avoids browser-to-Apps-Script CORS/preflight problems.

## Fixed Google backend

Spreadsheet ID:

`1hFcVvnHDi1pW9b1i1q1sEOOz5dtEtuxBAy5JxMTdu0Y`

Spreadsheet title:

`Mae Ann Portfolio Contact Inquiries`

Existing tab:

`Inquiries`

Required sending/deployment account:

`maeannbodiongan.ie@gmail.com`

Timezone:

`Asia/Manila`

## Step 1 — Open Apps Script from the exact Google Sheet

1. Sign in to Google as `maeannbodiongan.ie@gmail.com`.
2. Open the exact spreadsheet `Mae Ann Portfolio Contact Inquiries`.
3. Confirm you are in the file with ID `1hFcVvnHDi1pW9b1i1q1sEOOz5dtEtuxBAy5JxMTdu0Y`.
4. Click **Extensions → Apps Script**.
5. Rename the project to `Mae Ann Portfolio Contact Backend` if desired.

Using **Extensions → Apps Script** from the correct spreadsheet reduces the chance of accidentally editing/deploying the wrong script project.

## Step 2 — Replace Code.gs

1. In Apps Script, open `Code.gs`.
2. Delete the old contents.
3. Copy the complete contents of:
   - `google-apps-script/Code.gs`
4. Paste it into Apps Script.
5. Save.

The code is hard-wired to the required spreadsheet ID and validates the exact `Inquiries` A:J header order before writing.

## Step 3 — Replace appsscript.json

1. Apps Script → **Project Settings**.
2. Enable **Show "appsscript.json" manifest file in editor**.
3. Return to **Editor**.
4. Open `appsscript.json`.
5. Replace it with the complete contents of:
   - `google-apps-script/appsscript.json`
6. Save.

The manifest includes permissions for:

- sending email,
- Google Sheets access,
- verifying the effective Google account.

## Step 4 — Run setupContactBackend

1. In the function dropdown, choose `setupContactBackend`.
2. Click **Run**.
3. Google will ask for authorization.
4. Approve the requested permissions while logged in as `maeannbodiongan.ie@gmail.com`.
5. Wait for the execution to finish successfully.

This setup function will:

- verify the exact `Inquiries` headers,
- create `Email Logs` if it does not exist,
- preserve an existing private `CONTACT_FORM_SECRET` or generate one if missing,
- send a setup test email,
- print the private secret to the execution log.

## Step 5 — Copy CONTACT_FORM_SECRET

1. Open the Apps Script **Execution log** for the successful `setupContactBackend` run.
2. Find:

```text
CONTACT_FORM_SECRET=...
```

3. Copy only the value after `=`.
4. Keep it private.
5. Never add it to React source code or a `VITE_...` variable.

If a prior screenshot showed **Unauthorized contact form request**, the usual repair is to make sure this exact current secret matches the Vercel `CONTACT_FORM_SECRET` value.

## Step 6 — Deploy the Apps Script Web App

### First deployment

1. Click **Deploy → New deployment**.
2. Click the gear / deployment type selector.
3. Choose **Web app**.
4. Description: `Mae Ann Portfolio Contact Backend`.
5. **Execute as:** `Me`.
6. Confirm the shown account is `maeannbodiongan.ie@gmail.com`.
7. **Who has access:** `Anyone`.
8. Click **Deploy**.
9. Copy the Web App URL.
10. It must look like:

```text
https://script.google.com/macros/s/DEPLOYMENT_ID/exec
```

Do **not** use a `/dev` test URL.

### Updating an existing deployment later

When you change `Code.gs` or `appsscript.json` after the Web App already exists:

1. Save the Apps Script changes.
2. Click **Deploy → Manage deployments**.
3. Select the active Web App deployment.
4. Click **Edit**.
5. Under Version, choose **New version**.
6. Click **Deploy**.
7. Keep using the same `/exec` deployment URL unless Google explicitly gives you a different active URL.

This is preferable to creating unnecessary extra deployments every time.

## Step 7 — Verify the /exec endpoint before Vercel

Paste the `/exec` URL into a browser.

Expected JSON-like response:

```json
{
  "success": true,
  "service": "Mae Ann Portfolio Contact Backend",
  "status": "ready"
}
```

If the browser instead shows a Google sign-in/permission page or an HTML error page, fix the Apps Script Web App access/deployment before testing the website. A non-JSON Apps Script page is what causes the Vercel bridge to report that the contact backend returned an unexpected response.

## Step 8 — Configure Vercel

Open the portfolio project in Vercel:

**Project → Settings → Environment Variables**

Add/update these exact server-side variables:

### GOOGLE_APPS_SCRIPT_CONTACT_URL

Value:

```text
https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

### CONTACT_FORM_SECRET

Value:

```text
THE_EXACT_VALUE_PRINTED_BY_setupContactBackend
```

Apply them to the environments you use, especially **Production** (and Preview if you test preview deployments).

Important: there is intentionally **no `VITE_CONTACT_API_URL`**. The React application posts to `/api/contact`, and Vercel privately forwards the request to Apps Script.

## Step 9 — Redeploy Vercel

Environment variable changes require a deployment that uses the updated environment.

Normal workflow:

```text
Updated source
   ↓
Git commit
   ↓
Git push
   ↓
GitHub
   ↓
Vercel build/deployment
   ↓
Production website
```

After editing Vercel environment variables, redeploy the latest production deployment if needed so the function receives the new values.

## Step 10 — Production test

Use a real email address that you can check.

```text
Full Name: Test User
Email: YOUR_TEST_EMAIL
Company: Test Company
Inquiry Type: Website Inquiry
Message: Testing portfolio contact integration.
```

Expected website result:

- button changes to `Sending...`,
- double-clicking is blocked while sending,
- success appears only after the backend confirms the sheet write,
- a Reference ID such as `MAE-20260810-A7K9Q2` is displayed.

Expected `Inquiries` row:

```text
Reference ID: MAE-...
Date & Time: Asia/Manila server timestamp
Full Name: Test User
Email Address: YOUR_TEST_EMAIL
Company / Organization: Test Company
Inquiry Type: Website Inquiry
Message: Testing portfolio contact integration.
Status: New
Confirmation Sent: Sent
Remarks: Confirmation and admin notification sent successfully.
```

Expected `Email Logs`:

1. `Visitor Confirmation` → visitor email → `Sent`
2. `Admin Notification` → `maeannbodiongan.ie@gmail.com` → `Sent`

## Sender verification

The code does not spoof a `From:` header.

For the sender to actually be the required Google account:

1. the Apps Script must be authorized by `maeannbodiongan.ie@gmail.com`,
2. the Web App must be deployed using **Execute as Me** from that account,
3. the automated email must be generated by that deployed script.

After a test submission, open the received confirmation email and inspect the sender/message details. The sender should resolve to the authenticated Apps Script deployment account, with display name `Mae Ann S. Bodiongan`.

Simply typing another email address into a From header would not change the authenticated sender; this implementation does not do that.

## Error behavior

### Sheet write succeeds, emails succeed

- inquiry remains saved,
- `Confirmation Sent = Sent`,
- email logs show both messages as `Sent`,
- website shows success and the Reference ID.

### Sheet write succeeds, visitor confirmation fails

- inquiry remains saved,
- `Confirmation Sent = Failed`,
- sanitized failure detail is written to Remarks,
- admin notification is still attempted,
- website still says the message was received.

### Sheet write fails

- no fake success is returned,
- website shows a friendly error,
- the form is not reset.

## Security notes

- No Gmail password is stored anywhere.
- No Google OAuth token or private key is placed in frontend code.
- The Apps Script URL and shared secret are server-side Vercel variables.
- The browser only calls same-origin `/api/contact`.
- Apps Script validates all submitted fields again.
- A honeypot blocks basic bots.
- Cache-based rate limiting blocks rapid repeat submissions.
- A client submission ID + server duplicate cache protects against accidental retry/duplicate rows.
- `LockService` protects concurrent Google Sheet writes.
- Errors saved to the sheet are sanitized and truncated.
