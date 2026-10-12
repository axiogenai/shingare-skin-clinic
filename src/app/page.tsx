"use client";

import React, { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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

function QRRedirectHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const drVoice = searchParams.get("dr_voice");
    const rxId = searchParams.get("rx_id");
    const rx = searchParams.get("rx");
    const cert = searchParams.get("cert");

    if (drVoice || rxId || rx) {
      router.push(`/my-rx?${searchParams.toString()}`);
    } else if (cert) {
      router.push(`/verify?${searchParams.toString()}`);
    }
  }, [searchParams, router]);

  return null;
}

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
