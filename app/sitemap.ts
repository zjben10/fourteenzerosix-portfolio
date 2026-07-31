import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";

const BASE_URL = "https://www.fourteenzerosixstudios.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE_URL}/lab`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/fun`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  // Public project pages only — skip hidden, external, and password-gated.
  const projectRoutes: MetadataRoute.Sitemap = projects
    .filter((p) => !p.hidden && !p.externalUrl && !p.password)
    .map((p) => ({
      url: `${BASE_URL}/projects/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  return [...staticRoutes, ...projectRoutes];
}
