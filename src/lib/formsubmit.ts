import { formatInquiryEmail, formatInquirySubject, type InquiryPayload } from "./inquiry";

const formSubmitBaseUrl = "https://formsubmit.co/ajax";

type FormSubmitResponse = { success?: boolean | string; message?: string };

export type FormSubmitResult =
  | { ok: true; activationRequired: boolean }
  | { ok: false; reason: "provider" | "network" };

export function getFormSubmitEndpoint(recipientEmail: string) {
  return `${formSubmitBaseUrl}/${encodeURIComponent(recipientEmail)}`;
}

export function buildFormSubmitPayload(payload: InquiryPayload, submittedAt = new Date(), siteUrl = "https://aniruddha-portfolio-wheat.vercel.app/contact") {
  return {
    name: payload.name,
    email: payload.email,
    company: payload.company || "Not provided",
    country: payload.country,
    service: payload.service,
    description: payload.description,
    timeline: payload.timeline || "Not provided",
    contactMethod: payload.contactMethod,
    whatsappNumber: payload.whatsappNumber || "Not provided",
    consent: "Confirmed",
    submissionId: payload.submissionId || "Not provided",
    submittedAt: `${submittedAt.toISOString()} (UTC)`,
    _url: siteUrl,
    message: formatInquiryEmail(payload, submittedAt),
    _subject: formatInquirySubject(payload),
    _replyto: payload.email,
    _template: "table",
    _honey: "",
  };
}

export async function submitInquiryToFormSubmit(
  payload: InquiryPayload,
  recipientEmail: string,
  fetchImpl: typeof fetch = fetch,
  submittedAt = new Date(),
  siteUrl = "https://aniruddha-portfolio-wheat.vercel.app/contact",
): Promise<FormSubmitResult> {
  try {
    const response = await fetchImpl(getFormSubmitEndpoint(recipientEmail), {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json", Referer: siteUrl },
      body: JSON.stringify(buildFormSubmitPayload(payload, submittedAt, siteUrl)),
    });
    let result: FormSubmitResponse = {};
    try {
      result = await response.json() as FormSubmitResponse;
    } catch {
      return { ok: false, reason: "provider" };
    }
    const providerAccepted = result.success === true || result.success === "true";
    if (!response.ok || !providerAccepted) return { ok: false, reason: "provider" };
    return { ok: true, activationRequired: /activat|confirm/i.test(result.message || "") };
  } catch {
    return { ok: false, reason: "network" };
  }
}
