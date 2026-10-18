"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  MotionValue,
} from "framer-motion";
import {
  ArrowRight,
  CalendarCheck,
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
    image: "/services/luxury/card-01-dermatology.jpg",
    href: "/skin",
    duration: "30-45 mins",
    bgColor: "#452416",
    accentColor: "#FDEFD0",
    mutedColor: "#EAD2C0",
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
    image: "/services/luxury/card-02-hair-diagnostics.jpg",
    href: "/hair",
    duration: "40 mins",
    bgColor: "#16281E",
    accentColor: "#D5EBDE",
    mutedColor: "#BBD6C4",
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
    image: "/services/luxury/card-03-laser-treatment.jpg",
    href: "/cosmetics",
    duration: "45-60 mins",
    bgColor: "#172330",
    accentColor: "#D8E9F8",
    mutedColor: "#BED2E4",
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
    image: "/services/luxury/card-04-medifacial-peel.jpg",
    href: "/facials",
    duration: "45 mins",
    bgColor: "#3B1522",
    accentColor: "#FCDCE4",
    mutedColor: "#EABFC9",
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
    image: "/services/luxury/card-05-body-rejuvenation.jpg",
    href: "/body-treatments",
    duration: "60 mins",
    bgColor: "#3A2A16",
    accentColor: "#FCE8C2",
    mutedColor: "#DEC8A4",
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
    image: "/services/luxury/card-06-acne-protocol.jpg",
    href: "/treatments",
    duration: "30 mins",
    bgColor: "#3C1A14",
    accentColor: "#FED9CF",
    mutedColor: "#E6B9AE",
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
    image: "/services/luxury/card-07-doctor-consultation.jpg",
    href: "/book-now",
    duration: "30 mins",
    bgColor: "#1E1F24",
    accentColor: "#E5C687",
    mutedColor: "#D4D5DB",
  },
];

// Exact math algorithms from drmonalisclinic.com
const clamp = (val: number, min: number, max: number) =>
  Math.min(Math.max(val, min), max);

const ew = { peek: 0.05, scaleStep: 0.028, exitShrink: 0.05, maxDepth: 2 };
const ej = { peek: 0.038, scaleStep: 0.02, exitShrink: 0.05, maxDepth: 1 };

const exitProgress = (c: number, index: number) =>
  clamp((c - index) / 0.5, 0, 1);

const stackDepth = (c: number, index: number, maxDepth: number) => {
  const diff = index - Math.max(c, 0);
  if (diff <= 0) return 0;
  const intDiff = Math.floor(diff);
  return Math.min(intDiff + clamp((diff - intDiff - 0.5) / 0.5, 0, 1), maxDepth);
};

const calcOpacity = (c: number, index: number, maxDepth: number) => {
  const depthOpacity = clamp(maxDepth + 1 - (index - Math.max(c, 0)), 0, 1);
  const exitOp = clamp(1 - exitProgress(c, index) * 1.5, 0, 1);
  return depthOpacity * exitOp;
};

function generateKeyframes(index: number, total: number, config: typeof ew) {
  const { peek, scaleStep, exitShrink, maxDepth } = config;
  const points: { p: number; y: string; scale: number; opacity: number }[] = [];
  const steps = 30;

  for (let i = 0; i <= steps; i++) {
    const p = i / steps;
    const c = p * Math.max(total - 1, 1);

    const y = `${((stackDepth(c, index, maxDepth) * peek - 1.45 * exitProgress(c, index)) * 100).toFixed(3)}%`;
    const scale = Number(
      (1 - stackDepth(c, index, maxDepth) * scaleStep - exitProgress(c, index) * exitShrink).toFixed(4)
    );
    const opacity = Number(calcOpacity(c, index, maxDepth).toFixed(4));

    points.push({ p, y, scale, opacity });
  }

  // Deduplicate consecutive identical points
  const deduped = [points[0]];
  for (let i = 1; i < points.length - 1; i++) {
    const prev = deduped[deduped.length - 1];
    const curr = points[i];
    const next = points[i + 1];
    if (
      curr.y !== prev.y ||
      curr.scale !== prev.scale ||
      curr.opacity !== prev.opacity ||
      curr.y !== next.y ||
      curr.scale !== next.scale ||
      curr.opacity !== next.opacity
    ) {
      deduped.push(curr);
    }
  }
  deduped.push(points[points.length - 1]);

  return {
    progress: deduped.map((pt) => pt.p),
    y: deduped.map((pt) => pt.y),
    scale: deduped.map((pt) => pt.scale),
    opacity: deduped.map((pt) => pt.opacity),
  };
}

interface SpecialtyCardItemProps {
  card: ClinicCard;
  idx: number;
  total: number;
  progress: MotionValue<number>;
  keyframes: {
    progress: number[];
    y: string[];
    scale: number[];
    opacity: number[];
  };
  active: boolean;
  onClick: () => void;
  isMobile: boolean;
}

