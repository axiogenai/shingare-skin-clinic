"use client";

import HeroSection from "@/components/HeroSection";
import SpecialtyMarquee from "@/components/SpecialtyMarquee";
import ConfidenceSection from "@/components/ConfidenceSection";
import SpecialtyCardsSection from "@/components/SpecialtyCardsSection";

export default function ThreePageExperience() {
  return (
    <div className="homepage-intro relative isolate w-full overflow-hidden">
      <HeroSection />
      <div className="homepage-specialty-strip relative z-10 overflow-hidden">
        <SpecialtyMarquee />
      </div>
      <ConfidenceSection />
      <SpecialtyCardsSection />
    </div>
  );
}
