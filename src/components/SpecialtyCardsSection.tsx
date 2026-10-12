"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarCheck,
  Clock3,
  Droplets,
  Sparkles,
  Stethoscope,
  Waves,
  Activity,
} from "lucide-react";

type Specialty = {
  id: string;
  index: string;
  title: string;
  eyebrow: string;
  summary: string;
  conditions: string[];
  duration: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  href: string;
  bookingParam: string;
  art: string;
  accent: string;
  note: string;
};

const specialties: Specialty[] = [
  {
    id: "skin",
    index: "01",
    title: "Clinical Dermatology",
    eyebrow: "SKIN HEALTH",
    summary:
      "Consultation and treatment planning for common and complex skin concerns, guided by an individual clinical assessment.",
    conditions: ["Acne", "Eczema", "Psoriasis", "Pigmentation"],
    duration: "Consultation-led",
    icon: Stethoscope,
    href: "/skin",
    bookingParam: "Clinical Dermatology",
    art: "radial-gradient(circle at 78% 18%, rgba(255,255,255,.95) 0 7%, transparent 7.5%), radial-gradient(circle at 75% 24%, rgba(255,255,255,.22), transparent 33%), linear-gradient(135deg,#e3e9dd 0%,#c5d2bd 48%,#f1e8df 100%)",
    accent: "#62765b",
    note: "Doctor-led assessment",
  },
  {
    id: "hair",
    index: "02",
    title: "Hair & Scalp Care",
    eyebrow: "TRICHOLOGY",
    summary:
      "Explore options for hair fall and scalp concerns, including diagnostic assessment and suitable treatment planning.",
    conditions: ["Hair fall", "Scalp health", "PRP / GFC", "Thinning"],
    duration: "Plan varies by case",
    icon: Activity,
    href: "/hair",
    bookingParam: "Trichology & Hair Restoration",
    art: "radial-gradient(ellipse at 72% 24%, rgba(255,255,255,.65), transparent 24%), radial-gradient(ellipse at 80% 90%, rgba(112,73,75,.22), transparent 42%), linear-gradient(135deg,#eee0d7 0%,#d7b9b0 48%,#f5ede6 100%)",
    accent: "#8b5550",
    note: "Personalised scalp review",
  },
  {
    id: "laser",
    index: "03",
    title: "Laser & Scar Treatments",
    eyebrow: "ADVANCED AESTHETICS",
    summary:
      "Learn about laser-based and scar-care options. Suitability, expected results and recovery are reviewed during consultation.",
    conditions: ["Acne scars", "Melasma", "Pigment", "Texture"],
    duration: "Assessment first",
    icon: Waves,
    href: "/cosmetics",
    bookingParam: "Aesthetic Lasers & Scar Revision",
    art: "radial-gradient(circle at 76% 24%, rgba(255,255,255,.9) 0 4%, transparent 4.5%), radial-gradient(circle at 76% 24%, transparent 0 15%, rgba(255,255,255,.3) 15.5% 16%, transparent 16.5% 28%, rgba(255,255,255,.24) 28.5% 29%, transparent 29.5%), linear-gradient(135deg,#e8dfd0 0%,#c7c5b3 50%,#f5e7df 100%)",
    accent: "#7b6b50",
    note: "Treatment suitability assessed",
  },
  {
    id: "facials",
    index: "04",
    title: "Medi-Facials & Peels",
    eyebrow: "CLINICAL COSMETOLOGY",
    summary:
      "Discover clinic-based facial and peel options selected around your skin type, concerns and barrier health.",
    conditions: ["Hydra-facial", "Chemical peels", "Oil control", "Skin texture"],
    duration: "Varies by procedure",
    icon: Droplets,
    href: "/cosmetics",
    bookingParam: "Signature Medi-Facials & Peels",
    art: "radial-gradient(ellipse at 74% 24%, rgba(255,255,255,.85), transparent 25%), radial-gradient(circle at 80% 76%, rgba(255,255,255,.3), transparent 30%), linear-gradient(135deg,#e9d9dc 0%,#d7b7c0 45%,#f3eae1 100%)",
    accent: "#946b77",
    note: "Skin-first care planning",
  },
];

