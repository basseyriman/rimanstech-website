import type { Metadata } from "next";
import { Container, Section } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { ContactForm } from "@/components/forms/ContactForm";
import { pageMetadata } from "@content/seo";
import { CONTACT_EMAIL } from "@/lib/utils";

export const metadata: Metadata = pageMetadata.contact;

const contactOptions = [
  {
    title: "Start a Project",
    description:
      "For software, AI, automation and product-development enquiries.",
    cta: { label: "Start a Project", href: "/start-a-project" },
  },
  {
    title: "General Enquiries",
    description: "Questions about RimansTech Industries and our services.",
    cta: { label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
  },
  {
    title: "Product Enquiries",
    description: "Questions relating to AlzDetect, Young AI Explorers or AI Quest.",
    cta: { label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
  },
  {
    title: "Research & Collaboration",
    description: "For academic, technical and research discussions.",
    cta: { label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
  },
];

export default function ContactPage() {
  return (
    <>
      <Section spacing="compact" className="pt-28 md:pt-32">
        <Container>
          <SectionHeader
            titleAs="h1"
            title="Talk to RimansTech."
            description="Whether you have a product idea, a business challenge or a question about our work — we'd like to hear from you."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {contactOptions.map((option) => (
              <div
                key={option.title}
                className="rounded-xl border border-border-light bg-porcelain p-8"
              >
                <h2 className="text-lg font-medium text-carbon">{option.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-graphite">
                  {option.description}
                </p>
                <div className="mt-6">
                  <Button
                    href={option.cta.href}
                    variant={option.title === "Start a Project" ? "primary" : "secondary"}
                    size="sm"
                  >
                    {option.cta.label}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section spacing="compact" bg="porcelain">
        <Container size="reading">
          <h2 className="text-2xl font-medium text-carbon">Send a message</h2>
          <p className="mt-3 text-sm leading-relaxed text-graphite">
            Prefer a quick message instead of email? Use the form below and we&apos;ll
            respond as soon as we can.
          </p>
          <div className="mt-8">
            <ContactForm sourcePage="/contact" />
          </div>
        </Container>
      </Section>
    </>
  );
}
