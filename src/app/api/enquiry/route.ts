import { NextResponse } from "next/server";
import { projectFormSchema } from "@/lib/validation/project-form";
import { sendEnquiryEmail } from "@/lib/email/send-enquiry";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limit = rateLimit(ip);

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

  const parsed = projectFormSchema.safeParse(body);

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    parsed.error.issues.forEach((issue) => {
      const key = issue.path[0]?.toString();
      if (key) errors[key] = issue.message;
    });
    return NextResponse.json({ error: "Validation failed", errors }, { status: 400 });
  }

  try {
    await sendEnquiryEmail({
      ...parsed.data,
      submittedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to send enquiry. Please email support@rimanstech.com." },
      { status: 500 }
    );
  }
}
