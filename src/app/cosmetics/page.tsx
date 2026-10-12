import React from "react";
import CategoryTreatmentPage from "@/components/CategoryTreatmentPage";
import { TREATMENTS } from "@/data/treatments";

export const metadata = {
  title: "Cosmetic Treatments | Shingare Skin & Cosmetics Clinic",
  description:
    "Medical-grade hydra facials, Q-Switched carbon laser glow peels, microneedling scar revision, and clinical peels under Dr. Pramod Shingare (MD Dermatology).",
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


