"use client";

import React, { useState } from "react";
import Link from "next/link";
import { UserCheck, CheckCircle2, ArrowRight } from "lucide-react";

interface ClinicalCase {
  id: string;
  caseCode: string;
  category: string;
  title: string;
  patientProfile: string;
  protocol: string;
  clinicalOutcome: string;
  physician: string;
  metrics: {
    timeline: string;
    sessions: string;
    outcome: string;
    highlight: string;
  };
  keyFindings: string[];
}

const cases: ClinicalCase[] = [
  {
    id: "case-melasma",
    caseCode: "Case 01",
    category: "Melasma & Pigmentation",
    title: "Clearing 4-Year Stubborn Facial Pigmentation",
    patientProfile:
      "A 36-year-old patient struggling with dark post-pregnancy patches (melasma) across her cheeks and forehead for 4 years that did not respond to standard creams.",
    protocol:
      "Gentle US-FDA Q-Switched Nd:YAG laser toning to safely shatter deep pigment without heat damage, combined with clinical skin barrier repair.",
    clinicalOutcome:
      "Over 75% pigment clearance with smooth, radiant skin tone and zero rebound darkening.",
    physician: "Dr. Pramod Suresh Shingare (MD)",
    metrics: {
      timeline: "10 Weeks",
      sessions: "5 Visits",
      outcome: "75%+ Cleared",
      highlight: "Zero Downtime",
    },
    keyFindings: [
      "Breaks down deep dark pigment safely without burning or peeling",
      "Calibrated specifically for Indian skin to prevent post-laser marks",
      "Restores skin barrier health to stop dark spots from returning",
    ],
  },
  {
    id: "case-alopecia",
    caseCode: "Case 02",
    category: "Hair Thinning & Restoration",
    title: "Restoring Crown Thinning & Receding Hairline",
    patientProfile:
      "A 29-year-old male experiencing progressive crown thinning, a receding hairline, and heavy daily hair fall over an 18-month period.",
    protocol:
      "Autologous Growth Factor Concentrate (GFC) therapy — using the patient's own natural growth proteins micro-delivered directly to hair roots.",
    clinicalOutcome:
      "Hair density increased from 52 to 94 hairs/cm², with stronger roots and full crown coverage.",
    physician: "Dr. Pramod Suresh Shingare (MD)",
    metrics: {
      timeline: "16 Weeks",
      sessions: "4 Visits",
      outcome: "+80% Density",
      highlight: "100% Natural",
    },
    keyFindings: [
      "100% natural therapy using patient's own blood proteins — zero allergy risk",
      "Daily hair shedding halted noticeably within the first 4 weeks",
      "Wakes up dormant hair roots to grow thicker, fuller hair shafts",
    ],
  },
  {
    id: "case-acne",
    caseCode: "Case 03",
    category: "Severe Acne & Red Marks",
    title: "Clearing Severe Cystic Acne & Painful Breakouts",
    patientProfile:
      "A 22-year-old male with persistent painful acne bumps, active cysts, and stubborn red marks covering his cheeks and jawline.",
    protocol:
      "Physician-directed ultrasonic vortex pore extraction paired with clarifying medical peels to calm swelling and eliminate acne bacteria at the root.",
    clinicalOutcome:
      "90% stop in new acne eruptions, completely unclogged pores, and rapid fading of stubborn red marks.",
    physician: "Dr. Priyanka Pramod Shingare",
    metrics: {
      timeline: "8 Weeks",
      sessions: "3 Visits",
      outcome: "90% Cleared",
      highlight: "Painless Extraction",
    },
    keyFindings: [
      "Deeply cleanses congested pores without drying or stripping skin moisture",
      "Stops breakouts quickly while preventing permanent pitted acne scars",
      "Calms active redness and accelerates natural skin healing",
    ],
  },
  {
    id: "case-scars",
    caseCode: "Case 04",
    category: "Deep Acne Scars",
    title: "Smoothing Deep Pitted & Rolling Acne Scars",
    patientProfile:
      "A 27-year-old female with long-standing indented acne scars and bumpy skin texture across both cheeks from past breakouts.",
    protocol:
      "Blunt-cannula subcision (releasing deep tight bands pulling skin down) combined with fractional collagen-building laser resurfacing.",
    clinicalOutcome:
      "Sunken scar pits lifted significantly, creating a visibly smoother, even skin texture in natural daylight.",
    physician: "Dr. Pramod Suresh Shingare (MD)",
    metrics: {
      timeline: "14 Weeks",
      sessions: "3 Visits",
      outcome: "~70% Smoother",
      highlight: "Collagen Rebuilt",
    },
    keyFindings: [
      "Releases tight scar tissue so indented skin can naturally bounce back",
      "Triggers the body's natural collagen to rebuild and smooth out pits",
      "Safe laser energy calibrated to prevent dark spots on Indian skin",
    ],
  },
];

