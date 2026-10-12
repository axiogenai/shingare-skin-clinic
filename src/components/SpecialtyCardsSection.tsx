"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  CalendarCheck,
  Clock,
  Stethoscope,
  Activity,
  Zap,
  Droplets,
} from "lucide-react";

interface Specialty {
  id: string;
  code: string;
  title: string;
  category: string;
  consultant: string;
  conditions: string[];
  summary: string;
  duration: string;
  downtime: string;
  diagnosticTool: string;
  icon: React.ComponentType<{ className?: string }>;
  bookingParam: string;
  href: string;
}

const specialties: Specialty[] = [
  {
    id: "skin",
    code: "01 // DERM",
    title: "Clinical Dermatology",
    category: "Medical OPD",
    consultant: "Dr. Pramod Suresh Shingare (MD)",
    conditions: ["Acne Vulgaris", "Eczema", "Psoriasis", "Vitiligo"],
    summary:
      "Evidence-based diagnostic evaluation and targeted pharmacotherapy for chronic inflammatory dermatoses, autoimmune disorders, and resistant bacterial/fungal skin infections.",
    duration: "15–25 Mins",
    downtime: "Zero Downtime",
    diagnosticTool: "High-Res Dermoscopy & Wood's Lamp",
    icon: Stethoscope,
    bookingParam: "Clinical Dermatology",
    href: "/skin",
  },
  {
    id: "hair",
    code: "02 // HAIR",
    title: "Trichology & Follicular Science",
    category: "Regenerative Lab",
    consultant: "Dr. Pramod Suresh Shingare (MD)",
    conditions: ["Androgenetic Alopecia", "Telogen Effluvium", "PRP / GFC", "Patchy Loss"],
    summary:
      "Advanced regenerative follicular therapy utilizing autologous growth factors and microscopic trichoscopy density mapping to reverse miniaturization and trigger sustained regrowth.",
    duration: "45–60 Mins",
    downtime: "Zero Downtime",
    diagnosticTool: "Digital Trichoscopy Density Mapping",
    icon: Activity,
    bookingParam: "Trichology & Hair Restoration",
    href: "/hair",
  },
  {
    id: "laser",
    code: "03 // LASER",
    title: "Aesthetic Lasers & Scar Surgery",
    category: "Laser Surgery",
    consultant: "Dr. Pramod & Dr. Priyanka Shingare",
    conditions: ["Acne Scars", "Melasma & Pigment", "Tattoo Removal", "Pore Refinement"],
    summary:
      "Precision dual-wavelength laser resurfacing combined with mechanical scar subcision, engineered specifically for safety and efficacy on Indian Fitzpatrick skin types III–V.",
    duration: "30–45 Mins",
    downtime: "Mild Erythema (12–24h)",
    diagnosticTool: "Q-Switched Nd:YAG Dual Wavelength (1064/532nm)",
    icon: Zap,
    bookingParam: "Laser & Scar Revision",
    href: "/cosmetics",
  },
  {
    id: "facials",
    code: "04 // GLOW",
    title: "Medi-Facials & Barrier Care",
    category: "Clinical Radiance",
    consultant: "Dr. Priyanka Pramod Shingare",
    conditions: ["Hydra-Extraction", "Carbon Glow", "AHA / BHA Peels", "Sebum Control"],
    summary:
      "Clinical ultrasonic vortex extraction coupled with physician-formulated chemical peels to decongest pores, balance sebum, and rebuild cellular skin barrier reserves.",
    duration: "40–50 Mins",
    downtime: "Zero to 6 Hours",
    diagnosticTool: "Corneocyte Barrier & Sebum Analysis",
    icon: Droplets,
    bookingParam: "Medi-Facial & Peels",
    href: "/skin",
  },
];

export default function SpecialtyCardsSection() {
  return (
    <section
      id="services"
      className="scroll-mt-28 pt-20 pb-20 md:pt-28 md:pb-28 bg-transparent relative font-source"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
        {/* Centered Editorial Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-9 md:mb-12">
          {/* Minimalist Medical Eyebrow */}
          <div className="inline-flex items-center justify-center gap-2 text-stone-600 text-xs font-mono tracking-widest uppercase mb-3 bg-white/80 px-3.5 py-1 rounded-full border border-stone-200/80 backdrop-blur-md shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#108283]" />
            <span>Disciplines of Care</span>
            <span className="text-stone-300">•</span>
            <span>Evidence-Based Medicine</span>
          </div>

          <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl text-stone-950 font-medium tracking-tight leading-tight mb-3">
            Clinical Specializations,{" "}
            <span className="text-[#108283] font-semibold italic">
              Engineered for Results
            </span>
          </h2>

          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
            Personally evaluated and supervised by Dr. Pramod Shingare &amp; Dr. Priyanka Shingare. Strict medical protocols with zero guesswork.
          </p>
        </div>

        {/* ARCHITECTURAL OVERVIEW GRID ONLY */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {specialties.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="group relative rounded-2xl bg-white/80 hover:bg-white/95 backdrop-blur-xl border border-stone-200/90 hover:border-[#108283]/60 p-5 sm:p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_4px_24px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(16,130,131,0.07)] transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Architectural Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#108283]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  {/* Top Micro-Bar: Monospace Code + Status Tag + Icon */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-100">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] font-semibold text-stone-500 tracking-wider">
                        {item.code}
                      </span>
                      <span className="h-2 w-px bg-stone-300" />
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 tracking-wide uppercase">
                        {item.category}
                      </span>
                    </div>

                    <div className="w-8 h-8 rounded-lg bg-stone-100/90 text-[#108283] flex items-center justify-center shrink-0 group-hover:bg-[#108283] group-hover:text-white transition-all duration-200 border border-stone-200/60">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Headline */}
                  <h3 className="font-playfair text-xl sm:text-[22px] font-bold text-stone-950 mb-2 leading-snug group-hover:text-[#108283] transition-colors duration-200">
                    {item.title}
                  </h3>

                  {/* Clinical Indication Micro-Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {item.conditions.map((cond, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-medium text-stone-600 bg-stone-100/80 px-2.5 py-0.5 rounded-md border border-stone-200/50"
                      >
                        {cond}
                      </span>
                    ))}
                  </div>

                  {/* Brief Clinical Modality Note */}
                  <p className="text-xs text-stone-600 leading-relaxed mb-4 line-clamp-2">
                    {item.summary}
                  </p>
                </div>

                {/* Compact Bottom Metadata & Direct Action Bar */}
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-[11px] text-stone-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#108283]" />
                      <span>{item.duration}</span>
                    </div>
                    <span className="text-stone-300">•</span>
                    <span className="font-medium text-stone-700">{item.downtime}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={item.href}
                      className="text-[11px] font-bold text-stone-600 hover:text-[#108283] flex items-center gap-0.5 transition-colors"
                    >
                      <span>Scope</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </Link>

                    <Link
                      href={`/book-now?concern=${encodeURIComponent(item.bookingParam)}`}
                      className="inline-flex items-center gap-1.5 bg-stone-900 hover:bg-[#108283] text-stone-50 rounded-lg px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-2xs"
                    >
                      <CalendarCheck className="w-3 h-3 text-[#FAEDDA]" />
                      <span>Book Token</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
