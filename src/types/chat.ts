export type ChatRole = "user" | "assistant" | "system";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  timestamp: number;
}

export interface ChatEnquiryData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  chatSummary: string;
  consent: boolean;
}

export type AnalyticsEvent =
  | "chat_opened"
  | "chat_message_sent"
  | "suggested_question_clicked"
  | "project_interest_detected"
  | "project_enquiry_started"
  | "project_enquiry_submitted"
  | "contact_email_clicked";
