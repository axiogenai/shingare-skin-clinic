import type { Metadata } from "next";
import { Suspense } from "react";
import QRRedirectHandler from "@/components/QRRedirectHandler";
import ThreePageExperience from "@/components/ThreePageExperience";
import PatientJourneySection from "@/components/PatientJourneySection";
import ClinicalInfrastructureSection from "@/components/ClinicalInfrastructureSection";
import DoctorsSilkEditorial from "@/components/DoctorsSilkEditorial";
import ClinicalCaseStudiesSection from "@/components/ClinicalCaseStudiesSection";
import ClinicOSFeaturesSection from "@/components/ClinicOSFeaturesSection";
import Testimonials2 from "@/components/watermelon-ui/testimonials-2";
import OPDTimingsLocationSection from "@/components/OPDTimingsLocationSection";
import AppointmentSection from "@/components/AppointmentSection";
import FAQSection from "@/components/FAQSection";
import styles from "./homepage-redesign.module.css";

export const metadata: Metadata = {
  title: "Skin & Hair Clinic in Peth Vadgaon, Kolhapur",
  description:
    "Explore skin, hair and cosmetic care at Shingare Skin & Cosmetics Clinic in Peth Vadgaon, Kolhapur. Learn about services and request a consultation.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Shingare Skin & Cosmetics Clinic | Peth Vadgaon, Kolhapur",
    description:
      "Explore skin, hair and cosmetic care and request a consultation at Shingare Skin & Cosmetics Clinic, Peth Vadgaon, Kolhapur.",
    url: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <Suspense fallback={null}>
        <QRRedirectHandler />
      </Suspense>
      <div className={styles.homepage}>
        <ThreePageExperience />
        <PatientJourneySection />
        <ClinicalInfrastructureSection />
        <DoctorsSilkEditorial />
        <ClinicalCaseStudiesSection />
        <ClinicOSFeaturesSection />
        <Testimonials2 />
        <OPDTimingsLocationSection />
        <AppointmentSection />
        <FAQSection />
      </div>
    </>
  );
}
