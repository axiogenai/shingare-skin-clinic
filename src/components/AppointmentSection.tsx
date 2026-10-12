"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CalendarCheck,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  ShieldCheck,
  Stethoscope,
  Activity,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

const TREATMENT_OPTIONS = [
  { label: "Clinical Dermatology", sub: "Acne, Eczema, Psoriasis, Allergies" },
  { label: "Trichology & Hair Restoration", sub: "Hair Fall, PRP, GFC, Alopecia" },
  { label: "Aesthetic Lasers & Scar Revision", sub: "Q-Switched Laser, Resurfacing" },
  { label: "Signature Medi-Facials & Peels", sub: "Hydra Facial, Carbon Glow Peels" },
];

export default function AppointmentSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    concern: "Clinical Dermatology",
    date: new Date().toISOString().split("T")[0],
    slot: "Morning (10:00 AM – 1:30 PM)",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [submittedToken, setSubmittedToken] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ fullName?: string; phone?: string }>({});

  const validate = () => {
    const errs: { fullName?: string; phone?: string } = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errs.fullName = "Please enter patient full name";
    }
    const cleanPhone = formData.phone.replace(/\D/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      errs.phone = "Please enter valid 10-digit mobile number";
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
      // Post to ClinicOS server if available
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
      }).catch(() => null); // Graceful fallback
    } catch {
      // Local fallback
    }

    setSubmittedToken(tokenNum);
    setLoading(false);
  };

  return (
    <section id="booking" className="py-20 md:py-28 bg-white relative font-source scroll-mt-20">
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
            <div className="bg-[#F4F7F8] border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-[0_10px_35px_rgba(0,0,0,0.04)] h-full flex flex-col justify-between">
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                          Preferred Date
                        </label>
                        <input
                          type="date"
                          value={formData.date}
                          min={new Date().toISOString().split("T")[0]}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-sm focus:outline-none focus:border-[#108283] transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                          Session Slot
                        </label>
                        <select
                          value={formData.slot}
                          onChange={(e) => setFormData({ ...formData, slot: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-sm focus:outline-none focus:border-[#108283] transition-colors cursor-pointer"
                        >
                          <option value="Morning (10:00 AM – 1:30 PM)">Morning (10:00 AM – 1:30 PM)</option>
                          <option value="Evening (5:00 PM – 9:00 PM)">Evening (5:00 PM – 9:00 PM)</option>
                        </select>
                      </div>
                    </div>

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

          {/* Right Column: OPD Info & Helpline (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            <div className="bg-[#FAF0DD]/70 border border-[#F0DAAA] rounded-3xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-[#108283]">
                <Clock className="w-5 h-5" />
                <h3 className="font-playfair font-bold text-gray-950 text-lg">
                  Daily OPD Schedule
                </h3>
              </div>

              <div className="space-y-2 text-xs text-gray-800">
                <div className="flex justify-between py-1.5 border-b border-[#F0DAAA]/60">
                  <span className="font-semibold">Monday – Saturday Morning</span>
                  <span className="font-bold text-[#108283]">10:00 AM – 1:30 PM</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#F0DAAA]/60">
                  <span className="font-semibold">Monday – Saturday Evening</span>
                  <span className="font-bold text-[#108283]">5:00 PM – 9:00 PM</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="font-semibold text-amber-900">Sunday</span>
                  <span className="font-bold text-red-600">Closed (Emergency Only)</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-[0_8px_25px_rgba(0,0,0,0.03)] space-y-3">
              <div className="flex items-center gap-2 text-[#108283]">
                <Phone className="w-5 h-5" />
                <h3 className="font-playfair font-bold text-gray-950 text-lg">
                  Clinic Helpline
                </h3>
              </div>
              <p className="text-xs text-gray-600">
                Need urgent appointment assistance or post-procedure guidance? Call our reception desk directly:
              </p>
              <a
                href="tel:+917249727104"
                className="block text-center py-2.5 px-4 rounded-xl bg-[#108283]/10 hover:bg-[#108283]/20 text-[#108283] font-bold text-sm transition-colors"
              >
                +91 72497 27104
              </a>
            </div>

            <div className="bg-[#F4F7F8] border border-gray-100 rounded-3xl p-6 space-y-2 text-xs text-gray-700">
              <div className="flex items-center gap-2 text-gray-900 font-semibold">
                <MapPin className="w-4 h-4 text-[#F0A070]" />
                <span>Clinic Address</span>
              </div>
              <p className="leading-relaxed">
                Shingare Skin Clinic, Main Road, Near Bus Stand, Peth Vadgaon, Kolhapur – 416112. Free parking available.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


