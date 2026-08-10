import Link from "next/link";
import { Container, Section } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Section spacing="compact" className="pt-28 md:pt-32">
      <Container className="text-center">
        <p className="text-xs font-medium tracking-[0.12em] text-stone uppercase">404</p>
        <h1 className="mt-4 text-4xl font-medium text-carbon">Page not found</h1>
        <p className="mt-4 text-graphite">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button href="/">Go Home</Button>
          <Button href="/start-a-project" variant="secondary">
            Start a Project
          </Button>
        </div>
      </Container>
    </Section>
  );
}
