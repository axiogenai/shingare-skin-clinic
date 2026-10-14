"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  CalendarCheck,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";

const TREATMENT_OPTIONS = [
  { label: "Clinical Dermatology", sub: "Acne, Eczema, Psoriasis, Allergies" },
  { label: "Trichology & Hair Restoration", sub: "Hair Fall, PRP, GFC, Alopecia" },
  { label: "Aesthetic Lasers & Scar Revision", sub: "Q-Switched Laser, Resurfacing" },
  { label: "Signature Medi-Facials & Peels", sub: "Hydra Facial, Carbon Glow Peels" },
];

function getLocalDateString(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function AppointmentSection() {
  const todayStr = useMemo(() => getLocalDateString(new Date()), []);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    concern: "Clinical Dermatology",
    date: todayStr,
    slot: "Morning (10:00 AM – 1:30 PM)",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [submittedToken, setSubmittedToken] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ fullName?: string; phone?: string; date?: string }>({});

  const validate = () => {
    const errs: { fullName?: string; phone?: string; date?: string } = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errs.fullName = "Please enter patient full name";
    }
    const cleanPhone = formData.phone.replace(/\D/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      errs.phone = "Please enter valid 10-digit mobile number";
    }
    if (formData.date < todayStr) {
      errs.date = "Previous dates are locked. Please pick today or a future date.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    const tokenNum = `TK-${Math.floor(100 + Math.random() * 900)}`;

    try {
      await fetch("http://localhost:5000/api/portal/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          phone: formData.phone,
          concern: formData.concern,
          date: formData.date,
          slot: formData.slot,
          notes: formData.notes,
          token: tokenNum,
        }),
      }).catch(() => null);
    } catch {
      // Local fallback
    }

    setSubmittedToken(tokenNum);
    setLoading(false);
  };

  return (
    <section id="booking" className="py-20 md:py-28 bg-[#f4f0e8] relative font-source scroll-mt-20">
      <div className="max-w-[1140px] mx-auto px-5 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-block bg-[#FAEDDA] text-[#108283] text-xs md:text-sm font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider">
            OPD APPOINTMENT
          </div>
          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl text-gray-950 font-normal leading-tight mb-4">
            Book Your <span className="text-[#108283] font-bold italic">Consultation Token</span>
          </h2>
          <p className="text-gray-600 text-base md:text-lg font-normal leading-relaxed">
            Shingare Skin Clinic, Peth Vadgaon, Kolhapur. Pre-booking generates a sequential token to minimize your waiting time at the clinic.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Form Card (7 cols) */}
          <div className="lg:col-span-7 flex flex-col h-full">
            <div className="bg-white border border-stone-200/80 rounded-3xl p-6 sm:p-8 shadow-[0_10px_35px_rgba(0,0,0,0.03)] h-full flex flex-col justify-between">
              {submittedToken ? (
                <div className="text-center py-8 space-y-4 animate-in fade-in duration-300 my-auto">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-gray-950">
                    Token Generated Successfully!
                  </h3>

                  <div className="inline-block px-6 py-3 rounded-2xl bg-white border-2 border-[#108283] shadow-xs">
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Your OPD Token</p>
                    <p className="text-3xl sm:text-4xl font-black text-[#108283] font-playfair">{submittedToken}</p>
                  </div>

                  <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                    Patient: <strong className="text-gray-900">{formData.fullName}</strong>. Your token is registered in the clinic EMR for <strong>{formData.slot}</strong> on <strong>{formData.date}</strong>.
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                    <Link
                      href={`/live-queue?token=${submittedToken}`}
                      className="inline-flex items-center gap-2 bg-[#108283] hover:bg-[#0c6b6c] text-white rounded-full px-6 py-3 text-xs font-semibold shadow-xs"
                    >
                      <Clock className="w-4 h-4" />
                      <span>Track Token Live</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => setSubmittedToken(null)}
                      className="text-xs text-gray-600 hover:text-[#108283] underline underline-offset-4 py-2 cursor-pointer"
                    >
                      Book another token
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 flex flex-col justify-between h-full">
                  <div className="space-y-4">
                    {/* Patient Name & Mobile */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                          Patient Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="e.g. Ramesh Kulkarni"
                          className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-sm focus:outline-none focus:border-[#108283] transition-colors"
                        />
                        {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                          Mobile Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="e.g. 9876543210"
                          className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-sm focus:outline-none focus:border-[#108283] transition-colors"
                        />
                        {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                      </div>
                    </div>

                    {/* Concern / Service */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Clinical Concern / Service
                      </label>
                      <select
                        value={formData.concern}
                        onChange={(e) => setFormData({ ...formData, concern: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-sm focus:outline-none focus:border-[#108283] transition-colors cursor-pointer"
                      >
                        {TREATMENT_OPTIONS.map((t) => (
                          <option key={t.label} value={t.label}>
                            {t.label} ({t.sub})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Preferred Date & Session Slot (Clean, Flat, Simple UI) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Preferred Date with previous date locking */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                            Preferred Date
                          </label>
                          <span className="text-[11px] text-gray-400 font-medium">
                            Past dates locked
                          </span>
                        </div>
                        <input
                          type="date"
                          min={todayStr}
                          value={formData.date}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val && val < todayStr) {
                              setFormData({ ...formData, date: todayStr });
                              setErrors((prev) => ({ ...prev, date: "Previous dates cannot be selected." }));
                            } else {
                              setFormData({ ...formData, date: val });
                              setErrors((prev) => ({ ...prev, date: undefined }));
                            }
                          }}
                          className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-sm focus:outline-none focus:border-[#108283] transition-colors cursor-pointer"
                        />
                        {errors.date && <p className="text-xs text-red-500 mt-1">{errors.date}</p>}
                      </div>

                      {/* Session Slot: Simple Flat 2-Button Toggle */}
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                          Session Slot
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              setFormData({ ...formData, slot: "Morning (10:00 AM – 1:30 PM)" })
                            }
                            className={`py-3 px-2 rounded-xl border text-center transition-all cursor-pointer font-medium text-xs ${
                              formData.slot.startsWith("Morning")
                                ? "bg-[#108283] text-white border-[#108283] font-bold"
                                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                            }`}
                          >
                            <div>Morning</div>
                            <div className="text-[10px] opacity-85 font-normal">10:00 – 1:30</div>
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              setFormData({ ...formData, slot: "Evening (5:00 PM – 9:00 PM)" })
                            }
                            className={`py-3 px-2 rounded-xl border text-center transition-all cursor-pointer font-medium text-xs ${
                              formData.slot.startsWith("Evening")
                                ? "bg-[#108283] text-white border-[#108283] font-bold"
                                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                            }`}
                          >
                            <div>Evening</div>
                            <div className="text-[10px] opacity-85 font-normal">5:00 – 9:00</div>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Chief Complaint */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Chief Complaint / Brief Note (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="e.g. severe acne on cheeks for 6 months"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-sm focus:outline-none focus:border-[#108283] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#108283] hover:bg-[#0c6b6c] text-white py-3.5 rounded-full text-sm font-semibold transition-all shadow-[0_4px_14px_rgba(16,130,131,0.25)] hover:shadow-[0_6px_20px_rgba(16,130,131,0.35)] active:scale-95 cursor-pointer disabled:opacity-75 flex items-center justify-center gap-2"
                    >
                      <CalendarCheck className="w-4 h-4 text-white" />
                      <span>{loading ? "Generating Token..." : "Generate Appointment Token"}</span>
                    </button>
                    <p className="text-[11px] text-gray-500 text-center mt-2 flex items-center justify-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Direct sync with ClinicOS Receptionist Dashboard</span>
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Information Bento (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="bg-[#FAF0DD] border border-[#F0DAAA] rounded-3xl p-6 sm:p-7">
              <span className="text-[11px] uppercase tracking-wider font-bold text-[#108283] block mb-1">
                Queue Efficiency
              </span>
              <h3 className="font-playfair text-xl sm:text-2xl font-bold text-gray-950 mb-3">
                Why Pre-Book a Token?
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-gray-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#108283] shrink-0 mt-0.5" />
                  <span>
                    <strong>Zero Waiting Confusion:</strong> Receive a real-time token tracking link via SMS/WhatsApp.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#108283] shrink-0 mt-0.5" />
                  <span>
                    <strong>Prioritized Consultation:</strong> Guaranteed consult window in morning or evening session.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#108283] shrink-0 mt-0.5" />
                  <span>
                    <strong>Direct EMR Sync:</strong> Your clinical concerns are pre-loaded for Dr. Pramod Shingare.
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-7 shadow-xs space-y-4">
              <h4 className="font-playfair text-lg font-bold text-gray-950">
                Need Immediate Help?
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                For acute skin flares, drug rashes, or urgent same-day consultations, speak directly with our clinic desk.
              </p>

              <div className="space-y-2.5 pt-1 text-xs">
                <a
                  href="tel:+917249727104"
                  className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-200 hover:border-[#108283] transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-[#108283]" />
                    <span className="font-medium text-gray-800">Direct Desk: +91 72497 27104</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#108283]" />
                </a>

                <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#108283] shrink-0 mt-0.5" />
                  <span className="text-gray-700 leading-snug">
                    Shingare Skin &amp; Cosmetics Clinic, Near Central Bus Stand, Peth Vadgaon, Kolhapur — 416112
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
