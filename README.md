# Swastik Paudel — Portfolio

A personal Windows-inspired desktop portfolio built with React and Vite. It starts with a Kathmandu dusk wallpaper, Swastik's portrait, and a minimal identity label. Desktop items open into distinct app-style interfaces: Projects in an Explorer-like folder, the bio as a Notepad document, the prepNep case study as a document viewer, and Contact as a mail composer.

## Desktop shortcuts

- `Ctrl+K` / `⌘K` — search apps, projects, and technologies; use the arrow keys and Enter to open a result.
- `F3` / `Ctrl+↑` — open Task View to switch, restore, or close windows.
- `Esc` — dismiss the current desktop overlay without closing the active app.
- Select the Windows-style Start button to browse pinned apps and running windows.
- Desktop shortcuts open with one click or tap; they are also keyboard accessible.
- Taskbar app indicators show open and active windows; select the active app again to minimize it.
- On desktop, drag a window by its title bar and resize it from any edge or corner; use the title-bar controls or double-click to maximize and restore. Windows remain full-screen on mobile.
- Use the taskbar search button for universal search, and the system-tray controls for Quick Settings.

## Portfolio apps

- App windows use a Windows-inspired dark palette and file-type shortcuts are drawn as SVGs for text, folders, PDF, mail, and system tools.
- **Projects / File Explorer:** browse Projects, Production, Web, or Systems folders; go back and forward through folder history; search project details or technologies; filter by stack; switch between icon and details views; select and open a project for its preview and links.
- **About / Notepad:** edit the profile document, create a new document, open a local `.txt` file with `Ctrl+O`, save it in this browser with `Ctrl+S`, download a `.txt` copy, toggle word wrap, print, or jump to Projects, the case study, and Contact. Browser storage is local to the current browser.
- **prepNep / Document viewer:** read the case study across three navigable sections, adjust zoom from 70% to 150%, reset zoom, and print the current view. The viewer is generated from portfolio content; no source PDF is present.
- **Résumé / PDF-style viewer:** navigate résumé sections, adjust zoom, copy text, or use the browser print dialog to save the rendered résumé as a PDF.
- **Systems Lab:** browse and search the skills manifest, inspect categorized technologies, and view/copy live browser runtime details such as platform, viewport, display scale, and connectivity.
- **Mail:** compose and send through the contact API, use message templates, resume or delete the locally saved draft, and review successful sends from the current session. The Inbox is an explanatory empty state; it does not connect to Swastik's private mailbox.

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
