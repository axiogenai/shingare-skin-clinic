import React from "react";
import type { Metadata } from "next";
import CategoryTreatmentPage from "@/components/CategoryTreatmentPage";
import { TREATMENTS } from "@/data/treatments";

export const metadata: Metadata = {
  title: "Hair & Scalp Treatments in Kolhapur",
  description:
    "Explore hair-fall and scalp-care consultations, including assessment for thinning, PRP and GFC options, at Shingare Skin & Cosmetics Clinic in Peth Vadgaon.",
  alternates: { canonical: "/hair" },
  openGraph: {
    title: "Hair & Scalp Treatments in Kolhapur",
    description:
      "Learn about hair and scalp care options and request a consultation at Shingare Skin & Cosmetics Clinic.",
    url: "/hair",
  },
};

export default function HairTreatmentsPage() {
  const hairServices = TREATMENTS.filter((t) => t.category === "hair");

  return (
    <CategoryTreatmentPage
      title="Hair Treatments"
      subtitle="Advanced Trichology, Autologous Growth Factors & Scalp Rejuvenation by Dr. Pramod Shingare (MD Dermatology)"
      services={hairServices}
      highlights={[
        "Autologous PRP & GFC Hair Restoration",
        "Hair Mesotherapy & Follicle Biostimulation",
        "High-Frequency Scalp & Follicle Therapy",
        "Alopecia Areata & Scalp Care",
      ]}
    />
  );
}
