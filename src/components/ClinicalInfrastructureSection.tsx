"use client";

import React from "react";
import {
  Zap,
  Microscope,
  Activity,
  Droplets,
  Flame,
  SunMedium,
  ShieldCheck,
} from "lucide-react";

interface Platform {
  code: string;
  name: string;
  spec: string;
  indications: string[];
  clinicalImpact: string;
  safetyProfile: string;
  icon: React.ComponentType<{ className?: string }>;
}

const platforms: Platform[] = [
  {
    code: "PLATFORM 01",
    name: "Dual-Wavelength Q-Switched Nd:YAG Laser",
    spec: "1064nm / 532nm Sub-Nanosecond Energy",
    indications: ["Melasma & Dark Spots", "Acne Scar Resurfacing", "Carbon Glow Peel"],
    clinicalImpact:
      "Selectively shatters deep dermal pigment via photoacoustic energy with zero thermal damage to surrounding tissue.",
    safetyProfile: "Zero burning • Safe for Indian skin types",
    icon: Zap,
  },
  {
    code: "PLATFORM 02",
    name: "High-Resolution Polarized Digital Dermatoscope",
    spec: "40× Optical Magnification & Cross-Polarized Lens",
    indications: ["Follicle Density Mapping", "Hair Loss Diagnosis", "Mole & Lesion Screening"],
    clinicalImpact:
      "Eliminates surface glare to reveal deep dermal melanin patterns, root miniaturization, and micro-vascular health.",
    safetyProfile: "100% non-invasive • Instant digital readout",
    icon: Microscope,
  },
  {
    code: "PLATFORM 03",
    name: "Closed-System Autologous Centrifuge Platform",
    spec: "Precision RCF Speed & Temperature Control",
    indications: ["Growth Factor Concentrate (GFC)", "Autologous Platelet PRP", "Hair Revascularization"],
    clinicalImpact:
      "Isolates pure natural growth factors without chemical additives or contamination risk, accelerating cellular regeneration.",
    safetyProfile: "100% autologous biocompatible • Zero allergy risk",
    icon: Activity,
  },
  {
    code: "PLATFORM 04",
    name: "Medical Ultrasonic Vortex Hydro-Extractor",
    spec: "Negative Pressure Vacuum + Micro-Jet Infusion",
    indications: ["Pore & Blackhead Purge", "Barrier Decongestion", "Medical Medi-Facials"],
    clinicalImpact:
      "Gently vacuums out deep follicular debris while infusing medical-grade barrier serums deep into the skin.",
    safetyProfile: "Non-irritating suction • Zero peeling or downtime",
    icon: Droplets,
  },
  {
    code: "PLATFORM 05",
    name: "High-Frequency Radiofrequency Electrocautery",
    spec: "3.8 MHz Sub-Tissue Monopolar Micro-Current",
    indications: ["Skin Tags & DPN Removal", "Benign Warts & Moles", "Instant Hemostasis"],
    clinicalImpact:
      "Precision radiofrequency current vaporizes unwanted superficial benign growths with microscopic margin accuracy.",
    safetyProfile: "Local numbing • Rapid healing with minimal marking",
    icon: Flame,
  },
  {
    code: "PLATFORM 06",
    name: "Narrowband UVB (311nm) Phototherapy System",
    spec: "311nm Peak Narrowband Monochromatic Light",
    indications: ["Psoriasis & Vitiligo", "Chronic Atopic Eczema", "Alopecia Areata"],
    clinicalImpact:
      "Delivers therapeutic 311nm light waves to calm inflammatory immune cells and stimulate natural repigmentation.",
    safetyProfile: "Drug-free, non-thermal • Controlled dosimetry",
    icon: SunMedium,
  },
];

export default function ClinicalInfrastructureSection() {
  return (
    <section
      id="clinical-infrastructure"
      className="py-16 sm:py-20 md:py-24 bg-white relative font-source border-t border-[#292d27]/8 [&_*]:!transform-none [&_*]:!transition-none [&_*]:hover:!transform-none"
    >
      <div className="max-w-[1240px] mx-auto px-5 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-[#7e423e]/8 text-[#7e423e] text-[10px] sm:text-[11px] font-mono font-semibold px-3.5 py-1.5 rounded-full mb-3 uppercase tracking-[0.2em] border border-[#7e423e]/15">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7e423e]" />
            Clinical Infrastructure
          </div>

          <h2 className="font-['Playfair_Display',Georgia,serif] text-3xl sm:text-4xl md:text-5xl text-[#1b261e] font-bold leading-tight mb-3">
            Hospital-Grade Aesthetic &amp;{" "}
            <span className="italic font-medium text-[#873f3b]">
              Diagnostic Hardware
            </span>
          </h2>

          <p className="text-[#616558] text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            Unlike commercial salons using uncalibrated parlor machines, every procedure at Shingare Clinic is powered by calibrated, physician-grade medical instrumentation.
          </p>
        </div>

        {/* 6 Balanced Cards Grid (3x2, Compact Height, Zero Hover Animation) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {platforms.map((plat) => {
            const Icon = plat.icon;
            return (
              <div
                key={plat.code}
                className="bg-[#FAF8F5] border border-[#292d27]/10 rounded-2xl p-5 sm:p-6 shadow-[0_2px_10px_rgba(41,45,39,0.03)] flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Code & Icon */}
                  <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[#292d27]/8">
                    <span className="font-mono text-xs font-bold text-[#873f3b] tracking-wider">
                      {plat.code}
                    </span>
                    <div className="w-7 h-7 rounded-lg bg-white border border-[#292d27]/10 flex items-center justify-center text-[#1a241d]">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Platform Title */}
                  <h3 className="font-['Playfair_Display',Georgia,serif] text-base sm:text-[17px] font-bold text-[#1a241d] mb-1 leading-snug">
                    {plat.name}
                  </h3>

                  {/* Spec */}
                  <div className="font-mono text-[10px] sm:text-[11px] text-[#873f3b] font-semibold mb-2.5">
                    {plat.spec}
                  </div>

                  {/* Clinical Impact Description */}
                  <p className="text-xs text-[#555d4d] leading-relaxed mb-3.5">
                    {plat.clinicalImpact}
                  </p>

                  {/* Indications Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3.5">
                    {plat.indications.map((ind, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-medium text-[#292d27] bg-white px-2 py-0.5 rounded-md border border-[#292d27]/8 shadow-2xs"
                      >
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Safety Profile Footer */}
                <div className="pt-2.5 border-t border-[#292d27]/8 flex items-center gap-1.5 text-[11px] text-[#616558]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#873f3b] shrink-0" />
                  <span className="leading-tight font-medium">{plat.safetyProfile}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
