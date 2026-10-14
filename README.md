# Swastik Paudel — Portfolio

A macOS-inspired interactive portfolio built with React and Vite. The desktop includes draggable app windows, Spotlight search across projects and technologies, Mission Control, a dock, Launchpad, Control Center, project and experience views, a local mail draft, and a server-backed contact flow.

## Desktop shortcuts

- `⌘K` / `Ctrl+K` — search apps, projects, and technologies with Spotlight; use the arrow keys and Enter to open a result.
- `F3` / `⌃↑` — open Mission Control to switch, restore, or close windows.
- `Esc` — dismiss the current desktop overlay without closing the active app.
- Use the dock's Launchpad icon to browse apps, or open Mission Control from Control Center on touch devices.

## Stack

- React 19 and Vite
- Vercel Functions for the contact API
- Gmail SMTP for email delivery
- Upstash Redis for distributed rate limiting

## Run locally

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local` and fill in the service credentials below.
3. Run `npm run dev:vercel` to serve both the Vite frontend and `/api/contact`.

`npm run dev` starts Vite only; API requests require the Vercel development server. Vercel CLI may ask you to sign in and link the project the first time you run it.

## Contact API configuration

Set these environment variables in Vercel (and in `.env.local` for local development):

| Variable | Purpose |
| --- | --- |
| `CONTACT_GMAIL_USER` | Gmail address used to send portfolio messages |
| `CONTACT_GMAIL_APP_PASSWORD` | App Password for that Google account (not your normal password) |
| `CONTACT_TO_EMAIL` | Inbox that receives portfolio messages; can be the same Gmail address |
| `CONTACT_ALLOWED_ORIGINS` | Comma-separated exact origins, e.g. `https://your-domain.com,https://your-project.vercel.app` |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis REST endpoint |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis REST token |

Create a Google App Password at [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords). App Passwords require 2-Step Verification to be enabled on the Google account. Use the Gmail address for `CONTACT_GMAIL_USER`; set `CONTACT_TO_EMAIL` to the inbox where messages should arrive. Never use your normal Google password, and do not prefix these variables with `VITE_`.

The endpoint validates and bounds input, rejects unexpected origins, uses a honeypot field, and limits each IP to five messages per hour. It fails closed if Gmail delivery or the distributed rate limiter is not configured. Provider credentials stay on the server and are never exposed as Vite environment variables.

## Deploy

Import this project into Vercel, configure the environment variables above, and deploy. Add each production or preview origin that should be allowed to `CONTACT_ALLOWED_ORIGINS`. Vercel builds the Vite site and deploys `api/contact.js` as a serverless function.
