import { z } from "zod";
import { serviceOptions } from "./site";

const optionalShortText = (max: number) => z.string().trim().max(max, `Please keep this field under ${max} characters.`).optional().or(z.literal(""));

export const inquirySchema = z.object({
  name: z.string().trim().min(2, "Please share your name.").max(80, "Please keep your name under 80 characters."),
  email: z.string().trim().email("Enter a valid work email.").max(160, "Please keep your email under 160 characters."),
  company: optionalShortText(120),
  country: z.string().trim().min(2, "Please share your country.").max(80, "Please keep your country under 80 characters."),
  service: z.enum(serviceOptions, { errorMap: () => ({ message: "Choose a service category." }) }),
  description: z.string().trim().min(30, "Tell me a little more about the problem or opportunity.").max(5000, "Please keep the project description under 5,000 characters."),
  timeline: optionalShortText(120),
  contactMethod: z.enum(["Email", "WhatsApp"], { errorMap: () => ({ message: "Choose a preferred contact method." }) }),
  whatsappNumber: optionalShortText(40),
  submissionId: z.string().uuid().optional(),
  consent: z.literal(true, { errorMap: () => ({ message: "Please confirm you are happy for me to use these details to respond." }) }),
  websiteHoneypot: z.string().max(0).optional(),
}).superRefine((data, context) => {
  if (data.contactMethod === "WhatsApp" && !data.whatsappNumber) {
    context.addIssue({ code: z.ZodIssueCode.custom, path: ["whatsappNumber"], message: "Please include a reachable WhatsApp number with country code." });
  }
});

export type InquiryPayload = z.infer<typeof inquirySchema>;

export const inquiryMaxBodyBytes = 12_000;

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character] || character);
}

function formatSubmissionDate(date: Date) {
  return `${date.toISOString()} (UTC)`;
}

export function formatInquirySubject(payload: InquiryPayload) {
  const clientOrCompany = (payload.company || payload.name).replace(/[\r\n]+/g, " ").trim();
  return `New Project Inquiry | ${payload.service} | ${clientOrCompany}`;
}

export function formatInquiryEmail(payload: InquiryPayload, submittedAt = new Date()) {
  const lines = [
    "NEW BUSINESS INQUIRY",
    "",
    `Client Name: ${payload.name}`,
    `Business Email: ${payload.email}`,
    `Company: ${payload.company || "Not provided"}`,
    `Country: ${payload.country}`,
    `Service Requested: ${payload.service}`,
    "",
    "Project Description:",
    payload.description,
    "",
    `Preferred Timeline: ${payload.timeline || "Not provided"}`,
    `Preferred Contact Method: ${payload.contactMethod}`,
    `WhatsApp Number: ${payload.whatsappNumber || "Not provided"}`,
    `Submission Date and Time: ${formatSubmissionDate(submittedAt)}`,
    "",
    "Source: Aniruddha Pathak Portfolio Website",
  ];

  return lines.join("\n");
}

export function formatInquiryHtml(payload: InquiryPayload, submittedAt = new Date()) {
  const field = (label: string, value: string) => `<p><strong>${escapeHtml(label)}</strong><br />${escapeHtml(value)}</p>`;
  return [
    "<h1>NEW BUSINESS INQUIRY</h1>",
    field("Client Name", payload.name),
    field("Business Email", payload.email),
    field("Company", payload.company || "Not provided"),
    field("Country", payload.country),
    field("Service Requested", payload.service),
    field("Project Description", payload.description),
    field("Preferred Timeline", payload.timeline || "Not provided"),
    field("Preferred Contact Method", payload.contactMethod),
    field("WhatsApp Number", payload.whatsappNumber || "Not provided"),
    field("Submission Date and Time", formatSubmissionDate(submittedAt)),
    "<p><strong>Source</strong><br />Aniruddha Pathak Portfolio Website</p>",
  ].join("");
}
