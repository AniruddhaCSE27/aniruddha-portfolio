import assert from "node:assert/strict";
import { test } from "node:test";
import { formatInquiryEmail, formatInquiryHtml, formatInquirySubject, inquirySchema } from "../src/lib/inquiry";
import { buildFormSubmitPayload, getFormSubmitEndpoint, submitInquiryToFormSubmit } from "../src/lib/formsubmit";

const validInquiry = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  company: "Analytical Engines",
  country: "United Kingdom",
  service: "Custom Software",
  description: "We need to replace a manual reporting workflow with a dependable internal tool.",
  timeline: "This quarter",
  contactMethod: "Email",
  whatsappNumber: "",
  consent: true,
  websiteHoneypot: "",
};

const submittedAt = new Date("2026-11-14T10:30:00.000Z");

test("inquirySchema accepts a complete inquiry", () => {
  assert.equal(inquirySchema.safeParse(validInquiry).success, true);
});

test("inquirySchema rejects short descriptions and missing consent", () => {
  const result = inquirySchema.safeParse({ ...validInquiry, description: "Too short", consent: false });
  assert.equal(result.success, false);
});

test("inquirySchema rejects a filled honeypot", () => {
  const result = inquirySchema.safeParse({ ...validInquiry, websiteHoneypot: "bot" });
  assert.equal(result.success, false);
});

test("inquirySchema requires a WhatsApp number when WhatsApp is selected", () => {
  const result = inquirySchema.safeParse({ ...validInquiry, contactMethod: "WhatsApp", whatsappNumber: "" });
  assert.equal(result.success, false);
});

test("email subject uses the requested service and company format", () => {
  const parsed = inquirySchema.parse(validInquiry);
  assert.equal(formatInquirySubject(parsed), "New Project Inquiry | Custom Software | Analytical Engines");
});

test("plain-text email includes the complete inquiry without budget fields", () => {
  const parsed = inquirySchema.parse(validInquiry);
  const email = formatInquiryEmail(parsed, submittedAt);
  assert.match(email, /NEW BUSINESS INQUIRY/);
  assert.match(email, /Client Name: Ada Lovelace/);
  assert.match(email, /Project Description:/);
  assert.match(email, /Submission Date and Time: 2026-11-14T10:30:00.000Z \(UTC\)/);
  assert.match(email, /Source: Aniruddha Pathak Portfolio Website/);
  assert.doesNotMatch(email, /Budget/);
});

test("HTML email escapes visitor content", () => {
  const parsed = inquirySchema.parse({ ...validInquiry, description: "Build <script>alert('x')</script> safely for our team." });
  const html = formatInquiryHtml(parsed, submittedAt);
  assert.match(html, /&lt;script&gt;alert\(&#39;x&#39;\)&lt;\/script&gt;/);
  assert.doesNotMatch(html, /<script>/);
});

test("FormSubmit payload includes every inquiry field and reply metadata", () => {
  const parsed = inquirySchema.parse({ ...validInquiry, submissionId: "8f7c2a1e-6c87-4d0a-8b52-1e4f2e8a8b1a" });
  const payload = buildFormSubmitPayload(parsed, submittedAt, "https://aniruddha-portfolio-wheat.vercel.app/contact");
  assert.equal(getFormSubmitEndpoint("aniruddha.2005@outlook.com"), "https://formsubmit.co/ajax/aniruddha.2005%40outlook.com");
  assert.equal(payload._subject, "New Project Inquiry | Custom Software | Analytical Engines");
  assert.equal(payload._replyto, "ada@example.com");
  assert.equal(payload.description, parsed.description);
  assert.equal(payload.consent, "Confirmed");
  assert.equal(payload.submittedAt, "2026-11-14T10:30:00.000Z (UTC)");
  assert.equal(payload._url, "https://aniruddha-portfolio-wheat.vercel.app/contact");
});

test("FormSubmit reports success only when the provider confirms acceptance", async () => {
  let requestBody = "";
  const parsed = inquirySchema.parse(validInquiry);
  const result = await submitInquiryToFormSubmit(parsed, "aniruddha.2005@outlook.com", async (input, init) => {
    requestBody = JSON.stringify({ input: String(input), body: init?.body });
    return new Response(JSON.stringify({ success: true, message: "Form submitted successfully; activation confirmed" }), { status: 200 });
  }, submittedAt, "https://aniruddha-portfolio-wheat.vercel.app/contact");
  assert.deepEqual(result, { ok: true, activationRequired: true });
  assert.match(requestBody, /Analytical Engines/);
});

test("FormSubmit provider failures are surfaced without claiming success", async () => {
  const parsed = inquirySchema.parse(validInquiry);
  const rejected = await submitInquiryToFormSubmit(parsed, "aniruddha.2005@outlook.com", async () => new Response(JSON.stringify({ success: false, message: "Unable to submit form" }), { status: 200 }), submittedAt, "https://aniruddha-portfolio-wheat.vercel.app/contact");
  const unavailable = await submitInquiryToFormSubmit(parsed, "aniruddha.2005@outlook.com", async () => new Response("upstream failure", { status: 502 }), submittedAt, "https://aniruddha-portfolio-wheat.vercel.app/contact");
  const offline = await submitInquiryToFormSubmit(parsed, "aniruddha.2005@outlook.com", async () => { throw new Error("network unavailable"); }, submittedAt, "https://aniruddha-portfolio-wheat.vercel.app/contact");
  assert.deepEqual(rejected, { ok: false, reason: "provider" });
  assert.deepEqual(unavailable, { ok: false, reason: "provider" });
  assert.deepEqual(offline, { ok: false, reason: "network" });
});
