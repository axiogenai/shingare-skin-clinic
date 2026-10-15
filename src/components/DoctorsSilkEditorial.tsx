"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarCheck, ShieldCheck } from "lucide-react";

interface DoctorProfile {
  id: string;
  eyebrow: string;
  name: string;
  qualifications: string;
  regNo: string;
  experience: string;
  bgImage: string;
  align: "left" | "right";
  leadText: string;
  bodyText: string;
  consultCta: string;
  phone: string;
}

const doctors: DoctorProfile[] = [
  {
    id: "dr-pramod",
    eyebrow: "Senior Clinical Dermatologist & Trichologist",
    name: "Dr. Pramod Suresh Shingare",
    qualifications: "MD (Ayu) · D.Dermatology (Ay.) MUHS",
    regNo: "MMC Reg. No. I-87218-A",
    experience: "12+ Years Clinical Practice",
    bgImage: "/docbg.png",
    align: "right",
    leadText:
      "Specializing in clinical dermatology, medical trichology, and advanced aesthetic lasers in Kolhapur.",
    bodyText:
      "Dedicated to honest medical counsel and root-cause skin diagnosis. Every patient receives attentive one-on-one consultation with clinical precision and zero commercial upselling.",
    consultCta: "Book Consultation with Dr. Pramod",
    phone: "+91 72497 27104",
  },
  {
    id: "dr-priyanka",
    eyebrow: "Cosmetologist & Aesthetic Physician",
    name: "Dr. Priyanka Pramod Shingare",
    qualifications: "BHMS · FCHD · CCHC · CCMP (MUHS)",
    regNo: "Council Reg. No. 73338",
    experience: "Clinical Cosmetology Specialist",
    bgImage: "/docbg1.png",
    align: "left",
    leadText:
      "Specializing in medical medi-facials, gentle clinical peels, and advanced skin barrier restoration.",
    bodyText:
      "Focused on gentle, science-backed skin treatments tailored specifically for sensitive skin types, delivering natural rejuvenation and enduring skin health.",
    consultCta: "Book Consultation with Dr. Priyanka",
    phone: "+91 72497 27104",
  },
];

