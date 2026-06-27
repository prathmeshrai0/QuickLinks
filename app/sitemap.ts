import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://quick-links-three.vercel.app",
      lastModified: new Date(),
    },
  ];
}