export default function SpecialtyCardsSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="services"
      aria-labelledby="specialties-heading"
      className="scroll-mt-28 relative bg-transparent px-4 py-20 font-source sm:px-6 md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-[1240px]">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-10 max-w-3xl text-center md:mb-14"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/65 px-4 py-2 text-[10px] font-semibold uppercase tracking-[.19em] text-[#626a59] shadow-[inset_0_1px_0_rgba(255,255,255,.9),0_8px_24px_rgba(41,45,39,.05)] backdrop-blur-xl sm:text-[11px]">
            <Sparkles size={13} className="text-[#7e423e]" />
            Care, considered
          </span>
          <h2
            id="specialties-heading"
            className="font-['Cormorant_Garamond',Georgia,serif] text-4xl font-medium leading-[.98] tracking-[-.04em] text-[#292d27] sm:text-5xl md:text-6xl"
          >
            Find the right place to <span className="italic text-[#7e423e]">start.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#66695f] sm:text-base">
            Explore our care areas, learn what each involves, and book a consultation when you are ready. Your clinician will help determine what is appropriate for you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:gap-6">
          {specialties.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.id}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.55,
                  delay: reduceMotion ? 0 : index * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={
                  reduceMotion
                    ? undefined
                    : { y: -7, rotateX: 1.5, rotateY: index % 2 === 0 ? 1.5 : -1.5 }
                }
                style={{ transformStyle: "preserve-3d", perspective: 1200 }}
                className="group relative flex min-w-0 flex-col overflow-hidden rounded-[26px] border border-white/85 bg-[#fbfaf6]/80 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,.95),0_12px_36px_rgba(48,53,43,.055)] backdrop-blur-2xl transition-[border-color,box-shadow] duration-300 hover:border-[#b7bfae] hover:shadow-[0_24px_58px_rgba(48,53,43,.12)]"
              >
                <div
                  aria-hidden="true"
                  className="relative isolate flex min-h-[190px] items-end overflow-hidden rounded-[19px] p-5 sm:min-h-[220px] sm:p-6"
                  style={{ background: item.art }}
                >
                  <div className="pointer-events-none absolute -right-8 -top-12 h-48 w-48 rounded-full border border-white/45 bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,.6)] backdrop-blur-sm transition-transform duration-700 group-hover:scale-110 sm:h-56 sm:w-56" />
                  <div className="pointer-events-none absolute right-[16%] top-[16%] h-28 w-28 rounded-full border border-white/55 bg-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,.7),0_20px_40px_rgba(45,48,38,.06)] backdrop-blur-md transition-transform duration-700 group-hover:translate-x-2 group-hover:-translate-y-2 sm:h-36 sm:w-36" />
                  <div
                    className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/75 bg-white/60 text-[#30372d] shadow-[inset_0_1px_0_rgba(255,255,255,.95),0_12px_30px_rgba(45,48,38,.1)] backdrop-blur-xl transition-transform duration-500 group-hover:rotate-[-5deg] group-hover:scale-105 sm:h-16 sm:w-16"
                    style={{ color: item.accent, transform: "translateZ(28px)" }}
                  >
                    <Icon className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={1.45} />
                  </div>
                  <div className="relative z-10 ml-auto max-w-[58%] text-right" style={{ transform: "translateZ(20px)" }}>
                    <p className="text-[9px] font-bold uppercase tracking-[.2em] text-[#3d4438]/70 sm:text-[10px]">
                      {item.eyebrow}
                    </p>
                    <p className="mt-1 font-['Cormorant_Garamond',Georgia,serif] text-3xl font-medium leading-none tracking-[-.03em] text-[#292d27] sm:text-4xl">
                      {item.index}
                    </p>
                  </div>
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/20 to-transparent" />
                </div>

                <div className="flex flex-1 flex-col px-3 pb-3 pt-5 sm:px-4 sm:pt-6">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <h3 className="max-w-[85%] font-['Cormorant_Garamond',Georgia,serif] text-[27px] font-semibold leading-[1.02] tracking-[-.025em] text-[#292d27] transition-colors duration-300 group-hover:text-[#7e423e] sm:text-[32px]">
                      {item.title}
                    </h3>
                    <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#dfe2d8] bg-white/65 text-[#737a69] transition-all duration-300 group-hover:border-[#7e423e]/25 group-hover:bg-[#7e423e] group-hover:text-white">
                      <ArrowUpRight size={16} />
                    </span>
                  </div>

                  <p className="max-w-xl text-sm leading-6 text-[#686b61] sm:text-[15px] sm:leading-7">
                    {item.summary}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.conditions.map((condition) => (
                      <span
                        key={condition}
                        className="rounded-full border border-[#e1e3db] bg-white/55 px-3 py-1.5 text-[10px] font-medium text-[#565d50] sm:text-[11px]"
                      >
                        {condition}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-[#dfe1d8] pt-4 text-[10px] font-medium text-[#73766d] sm:text-[11px]">
                    <Clock3 size={13} className="text-[#7e423e]" />
                    <span>{item.duration}</span>
                    <span aria-hidden="true" className="mx-1 h-1 w-1 rounded-full bg-[#a9ada2]" />
                    <span>{item.note}</span>
                  </div>

                  <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                    <Link
                      href={item.href}
                      className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-[#d9ddd3] bg-white/55 px-4 text-xs font-semibold text-[#343a30] transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#7e423e]"
                    >
                      Explore care <ArrowRight size={14} />
                    </Link>
                    <Link
                      href={`/book-now?concern=${encodeURIComponent(item.bookingParam)}`}
                      className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[#292d27] px-4 text-xs font-semibold text-white shadow-[0_8px_20px_rgba(41,45,39,.12)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#7e423e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#7e423e]"
                    >
                      <CalendarCheck size={14} />
                      Book consultation
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <p className="mx-auto mt-6 max-w-3xl text-center text-[11px] leading-5 text-[#797b72]">
          Treatment options, expected outcomes, session counts and recovery times vary by individual. A consultation is needed to determine suitability.
        </p>
      </div>
    </section>
  );
}