const SpecialtyCardItem = React.memo(function SpecialtyCardItem({
  card,
  idx,
  total,
  progress,
  keyframes,
  active,
  onClick,
  isMobile,
}: SpecialtyCardItemProps) {
  const y = useTransform(progress, keyframes.progress, keyframes.y);
  const scale = useTransform(progress, keyframes.progress, keyframes.scale);
  const opacity = useTransform(progress, keyframes.progress, keyframes.opacity);

  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center px-4 sm:px-6 md:px-8 py-4 sm:py-6"
      style={{ zIndex: total - idx }}
    >
      <motion.div
        onClick={onClick}
        className="group relative w-full max-w-[360px] sm:max-w-[680px] md:max-w-[760px] rounded-3xl overflow-hidden cursor-pointer border border-white/20 select-none"
        style={{
          y,
          scale,
          opacity,
          pointerEvents: "auto",
          backgroundColor: card.bgColor,
          willChange: "transform, opacity",
          transform: "translate3d(0, 0, 0)",
          WebkitBackfaceVisibility: "hidden",
          backfaceVisibility: "hidden",
          height: isMobile ? "430px" : "360px",
        }}
      >
        <div className="relative w-full h-full flex flex-col sm:flex-row overflow-hidden">
          {/* Left Side Content Area (100% 1:1 authentic design) */}
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
                >
                  <CalendarCheck className="h-3 w-3" /> Book
                </Link>

                <Link
                  href={card.href}
                  className="inline-flex items-center gap-1 text-xs font-medium"
                  style={{ color: card.mutedColor }}
                >
                  Explore care <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Side Image with Signature Organic Wavy Cutout */}
          <div
            className="relative w-full sm:w-[48%] h-[175px] sm:h-full min-h-[175px] sm:min-h-full sm:absolute sm:right-0 sm:top-0 sm:bottom-0 overflow-hidden"
            style={{ backgroundColor: card.bgColor }}
          >
            <div className="relative w-full h-full min-h-[175px] sm:min-h-full">
              <Image
                src={card.image}
                alt={card.title}
                fill
                unoptimized
                sizes="(max-width: 640px) 90vw, 400px"
                className="object-cover object-center"
                loading="eager"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-black/25 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Desktop Organic Wavy Divider SVG */}
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
    </div>
  );
});

export default function SpecialtyCardsSection() {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const activeRef = useRef(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isSectionActive, setIsSectionActive] = useState(false);
  const isSectionActiveRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    const checkWidth = () => setIsMobile(window.innerWidth < 768);
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  const total = CLINIC_CARDS.length;
  const config = isMobile ? ej : ew;

  const keyframesList = useMemo(
    () => CLINIC_CARDS.map((_, i) => generateKeyframes(i, total, config)),
    [total, config]
  );

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const current = clamp(Math.round(latest * (total - 1)), 0, Math.max(total - 1, 0));
    if (current !== activeRef.current) {
      activeRef.current = current;
      setActiveCardIndex(current);
    }
    const shouldBeActive = latest > 0.02 && latest < 0.98;
    if (shouldBeActive !== isSectionActiveRef.current) {
      isSectionActiveRef.current = shouldBeActive;
      setIsSectionActive(shouldBeActive);
    }
  });

  const scrollToCard = useCallback((index: number) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const containerTop = rect.top + scrollTop;
    const totalScroll = container.offsetHeight - window.innerHeight;
    const targetProgress = index / (CLINIC_CARDS.length - 1);
    const targetScrollY = containerTop + targetProgress * totalScroll;
    window.scrollTo({ top: targetScrollY, behavior: "smooth" });
  }, []);

  // Keyboard navigation when section is in view
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isSectionActive) return;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        scrollToCard(Math.min(total - 1, activeCardIndex + 1));
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        scrollToCard(Math.max(0, activeCardIndex - 1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSectionActive, activeCardIndex, scrollToCard, total]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        // Swiped up -> next card
        scrollToCard(Math.min(total - 1, activeCardIndex + 1));
      } else {
        // Swiped down -> previous card
        scrollToCard(Math.max(0, activeCardIndex - 1));
      }
    }
    touchStartY.current = null;
  };

  return (
    <section
      id="services"
      ref={containerRef}
      className="scroll-mt-24 relative w-full overflow-visible"
      style={{ height: `${CLINIC_CARDS.length * 100}vh` }}
    >
      {/* Sticky Presentation Viewport Frame matching drmonalisclinic.com */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-start items-center overflow-hidden py-4 sm:py-6 select-none">
        {/* Soft atmospheric ambient glow matching luxury palette */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-gradient-to-b from-transparent via-[#faf1eb]/60 to-transparent"
        >
          <div className="absolute top-1/4 left-1/4 h-[520px] w-[520px] rounded-full bg-[#fde1d0]/30 blur-3xl" />
          <div className="absolute top-2/3 right-1/4 h-[520px] w-[520px] rounded-full bg-[#fbd9c5]/30 blur-3xl" />
        </div>

        {/* Editorial Section Header */}
        <div className="mx-auto max-w-3xl text-center px-4 pt-2 sm:pt-4 pb-2 sm:pb-3 shrink-0 z-20 mb-4 sm:mb-6 md:mb-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#292d27]/15 bg-white/80 px-3.5 py-1 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#626a59] shadow-[0_2px_10px_rgba(41,45,39,0.04)] backdrop-blur-xl">
            Our services
          </span>
          <h2 className="mt-2 font-['DM_Serif_Display',serif] text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-normal leading-tight tracking-tight text-[#292d27]">
            Find the right place to <span className="italic font-normal text-[#7e423e]">start.</span>
          </h2>
          <p className="mx-auto mt-1 max-w-xl text-xs sm:text-[13px] leading-relaxed text-[#66695f] hidden sm:block">
            Explore our care areas, learn what each involves, and book a consultation when you are ready.
          </p>
        </div>

        {/* Central Deck Stage matching drmonalisclinic.com (cards stacked with upcoming peeking at bottom) */}
        <div
          className="relative w-full max-w-[820px] h-[460px] sm:h-[400px] flex items-center justify-center mt-4 sm:mt-8 md:mt-12 lg:mt-16 mb-auto"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {CLINIC_CARDS.map((card, idx) => (
            <SpecialtyCardItem
              key={card.id}
              card={card}
              idx={idx}
              total={total}
              progress={scrollYProgress}
              keyframes={keyframesList[idx]}
              active={activeCardIndex === idx}
              onClick={() => scrollToCard(idx)}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
