import Image from "next/image";
import { cn } from "@/lib/utils";
import { SitePreviewImage } from "@/components/ui/SitePreviewImage";

interface ProductMediaProps {
  image: string;
  imageAlt: string;
  previewUrl?: string;
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
  previewUrl,
  video,
  imageFit = "cover",
  imageBg = "porcelain",
  priority = false,
  aspect = "standard",
  className,
  sizes = "(max-width: 1024px) 100vw, 50vw",
}: ProductMediaProps) {
  const isContain = imageFit === "contain";
  const mediaClassName = cn(
    "h-full w-full",
    isContain ? "object-contain object-top p-3 md:p-5" : "object-cover object-center",
    previewUrl && !isContain && !video && "object-top"
  );

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
          className={mediaClassName}
          aria-label={imageAlt}
        />
      ) : previewUrl ? (
        <SitePreviewImage
          previewUrl={previewUrl}
          fallbackImage={image}
          alt={imageAlt}
          priority={priority}
          sizes={sizes}
          className={mediaClassName}
        />
      ) : (
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority={priority}
          sizes={sizes}
          className={mediaClassName}
        />
      )}
    </div>
  );
}
