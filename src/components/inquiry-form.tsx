"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { LoaderCircle, Send } from "lucide-react";
import { serviceOptions } from "@/lib/site";

type FormState = { status: "idle" | "sending" | "success" | "error"; message?: string; field?: string };

export function InquiryForm({ isConfigured }: { isConfigured: boolean }) {
  const [state, setState] = useState<FormState>({ status: "idle" });
  const [contactMethod, setContactMethod] = useState<"Email" | "WhatsApp">("Email");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state.status === "sending") return;
    setState({ status: "sending" });
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    payload.consent = payload.consent === "on" ? "true" : "false";

    try {
      const submissionId = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : undefined;
      const response = await fetch("/api/inquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...payload, submissionId, consent: payload.consent === "true" }) });
      const result = await response.json() as { ok?: boolean; error?: string; message?: string; field?: string };
      if (!response.ok) { setState({ status: "error", message: result.error || "Please check the form and try again.", field: result.field }); return; }
      form.reset();
      setContactMethod("Email");
      setState({ status: "success", message: result.message || "Your inquiry was accepted by the email provider. If this is the first submission, please confirm the provider activation email in the recipient inbox." });
    } catch { setState({ status: "error", message: "The inquiry could not be sent. Please email me directly or try again later." }); }
  }

  return <form onSubmit={handleSubmit} className="space-y-7" noValidate>
    {!isConfigured && <div role="status" className="border border-champagne/50 bg-champagne/10 p-5 text-sm leading-6 text-ink"><strong>Email delivery is not configured correctly on this environment.</strong> The form will remain unavailable until a valid FormSubmit recipient is available. You can still use the direct email or WhatsApp options shown beside this form.</div>}
    {state.status === "success" && <div role="status" className="border border-[#758c73] bg-[#758c73]/10 p-5 text-sm leading-6 text-ink">{state.message}</div>}
    {state.status === "error" && <div role="alert" className="border border-[#9c5f50] bg-[#9c5f50]/10 p-5 text-sm leading-6 text-ink"><p>{state.message}</p><p className="mt-3">You can also <a href="mailto:aniruddha.2005@outlook.com" className="font-semibold underline decoration-[#9c5f50] underline-offset-4">email me directly</a> or <a href="https://wa.me/917439573538" target="_blank" rel="noopener noreferrer" className="font-semibold underline decoration-[#9c5f50] underline-offset-4">message me on WhatsApp</a>.</p></div>}
    <div className="grid gap-7 sm:grid-cols-2"><Field label="Full name" name="name" required autoComplete="name" error={state.field === "name" ? state.message : undefined} /><Field label="Business email" name="email" type="email" required autoComplete="email" error={state.field === "email" ? state.message : undefined} /><Field label="Company or business name" name="company" autoComplete="organization" /><Field label="Country" name="country" required autoComplete="country-name" error={state.field === "country" ? state.message : undefined} /></div>
    <div><label htmlFor="service" className="mb-2 block text-sm font-semibold">Service required <span className="text-champagne">*</span></label><select id="service" name="service" required defaultValue="" className="w-full border-0 border-b border-ink/20 bg-transparent px-0 py-3 text-base text-ink focus:border-champagne focus:ring-0"><option value="" disabled>Choose a service category</option>{serviceOptions.map((option) => <option key={option} value={option}>{option}</option>)}</select></div>
    <div><label htmlFor="description" className="mb-2 block text-sm font-semibold">Project description <span className="text-champagne">*</span></label><textarea id="description" name="description" required minLength={30} maxLength={5000} rows={6} className="w-full resize-y border border-ink/15 bg-transparent p-4 text-base placeholder:text-slate/60 focus:border-champagne focus:ring-1 focus:ring-champagne" placeholder="What are you trying to improve, build or understand?" /></div>
    <div className="grid gap-7 sm:grid-cols-2"><Field label="Preferred timeline" name="timeline" placeholder="Optional" /><div><label htmlFor="contactMethod" className="mb-2 block text-sm font-semibold">Preferred contact method <span className="text-champagne">*</span></label><select id="contactMethod" name="contactMethod" value={contactMethod} onChange={(event) => setContactMethod(event.target.value as "Email" | "WhatsApp")} required className="w-full border-0 border-b border-ink/20 bg-transparent px-0 py-3 text-base text-ink focus:border-champagne focus:ring-0"><option>Email</option><option>WhatsApp</option></select></div></div>
    {contactMethod === "WhatsApp" && <Field label="Reachable WhatsApp number with country code" name="whatsappNumber" type="tel" required placeholder="+91 7439573538" autoComplete="tel" error={state.field === "whatsappNumber" ? state.message : undefined} />}
    <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true"><label htmlFor="websiteHoneypot">Leave this field empty</label><input id="websiteHoneypot" name="websiteHoneypot" tabIndex={-1} autoComplete="off" /></div>
    <label className="flex items-start gap-3 text-sm leading-6 text-slate"><input type="checkbox" name="consent" required className="mt-1 h-4 w-4 accent-[#c6a66b]" /> <span>I&apos;m happy for these details to be used to understand and respond to this inquiry. Read the <Link href="/privacy" className="underline decoration-champagne underline-offset-4">privacy note</Link>.</span></label>
    <button type="submit" disabled={!isConfigured || state.status === "sending"} className="inline-flex min-h-12 items-center gap-3 rounded-full bg-ink px-6 text-sm font-semibold text-paper transition-colors hover:bg-champagne hover:text-ink disabled:cursor-not-allowed disabled:opacity-50">{state.status === "sending" ? <><LoaderCircle className="h-4 w-4 animate-spin" /> Sending securely...</> : <>Send Project Inquiry <Send className="h-4 w-4" /></>}</button>
    <p className="text-xs leading-5 text-slate/80">No budget field is required. Pricing is discussed privately after requirements discovery.</p>
  </form>;
}

function Field({ label, name, type = "text", required = false, placeholder, autoComplete, error }: { label: string; name: string; type?: string; required?: boolean; placeholder?: string; autoComplete?: string; error?: string }) { return <div><label htmlFor={name} className="mb-2 block text-sm font-semibold">{label} {required && <span className="text-champagne">*</span>}</label><input id={name} name={name} type={type} required={required} placeholder={placeholder} autoComplete={autoComplete} className="w-full border-0 border-b border-ink/20 bg-transparent px-0 py-3 text-base placeholder:text-slate/60 focus:border-champagne focus:ring-0" />{error && <p className="mt-2 text-xs text-[#9c5f50]">{error}</p>}</div>; }
