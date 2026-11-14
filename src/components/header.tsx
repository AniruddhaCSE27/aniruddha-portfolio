"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-paper/10 bg-ink/90 text-paper backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-[1240px] items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link href="/" className="group flex items-center gap-3" aria-label="Aniruddha Pathak home">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-champagne/80 font-display text-lg text-champagne transition-transform group-hover:rotate-6">A</span>
          <span className="hidden text-xs font-semibold tracking-[0.12em] text-paper sm:block">ANIRUDDHA PATHAK</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
          {site.navigation.slice(0, 4).map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} className={`relative py-2 text-sm transition-colors hover:text-champagne focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne focus-visible:ring-offset-4 focus-visible:ring-offset-ink ${active ? "text-champagne" : "text-paper/70"}`}>
                {item.label}
                {active && <span className="absolute -bottom-1 left-0 h-px w-full bg-champagne" />}
              </Link>
            );
          })}
          <Link href="/contact" className="ml-2 inline-flex h-10 items-center rounded-full border border-champagne/70 px-4 text-xs font-semibold uppercase tracking-[0.12em] text-champagne transition-colors hover:bg-champagne hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne focus-visible:ring-offset-4 focus-visible:ring-offset-ink">
            Let&apos;s Discuss Your Project
          </Link>
        </nav>

        <button type="button" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-paper/15 text-paper transition-colors hover:border-champagne hover:text-champagne focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne focus-visible:ring-offset-4 focus-visible:ring-offset-ink md:hidden" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close navigation menu" : "Open navigation menu"}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav id="mobile-navigation" className="border-t border-paper/10 bg-ink px-5 pb-6 pt-4 md:hidden" aria-label="Mobile navigation">
          <div className="flex flex-col gap-1">
            {site.navigation.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} className={`rounded-lg px-3 py-3 text-base transition-colors hover:bg-paper/10 hover:text-champagne focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne ${active ? "bg-paper/10 text-champagne" : "text-paper/80"}`}>{item.label}</Link>;
            })}
            <Link href="/contact" className="mt-3 inline-flex min-h-12 items-center justify-center rounded-full border border-champagne/70 px-4 text-xs font-semibold uppercase tracking-[0.12em] text-champagne transition-colors hover:bg-champagne hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne">Let&apos;s Discuss Your Project</Link>
          </div>
        </nav>
      )}
    </header>
  );
}
