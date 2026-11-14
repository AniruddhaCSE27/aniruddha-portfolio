import type { Project } from "@/data/projects";

export function ProjectVisual({ project, compact = false }: { project: Project; compact?: boolean }) {
  return (
    <div className={`relative isolate overflow-hidden rounded-[2px] border border-ink/10 bg-ink transition-colors duration-500 group-hover:border-champagne/45 ${compact ? "aspect-[1.35]" : "min-h-[420px]"}`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${project.accent}`} />
      <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(244,241,234,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(244,241,234,.08)_1px,transparent_1px)] [background-size:40px_40px]" />
      <div className="absolute inset-0 opacity-50 [background-image:radial-gradient(circle_at_70%_30%,rgba(244,241,234,.14),transparent_30%)]" />
      <div className={`absolute ${compact ? "inset-6" : "inset-10 sm:inset-16"}`}>
        {project.slug === "nexus" && <NexusArt compact={compact} />}
        {project.slug === "orion-ai" && <OrionArt compact={compact} />}
        {project.slug === "leadforge-ai" && <LeadforgeArt compact={compact} />}
        {project.slug === "llm-code-review-assistant" && <ReviewArt compact={compact} />}
        {project.slug === "optinex" && <OptinexArt compact={compact} />}
      </div>
      <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-paper/80">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em]">{project.index} / {project.status}</span>
        <span className="h-2 w-2 rounded-full bg-champagne shadow-[0_0_16px_rgba(198,166,107,.9)]" />
      </div>
    </div>
  );
}

function NexusArt({ compact }: { compact: boolean }) {
  return <div className="relative flex h-full items-center justify-center"><div className={`${compact ? "h-32 w-32" : "h-56 w-56"} rounded-full border border-champagne/50 p-5`}><div className="flex h-full w-full items-center justify-center rounded-full border border-champagne/30"><div className="h-4 w-4 rounded-full bg-champagne shadow-[0_0_40px_12px_rgba(198,166,107,.45)]" /></div></div><span className="absolute left-[12%] top-[15%] h-px w-[35%] rotate-[28deg] bg-champagne/50" /><span className="absolute bottom-[20%] right-[11%] h-px w-[32%] -rotate-[32deg] bg-champagne/50" /><span className="absolute left-[18%] top-[24%] font-mono text-[9px] tracking-widest text-paper/45">P(OUTCOME)</span><span className="absolute bottom-[24%] right-[16%] font-mono text-[9px] tracking-widest text-paper/45">SENSITIVITY</span></div>;
}

function OrionArt({ compact }: { compact: boolean }) {
  return <div className="relative flex h-full items-center justify-center"><div className={`grid ${compact ? "h-32 w-44" : "h-48 w-64"} grid-cols-3 gap-2`}>{["PLAN", "FIND", "WRITE", "01", "02", "03", "PDF", "CITE", "RANK"].map((item, index) => <div key={item} className={`flex items-center justify-center border ${index === 4 ? "border-champagne bg-champagne/20 text-champagne" : "border-paper/20 text-paper/45"} font-mono text-[9px] tracking-widest`}>{item}</div>)}</div><span className="absolute left-[5%] top-[8%] h-20 w-20 rounded-full border border-[#7895a8]/70" /><span className="absolute bottom-[9%] right-[4%] h-12 w-12 rounded-full border border-paper/20" /></div>;
}

function LeadforgeArt({ compact }: { compact: boolean }) {
  return <div className="relative h-full"><div className={`absolute left-1/2 top-1/2 ${compact ? "h-28 w-48" : "h-40 w-72"} -translate-x-1/2 -translate-y-1/2 border border-[#a88b7c]/70 p-3`}><div className="flex h-full gap-3"><div className="w-1/4 border-r border-paper/15"><div className="mt-2 h-2 w-8 bg-[#a88b7c]/70" /><div className="mt-4 h-1 w-10 bg-paper/20" /><div className="mt-2 h-1 w-7 bg-paper/20" /></div><div className="flex-1"><div className="mb-4 flex justify-between"><div className="h-2 w-16 bg-paper/35" /><div className="h-2 w-6 rounded-full bg-[#a88b7c]/60" /></div><div className="grid grid-cols-2 gap-2"><div className="h-10 border border-paper/15" /><div className="h-10 border border-paper/15" /><div className="col-span-2 h-5 border border-[#a88b7c]/40 bg-[#a88b7c]/10" /></div></div></div></div><div className="absolute left-[10%] top-[16%] h-px w-[22%] rotate-[-20deg] bg-[#a88b7c]/50" /><div className="absolute bottom-[18%] right-[6%] h-px w-[25%] rotate-[18deg] bg-[#a88b7c]/50" /></div>;
}

function ReviewArt({ compact }: { compact: boolean }) {
  return <div className="relative flex h-full items-center justify-center"><div className={`${compact ? "w-48" : "w-72"} space-y-2 font-mono text-[9px]`}><div className="flex gap-3 text-paper/30"><span>+</span><span className="h-2 w-[55%] bg-paper/15" /></div><div className="flex gap-3 text-[#87927f]"><span>+</span><span className="h-2 w-[72%] bg-[#87927f]/50" /></div><div className="flex gap-3 text-[#c58f7b]"><span>-</span><span className="h-2 w-[42%] bg-[#c58f7b]/40" /></div><div className="my-5 h-px w-full bg-paper/15" /><div className="flex items-center gap-3 text-champagne"><span className="h-2 w-2 rounded-full bg-champagne" /><span>REVIEW SIGNAL / 07</span></div><div className="h-12 border border-[#87927f]/35 bg-[#87927f]/10 p-3 text-paper/45">contextual finding + deterministic check</div></div></div>;
}

function OptinexArt({ compact }: { compact: boolean }) {
  return <div className="relative flex h-full items-center justify-center" aria-label="Conceptual OPTINEX workflow illustration"><div className={`${compact ? "w-52" : "w-80"} grid grid-cols-4 gap-2 text-center font-mono text-[8px] uppercase tracking-[0.12em] text-paper/55`}><div className="flex h-16 items-center justify-center border border-paper/20">Image</div><div className="flex h-16 items-center justify-center border border-[#8b7d9b]/60 bg-[#8b7d9b]/10">ResNet18</div><div className="flex h-16 items-center justify-center border border-champagne/60 bg-champagne/10 text-champagne">5-class</div><div className="flex h-16 items-center justify-center border border-paper/20">Grad-CAM</div></div><div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 font-mono text-[9px] uppercase tracking-[0.18em] text-paper/35">conceptual workflow</div></div>;
}
