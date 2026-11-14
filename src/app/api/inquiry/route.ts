import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { formatInquiryEmail, formatInquiryHtml, formatInquirySubject, inquiryMaxBodyBytes, inquirySchema } from "@/lib/inquiry";
import { getContactConfiguration } from "@/lib/contact";

export const runtime = "nodejs";

const attempts = new Map<string, { count: number; resetAt: number }>();
const recentSubmissions = new Map<string, number>();
const windowMs = 60 * 60 * 1000;
const duplicateWindowMs = 15 * 60 * 1000;
const maxAttempts = 5;

function cleanupExpiredEntries(now: number) {
  for (const [key, entry] of attempts) if (entry.resetAt <= now) attempts.delete(key);
  for (const [key, expiresAt] of recentSubmissions) if (expiresAt <= now) recentSubmissions.delete(key);
  if (attempts.size > 10_000) attempts.clear();
  if (recentSubmissions.size > 10_000) recentSubmissions.clear();
}

function getClientKey(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > inquiryMaxBodyBytes) return NextResponse.json({ error: "This inquiry is larger than the allowed limit." }, { status: 413 });

  const now = Date.now();
  cleanupExpiredEntries(now);
  const key = getClientKey(request);
  const current = attempts.get(key);
  if (current && current.resetAt > now && current.count >= maxAttempts) {
    return NextResponse.json({ error: "Too many inquiries from this connection. Please try again later." }, { status: 429 });
  }
  attempts.set(key, current && current.resetAt > now ? { count: current.count + 1, resetAt: current.resetAt } : { count: 1, resetAt: now + windowMs });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "The inquiry could not be read. Please try again." }, { status: 400 });
  }

  if (new TextEncoder().encode(JSON.stringify(body)).byteLength > inquiryMaxBodyBytes) return NextResponse.json({ error: "This inquiry is larger than the allowed limit." }, { status: 413 });

  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return NextResponse.json({ error: firstIssue?.message || "Please check the form and try again.", field: firstIssue?.path[0] }, { status: 400 });
  }

  if (parsed.data.websiteHoneypot) return NextResponse.json({ error: "Please try again." }, { status: 400 });

  const configuration = getContactConfiguration();
  if (!configuration.isConfigured || !configuration.apiKey || !configuration.to || !configuration.from) {
    return NextResponse.json({ error: "Contact delivery is not configured yet. Please try again later." }, { status: 503 });
  }

  const fingerprint = createHash("sha256").update([
    parsed.data.email.toLowerCase(),
    parsed.data.company || "",
    parsed.data.country,
    parsed.data.service,
    parsed.data.description,
  ].join("\u001f")).digest("hex");
  const idempotencyKey = parsed.data.submissionId || `inquiry/${fingerprint}`;
  const recentSubmission = recentSubmissions.get(fingerprint);
  if (recentSubmission && recentSubmission > now) return NextResponse.json({ error: "This inquiry has already been submitted recently. Please wait before sending it again." }, { status: 409 });
  recentSubmissions.set(fingerprint, now + duplicateWindowMs);

  try {
    const submittedAt = new Date();
    const resend = new Resend(configuration.apiKey);
    const result = await resend.emails.send({
      from: configuration.from,
      to: configuration.to,
      replyTo: parsed.data.email,
      subject: formatInquirySubject(parsed.data),
      html: formatInquiryHtml(parsed.data, submittedAt),
      text: formatInquiryEmail(parsed.data, submittedAt),
    }, { idempotencyKey });
    if (result.error) {
      recentSubmissions.delete(fingerprint);
      return NextResponse.json({ error: "The email provider could not accept this inquiry. Please try again later." }, { status: 502 });
    }
    return NextResponse.json({ ok: true, message: "Thank you. Your inquiry has been received. I'll personally review your requirements and get back to you." });
  } catch {
    recentSubmissions.delete(fingerprint);
    return NextResponse.json({ error: "Something went wrong while sending the inquiry. Please try again later." }, { status: 502 });
  }
}
