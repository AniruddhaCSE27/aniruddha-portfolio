import type { Metadata } from "next";
import Image from "next/image";
import { ArrowDownRight, ArrowUpRight, BrainCircuit, Boxes, Cable, ChartNoAxesCombined, Code2, Workflow } from "lucide-react";
import { ButtonLink, Container, SectionLabel } from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
  description: "Meet Aniruddha Pathak, an AI Engineer, Technology Consultant and Founder & CEO of Dhruvatonix.",
};

const expertise = [
  { number: "01", icon: BrainCircuit, title: "AI Engineering & Intelligent Systems", text: "Applied AI built around a clear use case, dependable inputs and useful outcomes." },
  { number: "02", icon: Code2, title: "Full-Stack Software Development", text: "Thoughtful product experiences, backend services and interfaces that work together." },
  { number: "03", icon: Workflow, title: "Business Process Automation", text: "Practical automation that gives teams better leverage without hiding important decisions." },
  { number: "04", icon: Cable, title: "System Architecture & APIs", text: "Clear technical foundations for products, integrations and the systems around them." },
  { number: "05", icon: ChartNoAxesCombined, title: "Data & Decision Intelligence", text: "Turning complex information into clearer signals for better operational decisions." },
  { number: "06", icon: Boxes, title: "Technology Consulting", text: "A grounded partner for deciding what to build, how to build it and what comes next." },
];

