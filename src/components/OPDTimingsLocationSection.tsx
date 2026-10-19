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
                <div className="relative w-8 h-8 rounded-full bg-[#dde5db] border border-[#cbd6c8] flex items-center justify-center text-[#2f513f] shrink-0">
                  <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8C231F] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8C231F]" />
                  </span>
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

        {/* Right Panel: Exact Reference Map Card Widget */}
        <div className="px-4 sm:px-8 md:px-12 lg:px-14 py-8 sm:py-12 flex items-center justify-center relative overflow-hidden">
          {/* Main Map Card Container (Exact 450/454 aspect ratio so overlays align 100% on mobile and PC) */}
          <div className="relative w-full max-w-[370px] sm:max-w-[420px] aspect-[450/454] select-none group">
            {/* Base Photorealistic Transparent Card Asset (No Outer Background, 100% Squircle Cutout) */}
            <img
              src="/images/clinic-map-cutout.png"
              alt="Shingare Skin Clinic Location Map - Peth Vadgaon, Kolhapur"
              className="w-full h-full object-contain pointer-events-none drop-shadow-[0_20px_45px_rgba(28,48,34,0.14)]"
            />

            {/* Single Clinic Pin Smooth Pulse Halo - Mathematically Centered at (55.13%, 34.62%), 100% Mobile & PC Support */}
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center"
              style={{ top: "34.62%", left: "55.13%" }}
            >
              {/* Expanding Pulse Ring 1 - Refined hairline ring, zero artificial dots */}
              <span className="absolute w-11 h-11 rounded-full border border-[#8C231F]/55 bg-[#8C231F]/20 clinic-pulse-ring-1" />
              {/* Expanding Pulse Ring 2 */}
              <span className="absolute w-11 h-11 rounded-full border border-[#8C231F]/40 bg-[#8C231F]/15 clinic-pulse-ring-2" />
            </div>

            <style>{`
              @keyframes clinic-pin-pulse {
                0% {
                  transform: scale(0.65);
                  -webkit-transform: scale(0.65);
                  opacity: 0.95;
                }
                60% {
                  opacity: 0.45;
                }
                100% {
                  transform: scale(2.35);
                  -webkit-transform: scale(2.35);
                  opacity: 0;
                }
              }
              @-webkit-keyframes clinic-pin-pulse {
                0% {
                  -webkit-transform: scale(0.65);
                  transform: scale(0.65);
                  opacity: 0.95;
                }
                60% {
                  opacity: 0.45;
                }
                100% {
                  -webkit-transform: scale(2.35);
                  transform: scale(2.35);
                  opacity: 0;
                }
              }
              .clinic-pulse-ring-1 {
                animation: clinic-pin-pulse 2.2s cubic-bezier(0.2, 0.8, 0.3, 1) infinite !important;
                -webkit-animation: clinic-pin-pulse 2.2s cubic-bezier(0.2, 0.8, 0.3, 1) infinite !important;
                will-change: transform, opacity;
                transform-origin: center center;
                -webkit-transform-origin: center center;
              }
              .clinic-pulse-ring-2 {
                animation: clinic-pin-pulse 2.2s cubic-bezier(0.2, 0.8, 0.3, 1) 1.1s infinite !important;
                -webkit-animation: clinic-pin-pulse 2.2s cubic-bezier(0.2, 0.8, 0.3, 1) 1.1s infinite !important;
                will-change: transform, opacity;
                transform-origin: center center;
                -webkit-transform-origin: center center;
              }
            `}</style>

            {/* Exact "OPEN IN MAPS" Tactile Luxury Button - Fully Covers Background Button */}
            <a
              href="https://maps.google.com/?q=Shingare+Skin+Clinic+Peth+Vadgaon+Kolhapur"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Shingare Skin Clinic in Google Maps"
              style={{ left: "5.8%", top: "85.8%", width: "58.2%", height: "12.0%" }}
              className="absolute rounded-full bg-[#173829] hover:bg-[#1c4432] text-white flex items-center justify-between px-3 sm:px-4 shadow-[0_4px_18px_rgba(18,48,34,0.4),inset_0_1px_0_rgba(255,255,255,0.22)] active:scale-[0.98] transition-all cursor-pointer group/btn select-none"
            >
              <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                {/* Official Google Maps Multi-Color Pin Icon */}
                <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-[17px] sm:h-[17px] shrink-0 drop-shadow-xs" aria-hidden="true">
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
              <div className="w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-full bg-black/25 flex items-center justify-center shrink-0 group-hover/btn:bg-black/35 transition-colors">
                <ArrowRight className="w-3 h-3 text-white stroke-[2.2]" />
              </div>
            </a>

            {/* Interactive Clickable Area: Bottom-Right Directional Dial */}
            <a
              href="https://maps.google.com/?q=Shingare+Skin+Clinic+Peth+Vadgaon+Kolhapur"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get Directions to Clinic"
              className="absolute bottom-[2%] right-[3%] w-[19%] h-[19%] rounded-full cursor-pointer hover:bg-black/5 active:scale-95 transition-all"
            />

          </div>
        </div>
      </div>
    </section>
  );
}
