"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  CalendarCheck,
  CheckCircle2,
  Droplets,
  HeartHandshake,
  MapPin,
  ScanFace,
  ShieldCheck,
  Stethoscope,
  SunMedium,
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
      className="relative isolate overflow-hidden bg-[#f4f0e8] px-0 lg:px-12 pt-[54px] lg:pt-24 pb-0 lg:pb-12 text-[#252923]"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-28 top-8 h-72 w-72 rounded-full bg-[#c8d3c1]/60 blur-3xl sm:h-[28rem] sm:w-[28rem]" />
        <div className="absolute right-[-8rem] top-20 h-80 w-80 rounded-full bg-[#e7cfc5]/65 blur-3xl sm:h-[36rem] sm:w-[36rem]" />
        <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(62,70,57,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(62,70,57,.08)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      </div>

      {/* ============================================================== */}
      {/* MOBILE HERO PRESENTATION (< lg)                                */}
      {/* Full-Bleed Luxury Editorial Screen - Reference Design Aligned  */}
      {/* ============================================================== */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="block lg:hidden w-full select-none"
      >
        {/* Upper Editorial Visual Zone */}
        <div className="relative w-full min-h-[310px] xs:min-h-[340px] sm:min-h-[380px] bg-gradient-to-b from-[#F7F2EB] via-[#F4ECE2] to-[#EFE7DD] overflow-hidden pt-5 xs:pt-6 pb-3">
          
          {/* Subtle botanical leaf watermark in top right corner */}
          <div aria-hidden="true" className="pointer-events-none absolute right-[-24px] top-[-10px] w-48 h-48 opacity-15">
            <Image src="/leaf-outline.svg" alt="" fill className="object-contain rotate-45" />
          </div>

          {/* Soft ambient radial glow behind model */}
          <div className="pointer-events-none absolute right-0 top-0 w-80 h-80 rounded-full bg-white/40 blur-3xl" />

          {/* Left Column: Location, Headline, Subtitle, Verified Badge */}
          <div className="relative z-20 w-[58%] xs:w-[56%] sm:w-[52%] pl-4 xs:pl-5 sm:pl-8 pr-1 pt-1 flex flex-col items-start select-none">
            {/* Kolhapur Location Pill */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-[#292d27]/10 text-[9.5px] xs:text-[10px] font-semibold text-[#5c6054] mb-3 shadow-[0_2px_8px_rgba(0,0,0,0.04)] backdrop-blur-xs">
              <MapPin size={11} className="text-[#873f3b]" />
              <span className="tracking-[0.16em] uppercase font-mono">KOLHAPUR</span>
            </div>

            {/* Editorial Headline */}
            <h1 className="font-['Playfair_Display',Georgia,serif] text-[24px] xs:text-[27px] sm:text-[32px] font-bold leading-[1.14] tracking-[-0.02em] text-[#1a221b]">
              Your skin,
              <br />
              <span className="relative inline-block italic font-medium text-[#873f3b]">
                in expert
                <svg
                  className="absolute -bottom-1 left-0 w-full h-1.5 text-[#873f3b]/50 pointer-events-none"
                  viewBox="0 0 100 10"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path d="M 2,5 Q 50,10 98,3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </span>
              <br />
              hands.
            </h1>

            {/* Category Subtitle */}
            <div className="mt-2.5 xs:mt-3 flex flex-col items-start">
              <span className="text-[9px] xs:text-[10px] font-mono font-bold tracking-[0.18em] text-[#555a50] uppercase">
                SKIN • HAIR • COSMETICS
              </span>
              <div className="w-10 h-[2px] bg-[#873f3b] mt-1 rounded-full" />
            </div>

            {/* Medical Accreditation Badge (MMC Verified) */}
            <div className="mt-3 xs:mt-3.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-[#873f3b]/25 shadow-[0_2px_10px_rgba(135,63,59,0.08)]">
              <ShieldCheck size={13} className="text-[#873f3b]" />
              <span className="text-[8.5px] xs:text-[9.5px] font-mono font-bold tracking-[0.14em] text-[#873f3b] uppercase">
                MMC VERIFIED
              </span>
            </div>
          </div>

          {/* Right Column: Prominent Model Cutout Portrait */}
          <div className="absolute right-[-14px] xs:right-[-6px] sm:right-4 bottom-0 w-[58%] xs:w-[56%] sm:w-[50%] h-[310px] xs:h-[340px] sm:h-[380px] pointer-events-none z-10">
            <Image
              src="/girl-latest.png"
              alt="Portrait representing skin and cosmetic care at Shingare Skin Clinic"
              fill
              priority
              sizes="(max-width: 768px) 60vw, 45vw"
              className="object-contain object-bottom drop-shadow-[0_16px_32px_rgba(40,45,35,0.18)]"
            />
          </div>
        </div>

        {/* Lower Elevated Treatment Sheet / Card (Full Bleed with Rounded Top) */}
        <div className="relative z-30 bg-[#FCFBF8] rounded-t-[32px] xs:rounded-t-[38px] -mt-5 border-t border-[#292d27]/10 shadow-[0_-12px_40px_rgba(40,45,35,0.08),inset_0_1px_0_0_rgba(255,255,255,0.95)] px-4 xs:px-6 pt-5 xs:pt-6 pb-6">
          
          {/* Doctor & Clinic Information */}
          <div className="text-left">
            <h2 className="font-['Playfair_Display',Georgia,serif] text-[18px] xs:text-[20px] sm:text-[22px] font-bold leading-tight tracking-tight text-[#1a221b]">
              Dr. Pramod &amp; Dr. Priyanka Shingare
            </h2>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="text-[9.5px] xs:text-[10.5px] font-mono font-bold tracking-[0.2em] text-[#873f3b] uppercase">
                CLINICAL AESTHETICS
              </span>
              <div className="h-[1.5px] w-6 bg-[#873f3b] rounded-full" />
            </div>
            <p className="mt-2 text-[12px] xs:text-[13px] leading-relaxed text-[#555a50]">
              Doctor-led clinical dermatology, hair restoration &amp; US FDA lasers with personalized care.
            </p>
          </div>

          {/* 4 Treatment Category Highlights with Minimal Consistent Line Icons & Hairline Dividers */}
          <div className="grid grid-cols-4 my-4 py-3 border-y border-[#292d27]/8 divide-x divide-[#292d27]/10">
            {/* 1. Skin Treatments */}
            <div className="flex flex-col items-center text-center px-1">
              <div className="w-11 h-11 xs:w-13 xs:h-13 rounded-full bg-[#f6ece4] text-[#873f3b] flex items-center justify-center shadow-xs border border-[#873f3b]/12 transition-transform active:scale-95">
                <ScanFace size={19} strokeWidth={1.8} />
              </div>
              <span className="text-[8px] xs:text-[9.5px] font-bold tracking-wider text-[#353a30] uppercase mt-1.5 leading-[1.2]">
                Skin<br />Treatments
              </span>
            </div>

            {/* 2. Hair Restoration */}
            <div className="flex flex-col items-center text-center px-1">
              <div className="w-11 h-11 xs:w-13 xs:h-13 rounded-full bg-[#f6ece4] text-[#873f3b] flex items-center justify-center shadow-xs border border-[#873f3b]/12 transition-transform active:scale-95">
                <Droplets size={19} strokeWidth={1.8} />
              </div>
              <span className="text-[8px] xs:text-[9.5px] font-bold tracking-wider text-[#353a30] uppercase mt-1.5 leading-[1.2]">
                Hair<br />Restoration
              </span>
            </div>

            {/* 3. Laser Aesthetics */}
            <div className="flex flex-col items-center text-center px-1">
              <div className="w-11 h-11 xs:w-13 xs:h-13 rounded-full bg-[#f6ece4] text-[#873f3b] flex items-center justify-center shadow-xs border border-[#873f3b]/12 transition-transform active:scale-95">
                <SunMedium size={19} strokeWidth={1.8} />
              </div>
              <span className="text-[8px] xs:text-[9.5px] font-bold tracking-wider text-[#353a30] uppercase mt-1.5 leading-[1.2]">
                Laser<br />Aesthetics
              </span>
            </div>

            {/* 4. Personalized Care */}
            <div className="flex flex-col items-center text-center px-1">
              <div className="w-11 h-11 xs:w-13 xs:h-13 rounded-full bg-[#f6ece4] text-[#873f3b] flex items-center justify-center shadow-xs border border-[#873f3b]/12 transition-transform active:scale-95">
                <HeartHandshake size={19} strokeWidth={1.8} />
              </div>
              <span className="text-[8px] xs:text-[9.5px] font-bold tracking-wider text-[#353a30] uppercase mt-1.5 leading-[1.2]">
                Personalized<br />Care
              </span>
            </div>
          </div>

          {/* Editorial Motto Divider */}
          <div className="flex items-center justify-center gap-3 my-3">
            <div className="h-[1px] w-8 xs:w-12 bg-gradient-to-r from-transparent to-[#873f3b]/40" />
            <span className="font-['Playfair_Display',Georgia,serif] italic text-[13px] xs:text-[14px] text-[#873f3b] tracking-wide select-none">
              Real Care • Visible Results
            </span>
            <div className="h-[1px] w-8 xs:w-12 bg-gradient-to-l from-transparent to-[#873f3b]/40" />
          </div>

          {/* Primary CTA: Preserving Website's Signature Obsidian Button Color & Styling */}
          <Link
            href="/book-now"
            className="w-full inline-flex min-h-[50px] xs:min-h-[54px] items-center justify-between rounded-full bg-[#292d27] hover:bg-[#1a241d] px-5 xs:px-6 py-2.5 text-white shadow-[0_12px_28px_rgba(41,45,39,0.18)] active:scale-[0.985] transition-all duration-150 group"
          >
            <div className="flex items-center gap-2.5">
              <CalendarCheck size={18} className="text-[#C5A059]" />
              <span className="text-[13.5px] xs:text-[14px] font-semibold tracking-wide">
                Book Consultation
              </span>
            </div>
            <span className="flex h-7 w-7 xs:h-8 xs:w-8 items-center justify-center rounded-full bg-white/10 group-hover:bg-white/20 text-white shadow-xs shrink-0 group-hover:translate-x-0.5 transition-all">
              <ArrowRight size={15} strokeWidth={2.4} />
            </span>
          </Link>

          {/* Subtle Secondary Exploration Link */}
          <div className="mt-3 flex items-center justify-center gap-4 text-[11px] font-medium text-[#73776b]">
            <Link
              href="#services"
              className="inline-flex items-center gap-1.5 hover:text-[#873f3b] transition-colors underline decoration-[#873f3b]/35 underline-offset-4"
            >
              <span>Explore services &amp; treatments</span>
              <ArrowDownRight size={12} />
            </Link>
          </div>
        </div>
      </motion.div>

      {/* ============================================================== */}
      {/* DESKTOP / LAPTOP HERO PRESENTATION (lg+)                       */}
      {/* 100% UNTOUCHED ORIGINAL DESKTOP LAYOUT                         */}
      {/* ============================================================== */}
      <div className="hidden lg:grid mx-auto max-w-[1440px] items-center gap-8 lg:gap-8 xl:grid-cols-[0.95fr_1.05fr] xl:gap-16 2xl:gap-20">
        {/* Left Column: Editorial Headline & Actions */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="relative z-10 w-full max-w-2xl mx-auto lg:mx-0"
        >

          {/* Clinic Brand Sub-title */}
          <div className="mb-4 sm:mb-5 flex items-center gap-2 sm:gap-3 select-none flex-wrap xs:flex-nowrap">
            <span
              style={{ fontFamily: "'Amita', serif" }}
              className="text-[22px] xs:text-[26px] sm:text-[30px] md:text-[34px] font-bold leading-none text-[#873f3b] tracking-normal"
            >
              शिनगारे
            </span>
            {/* Rich & Unique Modern Architectural Twin Luxury Bar */}
            <div className="flex items-center justify-center gap-1 sm:gap-1.5 px-0.5 sm:px-1 select-none shrink-0" aria-hidden="true">
              {/* Primary Clinic Crimson Pillar */}
              <span className="block w-[2.5px] sm:w-[3px] h-[20px] sm:h-[25px] rounded-full bg-gradient-to-b from-[#873f3b] via-[#9e4a46] to-[#873f3b] shadow-[0_1px_3px_rgba(135,63,59,0.22)]" />
              {/* Secondary Brushed Champagne Gold Accent Pillar */}
              <span className="block w-[1.5px] sm:w-[2px] h-[12px] sm:h-[15px] rounded-full bg-gradient-to-b from-[#E6CA85] via-[#C5A059] to-[#9E7B38] shadow-[0_1px_2px_rgba(197,160,89,0.25)]" />
            </div>
            <span
              style={{ fontFamily: "'Mukta', sans-serif" }}
              className="text-[9.5px] xs:text-[11px] sm:text-[12px] md:text-[12.5px] font-bold tracking-[0.16em] sm:tracking-[0.22em] text-[#4a4c44] uppercase whitespace-nowrap self-center"
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
