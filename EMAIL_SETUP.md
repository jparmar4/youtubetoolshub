# Email Service Setup Guide

To enable the contact form on your website, you need to configure the email service using a Gmail account (or other SMTP provider).

## 1. Get Your Credentials

### Using Gmail (Recommended)
Because of Google's security, you cannot use your regular password. You need an **App Password**.

1.  Go to your [Google Account Security Settings](https://myaccount.google.com/security).
2.  Enable **2-Step Verification** if it's not already on.
3.  Search for **"App passwords"** in the top search bar (or [click here](https://myaccount.google.com/apppasswords)).
4.  Create a new app password:
    *   **App name:** `YouTube Tools Hub`
5.  Copy the 16-character password generated (e.g., `abcd efgh ijkl mnop`).

## 2. Update Environment Variables

Open your `.env.local` file in the root directory and add (or update) these lines:

```bash
# Email Configuration (Nodemailer)
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-16-char-app-password"
```

## 3. Restart Development Server

After changing `.env.local`, you MUST restart your Next.js server for the changes to take effect.

```bash
npm run dev
```

## 4. Test

Go to `/contact` and try sending a message. It should now work!
