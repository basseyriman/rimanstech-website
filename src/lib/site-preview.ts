/**
 * Live site thumbnail from a URL — similar to WordPress link previews or
 * pasting a YouTube URL. Uses thum.io to render the page screenshot.
 */
export function getSiteThumbnailUrl(url: string, width = 1200, height = 900): string {
  const normalized = url.trim().replace(/\/$/, "");
  const authKey = process.env.NEXT_PUBLIC_THUM_IO_KEY;

  if (authKey) {
    return `https://image.thum.io/get/auth/${authKey}/width/${width}/crop/${height}/noanimate/${normalized}`;
  }

  return `https://image.thum.io/get/width/${width}/crop/${height}/noanimate/${normalized}`;
}

export function isRemoteImageSrc(src: string): boolean {
  return src.startsWith("http://") || src.startsWith("https://");
}
