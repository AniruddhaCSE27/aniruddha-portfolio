import "server-only";

export function getContactConfiguration() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();
  return { apiKey, to, from, isConfigured: Boolean(apiKey && to && from) };
}
