"use client";

import React from "react";
import Link from "next/link";
import {
  CalendarCheck,
  CheckCircle2,
  Clock,
  ScanFace,
  Microscope,
  SunMedium,
} from "lucide-react";
import { HeroBanner, CTABanner } from "@/components/SharedSections";

interface TreatmentPackage {
  category: string;
  title: React.ReactNode;
  tagline: string;
  description: string;
  highlights: string[];
  sessions: string;
  bookingParam: string;
  icon: any;
}

const packages: TreatmentPackage[] = [
  {
    category: "Clinical Dermatology",
    title: (
      <>
        ClearSkin &amp;{" "}
        <span className="whitespace-nowrap">Pigmentation Reset</span>
      </>
    ),
    tagline: "Medical Dermatology & Chemical Peel Series",
    description:
      "An intensive dermatologist-supervised clinical programme designed to resolve persistent acne vulgaris, post-inflammatory hyperpigmentation, and deep melasma. Combines prescription oral/topical therapeutics with targeted medical chemical peels.",
    highlights: [
      "Clinical consultation & dermoscopy with Dr. Pramod Shingare",
      "Custom chemical peels (Salicylic, Glycolic & Yellow Peels)",
      "Targeted comedone & blackhead extraction",
      "Barrier-nourishing medical skincare regimen",
      "Regular OPD follow-up and digital progress review via ClinicOS",
    ],
    sessions: "3 - 5 Sessions",
    bookingParam: "ClearSkin & Pigmentation Reset Package",
    icon: ScanFace,
  },
  {
    category: "Trichology & Hair Loss",
    title: "Follicle Revival PRP & GFC Protocol",
    tagline: "Autologous Growth Factor Concentrate Series",
    description:
      "A clinically proven trichology sequence combining high-density autologous Platelet-Rich Plasma (PRP) and Growth Factor Concentrate (GFC) to halt follicle miniaturization and stimulate robust new hair growth in male and female pattern hair thinning.",
    highlights: [
      "Baseline scalp trichoscopy & follicular count mapping",
      "High-concentration autologous GFC micro-injections",
      "Scalp biostimulation & active peptide infusion",
      "Evidence-based oral & topical anti-alopecia regimen",
      "Periodic photo-documentation and density tracking",
    ],
    sessions: "4 - 6 Sessions (3-4 weeks apart)",
    bookingParam: "Follicle Revival PRP Protocol",
    icon: Microscope,
  },
  {
    category: "Aesthetic Lasers",
    title: (
      <>
        Precision Laser Toning &amp;{" "}
        <span className="whitespace-nowrap">Medi-Facial Glow</span>
      </>
    ),
    tagline: "Q-Switched Nd:YAG Laser & Medical Hydra Peels",
    description:
      "A multi-modality clinical aesthetic package engineered to refine skin texture, erase sun damage and freckles, tighten pores, and restore luminous skin translucency with zero downtime.",
    highlights: [
      "Hollywood Carbon Laser Glow Peel for pore tightening",
      "Q-Switched Nd:YAG targeted laser toning for pigmentation",
      "Deep medical hydra vortex exfoliation & antioxidant infusion",
      "Immediate radiant finish safe for Indian skin types",
      "Administered under strict dermatological sterility",
    ],
    sessions: "3 - 4 Sessions",
    bookingParam: "Precision Laser & Medi-Facial Glow",
    icon: SunMedium,
  },
];

export default function PackagesPage() {
  return (
    <main className="min-h-screen bg-white font-source">
      {/* 1. Hero Banner */}
      <HeroBanner
        badge="CURATED CLINICAL PROGRAMMES"
        title="Clinical Packages &amp; Series"
        subtitle="Dermatologist-formulated multi-session protocols for sustained skin &amp; hair results"
      />

      {/* 2. Packages Grid */}
      <section className="py-16 md:py-24 px-5 sm:px-6 md:px-8 bg-[#F4F7F8]">
        <div className="max-w-[1140px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-block bg-[#FAEDDA] text-[#108283] text-xs md:text-sm font-semibold px-4 py-1.5 rounded-full mb-3 uppercase tracking-wider">
              COMPREHENSIVE PROTOCOLS
            </div>
            <h2 className="font-playfair text-3xl sm:text-4xl text-gray-950 font-normal leading-tight mb-3">
              Structured Treatment Sequences
            </h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              Achieving long-lasting improvement in chronic acne, hair loss, and pigmentation requires structured multi-session clinical protocols under MD dermatologist monitoring.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch">
            {packages.map((pkg, idx) => {
              const Icon = pkg.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-gray-200/80 p-5 sm:p-6 shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_10px_25px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Header: Icon & Category */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 rounded-xl bg-[#FAF0DD] text-stone-800 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#FAF0DD] text-[#108283]">
                        {pkg.category}
                      </span>
                    </div>

                    {/* Title & Tagline */}
                    <h3 className="font-playfair text-lg sm:text-xl font-bold text-gray-950 mb-1 leading-snug">
                      {pkg.title}
                    </h3>
                    <p className="text-[10.5px] font-semibold text-[#108283] uppercase tracking-wider mb-2.5">
                      {pkg.tagline}
                    </p>

                    {/* Description - Concise 2-3 lines */}
                    <p className="text-xs text-gray-600 leading-relaxed mb-3.5 line-clamp-3 font-normal">
                      {pkg.description}
                    </p>

                    {/* Highlights - Compact top 3 highlights */}
                    <div className="space-y-1.5 mb-4 pt-3 border-t border-gray-100 text-xs text-gray-700">
                      {pkg.highlights.slice(0, 3).map((h, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="leading-tight">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer: Recommendation & Direct Token Action */}
                  <div className="pt-3 border-t border-gray-100 space-y-2.5">
                    <div className="text-[11px] text-gray-500">
                      <span><strong>Recommended:</strong> {pkg.sessions}</span>
                    </div>

                    <Link
                      href={`/book-now?concern=${encodeURIComponent(pkg.bookingParam)}`}
                      className="w-full inline-flex items-center justify-center gap-2 bg-[#108283] hover:bg-[#0c6b6c] text-white py-2.5 rounded-full text-xs font-semibold shadow-xs transition-all active:scale-95"
                    >
                      <CalendarCheck className="w-3.5 h-3.5" />
                      <span>Book Package Token</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. CTA Banner */}
      <CTABanner />
    </main>
  );
}

