"use client";

import React from "react";
import Link from "next/link";
import {
  Microscope,
  Stethoscope,
  Zap,
  Volume2,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

const steps = [
  {
    step: "01",
    phase: "DIAGNOSTICS",
    title: "Digital Dermoscopy & Barrier Analysis",
    subtitle: "High-resolution cellular mapping before any prescription",
    description:
      "We begin with polarized digital dermoscopy and Wood's lamp analysis to examine sub-surface melanin distribution, vascular inflammation, and sebum barrier integrity with zero guesswork.",
    icon: Microscope,
    deliverables: ["Melanin depth profiling", "Scalp trichoscopy density", "Corneocyte barrier health"],
  },
  {
    step: "02",
    phase: "CONSULTATION",
    title: "Dual-Specialist Medical Diagnosis",
    subtitle: "Root-cause dermatology & clinical aesthetic planning",
    description:
      "Consult directly with Dr. Pramod Shingare and Dr. Priyanka Shingare. We examine lifestyle, hormonal triggers, and past steroid abuse to formulate a personalized, evidence-backed medical protocol.",
    icon: Stethoscope,
    deliverables: ["Zero salon upselling", "Transparent prognosis", "Targeted pharmacological plan"],
  },
  {
    step: "03",
    phase: "TREATMENT",
    title: "In-Clinic US-FDA Standard Procedure",
    subtitle: "Physician-performed lasers, autologous PRP & medi-facials",
    description:
      "All medical procedures — from Q-Switched Nd:YAG laser sessions and autologous growth factor concentrate (GFC) to medical ultrasonic facials — are personally directed under strict surgical sterilization.",
    icon: Zap,
    deliverables: ["Closed-system sterile centrifuge", "Tailored energy fluences", "Hospital-grade safety"],
  },
  {
    step: "04",
    phase: "CONTINUUM",
    title: "ClinicOS Home Regimen & Audio Rx",
    subtitle: "Marathi voice guidance & real-time queue tracking",
    description:
      "Leave with your case paper QR code. Scan at home to listen to Dr. Pramod Shingare's clear Marathi voice instructions for morning/night application, dietary safeguards, and instant certificate verification.",
    icon: Volume2,
    deliverables: ["Marathi & English voice note", "QR-accessible digital record", "OPD queue live tracking"],
  },
];

export default function PatientJourneySection() {
  return (
    <section className="py-20 md:py-28 bg-[#FBFBFA] relative font-source border-t border-stone-200/70">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-6 md:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 bg-[#FAF0DD] text-[#108283] text-xs font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider border border-[#E8DCBE]/70">
            <span className="w-1.5 h-1.5 rounded-full bg-[#108283]" />
            The Clinical Protocol
          </div>

          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl text-stone-950 font-normal leading-tight mb-4">
            How We Treat:{" "}
            <span className="text-[#108283] font-semibold italic">
              A 4-Step Medical Journey
            </span>
          </h2>

          <p className="text-stone-600 text-base md:text-lg font-normal leading-relaxed">
            From your first microscopic skin assessment in Peth Vadgaon to your digital home care regimen, experience medical dermatology structured for lasting results.
          </p>
        </div>

        {/* 4 Connected Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="group relative bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-7 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:border-[#108283]/50 hover:shadow-[0_8px_24px_rgba(16,130,131,0.06)] transition-all duration-300 flex flex-col justify-between"
              >
                {/* Step Top Bar */}
                <div>
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-100">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#108283] tracking-widest">
                        STEP {item.step}
                      </span>
                      <span className="h-2.5 w-px bg-stone-200" />
                      <span className="font-mono text-[10px] uppercase font-semibold text-stone-500 tracking-wider">
                        {item.phase}
                      </span>
                    </div>

                    <div className="w-9 h-9 rounded-xl bg-stone-100 text-[#108283] flex items-center justify-center group-hover:bg-[#108283] group-hover:text-white transition-colors duration-200 border border-stone-200/60">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-playfair text-lg sm:text-xl font-bold text-stone-950 mb-1 leading-snug group-hover:text-[#108283] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-stone-500 font-medium italic mb-3">
                    {item.subtitle}
                  </p>

                  <p className="text-xs text-stone-600 leading-relaxed mb-5">
                    {item.description}
                  </p>
                </div>

                {/* Micro Deliverables List */}
                <div className="pt-4 border-t border-stone-100 space-y-1.5">
                  {item.deliverables.map((deliv, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2 text-[11px] text-stone-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#108283] shrink-0" />
                      <span className="leading-tight">{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Reassurance Banner */}
        <div className="mt-12 bg-white border border-stone-200/80 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FAF0DD] text-[#108283] flex items-center justify-center shrink-0 border border-[#E8DCBE]/60">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900 font-playfair">
                Zero Salon Gimmicks • 100% Medical Consultation Guarantee
              </h4>
              <p className="text-xs text-stone-600">
                All procedures directed under Maharashtra Medical Council clinical guidelines.
              </p>
            </div>
          </div>

          <Link
            href="/book-now"
            className="inline-flex items-center gap-2 bg-stone-950 hover:bg-[#108283] text-stone-50 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 active:scale-95 shrink-0"
          >
            <span>Book Initial Evaluation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
