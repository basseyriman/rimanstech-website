import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageFrameProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: "hero" | "feature" | "portrait" | "case" | "product";
  priority?: boolean;
}

const aspectClasses = {
  hero: "aspect-[16/10]",
  feature: "aspect-[4/3]",
  portrait: "aspect-[3/4]",
  case: "aspect-video",
  product: "aspect-[4/3]",
};

export function ImageFrame({
  src,
  alt,
  className,
  aspectRatio = "feature",
  priority = false,
}: ImageFrameProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-border-light bg-porcelain",
        aspectClasses[aspectRatio],
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className="image-editorial object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px"
      />
    </div>
  );
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border-light bg-porcelain p-6 md:p-8",
        hover && "transition-colors duration-200 hover:border-sage/50",
        className
      )}
    >
      {children}
    </div>
  );
}
