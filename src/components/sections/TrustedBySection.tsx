import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { trustedClients } from "@content/trusted-clients";

export function TrustedBySection() {
  return (
    <section
      aria-labelledby="credibility-heading"
      className="border-y border-border-dark bg-obsidian py-12 md:py-16"
    >
      <Container>
        <p
          id="credibility-heading"
          className="mx-auto max-w-[720px] text-center text-sm leading-relaxed text-stone md:text-[15px]"
        >
          Built across AI, healthcare, education and digital products — with
          founders and organisations we&apos;ve partnered with on real software.
        </p>

        <ul
          className="mt-10 grid grid-cols-2 items-center justify-items-center gap-x-6 gap-y-8 sm:gap-x-10 md:mt-12 md:grid-cols-4 md:gap-x-8 lg:gap-x-12"
          aria-label="Selected clients and partners"
        >
          {trustedClients.map((client) => (
            <li
              key={client.name}
              className="flex h-10 items-center justify-center md:h-12"
            >
              <Image
                src={client.logo}
                alt={client.name}
                width={client.logoWidth}
                height={client.logoHeight}
                className="h-7 w-auto opacity-70 md:h-8"
                unoptimized
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
