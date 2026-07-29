import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";

const BASE_URL = "https://www.fourteenzerosixstudios.com";

export default function robots(): MetadataRoute.Robots {
  // Keep password-protected projects out of the index.
  const gated = projects
    .filter((p) => p.password)
    .map((p) => `/projects/${p.slug}`);

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: gated,
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
