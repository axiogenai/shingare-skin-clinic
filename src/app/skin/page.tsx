import React from "react";
import CategoryTreatmentPage from "@/components/CategoryTreatmentPage";
import { TREATMENTS } from "@/data/treatments";

export const metadata = {
  title: "Skin Treatments | Shingare Skin & Cosmetics Clinic",
  description:
    "Evidence-based clinical dermatology for severe acne, eczema, psoriasis, melasma, and mole removal by Dr. Pramod Shingare (MD Dermatology).",
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


