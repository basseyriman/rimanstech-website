import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "default" | "sm";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  dark?: boolean;
  href?: string;
  children: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-forest text-white hover:bg-forest-hover border border-transparent",
  secondary:
    "bg-transparent border border-secondary-border text-carbon hover:border-forest hover:text-forest",
  ghost: "bg-transparent text-carbon hover:text-forest border border-transparent",
};

const darkVariantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-forest text-white hover:bg-forest-hover border border-transparent",
  secondary:
    "bg-transparent border border-white/30 text-ivory hover:border-white hover:text-white",
  ghost: "bg-transparent text-ivory hover:text-white border border-transparent",
};

const sizeClasses: Record<ButtonSize, string> = {
  default: "h-[46px] md:h-12 px-6 md:px-7 text-sm md:text-[15px]",
  sm: "h-10 px-5 text-sm",
};

export function Button({
  variant = "primary",
  size = "default",
  dark = false,
  href,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-lg font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest",
    dark ? darkVariantClasses[variant] : variantClasses[variant],
    sizeClasses[size],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

interface CTAProps {
  primary: { label: string; href?: string; onClick?: () => void };
  secondary?: { label: string; href?: string; onClick?: () => void };
  dark?: boolean;
  className?: string;
}

export function CTA({ primary, secondary, dark = false, className }: CTAProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-3 md:gap-4", className)}>
      {primary.href ? (
        <Button href={primary.href} dark={dark}>
          {primary.label}
        </Button>
      ) : (
        <Button onClick={primary.onClick} dark={dark}>
          {primary.label}
        </Button>
      )}
      {secondary &&
        (secondary.href ? (
          <Button variant="secondary" href={secondary.href} dark={dark}>
            {secondary.label}
          </Button>
        ) : (
          <Button variant="secondary" onClick={secondary.onClick} dark={dark}>
            {secondary.label}
          </Button>
        ))}
    </div>
  );
}
