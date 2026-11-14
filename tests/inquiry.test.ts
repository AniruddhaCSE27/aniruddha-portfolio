import assert from "node:assert/strict";
import { test } from "node:test";
import { formatInquiryEmail, formatInquiryHtml, formatInquirySubject, inquirySchema } from "../src/lib/inquiry";

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
