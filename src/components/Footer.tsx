"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail } from "lucide-react";

export default function Footer() {
  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Treatments", href: "/treatments" },
    { label: "Live Queue", href: "/live-queue" },
    { label: "Book Token", href: "/book-now" },
    { label: "Contact", href: "/contact" },
  ];

  const services = [
    { label: "Skin Care", href: "/skin" },
    { label: "Hair & PRP", href: "/hair" },
    { label: "Cosmetics", href: "/cosmetics" },
    { label: "Laser Treatments", href: "/treatments" },
    { label: "Aesthetic Care", href: "/treatments" },
    { label: "Book Consultation", href: "/book-now" },
  ];

  return (
    <footer className="w-full relative overflow-hidden bg-[#FAF6F0] text-[#1b3425] print:hidden select-none">
      {/* Background Organic Ambient Curves */}
      <div className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden">
        <svg
          viewBox="0 0 1440 600"
          className="w-full h-full object-cover"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M -100,200 Q 300,50 700,250 T 1540,120 L 1540,600 L -100,600 Z"
            fill="#F2ECE0"
          />
          <path
            d="M -100,400 Q 400,280 800,420 T 1540,320 L 1540,600 L -100,600 Z"
            fill="#ECE4D4"
            opacity="0.4"
          />
        </svg>
      </div>

      {/* Top Right Floating Seal: Glow Naturally */}
      <div className="hidden sm:block absolute top-8 right-6 sm:top-10 sm:right-12 lg:top-12 lg:right-20 pointer-events-none z-20">
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
          {/* Outer Organic Hairline Contour */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" fill="none">
            <path
              d="M 50,4 C 76,3 94,18 96,48 C 98,76 78,94 50,96 C 20,98 4,78 4,50 C 4,22 22,5 50,4 Z"
              stroke="#244231"
              strokeWidth="0.8"
              opacity="0.3"
            />
            {/* Inner Organic Pebble */}
            <path
              d="M 50,11 C 71,10 87,23 88,48 C 89,72 73,87 50,89 C 27,91 12,74 13,50 C 14,25 29,12 50,11 Z"
              fill="#FAF7F2"
              stroke="#244231"
              strokeWidth="0.8"
              opacity="0.95"
            />
          </svg>
          <div className="relative flex flex-col items-center justify-center text-center">
            <svg className="w-3.5 h-3.5 text-[#244231] mb-0.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2-8 2C3 5 3 15 3 15s0-1 .35-1.5C4.65 11.5 8 11 17 8Z" />
            </svg>
            <span className="font-['Cormorant_Garamond',serif] italic text-base sm:text-lg text-[#183324] leading-none">
              Glow
            </span>
            <span className="font-['Cormorant_Garamond',serif] text-xs sm:text-sm text-[#183324] leading-none mt-1">
              Naturally
            </span>
          </div>
        </div>
      </div>

      {/* ── Ornamental Top Divider ── */}
      <div className="w-full flex items-center px-4 sm:px-10 lg:px-16 pt-5 sm:pt-10 relative z-20">
        <div className="flex-1 h-px bg-[#D6CEBC]" />
        <div className="mx-3 sm:mx-4 flex items-center gap-1.5 sm:gap-2 text-[#7A6E5A]">
          <svg width="6" height="6" viewBox="0 0 8 8" fill="currentColor">
            <circle cx="4" cy="4" r="2" />
          </svg>
          <svg width="18" height="10" viewBox="0 0 24 12" fill="currentColor" opacity="0.75">
            <path d="M12 0C6 2 3 6 0 12 4 10 8 8 12 6 16 8 20 10 24 12 21 6 18 2 12 0Z" />
          </svg>
          <svg width="6" height="6" viewBox="0 0 8 8" fill="currentColor">
            <circle cx="4" cy="4" r="2" />
          </svg>
        </div>
        <div className="flex-1 h-px bg-[#D6CEBC]" />
      </div>

      {/* Main Grid: Horizontally Aligned Baselines on Desktop, Compact 2-Col on Mobile */}
      <div className="relative max-w-[1320px] mx-auto px-5 sm:px-10 lg:px-16 pt-6 sm:pt-12 pb-8 sm:pb-20 z-10">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-12 gap-x-5 sm:gap-x-10 lg:gap-8 gap-y-6 sm:gap-y-10 items-start">

          {/* Column 1: Brand & Identity (Span 4) */}
          <div className="col-span-2 lg:col-span-4 flex flex-col items-start pr-0 lg:pr-6">
            {/* Pure Typography Devanagari Brand Mark with Logo */}
            <Link href="/" className="inline-block group mb-4">
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap sm:flex-nowrap">
                <Image
                  src="/logo-hd.png"
                  alt="Shingare Skin & Cosmetics Clinic"
                  width={42}
                  height={42}
                  className="w-8 h-8 sm:w-10 sm:h-10 object-contain shrink-0"
                />
                <span
                  style={{
                    fontFamily: "'Amita', serif",
                    fontWeight: 700,
                    color: "#8C231F",
                    lineHeight: 1,
                    letterSpacing: "0.02em",
                  }}
                  className="text-[24px] xs:text-[28px] sm:text-[34px] whitespace-nowrap transition-opacity group-hover:opacity-90"
                >
                  शिनगारे
                </span>
                {/* Bold Luxury Architectural Divider Bar */}
                <div className="flex items-center justify-center px-0.5 sm:px-1.5 select-none" aria-hidden="true">
                  <svg width="12" height="28" viewBox="0 0 12 28" fill="none" className="shrink-0 drop-shadow-2xs">
                    {/* Upper solid tapered needle */}
                    <path d="M 6,2 L 7.2,10 L 4.8,10 Z" fill="#8C231F" />
                    {/* Bold central faceted champagne gold diamond */}
                    <polygon points="6,9.5 9.8,14 6,18.5 2.2,14" fill="#C5A059" />
                    <polygon points="6,9.5 9.8,14 6,14" fill="#D8B56D" opacity="0.9" />
                    {/* Lower solid tapered needle */}
                    <path d="M 4.8,18 L 7.2,18 L 6,26 Z" fill="#8C231F" />
                  </svg>
                </div>
                <span
                  style={{
                    fontFamily: "'Mukta', sans-serif",
                    letterSpacing: "0.18em",
                  }}
                  className="text-[8.5px] xs:text-[9.5px] sm:text-[10.5px] font-semibold text-[#6E645A] uppercase whitespace-nowrap tracking-[0.18em] sm:tracking-[0.22em]"
                >
                  SKIN &amp; COSMETICS
                </span>
              </div>
            </Link>

            {/* Editorial Tagline */}
            <h3 className="font-['Cormorant_Garamond',serif] text-xl sm:text-[26px] text-[#183324] font-normal leading-tight mb-1.5 sm:mb-2">
              Healthy skin. Confident you.
            </h3>
            <div className="w-10 h-[1.5px] bg-[#183324]/30 mb-2 sm:mb-3" />

            {/* Description */}
            <p className="text-[11.5px] sm:text-[13px] leading-snug sm:leading-relaxed text-[#556958] max-w-[310px] mb-4 sm:mb-6 font-sans">
              Expert dermatology, personalised care and advanced aesthetic treatments for your natural beauty and healthy skin.
            </p>

            {/* Call Us Today Action Pill */}
            <a
              href="tel:+917249727104"
              className="inline-flex items-center gap-3 sm:gap-3.5 p-1 sm:p-1.5 pr-5 sm:pr-6 rounded-full bg-[#FAF5EB] hover:bg-[#F2ECE0] border border-[#DDD5C5] shadow-xs hover:shadow-sm transition-all duration-150 active:scale-[0.98] group"
            >
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#183324] text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-[8.5px] sm:text-[9px] font-mono uppercase tracking-[0.2em] text-[#6B7D6E] font-semibold leading-tight">
                  CALL US TODAY
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#183324] font-sans tracking-tight leading-tight mt-0.5">
                  +91 72497 27104
                </span>
              </div>
            </a>
          </div>

          {/* Column 2: Quick Links (Span 2 desktop, Span 1 mobile) */}
          <div className="col-span-1 lg:col-span-2 pt-0 sm:pt-1">
            <h4 className="font-['Cormorant_Garamond',serif] text-lg sm:text-xl font-medium text-[#183324] tracking-tight">
              Quick Links
            </h4>
            <div className="w-8 h-[1.5px] bg-[#244231]/35 mt-1 sm:mt-1.5 mb-2.5 sm:mb-5" />

            <ul className="space-y-1.5 sm:space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="flex items-center justify-between text-[11.5px] sm:text-[13px] text-[#4D6050] hover:text-[#183324] transition-colors group py-0.5"
                  >
                    <span className="group-hover:translate-x-0.5 transition-transform">{link.label}</span>
                    <span className="text-[#889C8C] group-hover:text-[#183324] group-hover:translate-x-1 transition-all text-xs sm:text-sm leading-none">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our Services (Span 2 desktop, Span 1 mobile) */}
          <div className="col-span-1 lg:col-span-2 pt-0 sm:pt-1">
            <h4 className="font-['Cormorant_Garamond',serif] text-lg sm:text-xl font-medium text-[#183324] tracking-tight">
              Our Services
            </h4>
            <div className="w-8 h-[1.5px] bg-[#244231]/35 mt-1 sm:mt-1.5 mb-2.5 sm:mb-5" />

            <ul className="space-y-1.5 sm:space-y-3">
              {services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="flex items-center justify-between text-[11.5px] sm:text-[13px] text-[#4D6050] hover:text-[#183324] transition-colors group py-0.5"
                  >
                    <span className="group-hover:translate-x-0.5 transition-transform">{link.label}</span>
                    <span className="text-[#889C8C] group-hover:text-[#183324] group-hover:translate-x-1 transition-all text-xs sm:text-sm leading-none">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Stay Connected (Span 4) */}
          <div className="col-span-2 lg:col-span-4 flex flex-col items-start pt-1 sm:pt-1 pr-0 lg:pr-8">
            <h4 className="font-['Cormorant_Garamond',serif] text-lg sm:text-xl font-medium text-[#183324] tracking-tight">
              Stay Connected
            </h4>
            <div className="w-8 h-[1.5px] bg-[#244231]/35 mt-1 sm:mt-1.5 mb-2.5 sm:mb-5" />

            <p className="text-[11.5px] sm:text-[13px] text-[#556958] leading-snug sm:leading-relaxed mb-3 sm:mb-5 max-w-[300px]">
              Get expert skincare tips, updates and offers straight to your inbox.
            </p>

            {/* Newsletter Subscription Input */}
            <form onSubmit={(e) => e.preventDefault()} className="relative flex items-center w-full max-w-full sm:max-w-[320px] mb-3.5 sm:mb-5">
              <div className="absolute left-3.5 text-[#768678] pointer-events-none">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                placeholder="Your email address"
                className="w-full pl-10 pr-11 sm:pr-12 py-2.5 sm:py-3 rounded-full bg-[#FAF5EB] border border-[#DDD5C5] text-xs text-[#183324] placeholder:text-[#768678] focus:outline-none focus:ring-1 focus:ring-[#183324] shadow-2xs"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="absolute right-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#183324] hover:bg-[#112419] text-white flex items-center justify-center transition-transform active:scale-95 shadow-xs"
              >
                <span className="text-xs sm:text-sm leading-none font-bold">→</span>
              </button>
            </form>

            {/* Social Icons */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#EAE3D4] hover:bg-[#DFD7C6] text-[#183324] flex items-center justify-center transition-transform hover:scale-105 active:scale-95 shadow-2xs"
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/917249727104"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#EAE3D4] hover:bg-[#DFD7C6] text-[#183324] flex items-center justify-center transition-transform hover:scale-105 active:scale-95 shadow-2xs"
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>

              {/* Google Maps Pin */}
              <a
                href="https://maps.google.com/?q=Shingare+Skin+Clinic+Peth+Vadgaon+Kolhapur"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Clinic Location on Maps"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#EAE3D4] hover:bg-[#DFD7C6] text-[#183324] flex items-center justify-center transition-transform hover:scale-105 active:scale-95 shadow-2xs"
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Dark Copyright Bar with Organic Rising Contour on Right */}
      <div className="relative w-full bg-[#172C20] text-white">
        {/* Subtle Wave Curve along the top of the dark bar */}
        <div className="w-full overflow-hidden leading-none -mt-4 sm:-mt-6">
          <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="w-full h-4 sm:h-6 text-[#172C20] fill-current">
            <path d="M 0,48 L 0,48 Q 720,40 1000,24 Q 1200,6 1440,0 L 1440,48 Z" />
          </svg>
        </div>

        <div className="max-w-[1320px] mx-auto px-5 sm:px-10 lg:px-16 py-3.5 sm:py-5 flex flex-col md:flex-row items-center justify-between gap-2.5 sm:gap-4 text-xs font-sans">
          {/* Left: Corrected Official Clinic Copyright */}
          <div className="text-white/70 text-[10.5px] sm:text-xs text-center md:text-left">
            © 2026 Shingare Skin &amp; Cosmetics Clinic. All rights reserved.
          </div>

          {/* Center: Delicate Leaf Icon with Fine White Dividers */}
          <div className="hidden md:flex items-center gap-3 opacity-60">
            <div className="w-12 h-[1px] bg-white/40" />
            <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2-8 2C3 5 3 15 3 15s0-1 .35-1.5C4.65 11.5 8 11 17 8Z" />
            </svg>
            <div className="w-12 h-[1px] bg-white/40" />
          </div>

          {/* Right: Legal Links */}
          <div className="flex items-center gap-3 text-white/70 text-[10.5px] sm:text-xs">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span className="opacity-40">|</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
