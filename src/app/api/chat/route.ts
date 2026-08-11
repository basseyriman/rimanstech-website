import { NextResponse } from "next/server";
import { chatMessageSchema } from "@/lib/validation/project-form";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { CONTACT_EMAIL } from "@/lib/utils";
import { verifyTurnstileToken } from "@/lib/turnstile";
import {
  CHAT_SYSTEM_PROMPT,
  detectCommercialIntent,
} from "@/lib/chat/system-prompt";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limit = await rateLimit(ip);

  if (!limit.success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = chatMessageSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid message format." }, { status: 400 });
  }

  const turnstileOk = await verifyTurnstileToken(parsed.data.turnstileToken);
  if (!turnstileOk) {
    return NextResponse.json({ error: "Verification failed." }, { status: 403 });
  }

  const { messages } = parsed.data;
  const lastUserMessage = [...messages].reverse().find((m) => m.role === "user");
  const commercialIntent = lastUserMessage
    ? detectCommercialIntent(lastUserMessage.content)
    : false;

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({
      message:
        `The AI assistant is temporarily unavailable. You can explore our services at /services, submit a project at /start-a-project, or contact us at ${CONTACT_EMAIL}.`,
      commercialIntent,
    });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: CHAT_SYSTEM_PROMPT },
          ...messages.map((m) => ({
            role: m.role as "user" | "assistant",
            content: m.content.slice(0, 2000),
          })),
        ],
        max_tokens: 600,
        temperature: 0.4,
      }),
    });

    if (!response.ok) {
      throw new Error("OpenAI API error");
    }

    const data = await response.json();
    const message =
      data.choices?.[0]?.message?.content ??
      `I don't want to give you inaccurate information. You can contact the RimansTech team directly at ${CONTACT_EMAIL}.`;

    return NextResponse.json({ message, commercialIntent });
  } catch {
    return NextResponse.json({
      message:
        `I'm having trouble responding right now. Please contact ${CONTACT_EMAIL} or visit /start-a-project.`,
      commercialIntent,
    });
  }
}
