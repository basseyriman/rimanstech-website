import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ChatRole } from "@/types/chat";

type ChatMessageContentProps = {
  content: string;
  role: ChatRole;
};

export function ChatMessageContent({ content, role }: ChatMessageContentProps) {
  if (role === "user") {
    return <>{content}</>;
  }

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
        strong: ({ children }) => (
          <strong className="font-semibold text-carbon">{children}</strong>
        ),
        ol: ({ children }) => (
          <ol className="mb-2 list-decimal space-y-1 pl-5 last:mb-0">{children}</ol>
        ),
        ul: ({ children }) => (
          <ul className="mb-2 list-disc space-y-1 pl-5 last:mb-0">{children}</ul>
        ),
        li: ({ children }) => <li>{children}</li>,
        a: ({ href, children }) => (
          <a
            href={href}
            className="font-medium text-forest underline underline-offset-2 hover:text-forest-hover"
            target={href?.startsWith("/") ? undefined : "_blank"}
            rel={href?.startsWith("/") ? undefined : "noopener noreferrer"}
          >
            {children}
          </a>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
