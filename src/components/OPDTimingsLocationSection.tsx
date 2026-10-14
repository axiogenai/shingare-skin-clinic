"use client";

import React from "react";
import Link from "next/link";
import {
  Clock,
  MapPin,
  Phone,
  ArrowRight,
  ArrowUpRight,
  Leaf,
} from "lucide-react";

export default function OPDTimingsLocationSection() {
  return (
    <section id="opd-timings" className="relative w-full select-none">
      {/* Centered Pill Badge Label at Top (Centered in middle above panels, perfectly blended) */}
      <div className="w-full pt-6 pb-4 sm:pt-8 sm:pb-6 flex justify-center items-center">
        <div className="inline-flex items-center gap-2 bg-[#FAF0DD] text-[#244231] text-[11px] sm:text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider border border-[#E8DCBE] shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#244231]" />
          <span>VISIT OUR CLINIC</span>
        </div>
      </div>

      {/* Both Panels Unified with Same Background & Crisp Middle Divider */}
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
        {/* Left Panel: Information & Actions */}
        <div className="border-b lg:border-b-0 lg:border-r border-[#c8d4c5] px-6 sm:px-12 md:px-16 lg:px-20 py-10 sm:py-14 flex flex-col justify-center">
          <div className="max-w-[460px] w-full">
            {/* Main Editorial Heading */}
            <h2 className="font-['Cormorant_Garamond',serif] text-4xl sm:text-5xl lg:text-[52px] font-normal leading-[1.08] tracking-[-0.01em] mb-4">
              <span className="block text-[#23382b]">Your next step</span>
              <span className="block italic text-[#9b6863]">starts here.</span>
            </h2>

            {/* Subtitle / Description */}
            <p className="text-xs sm:text-[13.5px] leading-relaxed text-[#5c6e62] mb-7 font-sans">
              Visit Shingare Skin &amp; Cosmetics Clinic in Peth Vadgaon, Kolhapur.
              Call the clinic if you need help choosing a suitable appointment.
            </p>

            {/* Contact / Clinic Info Rows - Internal Dividers Preserved */}
            <div className="border-t border-b border-[#d2dcd0] divide-y divide-[#d2dcd0] mb-7">
              {/* Row 1: Phone */}
              <a
                href="tel:+917249727104"
                className="group flex items-center justify-between py-3.5 transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-[#dde5db] border border-[#cbd6c8] flex items-center justify-center text-[#2f513f] shrink-0">
                    <Phone className="w-3.5 h-3.5 stroke-[1.75]" />
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold tracking-[0.14em] uppercase text-[#768678]">
                      Call the clinic
                    </div>
                    <div className="text-xs sm:text-[13px] font-medium text-[#23382b] group-hover:text-[#2f513f] transition-colors">
                      +91 72497 27104
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#768678] group-hover:text-[#23382b] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              {/* Row 2: OPD Hours */}
              <div className="flex items-center gap-3.5 py-3.5">
                <div className="w-8 h-8 rounded-full bg-[#dde5db] border border-[#cbd6c8] flex items-center justify-center text-[#2f513f] shrink-0">
                  <Clock className="w-3.5 h-3.5 stroke-[1.75]" />
                </div>
                <div>
                  <div className="text-[10px] font-semibold tracking-[0.14em] uppercase text-[#768678]">
                    OPD Hours
                  </div>
                  <div className="text-xs sm:text-[13px] font-medium text-[#23382b]">
                    Mon–Sat : 10:00–13:30 &amp; 17:00–21:00
                  </div>
                </div>
              </div>

              {/* Row 3: Clinic Location */}
              <div className="flex items-center gap-3.5 py-3.5">
                <div className="w-8 h-8 rounded-full bg-[#dde5db] border border-[#cbd6c8] flex items-center justify-center text-[#2f513f] shrink-0">
                  <MapPin className="w-3.5 h-3.5 stroke-[1.75]" />
                </div>
                <div>
                  <div className="text-[10px] font-semibold tracking-[0.14em] uppercase text-[#768678]">
                    Clinic Location
                  </div>
                  <div className="text-xs sm:text-[13px] font-medium text-[#23382b]">
                    Peth Vadgaon, Kolhapur, Maharashtra
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-5 sm:gap-6">
              <Link
                href="/book-now"
                className="inline-flex items-center gap-2 bg-[#2f513f] hover:bg-[#254233] text-white text-xs sm:text-[13px] font-medium px-5 py-2.5 sm:px-6 sm:py-3 rounded-full shadow-md shadow-[#2f513f]/25 hover:shadow-lg transition-all active:scale-95"
              >
                <span>Request appointment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <a
                href="https://maps.google.com/?q=Shingare+Skin+Clinic+Peth+Vadgaon+Kolhapur"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-medium text-[#23382b] hover:text-[#2f513f] transition-colors group"
              >
                <span>Get directions</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#768678] group-hover:text-[#23382b] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Panel: Arched Map Graphic (Same Unified Background, Middle Line Intact) */}
        <div className="px-6 sm:px-12 md:px-16 lg:px-20 py-10 sm:py-14 flex items-center justify-center relative overflow-hidden">
          {/* Arched Architectural Map Card */}
          <div className="relative w-full max-w-[290px] sm:max-w-[310px] h-[310px] sm:h-[330px] rounded-t-[145px] sm:rounded-t-[155px] rounded-b-2xl bg-[#edf3eb] border border-[#cbd5c8] shadow-[0_12px_32px_rgba(35,55,42,0.06)] overflow-hidden flex flex-col items-center justify-center p-6 text-center">
            {/* SVG Decorative Architectural Map Grid */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 310 330"
              fill="none"
              preserveAspectRatio="none"
            >
              <circle cx="65" cy="110" r="48" fill="#d8e3d6" opacity="0.85" />
              <circle cx="250" cy="225" r="58" fill="#d8e3d6" opacity="0.85" />

              <line x1="-30" y1="200" x2="340" y2="90" stroke="#c4d0c1" strokeWidth="2.2" />
              <line x1="-30" y1="240" x2="340" y2="130" stroke="#c4d0c1" strokeWidth="2.2" />
              <line x1="-30" y1="130" x2="340" y2="20" stroke="#c4d0c1" strokeWidth="2.2" />
              <line x1="-30" y1="300" x2="340" y2="190" stroke="#c4d0c1" strokeWidth="2.2" />

              <line x1="80" y1="-20" x2="20" y2="350" stroke="#c4d0c1" strokeWidth="2.2" />
              <line x1="160" y1="-20" x2="90" y2="350" stroke="#c4d0c1" strokeWidth="2.2" />
              <line x1="240" y1="-20" x2="170" y2="350" stroke="#c4d0c1" strokeWidth="2.2" />
              <line x1="310" y1="-20" x2="250" y2="350" stroke="#c4d0c1" strokeWidth="2.2" />

              <line x1="110" y1="55" x2="190" y2="115" stroke="#c4d0c1" strokeWidth="1.8" />
              <line x1="60" y1="170" x2="130" y2="230" stroke="#c4d0c1" strokeWidth="1.8" />
              <line x1="180" y1="190" x2="270" y2="260" stroke="#c4d0c1" strokeWidth="1.8" />
              <line x1="20" y1="85" x2="90" y2="135" stroke="#c4d0c1" strokeWidth="1.8" />
            </svg>

            {/* Map Center Marker & Details */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#2f513f] flex items-center justify-center text-white shadow-lg shadow-[#2f513f]/30 ring-8 ring-[#2f513f]/12 mb-2.5">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>

              <div className="text-xs sm:text-[13px] font-bold tracking-[0.18em] uppercase text-[#23382b] font-mono">
                PETH VADGAON
              </div>

              <div className="text-[9px] sm:text-[10px] font-medium tracking-[0.22em] uppercase text-[#6f7f72] font-mono mt-0.5">
                KOLHAPUR • MAHARASHTRA
              </div>

              <a
                href="https://maps.google.com/?q=Shingare+Skin+Clinic+Peth+Vadgaon+Kolhapur"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 hover:bg-white text-[#23382b] border border-[#cad5c7] text-[11px] font-medium shadow-sm hover:shadow transition-all group"
              >
                <span>Open in Maps</span>
                <ArrowUpRight className="w-3 h-3 text-[#768678] group-hover:text-[#23382b] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          {/* Floating Pill Badge: Bottom Right */}
          <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-6 lg:bottom-5 lg:right-8 inline-flex items-center gap-2 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#cbd5c8] shadow-xs select-none">
            <Leaf className="w-3.5 h-3.5 text-[#2f513f]" />
            <span className="text-[10px] sm:text-[11px] text-[#556758] font-normal tracking-wide">
              Personalised care, rooted in listening.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
