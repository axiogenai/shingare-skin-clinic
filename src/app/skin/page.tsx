import React from "react";
import type { Metadata } from "next";
import CategoryTreatmentPage from "@/components/CategoryTreatmentPage";
import { TREATMENTS } from "@/data/treatments";

export const metadata: Metadata = {
  title: "Skin Treatments in Peth Vadgaon, Kolhapur",
  description:
    "Explore skin-care consultations and treatment options for acne, eczema, psoriasis and pigmentation at Shingare Skin & Cosmetics Clinic in Peth Vadgaon, Kolhapur.",
  alternates: { canonical: "/skin" },
  openGraph: {
    title: "Skin Treatments in Peth Vadgaon, Kolhapur",
    description:
      "Learn about skin-care services and request a consultation at Shingare Skin & Cosmetics Clinic.",
    url: "/skin",
  },
};

export default function SkinTreatmentsPage() {
  const skinServices = TREATMENTS.filter((t) => t.category === "skin");

  return (
    <CategoryTreatmentPage
      title="Skin Treatments"
      subtitle="Clinical Dermatology & Evidence-Based Medical Protocols by Dr. Pramod Shingare (MD Dermatology)"
      services={skinServices}
      highlights={[
        "Severe Acne & Cystic Breakouts",
        "Eczema & Atopic Dermatitis",
        "Psoriasis & Chronic Dermatoses",
        "Pigmentation & Melasma Treatment",
        "Radiofrequency Mole, Wart & Tag Removal",
      ]}
    />
  );
}
