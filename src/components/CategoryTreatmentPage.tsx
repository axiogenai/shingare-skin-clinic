"use client";

import React from "react";
import Link from "next/link";
import { Clock, Check } from "lucide-react";
import { HeroBanner, CTABanner } from "@/components/SharedSections";
import { TreatmentItem } from "@/data/treatments";

interface CategoryTreatmentPageProps {
  badge?: string;
  title: string;
  subtitle: string;
  services: TreatmentItem[];
  highlights?: string[];
}

export default function CategoryTreatmentPage({
  badge = "SHINGARE SKIN & COSMETICS CLINIC",
  title,
  subtitle,
  services,
  highlights,
}: CategoryTreatmentPageProps) {
  const marqueeItems = highlights || services.map((s) => s.title);

  return (
    <main className="min-h-screen bg-[#FDFBF7] font-source">
      {/* 1. Hero Banner */}
      <HeroBanner badge={badge} title={title} subtitle={subtitle} />

      {/* 2. Treatment Anchor Marquee Bar - Positioned with safe top padding to sit gracefully below the curve */}
      <div className="w-full bg-[#FAF0DD]/60 border-b border-[#D4AF37]/25 overflow-hidden pt-8 pb-3 sm:pt-9 sm:pb-3.5 select-none relative z-0">
        <style>{`
          @keyframes treatmentMarqueeScroll {
            0% {
              transform: translate3d(0, 0, 0);
              -webkit-transform: translate3d(0, 0, 0);
            }
            100% {
              transform: translate3d(-50%, 0, 0);
              -webkit-transform: translate3d(-50%, 0, 0);
            }
          }
          .treatment-marquee-track {
            display: flex !important;
            width: max-content !important;
            animation: treatmentMarqueeScroll 28s linear infinite !important;
            -webkit-animation: treatmentMarqueeScroll 28s linear infinite !important;
            animation-play-state: running !important;
            will-change: transform;
          }
        `}</style>
        <div className="flex w-max treatment-marquee-track items-center hover:[animation-play-state:paused]">
          {[...Array(2)].map((_, loopIdx) => (
            <div key={loopIdx} className="flex items-center shrink-0">
              {services.map((service) => (
                <div key={`${loopIdx}-${service.id}`} className="flex items-center shrink-0">
                  <a
                    href={`#${service.id}`}
                    className="text-xs sm:text-sm text-[#2C3E50] hover:text-[#873f3b] font-medium transition-colors px-3.5 py-1 hover:underline underline-offset-4 whitespace-nowrap"
                  >
                    {service.title}
                  </a>
                  <span className="text-[#873f3b]/35 font-bold px-2.5 select-none">•</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* 3. Treatment Cards Section */}
      <section className="pt-8 sm:pt-12 md:pt-16 pb-16 md:pb-24 px-5 md:px-10 max-w-[1240px] mx-auto space-y-12 sm:space-y-16 md:space-y-24">
        {services.map((service, index) => (
          <TreatmentCardItem
            key={service.id}
            service={service}
            isEven={index % 2 === 0}
          />
        ))}
      </section>

      {/* 4. CTA Banner */}
      <CTABanner />
    </main>
  );
}

function TreatmentCardItem({
  service,
  isEven,
}: {
  service: TreatmentItem;
  isEven: boolean;
}) {
  return (
    <div
      id={service.id}
      className={`flex flex-col ${
        isEven ? "lg:flex-row" : "lg:flex-row-reverse"
      } gap-10 lg:gap-16 items-center scroll-mt-36`}
    >
      {/* Image Column */}
      <div className="w-full lg:w-1/2">
        <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-black/5 aspect-[4/3] group bg-white">
          <img
            src={service.image}
            alt={service.title}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02] ${
              service.imagePosition || "object-center"
            }`}
            loading="lazy"
          />
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1 rounded-full text-[11px] font-bold text-[#873f3b] uppercase tracking-wider shadow-sm border border-black/5">
            {service.categoryLabel}
          </div>
        </div>
      </div>

      {/* Content Column */}
      <div className="w-full lg:w-1/2 space-y-5">
        <h2 className="text-2xl sm:text-3xl lg:text-[32px] xl:text-[36px] font-playfair text-[#2C3E50] leading-tight tracking-tight font-normal">
          {service.title}
        </h2>

        {/* Indications Callout Box */}
        <div className="bg-[#FAF0DD]/60 p-5 rounded-2xl border border-[#D4AF37]/25 shadow-2xs">
          <h4 className="text-xs sm:text-sm font-bold text-[#b45309] uppercase tracking-wider mb-1.5">
            Indications:
          </h4>
          <p className="text-gray-800 text-sm leading-relaxed font-medium">
            {service.indications}
          </p>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-base sm:text-lg leading-relaxed font-normal">
          {service.description}
        </p>

        {/* Highlights with Checkmarks */}
        <div className="space-y-2.5 pt-2">
          {service.highlights.map((highlight, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#873f3b]/10 flex items-center justify-center">
                <Check className="w-3.5 h-3.5 text-[#873f3b] stroke-[2.5]" />
              </div>
              <span className="text-gray-700 text-sm sm:text-base font-medium">
                {highlight}
              </span>
            </div>
          ))}
        </div>

        {/* Meta info & Book Consultation Pill Button */}
        <div className="pt-4 flex flex-wrap items-center gap-5">
          <Link
            href={`/book-now?concern=${encodeURIComponent(service.title)}`}
            className="inline-flex items-center justify-center px-8 py-3.5 bg-[#873f3b] text-white rounded-full font-semibold hover:bg-[#723430] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200 text-sm cursor-pointer active:scale-95"
          >
            Book Consultation
          </Link>

          <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#873f3b]" />
              <span>{service.downtime}</span>
            </span>
            <span className="text-gray-300">•</span>
            <span>{service.sessions}</span>
          </div>
        </div>
      </div>
    </div>
  );
}


