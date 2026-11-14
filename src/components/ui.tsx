import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight, ChevronRight } from "lucide-react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-10 ${className}`}>{children}</div>;
}

export function SectionLabel({ children, number }: { children: ReactNode; number?: string }) {
  return (
    <div className="mb-7 flex items-center gap-3 font-mono text-[10px] font-medium uppercase tracking-[0.23em] text-champagne">
      {number && <span className="text-slate/70">{number}</span>}
      <span className="h-px w-8 bg-champagne/60" />
      <span>{children}</span>
    </div>
  );
}

export function ArrowLink({ href, children, light = false }: { href: string; children: ReactNode; light?: boolean }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne focus-visible:ring-offset-4 ${light ? "text-paper hover:text-champagne" : "text-ink hover:text-champagne"}`}
    >
      <span>{children}</span>
      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </Link>
  );
}

export function ButtonLink({ href, children, variant = "dark" }: { href: string; children: ReactNode; variant?: "dark" | "light" | "outline" }) {
  const styles = {
    dark: "bg-ink text-paper hover:bg-champagne hover:text-ink",
    light: "bg-paper text-ink hover:bg-champagne",
    outline: "border border-current/20 text-current hover:border-champagne hover:text-champagne",
  }[variant];
  return (
    <Link href={href} className={`group inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-5 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne focus-visible:ring-offset-4 ${styles}`}>
      {children}
      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </Link>
  );
}

export function MoreLink({ href = "/work" }: { href?: string }) {
  return (
    <Link href={href} className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate transition-colors hover:text-champagne focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne focus-visible:ring-offset-4">
      View project <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

export function Rule() {
  return <div className="h-px w-full bg-ink/10" aria-hidden="true" />;
}

export function Pill({ children }: { children: ReactNode }) {
  return <span className="inline-flex items-center rounded-full border border-ink/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-slate">{children}</span>;
}
