"use client";

import React from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, CalendarCheck, ShieldCheck, Stethoscope } from "lucide-react";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

interface HeroBannerProps {
  title: string;
  subtitle?: string;
  badge?: string;
}

export function HeroBanner({ title, subtitle, badge }: HeroBannerProps) {
  return (
    <section
      className="relative w-full pt-28 md:pt-32 pb-20 md:pb-28 overflow-hidden font-source"
      style={{
        background:
          "linear-gradient(160deg, #FDF5EE 0%, #FAEAE0 35%, #F5E2D4 65%, #F0DAC8 100%)",
      }}
    >
      {/* Decorative silk ribbon watermark */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(248,178,148,0.13) 0%, transparent 70%)",
        }}
      />

      <motion.div
        className="relative z-10 max-w-[860px] mx-auto text-center px-5 sm:px-6"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {badge && (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md text-[#873f3b] text-[10px] font-bold uppercase tracking-[0.2em] mb-5 border border-[#873f3b]/18 shadow-xs">
            <Stethoscope className="w-3 h-3 text-[#873f3b]" />
            <span>{badge}</span>
          </div>
        )}

        <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-normal leading-[1.12] text-gray-950 mb-5 tracking-tight">
          {title}
        </h1>

        {subtitle && (
          <p className="font-playfair text-base sm:text-lg md:text-xl italic text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
      </motion.div>

      {/* Smooth wave into content */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-[32px] md:h-[48px]"
        >
          <path d="M0 20 Q360 0 720 28 Q1080 56 1440 12 L1440 60 L0 60 Z" fill="#F4F7F8" />
        </svg>
      </div>
    </section>
  );
}

interface CTABannerProps {
  heading?: string;
  text?: string;
  buttonText?: string;
  buttonHref?: string;
}

export function CTABanner({
  heading = "Begin Your Skin & Hair Journey at Shingare Clinic",
  text = "Experience personalized, evidence-based dermatological care. Reserve your appointment token at Shingare Skin & Cosmetics Clinic, Peth Vadgaon today.",
  buttonText = "Book Your Appointment Token",
  buttonHref = "/book-now",
}: CTABannerProps) {
  return (
    <section className="w-full py-16 md:py-20 px-5 sm:px-6 md:px-8 font-source bg-white">
      <motion.div
        className="max-w-[1140px] mx-auto bg-[#108283] text-white py-14 px-6 sm:px-12 md:px-16 text-center rounded-3xl shadow-[0_12px_40px_rgba(16,130,131,0.25)] relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 text-white/90 text-xs font-semibold uppercase tracking-widest mb-5 backdrop-blur-sm border border-white/20">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
          <span>Clinical Excellence • MMC Registered</span>
        </div>

        <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal mb-5 leading-tight max-w-2xl mx-auto">
          {heading}
        </h2>

        <p className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed mb-8 max-w-2xl mx-auto font-light">
          {text}
        </p>

        <Link
          href={buttonHref}
          className="inline-flex items-center gap-2.5 bg-white hover:bg-[#FAEDDA] text-[#108283] font-bold text-sm sm:text-base px-8 py-3.5 rounded-full transition-all shadow-lg active:scale-95 cursor-pointer"
        >
          <CalendarCheck className="w-4 h-4 text-[#108283]" />
          <span>{buttonText}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </section>
  );
}

export function LeafDivider() {
  return (
    <div className="flex items-center justify-center my-6">
      <div className="w-12 h-0.5 bg-[#108283]/30 rounded-full" />
      <div className="w-2 h-2 rounded-full bg-[#108283] mx-2" />
      <div className="w-12 h-0.5 bg-[#108283]/30 rounded-full" />
    </div>
  );
}
