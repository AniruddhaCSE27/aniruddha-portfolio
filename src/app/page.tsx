import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BrainCircuit, Code2, Cpu, Workflow } from "lucide-react";
import { projects } from "@/data/projects";
import { ArrowLink, ButtonLink, Container, MoreLink, Pill, SectionLabel } from "@/components/ui";
import { ProjectVisual } from "@/components/project-visual";

const servicePreviews = [
  { index: "01", icon: <Code2 />, title: "Premium Business Websites", text: "Editorial, responsive websites that make a business easier to understand, trust and contact." },
  { index: "02", icon: <Workflow />, title: "AI Automation & Intelligent Workflows", text: "Practical AI systems that reduce repetitive work and give teams better operational leverage." },
  { index: "03", icon: <Cpu />, title: "Custom Software Development", text: "Full-stack applications, internal tools, dashboards and APIs shaped around the way your business works." },
  { index: "04", icon: <BrainCircuit />, title: "AI Engineering & Technology Consulting", text: "Clear technical direction for LLM, RAG, machine-learning and computer-vision opportunities." },
];

export default function HomePage() {
  return <>
    <section className="relative overflow-hidden bg-ink text-paper">
      <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(244,241,234,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(244,241,234,.05)_1px,transparent_1px)] [background-size:64px_64px]" />
      <div className="absolute -right-32 top-32 h-[500px] w-[500px] rounded-full border border-champagne/15 sm:h-[680px] sm:w-[680px]" />
      <Container className="relative py-14 sm:py-20 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_.8fr] lg:gap-12">
          <div className="max-w-4xl">
            <p className="mb-5 flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-champagne"><span className="h-2 w-2 rounded-full bg-champagne shadow-[0_0_14px_rgba(198,166,107,.8)]" /> AI ENGINEERING <span className="text-paper/30">•</span> TECHNOLOGY CONSULTING <span className="text-paper/30">•</span> SOFTWARE</p>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-paper/50">Aniruddha Pathak</p>
            <p className="mb-5 text-sm font-semibold tracking-[0.08em] text-paper/75">AI Engineer <span className="text-champagne">|</span> Technology Consultant <span className="mx-2 text-paper/30">·</span> Founder &amp; CEO, Dhruvatonix</p>
            <h1 className="max-w-4xl font-display text-[clamp(3.4rem,7vw,7.4rem)] leading-[.9] tracking-[-.065em]">Engineering Intelligent Solutions for <em className="text-champagne">Ambitious Businesses.</em></h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-paper/65 sm:text-lg">I design and build intelligent software, AI-powered automation, premium websites, and custom digital solutions that help businesses solve complex problems and operate more effectively.</p>
            <div className="mt-7 flex flex-wrap gap-3"><ButtonLink href="/contact" variant="light">Let&apos;s Discuss Your Project</ButtonLink><ButtonLink href="/work" variant="outline">Explore My Work</ButtonLink></div>
            <div className="mt-8 flex items-center gap-3 border-t border-paper/15 pt-5 text-[10px] uppercase tracking-[0.18em] text-paper/45"><span className="h-1.5 w-1.5 rounded-full bg-champagne" /> Based in India. Working Worldwide.</div>
          </div>
          <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <div className="absolute -inset-4 rounded-full border border-champagne/20" />
            <div className="relative overflow-hidden rounded-[2px] border border-paper/15 bg-[#24272a] p-3 shadow-halo">
              <Image src="/images/aniruddha-profile.jpeg" alt="Aniruddha Pathak, AI Engineer and Technology Consultant" width={720} height={900} priority sizes="(max-width: 1023px) min(100vw - 2.5rem, 384px), 480px" className="aspect-[4/5] w-full object-cover object-[50%_15%] grayscale-[12%]" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between"><div><p className="font-mono text-[9px] uppercase tracking-[0.18em] text-paper/55">Founder &amp; CEO</p><p className="mt-1 font-display text-2xl text-paper">Dhruvatonix</p></div><span className="h-2 w-2 rounded-full bg-champagne shadow-[0_0_14px_rgba(198,166,107,.8)]" /></div>
            </div>
          </div>
        </div>
      </Container>
    </section>

    <section className="bg-paper py-20 sm:py-28"><Container><div className="grid gap-10 lg:grid-cols-[.65fr_1.35fr]"><div><SectionLabel number="01">Services</SectionLabel><h2 className="max-w-sm font-display text-4xl leading-[1.02] sm:text-5xl">Technology with a job to do.</h2><p className="mt-6 max-w-sm text-base leading-7 text-slate">Every engagement is tailored to the business problem, the people involved and the level of certainty needed to move forward.</p><div className="mt-7"><ArrowLink href="/services">Explore services</ArrowLink></div></div><div className="grid gap-0 sm:grid-cols-2">{servicePreviews.map((service) => <ServiceBrief key={service.index} {...service} />)}</div></div></Container></section>

    <section className="bg-[#e9e5dc] py-20 sm:py-28"><Container><div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><SectionLabel number="02">Selected work</SectionLabel><h2 className="font-display text-5xl leading-none sm:text-6xl">Built to be useful.</h2></div><ArrowLink href="/work">View all work</ArrowLink></div><div className="grid gap-5 lg:grid-cols-12"><div className="lg:col-span-7"><ProjectCard project={projects[0]} large /></div><div className="lg:col-span-5 lg:pt-20"><ProjectCard project={projects[1]} /></div><div className="lg:col-span-5 lg:pr-8"><ProjectCard project={projects[2]} /></div><div className="lg:col-span-7 lg:pt-20"><ProjectCard project={projects[3]} /></div></div></Container></section>

    <section className="bg-paper py-20 sm:py-28"><Container><div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center"><div className="relative max-w-md"><div className="absolute -inset-3 border border-champagne/35" /><Image src="/images/aniruddha-profile.jpeg" alt="Aniruddha Pathak working as an AI Engineer and Technology Consultant" width={720} height={900} sizes="(max-width: 1023px) min(100vw - 2.5rem, 448px), 448px" className="relative aspect-[4/5] w-full object-cover object-[50%_15%]" /></div><div><SectionLabel number="03">About</SectionLabel><h2 className="max-w-xl font-display text-5xl leading-[.98] sm:text-6xl">Technical depth, practical business context.</h2><p className="mt-6 max-w-2xl text-base leading-7 text-slate">I work across software engineering, applied AI, business analytics and process improvement. That means the work starts with the operation that needs to improve—not with a technology looking for a place to be used.</p><div className="mt-6 flex flex-wrap gap-2"><Pill>AI Engineer</Pill><Pill>Technology Consultant</Pill><Pill>Founder &amp; CEO, Dhruvatonix</Pill></div><div className="mt-7"><ArrowLink href="/about">More about my approach</ArrowLink></div></div></div></Container></section>

    <section className="border-y border-ink/10 bg-[#e9e5dc] py-20 sm:py-28"><Container><div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr]"><div><SectionLabel number="04">How I work</SectionLabel><h2 className="max-w-sm font-display text-5xl leading-none sm:text-6xl">A clear path from question to delivery.</h2></div><div><div className="grid border-t border-ink/15 sm:grid-cols-5">{["Discover", "Architect", "Build", "Validate", "Deliver & Support"].map((item, index) => <div key={item} className="border-b border-ink/15 py-4 sm:border-b-0 sm:border-r sm:px-4 sm:first:pl-0 sm:last:border-r-0"><span className="font-mono text-[10px] text-champagne">0{index + 1}</span><p className="mt-6 text-sm font-semibold">{item}</p></div>)}</div><p className="mt-7 max-w-xl text-base leading-7 text-slate">The depth of each phase follows the scope, risk and people involved. The result is an agreed solution that is tested, documented and ready for its next owner.</p><ArrowLink href="/process">See the full process</ArrowLink></div></div></Container></section>

    <section className="bg-ink py-20 text-paper sm:py-28"><Container><div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr]"><div><SectionLabel number="05">Start a conversation</SectionLabel><p className="font-mono text-xs uppercase tracking-[0.18em] text-paper/40">International projects welcome</p></div><div><h2 className="max-w-3xl font-display text-4xl leading-[1.05] sm:text-6xl">Have a Project in Mind? Let&apos;s Build Something Valuable.</h2><p className="mt-6 max-w-2xl text-base leading-7 text-paper/55">Share the problem, opportunity or workflow you want to improve. I&apos;ll review the context and reply personally with a useful next step.</p><div className="mt-8"><ButtonLink href="/contact" variant="light">Let&apos;s Discuss Your Project</ButtonLink></div></div></div></Container></section>
  </>;
}

