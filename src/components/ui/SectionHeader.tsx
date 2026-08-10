import { cn } from "@/lib/utils";

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}

export function Eyebrow({ children, className, dark = false }: EyebrowProps) {
  return (
    <p
      className={cn(
        "mb-4 text-xs font-medium uppercase tracking-[0.12em] md:text-[13px]",
        dark ? "text-sage" : "text-stone",
        className
      )}
    >
      {children}
    </p>
  );
}

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  dark?: boolean;
  align?: "left" | "center";
  titleAs?: "h1" | "h2";
  serif?: boolean;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
  dark = false,
  align = "left",
  titleAs: Tag = "h2",
  serif = false,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "max-w-[760px]",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && <Eyebrow dark={dark}>{eyebrow}</Eyebrow>}
      <Tag
        className={cn(
          "text-[34px] font-medium leading-[1.05] tracking-[-0.02em] md:text-[48px] lg:text-[56px]",
          serif && "editorial-serif font-normal",
          dark ? "text-ivory" : "text-carbon"
        )}
      >
        {title}
      </Tag>
      {description && (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed md:text-lg md:leading-relaxed",
            dark ? "text-footer-secondary" : "text-graphite"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
