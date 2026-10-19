"use client";

import React from "react";

export default function ConfidenceSection() {
  const clinicalStandards = [
    {
      code: "01",
      title: "100% Doctor-Led Care",
      subtitle: "MMC REGISTERED SPECIALISTS",
      description:
        "Every consultation, diagnosis, and laser procedure is personally performed by Dr. Pramod or Dr. Priyanka Shingare — never delegated to technicians.",
    },
    {
      code: "02",
      title: "US FDA-Cleared Lasers",
      subtitle: "GOLD-STANDARD PLATFORMS",
      description:
        "Equipped with dual-wavelength Q-Switched Nd:YAG lasers, polarized digital dermoscopy, and autologous PRP/GFC systems under hospital-grade sterilization.",
    },
    {
      code: "03",
      title: "Root-Cause Diagnostics",
      subtitle: "ZERO GUESSWORK • HONEST MEDICINE",
      description:
        "Science-backed treatment architecture tailored to your unique skin biology with transparent medical counsel and zero commercial upselling.",
    },
  ];

  return (
    <section className="relative isolate py-14 sm:py-18 md:py-22 bg-[#FAF8F5] border-y border-[#292d27]/8 select-none">
      <div className="max-w-[1200px] mx-auto px-4 xs:px-6 sm:px-8">
        {/* Editorial Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#292d27]/10 shadow-[0_2px_6px_rgba(0,0,0,0.03)] mb-3.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#873f3b]" />
            <span className="text-[9.5px] xs:text-[10px] font-mono font-bold tracking-[0.16em] text-[#555a50] uppercase">
              THE CLINICAL STANDARD
            </span>
          </div>

          <h2 className="font-['Playfair_Display',Georgia,serif] text-2xl xs:text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#1a221b] leading-[1.22] tracking-tight">
            Advanced Clinical Dermatology.
            <br />
            <span className="italic font-medium text-[#873f3b]">
              Ethical Care, Zero Compromise.
            </span>
          </h2>

          <p className="mt-3 text-xs xs:text-sm sm:text-base text-[#555a50] leading-relaxed max-w-2xl mx-auto">
            Delivering evidence-based medical dermatology, laser aesthetics, and trichology with physician-led rigor and absolute clinical transparency.
          </p>
        </div>

        {/* 3 Impressive Clinical Standard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {clinicalStandards.map((item) => (
            <div
              key={item.code}
              className="group relative rounded-2xl bg-white p-5 xs:p-6 sm:p-7 border border-[#292d27]/10 shadow-[0_4px_20px_rgba(40,45,35,0.04),inset_0_1px_0_0_rgba(255,255,255,0.95)] hover:border-[#873f3b]/30 transition-all duration-200"
            >
              <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-[#292d27]/8">
                <span className="font-mono text-[11px] font-bold text-[#873f3b] tracking-wider">
                  STANDARD {item.code}
                </span>
                <span className="w-2 h-2 rounded-full bg-[#873f3b]/20 group-hover:bg-[#873f3b] transition-colors" />
              </div>

              <h3 className="font-['Playfair_Display',Georgia,serif] text-lg sm:text-xl font-bold text-[#1a221b] tracking-tight">
                {item.title}
              </h3>
              <p className="text-[10px] xs:text-[10.5px] font-mono font-bold uppercase tracking-[0.14em] text-[#873f3b] mt-1">
                {item.subtitle}
              </p>

              <p className="mt-2.5 text-xs sm:text-[13px] text-[#555a50] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
