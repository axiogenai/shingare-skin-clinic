"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarCheck,
  ArrowRight,
  ScanFace,
  Syringe,
  Microscope,
  Stethoscope,
  MapPin,
} from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative w-full flex-1 min-h-0 flex items-center overflow-hidden font-source select-none">
      {/* Unified Centered Stage — Compact, balanced proximity between Shingare column and the portrait */}
      <div className="relative w-full max-w-[1120px] xl:max-w-[1180px] mx-auto px-4 sm:px-8 lg:px-8 pt-16 sm:pt-16 lg:pt-16 pb-2 sm:pb-4 flex items-start sm:items-center h-full">
        
        {/* 1. Left Column — Old Compact Size & Slim Refined Typography */}
        <div className="relative z-20 w-full max-w-[68%] xs:max-w-[65%] sm:max-w-[52%] md:max-w-[440px] lg:max-w-[470px] xl:max-w-[490px] mt-1 sm:mt-0 lg:pl-10 xl:pl-14">
          
          {/* Brand Lockup: शिनगारे + SKIN & COSMETICS (Old Compact Size) */}
          <div className="pt-1 mb-2 sm:mb-3.5">
            <div className="relative inline-block pb-2 sm:pb-2.5">
              <span
                style={{
                  fontFamily: "'Amita', 'Karma', serif",
                  fontWeight: 700,
                  color: "#93231f",
                  lineHeight: 1.06,
                  letterSpacing: "0.02em",
                }}
                className="text-4xl xs:text-5xl sm:text-6xl md:text-[66px] lg:text-[76px] xl:text-[82px] block drop-shadow-xs"
              >
                शिनगारे
              </span>
              <span
                style={{
                  fontFamily: "'Mukta', 'Poppins', sans-serif",
                  fontWeight: 600,
                  color: "#6b6159",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                  position: "absolute",
                  bottom: "0px",
                  left: "40%",
                }}
                className="text-[8.5px] xs:text-[9.5px] sm:text-[11px] md:text-[12px] lg:text-[13px]"
              >
                SKIN &amp; COSMETICS
              </span>
            </div>
          </div>

          {/* Tier 1: Slim, Compact Playfair Heading (Not oversized or heavy) */}
          <h1 className="font-playfair text-[20px] xs:text-[22px] sm:text-[30px] lg:text-[36px] xl:text-[39px] font-normal text-[#0f172a] leading-[1.14] tracking-tight mb-1.5 sm:mb-2.5">
            Advanced{" "}
            <span className="font-normal italic text-[#0e787a]">
              Dermatology
            </span>
            ,
            <span className="block font-normal italic text-[#0e787a]">
              Skin &amp; Hair Care
            </span>
          </h1>

          {/* Tier 2: Slim Italic Playfair Sub-Headline */}
          <p className="font-playfair italic font-normal text-[12px] xs:text-[13px] sm:text-[15.5px] lg:text-[17px] text-[#334155] leading-[1.35] max-w-[235px] xs:max-w-[255px] sm:max-w-[420px] mb-2 sm:mb-2.5">
            Advanced Dermatology &amp; Clinical Cosmetology in Kolhapur.
          </p>

          {/* Location Chip */}
          <div className="flex items-center gap-1.5 mb-2.5 sm:mb-3">
            <MapPin className="w-3 h-3 text-[#93231f] shrink-0" />
            <span className="font-mono text-[9px] xs:text-[9.5px] sm:text-[10.5px] text-[#4A4238] tracking-wide">
              Peth Vadgaon, Kolhapur
            </span>
          </div>

          {/* Tier 3: Slim 3-Line Slate Paragraph */}
          <p className="text-[10.5px] xs:text-[11.5px] sm:text-[13px] lg:text-[13.5px] text-[#475569] leading-[1.55] sm:leading-[1.6] font-normal max-w-[235px] xs:max-w-[255px] sm:max-w-[430px] mb-3.5 sm:mb-5">
            12+ years of trusted clinical dermatology — root-cause skin healing,
            advanced laser treatments, and proven hair restoration for a more
            confident you.
          </p>

          {/* 4 Slim, Compact Medical & Clinical Icons */}
          <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-[255px] xs:max-w-[275px] sm:max-w-[380px] -ml-2 sm:-ml-2.5 mb-4 sm:mb-5">
            {/* 1. Skin Analysis */}
            <div className="flex flex-col items-center text-center">
              <ScanFace className="w-5 h-5 sm:w-6 sm:h-6 text-[#0e787a] stroke-[1.5] mb-1" />
              <span className="text-[8.5px] xs:text-[9px] sm:text-[10.5px] font-normal text-[#1e293b] leading-[1.2] tracking-wide">
                Clinical
                <br />
                Skin Care
              </span>
            </div>

            {/* 2. Hair PRP & GFC */}
            <div className="flex flex-col items-center text-center">
              <Syringe className="w-5 h-5 sm:w-6 sm:h-6 text-[#93231f] stroke-[1.5] mb-1" />
              <span className="text-[8.5px] xs:text-[9px] sm:text-[10.5px] font-normal text-[#1e293b] leading-[1.2] tracking-wide">
                Hair PRP
                <br />
                &amp; GFC
              </span>
            </div>

            {/* 3. Diagnostics & Laser */}
            <div className="flex flex-col items-center text-center">
              <Microscope className="w-5 h-5 sm:w-6 sm:h-6 text-[#0e787a] stroke-[1.5] mb-1" />
              <span className="text-[8.5px] xs:text-[9px] sm:text-[10.5px] font-normal text-[#1e293b] leading-[1.2] tracking-wide">
                Dermoscopy
                <br />
                &amp; Laser
              </span>
            </div>

            {/* 4. Specialist Consultation */}
            <div className="flex flex-col items-center text-center">
              <Stethoscope className="w-5 h-5 sm:w-6 sm:h-6 text-[#93231f] stroke-[1.5] mb-1" />
              <span className="text-[8.5px] xs:text-[9px] sm:text-[10.5px] font-normal text-[#1e293b] leading-[1.2] tracking-wide">
                Doctor
                <br />
                Consultation
              </span>
            </div>
          </div>

          {/* Old Compact Size Action Buttons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
            <Link
              href="/book-now"
              className="inline-flex items-center justify-center gap-1.5 bg-stone-950 hover:bg-[#93231f] text-stone-50 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-[9.5px] xs:text-[10.5px] sm:text-[11px] font-semibold uppercase tracking-wider transition-all duration-200 shadow-md active:scale-95 text-center whitespace-nowrap"
            >
              <CalendarCheck className="w-3.5 h-3.5 text-[#FAEDDA] shrink-0" />
              <span>Book Consultation</span>
            </Link>

            <Link
              href="#services"
              className="inline-flex items-center justify-center gap-1.5 bg-white/95 hover:bg-white text-stone-900 border border-stone-200/90 hover:border-stone-400 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-[9.5px] xs:text-[10.5px] sm:text-[11px] font-semibold uppercase tracking-wider transition-all backdrop-blur-md shadow-2xs text-center whitespace-nowrap"
            >
              <span>Explore Treatments</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#0e787a] shrink-0" />
            </Link>
          </div>
        </div>

        {/* 2. Model Cutout — Tightly paired with the Shingare column */}
        <div className="absolute right-[-8px] xs:right-0 sm:right-2 md:right-4 lg:right-6 xl:right-8 bottom-0 w-[225px] xs:w-[255px] sm:w-[325px] md:w-[395px] lg:w-[505px] xl:w-[550px] aspect-[1142/1377] max-h-[88%] sm:max-h-[92%] lg:max-h-[96%] pointer-events-none select-none z-10 opacity-100 transition-opacity duration-300">
          <Image
            src="/girl-latest.png"
            alt="Shingare Skin & Cosmetics Clinic"
            fill
            priority
            className="object-contain object-bottom-right drop-shadow-[0_10px_30px_rgba(0,0,0,0.14)]"
          />
        </div>
      </div>
    </section>
  );
}