export default function DoctorsSilkEditorial() {
  return (
    <div className="w-full">
      {doctors.map((doc, index) => (
        <React.Fragment key={doc.id}>
          {/* Section Divider Badge */}
          {index > 0 && (
            <div className="relative w-full z-30 h-0 flex items-center justify-center pointer-events-none select-none">
              <div className="absolute -translate-y-1/2 w-full max-w-[1360px] px-2 sm:px-6 lg:px-16 flex items-center justify-center gap-1.5 sm:gap-4 md:gap-6 pointer-events-auto overflow-hidden">
                <div className="flex-1 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-[#873f3b]/70 min-w-2 sm:min-w-6" />
                <div className="flex items-center gap-1.5 sm:gap-2.5 md:gap-3 px-3 sm:px-5 md:px-6 py-1.5 sm:py-2 md:py-2.5 rounded-full bg-white/95 backdrop-blur-md border border-[#E8DCBE] shadow-[0_4px_16px_rgba(212,175,55,0.12)] shrink-0 max-w-[calc(100vw-20px)] sm:max-w-none">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rotate-45 bg-[#873f3b] shrink-0" />
                  <span className="font-['Playfair_Display',Georgia,serif] text-[10px] min-[390px]:text-[11px] sm:text-xs md:text-sm tracking-tight min-[390px]:tracking-normal sm:tracking-wider text-[#1a241d] font-semibold whitespace-nowrap">
                    Clinical Dermatology &amp; Aesthetic Cosmetology
                  </span>
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rotate-45 bg-[#873f3b] shrink-0" />
                </div>
                <div className="flex-1 h-[1.5px] bg-gradient-to-l from-transparent via-[#D4AF37]/50 to-[#873f3b]/70 min-w-2 sm:min-w-6" />
              </div>
            </div>
          )}

          {/* Full-width Silk Section */}
          <section className="relative w-full min-h-[620px] lg:min-h-[700px] flex items-center overflow-hidden py-16 sm:py-20 lg:py-28">
            {/* Background Silk Image with responsive focal point */}
            <Image
              src={doc.bgImage}
              alt={`${doc.name} Silk Background`}
              fill
              priority={index === 0}
              className={`object-cover pointer-events-none select-none ${
                doc.align === "right"
                  ? "object-[30%_center] lg:object-center"
                  : "object-[70%_center] lg:object-center"
              }`}
            />

            {/* Seamless Top/Bottom Section Blends */}
            {index === 0 && (
              <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-b from-transparent via-[#FAF0E8]/50 to-[#FAF0E8] pointer-events-none z-[5]" />
            )}
            {index > 0 && (
              <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#FAF0E8] via-[#FAF0E8]/50 to-transparent pointer-events-none z-[5]" />
            )}

            {/* Ambient Silk Vignette (Seamlessly enhances readability without any card borders) */}
            <div
              className={`absolute inset-0 pointer-events-none ${
                doc.align === "right"
                  ? "bg-gradient-to-t from-[#FAF8F5]/95 via-[#FAF8F5]/80 to-[#FAF8F5]/30 lg:bg-gradient-to-l lg:from-[#FAF8F5]/95 lg:via-[#FAF8F5]/75 lg:to-transparent"
                  : "bg-gradient-to-t from-[#FAF8F5]/95 via-[#FAF8F5]/80 to-[#FAF8F5]/30 lg:bg-gradient-to-r lg:from-[#FAF8F5]/95 lg:via-[#FAF8F5]/75 lg:to-transparent"
              }`}
            />

            {/* Editorial Content Container */}
            <div
              className={`relative z-10 w-full max-w-[1480px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 flex ${
                doc.align === "right"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`w-full max-w-xl lg:max-w-[720px] xl:max-w-[760px] text-left ${
                  doc.align === "right" ? "ml-auto" : "mr-auto"
                }`}
              >
                {/* 1. Refined Eyebrow */}
                <div className="flex items-center gap-2 mb-2 sm:mb-2.5">
                  <span className="w-2 h-2 rotate-45 bg-[#873f3b] shrink-0" />
                  <span className="font-['Playfair_Display',Georgia,serif] italic text-base sm:text-lg lg:text-xl font-medium tracking-wide text-[#873f3b]">
                    {doc.eyebrow}
                  </span>
                </div>

                {/* 2. Doctor Name Headline in distinct, readable Playfair Display */}
                <h2 className="font-['Playfair_Display',Georgia,serif] text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-bold text-[#1a241d] tracking-tight leading-[1.14] mb-3 sm:mb-4">
                  {doc.name}
                </h2>

                {/* 3. Credentials & Registration Divider - Strictly on ONE SINGLE LINE */}
                <div className="flex flex-nowrap items-center gap-x-2.5 sm:gap-x-3.5 mb-5 sm:mb-6 pb-4 border-b border-[#292d27]/15 text-[11px] sm:text-xs md:text-[13px] text-[#4a5043] whitespace-nowrap overflow-x-auto no-scrollbar">
                  <span className="font-medium text-[#1a241d] shrink-0">
                    {doc.qualifications}
                  </span>
                  <span className="h-3 w-px bg-[#292d27]/25 shrink-0 block" />
                  <span className="font-semibold text-[#873f3b] shrink-0">
                    {doc.experience}
                  </span>
                  <span className="h-3 w-px bg-[#292d27]/25 shrink-0 block" />
                  <span className="inline-flex items-center gap-1.5 font-mono text-[10.5px] sm:text-[11.5px] md:text-xs text-[#555d4d] shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#873f3b] shrink-0" />
                    {doc.regNo}
                  </span>
                </div>

                {/* 4. Professional, Concise Patient Copy - Lead text on ONE SINGLE LINE */}
                <div className="space-y-3 sm:space-y-3.5 text-sm sm:text-base md:text-[16px] leading-relaxed text-[#3a4034] mb-7 sm:mb-8">
                  <p className="font-medium text-[#1a241d] whitespace-nowrap text-[12px] min-[400px]:text-[13px] sm:text-[14px] md:text-[14.5px] lg:text-[15px] xl:text-[15.5px]">
                    {doc.leadText}
                  </p>
                  <p className="text-[#4a5043]">
                    {doc.bodyText}
                  </p>
                </div>

                {/* 5. Direct Action Button */}
                <div className="flex items-center">
                  <Link
                    href={`/book-now?doctor=${encodeURIComponent(doc.name)}`}
                    className="inline-flex items-center justify-center gap-2.5 bg-[#1a241d] text-white px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-md"
                  >
                    <CalendarCheck className="w-4 h-4 text-[#D4AF37]" />
                    <span>{doc.consultCta}</span>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </React.Fragment>
      ))}
    </div>
  );
}
