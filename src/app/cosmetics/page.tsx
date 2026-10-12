import React from "react";
import type { Metadata } from "next";
import CategoryTreatmentPage from "@/components/CategoryTreatmentPage";
import { TREATMENTS } from "@/data/treatments";

export const metadata: Metadata = {
  title: "Cosmetic Skin Treatments in Kolhapur",
  description:
    "Explore clinic-based facials, chemical peels, laser and acne-scar care options at Shingare Skin & Cosmetics Clinic in Peth Vadgaon, Kolhapur.",
  alternates: { canonical: "/cosmetics" },
  openGraph: {
    title: "Cosmetic Skin Treatments in Kolhapur",
    description:
      "Learn about cosmetic skin-care options and request a consultation at Shingare Skin & Cosmetics Clinic.",
    url: "/cosmetics",
  },
};

export default function CosmeticTreatmentsPage() {
  const cosmeticServices = TREATMENTS.filter((t) => t.category === "cosmetics");

  return (
    <CategoryTreatmentPage
      title="Cosmetic Treatments"
      subtitle="Medical-Grade Hydra Facials, Q-Switched Lasers & Resurfacing Peels by Dr. Pramod Shingare (MD Dermatology)"
      services={cosmeticServices}
      highlights={[
        "Clinical Medical Hydra Facial",
        "Hollywood Carbon Laser Glow Peel",
        "Acne Scar Resurfacing & Microneedling",
        "Dermatological Chemical Peels",
        "Skin PRP & Collagen Induction",
      ]}
    />
  );
}
