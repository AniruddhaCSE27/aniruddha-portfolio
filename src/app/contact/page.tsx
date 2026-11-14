import type { Metadata } from "next";
import Link from "next/link";
import { Github, Linkedin, Mail, MapPin, MessageCircle, ShieldCheck } from "lucide-react";
import { Container, SectionLabel } from "@/components/ui";
import { getContactConfiguration } from "@/lib/contact";
import { InquiryForm } from "@/components/inquiry-form";

export const metadata: Metadata = { title: "Project Inquiry", description: "Send Aniruddha Pathak a project inquiry for a business website, AI automation, custom software or AI engineering consultation." };

export default function ContactPage() {
  const { isConfigured } = getContactConfiguration();
  return <>
    <section className="bg-ink py-20 text-paper sm:py-28"><Container><SectionLabel>Project inquiry</SectionLabel><h1 className="max-w-4xl font-display text-6xl leading-[.92] sm:text-8xl">Let&apos;s make the next step clear.</h1><p className="mt-6 max-w-xl text-lg leading-8 text-paper/60">Share the business problem, software idea or workflow you want to improve. I&apos;ll review the context personally and reply with a useful next step.</p></Container></section>
    <section className="bg-paper py-16 sm:py-24"><Container><div className="grid gap-12 lg:grid-cols-[.55fr_1.45fr]"><aside><div className="space-y-7"><ContactNote icon={<Mail />} title="Email" text="aniruddha.2005@outlook.com" href="mailto:aniruddha.2005@outlook.com" /><ContactNote icon={<MessageCircle />} title="WhatsApp" text="+91 7439573538" href="https://wa.me/917439573538" /><ContactNote icon={<MapPin />} title="Location" text="India — Serving Clients Worldwide" /><ContactNote icon={<ShieldCheck />} title="Purposeful details" text="Inquiry details are used to understand and respond to your project. See the privacy page for the full explanation." /><div className="flex gap-4 border-t border-ink/10 pt-6"><a href="https://www.linkedin.com/in/aniruddha-pathak-ai" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-slate transition-colors hover:text-champagne focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne"><Linkedin /></a><a href="https://github.com/AniruddhaCSE27" target="_blank" rel="noreferrer" aria-label="GitHub" className="text-slate transition-colors hover:text-champagne focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne"><Github /></a></div></div></aside><div><InquiryForm isConfigured={isConfigured} /></div></div></Container></section>
  </>;
}

function ContactNote({ icon, title, text, href }: { icon: React.ReactNode; title: string; text: string; href?: string }) { return <div className="border-t border-ink/10 pt-5"><div className="text-champagne">{icon}</div><h2 className="mt-4 text-sm font-semibold">{title}</h2>{href ? <Link href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} className="mt-2 block text-sm leading-6 text-slate transition-colors hover:text-champagne focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne">{text}</Link> : <p className="mt-2 text-sm leading-6 text-slate">{text}</p>}</div>; }
