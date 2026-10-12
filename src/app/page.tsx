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

      {/* 1. Cinematic Hero + Marquee + Confidence Stats + 4 Specialties */}
      <ThreePageExperience />

      {/* 2. The 4-Step Clinical Protocol (Diagnostics -> Diagnosis -> Procedure -> Home Regimen) */}
      <PatientJourneySection />

      {/* 3. Hospital-Grade Laser & Diagnostic Platforms Showcase */}
      <ClinicalInfrastructureSection />

      {/* 4. Dual-Specialist Editorial Profiles with Credentials (Silk Drapery) */}
      <DoctorsSilkEditorial />

      {/* 5. Documented Clinical Case Outcomes / Case Studies Archive */}
      <ClinicalCaseStudiesSection />

      {/* 6. Smart Digital Health Features (ClinicOS: Audio Rx, Live Queue, Verifier, Skin Quiz) */}
      <ClinicOSFeaturesSection />

      {/* 7. Verified Patient Testimonials (Watermelon UI Testimonials-2) */}
      <Testimonials2 />

      {/* 8. Clinical OPD Hours, Landmark Location & Directions Hub */}
      <OPDTimingsLocationSection />

      {/* 9. Direct OPD Consultation Booking Section */}
      <AppointmentSection />

      {/* 10. Clinical & Procedural Frequently Asked Questions */}
      <FAQSection />
    </>
  );
}
