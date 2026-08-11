import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductMediaProps {
  image: string;
  imageAlt: string;
  video?: string;
  imageFit?: "cover" | "contain";
  imageBg?: "porcelain" | "obsidian" | "page";
  priority?: boolean;
  aspect?: "video" | "standard";
  className?: string;
  sizes?: string;
}

const bgClass = {
  porcelain: "bg-porcelain",
  obsidian: "bg-obsidian",
  page: "bg-page",
} as const;

export function ProductMedia({
  image,
  imageAlt,
  video,
  imageFit = "cover",
  imageBg = "porcelain",
  priority = false,
  aspect = "standard",
  className,
  sizes = "(max-width: 1024px) 100vw, 50vw",
}: ProductMediaProps) {
  const isContain = imageFit === "contain";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border-light",
        bgClass[imageBg],
        aspect === "video" ? "aspect-video" : "aspect-[4/3]",
        className
      )}
    >
      {video ? (
        <video
          src={video}
          poster={image}
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
          aria-label={imageAlt}
        />
      ) : (
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority={priority}
          sizes={sizes}
          className={cn(
            isContain ? "object-contain p-5 md:p-8" : "object-cover object-center"
          )}
        />
      )}
    </div>
  );
}
