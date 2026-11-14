import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ${site.title}`, template: `%s — ${site.name}` },
  description: site.description,
  alternates: { canonical: site.url },
  openGraph: { title: `${site.name} — ${site.title}`, description: site.description, url: site.url, siteName: site.name, type: "website", locale: "en_US" },
  twitter: { card: "summary", title: `${site.name} — ${site.title}`, description: site.description },
  robots: { index: true, follow: true },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: "AI Engineer, Technology Consultant, Founder & CEO of Dhruvatonix",
  description: site.description,
  url: site.url,
  image: `${site.url}/images/aniruddha-profile.jpeg`,
  address: { "@type": "PostalAddress", addressCountry: "IN" },
  sameAs: ["https://www.linkedin.com/in/aniruddha-pathak-ai", "https://github.com/AniruddhaCSE27"],
  knowsAbout: ["AI engineering", "Technology consulting", "Software architecture", "AI automation", "Computer vision", "LLM and RAG systems"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} /><Header /><main>{children}</main><Footer /></body></html>;
}
