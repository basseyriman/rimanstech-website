"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { X, RotateCcw, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { useChat } from "./ChatProvider";
import { SUGGESTED_PROMPTS } from "@/lib/chat/system-prompt";
import { EnquiryCapture } from "./EnquiryCapture";
import { trackEvent } from "@/lib/analytics";

export function ChatWindow() {
  const {
    messages,
    isLoading,
    showEnquiry,
    closeChat,
    sendMessage,
    clearConversation,
    setShowEnquiry,
  } = useChat();
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, showEnquiry]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;
    setInput("");
    await sendMessage(trimmed);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isWelcomeOnly =
    messages.length === 1 && messages[0]?.role === "assistant";

  return (
    <div
      className={cn(
        "fixed z-50 flex flex-col overflow-hidden border border-border-light bg-porcelain shadow-2xl",
        "inset-4 rounded-2xl",
        "md:inset-auto md:right-6 md:bottom-6 md:h-[620px] md:w-[400px] md:rounded-2xl",
        "lg:md:w-[420px]"
      )}
      role="dialog"
      aria-label="RimansTech AI Assistant"
    >
      <header className="flex shrink-0 items-center justify-between bg-obsidian px-4 py-3.5">
        <div>
          <h2 className="text-sm font-medium text-ivory">RimansTech AI Assistant</h2>
          <p className="text-xs text-sage">Online</p>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={clearConversation}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-ivory/60 transition-colors hover:bg-charcoal hover:text-ivory"
            aria-label="Clear conversation"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={closeChat}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-ivory/60 transition-colors hover:bg-charcoal hover:text-ivory"
            aria-label="Close chat"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </header>

      <p className="shrink-0 border-b border-border-light px-4 py-2 text-xs text-stone">
        Ask about our services, products or your project.
      </p>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "mb-3 max-w-[90%] rounded-xl px-4 py-3 text-sm leading-relaxed",
              msg.role === "user"
                ? "ml-auto bg-forest text-white"
                : "bg-assistant-bg text-carbon"
            )}
          >
            {msg.content}
          </div>
        ))}

        {isLoading && (
          <div className="mb-3 max-w-[90%] rounded-xl bg-assistant-bg px-4 py-3 text-sm text-stone">
            Thinking…
          </div>
        )}

        {isWelcomeOnly && !showEnquiry && (
          <div className="mt-2 flex flex-wrap gap-2">
            {SUGGESTED_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => {
                  trackEvent("suggested_question_clicked");
                  sendMessage(prompt);
                }}
                className="rounded-lg border border-border-light bg-ivory px-3 py-2 text-xs font-medium text-graphite transition-colors hover:border-sage hover:text-carbon"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        {showEnquiry && <EnquiryCapture messages={messages} />}

        {!showEnquiry && messages.length > 2 && (
          <button
            type="button"
            onClick={() => {
              trackEvent("project_enquiry_started");
              setShowEnquiry(true);
            }}
            className="mt-4 w-full rounded-lg border border-forest bg-forest/5 px-4 py-3 text-sm font-medium text-forest transition-colors hover:bg-forest/10"
          >
            Send Project Enquiry
          </button>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="shrink-0 border-t border-border-light p-3">
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message…"
            rows={1}
            maxLength={2000}
            disabled={isLoading}
            className="max-h-24 min-h-[44px] flex-1 resize-none rounded-lg border border-border-light bg-ivory px-3 py-2.5 text-sm text-carbon placeholder:text-stone focus:border-forest focus:outline-none"
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-forest text-white transition-colors hover:bg-forest-hover disabled:opacity-40"
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-2 text-[10px] leading-relaxed text-stone">
          Uses AI to answer questions. Avoid sharing sensitive information.{" "}
          <Link href="/privacy" className="underline hover:text-graphite">
            Privacy
          </Link>
        </p>
      </div>
    </div>
  );
}
