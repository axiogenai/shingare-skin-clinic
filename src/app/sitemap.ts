import type { MetadataRoute } from "next";

const siteUrl = "https://shingareclinic.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: siteUrl, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/skin`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/hair`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/cosmetics`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/about`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/book-now`, lastModified, changeFrequency: "monthly", priority: 0.8 },
  ];
}
