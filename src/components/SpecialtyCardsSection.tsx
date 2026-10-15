"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ArrowUpRight,
  CalendarCheck,
  Clock,
} from "lucide-react";

export interface ClinicCard {
  id: string;
  number: string;
  title: string;
  category: string;
  badge: string;
  description: string;
  tags: string[];
  image: string;
  href: string;
  duration: string;
  bgColor: string;
  accentColor: string;
  mutedColor: string;
}

const CLINIC_CARDS: ClinicCard[] = [
  {
    id: "skin",
    number: "01",
    title: "Clinical Dermatology",
    category: "SKIN HEALTH",
    badge: "Consultation-led",
    description:
      "Doctor-led evaluation and treatment planning for acne, eczema, psoriasis, and persistent skin concerns.",
    tags: ["Acne Clearance", "Eczema", "Psoriasis"],
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200&auto=format&fit=crop",
    href: "/skin",
    duration: "30-45 mins",
    bgColor: "#6d3816", // Warm rich chocolate brown matching Dribbble shot!
    accentColor: "#FEE787", // Warm golden yellow title matching Dribbble shot!
    mutedColor: "#FBD4BA", // Warm peach caramel text
  },
  {
    id: "hair",
    number: "02",
    title: "Hair & Scalp Diagnostics",
    category: "TRICHOLOGY",
    badge: "Trichology Review",
    description:
      "Specialized scalp assessments, hair thinning analysis, and evidence-based PRP / GFC restoration protocols.",
    tags: ["Hair Fall", "Scalp Health", "PRP / GFC"],
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1200&auto=format&fit=crop",
    href: "/hair",
    duration: "40 mins",
    bgColor: "#293A2C", // Deep forest sage olive
    accentColor: "#D4EDDA", // Pale mint accent
    mutedColor: "#C3DAC7", // Muted sage cream
  },
  {
    id: "laser",
    number: "03",
    title: "Laser & Scar Treatments",
    category: "ADVANCED AESTHETICS",
    badge: "US-FDA Approved",
    description:
      "Targeted laser resurfacing for post-acne scarring, hyperpigmentation toning, and textural refinement.",
    tags: ["Acne Scars", "Melasma Toning", "Textural"],
    image:
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1200&auto=format&fit=crop",
    href: "/cosmetics",
    duration: "45-60 mins",
    bgColor: "#5C3822", // Warm espresso bronze
    accentColor: "#FAD1A8", // Warm apricot accent
    mutedColor: "#EAD4C3", // Warm cream
  },
  {
    id: "facials",
    number: "04",
    title: "Medi-Facials & Peels",
    category: "CLINICAL COSMETOLOGY",
    badge: "Barrier Renewal",
    description:
      "Doctor-formulated chemical peels and hydra-infusion facials to restore cellular barrier health and radiance.",
    tags: ["Hydra-Infusion", "Gentle Peels", "Barrier Care"],
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1200&auto=format&fit=crop",
    href: "/facials",
    duration: "45 mins",
    bgColor: "#632738", // Deep berry wine
    accentColor: "#FCD0DC", // Rose cream accent
    mutedColor: "#EFC8D2", // Soft blush cream
  },
  {
    id: "body",
    number: "05",
    title: "Body & Skin Rejuvenation",
    category: "RESTORATIVE CARE",
    badge: "Advanced Protocol",
    description:
      "Clinical body contouring, stretch mark revision, and targeted tone restoration for uneven body skin.",
    tags: ["Body Contouring", "Stretch Marks", "Tone"],
    image:
      "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=1200&auto=format&fit=crop",
    href: "/body-treatments",
    duration: "60 mins",
    bgColor: "#6E4A25", // Warm caramel umber
    accentColor: "#FEE2B3", // Golden honey accent
    mutedColor: "#E8D5BF", // Warm sand
  },
  {
    id: "acne",
    number: "06",
    title: "Targeted Acne Protocol",
    category: "CLINICAL DERMA",
    badge: "Zero Guesswork",
    description:
      "Medical-grade comedone extraction, anti-inflammatory treatment, and prescription regimens for active breakouts.",
    tags: ["Active Acne", "Pore Clearance", "Inflammation"],
    image:
      "https://images.unsplash.com/photo-1761718209835-c8586b7dcac0?q=80&w=1200&auto=format&fit=crop",
    href: "/treatments",
    duration: "30 mins",
    bgColor: "#5C261A", // Deep warm mahogany terracotta
    accentColor: "#FFCBBF", // Coral cream accent
    mutedColor: "#EAC3BA", // Terracotta blush
  },
  {
    id: "consultation",
    number: "07",
    title: "Doctor Consultation",
    category: "MMC VERIFIED",
    badge: "Individual Assessment",
    description:
      "Comprehensive 1-on-1 clinical examination with dermoscopy imaging and personalized medical prescription.",
    tags: ["Dermoscopy", "Personalized Rx", "Follow-up"],
    image:
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1200&auto=format&fit=crop",
    href: "/book-now",
    duration: "30 mins",
    bgColor: "#232624", // Deep obsidian onyx
    accentColor: "#E5C07B", // Brushed champagne gold
    mutedColor: "#D2D6D0", // Soft mineral grey
  },
];

