"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { Clock, Check } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
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

      {/* 2. Slow Marquee Anchor Bar (Zero scrollbars, smooth continuous motion, pause on hover) */}
      <div className="w-full bg-[#FAF0DD]/40 border-b border-gray-200/60 overflow-hidden py-3 select-none">
        <div className="flex w-max animate-marquee-slow items-center hover:[animation-play-state:paused]">
          {[...Array(3)].map((_, loopIdx) => (
            <div key={loopIdx} className="flex items-center">
              {services.map((service) => (
                <div key={`${loopIdx}-${service.id}`} className="flex items-center">
                  <a
                    href={`#${service.id}`}
                    className="text-xs sm:text-sm text-gray-700 hover:text-[#108283] font-medium transition-colors px-3 py-1 hover:underline underline-offset-4 whitespace-nowrap"
                  >
                    {service.title}
                  </a>
                  <span className="text-[#108283]/40 font-bold px-2 select-none">•</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* 3. Primederm Treatment Cards Section with Parallax Scroll & Clip Reveal */}
      <section className="py-16 md:py-24 px-5 md:px-10 max-w-[1240px] mx-auto space-y-20 md:space-y-28">
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
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center start"],
  });

  const opacityContent = useTransform(scrollYProgress, [0, 0.7], [0, 1]);
  const clipProgress = useTransform(
    scrollYProgress,
    [0, 0.7],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]
  );
  const translateContent = useTransform(scrollYProgress, [0, 1], [-50, 0]);

  return (
    <div
      ref={cardRef}
      id={service.id}
      className={`flex flex-col ${
        isEven ? "lg:flex-row" : "lg:flex-row-reverse"
      } gap-10 lg:gap-16 items-center scroll-mt-36`}
    >
      {/* Image Column with Parallax Reveal */}
      <motion.div
        style={{
          opacity: opacityContent,
          clipPath: clipProgress,
        }}
        className="w-full lg:w-1/2"
      >
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
      </motion.div>

      {/* Content Column with Parallax Translate */}
      <motion.div
        style={{ y: translateContent }}
        className="w-full lg:w-1/2 space-y-5"
      >
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
      </motion.div>
    </div>
  );
}


