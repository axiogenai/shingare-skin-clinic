"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, CalendarCheck, Phone, ShieldCheck, Stethoscope } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="relative bg-[#0e787a] py-16 md:py-22 overflow-hidden text-white font-source">
      <div className="max-w-[1140px] mx-auto px-5 sm:px-6 md:px-8 relative z-10 text-center">
        {/* Top Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white/95 text-xs font-semibold uppercase tracking-widest mb-5 backdrop-blur-sm border border-white/15">
          <Stethoscope className="w-3.5 h-3.5" />
          <span>Expert Dermatological &amp; Aesthetic Care</span>
        </div>

        <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-normal leading-[1.18] mb-5 max-w-3xl mx-auto">
          Rediscover Healthy Skin, Restore{" "}
          <span className="italic text-[#FAEDDA]">Natural Confidence</span>
        </h2>

        <p className="text-white/90 text-sm sm:text-base md:text-lg font-normal max-w-2xl mx-auto mb-8 leading-relaxed">
          Take the first step toward clear, radiant skin and healthy hair. Schedule an in-person consultation with{" "}
          <strong className="font-semibold text-white">Dr. Pramod Shingare</strong> &amp;{" "}
          <strong className="font-semibold text-white">Dr. Priyanka Shingare</strong> in Peth Vadgaon.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <Link
            href="/book-now"
            className="inline-flex items-center gap-2.5 bg-white hover:bg-[#FAEDDA] text-[#0e787a] px-7 py-3.5 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider transition-all active:scale-95 shadow-md cursor-pointer"
          >
            <CalendarCheck className="w-4 h-4 text-[#0e787a]" />
            <span>Book Consultation Token</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <a
            href="tel:+917249727104"
            className="inline-flex items-center gap-2.5 bg-white/10 hover:bg-white/20 border border-white/30 text-white px-6 py-3.5 rounded-full font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all active:scale-95 backdrop-blur-sm cursor-pointer"
          >
            <Phone className="w-4 h-4" />
            <span>Call: +91 72497 27104</span>
          </a>
        </div>

        {/* Doctor Credential Line */}
        <div className="flex items-center justify-center gap-2 text-xs text-white/80 font-normal">
          <ShieldCheck className="w-4 h-4 text-[#FAEDDA]" />
          <span>MMC Reg. No. I-87218-A • Council Reg. No. 73338 • OPD Mon – Sat</span>
        </div>
      </div>
    </section>
  );
}
