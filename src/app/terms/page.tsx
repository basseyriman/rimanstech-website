import type { Metadata } from "next";
import { Container, Section } from "@/components/layout/Container";
import { pageMetadata } from "@content/seo";

export const metadata: Metadata = pageMetadata.terms;

export default function TermsPage() {
  return (
    <Section spacing="compact" className="pt-28 md:pt-32">
      <Container size="reading">
        <h1 className="text-4xl font-medium text-carbon">Terms of Use</h1>
        <p className="mt-4 text-sm text-stone">Last updated: August 2026</p>

        <div className="mt-10 space-y-8 text-base leading-relaxed text-graphite">
          <section>
            <h2 className="text-xl font-medium text-carbon">Website Use</h2>
            <p className="mt-3">
              By accessing rimanstech.com, you agree to these terms. The content on
              this website is provided for general information about RimansTech
              Industries and its services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-carbon">AI Assistant</h2>
            <p className="mt-3">
              The RimansTech AI Assistant provides informational responses based on
              approved company information. It does not constitute professional,
              medical or legal advice. Do not rely on AI-generated responses for
              clinical or critical decisions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-carbon">Intellectual Property</h2>
            <p className="mt-3">
              All content, branding and materials on this website are the property of
              RimansTech Industries unless otherwise stated.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-carbon">Contact</h2>
            <p className="mt-3">
              Questions about these terms:{" "}
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
