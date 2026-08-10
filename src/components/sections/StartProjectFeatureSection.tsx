"use client";

import Link from "next/link";
import { ArrowDownRight } from "lucide-react";
import { Container, Section } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/FadeIn";

export function StartProjectFeatureSection() {
  return (
    <Section bg="obsidian" spacing="default">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
          <div className="max-w-[680px]">
            <FadeIn>
              <Eyebrow dark>BUILD WITH US</Eyebrow>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="editorial-serif text-[36px] leading-[1.05] font-normal tracking-[-0.02em] text-ivory md:text-[48px] lg:text-[56px]">
                Got an idea?
                <br />
                Let&apos;s turn it into something real.
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-6 text-base leading-relaxed text-footer-secondary md:text-lg">
                Whether you have a detailed specification, an early concept or
                simply a business problem you believe technology can solve, talk
                to us.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="/start-a-project" dark>
                  Start a Project
                </Button>
                <Button variant="secondary" href="/contact" dark>
                  Talk to RimansTech
                </Button>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.2}>
            <Link
              href="/start-a-project"
              className="group hidden items-center justify-center lg:flex"
              aria-label="Start a project"
            >
              <div className="flex h-32 w-32 items-center justify-center rounded-full border border-border-dark transition-all duration-500 group-hover:border-sage/50 group-hover:bg-charcoal">
                <ArrowDownRight className="h-10 w-10 text-sage transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-1" />
              </div>
            </Link>
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
}
