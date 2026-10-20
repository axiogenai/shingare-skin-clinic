"use client";

import React from "react";
import Link from "next/link";
import {
  Clock,
  MapPin,
  Phone,
  ArrowRight,
  ArrowUpRight,
  Navigation,
  Crosshair,
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
          <div className="max-w-[560px] w-full">
            {/* Main Editorial Heading */}
            <h2 className="font-['Cormorant_Garamond',Georgia,serif] text-[22px] xs:text-[28px] sm:text-4xl md:text-5xl lg:text-[52px] font-medium leading-tight tracking-[-0.015em] mb-4 whitespace-nowrap">
              <span className="text-[#23382b]">Your next step </span>
              <span className="italic text-[#9b6863]">starts here.</span>
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
                href="https://maps.app.goo.gl/YPQr9D8QJxFZgrrq8"
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

        {/* Right Panel: Exact Reference Map Card Widget */}
        <div className="px-4 sm:px-8 md:px-12 lg:px-14 py-8 sm:py-12 flex items-center justify-center relative overflow-hidden">
          {/* Main Map Card Container: Real Interactive Google Map Inside Luxury Squircle Frame */}
          <div className="relative w-full max-w-[370px] sm:max-w-[420px] aspect-[450/454] rounded-[30px] sm:rounded-[36px] overflow-hidden border border-[#23382b]/20 shadow-[0_20px_45px_rgba(28,48,34,0.16)] bg-[#f7f5f0] select-none group">
            {/* Real Interactive Google Maps Location Embed (Clean coordinates without business card popup) */}
            <iframe
              title="Shingare Skin and Cosmetic Clinic Location"
              src="https://maps.google.com/maps?q=16.8378,74.3142&t=&z=17&ie=UTF8&iwloc=&output=embed"
              className="w-full border-0 absolute"
              style={{ top: "-68px", left: "0", width: "100%", height: "calc(100% + 68px)" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Top-Left Luxury Glass Pill: CLINIC LOCATION (Exact Reference Match) */}
            <div className="absolute top-3.5 left-3.5 z-10 inline-flex items-center gap-2 bg-[#FAF5EC]/96 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/85 shadow-[0_2px_12px_rgba(0,0,0,0.08)] pointer-events-none">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1B4332] shrink-0" />
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.14em] text-[#234533] uppercase font-sans">
                CLINIC LOCATION
              </span>
            </div>



            {/* Full-Bottom Curved Luxury Sheet: Peth Vadgaon + OPEN IN MAPS (Unique Full-Bottom Curve) */}
            <div className="absolute bottom-0 left-0 right-0 z-10 rounded-t-[32px] sm:rounded-t-[36px] bg-[#f8f6f0]/96 backdrop-blur-xl border-t border-white/95 px-4 sm:px-5 pt-3 pb-4 sm:pb-4.5 shadow-[0_-10px_35px_rgba(20,40,25,0.14)] flex flex-col gap-2.5">
              {/* Subtle Luxury Pull / Accent Indicator */}
              <div className="w-8 h-1 rounded-full bg-[#1b4332]/20 mx-auto -mt-0.5" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-[#1b4332]/10 border border-[#1b4332]/10 flex items-center justify-center shrink-0 text-[#1b4332]">
                    <MapPin className="w-4 h-4 stroke-[2]" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-serif font-bold text-sm sm:text-base text-[#1b4332] tracking-tight truncate leading-tight">
                      Peth Vadgaon
                    </h3>
                    <p className="text-[9.5px] sm:text-[10px] font-mono tracking-[0.14em] text-[#52796f] uppercase">
                      KOLHAPUR • MAHARASHTRA
                    </p>
                  </div>
                </div>

                {/* Compass Dial Indicator */}
                <a
                  href="https://maps.app.goo.gl/YPQr9D8QJxFZgrrq8"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Get Directions to Clinic"
                  className="w-8 h-8 rounded-full bg-[#1b4332]/10 hover:bg-[#1b4332]/15 border border-[#1b4332]/10 flex items-center justify-center shrink-0 text-[#1b4332] transition-colors active:scale-95 shadow-xs"
                >
                  <Navigation className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2]" />
                </a>
              </div>

              {/* Exact "OPEN IN MAPS" Tactile Luxury Button */}
              <a
                href="https://maps.app.goo.gl/YPQr9D8QJxFZgrrq8"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Shingare Skin Clinic in Google Maps"
                className="w-full rounded-full bg-[#173829] hover:bg-[#1c4432] text-white flex items-center justify-between px-3.5 sm:px-4 py-2 sm:py-2.5 shadow-[0_4px_18px_rgba(18,48,34,0.35),inset_0_1px_0_rgba(255,255,255,0.22)] active:scale-[0.985] transition-all cursor-pointer group/btn select-none"
              >
                <div className="flex items-center gap-2 min-w-0">
                  {/* Official Google Maps Multi-Color Pin Icon */}
                  <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0 drop-shadow-xs" aria-hidden="true">
                    <path fill="#4285F4" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                    <path fill="#EA4335" d="M12 2C8.13 2 5 5.13 5 9c0 2.5 1.5 5.5 3.5 8l3.5-8V2z" />
                    <path fill="#FBBC04" d="M8.5 17c1 1.2 2 2.7 3.5 5 0 0 1.2-1.3 2.5-3l-2.5-4-3.5 2z" />
                    <path fill="#34A853" d="M14.5 19c1.5-2 3.5-5 4-7.5-1 2.5-2.5 5.5-4 7.5z" />
                    <circle fill="#FFFFFF" cx="12" cy="9" r="2.5" />
                  </svg>
                  <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.12em] text-white uppercase font-sans truncate">
                    OPEN IN MAPS
                  </span>
                </div>
                <div className="w-5 h-5 rounded-full bg-black/25 flex items-center justify-center shrink-0 group-hover/btn:bg-black/35 transition-colors">
                  <ArrowRight className="w-3 h-3 text-white stroke-[2.2]" />
                </div>
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
