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
    tag: "CLINICAL SCIENCE",
    title: "Evidence-Based Clinical Science",
    description:
      "Every diagnosis and prescription is grounded in peer-reviewed medical literature. We avoid unscientific salon fads, emphasizing pharmacological and procedural efficacy.",
    icon: Stethoscope,
  },
  {
    number: "02",
    tag: "SPECIALIST LED",
    title: "Consultant Dermatologist Care",
    description:
      "Clinical consultations, dermoscopy, autologous PRP/GFC procedures, and laser therapies are personally performed and directed by our consultant dermatologists.",
    icon: HeartHandshake,
  },
  {
    number: "03",
    tag: "CERTIFIED LASERS",
    title: "Gold-Standard Technology",
    description:
      "Our clinic is equipped with advanced clinical aesthetic platforms, including Q-Switched Nd:YAG lasers, ultrasonic vortex extraction, and precision electrocautery.",
    icon: Zap,
  },
  {
    number: "04",
    tag: "SMART DIGITAL OPD",
    title: "Smart Digital Health With ClinicOS",
    description:
      "Eliminating the frustration of chaotic waiting rooms with live OPD queue radar, digital Marathi prescription voice notes, and cryptographic certificate verification.",
    icon: Activity,
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
      <section className="py-20 md:py-28 bg-[#FAF8F5] px-5 sm:px-6 md:px-8 border-t border-[#292d27]/8">
        <div className="max-w-[1140px] mx-auto">
          <div className="text-center max-w-4xl mx-auto mb-14 md:mb-16">
            {/* Practice Foundations Pill Badge with Clinic Crimson Palette */}
            <div className="inline-flex items-center gap-2 bg-[#7e423e]/8 text-[#7e423e] border border-[#7e423e]/18 px-4 py-1.5 rounded-full mb-3.5 text-[10.5px] sm:text-[11px] font-mono font-semibold uppercase tracking-[0.2em] shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7e423e]" />
              <span>OUR PRACTICE FOUNDATIONS</span>
            </div>

            {/* Headline: On the SAME ONE LINE with Main Point Highlighted */}
            <h2 className="font-['Playfair_Display',Georgia,serif] text-[19px] xs:text-[23px] sm:text-[28px] md:text-[34px] lg:text-[40px] text-[#1a241d] font-bold leading-tight tracking-tight whitespace-nowrap overflow-hidden text-ellipsis">
              Rooted In{" "}
              <span className="italic font-medium text-[#873f3b]">
                Medical Ethics &amp; Precision
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-7">
            {clinicPillars.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.number}
                  className="bg-white rounded-2xl p-6 sm:p-7 md:p-8 border border-[#292d27]/10 shadow-[0_2px_12px_rgba(41,45,39,0.03),inset_0_1px_0_0_rgba(255,255,255,0.95)] flex flex-col justify-between"
                >
                  <div>
                    {/* Top Meta Strip */}
                    <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#292d27]/8">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#873f3b] bg-[#873f3b]/8 border border-[#873f3b]/15 px-2.5 py-1 rounded-full">
                          {p.number}
                        </span>
                        <span className="h-3 w-px bg-[#292d27]/20" />
                        <span className="font-mono text-[10px] uppercase font-semibold text-[#616558] tracking-wider">
                          {p.tag}
                        </span>
                      </div>
                      <div className="w-8 h-8 rounded-xl bg-[#FAF6F0] border border-[#292d27]/10 flex items-center justify-center text-[#873f3b] shadow-2xs">
                        <Icon className="w-4 h-4 stroke-[1.75]" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-['Playfair_Display',Georgia,serif] text-xl sm:text-[22px] font-bold text-[#1a241d] mb-2.5 leading-snug tracking-tight">
                      {p.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-[13.5px] text-[#555a50] leading-relaxed font-normal">
                      {p.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Location & Facility Banner */}
      <section className="py-16 md:py-20 px-5 sm:px-6 md:px-8 bg-white border-t border-gray-100">
        <div className="max-w-[1140px] mx-auto bg-[#FAF0DD]/60 border border-[#F0DAAA]/70 rounded-3xl p-6 sm:p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#F0DAAA] text-xs font-semibold text-[#873f3b]">
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

          <div className="flex flex-row items-center justify-center gap-2 sm:gap-3 shrink-0 w-full sm:w-auto">
            <Link
              href="/book-now"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-[#292d27] text-white px-3.5 sm:px-7 py-3 sm:py-3.5 rounded-full text-[10.5px] min-[360px]:text-[11px] min-[390px]:text-xs uppercase tracking-wider font-semibold transition-transform active:scale-[0.985] shadow-xs whitespace-nowrap"
            >
              <CalendarCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>Book Token</span>
            </Link>
            <a
              href="tel:+917249727104"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-white text-gray-800 border border-gray-200 hover:border-gray-400 px-3.5 sm:px-6 py-3 sm:py-3.5 rounded-full text-[10.5px] min-[360px]:text-[11px] min-[390px]:text-xs uppercase tracking-wider font-semibold transition-all active:scale-[0.985] whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#873f3b] shrink-0" />
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