const approach = [
  { number: "01", title: "Understand the problem", text: "I start with the business context: the people involved, the workflow under pressure and the outcome that matters." },
  { number: "02", title: "Design the right system", text: "I translate that context into a proportionate architecture, a clear product direction and decisions the team can stand behind." },
  { number: "03", title: "Build for the long term", text: "The goal is not just a working demo. It is a reliable, maintainable system with a practical path beyond launch." },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink text-paper">
        <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(244,241,234,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(244,241,234,.045)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="absolute -right-48 top-24 h-[480px] w-[480px] rounded-full border border-champagne/15 sm:h-[700px] sm:w-[700px]" />
        <Container className="relative py-16 sm:py-20 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(300px,.75fr)] lg:gap-14">
            <div className="max-w-3xl">
              <SectionLabel>About Aniruddha</SectionLabel>
              <p className="mb-6 max-w-md text-sm font-semibold uppercase tracking-[0.12em] text-paper/70">
                AI Engineer <span className="mx-2 text-champagne">·</span> Technology Consultant <span className="mx-2 text-champagne">·</span> Founder &amp; CEO, Dhruvatonix
              </p>
              <h1 className="max-w-3xl font-display text-[clamp(3.5rem,7vw,7.6rem)] leading-[.88] tracking-[-.065em]">
                Building technology that solves <em className="text-champagne">real business problems.</em>
              </h1>
              <p className="mt-9 max-w-xl text-lg leading-8 text-paper/65 sm:text-xl">
                An independent technology partner for international businesses that need thoughtful engineering, useful AI and products built to move work forward.
              </p>
              <a href="#profile" className="mt-10 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-paper/55 transition-colors hover:text-champagne">
                Explore the approach <ArrowDownRight className="h-4 w-4" />
              </a>
            </div>

            <div className="relative mx-auto w-full max-w-[380px] lg:mx-0 lg:ml-auto lg:mt-6">
              <div className="absolute -inset-3 border border-champagne/35" aria-hidden="true" />
              <div className="relative overflow-hidden border border-paper/15 bg-[#27292c] shadow-halo">
                <Image
                  src="/images/aniruddha-profile.jpeg"
                  alt="Aniruddha Pathak, AI Engineer and Technology Consultant"
                  width={1536}
                  height={2304}
                  priority
                  sizes="(max-width: 1023px) min(100vw - 2.5rem, 380px), 380px"
                  className="aspect-[4/5] w-full object-cover object-[50%_15%]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent px-6 pb-6 pt-20">
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-paper/55">Founder &amp; CEO</p>
                  <p className="mt-1 font-display text-2xl text-paper">Dhruvatonix</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section id="profile" className="bg-paper py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[.65fr_1.35fr] lg:gap-24">
            <div>
              <SectionLabel number="01">Profile</SectionLabel>
              <h2 className="max-w-sm font-display text-5xl leading-[.96] sm:text-6xl">Engineering with commercial perspective.</h2>
            </div>
            <div className="max-w-3xl">
              <p className="max-w-2xl font-display text-3xl leading-[1.12] text-ink sm:text-4xl">
                I&apos;m Aniruddha Pathak, an AI Engineer and Technology Consultant focused on designing intelligent software, automation systems, and modern digital products.
              </p>
              <div className="mt-12 grid gap-8 border-t border-ink/15 pt-8 text-base leading-7 text-slate sm:grid-cols-2 sm:gap-12">
                <p>My work sits at the intersection of engineering and business. I approach each project by understanding the underlying problem, designing a practical solution, and building systems that are reliable, maintainable, and purposeful.</p>
                <p>From AI-powered research platforms and decision intelligence engines to full-stack applications and business automation, I work across the complete product development lifecycle.</p>
              </div>
              <div className="mt-10 border-l-2 border-champagne pl-6 text-lg leading-8 text-ink/75">
                As the founder of Dhruvatonix, I&apos;m developing a technology business centered on tailored software solutions and long-term client relationships.
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-ink/10 bg-[#e9e5dc] py-20 sm:py-28">
        <Container>
          <div className="mb-14 grid gap-8 lg:grid-cols-[.65fr_1.35fr] lg:gap-24">
            <div>
              <SectionLabel number="02">Expertise</SectionLabel>
              <h2 className="max-w-sm font-display text-5xl leading-[.96] sm:text-6xl">Technical range. Practical focus.</h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-slate">The best technology work is specific about the problem it is solving. These are the areas where I combine engineering depth with an understanding of how a business actually operates.</p>
          </div>
          <div className="grid border-t border-ink/15 sm:grid-cols-2 lg:grid-cols-3">
            {expertise.map((item) => <ExpertiseCard key={item.number} {...item} />)}
          </div>
        </Container>
      </section>

      <section className="bg-paper py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[.65fr_1.35fr] lg:gap-24">
            <div>
              <SectionLabel number="03">Approach</SectionLabel>
              <h2 className="max-w-sm font-display text-5xl leading-[.96] sm:text-6xl">Start with the problem. Build with intent.</h2>
            </div>
            <div>
              <div className="divide-y divide-ink/15 border-y border-ink/15">
                {approach.map((item) => (
                  <article key={item.number} className="grid gap-5 py-7 sm:grid-cols-[56px_1fr] sm:gap-8 sm:py-9">
                    <span className="font-mono text-xs text-champagne">{item.number}</span>
                    <div className="grid gap-3 sm:grid-cols-[.8fr_1.2fr] sm:gap-10">
                      <h3 className="text-xl font-semibold tracking-[-.03em]">{item.title}</h3>
                      <p className="max-w-xl text-sm leading-7 text-slate">{item.text}</p>
                    </div>
                  </article>
                ))}
              </div>
              <p className="mt-8 max-w-2xl text-base leading-7 text-slate">The depth of each phase follows the scope, risk and people involved. The result is an agreed solution that can be understood, tested and carried forward.</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-ink py-20 text-paper sm:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[.65fr_1.35fr] lg:gap-24">
            <div>
              <SectionLabel number="04">Start a conversation</SectionLabel>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-paper/40">International projects welcome</p>
            </div>
            <div>
              <h2 className="max-w-3xl font-display text-5xl leading-[.95] sm:text-7xl">Let&apos;s turn your idea into a <em className="text-champagne">working solution.</em></h2>
              <p className="mt-8 max-w-2xl text-base leading-7 text-paper/55">Share the problem, opportunity or workflow you want to improve. I&apos;ll review the context and reply personally with a useful next step.</p>
              <div className="mt-10"><ButtonLink href="/contact" variant="light">Let&apos;s Discuss Your Project</ButtonLink></div>
              <a href="/contact" className="group mt-6 inline-flex items-center gap-2 text-sm text-paper/55 transition-colors hover:text-champagne">Or start with the contact page <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function ExpertiseCard({ number, icon: Icon, title, text }: { number: string; icon: typeof BrainCircuit; title: string; text: string }) {
  return (
    <article className="group border-b border-ink/15 py-7 sm:p-7 lg:p-8 lg:nth-[3n+1]:pl-0 lg:nth-[3n]:pr-0">
      <div className="flex items-center justify-between text-champagne"><span className="font-mono text-[10px]">{number}</span><Icon className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" /></div>
      <h3 className="mt-12 max-w-xs text-xl font-semibold leading-tight">{title}</h3>
      <p className="mt-4 max-w-xs text-sm leading-6 text-slate">{text}</p>
    </article>
  );
}
