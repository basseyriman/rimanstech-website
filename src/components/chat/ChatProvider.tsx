"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { ChatMessage } from "@/types/chat";
import { WELCOME_MESSAGE } from "@/lib/chat/system-prompt";
import { trackEvent } from "@/lib/analytics";
import { ChatWidget } from "./ChatWidget";

interface ChatContextValue {
  isOpen: boolean;
  messages: ChatMessage[];
  isLoading: boolean;
  showEnquiry: boolean;
  openChat: () => void;
  closeChat: () => void;
  sendMessage: (content: string) => Promise<void>;
  clearConversation: () => void;
  setShowEnquiry: (show: boolean) => void;
}

const ChatContext = createContext<ChatContextValue | null>(null);

const STORAGE_KEY = "rimanstech-chat";

function createMessage(role: ChatMessage["role"], content: string): ChatMessage {
  return { id: crypto.randomUUID(), role, content, timestamp: Date.now() };
}

export function ChatProvider() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        setMessages(JSON.parse(stored));
      } else {
        setMessages([createMessage("assistant", WELCOME_MESSAGE)]);
      }
    } catch {
      setMessages([createMessage("assistant", WELCOME_MESSAGE)]);
    }
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (!initialized || messages.length === 0) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      /* ignore storage errors */
    }
  }, [messages, initialized]);

  const openChat = useCallback(() => {
    setIsOpen(true);
    trackEvent("chat_opened");
    if (messages.length === 0) {
      setMessages([createMessage("assistant", WELCOME_MESSAGE)]);
    }
  }, [messages.length]);

  const closeChat = useCallback(() => setIsOpen(false), []);

  const clearConversation = useCallback(() => {
    setMessages([createMessage("assistant", WELCOME_MESSAGE)]);
    setShowEnquiry(false);
    sessionStorage.removeItem(STORAGE_KEY);
  }, []);

  const sendMessage = useCallback(
    async (content: string) => {
      const userMsg = createMessage("user", content);
      const updated = [...messages, userMsg];
      setMessages(updated);
      setIsLoading(true);
      trackEvent("chat_message_sent");

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: updated
              .filter((m) => m.role !== "system")
              .map((m) => ({ role: m.role, content: m.content })),
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          setMessages((prev) => [
            ...prev,
            createMessage(
              "assistant",
              data.error ??
                "I'm temporarily unavailable. You can contact us at support@rimanstech.com or visit /start-a-project."
            ),
          ]);
          return;
        }

        setMessages((prev) => [...prev, createMessage("assistant", data.message)]);

        if (data.commercialIntent) {
          trackEvent("project_interest_detected");
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          createMessage(
            "assistant",
            "I'm having trouble connecting. Please try again or contact support@rimanstech.com."
          ),
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [messages]
  );

  return (
    <ChatContext.Provider
      value={{
        isOpen,
        messages,
        isLoading,
        showEnquiry,
        openChat,
        closeChat,
        sendMessage,
        clearConversation,
        setShowEnquiry,
      }}
    >
      <ChatWidget />
    </ChatContext.Provider>
  );
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used within ChatProvider");
  return ctx;
}