export default function SpecialtyCardsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const total = CLINIC_CARDS.length;

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Touch and swipe gestures
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    touchStartX.current = null;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isHovered) return;
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isHovered, handleNext, handlePrev]);

  // Wheel scroll with throttle
  const lastWheelTime = useRef(0);
  const handleWheel = (e: React.WheelEvent) => {
    const now = Date.now();
    if (now - lastWheelTime.current < 400) return;
    if (Math.abs(e.deltaX) > 25 || Math.abs(e.deltaY) > 35) {
      lastWheelTime.current = now;
      if (e.deltaX > 0 || e.deltaY > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  return (
    <section
      id="services"
      className="scroll-mt-24 relative w-full overflow-hidden py-14 sm:py-20 md:py-24"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onWheel={handleWheel}
    >
      {/* Abron Studio Dribbble 25530455 Seamlessly Blended Wavy Ribbon Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-gradient-to-b from-transparent via-[#faf1eb]/70 to-transparent [mask-image:linear-gradient(to_bottom,transparent_0%,black_80px,black_calc(100%-80px),transparent_100%)]"
      >
        {/* Soft atmospheric ambient glow */}
        <div className="absolute -top-16 left-1/4 h-[420px] w-[420px] rounded-full bg-[#fde1d0]/35 blur-3xl" />
        <div className="absolute -bottom-16 right-1/4 h-[420px] w-[420px] rounded-full bg-[#fbd9c5]/35 blur-3xl" />

        {/* Dynamic Animated Serpentine Ribbon */}
        <svg
          className="absolute inset-0 h-full w-full min-h-[850px] min-w-[1240px]"
          viewBox="0 0 1440 880"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="dribbbleRibbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f89566" stopOpacity="0.75" />
              <stop offset="50%" stopColor="#f48652" stopOpacity="0.70" />
              <stop offset="100%" stopColor="#e8733a" stopOpacity="0.65" />
            </linearGradient>
            <filter id="ribbonSoftGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="16" stdDeviation="22" floodColor="#d76632" floodOpacity="0.08" />
            </filter>
          </defs>

          {/* Single Unified Continuous Flowing Ribbon (Smooth organic curve safely within bounds, zero hard edges) */}
          <motion.path
            d="M -60,880 C 140,840 305,870 385,825 C 475,775 465,700 375,655 C 190,565 75,475 90,320 C 105,160 220,95 340,80 C 480,68 700,65 840,90 C 930,105 1010,120 1065,185 C 1125,275 1045,455 1085,615 C 1125,725 1240,820 1480,910"
            stroke="url(#dribbbleRibbonGrad)"
            strokeWidth="110"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#ribbonSoftGlow)"
            initial={false}
            animate={{
              x: activeIndex * -12,
              y: [-8, 8, -8],
              rotate: [-0.3, 0.3, -0.3],
            }}
            transition={{
              x: { type: "spring", stiffness: 180, damping: 25 },
              y: { duration: 8, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 10, repeat: Infinity, ease: "easeInOut" },
            }}
          />
        </svg>

        {/* Central Luminous Contrast Halo: Keeps foreground cards crystal-clear and prominent */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_62%_56%_at_50%_54%,rgba(255,255,255,0.85)_0%,rgba(255,255,255,0.4)_55%,transparent_82%)]" />
      </div>

      {/* Editorial Section Header */}
      <div className="mx-auto max-w-3xl text-center px-4 mb-8 sm:mb-12">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#292d27]/15 bg-white/80 px-4 py-1.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#626a59] shadow-[0_2px_10px_rgba(41,45,39,0.04)] backdrop-blur-xl">
          Our services
        </span>
        <h2 className="mt-4 font-['DM_Serif_Display',serif] text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-normal leading-[1.06] tracking-tight text-[#292d27]">
          Find the right place to <span className="italic font-normal text-[#7e423e]">start.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-xs sm:text-sm md:text-base leading-relaxed text-[#66695f]">
          Explore our care areas, learn what each involves, and book a consultation when you are ready. Your clinician will help determine what is appropriate for you.
        </p>
      </div>

      {/* Abron Studio Card Scrolling Carousel Stage */}
      <div
        ref={containerRef}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="relative w-full max-w-[1360px] mx-auto px-4 overflow-visible py-4"
      >
        <div className="relative flex items-center justify-center min-h-[460px] sm:min-h-[500px]">
          {CLINIC_CARDS.map((card, idx) => {
            // Compute offset relative to active card
            const offset = (idx - activeIndex + total) % total;
            const normalizedOffset = offset > total / 2 ? offset - total : offset;

            // Only render cards within viewing window (-2 to +2)
            const isVisible = Math.abs(normalizedOffset) <= 2;
            if (!isVisible) return null;

            const isActive = normalizedOffset === 0;

            // Dynamic transforms based on scroll position
            const xTranslation = normalizedOffset * (isMobile ? 310 : 540);
            const cardScale = isActive ? 1 : 0.88 - Math.abs(normalizedOffset) * 0.04;
            const cardOpacity = isActive ? 1 : 0.42;
            const zIndex = 20 - Math.abs(normalizedOffset);

            return (
              <motion.div
                key={card.id}
                onClick={() => !isActive && setActiveIndex(idx)}
                initial={false}
                animate={{
                  x: xTranslation,
                  scale: cardScale,
                  opacity: cardOpacity,
                  zIndex,
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 26,
                  mass: 0.8,
                }}
                className={`absolute top-0 w-[88vw] max-w-[360px] sm:max-w-[680px] md:max-w-[740px] rounded-3xl overflow-hidden cursor-pointer select-none border transition-shadow duration-300 ${
                  isActive
                    ? "shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] ring-1 ring-white/10"
                    : "shadow-md"
                }`}
                style={{
                  height: isMobile ? "460px" : "360px",
                  backgroundColor: card.bgColor,
                  borderColor: "rgba(255, 255, 255, 0.12)",
                }}
              >
                <div className="relative w-full h-full flex flex-col sm:flex-row overflow-hidden">
                  {/* Left Side Content Area (matching Dribbble shot layout) */}
                  <div className="relative z-10 flex-1 p-5 sm:p-7 md:p-8 flex flex-col justify-between max-w-full sm:max-w-[56%]">
                    {/* Top Header: Badge + Category + Title */}
                    <div>
                      <div className="flex items-center gap-2 mb-2 sm:mb-3">
                        <span className="inline-flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/15 backdrop-blur-md text-white font-mono text-[10px] sm:text-xs font-bold border border-white/20">
                          {card.number}
                        </span>
                        <span
                          className="text-[10px] font-mono uppercase tracking-[0.18em] font-semibold"
                          style={{ color: card.mutedColor }}
                        >
                          {card.category} • {card.duration}
                        </span>
                      </div>

                      <h3
                        className="font-['DM_Serif_Display',serif] text-xl sm:text-2xl md:text-3xl font-normal leading-tight tracking-tight drop-shadow-sm"
                        style={{ color: card.accentColor }}
                      >
                        {card.title}
                      </h3>
                    </div>

                    {/* Bottom Area: Description + Tag chips + CTA Buttons */}
                    <div className="mt-3 sm:mt-4">
                      <p
                        className="text-xs sm:text-[13px] md:text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-3 sm:line-clamp-none"
                        style={{ color: card.mutedColor }}
                      >
                        {card.description}
                      </p>

                      {/* Tag Chips */}
                      <div className="flex flex-wrap gap-1.5 mb-3 sm:mb-4">
                        {card.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/10 text-white/90 border border-white/15 backdrop-blur-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Card CTA Row */}
                      <div className="flex items-center gap-3 pt-2 border-t border-white/15">
                        <Link
                          href={`/book-now?concern=${encodeURIComponent(card.title)}`}
                          className="inline-flex items-center gap-1.5 rounded-full px-3.5 sm:px-4 py-1.5 text-xs font-semibold transition-all duration-200 active:scale-95 shadow-sm"
                          style={{
                            backgroundColor: card.accentColor,
                            color: card.bgColor,
                          }}
                          onClick={(e) => !isActive && e.preventDefault()}
                        >
                          <CalendarCheck className="h-3 w-3" /> Book
                        </Link>

                        <Link
                          href={card.href}
                          className="inline-flex items-center gap-1 text-xs font-medium"
                          style={{ color: card.mutedColor }}
                          onClick={(e) => !isActive && e.preventDefault()}
                        >
                          Explore care <ArrowRight className="h-3 w-3" />
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Right Side Image with Signature Organic Wavy Cutout */}
                  <div className="relative w-full sm:w-[48%] h-[190px] sm:h-full sm:absolute sm:right-0 sm:top-0 sm:bottom-0 overflow-hidden bg-neutral-900">
                    <motion.div
                      className="relative w-full h-full"
                      animate={{
                        scale: isActive ? 1.04 : 1,
                      }}
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        unoptimized
                        sizes="(max-width: 640px) 90vw, 400px"
                        className="object-cover object-center"
                        priority={idx <= 2}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-black/25 via-transparent to-transparent pointer-events-none" />
                    </motion.div>

                    {/* Desktop Organic Wavy Divider SVG (smooth bezier curve separating left color and right photo) */}
                    <svg
                      className="hidden sm:block absolute top-0 -left-1 bottom-0 h-full w-20 md:w-28 pointer-events-none z-10"
                      viewBox="0 0 100 400"
                      preserveAspectRatio="none"
                      fill={card.bgColor}
                    >
                      <path d="M 0,0 L 45,0 C 85,75 15,150 75,230 C 120,290 20,355 50,400 L 0,400 Z" />
                    </svg>

                    {/* Mobile Horizontal Organic Wavy Divider SVG */}
                    <svg
                      className="sm:hidden absolute top-0 left-0 right-0 w-full h-8 pointer-events-none z-10"
                      viewBox="0 0 400 50"
                      preserveAspectRatio="none"
                      fill={card.bgColor}
                    >
                      <path d="M 0,0 L 400,0 L 400,15 C 310,45 230,5 150,40 C 80,48 30,12 0,28 Z" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Modern Minimalist Bottom Navigation with New Simple Style Arrows */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 mt-8">
          {/* Previous Arrow Button - New & Simple Minimal Style */}
          <button
            onClick={handlePrev}
            aria-label="Previous card"
            className="group flex h-9 w-9 items-center justify-center rounded-full border border-[#292d27]/15 bg-white/90 text-[#292d27] shadow-[0_2px_10px_rgba(41,45,39,0.06)] backdrop-blur-md transition-all duration-200 hover:bg-[#292d27] hover:text-white hover:border-[#292d27] hover:scale-105 active:scale-95 focus-visible:outline-none"
          >
            <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" strokeWidth={2} />
          </button>

          {/* Indicator Dots Track */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/60 border border-[#292d27]/10 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
            {CLINIC_CARDS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to card ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeIndex === i
                    ? "w-6 bg-[#7e423e]"
                    : "w-1.5 bg-[#292d27]/25 hover:bg-[#292d27]/50"
                }`}
              />
            ))}
          </div>

          {/* Next Arrow Button - New & Simple Minimal Style */}
          <button
            onClick={handleNext}
            aria-label="Next card"
            className="group flex h-9 w-9 items-center justify-center rounded-full border border-[#292d27]/15 bg-white/90 text-[#292d27] shadow-[0_2px_10px_rgba(41,45,39,0.06)] backdrop-blur-md transition-all duration-200 hover:bg-[#292d27] hover:text-white hover:border-[#292d27] hover:scale-105 active:scale-95 focus-visible:outline-none"
          >
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Bottom Global Consultation Link Bar */}
      <div className="border-t border-[#292d27]/10 px-4 pt-10 mt-10 max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-xs text-[#696c61] max-w-md">
            Treatment options, session counts, and recovery times vary by individual. A consultation is required to assess suitability.
          </p>
          <div className="flex items-center gap-3">
            <Link
              href="/treatments"
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#292d27]/15 bg-white/80 px-4 py-2.5 text-xs font-semibold text-[#292d27] hover:bg-white transition-colors shadow-[0_2px_8px_rgba(41,45,39,0.04)]"
            >
              Explore all care <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href={`/book-now?concern=${encodeURIComponent(CLINIC_CARDS[activeIndex]?.title || "Consultation")}`}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#292d27] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#7e423e] transition-colors shadow-[0_8px_20px_rgba(41,45,39,0.12)]"
            >
              <CalendarCheck className="h-3.5 w-3.5" /> Book consultation
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