export default function ClinicalCaseStudiesSection() {
  const [activeCase, setActiveCase] = useState<string>("case-melasma");
  const selected = cases.find((c) => c.id === activeCase) || cases[0];

  return (
    <section className="py-16 md:py-24 bg-[#FAF8F5] relative font-source border-t border-[#292d27]/8">
      <div className="max-w-[1140px] mx-auto px-5 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-[#FAF0DD] text-[#873f3b] text-xs font-semibold px-4 py-1.5 rounded-full mb-3 uppercase tracking-wider border border-[#E8DCBE]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#873f3b]" />
            Evidence-Based Care
          </div>

          <h2 className="font-['Playfair_Display',Georgia,serif] text-3xl sm:text-4xl md:text-[42px] text-[#1a241d] font-bold leading-tight mb-3">
            Real Patient{" "}
            <span className="italic font-medium text-[#873f3b]">
              Case Outcomes
            </span>
          </h2>

          <p className="text-[#555d4d] text-sm sm:text-base leading-relaxed">
            Documented clinical treatments and verified results from Shingare Skin &amp; Cosmetics Clinic.
          </p>
        </div>

        {/* Case Study Tabs Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {cases.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setActiveCase(c.id)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-semibold transition-all duration-150 cursor-pointer ${
                activeCase === c.id
                  ? "bg-[#1a241d] text-white shadow-xs"
                  : "bg-white text-[#4a5043] border border-[#292d27]/12 hover:border-[#292d27]/30 hover:text-[#1a241d]"
              }`}
            >
              <span className="font-mono text-[10px] text-[#873f3b] font-bold mr-1.5">
                0{i + 1}
              </span>
              <span>{c.category}</span>
            </button>
          ))}
        </div>

        {/* Brand New Modern, Compact Case Card (Zero inner hover animation) */}
        <div
          id="clinical-cases-card"
          className="max-w-[880px] mx-auto bg-white border border-[#292d27]/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-[0_4px_24px_rgba(41,45,39,0.04)] !transform-none !transition-none hover:!transform-none [&_*]:!transform-none [&_*]:!transition-none [&_*]:hover:!transform-none"
        >
          {/* Card Top: Tag + Physician */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-[#292d27]/8">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-[#873f3b] tracking-wider uppercase">
                {selected.caseCode}
              </span>
              <span className="h-3 w-px bg-[#292d27]/20" />
              <span className="text-xs font-semibold text-[#555d4d]">
                {selected.category}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-[#555d4d]">
              <UserCheck className="w-3.5 h-3.5 text-[#873f3b] shrink-0" />
              <span>
                Attending:{" "}
                <strong className="text-[#1a241d] font-semibold">
                  {selected.physician}
                </strong>
              </span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-['Playfair_Display',Georgia,serif] text-xl sm:text-2xl md:text-[25px] font-bold text-[#1a241d] mb-5 leading-snug">
            {selected.title}
          </h3>

          {/* 4-Stat Quick Metrics Horizontal Bar (Zero gap, instant glance) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mb-5 p-3 sm:p-3.5 bg-[#FAF8F5] rounded-2xl border border-[#292d27]/8">
            <div className="bg-white p-2.5 rounded-xl border border-[#292d27]/6 text-center">
              <span className="font-mono text-[10px] text-[#878a7e] uppercase block">
                Timeline
              </span>
              <span className="font-['Playfair_Display',Georgia,serif] text-base font-bold text-[#1a241d] block mt-0.5">
                {selected.metrics.timeline}
              </span>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-[#292d27]/6 text-center">
              <span className="font-mono text-[10px] text-[#878a7e] uppercase block">
                Sessions
              </span>
              <span className="font-['Playfair_Display',Georgia,serif] text-base font-bold text-[#1a241d] block mt-0.5">
                {selected.metrics.sessions}
              </span>
            </div>
            <div className="bg-[#FAF0DD]/50 p-2.5 rounded-xl border border-[#E8DCBE] text-center">
              <span className="font-mono text-[10px] text-[#873f3b] uppercase font-bold block">
                Outcome
              </span>
              <span className="font-['Playfair_Display',Georgia,serif] text-base font-bold text-[#873f3b] block mt-0.5">
                {selected.metrics.outcome}
              </span>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-[#292d27]/6 text-center">
              <span className="font-mono text-[10px] text-[#878a7e] uppercase block">
                Recovery
              </span>
              <span className="font-['Playfair_Display',Georgia,serif] text-base font-bold text-[#1a241d] block mt-0.5">
                {selected.metrics.highlight}
              </span>
            </div>
          </div>

          {/* 2 Balanced Side-by-Side Story Cards (Zero awkward gaps) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* The Patient's Concern Card */}
            <div className="bg-[#FAF8F5]/70 border border-[#292d27]/8 rounded-2xl p-4 sm:p-5">
              <div className="flex items-center gap-1.5 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#873f3b]" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#873f3b]">
                  The Patient&apos;s Concern
                </span>
              </div>
              <p className="text-xs sm:text-[13px] text-[#292d27] leading-relaxed">
                {selected.patientProfile}
              </p>
            </div>

            {/* Doctor's Protocol & Results Card */}
            <div className="bg-[#FAF8F5]/70 border border-[#292d27]/8 rounded-2xl p-4 sm:p-5">
              <div className="flex items-center gap-1.5 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1a241d]" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#1a241d]">
                  Doctor&apos;s Protocol &amp; Result
                </span>
              </div>
              <p className="text-xs sm:text-[13px] font-medium text-[#1a241d] leading-relaxed mb-2">
                {selected.protocol}
              </p>
              <p className="text-xs sm:text-[13px] text-[#555d4d] leading-relaxed">
                {selected.clinicalOutcome}
              </p>
            </div>
          </div>

          {/* 3 Checkmark Highlights Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-6 p-3 bg-[#FAF8F5]/40 rounded-xl border border-[#292d27]/6">
            {selected.keyFindings.map((finding, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 text-xs text-[#4a5043]"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#873f3b] shrink-0 mt-0.5" />
                <span className="leading-snug">{finding}</span>
              </div>
            ))}
          </div>

          {/* Card Bottom: Consultation CTA Strip */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#292d27]/8">
            <p className="text-xs text-[#555d4d] text-center sm:text-left">
              Have a similar skin or hair concern? Discuss your case 1-on-1 in OPD.
            </p>
            <Link
              href={`/book-now?case=${encodeURIComponent(selected.category)}`}
              className="inline-flex items-center justify-center gap-2 bg-[#1a241d] text-white px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider shadow-sm active:scale-95 transition-transform shrink-0"
            >
              <span>Book OPD Consultation</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
            </Link>
          </div>
        </div>
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            #clinical-cases-card,
            #clinical-cases-card *,
            #clinical-cases-card *:hover {
              transform: none !important;
              transition: none !important;
            }
          `,
        }}
      />
    </section>
  );
}
