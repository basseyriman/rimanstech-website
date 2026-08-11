import { NextResponse } from "next/server";
import { projectFormSchema, contactFormSchema } from "@/lib/validation/project-form";
import { isEmailConfigured } from "@/lib/email/config";
import { sendEnquiryEmail, sendContactEmail } from "@/lib/email/send-enquiry";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { CONTACT_EMAIL } from "@/lib/utils";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limit = await rateLimit(ip);

  if (!limit.success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  if (process.env.NODE_ENV === "production" && !isEmailConfigured()) {
    return NextResponse.json(
      {
        error:
          `Enquiry delivery is temporarily unavailable. Please email ${CONTACT_EMAIL}.`,
      },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const isContact =
    typeof body === "object" &&
    body !== null &&
    "type" in body &&
    (body as { type?: string }).type === "contact";

  if (isContact) {
    const parsed = contactFormSchema.safeParse(body);
    if (!parsed.success) {
      const errors: Record<string, string> = {};
      parsed.error.issues.forEach((issue) => {
        const key = issue.path[0]?.toString();
        if (key) errors[key] = issue.message;
      });
      return NextResponse.json({ error: "Validation failed", errors }, { status: 400 });
    }

    const turnstileOk = await verifyTurnstileToken(parsed.data.turnstileToken);
    if (!turnstileOk) {
      return NextResponse.json({ error: "Verification failed. Please try again." }, { status: 403 });
    }

    try {
      await sendContactEmail({
        ...parsed.data,
        submittedAt: new Date().toISOString(),
      });
      return NextResponse.json({ success: true });
    } catch {
      return NextResponse.json(
        { error: `Failed to send message. Please email ${CONTACT_EMAIL}.` },
        { status: 500 }
      );
    }
  }

  const parsed = projectFormSchema.safeParse(body);

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    parsed.error.issues.forEach((issue) => {
      const key = issue.path[0]?.toString();
      if (key) errors[key] = issue.message;
    });
    return NextResponse.json({ error: "Validation failed", errors }, { status: 400 });
  }

  const turnstileOk = await verifyTurnstileToken(
    (body as { turnstileToken?: string }).turnstileToken
  );
  if (!turnstileOk) {
    return NextResponse.json({ error: "Verification failed. Please try again." }, { status: 403 });
  }

  try {
    await sendEnquiryEmail({
      ...parsed.data,
      submittedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: `Failed to send enquiry. Please email ${CONTACT_EMAIL}.` },
      { status: 500 }
    );
  }
}
