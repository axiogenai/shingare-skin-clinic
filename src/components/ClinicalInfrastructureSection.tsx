"use client";

import React from "react";
import Link from "next/link";
import {
  Zap,
  Microscope,
  Activity,
  Droplets,
  Flame,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const platforms = [
  {
    code: "PLATFORM // 01",
    name: "Dual-Wavelength Q-Switched Nd:YAG Laser",
    wavelength: "1064nm / 532nm Sub-Nanosecond Energy",
    indications: ["Dermal Melasma & Freckles", "Acne Scar Resurfacing", "Carbon Laser Glow Peel", "Tattoo Pigment Breakdown"],
    clinicalImpact:
      "Selectively fractures deep cutaneous pigment deposits via photoacoustic shockwaves without thermal destruction to adjacent epidermal tissue. Tailored specifically for safe use on Indian Fitzpatrick III–V skin types.",
    safetyProfile: "Zero epidermal charring • Minimal downtime (12–24h mild erythema)",
    icon: Zap,
  },
  {
    code: "PLATFORM // 02",
    name: "High-Resolution Polarized Digital Dermatoscope",
    wavelength: "Cross-Polarized & Non-Polarized Optical Microscopy",
    indications: ["Follicular Density Mapping", "Early Androgenetic Alopecia", "Atypical Nevi & Lesions", "Erythema & Vascular Mapping"],
    clinicalImpact:
      "Provides up to 40× optical magnification with cross-polarized light, eliminating skin surface reflection to reveal deep dermal melanin patterns, hair miniaturization ratios, and microscopic follicular health.",
    safetyProfile: "Non-invasive • Instant high-resolution optical readout",
    icon: Microscope,
  },
  {
    code: "PLATFORM // 03",
    name: "Closed-System Autologous Centrifuge Platform",
    wavelength: "Precision RCF Speed & Temperature Stabilization",
    indications: ["Growth Factor Concentrate (GFC)", "Autologous Platelet PRP", "Follicular Revascularization", "Facial Collagen Induction"],
    clinicalImpact:
      "A closed-system sterile centrifugation unit that isolates high concentrations of PDGF, VEGF, and TGF-beta growth factors without chemical additives or contamination risk, accelerating follicular stem cell activation.",
    safetyProfile: "100% autologous biocompatible • Zero foreign-body reaction risk",
    icon: Activity,
  },
  {
    code: "PLATFORM // 04",
    name: "Medical Ultrasonic Vortex Hydro-Extractor",
    wavelength: "Negative Pressure Vacuum + Micro-Jet Infusion",
    indications: ["Comedone & Blackhead Extraction", "Corneocyte Decongestion", "Medical Hydra Medi-Facials", "Deep Hyaluronic Acid Delivery"],
    clinicalImpact:
      "Simultaneously executes non-irritating vortex suction to dislodge impacted follicular debris while infusing medical-grade antioxidant and barrier-replenishing serums deep into porous strata.",
    safetyProfile: "Comfortable, non-invasive • Zero downtime post-session",
    icon: Droplets,
  },
  {
    code: "PLATFORM // 05",
    name: "High-Frequency Radiofrequency Electrocautery",
    wavelength: "3.8 MHz Sub-Tissue Monopolar / Bipolar Micro-Current",
    indications: ["Skin Tags (Acrochordons)", "Dermatosis Papulosa Nigra (DPN)", "Benign Warts & Verrucae", "Milia Clearance"],
    clinicalImpact:
      "High-frequency radiofrequency current vaporizes unwanted superficial benign skin growths with microscopic margin precision, providing instantaneous coagulation with minimal scar formation.",
    safetyProfile: "Local anesthetic application • Rapid re-epithelialization in 4–6 days",
    icon: Flame,
  },
];

export default function ClinicalInfrastructureSection() {
  return (
    <section className="py-20 md:py-28 bg-white relative font-source border-t border-stone-200/70">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 bg-[#FAF0DD] text-[#108283] text-xs font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider border border-[#E8DCBE]/70">
            <span className="w-1.5 h-1.5 rounded-full bg-[#108283]" />
            Clinical Infrastructure
          </div>

          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl text-stone-950 font-normal leading-tight mb-4">
            Hospital-Grade Aesthetic &amp;{" "}
            <span className="text-[#108283] font-semibold italic">
              Diagnostic Hardware
            </span>
          </h2>

          <p className="text-stone-600 text-base md:text-lg font-normal leading-relaxed">
            Unlike commercial salons using uncalibrated parlor machines, every procedure at Shingare Clinic is powered by calibrated, physician-grade medical instrumentation.
          </p>
        </div>

        {/* Platforms List / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map((plat) => {
            const Icon = plat.icon;
            return (
              <div
                key={plat.code}
                className="group relative bg-[#F7F6F4] border border-stone-200/90 rounded-2xl p-6 sm:p-7 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:border-[#108283]/60 hover:bg-white hover:shadow-[0_8px_24px_rgba(16,130,131,0.06)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-200/60">
                    <span className="font-mono text-[11px] font-bold text-stone-500 tracking-wider">
                      {plat.code}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-stone-100 text-[#108283] flex items-center justify-center transition-colors duration-200 border border-stone-200/60">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-playfair text-lg sm:text-xl font-bold text-stone-950 mb-1 leading-snug group-hover:text-[#108283] transition-colors">
                    {plat.name}
                  </h3>

                  <div className="font-mono text-[11px] text-[#108283] font-medium mb-3">
                    {plat.wavelength}
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed mb-4">
                    {plat.clinicalImpact}
                  </p>

                  {/* Indications Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {plat.indications.map((ind, i) => (
                      <span
                        key={i}
                        className="text-[10.5px] font-medium text-stone-700 bg-white/90 px-2.5 py-0.5 rounded-md border border-stone-200/70"
                      >
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Safety Profile */}
                <div className="pt-3 border-t border-stone-200/60 flex items-center gap-2 text-[11px] text-stone-600">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#108283] shrink-0" />
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
