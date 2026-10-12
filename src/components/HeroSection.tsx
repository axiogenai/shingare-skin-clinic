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
  Sparkles,
  Stethoscope,
} from "lucide-react";

const carePoints = [
  { icon: ScanFace, label: "Skin diagnostics" },
  { icon: Sparkles, label: "Hair & aesthetics" },
  { icon: Stethoscope, label: "Doctor-led care" },
];

export default function HeroSection() {
  return (
    <section
      id="hero"
      aria-labelledby="homepage-hero-title"
      className="relative isolate overflow-hidden bg-[#f4f0e8] px-5 pb-8 pt-24 text-[#252923] sm:px-8 sm:pt-28 lg:px-12 lg:pb-10 lg:pt-28"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-28 top-8 h-72 w-72 rounded-full bg-[#c8d3c1]/60 blur-3xl sm:h-[28rem] sm:w-[28rem]" />
        <div className="absolute right-[-8rem] top-20 h-80 w-80 rounded-full bg-[#e7cfc5]/65 blur-3xl sm:h-[36rem] sm:w-[36rem]" />
        <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(62,70,57,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(62,70,57,.08)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      </div>

      <div className="mx-auto grid max-w-[1440px] items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12 xl:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="relative z-10 max-w-2xl"
        >
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/55 px-4 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,.95),0_8px_28px_rgba(56,63,49,.06)] backdrop-blur-xl">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7e423e] opacity-35" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#7e423e]" />
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[.2em] text-[#555d4d] sm:text-[11px]">
              Skin · Hair · Clinical Aesthetics
            </span>
          </div>

          <div className="mb-5 flex items-center gap-3">
            <span className="font-['Amita',serif] text-3xl font-bold leading-none text-[#873f3b] sm:text-4xl">शिंगारे</span>
            <span className="h-px w-10 bg-[#873f3b]/40" />
            <span className="text-[9px] font-bold tracking-[.22em] text-[#68685d] sm:text-[10px]">SKIN & COSMETICS</span>
          </div>

          <h1
            id="homepage-hero-title"
            className="max-w-[760px] font-['Cormorant_Garamond',Georgia,serif] text-[clamp(3.6rem,8vw,7.5rem)] font-normal leading-[.88] tracking-[-.055em] text-[#272b25]"
          >
            Your skin, <span className="italic text-[#7e423e]">in expert</span>
            <br className="hidden sm:block" /> hands.
          </h1>

          <p className="mt-7 max-w-xl text-[15px] leading-7 text-[#64675d] sm:text-[17px] sm:leading-8">
            Thoughtful dermatology, hair care and aesthetic treatments — with clear guidance, personalised plans and care centred around you.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/book-now"
              className="group inline-flex min-h-[54px] items-center justify-center gap-3 rounded-2xl bg-[#292d27] px-6 text-[12px] font-semibold tracking-[.04em] text-white shadow-[0_12px_30px_rgba(35,40,32,.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#7e423e] hover:shadow-[0_16px_34px_rgba(126,66,62,.22)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7e423e]"
            >
              <CalendarCheck size={17} />
              Book a consultation
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href="#services"
              className="group inline-flex min-h-[54px] items-center justify-center gap-2 rounded-2xl border border-white/90 bg-white/45 px-6 text-[12px] font-semibold text-[#353a31] shadow-[inset_0_1px_0_rgba(255,255,255,.95),0_8px_24px_rgba(46,51,41,.05)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:bg-white/75"
            >
              Explore treatments
              <ArrowDownRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </Link>
          </div>

          <div className="mt-9 flex flex-wrap gap-x-5 gap-y-3 border-t border-[#6c715f]/15 pt-5">
            {carePoints.map(({ icon: Icon, label }) => (
              <span key={label} className="inline-flex items-center gap-2 text-[11px] font-medium text-[#5f6459] sm:text-xs">
                <Icon size={15} strokeWidth={1.7} className="text-[#7e423e]" />
                {label}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.12, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-[680px] lg:ml-auto"
        >
          <div aria-hidden="true" className="absolute inset-x-[9%] bottom-[3%] top-[5%] rounded-[48%] border border-white/70 bg-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,.8)] backdrop-blur-[2px]" />
          <div className="relative mx-auto aspect-[.91] w-full max-w-[620px] overflow-hidden rounded-[48%_48%_2rem_2rem] border border-white/80 bg-gradient-to-br from-[#e4e2d7] via-[#eee5dc] to-[#d4dbce] shadow-[inset_0_1px_0_rgba(255,255,255,.95),0_32px_90px_rgba(56,57,46,.14)] sm:aspect-[1.02] lg:aspect-[.91]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_18%,rgba(255,255,255,.75),transparent_32%),linear-gradient(145deg,rgba(245,240,231,.2),rgba(117,130,105,.22))]" />
            <Image
              src="/girl-latest.png"
              alt="Portrait representing skin and cosmetic care at Shingare Skin & Cosmetics Clinic"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 48vw"
              className="relative z-[1] object-contain object-bottom drop-shadow-[0_18px_30px_rgba(42,43,35,.13)]"
            />
            <div className="absolute inset-x-0 bottom-0 z-[2] h-1/3 bg-gradient-to-t from-[#d8d7c9]/75 to-transparent" />
          </div>

          <div className="absolute -left-1 top-[14%] hidden max-w-[220px] rounded-2xl border border-white/80 bg-white/55 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,.95),0_16px_44px_rgba(52,57,45,.1)] backdrop-blur-2xl sm:block lg:-left-7">
            <div className="mb-2 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[.16em] text-[#7e423e]">
              <CheckCircle2 size={14} /> Personalised care
            </div>
            <p className="font-['Cormorant_Garamond',Georgia,serif] text-xl leading-tight text-[#2c3029]">A plan made for you.</p>
            <p className="mt-1 text-[10px] leading-4 text-[#6c6e64]">Care guided by consultation, not guesswork.</p>
          </div>

          <div className="absolute -bottom-3 right-1 z-10 flex items-center gap-3 rounded-2xl border border-white/80 bg-[#fbfaf6]/80 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,.95),0_18px_45px_rgba(52,57,45,.12)] backdrop-blur-2xl sm:right-0 sm:px-5 sm:py-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8e7dc] text-[#7e423e] shadow-[inset_2px_2px_5px_rgba(100,100,80,.12),inset_-2px_-2px_5px_rgba(255,255,255,.9)]">
              <MapPin size={18} />
            </span>
            <span>
              <span className="block text-[9px] font-bold uppercase tracking-[.16em] text-[#77796f]">Find our clinic</span>
              <span className="mt-0.5 block text-xs font-semibold text-[#2d312a] sm:text-sm">Peth Vadgaon, Kolhapur</span>
            </span>
          </div>
        </motion.div>
      </div>

      <div className="mx-auto mt-14 flex max-w-[1440px] items-center justify-between border-t border-[#6c715f]/15 pt-5 text-[9px] font-semibold uppercase tracking-[.16em] text-[#77796f] sm:text-[10px]">
        <span>Clinical knowledge. Human care.</span>
        <span className="hidden items-center gap-2 sm:inline-flex"><span className="h-px w-8 bg-[#7e423e]/60" /> Scroll to explore</span>
      </div>
    </section>
  );
}
