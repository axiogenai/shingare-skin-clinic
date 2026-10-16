"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
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
  const [isTreatmentsOpen, setIsTreatmentsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Lock body scroll when mobile navigation drawer is open
  useScrollLock(isMobileOpen);

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
            ? "bg-[#E6DFD5]/95 backdrop-blur-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] border-b border-[#D2C8BC]/70"
            : "bg-[#E8E2D8]/90 backdrop-blur-xl border-b border-[#D5CCC0]/60 shadow-[0_2px_16px_rgba(0,0,0,0.03)]"
        }`}
      >
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 h-[54px] sm:h-[60px] flex items-center justify-between">
          {/* 1. Left Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 text-[11px] xl:text-[11.5px] font-medium tracking-[0.18em] uppercase text-[#4A4238] whitespace-nowrap">
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
                className={`flex items-center gap-1.5 hover:text-[#991b1b] transition-colors py-1 cursor-pointer text-[11px] xl:text-[11.5px] font-medium uppercase tracking-[0.18em] ${
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

          {/* 2. Center Brand — Text-based Devanagari Logo */}
          <Link
            href="/"
            onClick={() => setIsMobileOpen(false)}
            className="flex-shrink-0 flex items-center justify-center px-4 group cursor-pointer"
          >
            <div style={{ position: "relative", paddingBottom: "7px" }}>
              <span
                style={{
                  fontFamily: "'Amita', 'Karma', serif",
                  fontWeight: 700,
                  color: "#93231f",
                  lineHeight: 1.15,
                  letterSpacing: "0.02em",
                }}
                className="text-[24px] sm:text-[30px] transition-transform group-hover:scale-105 duration-200"
              >
                शिनगारे
              </span>
              <span
                style={{
                  fontFamily: "'Mukta', 'Poppins', sans-serif",
                  fontSize: "8px",
                  fontWeight: 600,
                  color: "#6b6159",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                  position: "absolute",
                  bottom: "0px",
                  left: "45%",
                }}
              >
                SKIN & COSMETICS
              </span>
            </div>
          </Link>

          {/* 3. Right Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 text-[11px] xl:text-[11.5px] font-medium tracking-[0.18em] uppercase text-[#4A4238] whitespace-nowrap">
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
              className="bg-[#108283] hover:bg-[#0d6e6f] text-white px-4 py-1.5 rounded-full text-[10.5px] font-semibold tracking-wider uppercase shadow-xs transition-colors"
            >
              Book Token
            </Link>
          </nav>

          {/* Mobile Hamburger Button */}
          <div className="lg:hidden flex items-center gap-2.5">
            <Link
              href="/book-now"
              className="bg-[#991b1b] text-white px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-wider uppercase shadow-xs"
            >
              Book
            </Link>
            <button
              type="button"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="p-2 rounded-xl text-[#4A4238] hover:text-black hover:bg-black/5 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileOpen(false)}
          />

          <div className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-[#FAF7F2] shadow-2xl z-50 p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-[#E0D8CE]">
                <div className="flex flex-col items-start leading-none">
                  <span
                    style={{
                      fontFamily: "'Amita', 'Karma', serif",
                      fontSize: "22px",
                      fontWeight: 700,
                      color: "#93231f",
                      lineHeight: 1.1,
                    }}
                  >
                    शिंगारे
                  </span>
                  <span
                    style={{
                      fontFamily: "'Mukta', 'Poppins', sans-serif",
                      fontSize: "8px",
                      fontWeight: 600,
                      color: "#4A4238",
                      letterSpacing: "0.25em",
                      textTransform: "uppercase",
                      marginTop: "1px",
                    }}
                  >
                    SKIN & COSMETICS
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="p-1.5 rounded-full hover:bg-black/5 text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-5 space-y-1.5">
                <Link
                  href="/"
                  onClick={() => setIsMobileOpen(false)}
                  className="block px-3 py-2 rounded-xl text-xs uppercase tracking-[0.2em] font-semibold text-gray-800 hover:bg-[#EFE9DF]"
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  onClick={() => setIsMobileOpen(false)}
                  className="block px-3 py-2 rounded-xl text-xs uppercase tracking-[0.2em] font-semibold text-gray-800 hover:bg-[#EFE9DF]"
                >
                  About
                </Link>

                <div className="py-2 px-3">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#991b1b] font-bold mb-2">
                    Treatments
                  </p>
                  <div className="space-y-1 pl-2 border-l-2 border-[#991b1b]/30">
                    {treatmentItems.map((t) => (
                      <Link
                        key={t.name}
                        href={t.href}
                        onClick={() => setIsMobileOpen(false)}
                        className="block py-1 text-xs text-gray-700 hover:text-[#991b1b] font-medium"
                      >
                        {t.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <Link
                  href="/packages"
                  onClick={() => setIsMobileOpen(false)}
                  className="block px-3 py-2 rounded-xl text-xs uppercase tracking-[0.2em] font-semibold text-gray-800 hover:bg-[#EFE9DF]"
                >
                  Packages
                </Link>
                <Link
                  href="/technology"
                  onClick={() => setIsMobileOpen(false)}
                  className="block px-3 py-2 rounded-xl text-xs uppercase tracking-[0.2em] font-semibold text-gray-800 hover:bg-[#EFE9DF]"
                >
                  Technology
                </Link>
                <Link
                  href="/blog"
                  onClick={() => setIsMobileOpen(false)}
                  className="block px-3 py-2 rounded-xl text-xs uppercase tracking-[0.2em] font-semibold text-gray-800 hover:bg-[#EFE9DF]"
                >
                  Blog
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setIsMobileOpen(false)}
                  className="block px-3 py-2 rounded-xl text-xs uppercase tracking-[0.2em] font-semibold text-gray-800 hover:bg-[#EFE9DF]"
                >
                  Contact
                </Link>
              </div>

              {/* Digital ClinicOS Shortcuts */}
              <div className="pt-4 border-t border-[#E0D8CE] space-y-2">
                <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold px-3">
                  ClinicOS Digital Portal
                </p>
                <Link
                  href="/live-queue"
                  onClick={() => setIsMobileOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-emerald-800 bg-emerald-50/80 hover:bg-emerald-100"
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>Live Queue Radar</span>
                </Link>
                <Link
                  href="/my-rx"
                  onClick={() => setIsMobileOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-teal-800 bg-teal-50/80 hover:bg-teal-100"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Audio Rx Voice Portal</span>
                </Link>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E0D8CE]">
              <Link
                href="/book-now"
                onClick={() => setIsMobileOpen(false)}
                className="w-full bg-[#991b1b] hover:bg-[#801616] text-white py-3 rounded-full text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 shadow-sm"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Book Now</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
