"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Menu,
  X,
  CalendarCheck,
  Activity,
  FileText,
} from "lucide-react";
import { useScrollLock } from "@/lib/useScrollLock";

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobileTreatmentsOpen, setIsMobileTreatmentsOpen] = useState(false);
  const [isTreatmentsOpen, setIsTreatmentsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Lock body scroll when mobile navigation drawer is open
  useScrollLock(isMobileOpen);

  useEffect(() => {
    if (!isMobileOpen) {
      setIsMobileTreatmentsOpen(false);
    }
  }, [isMobileOpen]);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsTreatmentsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsTreatmentsOpen(false);
    }, 200);
  };

  const treatmentItems = [
    {
      name: "Skin Treatments",
      href: "/skin",
      tag: "Dermatology",
      desc: "Acne, Eczema, Psoriasis, Melasma, Moles & Warts",
    },
    {
      name: "Hair Treatments",
      href: "/hair",
      tag: "Trichology & PRP",
      desc: "Autologous PRP, GFC Therapy, Mesotherapy, Alopecia",
    },
    {
      name: "Cosmetic Treatments",
      href: "/cosmetics",
      tag: "Lasers & Facials",
      desc: "Medical Hydra Facial, Carbon Laser Peel, Scar Resurfacing",
    },
  ];

  return (
    <>
      {/* Symmetrical Luxury Header with Center Logo */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 print:hidden ${
          isScrolled
            ? "bg-[#FAF7F2]/95 backdrop-blur-2xl shadow-[0_4px_24px_rgba(40,45,35,0.06)] border-b border-[#292d27]/10"
            : "bg-[#FAF7F2]/90 backdrop-blur-xl border-b border-[#292d27]/8 shadow-[0_2px_16px_rgba(40,45,35,0.03)]"
        }`}
      >
        <div className="w-full max-w-[1440px] mx-auto px-2.5 sm:px-6 lg:px-6 xl:px-10 h-[54px] sm:h-[60px] flex items-center justify-between">
          {/* 1. Left Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-3.5 xl:space-x-7 text-[10.5px] xl:text-[11.5px] font-medium tracking-[0.12em] xl:tracking-[0.18em] uppercase text-[#4A4238] whitespace-nowrap">
            <Link
              href="/"
              className={`hover:text-[#991b1b] transition-colors ${
                pathname === "/" ? "text-[#991b1b] font-semibold" : ""
              }`}
            >
              Home
            </Link>

            <Link
              href="/about"
              className={`hover:text-[#991b1b] transition-colors ${
                pathname === "/about" ? "text-[#991b1b] font-semibold" : ""
              }`}
            >
              About
            </Link>

            {/* Treatments Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => setIsTreatmentsOpen(!isTreatmentsOpen)}
                className={`flex items-center gap-1.5 hover:text-[#991b1b] transition-colors py-1 cursor-pointer text-[10.5px] xl:text-[11.5px] font-medium uppercase tracking-[0.12em] xl:tracking-[0.18em] ${
                  isTreatmentsOpen ||
                  pathname === "/skin" ||
                  pathname === "/hair" ||
                  pathname === "/cosmetics"
                    ? "text-[#991b1b] font-semibold"
                    : ""
                }`}
              >
                <span>Treatments</span>
                <ChevronDown
                  className={`w-3 h-3 opacity-60 transition-transform duration-200 ${
                    isTreatmentsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isTreatmentsOpen && (
                <div
                  className="absolute top-full -left-4 pt-2.5 w-[340px] z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="bg-[#FAF7F2]/95 backdrop-blur-2xl border border-[#E0D8CE] rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.08)] p-2">
                    {treatmentItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsTreatmentsOpen(false)}
                        className="group flex flex-col p-2.5 rounded-xl hover:bg-[#EFE9DF] transition-colors"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-[12px] font-semibold text-gray-800 group-hover:text-[#991b1b] transition-colors whitespace-nowrap">
                            {item.name}
                          </span>
                          <span className="text-[9.5px] font-medium px-2.5 py-0.5 rounded-full bg-[#991b1b]/10 text-[#991b1b] shrink-0 whitespace-nowrap">
                            {item.tag}
                          </span>
                        </div>
                        <span className="text-[11px] text-gray-500 mt-1 line-clamp-1 font-normal lowercase tracking-normal">
                          {item.desc}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/live-queue"
              className={`hover:text-[#991b1b] transition-colors ${
                pathname === "/live-queue" ? "text-[#991b1b] font-semibold" : ""
              }`}
            >
              Live Queue
            </Link>
          </nav>

          {/* 2. Center Brand — Logo + Devanagari Brand Mark */}
          <Link
            href="/"
            onClick={() => setIsMobileOpen(false)}
            className="flex items-center gap-2 sm:gap-2.5 cursor-pointer"
          >
            <Image
              src="/logo-hd.png"
              alt="Shingare Skin & Cosmetics Clinic"
              width={34}
              height={34}
              priority
              className="w-7 h-7 xs:w-8 xs:h-8 sm:w-[32px] sm:h-[32px] xl:w-[34px] xl:h-[34px] object-contain shrink-0"
            />
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span
                style={{
                  fontFamily: "'Amita', 'Karma', serif",
                  fontWeight: 700,
                  color: "#93231f",
                  lineHeight: 1,
                  letterSpacing: "0.02em",
                }}
                className="text-[19px] xs:text-[21px] sm:text-[22px] xl:text-[24px] whitespace-nowrap"
              >
                शिनगारे
              </span>

              <span
                style={{
                  fontFamily: "'Mukta', 'Poppins', sans-serif",
                  letterSpacing: "0.14em",
                }}
                className="text-[8px] xs:text-[8.5px] sm:text-[9px] xl:text-[9.5px] font-semibold text-[#6b6159] uppercase whitespace-nowrap tracking-[0.14em] xl:tracking-[0.18em]"
              >
                SKIN &amp; COSMETICS
              </span>
            </div>
          </Link>

          {/* 3. Right Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-3.5 xl:space-x-7 text-[10.5px] xl:text-[11.5px] font-medium tracking-[0.12em] xl:tracking-[0.18em] uppercase text-[#4A4238] whitespace-nowrap">
            <Link
              href="/my-rx"
              className={`hover:text-[#991b1b] transition-colors ${
                pathname === "/my-rx" ? "text-[#991b1b] font-semibold" : ""
              }`}
            >
              My Rx
            </Link>

            <Link
              href="/verify"
              className={`hover:text-[#991b1b] transition-colors ${
                pathname === "/verify" ? "text-[#991b1b] font-semibold" : ""
              }`}
            >
              Verify Certificate
            </Link>

            <Link
              href="/contact"
              className={`hover:text-[#991b1b] transition-colors ${
                pathname === "/contact" ? "text-[#991b1b] font-semibold" : ""
              }`}
            >
              Contact
            </Link>

            <Link
              href="/book-now"
              className="bg-[#108283] hover:bg-[#0d6e6f] text-white px-3 xl:px-4 py-1.5 rounded-full text-[10px] xl:text-[10.5px] font-semibold tracking-wider uppercase shadow-xs transition-colors"
            >
              Book Token
            </Link>
          </nav>

          {/* Mobile Bespoke Luxury Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              type="button"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="w-10 h-10 rounded-full bg-white/90 hover:bg-white border border-[#292d27]/12 shadow-[0_2px_8px_rgba(40,45,35,0.05)] backdrop-blur-md flex items-center justify-center active:scale-[0.95] transition-all duration-150 cursor-pointer"
              aria-label={isMobileOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMobileOpen}
            >
              {/* Bespoke Architectural Horology Bars */}
              <div className="relative w-4 h-3 flex flex-col justify-between items-end pointer-events-none">
                <span
                  className={`h-[1.75px] rounded-full transition-all duration-200 ease-out origin-center ${
                    isMobileOpen
                      ? "w-4 bg-[#873f3b] translate-y-[5px] rotate-45"
                      : "w-4 bg-[#1a221b]"
                  }`}
                />
                <span
                  className={`h-[1.75px] rounded-full transition-all duration-150 ease-out ${
                    isMobileOpen
                      ? "w-0 opacity-0"
                      : "w-2.5 bg-[#873f3b]"
                  }`}
                />
                <span
                  className={`h-[1.75px] rounded-full transition-all duration-200 ease-out origin-center ${
                    isMobileOpen
                      ? "w-4 bg-[#873f3b] -translate-y-[5px] -rotate-45"
                      : "w-3.5 bg-[#1a221b]"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu with Simple Smooth Slide Animation */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
          isMobileOpen ? "opacity-100 pointer-events-auto visible" : "opacity-0 pointer-events-none invisible"
        }`}
      >
        {/* Backdrop Fade */}
        <div
          className={`fixed inset-0 bg-black/45 backdrop-blur-xs transition-opacity duration-300 ${
            isMobileOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMobileOpen(false)}
        />

        {/* Curved Floating Card Drawer */}
        <div
          className={`fixed top-2.5 right-2.5 bottom-2.5 w-[76%] xs:w-[295px] max-w-[320px] bg-[#FCFBF8] rounded-[28px] xs:rounded-[32px] shadow-[0_16px_44px_rgba(40,45,35,0.15),0_2px_6px_rgba(0,0,0,0.04),inset_0_1px_0_0_rgba(255,255,255,0.95)] z-50 p-4 xs:p-5 flex flex-col justify-between overflow-y-auto border border-[#292d27]/9 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isMobileOpen ? "translate-x-0" : "translate-x-[115%]"
          }`}
        >
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#292d27]/8">
              <div className="flex items-center gap-2">
                <Image
                  src="/logo-hd.png"
                  alt="Shingare Skin & Cosmetics Clinic"
                  width={30}
                  height={30}
                  className="w-6 h-6 xs:w-7 xs:h-7 object-contain shrink-0"
                />
                <div className="flex items-center gap-1.5">
                  <span
                    style={{
                      fontFamily: "'Amita', 'Karma', serif",
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#93231f",
                      lineHeight: 1,
                    }}
                  >
                    शिनगारे
                  </span>

                  <span
                    style={{
                      fontFamily: "'Mukta', 'Poppins', sans-serif",
                      fontSize: "8px",
                      fontWeight: 500,
                      color: "#4A4238",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                    }}
                  >
                    SKIN &amp; COSMETICS
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileOpen(false)}
                className="w-7 h-7 xs:w-8 xs:h-8 rounded-full bg-white border border-[#292d27]/10 text-[#873f3b] shadow-xs hover:bg-[#FAF7F2] active:scale-95 transition-all flex items-center justify-center cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-3.5 h-3.5 text-[#873f3b]" />
              </button>
            </div>

            <div className="py-2 divide-y divide-[#292d27]/8">
              <Link
                href="/"
                onClick={() => setIsMobileOpen(false)}
                className="flex items-center justify-between py-2.5 px-1.5 text-xs uppercase tracking-[0.16em] font-medium text-gray-800 hover:text-[#873f3b] transition-colors"
              >
                <span>Home</span>
              </Link>
              <Link
                href="/about"
                onClick={() => setIsMobileOpen(false)}
                className="flex items-center justify-between py-2.5 px-1.5 text-xs uppercase tracking-[0.16em] font-medium text-gray-800 hover:text-[#873f3b] transition-colors"
              >
                <span>About</span>
              </Link>

              {/* Treatments Collapsible Accordion (Hidden Directly by Default) */}
              <div className="py-1">
                <button
                  type="button"
                  onClick={() => setIsMobileTreatmentsOpen(!isMobileTreatmentsOpen)}
                  className="w-full flex items-center justify-between py-1.5 px-1.5 text-xs uppercase tracking-[0.16em] font-medium text-gray-800 hover:text-[#873f3b] transition-colors cursor-pointer select-none"
                  aria-expanded={isMobileTreatmentsOpen}
                >
                  <span className={isMobileTreatmentsOpen ? "text-[#873f3b]" : ""}>
                    Treatments
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      isMobileTreatmentsOpen ? "rotate-180 text-[#873f3b]" : "text-gray-400"
                    }`}
                  />
                </button>

                {isMobileTreatmentsOpen && (
                  <div className="space-y-0.5 pl-3 pr-1 py-1.5 my-1 border-l-2 border-[#873f3b]/35 ml-2 divide-y divide-[#292d27]/6">
                    {treatmentItems.map((t) => (
                      <Link
                        key={t.name}
                        href={t.href}
                        onClick={() => {
                          setIsMobileOpen(false);
                          setIsMobileTreatmentsOpen(false);
                        }}
                        className="flex items-center justify-between py-1.5 px-2 rounded-lg text-xs text-gray-700 hover:text-[#873f3b] hover:bg-black/[0.02] font-normal transition-colors"
                      >
                        <span>{t.name}</span>
                        <span className="text-[8px] font-mono uppercase text-[#873f3b] bg-[#873f3b]/8 px-2 py-0.5 rounded-full font-medium">
                          {t.tag}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/packages"
                onClick={() => setIsMobileOpen(false)}
                className="flex items-center justify-between py-2.5 px-1.5 text-xs uppercase tracking-[0.16em] font-medium text-gray-800 hover:text-[#873f3b] transition-colors"
              >
                <span>Packages</span>
              </Link>
              <Link
                href="/technology"
                onClick={() => setIsMobileOpen(false)}
                className="flex items-center justify-between py-2.5 px-1.5 text-xs uppercase tracking-[0.16em] font-medium text-gray-800 hover:text-[#873f3b] transition-colors"
              >
                <span>Technology</span>
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsMobileOpen(false)}
                className="flex items-center justify-between py-2.5 px-1.5 text-xs uppercase tracking-[0.16em] font-medium text-gray-800 hover:text-[#873f3b] transition-colors"
              >
                <span>Contact</span>
              </Link>
            </div>

            {/* Digital ClinicOS Shortcuts */}
            <div className="pt-3 border-t border-[#292d27]/8 space-y-1.5">
              <p className="text-[9.5px] uppercase tracking-[0.14em] text-[#873f3b] font-mono font-medium px-3">
                ClinicOS Digital Portal
              </p>
              <Link
                href="/live-queue"
                onClick={() => setIsMobileOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#873f3b] bg-[#873f3b]/6 border border-[#873f3b]/12 hover:bg-[#873f3b]/10 transition-colors"
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Live Queue Radar</span>
              </Link>
              <Link
                href="/my-rx"
                onClick={() => setIsMobileOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#1a221b] bg-[#1a221b]/5 border border-[#1a221b]/8 hover:bg-[#1a221b]/8 transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Audio Rx Voice Portal</span>
              </Link>
            </div>
          </div>

          <div className="pt-3 border-t border-[#292d27]/8">
            <Link
              href="/book-now"
              onClick={() => setIsMobileOpen(false)}
              className="w-full bg-[#873f3b] hover:bg-[#723430] active:scale-[0.985] text-white py-2.5 rounded-full text-xs uppercase tracking-[0.16em] font-medium flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Book Token</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
