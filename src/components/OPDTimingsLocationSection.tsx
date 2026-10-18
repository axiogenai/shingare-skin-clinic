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
          {/* Main Map Card Container */}
          <div className="relative w-full max-w-[370px] sm:max-w-[420px] aspect-square select-none group">
            {/* Base Photorealistic Transparent Card Asset (No Outer Background, 100% Squircle Cutout) */}
            <img
              src="/images/clinic-map-cutout.png"
              alt="Shingare Skin Clinic Location Map - Peth Vadgaon, Kolhapur"
              className="w-full h-full object-contain pointer-events-none drop-shadow-[0_20px_45px_rgba(28,48,34,0.14)]"
            />

            {/* Live Interactive Pulse Wave over Clinic Pin (Works reliably on mobile & PC) */}
            <div className="absolute top-[34.8%] left-[53.2%] -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center">
              {/* Concentric Expanding Radar Wave 1 */}
              <span className="absolute w-12 h-12 rounded-full border-2 border-[#8C231F] bg-[#8C231F]/20 map-radar-wave-1" />
              {/* Concentric Expanding Radar Wave 2 */}
              <span className="absolute w-12 h-12 rounded-full border-2 border-[#8C231F] bg-[#8C231F]/15 map-radar-wave-2" />
              {/* Luminous Core Beacon Point */}
              <span className="relative w-3.5 h-3.5 rounded-full bg-[#8C231F] border-2 border-white map-beacon-core shadow-[0_0_10px_rgba(140,35,31,0.9)]" />
            </div>

            {/* Interactive Clickable Area: OPEN IN MAPS Button */}
            <a
              href="https://maps.google.com/?q=Shingare+Skin+Clinic+Peth+Vadgaon+Kolhapur"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Shingare Skin Clinic in Google Maps"
              className="absolute bottom-[3%] left-[12%] w-[54%] h-[12.5%] rounded-full cursor-pointer hover:bg-black/5 active:scale-[0.98] transition-all"
            />

            {/* Interactive Clickable Area: Bottom-Right Directional Dial */}
            <a
              href="https://maps.google.com/?q=Shingare+Skin+Clinic+Peth+Vadgaon+Kolhapur"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get Directions to Clinic"
              className="absolute bottom-[2%] right-[3%] w-[19%] h-[19%] rounded-full cursor-pointer hover:bg-black/5 active:scale-95 transition-all"
            />

            {/* Interactive Clickable Area: Top-Right Zoom In */}
            <button
              type="button"
              aria-label="Zoom In"
              onClick={() => window.open("https://maps.google.com/?q=Shingare+Skin+Clinic+Peth+Vadgaon+Kolhapur", "_blank")}
              className="absolute top-[23%] right-[5%] w-[8.5%] h-[8.5%] rounded-full cursor-pointer hover:bg-black/5 active:scale-90 transition-all"
            />

            {/* Interactive Clickable Area: Top-Right Zoom Out */}
            <button
              type="button"
              aria-label="Zoom Out"
              onClick={() => window.open("https://maps.google.com/?q=Shingare+Skin+Clinic+Peth+Vadgaon+Kolhapur", "_blank")}
              className="absolute top-[32%] right-[5%] w-[8.5%] h-[8.5%] rounded-full cursor-pointer hover:bg-black/5 active:scale-90 transition-all"
            />

            {/* Interactive Clickable Area: Top-Right Target/Locate */}
            <button
              type="button"
              aria-label="Locate Clinic"
              onClick={() => window.open("https://maps.google.com/?q=Shingare+Skin+Clinic+Peth+Vadgaon+Kolhapur", "_blank")}
              className="absolute top-[41%] right-[5%] w-[8.5%] h-[8.5%] rounded-full cursor-pointer hover:bg-black/5 active:scale-90 transition-all"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
