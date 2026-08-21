# AOA

AOA is a small web design and development team based in Pune, India, building
considered websites for founders and teams across timezones. This repo has two parts:
the marketing site (Next.js) and a standalone API backend (Express + TypeScript) that
handles contact-form submissions.

**Frontend:** Next.js (App Router) · React · TypeScript · Tailwind CSS v4
**Backend:** Node.js · Express · TypeScript · MySQL · Nodemailer

## Getting started

Two services run side by side in development — the Next.js site and the Express API.

```bash
# Terminal 1 — frontend
npm install
npm run dev            # http://localhost:3000

# Terminal 2 — backend
cd server
npm install
npm run dev             # http://localhost:4000
```

Copy `.env.example` → `.env.local` at the repo root (frontend config), and
`server/.env.example` → `server/.env` (backend config). The frontend's
`NEXT_PUBLIC_API_URL` must point at the backend's URL (`http://localhost:4000` by default).

## Backend (`server/`)

A standalone Express + TypeScript API, independent of the Next.js app:

- `POST /api/inquiries` — validates a submission, saves it to MySQL, and emails a
  notification to `NOTIFY_EMAIL`.
- `GET /health` — liveness check.

Run it on its own:

```bash
cd server
npm run dev     # tsx watch, for development
npm run build   # compiles to dist/
npm run start   # runs the compiled build
```

### Database setup

```bash
mysql -u root -p < sql/schema.sql
```

Fill in `MYSQL_HOST` / `MYSQL_USER` / `MYSQL_PASSWORD` / `MYSQL_DATABASE` in
`server/.env`. If the database is unreachable, the API responds with a friendly error
instead of crashing, and the frontend shows a fallback message pointing to a direct
email address.

### Email notifications

Every successful inquiry sends an email to `NOTIFY_EMAIL` (`gaikwadashwanti@gmail.com`
by default) via Nodemailer over SMTP. To send through Gmail:

1. Enable 2-Step Verification on the sending Gmail account.
2. Create an App Password at [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords).
3. Set `SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=465`, `SMTP_USER=<that gmail address>`,
   `SMTP_PASSWORD=<the app password>` in `server/.env`.

If SMTP isn't configured, the API still saves the inquiry to MySQL — it just skips the
email and logs a warning. A failed or unconfigured email never fails the request.

## Viewing submitted inquiries

Every contact-form submission is saved to the `inquiries` table by the backend. To read
them from the site itself (in addition to the email notification):

1. Set `ADMIN_PASSWORD` in the frontend's `.env.local`.
2. Visit `/admin` and sign in with that password.

The Next.js app connects to the same MySQL database directly (read-only) for this
dashboard — see `src/lib/db.ts`. The route is excluded from `robots.txt` and gated
behind a session cookie.

## Commands

```bash
# frontend (repo root)
npm run lint
npm run build
npm run start

# backend (server/)
npm run build
npm run start
```

## Design system

Warm, editorial "paper" theme chosen to read as premium and credible to both Indian
and international (US/UK/EU) clients: bone/cream background, warm charcoal ink, a
terracotta accent, Fraunces serif display type paired with Inter body text. See
`src/app/globals.css` for the full token set.

## Project structure

```
src/app/page.tsx              assembles the page from section components
src/app/layout.tsx            fonts, metadata, JSON-LD, global chrome
src/app/globals.css           design tokens and the full visual system
src/app/admin/                password-gated dashboard for viewing inquiries
src/components/sections/      Hero, Credibility, Services, Process, Work, Testimonials, About, Contact
src/components/layout/        Navbar, Footer
src/components/interactive/   scroll-reveal, custom cursor, scroll progress, counters
src/components/canvas/        the 2D canvas ambient animation behind the hero
src/lib/db.ts                 read-only MySQL pool used by /admin
src/lib/auth.ts                /admin session cookie handling

server/src/index.ts           Express app entry
server/src/routes/inquiries.ts   POST /api/inquiries handler
server/src/db.ts              MySQL pool (writes)
server/src/mailer.ts          Nodemailer notification email
server/src/validators.ts      shared request validation
sql/schema.sql                the inquiries table, used by both services
```

## Before going live

- Swap the placeholder email (`hello@aoa.in`) and social links in `Footer.tsx` and `Contact.tsx` for real ones.
- Replace the sample testimonial in `Testimonials.tsx` with client-approved copy as new projects wrap.
- Point `metadataBase` in `layout.tsx` and the URLs in `sitemap.ts`/`robots.ts` at your production domain.
- Set a strong, unique `ADMIN_PASSWORD` before deploying.
- Set real MySQL and SMTP credentials in `server/.env`, and point the frontend's
  `NEXT_PUBLIC_API_URL` at the backend's deployed URL.
- Update `CORS_ORIGIN` in `server/.env` to the frontend's production domain.
