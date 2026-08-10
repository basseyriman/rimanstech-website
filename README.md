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

| Variable | Description |
|----------|-------------|
| `OPENAI_API_KEY` | Powers the RimansTech AI Assistant |
| `RESEND_API_KEY` | Sends project enquiry emails |
| `CONTACT_EMAIL` | Recipient for enquiries (default: support@rimanstech.com) |
| `EMAIL_FROM` | Sender address for Resend |
| `NEXT_PUBLIC_SITE_URL` | Site URL for SEO/sitemap |

Without API keys, the site runs with graceful fallbacks — the chatbot shows a helpful offline message and enquiries are logged to the console in development.

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
