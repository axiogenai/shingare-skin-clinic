"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Clock,
  CalendarClock,
  MessageCircle,
  Send,
  Navigation,
  Compass,
  ChevronRight,
  ChevronDown,
  Check,
  CheckCircle2,
  Calendar,
  Stethoscope,
} from "lucide-react";

const DEPARTMENT_OPTIONS = [
  "General Dermatology (Skin & Allergy)",
  "Laser & Cosmetic Treatments",
  "Hair Loss & Scalp Therapy",
  "Acne & Scar Revision",
  "Pigmentation & Melasma",
];

const scheduleData = [
  { day: "Monday", morning: "10:00 AM – 1:30 PM", evening: "5:00 PM – 9:00 PM" },
  { day: "Tuesday", morning: "10:00 AM – 1:30 PM", evening: "5:00 PM – 9:00 PM" },
  { day: "Wednesday", morning: "10:00 AM – 1:30 PM", evening: "5:00 PM – 9:00 PM" },
  { day: "Thursday", morning: "10:00 AM – 1:30 PM", evening: "5:00 PM – 9:00 PM" },
  { day: "Friday", morning: "10:00 AM – 1:30 PM", evening: "5:00 PM – 9:00 PM" },
  { day: "Saturday", morning: "10:00 AM – 1:30 PM", evening: "5:00 PM – 9:00 PM" },
  { day: "Sunday", closed: true, text: "Closed (Emergency On-Call Only)" },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    department: "General Dermatology (Skin & Allergy)",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<typeof formData | null>(null);
  const [isDeptOpen, setIsDeptOpen] = useState(false);
  const deptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (deptRef.current && !deptRef.current.contains(event.target as Node)) {
        setIsDeptOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;

    setSubmitted(true);
    setSubmittedData({ ...formData });

    if (typeof localStorage !== "undefined") {
      try {
        const stored = JSON.parse(localStorage.getItem("shingare_clinic_inquiries") || "[]");
        stored.unshift({
          ...formData,
          submittedAt: new Date().toISOString(),
        });
        localStorage.setItem("shingare_clinic_inquiries", JSON.stringify(stored));
      } catch {}
    }
  };

  const getWhatsAppInquiryUrl = () => {
    if (!submittedData) return "https://wa.me/917249727104";
    const text = `Hello Shingare Clinic,\n*New Consultation Inquiry*\n• Name: ${submittedData.name}\n• Phone: +91 ${submittedData.phone}\n• Concern: ${submittedData.department}\n• Message: ${submittedData.message || "Consultation request"}`;
    return `https://wa.me/917249727104?text=${encodeURIComponent(text)}`;
  };

  return (
    <main className="min-h-screen bg-[#FDFBF7] font-source">
      {/* 1. Page Header */}
      <div className="pt-24 pb-10 bg-[#FAF6F0] border-b border-[#EAE3D6]">
        <div className="max-w-[1080px] mx-auto px-5 sm:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-[#FAF0DD] border border-[#D4AF37]/35 text-[#873f3b] rounded-full px-4 py-1.5 text-[10.5px] font-bold tracking-[0.18em] uppercase mb-3.5 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#873f3b]" />
            <span>PETH VADGAON, KOLHAPUR • EST. EXCELLENCE</span>
          </div>

          <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-normal text-neutral-900 mb-2.5 tracking-tight">
            Contact &amp; Clinic Location
          </h1>

          <p className="font-playfair italic text-xs sm:text-sm md:text-base text-neutral-600 max-w-none mx-auto leading-relaxed whitespace-nowrap">
            Dr. Pramod Shingare (MD Dermatology) • Dr. Priyanka Shingare (Clinical Cosmetology)
          </p>
        </div>
      </div>

      {/* 2. Main Content Grid - Balanced Medium Size Container */}
      <section className="max-w-[1080px] mx-auto px-5 sm:px-8 py-8 space-y-6">
        {/* Row 1: Balanced Medium Cards (Location & Map + Inquiry Form) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Card 1: Clinic Location & Live Interactive Map */}
          <div className="bg-white rounded-2xl border border-[#EAE3D6] p-6 flex flex-col justify-between shadow-2xs">
            <div className="space-y-3.5">
              <div className="text-center">
                <span className="inline-block bg-[#FAF0DD] border border-[#D4AF37]/30 text-[#873f3b] text-[10px] font-bold tracking-[0.15em] px-3 py-0.5 rounded-full uppercase mb-2">
                  CLINIC LOCATION &amp; ACCESS
                </span>
                <div className="flex items-center justify-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#FAF0DD] text-[#873f3b] flex items-center justify-center shrink-0 border border-[#D4AF37]/25">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <h2 className="font-playfair text-xl sm:text-[22px] font-bold text-neutral-900 leading-tight">
                    Shingare Skin &amp; Cosmetics Clinic
                  </h2>
                </div>
                <p className="text-xs text-neutral-500 font-medium mt-1">
                  Ground Floor • Wheelchair Accessible Parking
                </p>
              </div>

              {/* Physical Address Line */}
              <div className="bg-[#FAF8F5] border border-[#EAE3D6] rounded-xl p-3 text-xs text-neutral-700 leading-relaxed flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#873f3b] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-neutral-900">Address:</strong> Main Road, Near S.T. Bus Stand, Opp. Rajaram Chitra Mandir, Peth Vadgaon, Kolhapur – 416112.
                </span>
              </div>

              {/* Real Interactive Google Map (Balanced Medium Proportion) */}
              <div className="relative rounded-xl border border-[#EAE3D6] overflow-hidden bg-neutral-100 h-[215px] sm:h-[230px] w-full shadow-inner">
                <iframe
                  title="Shingare Skin &amp; Cosmetics Clinic Map Location"
                  src="https://maps.google.com/maps?q=Shingare+Skin+and+Cosmetics+Clinic+Peth+Vadgaon+Kolhapur&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Map Actions Footer */}
            <div className="pt-3 mt-3 border-t border-[#F2ECE1] flex items-center justify-between gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 text-neutral-500 text-[11px] font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                100m from S.T. Bus Stand
              </span>

              <div className="flex items-center gap-2.5">
                <a
                  href="https://maps.google.com/?q=Shingare+Skin+and+Cosmetics+Clinic+Peth+Vadgaon+Kolhapur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#108283] hover:text-[#0c6b6c] font-semibold text-xs transition-colors"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Open Maps</span>
                </a>

                <a
                  href="https://maps.google.com/?q=Shingare+Skin+and+Cosmetics+Clinic+Peth+Vadgaon+Kolhapur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-[#108283] hover:bg-[#0c6b6c] text-white text-xs font-semibold px-3.5 py-1.5 rounded-lg shadow-2xs transition-colors active:scale-[0.985]"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Directions</span>
                </a>
              </div>
            </div>
          </div>

          {/* Card 2: Send an Inquiry Form (Balanced Medium Size) */}
          <div className="bg-white rounded-2xl border border-[#EAE3D6] p-6 flex flex-col justify-between shadow-2xs">
            <div className="space-y-3.5">
              <div className="text-center">
                <span className="inline-block bg-[#FAF0DD] border border-[#D4AF37]/30 text-[#873f3b] text-[10px] font-bold tracking-[0.15em] px-3 py-0.5 rounded-full uppercase mb-2">
                  FAST PATIENT SUPPORT
                </span>
                <h3 className="font-playfair text-xl sm:text-[22px] font-bold text-neutral-900 leading-tight">
                  Send an Inquiry
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5 leading-normal">
                  Questions regarding treatments, fees, or doctor availability? Submit below.
                </p>
              </div>

              {submitted && submittedData ? (
                <div className="bg-[#FAF0DD]/60 border border-[#D4AF37]/30 rounded-xl p-4.5 space-y-2.5">
                  <div className="flex items-center gap-2 text-[#873f3b]">
                    <CheckCircle2 className="w-4 h-4" />
                    <p className="font-bold text-xs">Inquiry Received</p>
                  </div>
                  <p className="text-xs text-neutral-700 leading-relaxed">
                    Thank you, <strong>{submittedData.name}</strong>. Our front desk will contact you regarding <strong>{submittedData.department}</strong>.
                  </p>

                  <a
                    href={getWhatsAppInquiryUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white py-2 px-3 rounded-lg text-xs font-bold shadow-2xs transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp Inquiry</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        phone: "",
                        department: "General Dermatology (Skin & Allergy)",
                        message: "",
                      });
                    }}
                    className="text-xs text-neutral-500 hover:text-neutral-800 underline block mx-auto pt-0.5 cursor-pointer"
                  >
                    Submit another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Rahul Patil"
                        className="w-full px-3 py-2 rounded-lg border border-[#EAE3D6] bg-white text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#C5A059] focus:ring-2 focus:ring-[#FAF0DD] shadow-2xs transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-700 mb-1">
                        Mobile Number *
                      </label>
                      <div className="flex items-center rounded-lg border border-[#EAE3D6] bg-white transition-all shadow-2xs focus-within:border-[#C5A059] focus-within:ring-2 focus-within:ring-[#FAF0DD] overflow-hidden">
                        <span className="inline-flex items-center px-2.5 py-2 text-xs font-medium text-neutral-500 bg-[#FAF8F5] select-none border-r border-[#EAE3D6]">
                          +91
                        </span>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="98765 43210"
                          className="w-full px-2.5 py-2 bg-transparent text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none border-0"
                        />
                      </div>
                    </div>
                  </div>

                  <div ref={deptRef} className="relative">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-700 mb-1">
                      Department / Concern
                    </label>

                    <button
                      type="button"
                      onClick={() => setIsDeptOpen((prev) => !prev)}
                      aria-haspopup="listbox"
                      aria-expanded={isDeptOpen}
                      className={`w-full px-3 py-2 rounded-lg border bg-white text-xs text-left text-neutral-900 shadow-2xs flex items-center justify-between transition-all cursor-pointer ${
                        isDeptOpen
                          ? "border-[#C5A059] ring-2 ring-[#FAF0DD]"
                          : "border-[#EAE3D6] hover:border-[#D4AF37]/50"
                      }`}
                    >
                      <span className="truncate font-medium">{formData.department}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-neutral-400 shrink-0 ml-2 transition-transform duration-200 ${
                          isDeptOpen ? "rotate-180 text-[#C5A059]" : ""
                        }`}
                      />
                    </button>

                    {isDeptOpen && (
                      <div
                        role="listbox"
                        className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-xl border border-[#EAE3D6] shadow-xl shadow-black/8 py-1.5 z-40 overflow-hidden"
                      >
                        {DEPARTMENT_OPTIONS.map((dept) => {
                          const isSelected = formData.department === dept;
                          return (
                            <button
                              key={dept}
                              type="button"
                              role="option"
                              aria-selected={isSelected}
                              onClick={() => {
                                setFormData((prev) => ({ ...prev, department: dept }));
                                setIsDeptOpen(false);
                              }}
                              className={`w-full px-3 py-2 text-xs text-left flex items-center justify-between transition-colors cursor-pointer ${
                                isSelected
                                  ? "bg-[#FAF0DD]/80 text-[#873f3b] font-semibold"
                                  : "text-neutral-700 hover:bg-[#FAF8F5] hover:text-neutral-900"
                              }`}
                            >
                              <span>{dept}</span>
                              {isSelected && (
                                <Check className="w-3.5 h-3.5 text-[#108283] shrink-0 ml-2" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-700 mb-1">
                      Message / Query
                    </label>
                    <textarea
                      rows={2}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Briefly describe your symptoms or query..."
                      className="w-full px-3 py-2 rounded-lg border border-[#EAE3D6] bg-white text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#C5A059] focus:ring-2 focus:ring-[#FAF0DD] shadow-2xs transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#108283] hover:bg-[#0c6b6c] active:scale-[0.985] text-white py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Inquiry</span>
                  </button>
                </form>
              )}
            </div>

            {/* Bottom Quick Token Box */}
            <div className="pt-3 mt-3 border-t border-[#F2ECE1] flex items-center justify-between gap-2">
              <div>
                <p className="text-xs font-bold text-neutral-900">Need an instant token?</p>
                <p className="text-[11px] text-neutral-500">Book directly into digital queue</p>
              </div>

              <Link
                href="/book-now"
                className="inline-flex items-center gap-1.5 bg-[#FAF0DD] hover:bg-[#F5E8D0] text-[#873f3b] border border-[#D4AF37]/35 text-xs font-semibold px-3.5 py-1.5 rounded-lg transition-all shadow-2xs shrink-0 cursor-pointer active:scale-[0.985]"
              >
                <Calendar className="w-3.5 h-3.5 text-[#873f3b]" />
                <span>Book Token</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Row 2: Compact OPD Consultation Hours Card (Small & Proper Size) */}
        <div className="bg-white rounded-2xl border border-[#EAE3D6] p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2 pb-3.5 border-b border-[#F2ECE1]">
            <div className="flex items-center gap-2.5">
              <CalendarClock className="w-5 h-5 text-[#108283] shrink-0" />
              <div>
                <h3 className="font-playfair text-xl font-bold text-neutral-900 leading-tight">
                  OPD Consultation Hours
                </h3>
                <p className="text-xs text-neutral-500 font-medium mt-0.5">
                  Dr. Pramod Shingare &amp; Dr. Priyanka Shingare
                </p>
              </div>
            </div>

            <span className="inline-flex items-center gap-2 bg-[#1A1815] border border-[#C5A059]/60 text-[#F7EEDB] text-[11px] font-semibold px-3.5 py-1.5 rounded-full shadow-2xs">
              <Stethoscope className="w-3.5 h-3.5 text-[#C5A059]" />
              Clinic OPEN for Consultations
            </span>
          </div>

          {/* Compact Schedule: Monday–Saturday & Sunday */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {/* Monday – Saturday */}
            <div className="bg-[#FAF8F5] border border-[#EAE3D6] rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
              <div>
                <p className="text-xs font-bold text-neutral-900">Monday – Saturday</p>
                <p className="text-[11px] text-neutral-500 font-medium mt-0.5">Daily Consultations</p>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs font-mono tabular-nums">
                <span className="inline-flex items-center gap-1.5 bg-white border border-[#EAE3D6] text-neutral-700 px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shadow-2xs">
                  <span className="text-[10px] font-sans font-bold uppercase text-neutral-400">AM</span>
                  10:00 AM – 1:30 PM
                </span>
                <span className="inline-flex items-center gap-1.5 bg-[#FAF0DD]/70 border border-[#D4AF37]/35 text-[#873f3b] px-2.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap shadow-2xs">
                  <span className="text-[10px] font-sans font-bold uppercase text-[#873f3b]/70">PM</span>
                  5:00 PM – 9:00 PM
                </span>
              </div>
            </div>

            {/* Sunday */}
            <div className="bg-[#FAF8F5] border border-[#EAE3D6] rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
              <div>
                <p className="text-xs font-bold text-neutral-900">Sunday</p>
                <p className="text-[11px] text-neutral-500 font-medium mt-0.5">Weekly Schedule</p>
              </div>

              <span className="inline-flex items-center gap-1.5 bg-rose-50 border border-rose-200 text-rose-700 font-medium px-3.5 py-1.5 rounded-lg text-xs whitespace-nowrap self-start sm:self-auto">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                Closed (Emergency On-Call Only)
              </span>
            </div>
          </div>
        </div>

        {/* Row 3: Quick Helpline & WhatsApp Coordinator Row (Medium Proportions) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <a
            href="tel:+917249727104"
            className="bg-white rounded-2xl border border-[#EAE3D6] p-5 flex items-center justify-between shadow-2xs hover:border-[#873f3b]/40 hover:shadow-xs transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#FAF0DD] text-[#873f3b] flex items-center justify-center shrink-0 border border-[#D4AF37]/25 group-hover:scale-105 transition-transform">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider font-bold text-neutral-500">
                  Clinic Helpdesk &amp; Assistance
                </p>
                <p className="text-lg font-bold text-neutral-900 font-playfair mt-0.5">
                  +91 72497 27104
                </p>
                <p className="text-xs text-neutral-400">Available during consultation hours</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-neutral-400 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="https://wa.me/917249727104?text=Hello%20Clinic%20Coordinator,%20I%20need%20assistance%20regarding%20my%20visit%20to%20Shingare%20Skin%20Clinic."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-2xl border border-[#EAE3D6] p-5 flex items-center justify-between shadow-2xs hover:border-[#25D366]/40 hover:shadow-xs transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200/60 group-hover:scale-105 transition-transform">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider font-bold text-emerald-800">
                  WhatsApp Coordinator
                </p>
                <p className="text-lg font-bold text-neutral-900 font-playfair mt-0.5">
                  Chat With Clinic Coordinator
                </p>
                <p className="text-xs text-neutral-400">Instant reports, follow-up &amp; directions</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-neutral-400 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>
    </main>
  );
}
