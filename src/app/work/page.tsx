import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/data/projects";
import { Container, MoreLink, SectionLabel } from "@/components/ui";
import { ProjectVisual } from "@/components/project-visual";

export const metadata: Metadata = { title: "Work", description: "Five authentic engineering projects across AI research, decision intelligence, sales operations, developer tooling and computer vision." };

export default function WorkPage() {
  return <>
    <section className="bg-ink py-20 text-paper sm:py-28"><Container><SectionLabel>Selected work</SectionLabel><h1 className="max-w-4xl font-display text-6xl leading-[.92] sm:text-8xl">Engineering projects with evidence behind them.</h1><p className="mt-6 max-w-xl text-lg leading-8 text-paper/60">A selection of public applications, open-source engineering projects and one private case study. Each description stays close to what can be responsibly claimed.</p></Container></section>
    <section className="bg-paper py-16 sm:py-24"><Container><div className="grid gap-x-7 gap-y-12 sm:grid-cols-2">{projects.map((project) => <article key={project.slug} className="group"><Link href={`/work/${project.slug}`} aria-label={`View ${project.title} case study`}><ProjectVisual project={project} compact /></Link><div className="flex items-start justify-between gap-5 pt-5"><div><p className="mb-2 font-mono text-[10px] uppercase tracking-[0.17em] text-champagne">{project.index} / {project.status}</p><h2 className="font-display text-3xl leading-none"><Link href={`/work/${project.slug}`} className="transition-colors hover:text-champagne focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne">{project.title}</Link></h2><p className="mt-3 max-w-md text-sm leading-6 text-slate">{project.summary}</p></div><MoreLink href={`/work/${project.slug}`} /></div></article>)}</div></Container></section>
  </>;
}
