import Link from "next/link";
import { Container } from "@/components/ui";

export default function NotFound() {
  return <section className="bg-paper py-32"><Container><p className="font-mono text-xs uppercase tracking-[0.2em] text-champagne">404 / Not found</p><h1 className="mt-6 max-w-2xl font-display text-6xl leading-none sm:text-8xl">That page isn&apos;t here.</h1><Link href="/" className="mt-10 inline-block text-sm font-semibold underline decoration-champagne underline-offset-4">Return home</Link></Container></section>;
}
