import { Resend } from "resend";
import { CONTACT_EMAIL } from "@/lib/utils";
import type { ProjectFormValues } from "@/lib/validation/project-form";

interface EnquiryEmailData extends ProjectFormValues {
  submittedAt?: string;
}

export async function sendEnquiryEmail(data: EnquiryEmailData) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL ?? CONTACT_EMAIL;
  const from = process.env.EMAIL_FROM ?? "RimansTech Website <onboarding@resend.dev>";

  const subject = `New RimansTech Project Enquiry – ${data.name}`;
  const html = buildEnquiryHtml(data);

  if (!apiKey) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "Email service is not configured. Set RESEND_API_KEY in production."
      );
    }

    console.warn("[email] RESEND_API_KEY not configured. Enquiry logged:", {
      to,
      subject,
      name: data.name,
      email: data.email,
    });
    return { success: true, simulated: true };
  }

  const resend = new Resend(apiKey);
  const result = await resend.emails.send({
    from,
    to,
    replyTo: data.email,
    subject,
    html,
  });

  if (result.error) {
    throw new Error(result.error.message);
  }

  return { success: true, id: result.data?.id };
}

function buildEnquiryHtml(data: EnquiryEmailData): string {
  return `
    <h2>New Project Enquiry</h2>
    <table style="border-collapse:collapse;width:100%;max-width:600px;">
      <tr><td style="padding:8px 0;font-weight:bold;">Name</td><td>${escapeHtml(data.name)}</td></tr>
      <tr><td style="padding:8px 0;font-weight:bold;">Email</td><td>${escapeHtml(data.email)}</td></tr>
      <tr><td style="padding:8px 0;font-weight:bold;">Company</td><td>${escapeHtml(data.company ?? "—")}</td></tr>
      <tr><td style="padding:8px 0;font-weight:bold;">Phone</td><td>${escapeHtml(data.phone ?? "—")}</td></tr>
      <tr><td style="padding:8px 0;font-weight:bold;">Category</td><td>${escapeHtml(data.category)}</td></tr>
      <tr><td style="padding:8px 0;font-weight:bold;">Stage</td><td>${escapeHtml(data.stage)}</td></tr>
      <tr><td style="padding:8px 0;font-weight:bold;">Budget</td><td>${escapeHtml(data.budget)}</td></tr>
      <tr><td style="padding:8px 0;font-weight:bold;">Timeline</td><td>${escapeHtml(data.timeline)}</td></tr>
      <tr><td style="padding:8px 0;font-weight:bold;">Source</td><td>${escapeHtml(data.sourcePage ?? "Website")}</td></tr>
    </table>
    <h3>Project Description</h3>
    <p>${escapeHtml(data.description).replace(/\n/g, "<br>")}</p>
    ${data.problem ? `<h3>Problem</h3><p>${escapeHtml(data.problem).replace(/\n/g, "<br>")}</p>` : ""}
    ${data.chatSummary ? `<h3>Chat Summary</h3><p>${escapeHtml(data.chatSummary).replace(/\n/g, "<br>")}</p>` : ""}
    <p style="color:#888;font-size:12px;margin-top:24px;">Submitted: ${data.submittedAt ?? new Date().toISOString()}</p>
  `;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendChatEnquiryEmail(data: {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  chatSummary: string;
}) {
  return sendEnquiryEmail({
    name: data.name,
    email: data.email,
    company: data.company,
    phone: data.phone,
    category: "Other",
    description: "Project enquiry submitted via AI Assistant chat.",
    stage: "Idea",
    budget: "Not Sure Yet",
    timeline: "Flexible",
    chatSummary: data.chatSummary,
    sourcePage: "AI Assistant",
    submittedAt: new Date().toISOString(),
  });
}
