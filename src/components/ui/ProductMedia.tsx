import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductMediaProps {
  image: string;
  imageAlt: string;
  video?: string;
  imageFit?: "cover" | "contain";
  priority?: boolean;
  aspect?: "video" | "standard";
  className?: string;
  sizes?: string;
}

export function ProductMedia({
  image,
  imageAlt,
  video,
  imageFit = "cover",
  priority = false,
  aspect = "standard",
  className,
  sizes = "(max-width: 1024px) 100vw, 50vw",
}: ProductMediaProps) {
  const isContain = imageFit === "contain";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border-light bg-porcelain",
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
          className={cn(isContain ? "object-contain p-4 md:p-6" : "object-cover")}
        />
      )}
    </div>
  );
}
