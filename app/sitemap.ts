import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://vosuchnapekarna.com",
      lastModified: new Date("2026-07-13"),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
