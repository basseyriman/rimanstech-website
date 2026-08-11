# RimansTech Industries Website

Premium corporate website for [RimansTech Industries](https://rimanstech.com) — AI and software development company.

## Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion**
- **OpenAI** (AI Assistant)
- **Resend** (email enquiries)

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Copy `.env.example` to `.env.local` for local development.

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | Production | Powers the RimansTech AI Assistant |
| `RESEND_API_KEY` | Production | Sends project enquiry emails |
| `CONTACT_EMAIL` | Optional | Recipient (default: support@rimanstech.com) |
| `EMAIL_FROM` | Production | Verified sender on your Resend domain, e.g. `RimansTech <hello@rimanstech.com>` |
| `NEXT_PUBLIC_SITE_URL` | Production | Canonical URL for SEO and Open Graph |
| `NEXT_PUBLIC_SOCIAL_LINKEDIN` | Optional | Footer LinkedIn link |
| `NEXT_PUBLIC_SOCIAL_GITHUB` | Optional | Footer GitHub link |
| `NEXT_PUBLIC_SOCIAL_INSTAGRAM` | Optional | Footer Instagram link (omit to hide) |

### Development vs production

- **Development:** Missing API keys use graceful fallbacks — chat shows an offline message; enquiries log to the console.
- **Production:** Enquiry submission returns **503** if `RESEND_API_KEY` is not set (no silent fake success).

### Resend setup (production email)

1. Create a [Resend](https://resend.com) account.
2. Verify **rimanstech.com** in the Resend dashboard.
3. Set `EMAIL_FROM` to a verified address (not `onboarding@resend.dev`).
4. Add `RESEND_API_KEY`, `EMAIL_FROM`, and `CONTACT_EMAIL` in Vercel → Project → Environment Variables.

## Brand assets

Wordmarks, monograms, and nav logos live in `public/brand/`. Regenerate processed variants with:

```bash
node scripts/process-premium-wordmark.mjs      # Nav wordmark PNGs
node scripts/process-editorial-wordmarks.mjs   # Editorial/luxury variants
node scripts/process-launcher-monogram.mjs     # Chat launcher icon
node scripts/process-hero-monogram.mjs         # Hero chrome RT (no background)
node scripts/generate-wordmark-polish-variants.mjs
```

See `public/brand/README.md` for asset naming.

## Social sharing

Default Open Graph image: `public/og-image.png` (1200×630). LinkedIn/Twitter previews use this via `content/seo.ts`.

## Pages

- `/` — Homepage (14 sections)
- `/start-a-project` — Project enquiry form
- `/services` — Service capabilities
- `/products` — RimansTech products
- `/industries` — Industry areas
- `/company` — About RimansTech
- `/contact` — Contact options
- `/research` — RimansTech Labs
- `/insights` — News and articles
- `/work/[slug]` — Case studies
- `/privacy`, `/terms`

## AI Assistant

Floating chat widget powered by `/api/chat`. Includes lead generation flow and chat-to-enquiry conversion via `/api/enquiry`.

## Deploy

Optimised for [Vercel](https://vercel.com):

```bash
npm run build
```

## License

Private — RimansTech Industries.
