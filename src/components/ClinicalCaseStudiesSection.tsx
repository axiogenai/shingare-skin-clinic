"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Clock,
  UserCheck,
  CheckCircle2,
  CalendarCheck,
  ArrowRight,
  ShieldAlert,
  Activity,
  Layers,
} from "lucide-react";

interface ClinicalCase {
  id: string;
  caseCode: string;
  category: string;
  title: string;
  patientProfile: string;
  duration: string;
  sessions: string;
  protocol: string;
  clinicalOutcome: string;
  physician: string;
  keyFindings: string[];
}

const cases: ClinicalCase[] = [
  {
    id: "case-melasma",
    caseCode: "CASE_STUDY // 01",
    category: "Melasma & Pigmentation",
    title: "Recalcitrant Centrofacial Melasma in Fitzpatrick IV Skin",
    patientProfile: "36-year-old female with 4-year history of post-pregnancy epidermal & mixed dermal melasma resistant to hydroquinone topicals.",
    duration: "10 Weeks",
    sessions: "5 Laser Sessions",
    protocol: "Sub-nanosecond Q-Switched Nd:YAG (1064nm Low-Fluence Laser Toning) coupled with physiological barrier repair formulations and broad-spectrum mineral photoprotection.",
    clinicalOutcome: "Significant reduction in modified MASI (Melasma Area & Severity Index) score (>75% clearance) with zero post-inflammatory hyperpigmentation (PIH).",
    physician: "Dr. Pramod Suresh Shingare (MD)",
    keyFindings: [
      "Targeted photoacoustic breakdown of deep dermal melanophages",
      "Restoration of compromised stratum corneum lipids",
      "Zero downtime, zero skin peeling or thermal burn",
    ],
  },
  {
    id: "case-alopecia",
    caseCode: "CASE_STUDY // 02",
    category: "Trichology & Hair Restoration",
    title: "Norwood Grade 3 Androgenetic Alopecia & Crown Miniaturization",
    patientProfile: "29-year-old male presenting with progressive vertex thinning, receding bitemporal hairline, and high shedding index over 18 months.",
    duration: "16 Weeks",
    sessions: "4 Autologous GFC Sessions",
    protocol: "Autologous Growth Factor Concentrate (GFC) derived via sterile temperature-stabilized centrifugation, micro-injected at 1.2mm depth across follicular roots combined with oral 5-alpha reductase inhibitors.",
    clinicalOutcome: "Digital trichoscopy revealed an increase in terminal hair density from 52/cm² to 94/cm² with marked reduction in the telogen hair ratio.",
    physician: "Dr. Pramod Suresh Shingare (MD)",
    keyFindings: [
      "Reversal of follicular miniaturization across the crown",
      "100% autologous biocompatibility with zero allergic response",
      "Noticeable reduction in daily shedding by Week 4",
    ],
  },
  {
    id: "case-acne",
    caseCode: "CASE_STUDY // 03",
    category: "Clinical Acne & Scarring",
    title: "Grade 3 Severe Inflammatory Cystic Acne & Post-Inflammatory Erythema",
    patientProfile: "22-year-old male with persistent painful inflammatory nodules, pustules, and deep red macular erythema across cheeks and jawline.",
    duration: "8 Weeks",
    sessions: "3 Physician Peels + Extraction",
    protocol: "Physician-directed ultrasonic vortex extraction, 20% Beta-hydroxy acid (BHA) targeted chemical resurfacing, and structured medical antimicrobial taper.",
    clinicalOutcome: "90% cessation of new cystic eruptions, decongestion of follicular infundibulum, and profound attenuation of active inflammatory erythema.",
    physician: "Dr. Priyanka Pramod Shingare",
    keyFindings: [
      "Sebum regulation and elimination of Propionibacterium acnes biofilm",
      "Preservation of native barrier lipids preventing rebound xerosis",
      "Seamless transition into acne scar prevention phase",
    ],
  },
  {
    id: "case-scars",
    caseCode: "CASE_STUDY // 04",
    category: "Laser Surgery & Resurfacing",
    title: "Atrophic Boxcar & Rolling Acne Scars Remodeling",
    patientProfile: "27-year-old female with long-standing post-acne dermal tethering and rolling depressions across bilateral malar regions.",
    duration: "14 Weeks",
    sessions: "3 Subcision + Laser Sessions",
    protocol: "Blunt-cannula mechanical scar subcision to release deep fibrous bands, combined with fractional Q-Switched collagen remodeling and autologous platelet infusion.",
    clinicalOutcome: "Substantial lifting of depressed scar bases (~65–70% volumetric improvement) with smoothed skin texture under directional lighting.",
    physician: "Dr. Pramod Suresh Shingare (MD)",
    keyFindings: [
      "Physical release of fibrotic subdermal anchor bands",
      "Neocollagenesis induction confirmed via tactile tissue elasticity",
      "Safe energy parameters preventing hyperpigmentation in Indian skin",
    ],
  },
];

