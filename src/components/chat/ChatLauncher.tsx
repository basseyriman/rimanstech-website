"use client";

import { useChat } from "./ChatProvider";

export function ChatLauncher() {
  const { openChat } = useChat();

  return (
    <button
      type="button"
      onClick={openChat}
      className="fixed right-4 bottom-4 z-50 flex h-14 w-14 items-center justify-center rounded-xl bg-forest shadow-lg transition-colors hover:bg-forest-hover md:right-8 md:bottom-8 md:h-[58px] md:w-[58px]"
      aria-label="Open RimansTech AI Assistant"
    >
      <span className="text-sm font-semibold tracking-tight text-ivory">RT</span>
    </button>
  );
}
