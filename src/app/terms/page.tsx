import type { Metadata } from "next";
import { Container, Section } from "@/components/layout/Container";
import { pageMetadata } from "@content/seo";
import { CONTACT_EMAIL } from "@/lib/utils";

export const metadata: Metadata = pageMetadata.terms;

export default function TermsPage() {
  return (
    <Section spacing="compact" className="pt-28 md:pt-32">
      <Container size="reading">
        <h1 className="text-4xl font-medium text-carbon">Terms of Use</h1>
        <p className="mt-4 text-sm text-stone">Last updated: August 2026</p>

        <div className="mt-10 space-y-8 text-base leading-relaxed text-graphite">
          <section>
            <h2 className="text-xl font-medium text-carbon">Agreement</h2>
            <p className="mt-3">
              By accessing rimanstech.com (&quot;the Site&quot;), you agree to these Terms of
              Use. If you do not agree, please do not use the Site. These terms apply
              to all visitors, users and others who access the Site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-carbon">Website Use</h2>
            <p className="mt-3">
              The content on this Site is provided for general information about
              RimansTech Industries and its services, products and research. We aim to
              keep information accurate and up to date but do not guarantee completeness
              or suitability for any particular purpose.
            </p>
            <p className="mt-3">
              You may not use the Site to transmit unlawful content, attempt unauthorised
              access, interfere with site operation, scrape content at scale, or use
              automated systems to abuse our forms or AI Assistant.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-carbon">AI Assistant</h2>
            <p className="mt-3">
              The RimansTech AI Assistant provides informational responses based on
              approved company information. It does not constitute professional,
              medical, legal or financial advice. Do not rely on AI-generated responses
              for clinical, safety-critical or legally binding decisions.
            </p>
            <p className="mt-3">
              AI responses may occasionally be incomplete or inaccurate. Always verify
              important information directly with the RimansTech team before acting on it.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-carbon">Enquiries & Services</h2>
            <p className="mt-3">
              Submitting a contact or project enquiry does not create a binding contract.
              Any engagement for services will be subject to separate agreement on scope,
              fees, timelines and deliverables.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-carbon">Intellectual Property</h2>
            <p className="mt-3">
              All content, branding, logos, text, images and materials on this Site are
              the property of RimansTech Industries or its licensors unless otherwise
              stated. You may not reproduce, distribute or create derivative works
              without our prior written consent.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-carbon">Disclaimer & Liability</h2>
            <p className="mt-3">
              The Site and its content are provided &quot;as is&quot; without warranties of any
              kind, express or implied. To the fullest extent permitted by law,
              RimansTech Industries shall not be liable for any indirect, incidental or
              consequential damages arising from your use of the Site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-carbon">External Links</h2>
            <p className="mt-3">
              The Site may link to third-party websites (such as product demos or social
              profiles). We are not responsible for the content or practices of those
              sites.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-carbon">Governing Law</h2>
            <p className="mt-3">
              These terms are governed by the laws of England and Wales. Any disputes
              shall be subject to the exclusive jurisdiction of the courts of England
              and Wales.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-carbon">Changes</h2>
            <p className="mt-3">
              We may update these terms from time to time. Continued use of the Site after
              changes are posted constitutes acceptance of the revised terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-carbon">Contact</h2>
            <p className="mt-3">
              Questions about these terms:{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-forest underline">
                {CONTACT_EMAIL}
              </a>
            </p>
          </section>
        </div>
      </Container>
    </Section>
  );
}
