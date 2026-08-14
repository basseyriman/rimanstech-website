"use client";

import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { CTA } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeader";
import { HeroEntrance, HeroHeadline } from "@/components/motion/FadeIn";
import { HeroVisual } from "./HeroVisual";

export function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-64px)] bg-page md:min-h-[calc(100vh-70px)] lg:min-h-[760px] lg:min-h-[calc(100vh-76px)]">
      <Container size="shell" className="grid items-end gap-10 pt-28 pb-16 lg:grid-cols-2 lg:gap-16 lg:pt-36 lg:pb-24">
        <div className="max-w-[640px]">
          <HeroEntrance delay={0}>
            <Eyebrow>AI • SOFTWARE • DIGITAL PRODUCTS</Eyebrow>
          </HeroEntrance>

          <HeroHeadline
            phrases={["We build", "intelligent technology."]}
            className="editorial-serif text-[40px] leading-[1.02] font-normal tracking-[-0.03em] text-carbon sm:text-[48px] md:text-[56px] lg:text-[72px] xl:text-[84px]"
          />

          <HeroEntrance delay={0.32} className="mt-6">
            <p className="text-lg leading-relaxed text-graphite md:text-xl md:leading-relaxed">
              AI products, software platforms and digital systems for businesses,
              organisations and founders.
            </p>
          </HeroEntrance>

          <HeroEntrance delay={0.52} className="mt-8">
            <CTA
              primary={{ label: "Start a Project", href: "/start-a-project" }}
              secondary={{ label: "Explore Our Work", href: "/#selected-work" }}
            />
          </HeroEntrance>
        </div>

        <HeroVisual />
      </Container>
    </section>
  );
}
