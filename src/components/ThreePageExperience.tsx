"use client";

import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import SpecialtyCardsSection from "@/components/SpecialtyCardsSection";

const quickLinks = [
  { label: "Skin treatments", href: "/skin" },
  { label: "Hair & scalp", href: "/hair" },
  { label: "Lasers & scars", href: "/cosmetics" },
  { label: "Medi-facials & peels", href: "/cosmetics" },
];

export default function ThreePageExperience() {
  return (
    <div className="homepage-intro w-full">
      <HeroSection />
      <nav aria-label="Explore clinic services" className="border-y border-[#e0e7e3] bg-white">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-center gap-x-7 gap-y-1 px-5 py-4 sm:gap-x-10 sm:px-8">
          {quickLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="min-h-9 inline-flex items-center text-xs font-medium text-[#53615d] transition-colors hover:text-[#176e6d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#176e6d] sm:text-sm"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
      <SpecialtyCardsSection />
    </div>
  );
}
