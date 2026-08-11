import type { Metadata } from "next";
import { Container, Section } from "@/components/layout/Container";
import { pageMetadata } from "@content/seo";
import { CONTACT_EMAIL } from "@/lib/utils";

export const metadata: Metadata = pageMetadata.privacy;

export default function PrivacyPage() {
  return (
    <Section spacing="compact" className="pt-28 md:pt-32">
      <Container size="reading">
        <h1 className="text-4xl font-medium text-carbon">Privacy Policy</h1>
        <p className="mt-4 text-sm text-stone">Last updated: August 2026</p>

        <div className="prose-custom mt-10 space-y-8 text-base leading-relaxed text-graphite">
          <section>
            <h2 className="text-xl font-medium text-carbon">Overview</h2>
            <p className="mt-3">
              RimansTech Industries (&quot;RimansTech&quot;, &quot;we&quot;, &quot;us&quot;) respects your
              privacy. This policy explains what information we collect when you visit
              rimanstech.com, use our contact or project forms, or interact with the
              RimansTech AI Assistant, and how we use and protect that information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-carbon">Information We Collect</h2>
            <p className="mt-3">We may collect the following information:</p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                <strong className="text-carbon">Contact and enquiry data</strong> — name,
                email address, company, phone number, project details and messages you
                submit via our forms.
              </li>
              <li>
                <strong className="text-carbon">AI Assistant conversations</strong> —
                messages you send to the chatbot, which are processed to generate
                responses. Conversations may be stored in your browser session and
                included in project enquiries you choose to submit.
              </li>
              <li>
                <strong className="text-carbon">Technical data</strong> — IP address,
                browser type, device information and pages visited, collected through
                standard server logs and optional analytics when you consent.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium text-carbon">How We Use Information</h2>
            <p className="mt-3">We use your information to:</p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Respond to enquiries and evaluate project opportunities</li>
              <li>Operate and improve the website and AI Assistant</li>
              <li>Understand site usage through analytics (with your consent)</li>
              <li>Protect against abuse, spam and security threats</li>
            </ul>
            <p className="mt-3">
              We do not sell your personal information. We do not use enquiry data for
              unrelated marketing without your consent.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-carbon">AI Assistant</h2>
            <p className="mt-3">
              The RimansTech AI Assistant uses third-party AI services (OpenAI) to
              generate responses based on approved company information. Please do not
              share sensitive personal, medical, financial or confidential information
              through the chatbot.
            </p>
            <p className="mt-3">
              Conversation history is stored locally in your browser session
              (sessionStorage) and is cleared when you close the browser tab or clear
              the conversation. If you submit a project enquiry from the chat, relevant
              conversation content may be included in that submission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-carbon">Cookies & Local Storage</h2>
            <p className="mt-3">
              We use essential local storage for site preferences (such as theme) and
              AI Assistant session data. With your consent, we use analytics cookies
              provided by Vercel Analytics to understand how visitors use the site.
            </p>
            <p className="mt-3">
              You can accept or decline analytics cookies via the cookie notice shown
              on your first visit. Declining analytics does not affect core site
              functionality.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-carbon">Third-Party Services</h2>
            <p className="mt-3">We use the following third-party services:</p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                <strong className="text-carbon">Vercel</strong> — website hosting and
                optional analytics
              </li>
              <li>
                <strong className="text-carbon">Resend</strong> — transactional email
                delivery for form submissions
              </li>
              <li>
                <strong className="text-carbon">OpenAI</strong> — AI Assistant message
                processing
              </li>
              <li>
                <strong className="text-carbon">Cloudflare Turnstile</strong> (optional)
                — bot protection on forms when configured
              </li>
            </ul>
            <p className="mt-3">
              These providers process data according to their own privacy policies and
              our instructions where applicable.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-carbon">Data Retention</h2>
            <p className="mt-3">
              Enquiry and contact form submissions are retained for as long as needed
              to respond to your request and manage any resulting business relationship,
              typically up to three years unless a longer period is required by law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-carbon">Your Rights</h2>
            <p className="mt-3">
              Depending on your location, you may have rights to access, correct, delete
              or restrict processing of your personal data, and to object to certain
              processing. To exercise these rights, contact us at the email below.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-carbon">Contact</h2>
            <p className="mt-3">
              For privacy-related questions or requests, contact{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-forest underline">
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </section>
        </div>
      </Container>
    </Section>
  );
}
