import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Our Clinic",
  description:
    "Meet the team and learn about Shingare Skin & Cosmetics Clinic in Peth Vadgaon, Kolhapur, and its approach to skin, hair and cosmetic care.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Shingare Skin & Cosmetics Clinic",
    description:
      "Learn about the clinic team and approach to skin, hair and cosmetic care in Peth Vadgaon, Kolhapur.",
    url: "/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
