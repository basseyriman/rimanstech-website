"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { CTA } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeader";
import { FadeIn } from "@/components/motion/FadeIn";
import { HeroVisual } from "./HeroVisual";

export function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-64px)] bg-ivory md:min-h-[calc(100vh-70px)] lg:min-h-[760px] lg:min-h-[calc(100vh-76px)]">
      <Container size="shell" className="grid items-end gap-10 pt-28 pb-16 lg:grid-cols-2 lg:gap-16 lg:pt-36 lg:pb-24">
        <div className="max-w-[640px]">
          <FadeIn>
            <Eyebrow>AI • SOFTWARE • DIGITAL PRODUCTS</Eyebrow>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="editorial-serif text-[40px] leading-[1.02] font-normal tracking-[-0.03em] text-carbon sm:text-[48px] md:text-[56px] lg:text-[72px] xl:text-[84px]">
              We build intelligent technology.
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-6 text-lg leading-relaxed text-graphite md:text-xl md:leading-relaxed">
              AI products, software platforms and digital systems engineered for
              businesses, organisations and ambitious founders.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="mt-4 max-w-[580px] text-base leading-relaxed text-stone">
              From an early idea to production-ready software, RimansTech Industries
              designs, develops and deploys technology that solves real problems —
              while building our own products across healthcare, education and applied
              AI.
            </p>
          </FadeIn>
          <FadeIn delay={0.4}>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <CTA
                primary={{ label: "Start a Project", href: "/start-a-project" }}
                secondary={{ label: "Explore Our Work", href: "/#selected-work" }}
              />
            </div>
            <Link
              href="/#what-we-do"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-forest transition-colors hover:text-forest-hover"
            >
              What we build
              <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeIn>
        </div>

        <FadeIn delay={0.3} direction="up">
          <HeroVisual />
        </FadeIn>
      </Container>
    </section>
  );
}
