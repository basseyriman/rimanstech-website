import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/layout/Container";
import { FooterWordmark } from "@/components/layout/FooterWordmark";
import {
  FOOTER_SERVICES,
  FOOTER_PRODUCTS,
  FOOTER_WORK,
  FOOTER_COMPANY,
  SOCIAL_LINKS,
} from "@/lib/constants";
import { CONTACT_EMAIL } from "@/lib/utils";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="footer" className="bg-obsidian text-ivory">
      <Container size="shell" className="pt-20 pb-10 md:pt-24 lg:pt-[100px]">
        <FooterWordmark />

        <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-6 lg:gap-8">
          <FooterColumn title="Services">
            {FOOTER_SERVICES.map((item) => (
              <FooterLink key={item.href} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Products">
            {FOOTER_PRODUCTS.map((item) => (
              <FooterLink key={item.href} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Work">
            {FOOTER_WORK.map((item) => (
              <FooterLink key={item.href} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Company">
            {FOOTER_COMPANY.map((item) => (
              <FooterLink key={item.href} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Work With Us">
            <FooterLink href="/start-a-project">Start a Project</FooterLink>
            <FooterLink href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </FooterLink>
          </FooterColumn>

          <FooterColumn title="Social">
            {SOCIAL_LINKS.map((item) => (
              <FooterLink key={item.label} href={item.href} external>
                {item.label}
              </FooterLink>
            ))}
          </FooterColumn>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border-dark pt-8 md:flex-row md:items-center">
          <div className="flex items-center gap-6">
            <Logo variant="light" showIndustries />
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-footer-secondary">
            <span>© RimansTech Industries {year}</span>
            <Link
              href="/privacy"
              className="transition-colors hover:text-ivory"
            >
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-ivory">
              Terms
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="mb-4 text-xs font-medium tracking-[0.12em] text-footer-secondary uppercase">
        {title}
      </h3>
      <ul className="space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const isMailto = href.startsWith("mailto:");
  const className =
    "text-sm text-ivory/80 transition-colors hover:text-ivory block";

  if (external || isMailto) {
    return (
      <li>
        <a
          href={href}
          className={className}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {children}
        </a>
      </li>
    );
  }

  return (
    <li>
      <Link href={href} className={className}>
        {children}
      </Link>
    </li>
  );
}
