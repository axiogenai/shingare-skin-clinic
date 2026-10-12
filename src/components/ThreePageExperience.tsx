"use client";

import React from "react";
import Image from "next/image";
import HeroSection from "@/components/HeroSection";
import SpecialtyMarquee from "@/components/SpecialtyMarquee";
import ConfidenceSection from "@/components/ConfidenceSection";
import SpecialtyCardsSection from "@/components/SpecialtyCardsSection";

export default function ThreePageExperience() {
  return (
    <div className="relative w-full">
      {/* 1. Natural, stable background canvas spanning all 3 sections */}
      <div className="absolute inset-0 w-full h-full pointer-events-none -z-10 select-none">
        <Image
          src="/hero-3pages-bg-2k.png"
          alt="Shingare Skin and Cosmetics Clinic Interior"
          fill
          priority
          className="object-cover object-top"
        />
        {/* Soft subtle ambient tone */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/5 pointer-events-none" />
      </div>

      {/* 2. Content Sections */}
      <div className="relative z-10">
        {/* Screen 1: Hero Section + Specialty Marquee (Automatic 100dvh viewport fit) */}
        <div className="relative w-full h-[100dvh] min-h-[440px] flex flex-col justify-between overflow-hidden">
          <HeroSection />
          <SpecialtyMarquee />
        </div>

        {/* Screen 2: Experience & Clinical Confidence */}
        <ConfidenceSection />

        {/* Screen 3: Specialized Care / Clinical Excellence */}
        <SpecialtyCardsSection />
      </div>
    </div>
  );
}
