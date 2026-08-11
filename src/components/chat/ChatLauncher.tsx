"use client";

import Image from "next/image";
import { useChat } from "./ChatProvider";

export function ChatLauncher() {
  const { openChat } = useChat();

  return (
    <button
      type="button"
      onClick={openChat}
      className="fixed right-4 bottom-4 z-50 flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border-0 bg-charcoal p-2 shadow-lg ring-1 ring-black/10 outline-none transition-transform duration-200 hover:scale-[1.04] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 dark:ring-white/10 md:right-8 md:bottom-8 md:h-[58px] md:w-[58px]"
      aria-label="Open RimansTech AI Assistant"
    >
      <Image
        src="/brand/rimanstech-monogram-launcher-icon.png"
        alt=""
        width={58}
        height={58}
        className="h-full w-full object-contain"
        aria-hidden="true"
      />
    </button>
  );
}
