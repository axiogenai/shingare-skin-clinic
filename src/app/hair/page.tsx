import React from "react";
import CategoryTreatmentPage from "@/components/CategoryTreatmentPage";
import { TREATMENTS } from "@/data/treatments";

export const metadata = {
  title: "Hair Treatments | Shingare Skin & Cosmetics Clinic",
  description:
    "Advanced trichology and hair restoration treatments including autologous PRP, GFC, mesotherapy, and alopecia care by Dr. Pramod Shingare (MD Dermatology).",
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


