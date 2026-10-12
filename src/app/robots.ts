import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/my-rx", "/verify", "/live-queue"],
    },
    sitemap: "https://shingareclinic.in/sitemap.xml",
  };
}
