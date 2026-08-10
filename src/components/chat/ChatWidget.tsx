"use client";

import { ChatLauncher } from "./ChatLauncher";
import { ChatWindow } from "./ChatWindow";
import { useChat } from "./ChatProvider";

export function ChatWidget() {
  const { isOpen } = useChat();
  return (
    <>
      {!isOpen && <ChatLauncher />}
      {isOpen && <ChatWindow />}
    </>
  );
}