function ServiceBrief({ index, icon, title, text }: { index: string; icon: React.ReactNode; title: string; text: string }) {
  return <Link href="/services" className="group border-t border-ink/15 p-5 transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne sm:p-7 sm:first:pl-0"><div className="flex items-center justify-between text-champagne"><span className="font-mono text-[10px]">{index}</span><span className="transition-transform duration-300 group-hover:translate-x-1">{icon}</span></div><h3 className="mt-10 max-w-[16rem] text-lg font-semibold leading-tight">{title}</h3><p className="mt-4 text-sm leading-6 text-slate">{text}</p><span className="mt-7 inline-flex text-xs text-ink/40 transition-colors group-hover:text-champagne">Explore service <ArrowUpRight className="ml-2 h-4 w-4" /></span></Link>;
}

function ProjectCard({ project, large = false }: { project: (typeof projects)[number]; large?: boolean }) {
  return <article className="group"><Link href={`/work/${project.slug}`} aria-label={`View ${project.title} case study`}><ProjectVisual project={project} compact={!large} /></Link><div className="flex items-start justify-between gap-4 pt-5"><div><p className="mb-2 font-mono text-[10px] uppercase tracking-[0.17em] text-champagne">{project.eyebrow}</p><h3 className={`${large ? "text-3xl" : "text-2xl"} font-display leading-none`}><Link href={`/work/${project.slug}`} className="transition-colors hover:text-champagne focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne">{project.title}</Link></h3><p className="mt-3 max-w-md text-sm leading-6 text-slate">{project.summary}</p></div><MoreLink href={`/work/${project.slug}`} /></div></article>;
}
