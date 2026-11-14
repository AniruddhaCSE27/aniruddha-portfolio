import "server-only";

export const defaultFormSubmitRecipient = "aniruddha.2005@outlook.com";
export const defaultFormSubmitSiteUrl = "https://aniruddha-portfolio-wheat.vercel.app/contact";

export function getContactConfiguration() {
  const recipientEmail = process.env.FORM_SUBMIT_RECIPIENT_EMAIL?.trim() || defaultFormSubmitRecipient;
  const siteUrl = process.env.FORM_SUBMIT_FORM_URL?.trim() || `${(process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://aniruddha-portfolio-wheat.vercel.app").replace(/\/+$/, "")}/contact`;
  const isConfigured = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipientEmail);
  return { recipientEmail, siteUrl, isConfigured };
}
