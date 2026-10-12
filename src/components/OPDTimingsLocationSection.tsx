"use client";

import React from "react";
import Link from "next/link";
import {
  Clock,
  MapPin,
  Phone,
  CalendarCheck,
  Navigation,
  ShieldAlert,
  Car,
  Activity,
  ArrowRight,
} from "lucide-react";

export default function OPDTimingsLocationSection() {
  const timings = [
    { session: "Morning OPD", hours: "10:00 AM – 1:30 PM", days: "Monday to Saturday", active: true },
    { session: "Evening OPD", hours: "5:00 PM – 9:00 PM", days: "Monday to Saturday", active: true },
    { session: "Sunday OPD", hours: "Emergency On-Call Only", days: "Priority Acute Care", active: false },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#FBFBFA] relative font-source border-t border-stone-200/70">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-18">
          <div className="inline-flex items-center gap-2 bg-[#FAF0DD] text-[#108283] text-xs font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider border border-[#E8DCBE]/70">
            <span className="w-1.5 h-1.5 rounded-full bg-[#108283]" />
            OPD Timings &amp; Location
          </div>

          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl text-stone-950 font-normal leading-tight mb-4">
            Visit Our Clinic in{" "}
            <span className="text-[#108283] font-semibold italic">
              Peth Vadgaon, Kolhapur
            </span>
          </h2>

          <p className="text-stone-600 text-base md:text-lg font-normal leading-relaxed">
            Conveniently located near the central bus stand. Walk-in and prior-booked consultations available every morning and evening.
          </p>
        </div>

        {/* 2-Column High-Clarity Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: OPD Schedule (6 cols) */}
          <div className="lg:col-span-6 bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#108283]/8 text-[#108283] flex items-center justify-center border border-[#108283]/15">
                    <Clock className="w-4 h-4" />
                  </div>
                  <h3 className="font-playfair text-xl font-bold text-stone-950">
                    Clinical OPD Hours
                  </h3>
                </div>

                <Link
                  href="/live-queue"
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#108283] bg-[#108283]/8 px-3 py-1 rounded-full border border-[#108283]/20 hover:bg-[#108283] hover:text-white transition-all"
                >
                  <Activity className="w-3 h-3" />
                  <span>Check Live Token</span>
                </Link>
              </div>

              {/* Schedule List */}
              <div className="space-y-3 mb-6">
                {timings.map((t, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-stone-50 border border-stone-200/60 flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs font-bold text-stone-900 font-playfair">
                        {t.session}
                      </div>
                      <div className="text-[11px] text-stone-500 font-mono">
                        {t.days}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs font-semibold font-mono text-[#108283]">
                        {t.hours}
                      </div>
                      {t.active ? (
                        <div className="text-[10px] text-stone-500 font-medium">
                          Token Registration Open
                        </div>
                      ) : (
                        <div className="text-[10px] text-stone-400 font-medium">
                          Call Reception Desk
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Line */}
            <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-[#93231f]" />
                <span>Urgent Acute Skin Flare? Call:</span>
              </div>
              <a
                href="tel:+917249727104"
                className="font-mono font-bold text-stone-950 hover:text-[#93231f] transition-colors"
              >
                +91 72497 27104
              </a>
            </div>
          </div>

          {/* Right Column: Physical Address, Landmark & Navigation (6 cols) */}
          <div className="lg:col-span-6 bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 pb-4 mb-6 border-b border-stone-100">
                <div className="w-8 h-8 rounded-lg bg-stone-100 text-[#108283] flex items-center justify-center border border-stone-200/60">
                  <MapPin className="w-4 h-4" />
                </div>
                <h3 className="font-playfair text-xl font-bold text-stone-950">
                  Address &amp; Landmark
                </h3>
              </div>

              {/* Exact Location Card */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/60 mb-5">
                <h4 className="text-xs font-mono font-bold text-stone-500 uppercase tracking-wider mb-1">
                  Primary OPD Clinic
                </h4>
                <p className="text-sm text-stone-900 font-semibold leading-relaxed">
                  Shingare Skin &amp; Cosmetics Clinic
                </p>
                <p className="text-xs text-stone-600 leading-relaxed mt-1">
                  Main Road, Near Central Bus Stand, Peth Vadgaon,<br />
                  Taluka Hatkanangle, Dist. Kolhapur, Maharashtra — 416112
                </p>
              </div>

              {/* Transit & Parking Details */}
              <div className="space-y-2 mb-6 text-xs text-stone-600">
                <div className="flex items-center gap-2">
                  <Navigation className="w-3.5 h-3.5 text-[#108283] shrink-0" />
                  <span>2 minutes walking distance from Peth Vadgaon Bus Stand</span>
                </div>
                <div className="flex items-center gap-2">
                  <Car className="w-3.5 h-3.5 text-[#108283] shrink-0" />
                  <span>Designated patient two-wheeler &amp; four-wheeler parking available</span>
                </div>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center gap-3">
              <a
                href="https://maps.google.com/?q=Shingare+Skin+Clinic+Peth+Vadgaon+Kolhapur"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-stone-950 hover:bg-[#108283] text-stone-50 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 active:scale-95 flex-1 text-center"
              >
                <Navigation className="w-3.5 h-3.5 text-[#FAF0DD]" />
                <span>Get Directions</span>
              </a>

              <Link
                href="/book-now"
                className="inline-flex items-center justify-center gap-2 bg-[#FAF0DD] hover:bg-[#faedd0] text-stone-900 border border-[#E8DCBE] px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 active:scale-95 flex-1 text-center"
              >
                <CalendarCheck className="w-3.5 h-3.5 text-[#108283]" />
                <span>Book Slot</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
