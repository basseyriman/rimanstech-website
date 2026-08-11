import { Container, Section } from "@/components/layout/Container";

export default function Loading() {
  return (
    <Section spacing="compact" className="pt-28 md:pt-32">
      <Container>
        <div className="mx-auto max-w-xl animate-pulse space-y-4">
          <div className="h-4 w-24 rounded bg-border-light" />
          <div className="h-10 w-full rounded bg-border-light" />
          <div className="h-4 w-full rounded bg-border-light" />
          <div className="h-4 w-5/6 rounded bg-border-light" />
        </div>
      </Container>
    </Section>
  );
}