export default function ClinicalCaseStudiesSection() {
  const [activeCase, setActiveCase] = useState<string>("case-melasma");
  const selected = cases.find((c) => c.id === activeCase) || cases[0];

  return (
    <section className="py-20 md:py-28 bg-[#F6F5F3] relative font-source border-t border-stone-200/70">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-18">
          <div className="inline-flex items-center gap-2 bg-[#FAF0DD] text-[#108283] text-xs font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider border border-[#E8DCBE]/70">
            <span className="w-1.5 h-1.5 rounded-full bg-[#108283]" />
            Evidence-Based Care
          </div>

          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl text-stone-950 font-normal leading-tight mb-4">
            Documented Clinical{" "}
            <span className="text-[#108283] font-semibold italic">
              Case Outcomes
            </span>
          </h2>

          <p className="text-stone-600 text-base md:text-lg font-normal leading-relaxed">
            Real dermatological cases treated at Shingare Skin &amp; Cosmetics Clinic, Peth Vadgaon. Documented clinical protocols, precise timelines, and verifiable results.
          </p>
        </div>

        {/* Case Study Tabs Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          {cases.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCase(c.id)}
              className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                activeCase === c.id
                  ? "bg-stone-950 text-white shadow-xs"
                  : "bg-white text-stone-700 border border-stone-200/90 hover:border-stone-400 hover:text-stone-950"
              }`}
            >
              <span className="font-mono text-[10px] opacity-70 mr-1.5">
                {c.caseCode.replace("CASE_STUDY // ", "")}
              </span>
              <span>{c.category}</span>
            </button>
          ))}
        </div>

        {/* Selected Case Deep Dive Card */}
        <div className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-10 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Column: Clinical Parameters & Findings (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                {/* Micro Meta */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-xs font-bold text-[#108283] tracking-widest uppercase">
                    {selected.caseCode}
                  </span>
                  <span className="h-3 w-px bg-stone-300" />
                  <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                    {selected.category}
                  </span>
                </div>

                <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-stone-950 mb-4 leading-tight">
                  {selected.title}
                </h3>

                {/* Patient Profile */}
                <div className="mb-6 p-4 rounded-xl bg-stone-50 border border-stone-200/60">
                  <h4 className="text-[11px] font-mono uppercase tracking-wider text-stone-500 font-semibold mb-1">
                    Initial Clinical Presentation
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                    {selected.patientProfile}
                  </p>
                </div>

                {/* Medical Protocol */}
                <div className="mb-6">
                  <h4 className="text-[11px] font-mono uppercase tracking-wider text-stone-500 font-semibold mb-1.5">
                    Administered Medical Protocol
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-medium">
                    {selected.protocol}
                  </p>
                </div>

                {/* Key Findings Bullet Points */}
                <div className="space-y-2 mb-6">
                  {selected.keyFindings.map((finding, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-stone-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#108283] mt-1.5 shrink-0" />
                      <span className="leading-relaxed">{finding}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Attending Doctor */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-600">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-[#108283]" />
                  <span>Attending Physician: <strong className="text-stone-900 font-semibold">{selected.physician}</strong></span>
                </div>
              </div>
            </div>

            {/* Right Column: Key Outcomes & Metrics Bento (5 cols) */}
            <div className="lg:col-span-5 bg-[#FAF9F7] border border-stone-200/80 rounded-2xl p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-stone-200/60">
                  <span className="font-mono text-xs font-semibold uppercase text-stone-500 tracking-wider">
                    Treatment Metric
                  </span>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-[#FAF0DD] text-[#6B5C2E] border border-[#E8DCBE]">
                    Verified Case
                  </span>
                </div>

                {/* 2 Mini Stat Blocks */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-3.5 bg-white rounded-xl border border-stone-200/60">
                    <div className="font-mono text-[10px] text-stone-500 uppercase">Timeline</div>
                    <div className="font-playfair text-xl font-bold text-stone-950 mt-1">
                      {selected.duration}
                    </div>
                  </div>
                  <div className="p-3.5 bg-white rounded-xl border border-stone-200/60">
                    <div className="font-mono text-[10px] text-stone-500 uppercase">Sessions</div>
                    <div className="font-playfair text-xl font-bold text-stone-950 mt-1">
                      {selected.sessions}
                    </div>
                  </div>
                </div>

                {/* Documented Outcome Text */}
                <div className="p-4 bg-white rounded-xl border border-stone-200/60 mb-6">
                  <div className="font-mono text-[10px] text-[#108283] font-bold uppercase tracking-wider mb-1">
                    Documented Clinical Outcome
                  </div>
                  <p className="text-xs text-stone-800 leading-relaxed font-normal">
                    {selected.clinicalOutcome}
                  </p>
                </div>
              </div>

              {/* Consultation CTA */}
              <Link
                href="/book-now"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#108283] hover:bg-[#0c6b6c] text-white py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-2xs"
              >
                <span>Discuss Your Case in OPD</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
