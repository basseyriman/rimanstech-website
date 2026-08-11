"use client";

import { useEffect } from "react";
import { Container, Section } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Section spacing="compact" className="pt-28 md:pt-32">
      <Container className="text-center">
        <p className="text-xs font-medium tracking-[0.12em] text-stone uppercase">Error</p>
        <h1 className="mt-4 text-4xl font-medium text-carbon">Something went wrong</h1>
        <p className="mt-4 text-graphite">
          We couldn&apos;t load this page. Please try again or return home.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button type="button" onClick={reset}>
            Try again
          </Button>
          <Button href="/" variant="secondary">
            Go Home
          </Button>
        </div>
      </Container>
    </Section>
  );
}
