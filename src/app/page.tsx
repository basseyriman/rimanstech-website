import { HeroSection } from "@/components/sections/HeroSection";
import { TrustedBySection } from "@/components/sections/TrustedBySection";
import { ValuePropositionSection } from "@/components/sections/ValuePropositionSection";
import { ClientWorkSection } from "@/components/sections/ClientWorkSection";
import { ProductsShowcaseSection } from "@/components/sections/ProductsShowcaseSection";
import { WhyRimansTechSection } from "@/components/sections/WhyRimansTechSection";
import { FinalCTASection } from "@/components/sections/FinalCTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustedBySection />
      <ValuePropositionSection />
      <ClientWorkSection />
      <ProductsShowcaseSection />
      <WhyRimansTechSection />
      <FinalCTASection />
    </>
  );
}
