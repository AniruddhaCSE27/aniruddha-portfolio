import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/services", "/work", "/about", "/process", "/contact", "/privacy"];
  return [...routes.map((route) => ({ url: `${site.url}${route}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: route === "" ? 1 : 0.7 })), ...projects.map((project) => ({ url: `${site.url}/work/${project.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 }))];
}
