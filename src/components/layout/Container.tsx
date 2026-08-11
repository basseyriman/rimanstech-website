import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "shell" | "content" | "reading" | "full";
}

const sizeClasses = {
  shell: "max-w-[1440px]",
  content: "max-w-[1280px]",
  reading: "max-w-[760px]",
  full: "max-w-full",
};

export function Container({
  children,
  className,
  size = "content",
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-8 md:px-10 lg:px-16 xl:px-20",
        sizeClasses[size],
        className
      )}
    >
      {children}
    </div>
  );
}

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  bg?: "ivory" | "porcelain" | "obsidian" | "accent";
  spacing?: "default" | "compact" | "none";
}

const bgClasses = {
  ivory: "bg-page",
  porcelain: "bg-porcelain",
  obsidian: "bg-obsidian text-ivory",
  accent: "bg-accent-subtle",
};

const spacingClasses = {
  default: "py-[72px] md:py-[96px] lg:py-[120px] xl:py-[140px]",
  compact: "py-12 md:py-16 lg:py-20",
  none: "",
};

export function Section({
  children,
  className,
  id,
  bg = "ivory",
  spacing = "default",
}: SectionProps) {
  return (
    <section id={id} className={cn(bgClasses[bg], spacingClasses[spacing], className)}>
      {children}
    </section>
  );
}
