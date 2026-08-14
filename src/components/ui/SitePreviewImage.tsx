"use client";

import { useState } from "react";
import Image from "next/image";
import { getSiteThumbnailUrl } from "@/lib/site-preview";

interface SitePreviewImageProps {
  previewUrl: string;
  fallbackImage: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}

export function SitePreviewImage({
  previewUrl,
  fallbackImage,
  alt,
  priority = false,
  sizes = "(max-width: 1024px) 100vw, 50vw",
  className,
}: SitePreviewImageProps) {
  const [src, setSrc] = useState(() => getSiteThumbnailUrl(previewUrl));
  const [usedFallback, setUsedFallback] = useState(false);

  return (
    <Image
      src={usedFallback ? fallbackImage : src}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      className={className}
      unoptimized={!usedFallback}
      onError={() => {
        if (!usedFallback) {
          setUsedFallback(true);
          setSrc(fallbackImage);
        }
      }}
    />
  );
}
