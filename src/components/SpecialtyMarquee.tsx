"use client";

import Link from "next/link";

const specialties = [
  { label: "Clinical dermatology", href: "/skin" },
  { label: "Hair & scalp care", href: "/hair" },
  { label: "Laser & scar care", href: "/cosmetics" },
  { label: "Medi-facials & peels", href: "/cosmetics" },
];

export default function SpecialtyMarquee() {
  return (
    <nav aria-label="Clinic specialties" className="border-y border-[#e0e7e3] bg-white">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-center gap-x-7 gap-y-1 px-5 py-4 sm:gap-x-10 sm:px-8">
        {specialties.map((item) => (
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
  );
}
