import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";
import { getProject, projects } from "@/data/projects";
import { Container, Pill, SectionLabel } from "@/components/ui";
import { ProjectVisual } from "@/components/project-visual";

export function generateStaticParams() { return projects.map((project) => ({ slug: project.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Work" };
  return { title: project.title, description: project.description, alternates: { canonical: `/work/${project.slug}` } };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return <>
    <section className="bg-ink py-16 text-paper sm:py-24"><Container><Link href="/work" className="mb-10 inline-flex items-center gap-2 text-sm text-paper/50 transition-colors hover:text-champagne focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne focus-visible:ring-offset-4 focus-visible:ring-offset-ink"><ArrowLeft className="h-4 w-4" /> Back to work</Link><div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:items-end"><div><SectionLabel>{project.status}</SectionLabel><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-champagne">{project.eyebrow}</p><h1 className="mt-5 font-display text-6xl leading-[.9] sm:text-8xl">{project.title}</h1>{project.role && <p className="mt-6 text-sm uppercase tracking-[0.16em] text-paper/45">Role: {project.role}</p>}</div><p className="max-w-xl text-lg leading-8 text-paper/60">{project.description}</p></div></Container></section>
    <section className="bg-paper py-12 sm:py-16"><Container><ProjectVisual project={project} /><div className="mt-7 flex flex-wrap items-center gap-3">{project.links?.map((link) => <a key={link.href} href={link.href} target={link.external ? "_blank" : undefined} rel={link.external ? "noreferrer" : undefined} className="inline-flex min-h-11 items-center gap-3 rounded-full bg-ink px-5 text-sm font-semibold text-paper transition-colors hover:bg-champagne hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne focus-visible:ring-offset-4">{link.label}<ArrowUpRight className="h-4 w-4" /></a>)}<div className="flex flex-wrap gap-2">{project.tags.map((tag) => <Pill key={tag}>{tag}</Pill>)}</div></div></Container></section>
    <section className="bg-paper pb-20 sm:pb-28"><Container><div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr]"><div className="space-y-8"><Detail title="Status">{project.status}. This case study describes the engineering intent and available evidence without implying a customer, deployment or commercial result beyond what is explicitly stated.</Detail><Detail title="Technologies"><div className="flex flex-wrap gap-2">{project.technologies.map((technology) => <Pill key={technology}>{technology}</Pill>)}</div></Detail><Detail title="Demonstrated functionality"><ul className="grid gap-3">{project.capabilities.map((capability) => <li key={capability} className="flex gap-3"><Check className="mt-1 h-4 w-4 shrink-0 text-champagne" /><span>{capability}</span></li>)}</ul></Detail><Detail title="Evidence">{project.evidence}</Detail></div><div className="space-y-12"><Detail title="Business problem"><p>{project.context}</p></Detail><Detail title="Implemented solution"><p>{project.solution}</p></Detail><Detail title="Architecture"><ul className="grid gap-4">{project.architecture.map((item) => <li key={item} className="flex gap-3"><Check className="mt-1 h-4 w-4 shrink-0 text-champagne" /><span>{item}</span></li>)}</ul></Detail><Detail title="Engineering considerations"><ul className="grid gap-4 sm:grid-cols-2">{project.considerations.map((item) => <li key={item} className="border-t border-ink/10 pt-4 text-sm leading-6 text-slate">{item}</li>)}</ul></Detail></div></div></Container></section>
    <section className="border-t border-ink/10 bg-[#e9e5dc] py-20"><Container><div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-center"><h2 className="font-display text-4xl leading-none sm:text-5xl">Have a system like this in mind?</h2><Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold hover:text-champagne">Let&apos;s Discuss Your Project <ArrowUpRight className="h-4 w-4" /></Link></div></Container></section>
  </>;
}

function Detail({ title, children }: { title: string; children: React.ReactNode }) { return <div><h2 className="mb-5 font-mono text-[10px] uppercase tracking-[0.2em] text-champagne">{title}</h2><div className="text-base leading-8 text-slate">{children}</div></div>; }
