"use client";

import React from "react";
import Link from "next/link";
import {
  CalendarCheck,
  CheckCircle2,
  Clock,
  HeartHandshake,
  MapPin,
  Phone,
  ShieldCheck,
  Stethoscope,
  Activity,
  Zap,
  ArrowRight,
} from "lucide-react";
import { HeroBanner, CTABanner } from "@/components/SharedSections";
import DoctorsSilkEditorial from "@/components/DoctorsSilkEditorial";
import ConfidenceSection from "@/components/ConfidenceSection";

const clinicPillars = [
  {
    number: "01",
    title: "Evidence-Based Clinical Science",
    description:
      "Every diagnosis and prescription is grounded in peer-reviewed medical literature. We avoid unscientific salon fads, emphasizing pharmacological and procedural efficacy.",
  },
  {
    number: "02",
    title: "Consultant Dermatologist Care",
    description:
      "Clinical consultations, dermoscopy, autologous PRP/GFC procedures, and laser therapies are personally performed and directed by our consultant dermatologists.",
  },
  {
    number: "03",
    title: "Gold-Standard Technology",
    description:
      "Our clinic is equipped with advanced clinical aesthetic platforms, including Q-Switched Nd:YAG lasers, ultrasonic vortex extraction, and precision electrocautery.",
  },
  {
    number: "04",
    title: "Smart Digital Health With ClinicOS",
    description:
      "Eliminating the frustration of chaotic waiting rooms with live OPD queue radar, digital Marathi prescription voice notes, and cryptographic certificate verification.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white font-source">
      {/* 1. Hero Banner */}
      <HeroBanner
        badge="SHINGARE SKIN & COSMETICS CLINIC • PETH VADGAON"
        title="About Our Clinic &amp; Physicians"
        subtitle="Clinical Dermatology, Trichology &amp; Advanced Cosmetology Led by Our Expert Specialists"
      />

      {/* 2. Luxury Doctor Profiles with Fluid Silk Backgrounds (docbg & docbg1) */}
      <DoctorsSilkEditorial />

      {/* 3. Clinical Confidence / Stats Grid */}
      <ConfidenceSection />

      {/* 4. Four Core Pillars */}
      <section className="py-20 md:py-28 bg-[#F4F7F8] px-5 sm:px-6 md:px-8">
        <div className="max-w-[1140px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-block bg-[#FAEDDA] text-[#108283] text-xs md:text-sm font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider">
              OUR PRACTICE FOUNDATIONS
            </div>
            <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl text-gray-950 font-normal leading-tight">
              Rooted In Medical Ethics &amp; Precision
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {clinicPillars.map((p) => (
              <div
                key={p.number}
                className="bg-white rounded-3xl p-7 sm:p-8 border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_40px_rgba(16,130,131,0.06)] transition-all"
              >
                <div className="text-[#108283] font-playfair font-bold text-3xl mb-3">
                  {p.number}
                </div>
                <h3 className="font-playfair text-xl font-bold text-gray-950 mb-2">
                  {p.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed font-normal">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Location & Facility Banner */}
      <section className="py-16 md:py-20 px-5 sm:px-6 md:px-8 bg-white border-t border-gray-100">
        <div className="max-w-[1140px] mx-auto bg-[#FAF0DD]/60 border border-[#F0DAAA]/70 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#F0DAAA] text-xs font-semibold text-[#108283]">
              <MapPin className="w-3.5 h-3.5" />
              <span>Peth Vadgaon, Kolhapur District</span>
            </div>
            <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-gray-950">
              Visit Shingare Skin &amp; Cosmetics Clinic
            </h3>
            <p className="text-sm text-gray-700 max-w-xl leading-relaxed">
              Conveniently situated near the S.T. Bus Stand in Peth Vadgaon with dedicated examination suites, sterile laser operatory, and comfortable waiting lounge.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/book-now"
              className="inline-flex items-center justify-center gap-2 bg-[#108283] hover:bg-[#0c6b6c] text-white px-7 py-3.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all shadow-xs active:scale-95"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Book Token</span>
            </Link>
            <a
              href="tel:+917249727104"
              className="inline-flex items-center justify-center gap-2 bg-white text-gray-800 border border-gray-200 hover:border-gray-400 px-6 py-3.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all"
            >
              <Phone className="w-4 h-4 text-[#108283]" />
              <span>+91 72497 27104</span>
            </a>
          </div>
        </div>
      </section>

      {/* 6. CTA Banner */}
      <CTABanner />
    </main>
  );
}

