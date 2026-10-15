"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

interface JourneyStep {
  step: string;
  phase: string;
  title: string;
  description: string;
  highlights: string[];
}

const steps: JourneyStep[] = [
  {
    step: "01",
    phase: "ASSESSMENT",
    title: "Skin & Scalp Analysis",
    description:
      "Comprehensive optical dermoscopy to analyze skin barrier health, melanin depth, and uncover the root cause of your concern.",
    highlights: ["Optical dermoscopy imaging", "Root-cause diagnosis"],
  },
  {
    step: "02",
    phase: "CONSULTATION",
    title: "Doctor-Led Evaluation",
    description:
      "Direct consultation with Dr. Pramod or Dr. Priyanka Shingare to discuss medical history, lifestyle factors, and an honest prognosis.",
    highlights: ["Dedicated physician time", "Transparent treatment roadmap"],
  },
  {
    step: "03",
    phase: "PROCEDURE",
    title: "Precision Treatment",
    description:
      "Physician-directed procedures using US-FDA cleared clinical lasers and customized protocols under strict hospital-grade sterilization.",
    highlights: ["US-FDA standard lasers", "Hospital-grade sterilization"],
  },
  {
    step: "04",
    phase: "CONTINUUM",
    title: "Recovery & Follow-Up",
    description:
      "A structured home skincare regimen with prescription guidance, preventive lifestyle advice, and scheduled clinical reviews.",
    highlights: ["Personalized daily routine", "Continued clinical review"],
  },
];

export default function PatientJourneySection() {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-[#FAF8F5] relative border-t border-[#292d27]/8">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-6 md:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-[#7e423e]/8 text-[#7e423e] text-[10px] sm:text-[11px] font-mono font-semibold px-3.5 py-1.5 rounded-full mb-3 uppercase tracking-[0.2em] border border-[#7e423e]/15">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7e423e]" />
            The Clinical Protocol
          </div>

          <h2 className="font-['Playfair_Display',Georgia,serif] text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-bold text-[#1b261e] leading-[1.14] tracking-tight mb-3">
            How We Care:{" "}
            <span className="italic font-medium text-[#873f3b]">
              A 4-Step Medical Journey
            </span>
          </h2>

          <p className="text-[#616558] text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            A doctor-led pathway designed to deliver safe, transparent, and lasting clinical results without commercial upselling.
          </p>
        </div>

        {/* 4 Step Cards Grid - Clean, Static, No Emoji, No Hover Jitter */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {steps.map((item) => (
            <div
              key={item.step}
              style={{ transform: "none", transition: "none" }}
              className="relative bg-white border border-[#292d27]/10 rounded-2xl p-6 shadow-[0_2px_12px_rgba(41,45,39,0.03),inset_0_1px_0_0_rgba(255,255,255,0.9)] flex flex-col justify-between !transform-none !transition-none"
            >
              {/* Step Top Bar */}
              <div>
                <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-[#292d27]/8">
                  <span className="font-mono text-[10px] font-bold text-[#7e423e] tracking-[0.16em] uppercase bg-[#7e423e]/8 border border-[#7e423e]/15 px-2.5 py-1 rounded-full">
                    STEP {item.step}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#888b80] font-semibold">
                    {item.phase}
                  </span>
                </div>

                <h3 className="font-['DM_Serif_Display',Georgia,serif] text-xl sm:text-[22px] font-normal text-[#1e251f] mb-2 leading-snug tracking-tight">
                  {item.title}
                </h3>

                <p className="text-xs text-[#616558] leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Key Deliverables Highlights */}
              <div className="pt-4 mt-5 border-t border-[#292d27]/8 space-y-2">
                {item.highlights.map((highlight, hIdx) => (
                  <div key={hIdx} className="flex items-center gap-2 text-[11px] text-[#4b5043]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7e423e] shrink-0" />
                    <span className="font-medium leading-tight">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Reassurance Banner */}
        <div
          style={{ transform: "none", transition: "none" }}
          className="mt-10 sm:mt-12 bg-white border border-[#292d27]/10 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_2px_12px_rgba(41,45,39,0.03)] !transform-none !transition-none"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#7e423e]/10 text-[#7e423e] flex items-center justify-center shrink-0 border border-[#7e423e]/15">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm md:text-base font-normal text-[#1e251f] font-['DM_Serif_Display',Georgia,serif] tracking-tight">
                Medical-First Dermatology • Zero Commercial Upselling
              </h4>
              <p className="text-[11px] sm:text-xs text-[#616558] mt-0.5">
                Every consultation and procedure is directed under Maharashtra Medical Council guidelines.
              </p>
            </div>
          </div>

          <Link
            href="/book-now"
            style={{ backgroundColor: "#292d27" }}
            className="inline-flex items-center gap-2 bg-[#292d27] text-white px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider shrink-0 shadow-sm"
          >
            <span>Book Consultation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
