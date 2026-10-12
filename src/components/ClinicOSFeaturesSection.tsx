"use client";

import React from "react";
import Link from "next/link";
import {
  FileText,
  Clock,
  ShieldCheck,
  Activity,
  ArrowRight,
  Volume2,
  CircleCheck,
} from "lucide-react";

export default function ClinicOSFeaturesSection() {
  return (
    <section className="py-20 md:py-28 bg-white relative font-source border-t border-gray-100">
      <div className="max-w-[1140px] mx-auto px-5 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-[#FAF0DD] text-[#108283] text-xs font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider border border-[#E8DCBE]/60">
            <span className="w-1.5 h-1.5 rounded-full bg-[#108283]" />
            Powered by ClinicOS
          </div>
          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl text-gray-950 font-normal leading-tight mb-4">
            Smart Digital Health For{" "}
            <span className="text-[#108283] font-semibold italic">
              Every Patient
            </span>
          </h2>
          <p className="text-gray-600 text-base md:text-lg font-normal leading-relaxed">
            Our clinic integrates clinical-grade software to minimize waiting
            time, provide audio dosage guidance in Marathi, and ensure 100%
            verified medical records — built for the patients of Peth Vadgaon
            and Kolhapur.
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {/* ── Card 1: Prescription Audio Player ── */}
          <div className="group bg-[#F6F5F3] border border-stone-200/80 rounded-2xl p-6 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.03)] hover:border-stone-300/80 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-11 h-11 rounded-xl bg-[#108283]/8 text-[#108283] flex items-center justify-center group-hover:bg-[#108283] group-hover:text-white transition-colors duration-200 border border-[#108283]/10">
                  <Volume2 className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-[#FAF0DD] text-[#6B5C2E] border border-[#E8DCBE]/60 tracking-wide">
                  QR Audio Sync
                </span>
              </div>

              <h3 className="font-playfair text-xl sm:text-[22px] font-bold text-gray-950 mb-2 leading-snug">
                Digital Prescription Audio Note
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-5">
                Scan the QR code printed on your clinic case paper to instantly
                play Dr. Pramod Shingare's audio instructions. Listen to
                dosages, application guidelines, and diet tips in Marathi and
                English — anytime at home.
              </p>

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <CircleCheck className="w-3.5 h-3.5 text-[#108283] shrink-0" />
                  <span>Plays directly in browser — zero app installation required</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <CircleCheck className="w-3.5 h-3.5 text-[#108283] shrink-0" />
                  <span>Marathi voice recordings for elderly and rural patients</span>
                </div>
              </div>
            </div>

            <Link
              href="/my-rx"
              className="inline-flex items-center justify-center gap-2 bg-[#108283] hover:bg-[#0c6b6c] text-white rounded-full px-6 py-3 text-xs font-semibold transition-all active:scale-95 w-full sm:w-auto"
            >
              <FileText className="w-4 h-4" />
              <span>Open My Rx Voice Player</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* ── Card 2: Live Queue ── */}
          <div className="group bg-[#F6F5F3] border border-stone-200/80 rounded-2xl p-6 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.03)] hover:border-stone-300/80 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-11 h-11 rounded-xl bg-stone-100 text-stone-500 flex items-center justify-center group-hover:bg-stone-800 group-hover:text-stone-50 transition-colors duration-200 border border-stone-200/60">
                  <Clock className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-stone-100 text-stone-600 border border-stone-200/60 tracking-wide">
                  Live Sync
                </span>
              </div>

              <h3 className="font-playfair text-xl sm:text-[22px] font-bold text-gray-950 mb-2 leading-snug">
                Real-Time OPD Queue Radar
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-5">
                Never sit aimlessly in crowded waiting rooms. Track the doctor
                cabin state, current active token, and your exact wait time in
                real-time from your phone before arriving at the clinic.
              </p>

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <CircleCheck className="w-3.5 h-3.5 text-[#108283] shrink-0" />
                  <span>Live cabin indicator: In Consultation / Ready</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <CircleCheck className="w-3.5 h-3.5 text-[#108283] shrink-0" />
                  <span>Auto-refreshes every 15 seconds</span>
                </div>
              </div>
            </div>

            <Link
              href="/live-queue"
              className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 border border-stone-200 hover:border-stone-400 rounded-full px-6 py-3 text-xs font-semibold transition-all active:scale-95 w-full sm:w-auto"
            >
              <Clock className="w-4 h-4 text-[#108283]" />
              <span>Launch Live Queue Radar</span>
              <ArrowRight className="w-4 h-4 text-stone-400" />
            </Link>
          </div>

          {/* ── Card 3: Certificate Verifier ── */}
          <div className="group bg-[#F6F5F3] border border-stone-200/80 rounded-2xl p-6 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.03)] hover:border-stone-300/80 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-11 h-11 rounded-xl bg-[#108283]/8 text-[#108283] flex items-center justify-center group-hover:bg-[#108283] group-hover:text-white transition-colors duration-200 border border-[#108283]/10">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-[#FAF0DD] text-[#6B5C2E] border border-[#E8DCBE]/60 tracking-wide">
                  Tamper Proof
                </span>
              </div>

              <h3 className="font-playfair text-xl sm:text-[22px] font-bold text-gray-950 mb-2 leading-snug">
                Medical Certificate Verifier
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-5">
                Institutions, employers, and colleges can instantly verify
                medical fitness and sick leave certificates issued by Dr. Pramod
                Shingare by scanning the cryptographic QR code.
              </p>

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <CircleCheck className="w-3.5 h-3.5 text-[#108283] shrink-0" />
                  <span>Instant SHA-256 digital signature validation</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <CircleCheck className="w-3.5 h-3.5 text-[#108283] shrink-0" />
                  <span>Displays authentic issuance date &amp; diagnosis</span>
                </div>
              </div>
            </div>

            <Link
              href="/verify"
              className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 border border-stone-200 hover:border-stone-400 rounded-full px-6 py-3 text-xs font-semibold transition-all active:scale-95 w-full sm:w-auto"
            >
              <ShieldCheck className="w-4 h-4 text-[#108283]" />
              <span>Verify a Certificate</span>
              <ArrowRight className="w-4 h-4 text-stone-400" />
            </Link>
          </div>

          {/* ── Card 4: Pre-Consult Skin Quiz ── */}
          <div className="group bg-[#F6F5F3] border border-stone-200/80 rounded-2xl p-6 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.03)] hover:border-stone-300/80 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-11 h-11 rounded-xl bg-stone-100 text-stone-500 flex items-center justify-center group-hover:bg-stone-800 group-hover:text-stone-50 transition-colors duration-200 border border-stone-200/60">
                  <Activity className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-stone-100 text-stone-600 border border-stone-200/60 tracking-wide">
                  Pre-Consult
                </span>
              </div>

              <h3 className="font-playfair text-xl sm:text-[22px] font-bold text-gray-950 mb-2 leading-snug">
                Pre-Consultation Skin Quiz
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-5">
                Answer 4 quick structured clinical questions about your skin
                type, primary concern, and duration. Your answers pre-populate
                your electronic case paper for a faster, deeper consultation.
              </p>

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <CircleCheck className="w-3.5 h-3.5 text-[#108283] shrink-0" />
                  <span>Pre-tags symptoms directly into doctor EMR</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <CircleCheck className="w-3.5 h-3.5 text-[#108283] shrink-0" />
                  <span>Saves consultation time &amp; improves diagnostic focus</span>
                </div>
              </div>
            </div>

            <Link
              href="/skin-quiz"
              className="inline-flex items-center justify-center gap-2 bg-gray-950 hover:bg-gray-800 text-white rounded-full px-6 py-3 text-xs font-semibold transition-all active:scale-95 w-full sm:w-auto"
            >
              <Activity className="w-4 h-4 text-stone-300" />
              <span>Start Free Skin Quiz</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
