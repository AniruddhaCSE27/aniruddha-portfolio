# Aniruddha Pathak — engineering portfolio

Premium portfolio site for an independent software and applied AI engineer. Built with Next.js App Router, TypeScript strict mode, Tailwind CSS, Zod, and Resend.

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

On Windows PowerShell, use `Copy-Item .env.example .env.local` instead of `cp`.

The site runs at `http://localhost:3000`.

## Contact configuration

The contact form posts to `POST /api/inquiry`. The endpoint validates payloads server-side with Zod, rejects a hidden honeypot field, limits body size and only returns success after Resend accepts the email.

Set all three values in `.env.local` to enable delivery:

- `RESEND_API_KEY`: Resend API key, server-only.
- `CONTACT_TO_EMAIL`: inbox that receives inquiries.
- `CONTACT_FROM_EMAIL`: a sender on a Resend-verified domain.

When any value is missing, the UI shows an honest configuration-unavailable state and submission is disabled. No inquiry is silently discarded.

Provider acceptance means Resend accepted the request for processing; it is not proof the message reached an inbox.

## Verification

```bash
npm run lint
npx tsc --noEmit
npm test
npm run build
```

## Deployment notes

This repository is local-only until you choose a host. Set `NEXT_PUBLIC_SITE_URL` to the canonical production URL before deployment so metadata, sitemap, robots, and JSON-LD resolve correctly. Keep email secrets in your hosting provider's environment settings and never commit `.env.local`.

No database is required: inquiries are delivered by Resend and are not persisted by this app.
