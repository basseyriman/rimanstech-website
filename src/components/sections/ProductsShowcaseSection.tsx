import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Section } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProductShowcasePanel } from "@/components/sections/ProductShowcasePanel";

export function ProductsShowcaseSection() {
  return (
    <Section id="what-we-build" bg="porcelain" spacing="compact">
      <Container>
        <SectionHeader
          eyebrow="OUR PRODUCTS"
          title="We build our own technology too."
          description="AlzDetect, VoiceDress, Young AI Explorers and AI Quest — products RimansTech owns, operates and continues to develop."
        />
        <div className="mt-10 md:mt-12">
          <ProductShowcasePanel animateEntrance />
        </div>
        <div className="mt-10 text-center md:mt-12">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-medium text-forest transition-colors hover:text-forest-hover"
          >
            Explore Our Products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
