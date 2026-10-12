"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Clock,
  MessageCircle,
  CalendarCheck,
  Send,
  Navigation,
  Compass,
  ChevronRight,
  CheckCircle2,
  Calendar,
  Share2,
} from "lucide-react";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;

    setSubmitted(true);
    setSubmittedData({ ...formData });

    // Store in browser storage
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
    <main className="min-h-screen bg-[#F8F6F3] font-source">
      {/* 1. Page Header */}
      <div className="pt-[72px] bg-[#FAF8F5] border-b border-[#EAE5DE]">
        <div className="max-w-[1060px] mx-auto px-5 sm:px-8 pt-8 pb-10 text-center">
          <div className="inline-flex items-center gap-1.5 bg-[#E6F3F1] border border-[#C5E5DF] text-[#108283] rounded-full px-3.5 py-1 text-[10px] font-bold tracking-[0.2em] uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#108283]" />
            <span>PETH VADGAON, KOLHAPUR • EST. EXCELLENCE</span>
          </div>

          <h1 className="font-playfair text-4xl sm:text-5xl font-normal text-gray-950 mb-3 leading-tight">
            Contact &amp; Clinic Location
          </h1>

          <p className="font-playfair italic text-sm sm:text-base text-gray-600 max-w-xl mx-auto leading-relaxed">
            Dr. Pramod &amp; Dr. Priyanka Shingare • Comprehensive Dermatology &amp; Aesthetic Care
          </p>
        </div>
      </div>

      {/* 2. Main Content Grid */}
      <section className="max-w-[1060px] mx-auto px-5 sm:px-8 py-8 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (7 cols): Location & OPD Schedule */}
          <div className="lg:col-span-7 space-y-6">
            {/* Card 1: Clinic Location & Interactive Mock Map */}
            <div className="bg-white rounded-2xl border border-[#EAE5DE] p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#E6F3F1] text-[#108283] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-playfair text-xl font-bold text-gray-950">
                      Shingare Skin &amp; Cosmetics Clinic
                    </h2>
                    <p className="text-[11px] text-gray-500">Central Location • Accessible Parking</p>
                  </div>
                </div>

                <span className="bg-[#FEF6E9] border border-[#F6E1C1] text-[#B87A24] text-[10px] font-semibold px-2.5 py-1 rounded-full">
                  Opp. Rajaram Chitra Mandir
                </span>
              </div>

              {/* Address Box */}
              <div className="bg-[#FAF8F5] border border-[#EAE5DE] rounded-xl p-3.5 text-xs text-gray-700 leading-relaxed">
                <span className="font-bold text-gray-900">Clinic Address:</span> Main Road, Near S.T. Bus Stand, Opp. Rajaram Chitra Mandir, Peth Vadgaon, Kolhapur District, Maharashtra – 416112.
              </div>

              {/* Styled Mock Map Container */}
              <div className="relative rounded-xl border border-[#D5E7E2] bg-[#EEF6F3] p-6 overflow-hidden">
                {/* SVG Dotted Grid Background */}
                <div
                  className="absolute inset-0 opacity-40 pointer-events-none"
                  style={{
                    backgroundImage: "radial-gradient(#108283 1.2px, transparent 1.2px)",
                    backgroundSize: "16px 16px",
                  }}
                />

                <div className="relative z-10 flex flex-col justify-between min-h-[160px]">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-xs border border-[#C5E5DF] text-gray-700 px-2.5 py-1 rounded-full font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#108283]" />
                      Peth Vadgaon Junction
                    </span>

                    <span className="bg-white/90 backdrop-blur-xs border border-[#C5E5DF] text-gray-700 px-2.5 py-1 rounded-full font-semibold">
                      100M FROM BUS STAND
                    </span>
                  </div>

                  {/* Center Pin Marker */}
                  <div className="text-center my-4">
                    <div className="w-10 h-10 rounded-full bg-[#108283] text-white flex items-center justify-center mx-auto shadow-md">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <span className="inline-block mt-1 bg-white text-gray-900 text-[11px] font-bold px-3 py-0.5 rounded-full shadow-xs border border-gray-200">
                      Shingare Clinic
                    </span>
                  </div>

                  {/* Bottom Actions */}
                  <div className="flex items-center justify-between gap-3 pt-2">
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Shingare+Skin+and+Cosmetics+Clinic+Peth+Vadgaon+Kolhapur"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#108283] hover:underline cursor-pointer"
                    >
                      <Compass className="w-3.5 h-3.5" />
                      <span>Open in Google Maps</span>
                    </a>

                    <a
                      href="https://www.google.com/maps/dir/?api=1&destination=Peth+Vadgaon+Kolhapur+Maharashtra"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-[#108283] hover:bg-[#0c6b6c] text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-xs transition-colors cursor-pointer"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Get Directions</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: OPD Consultation Hours */}
            <div className="bg-white rounded-2xl border border-[#EAE5DE] p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#E6F3F1] text-[#108283] flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-playfair text-xl font-bold text-gray-950">
                      OPD Consultation Hours
                    </h3>
                    <p className="text-[11px] text-gray-500">Morning &amp; Evening Regular OPD Sessions</p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 bg-[#E6F7F0] border border-[#BDE8D4] text-[#0D7D4D] text-[10.5px] font-semibold px-3 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0D7D4D] animate-pulse" />
                  Clinic currently OPEN for Consultations
                </span>
              </div>

              {/* Schedule Table */}
              <div className="space-y-2 pt-1">
                {scheduleData.map((item) => (
                  <div
                    key={item.day}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-1.5 border-b border-[#F4EFEA] last:border-0 text-xs"
                  >
                    <span className="font-semibold text-gray-800 w-24">{item.day}</span>

                    {item.closed ? (
                      <div className="w-full sm:w-auto flex-1">
                        <span className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-[#FDF2F2] border border-[#FBD5D5] text-[#D12E2E] font-semibold px-4 py-1.5 rounded-full text-[11px]">
                          <span>⊘</span>
                          <span>{item.text}</span>
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                        <span className="border border-[#E2DBD3] bg-[#FAF8F5] text-gray-700 px-3 py-1 rounded-md text-[11px]">
                          Morning: {item.morning}
                        </span>
                        <span className="border border-[#CBE5DF] bg-[#F0F8F6] text-[#108283] px-3 py-1 rounded-md text-[11px] font-medium">
                          Evening: {item.evening}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Send an Inquiry Form */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-[#EAE5DE] p-5 sm:p-6 shadow-xs space-y-4">
              <div>
                <span className="inline-block bg-[#FEF6E9] text-[#C47D1C] text-[10px] font-bold tracking-widest px-2.5 py-0.5 rounded-full uppercase mb-2">
                  FAST PATIENT SUPPORT
                </span>
                <h3 className="font-playfair text-2xl font-bold text-gray-950">
                  Send an Inquiry
                </h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  Have questions regarding treatments, fees, or doctor availability? Submit your inquiry below.
                </p>
              </div>

              {submitted && submittedData ? (
                <div className="bg-[#E6F7F0] border border-[#BDE8D4] rounded-xl p-5 space-y-3">
                  <div className="flex items-center gap-2 text-[#0D7D4D]">
                    <CheckCircle2 className="w-5 h-5" />
                    <p className="font-bold text-sm">Inquiry Logged Successfully!</p>
                  </div>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    Thank you, <strong>{submittedData.name}</strong>. Our front desk has received your consultation query for <strong>{submittedData.department}</strong>.
                  </p>

                  <a
                    href={getWhatsAppInquiryUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white py-2.5 px-4 rounded-xl text-xs font-bold shadow-xs transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send Query Directly via WhatsApp</span>
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
                    className="text-xs text-gray-500 hover:text-gray-800 underline block mx-auto pt-1 cursor-pointer"
                  >
                    Submit another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rahul Patil"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2DBD3] bg-[#FAF8F5] text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#108283]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                      10-Digit Mobile Number *
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-[#E2DBD3] bg-[#F0ECE6] text-xs font-semibold text-gray-700">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-r-xl border border-[#E2DBD3] bg-[#FAF8F5] text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#108283]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                      Select Department / Concern
                    </label>
                    <select
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2DBD3] bg-[#FAF8F5] text-xs text-gray-800 focus:outline-none focus:border-[#108283]"
                    >
                      <option>General Dermatology (Skin &amp; Allergy)</option>
                      <option>Laser &amp; Cosmetic Treatments</option>
                      <option>Hair Loss &amp; Scalp Therapy</option>
                      <option>Acne &amp; Scar Revision</option>
                      <option>Pigmentation &amp; Melasma</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                      Message / Pre-Consultation Query
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Briefly describe your symptoms or appointment query..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2DBD3] bg-[#FAF8F5] text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#108283] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#108283] hover:bg-[#0c6b6c] text-white py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Inquiry</span>
                  </button>
                </form>
              )}

              {/* Bottom Quick Token CTA */}
              <div className="pt-3 border-t border-[#F0ECE6] flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold text-gray-900">Prefer an instant token?</p>
                  <p className="text-[11px] text-gray-400">Book directly into the digital queue</p>
                </div>

                <Link
                  href="/book-now"
                  className="inline-flex items-center gap-1.5 border border-[#E2DBD3] hover:bg-[#FAF8F5] text-[#108283] text-xs font-bold px-3 py-2 rounded-xl transition-colors shrink-0 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#108283]" />
                  <span>Book Token</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Bottom Quick Helpline & WhatsApp Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="tel:+917249727104"
            className="bg-white rounded-2xl border border-[#EAE5DE] p-5 flex items-center justify-between shadow-xs hover:border-[#108283]/40 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-[#FBF2EA] text-[#C47D1C] flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-wider font-bold text-gray-400">
                  Clinic Helpdesk &amp; Assistance
                </p>
                <p className="text-lg font-bold text-gray-900 font-playfair">+91 72497 27104</p>
                <p className="text-[11px] text-gray-400">Available during consultation hours</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-300" />
          </a>

          <a
            href="https://wa.me/917249727104?text=Hello%20Clinic%20Coordinator,%20I%20need%20assistance%20regarding%20my%20visit%20to%20Shingare%20Skin%20Clinic."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-2xl border border-[#EAE5DE] p-5 flex items-center justify-between shadow-xs hover:border-emerald-500/40 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-[#EBF7F2] text-[#0D7D4D] flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-wider font-bold text-emerald-700">
                  WhatsApp Coordinator
                </p>
                <p className="text-lg font-bold text-gray-900 font-playfair">Chat With Clinic Coordinator</p>
                <p className="text-[11px] text-gray-400">Instant reports, follow-up &amp; directions</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-300" />
          </a>
        </div>

        {/* 4. Simple Footer */}
        <div className="border-t border-[#EAE5DE] pt-6 pb-2 text-xs text-gray-500 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-gray-600">
            <span className="font-semibold text-gray-800">शिनगारे Skin &amp; Cosmetics</span> • Peth Vadgaon, Kolhapur
          </p>
          <div className="flex items-center gap-4 text-gray-500 text-[11px]">
            <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
            <span>•</span>
            <Link href="/terms" className="hover:underline">Patient Guidelines</Link>
            <span>•</span>
            <Link href="/terms" className="hover:underline">Terms of Care</Link>
          </div>
          <p className="text-gray-400 text-[11px]">
            &copy; 2026 Shingare Skin Clinic. All rights reserved.
          </p>
        </div>
      </section>
    </main>
  );
}
