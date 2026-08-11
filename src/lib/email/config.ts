export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY?.trim());
}

export function isProductionEmailFromVerified(): boolean {
  const from = process.env.EMAIL_FROM ?? "";
  return !from.includes("onboarding@resend.dev");
}
