import type { Metadata } from "next";
import { Container, Section } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectForm } from "@/components/forms/ProjectForm";
import { pageMetadata } from "@content/seo";

export const metadata: Metadata = pageMetadata.startProject;

export default function StartProjectPage() {
  return (
    <Section spacing="compact" className="pt-28 md:pt-32">
      <Container size="reading">
        <SectionHeader
          titleAs="h1"
          title="Tell us what you want to build."
          description="You don't need a full technical specification. Start with the idea or problem."
        />
        <div className="mt-10">
          <ProjectForm sourcePage="/start-a-project" />
        </div>
      </Container>
    </Section>
  );
}
