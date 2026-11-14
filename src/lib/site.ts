export const site = {
  name: "Aniruddha Pathak",
  title: "AI Engineer & Technology Consultant",
  description:
    "AI engineering, intelligent automation, premium websites and custom software for ambitious businesses worldwide.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  navigation: [
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "Process", href: "/process" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export const serviceOptions = [
  "Business Website",
  "AI Automation",
  "Custom Software",
  "AI Engineering / Consulting",
  "Other",
] as const;

export type ServiceOption = (typeof serviceOptions)[number];
