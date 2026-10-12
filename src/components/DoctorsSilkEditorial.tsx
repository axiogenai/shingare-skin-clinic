"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarCheck,
  Phone,
  ShieldCheck,
} from "lucide-react";

interface DoctorProfile {
  id: string;
  eyebrow: string;
  eyebrowColor: string;
  name: string;
  qualifications: string;
  regNo: string;
  bgImage: string;
  align: "left" | "right";
  leadBold: string;
  leadText: string;
  bodyText: string;
  affiliationsText: string;
  badges: string[];
  consultCta: string;
}

const doctors: DoctorProfile[] = [
  {
    id: "dr-pramod",
    eyebrow: "Lead Clinical Dermatologist & Laser Specialist",
    eyebrowColor: "#881337", // Warm luxury burgundy
    name: "Dr. Pramod Suresh Shingare",
    qualifications: "MD (Ayu) - D.Dermatology (Ay.) MUHS",
    regNo: "MMC Reg. No. I-87218-A",
    bgImage: "/docbg.png", // Cream / Ivory silk drapery (ripples on the left, smooth on the right)
    align: "right", // Text positioned on the RIGHT
    leadBold:
      "Dr. Pramod Suresh Shingare is a Consultant Dermatologist and Trichologist with over 12 years of clinical excellence in medical dermatology, hair restoration, and precision dermatosurgery.",
    leadText:
      "Having completed advanced postgraduate clinical residency under Maharashtra University of Health Sciences (MUHS), he specializes in managing recalcitrant skin disorders, chronic psoriasis, vitiligo, severe cystic acne, and androgenetic alopecia.",
    bodyText:
      "He personally directs all clinical dermoscopy assessments, autologous platelet-derived growth factor treatments (PRP/GFC), and laser resurfacing procedures with an uncompromising emphasis on evidence-based pharmacology, transparent counseling, and patient safety.",
    affiliationsText:
      "Maharashtra Medical Council Verified (Reg. No. I-87218-A). Active participant in regional and national clinical dermatological forums.",
    badges: [
      "MMC Reg. I-87218-A",
      "MD Dermatology (Ay.) MUHS",
      "Clinical Trichology & PRP",
      "Evidence-Based Care",
      "Precision Lasers",
    ],
    consultCta: "Consult Dr. Pramod Shingare",
  },
  {
    id: "dr-priyanka",
    eyebrow: "Consultant Dermatologist & Clinical Cosmetologist",
    eyebrowColor: "#9f1239", // Deep rose / crimson
    name: "Dr. Priyanka Pramod Shingare",
    qualifications: "BHMS, FCHD, CCHC, CCMP (MUHS)",
    regNo: "Council Reg. No. 73338",
    bgImage: "/docbg1.png", // Blush rose-gold silk drapery (smooth on the left, ripples on the right)
    align: "left", // Text kept on the LEFT as requested
    leadBold:
      "Dr. Priyanka Pramod Shingare is a Consultant Dermatologist and Aesthetic Cosmetologist specializing in non-invasive skin rejuvenation, medical hydra-facials, and clinical chemical resurfacing.",
    leadText:
      "Celebrated for her meticulous, patient-centric approach and thorough skin barrier diagnostics, she heads the advanced clinical cosmetology and medical facial therapy wing.",
    bodyText:
      "Her clinical practice encompasses medical-grade hydra dermabrasion, post-inflammatory hyperpigmentation protocols, active acne scar remodeling, and customized therapeutic peels. She champions gentle, barrier-restorative aesthetic science that delivers radiant, sustainable results without compromising skin health.",
    affiliationsText:
      "Medical Council Verified (Reg. No. 73338, MUHS). Certified in Clinical Cosmetology, Advanced Chemical Peeling, and Holistic Skin Wellness.",
    badges: [
      "Council Reg. No. 73338",
      "BHMS, FCHD, CCHC, CCMP (MUHS)",
      "Medical Cosmetology Specialist",
      "Advanced Medi-Facials & Peels",
      "Skin Barrier Restoration",
    ],
    consultCta: "Consult Dr. Priyanka Shingare",
  },
];

