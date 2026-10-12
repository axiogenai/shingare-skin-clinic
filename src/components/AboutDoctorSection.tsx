"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  HeartHandshake,
  ShieldCheck,
  Stethoscope,
  CalendarCheck,
  UserCheck,
} from "lucide-react";

export default function AboutDoctorSection() {
  const [activeTab, setActiveTab] = useState<"profile" | "philosophy" | "story">("profile");

  return (
    <section id="about" className="relative bg-white py-20 md:py-28 overflow-hidden font-source">
      <div className="max-w-[1140px] mx-auto px-5 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Doctor Profile Card with Verification (5 cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="relative max-w-[420px] w-full">
              {/* Ambient Glow */}
              <div className="absolute -inset-3 bg-gradient-to-tr from-[#108283]/15 via-[#FAEDDA]/60 to-[#F0A070]/15 rounded-[36px] blur-2xl opacity-60" />

              {/* Main Doctor Card */}
              <div className="relative rounded-[32px] overflow-hidden border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.06)] bg-[#F4F7F8] p-7 sm:p-8 flex flex-col items-center text-center">
                {/* Avatar Icon / Initial */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#108283] to-[#0c6b6c] text-white flex items-center justify-center text-3xl font-bold shadow-lg mb-4 border-4 border-white">
                  <Stethoscope className="w-12 h-12" />
                </div>

                <h3 className="font-playfair text-xl sm:text-2xl font-bold text-gray-950 mb-1">
                  Dr. Pramod &amp; Dr. Priyanka Shingare
                </h3>
                <p className="text-xs font-bold text-[#108283] tracking-wider uppercase mb-4">
                  Dermatology &amp; Clinical Cosmetology
                </p>

                <div className="w-full space-y-2 text-xs text-gray-700 bg-white rounded-2xl p-4 border border-gray-100 mb-5 text-left">
                  <div className="flex items-center justify-between pb-1.5 border-b border-gray-100">
                    <span className="text-gray-500">Dr. Pramod S. Shingare</span>
                    <span className="font-semibold text-gray-900">MMC Reg. I-87218-A</span>
                  </div>
                  <div className="flex items-center justify-between pb-1.5 border-b border-gray-100">
                    <span className="text-gray-500">Dr. Priyanka P. Shingare</span>
                    <span className="font-semibold text-[#108283]">Council Reg. 73338</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Practice Location</span>
                    <span className="font-semibold text-gray-900">Peth Vadgaon, Kolhapur</span>
                  </div>
                </div>

                <Link
                  href="/about"
                  className="w-full bg-[#108283] hover:bg-[#0c6b6c] text-white py-3 rounded-full text-xs font-semibold shadow-sm flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>View Doctors Editorial Profile</span>
                </Link>
              </div>

              {/* Verified Council Chip */}
              <div className="absolute -top-3 -right-2 bg-white/95 backdrop-blur-md border border-gray-100 shadow-md px-3.5 py-1.5 rounded-full flex items-center gap-1.5 text-[11px] text-gray-800 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>MMC Verified</span>
              </div>
            </div>
          </div>

          {/* Right Column: Bio & Interactive Tab Switcher (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Tag */}
            <div className="inline-block bg-[#FAEDDA] text-[#108283] text-xs md:text-sm font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider">
              CONSULTING SPECIALISTS
            </div>

            {/* Heading */}
            <h2 className="font-playfair text-3xl sm:text-4xl lg:text-[42px] font-normal leading-tight text-gray-950 mb-5">
              Meet <span className="text-[#108283] font-semibold italic">Our Doctors</span>
            </h2>

            {/* Tab Switcher */}
            <div className="flex flex-wrap gap-2 p-1.5 bg-[#F4F7F8] rounded-2xl mb-6 text-xs sm:text-sm">
              <button
                type="button"
                onClick={() => setActiveTab("profile")}
                className={`px-4 py-1.5 rounded-xl transition-all cursor-pointer ${
                  activeTab === "profile"
                    ? "bg-white text-gray-900 font-semibold shadow-2xs"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Clinical Profile
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("philosophy")}
                className={`px-4 py-1.5 rounded-xl transition-all cursor-pointer ${
                  activeTab === "philosophy"
                    ? "bg-white text-gray-900 font-semibold shadow-2xs"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Treatment Philosophy
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("story")}
                className={`px-4 py-1.5 rounded-xl transition-all cursor-pointer ${
                  activeTab === "story"
                    ? "bg-white text-gray-900 font-semibold shadow-2xs"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Clinic Vision
              </button>
            </div>

            {/* Tab Contents */}
            <div className="min-h-[190px] mb-8 text-gray-700 text-sm sm:text-base leading-relaxed">
              {activeTab === "profile" && (
                <div className="space-y-3 animate-in fade-in duration-200">
                  <p>
                    <strong>Dr. Pramod Suresh Shingare</strong> (MD Ayu - D.Dermatology MUHS, MMC Reg. I-87218-A) and <strong>Dr. Priyanka Pramod Shingare</strong> (BHMS, FCHD, CCHC, CCMP MUHS, Reg. 73338) bring over a decade of combined clinical expertise in medical dermatology, trichology, and advanced aesthetic cosmetology.
                  </p>
                  <p className="text-gray-600 text-sm">
                    Their dedicated practice encompasses biological management of psoriasis and eczema, recalcitrant acne vulgaris, autologous platelet-derived growth factor treatments (PRP/GFC), and clinical laser facial resurfacing.
                  </p>
                </div>
              )}

              {activeTab === "philosophy" && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <blockquote className="border-l-3 border-[#108283] pl-5 py-3 text-gray-900 font-medium text-base sm:text-[17px] leading-[1.7] bg-[#FAF0DD]/40 rounded-r-2xl">
                    “Dermatology is fundamentally a medical discipline. Every treatment must have empirical clinical justification, zero false promises, and transparent communication with the patient.”
                  </blockquote>
                  <p className="text-gray-600 text-sm">
                    Our doctors prioritize patient safety and rational drug prescription. Each patient receives detailed counseling regarding their condition, lifestyle factors, and expected therapeutic timeline.
                  </p>
                </div>
              )}

              {activeTab === "story" && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <blockquote className="border-l-3 border-[#F0A070] pl-5 py-3 text-gray-900 font-medium text-base sm:text-[17px] leading-[1.7] bg-[#FAF0DD]/40 rounded-r-2xl">
                    “We established Shingare Skin &amp; Cosmetics Clinic in Peth Vadgaon so families across Kolhapur district have direct access to metropolitan-standard dermatological diagnostics, lasers, and digital healthcare without traveling long distances.”
                  </blockquote>
                  <p className="text-gray-600 text-sm">
                    Powered by ClinicOS, the clinic features real-time queue status, digital prescription audio guidance in Marathi, and authenticated medical records.
                  </p>
                </div>
              )}
            </div>

            {/* Clinical Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#FAF0DD]/50 border border-[#F0DAAA]/50 text-xs text-gray-800">
                <ShieldCheck className="w-4 h-4 text-[#108283] shrink-0" />
                <span>MMC Registered &amp; Verified Doctors</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#FAF0DD]/50 border border-[#F0DAAA]/50 text-xs text-gray-800">
                <HeartHandshake className="w-4 h-4 text-[#108283] shrink-0" />
                <span>Zero Commercialization, Pure Medical Ethics</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
