import type { Metadata } from "next";
import { Container, Section } from "@/components/layout/Container";
import { pageMetadata } from "@content/seo";

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
              RimansTech Industries (&quot;we&quot;, &quot;us&quot;) respects your privacy.
              This policy describes how we collect, use and protect information when
              you visit our website or use the RimansTech AI Assistant.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-carbon">Information We Collect</h2>
            <p className="mt-3">
              When you submit a project enquiry or contact form, we collect the
              information you provide (name, email, company, project details). When
              you use the AI Assistant, conversation content is processed to generate
              responses and may be included in project enquiries you choose to submit.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-carbon">AI Assistant</h2>
            <p className="mt-3">
              The RimansTech AI Assistant uses artificial intelligence to answer
              questions. Please do not share sensitive personal, medical or
              confidential information through the chatbot. Conversations may be
              stored locally in your browser session.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-carbon">How We Use Information</h2>
            <p className="mt-3">
              We use submitted information to respond to enquiries, evaluate project
              opportunities and communicate with you. We do not sell your personal
              information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-carbon">Contact</h2>
            <p className="mt-3">
              For privacy-related questions, contact{" "}
              <a href="mailto:support@rimanstech.com" className="text-forest underline">
                support@rimanstech.com
              </a>
            </p>
          </section>
        </div>
      </Container>
    </Section>
  );
}
