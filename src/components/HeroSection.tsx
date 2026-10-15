"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarCheck,
  CheckCircle2,
  MapPin,
  ScanFace,
  Droplets,
  Stethoscope,
} from "lucide-react";

const carePoints = [
  { icon: ScanFace, label: "Skin diagnostics" },
  { icon: Droplets, label: "Hair & aesthetics" },
  { icon: Stethoscope, label: "Doctor-led care" },
];

export default function HeroSection() {
  return (
    <section
      id="hero"
      aria-labelledby="homepage-hero-title"
      className="relative isolate overflow-hidden bg-[#f4f0e8] px-4 sm:px-8 lg:px-12 pt-20 sm:pt-24 lg:pt-24 pb-8 sm:pb-10 lg:pb-12 text-[#252923]"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-28 top-8 h-72 w-72 rounded-full bg-[#c8d3c1]/60 blur-3xl sm:h-[28rem] sm:w-[28rem]" />
        <div className="absolute right-[-8rem] top-20 h-80 w-80 rounded-full bg-[#e7cfc5]/65 blur-3xl sm:h-[36rem] sm:w-[36rem]" />
        <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(62,70,57,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(62,70,57,.08)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      </div>

      <div className="mx-auto grid max-w-[1440px] items-center gap-8 sm:gap-10 lg:grid-cols-[1fr_1fr] lg:gap-8 xl:grid-cols-[0.95fr_1.05fr] xl:gap-16 2xl:gap-20">
        {/* Left Column: Editorial Headline & Actions */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="relative z-10 w-full max-w-2xl mx-auto lg:mx-0"
        >

          {/* Clinic Brand Sub-title */}
          <div className="mb-4 sm:mb-5 flex items-center gap-3 sm:gap-4 select-none">
            <span
              style={{ fontFamily: "'Amita', serif" }}
              className="text-[26px] sm:text-[30px] md:text-[34px] font-bold leading-none text-[#873f3b] tracking-normal"
            >
              शिनगारे
            </span>
            {/* Rich & Unique Modern Architectural Twin Luxury Bar */}
            <div className="flex items-center justify-center gap-1 sm:gap-1.5 px-0.5 sm:px-1 select-none shrink-0" aria-hidden="true">
              {/* Primary Clinic Crimson Pillar */}
              <span className="block w-[2.5px] sm:w-[3px] h-[22px] sm:h-[25px] rounded-full bg-gradient-to-b from-[#873f3b] via-[#9e4a46] to-[#873f3b] shadow-[0_1px_3px_rgba(135,63,59,0.22)]" />
              {/* Secondary Brushed Champagne Gold Accent Pillar */}
              <span className="block w-[1.5px] sm:w-[2px] h-[13px] sm:h-[15px] rounded-full bg-gradient-to-b from-[#E6CA85] via-[#C5A059] to-[#9E7B38] shadow-[0_1px_2px_rgba(197,160,89,0.25)]" />
            </div>
            <span
              style={{ fontFamily: "'Mukta', sans-serif" }}
              className="text-[11px] sm:text-[12px] md:text-[12.5px] font-bold tracking-[0.22em] text-[#4a4c44] uppercase whitespace-nowrap self-center"
            >
              SKIN &amp; COSMETICS
            </span>
          </div>

          {/* Hero Title */}
          <h1
            id="homepage-hero-title"
            className="font-['Playfair_Display',Georgia,serif] text-[2.3rem] xs:text-[2.7rem] sm:text-[3.3rem] md:text-[3.8rem] lg:text-[4.2rem] xl:text-[4.6rem] font-bold leading-[1.08] tracking-[-0.025em] text-[#1b261e]"
          >
            Your skin,
            <br />
            <span className="relative inline-block italic font-medium text-[#873f3b]">
              in expert
              {/* Subtle editorial curved swoosh underline matching image reference */}
              <svg
                className="absolute -bottom-1 sm:-bottom-1.5 left-0 w-full h-2.5 sm:h-3 text-[#873f3b]/50 pointer-events-none"
                viewBox="0 0 300 20"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M 4,7 Q 150,18 296,5"
                  stroke="currentColor"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            hands.
          </h1>

          {/* Subtitle Description */}
          <p className="mt-4 sm:mt-5 max-w-lg text-[14px] sm:text-[15px] leading-relaxed text-[#555a50]">
            Thoughtful dermatology, hair care and aesthetic treatments — with clear guidance, personalised plans and care centred around you.
          </p>

          {/* CTAs */}
          <div className="mt-6 sm:mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Link
              href="/book-now"
              className="inline-flex min-h-[48px] sm:min-h-[52px] items-center justify-center gap-2.5 rounded-2xl bg-[#292d27] px-5 sm:px-6 text-[12px] font-semibold tracking-[.04em] text-white shadow-[0_12px_30px_rgba(35,40,32,.18)] active:scale-[0.985] transition-transform duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#292d27]"
            >
              <CalendarCheck size={16} />
              <span>Book a consultation</span>
              <ArrowUpRight size={15} />
            </Link>
            <Link
              href="#services"
              className="inline-flex min-h-[48px] sm:min-h-[52px] items-center justify-center gap-2 rounded-2xl border border-white/90 bg-white/45 px-5 sm:px-6 text-[12px] font-semibold text-[#353a31] shadow-[inset_0_1px_0_rgba(255,255,255,.95),0_8px_24px_rgba(46,51,41,.05)] backdrop-blur-xl active:scale-[0.985] transition-transform duration-150"
            >
              <span>Explore treatments</span>
              <ArrowDownRight size={15} />
            </Link>
          </div>

          {/* Care points strip */}
          <div className="mt-7 sm:mt-8 flex flex-wrap gap-x-4 sm:gap-x-5 gap-y-2 border-t border-[#6c715f]/15 pt-4">
            {carePoints.map(({ icon: Icon, label }) => (
              <span key={label} className="inline-flex items-center gap-2 text-[11px] font-medium text-[#5f6459] sm:text-xs">
                <Icon size={14} strokeWidth={1.7} className="text-[#7e423e]" />
                {label}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Right Column: Hero Visual Arch with Floating Badges */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.12, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-[560px] lg:max-w-[520px] xl:max-w-[580px] lg:ml-auto"
        >
          <div aria-hidden="true" className="absolute inset-x-[8%] bottom-[3%] top-[4%] rounded-[48%] border border-white/70 bg-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,.8)] backdrop-blur-[2px]" />
          
          {/* Arch Visual Container */}
          <div className="relative mx-auto aspect-[0.92] w-full max-w-[340px] xs:max-w-[380px] sm:max-w-[440px] lg:max-w-[480px] xl:max-w-[540px] overflow-hidden rounded-[48%_48%_2rem_2rem] border border-white/80 bg-gradient-to-br from-[#e4e2d7] via-[#eee5dc] to-[#d4dbce] shadow-[inset_0_1px_0_rgba(255,255,255,.95),0_32px_90px_rgba(56,57,46,.14)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_18%,rgba(255,255,255,.75),transparent_32%),linear-gradient(145deg,rgba(245,240,231,.2),rgba(117,130,105,.22))]" />
            <Image
              src="/girl-latest.png"
              alt="Portrait representing skin and cosmetic care at Shingare Skin & Cosmetics Clinic"
              fill
              priority
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 45vw"
              className="relative z-[1] object-contain object-bottom drop-shadow-[0_18px_30px_rgba(42,43,35,.13)]"
            />
            <div className="absolute inset-x-0 bottom-0 z-[2] h-1/3 bg-gradient-to-t from-[#d8d7c9]/75 to-transparent" />
          </div>

          {/* Floating Personalised Care Badge */}
          <div className="absolute -left-2 sm:-left-6 lg:-left-8 xl:-left-10 top-[8%] sm:top-[10%] hidden max-w-[190px] sm:max-w-[210px] rounded-2xl border border-white/80 bg-white/65 p-3 sm:p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,.95),0_16px_44px_rgba(52,57,45,.1)] backdrop-blur-2xl sm:block z-20">
            <div className="mb-1 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[.16em] text-[#7e423e]">
              <CheckCircle2 size={13} /> Personalised care
            </div>
            <p className="font-['Playfair_Display',Georgia,serif] text-base sm:text-lg leading-tight text-[#2c3029]">A plan made for you.</p>
            <p className="mt-0.5 text-[10px] leading-3.5 text-[#6c6e64]">Care guided by consultation, not guesswork.</p>
          </div>

          {/* Bottom Location Badge */}
          <div className="absolute -bottom-2 right-1 sm:right-0 z-10 flex items-center gap-2.5 sm:gap-3 rounded-2xl border border-white/80 bg-[#fbfaf6]/85 px-3.5 py-2.5 sm:px-5 sm:py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,.95),0_18px_45px_rgba(52,57,45,.12)] backdrop-blur-2xl">
            <span className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-[#e8e7dc] text-[#7e423e] shadow-[inset_2px_2px_5px_rgba(100,100,80,.12),inset_-2px_-2px_5px_rgba(255,255,255,.9)]">
              <MapPin size={16} />
            </span>
            <span>
              <span className="block text-[8px] sm:text-[9px] font-bold uppercase tracking-[.16em] text-[#77796f]">Find our clinic</span>
              <span className="mt-0.5 block text-xs sm:text-sm font-semibold text-[#2d312a]">Peth Vadgaon, Kolhapur</span>
            </span>
          </div>
        </motion.div>
      </div>

      {/* Bottom Subtle Divider */}
      <div className="mx-auto mt-10 sm:mt-12 flex max-w-[1440px] items-center justify-between border-t border-[#6c715f]/15 pt-4 text-[9px] font-semibold uppercase tracking-[.16em] text-[#77796f] sm:text-[10px]">
        <span>Clinical knowledge. Human care.</span>
        <span className="hidden items-center gap-2 sm:inline-flex"><span className="h-px w-8 bg-[#7e423e]/60" /> Scroll to explore</span>
      </div>
    </section>
  );
}