export default function DoctorsSilkEditorial() {
  return (
    <div className="w-full font-source">
      {doctors.map((doc, index) => (
        <React.Fragment key={doc.id}>
          {/* Luxury Editorial Label with Hairline Accents positioned directly on the seamless boundary */}
          {index > 0 && (
            <div className="relative w-full z-30 h-0 flex items-center justify-center pointer-events-none select-none">
              <div className="absolute -translate-y-1/2 w-full max-w-[1360px] px-4 sm:px-8 lg:px-16 flex items-center justify-center gap-3 sm:gap-6 pointer-events-auto">
                {/* Left Hairline Gradient: Transparent -> Gold -> Burgundy */}
                <div className="flex-1 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-[#881337]/70" />

                {/* Center Luxury Pill */}
                <div className="flex items-center gap-2.5 sm:gap-3 px-5 sm:px-6 py-2 sm:py-2.5 rounded-full bg-white/95 backdrop-blur-md border border-[#E8DCBE] shadow-[0_4px_16px_rgba(212,175,55,0.12)] shrink-0">
                  <span className="w-2 h-2 rotate-45 bg-[#881337] shrink-0" />
                  <span className="font-playfair text-[11px] sm:text-xs md:text-sm font-bold tracking-widest text-gray-900 uppercase whitespace-nowrap">
                    Clinical Dermatology &amp; Aesthetic Cosmetology
                  </span>
                  <span className="w-2 h-2 rotate-45 bg-[#9f1239] shrink-0" />
                </div>

                {/* Right Hairline Gradient: Burgundy -> Gold -> Transparent */}
                <div className="flex-1 h-[1.5px] bg-gradient-to-l from-transparent via-[#D4AF37]/50 to-[#9f1239]/70" />
              </div>
            </div>
          )}

          {/* Full-width Silk Section (Edge-to-edge as on screen) */}
          <section className="relative w-full min-h-[620px] lg:min-h-[720px] flex items-center overflow-hidden">
            {/* 1. Full-screen Edge-to-Edge Silk Background */}
            <Image
              src={doc.bgImage}
              alt={`${doc.name} Silk Background`}
              fill
              priority={index === 0}
              className="object-cover object-center pointer-events-none select-none"
            />

            {/* 2. Seamless Inter-Section Silk Feather Blends (matches both PNGs at the division) */}
            {index === 0 && (
              <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-b from-transparent via-[#FAF0E8]/50 to-[#FAF0E8] pointer-events-none z-[5]" />
            )}
            {index > 0 && (
              <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#FAF0E8] via-[#FAF0E8]/50 to-transparent pointer-events-none z-[5]" />
            )}

            {/* 3. Soft directional gradient scrim for crisp text legibility */}
            <div
              className={`absolute inset-0 pointer-events-none ${
                doc.align === "right"
                  ? "bg-gradient-to-l from-white/85 via-white/50 sm:via-white/40 to-transparent"
                  : "bg-gradient-to-r from-white/85 via-white/50 sm:via-white/40 to-transparent"
              }`}
            />

            {/* 3. Editorial Typography Content Placed Directly on the Silk */}
            <div
              className={`relative z-10 w-full max-w-[1360px] mx-auto px-6 sm:px-12 lg:px-20 py-24 sm:py-28 lg:py-36 flex ${
                doc.align === "right" ? "justify-end" : "justify-start"
              }`}
            >
              <div className="w-full max-w-2xl lg:max-w-[660px]">
                {/* Eyebrow in warm burgundy / rose serif */}
                <p
                  className="font-playfair text-xl sm:text-2xl lg:text-[26px] font-medium tracking-wide italic mb-2.5 sm:mb-3"
                  style={{ color: doc.eyebrowColor }}
                >
                  {doc.eyebrow}
                </p>

                {/* Physician Name in bold dark serif */}
                <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-bold text-gray-950 tracking-tight leading-[1.14] mb-4">
                  {doc.name}
                </h2>

                {/* ── Credential Strip ── compact, architectural, trust-critical */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mb-5 pb-5 border-b border-black/8">
                  <span className="font-mono text-[11px] sm:text-xs text-gray-700 tracking-wide">
                    {doc.qualifications}
                  </span>
                  <span className="h-3 w-px bg-gray-300 hidden sm:block" />
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#108283] shrink-0" />
                    <span className="font-mono text-[11px] sm:text-xs text-[#108283] font-medium tracking-wide">
                      {doc.regNo}
                    </span>
                  </div>
                </div>


                <div className="space-y-4 text-gray-900 text-sm sm:text-base md:text-[17px] leading-relaxed">
                  <p>
                    <strong className="font-bold text-gray-950">
                      {doc.leadBold}
                    </strong>{" "}
                    {doc.leadText}
                  </p>
                  <p className="text-gray-800 leading-relaxed font-normal">
                    {doc.bodyText}
                  </p>
                  <p className="text-gray-700 text-xs sm:text-sm leading-relaxed pt-1">
                    {doc.affiliationsText}
                  </p>
                </div>


                {/* Call-to-Action Buttons */}
                <div className="pt-8 flex flex-wrap items-center gap-3.5">
                  <Link
                    href="/book-now"
                    className="inline-flex items-center justify-center gap-2.5 bg-gray-950 hover:bg-gray-800 text-white px-7 py-3.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all shadow-md active:scale-95"
                  >
                    <CalendarCheck className="w-4 h-4 text-[#FAEDDA]" />
                    <span>{doc.consultCta}</span>
                  </Link>
                  <a
                    href="tel:+917249727104"
                    className="inline-flex items-center justify-center gap-2 bg-white/95 hover:bg-white text-gray-900 border border-gray-200 hover:border-gray-400 px-6 py-3.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all backdrop-blur-md shadow-2xs"
                  >
                    <Phone className="w-4 h-4 text-[#108283]" />
                    <span>+91 72497 27104</span>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </React.Fragment>
      ))}
    </div>
  );
}
