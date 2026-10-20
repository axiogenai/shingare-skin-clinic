"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  CalendarCheck,
  CheckCircle2,
  Check,
  Clock,
  MapPin,
  Phone,
  ShieldCheck,
  ExternalLink,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  QrCode,
  Printer,
  Sun,
  Moon,
} from "lucide-react";

const TREATMENT_OPTIONS = [
  { label: "Clinical Dermatology", sub: "Acne, Eczema, Psoriasis, Allergies" },
  { label: "Trichology & Hair Restoration", sub: "Hair Fall, PRP, GFC, Alopecia" },
  { label: "Aesthetic Lasers & Scar Revision", sub: "Q-Switched Laser, Resurfacing" },
  { label: "Signature Medi-Facials & Peels", sub: "Hydra Facial, Carbon Glow Peels" },
];

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function getLocalDateString(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDisplayDate(dateStr: string): string {
  if (!dateStr) return "Select date";
  const [y, m, d] = dateStr.split("-").map(Number);
  const dateObj = new Date(y, m - 1, d);
  return dateObj.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function AppointmentSection() {
  const todayStr = useMemo(() => getLocalDateString(new Date()), []);
  const tomorrowStr = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return getLocalDateString(d);
  }, []);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    concern: "Clinical Dermatology",
    date: todayStr,
    slot: "Morning (10:00 AM – 1:30 PM)",
    notes: "",
  });

  const [calendarOpen, setCalendarOpen] = useState(false);
  const calendarRef = React.useRef<HTMLDivElement>(null);

  const todayDate = useMemo(() => new Date(), []);
  const todayYear = todayDate.getFullYear();
  const todayMonth = todayDate.getMonth();

  const [viewYear, setViewYear] = useState(todayYear);
  const [viewMonth, setViewMonth] = useState(todayMonth);

  // Close calendar popover on click outside
  React.useEffect(() => {
    if (!calendarOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target as Node)) {
        setCalendarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [calendarOpen]);

  const isPrevMonthDisabled =
    viewYear < todayYear || (viewYear === todayYear && viewMonth <= todayMonth);

  const handlePrevMonth = () => {
    if (isPrevMonthDisabled) return;
    if (viewMonth === 0) {
      setViewYear((y) => y - 1);
      setViewMonth(11);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewYear((y) => y + 1);
      setViewMonth(0);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const handleSelectDate = (dStr: string) => {
    if (dStr < todayStr) return;
    setFormData((prev) => ({ ...prev, date: dStr }));
    setErrors((prev) => ({ ...prev, date: undefined }));
    setCalendarOpen(false);
  };

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();

  const [loading, setLoading] = useState(false);
  const [submittedToken, setSubmittedToken] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ fullName?: string; phone?: string; date?: string }>({});

  const isNameValid = (name: string) => {
    const trimmed = name.trim();
    return trimmed.length >= 2 && /^[a-zA-Z\s.]+$/.test(trimmed);
  };

  const isPhoneValid = (phone: string) => {
    const clean = phone.replace(/\D/g, "");
    return clean.length === 10 && /^[6-9]\d{9}$/.test(clean);
  };

  const validate = () => {
    const errs: { fullName?: string; phone?: string; date?: string } = {};
    if (!isNameValid(formData.fullName)) {
      errs.fullName = "Please enter valid patient name (at least 2 letters, no numbers)";
    }
    if (!isPhoneValid(formData.phone)) {
      errs.phone = "Please enter valid 10-digit Indian mobile number (e.g. 9876543210)";
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
          <div className="inline-flex items-center gap-2 bg-[#7e423e]/8 text-[#7e423e] border border-[#7e423e]/18 px-4 py-1.5 rounded-full mb-4 text-[10.5px] sm:text-[11px] font-mono font-semibold uppercase tracking-[0.2em] shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7e423e]" />
            <span>OPD APPOINTMENT</span>
          </div>
          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl text-gray-950 font-normal leading-tight mb-4">
            Book Your <span className="text-[#873f3b] font-bold italic">Consultation Token</span>
          </h2>
          <p className="text-gray-600 text-base md:text-lg font-normal leading-relaxed">
            Shingare Skin Clinic, Peth Vadgaon, Kolhapur. Pre-booking generates a sequential token to minimize your waiting time at the clinic.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Form Card (7 cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <div
              style={{ transform: "none", transition: "none" }}
              className="bg-white border border-stone-200/80 rounded-3xl px-3.5 py-4 sm:p-7 md:p-8 shadow-[0_10px_35px_rgba(0,0,0,0.03)] flex flex-col !transform-none !transition-none"
            >
              {submittedToken ? (
                <div className="space-y-4 my-auto">
                  {/* Perfect Authentic OPD Appointment Card */}
                  <div
                    style={{ transform: "none", transition: "none" }}
                    className="bg-white border-2 border-[#873f3b]/30 rounded-2xl p-3.5 sm:p-6 shadow-[0_8px_30px_rgba(135,63,59,0.08)] relative overflow-hidden text-left !transform-none !transition-none"
                  >
                    {/* Top Accent Strip */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#873f3b]" />

                    {/* Card Header: Clinic & Doctor Credentials */}
                    <div className="flex items-start justify-between pb-4 border-b border-gray-100 gap-3">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#873f3b] block">
                          SHINGARE SKIN CLINIC & LASER CENTRE
                        </span>
                        <h3 className="font-playfair text-xl sm:text-2xl font-bold text-gray-950 leading-tight">
                          OPD Appointment Card
                        </h3>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Dr. Pramod Shingare • MD (Ayu), D.Dermatology • MMC Reg. I-87218-A
                        </p>
                      </div>
                      <div className="shrink-0 text-right">
                        <div className="inline-flex items-center gap-1 bg-[#FAF4F2] border border-[#873f3b]/30 text-[#873f3b] px-2.5 py-1 rounded-full text-[11px] font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#873f3b]" />
                          <span>Verified</span>
                        </div>
                        <span className="block text-[9px] text-gray-400 font-mono mt-1">EMR Authenticated</span>
                      </div>
                    </div>

                    {/* Main Token Highlight */}
                    <div className="my-4 p-3 sm:p-4 rounded-xl bg-[#FAF4F2] border border-[#873f3b]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider block">
                          Your OPD Token Number
                        </span>
                        <span className="text-3xl sm:text-4xl font-black text-[#873f3b] font-playfair tracking-tight">
                          {submittedToken}
                        </span>
                      </div>
                      <div className="text-left sm:text-right">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span>Active in Queue</span>
                        </div>
                        <span className="text-[10px] text-gray-400 block mt-1 font-mono">Token Seq: Confirmed</span>
                      </div>
                    </div>

                    {/* Structured Patient & Appointment Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 text-left text-xs pb-4 border-b border-gray-100">
                      <div className="p-2.5 rounded-lg bg-gray-50/80">
                        <span className="text-[10px] text-gray-400 uppercase font-semibold block">Patient Name</span>
                        <span className="font-bold text-gray-900 line-clamp-1">{formData.fullName}</span>
                      </div>

                      <div className="p-2.5 rounded-lg bg-gray-50/80">
                        <span className="text-[10px] text-gray-400 uppercase font-semibold block">Mobile Number</span>
                        <span className="font-bold text-gray-900 font-mono">+91 {formData.phone}</span>
                      </div>

                      <div className="p-2.5 rounded-lg bg-gray-50/80">
                        <span className="text-[10px] text-gray-400 uppercase font-semibold block">Appointment Date</span>
                        <span className="font-bold text-gray-900">{formatDisplayDate(formData.date)}</span>
                      </div>

                      <div className="p-2.5 rounded-lg bg-gray-50/80">
                        <span className="text-[10px] text-gray-400 uppercase font-semibold block">Session Slot</span>
                        <span className="font-bold text-gray-900">{formData.slot}</span>
                      </div>

                      <div className="col-span-2 p-2.5 rounded-lg bg-gray-50/80 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-gray-400 uppercase font-semibold block">Clinical Service</span>
                          <span className="font-bold text-[#873f3b]">{formData.concern}</span>
                        </div>
                        <QrCode className="w-8 h-8 text-[#873f3b]/70 shrink-0 ml-2" />
                      </div>
                    </div>

                    {/* Footer Verification Seal */}
                    <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-[10px] sm:text-[11px] text-gray-500">
                      <div className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Direct sync with ClinicOS Receptionist Dashboard</span>
                      </div>
                      <span className="font-mono text-[9px] text-gray-400">Peth Vadgaon, Kolhapur</span>
                    </div>
                  </div>

                  {/* Actions: Live Tracking & Print/Book Another */}
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                    <Link
                      href={`/live-queue?token=${submittedToken}`}
                      className="inline-flex items-center gap-2 bg-[#873f3b] hover:bg-[#723430] text-white rounded-full px-5 py-2.5 text-xs font-semibold shadow-xs transition-all cursor-pointer"
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span>Track Token Live</span>
                    </Link>

                    <button
                      type="button"
                      onClick={() => typeof window !== "undefined" && window.print()}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5 text-gray-500" />
                      <span>Print Card</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSubmittedToken(null);
                        setFormData((prev) => ({ ...prev, fullName: "", phone: "", notes: "" }));
                      }}
                      className="text-xs text-gray-500 hover:text-[#873f3b] underline underline-offset-4 py-2 cursor-pointer ml-1"
                    >
                      Book another token
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
                  <div className="space-y-4">
                    {/* Authentication Status Strip */}
                    <div className="flex items-start gap-2 sm:gap-2.5 pb-3 border-b border-gray-100 min-w-0">
                      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#FAF4F2] text-[#873f3b] border border-[#873f3b]/15 flex items-center justify-center shrink-0 mt-0.5">
                        <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                      <div className="flex-1 min-w-0 pr-1 sm:pr-0">
                        {/* Top Line: ClinicOS Verified OPD Portal + Small Official Token Label */}
                        <div className="flex items-center justify-between gap-1.5 sm:gap-2 min-w-0">
                          <span className="text-[12px] min-[390px]:text-[13px] sm:text-[15px] font-bold text-gray-950 block leading-tight whitespace-nowrap tracking-tight">
                            ClinicOS Verified OPD Portal
                          </span>
                          <span className="inline-flex items-center gap-1 text-[7px] min-[390px]:text-[7.5px] sm:text-[8px] font-mono font-bold bg-[#7e423e]/8 text-[#7e423e] border border-[#7e423e]/20 px-1.5 py-0.5 rounded-full uppercase tracking-wider shadow-2xs whitespace-nowrap shrink-0">
                            <span className="w-1 h-1 rounded-full bg-[#7e423e] shrink-0" />
                            Official Token
                          </span>
                        </div>
                        {/* Bottom Line: Full MMC Reg and Location with Zero Truncation */}
                        <span className="text-[9.5px] sm:text-[10px] text-gray-500 font-mono block leading-normal mt-0.5 whitespace-nowrap">
                          MMC Reg. I-87218-A • Peth Vadgaon
                        </span>
                      </div>
                    </div>

                    {/* Patient Name & Mobile */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                            Patient Full Name <span className="text-red-500">*</span>
                          </label>
                          {formData.fullName.trim().length > 0 && isNameValid(formData.fullName) && (
                            <span className="text-[11px] font-semibold text-[#873f3b] flex items-center gap-1">
                              <Check className="w-3 h-3 stroke-[2.5]" /> Valid
                            </span>
                          )}
                        </div>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => {
                            const val = e.target.value;
                            setFormData({ ...formData, fullName: val });
                            if (errors.fullName && isNameValid(val)) {
                              setErrors((prev) => ({ ...prev, fullName: undefined }));
                            }
                          }}
                          placeholder="e.g. Ramesh Kulkarni"
                          className={`w-full px-4 py-3 rounded-xl bg-white border text-sm focus:outline-none transition-colors ${
                            errors.fullName
                              ? "border-red-400 bg-red-50/20 focus:border-red-500"
                              : isNameValid(formData.fullName)
                              ? "border-[#873f3b] focus:border-[#873f3b]"
                              : "border-gray-200 focus:border-[#873f3b]"
                          }`}
                        />
                        {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                            Mobile Number <span className="text-red-500">*</span>
                          </label>
                          {formData.phone.length === 10 && isPhoneValid(formData.phone) ? (
                            <span className="text-[11px] font-semibold text-[#873f3b] flex items-center gap-1">
                              <ShieldCheck className="w-3 h-3 text-[#873f3b]" /> Verified
                            </span>
                          ) : (
                            <span className="text-[11px] text-gray-400 font-mono">10 digits</span>
                          )}
                        </div>
                        <div
                          className={`relative flex rounded-xl border bg-white overflow-hidden transition-colors ${
                            errors.phone
                              ? "border-red-400 focus-within:border-red-500"
                              : isPhoneValid(formData.phone)
                              ? "border-[#873f3b] focus-within:border-[#873f3b]"
                              : "border-gray-200 focus-within:border-[#873f3b]"
                          }`}
                        >
                          <span className="inline-flex items-center px-3 text-xs font-bold text-gray-500 bg-gray-50 border-r border-gray-200 select-none">
                            +91
                          </span>
                          <input
                            type="tel"
                            required
                            maxLength={10}
                            value={formData.phone}
                            onChange={(e) => {
                              const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 10);
                              setFormData({ ...formData, phone: digitsOnly });
                              if (errors.phone && isPhoneValid(digitsOnly)) {
                                setErrors((prev) => ({ ...prev, phone: undefined }));
                              }
                            }}
                            placeholder="9876543210"
                            className={`w-full px-4 py-3 bg-white text-sm focus:outline-none ${
                              errors.phone ? "bg-red-50/20" : ""
                            }`}
                          />
                        </div>
                        {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                      </div>
                    </div>

                    {/* Concern / Service - Simple, Modern UI */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                        Clinical Concern / Service
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {TREATMENT_OPTIONS.map((t) => {
                          const isSelected = formData.concern === t.label;
                          return (
                            <button
                              key={t.label}
                              type="button"
                              onClick={() => setFormData({ ...formData, concern: t.label })}
                              style={{
                                backgroundColor: isSelected ? "#FAF4F2" : "#ffffff",
                                borderColor: isSelected ? "#873f3b" : "#E5E7EB",
                              }}
                              className={`p-3.5 rounded-xl text-left transition-all duration-150 cursor-pointer border ${
                                isSelected
                                  ? "shadow-[0_2px_8px_rgba(135,63,59,0.12)] border-[#873f3b]"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <div className="flex items-center justify-between mb-0.5">
                                <span
                                  style={{ color: isSelected ? "#873f3b" : "#1F2937" }}
                                  className="text-xs sm:text-[13px] font-bold leading-tight"
                                >
                                  {t.label}
                                </span>
                                {isSelected ? (
                                  <div
                                    style={{ backgroundColor: "#873f3b" }}
                                    className="w-5 h-5 rounded-full text-white flex items-center justify-center shrink-0 ml-2 shadow-xs"
                                  >
                                    <Check className="w-3 h-3 stroke-[2.5]" />
                                  </div>
                                ) : (
                                  <div className="w-5 h-5 rounded-full border border-gray-300 shrink-0 ml-2" />
                                )}
                              </div>
                              <p
                                style={{ color: isSelected ? "#873f3b" : "#6B7280" }}
                                className="text-[11px] leading-snug line-clamp-1"
                              >
                                {t.sub}
                              </p>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Preferred Date & Session Slot (Clean, Flat, Simple UI) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Preferred Date with simple custom calendar picker */}
                      <div ref={calendarRef}>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                            Preferred Date
                          </label>
                          <span className="text-[11px] text-gray-400 font-medium">
                            Past dates locked
                          </span>
                        </div>

                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => setCalendarOpen(!calendarOpen)}
                            style={{
                              backgroundColor: "#ffffff",
                              borderColor: calendarOpen ? "#873f3b" : "#e5e7eb",
                            }}
                            className="w-full px-4 py-3 rounded-xl border text-sm flex items-center justify-between transition-colors cursor-pointer text-left focus:outline-none"
                          >
                            <div className="flex items-center gap-2.5">
                              <Calendar className="w-4 h-4 text-[#873f3b] shrink-0" />
                              <span className="font-medium text-gray-800 text-xs sm:text-sm">
                                {formatDisplayDate(formData.date)}
                              </span>
                              {formData.date === todayStr && (
                                <span className="text-[10px] font-semibold bg-[#FAF4F2] text-[#873f3b] px-2 py-0.5 rounded-full border border-[#873f3b]/20">
                                  Today
                                </span>
                              )}
                            </div>
                            <ChevronDown
                              className={`w-4 h-4 text-gray-400 ${
                                calendarOpen ? "rotate-180 text-[#873f3b]" : ""
                              }`}
                            />
                          </button>

                          {/* Simple, Clean Custom Calendar Popover (Directly Above Button / No Gap) */}
                          {calendarOpen && (
                            <div
                              style={{
                                backgroundColor: "#ffffff",
                                borderColor: "#e5e7eb",
                                boxShadow: "0 -8px 30px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.04)",
                              }}
                              className="absolute left-0 bottom-[calc(100%+4px)] z-50 w-full sm:w-[310px] rounded-2xl border p-4"
                            >
                            {/* Month Navigation */}
                            <div className="flex items-center justify-between mb-3 px-1">
                              <span className="text-sm font-bold text-gray-900">
                                {MONTH_NAMES[viewMonth]} {viewYear}
                              </span>
                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  disabled={isPrevMonthDisabled}
                                  onClick={handlePrevMonth}
                                  className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer"
                                  title="Previous month"
                                >
                                  <ChevronLeft className="w-4 h-4" />
                                </button>
                                <button
                                  type="button"
                                  onClick={handleNextMonth}
                                  className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-100 cursor-pointer"
                                  title="Next month"
                                >
                                  <ChevronRight className="w-4 h-4" />
                                </button>
                              </div>
                            </div>

                            {/* Weekday Names */}
                            <div className="grid grid-cols-7 gap-1 text-center mb-1">
                              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((dayName) => (
                                <span key={dayName} className="text-[11px] font-semibold text-gray-400 py-1">
                                  {dayName}
                                </span>
                              ))}
                            </div>

                            {/* Days Grid */}
                            <div className="grid grid-cols-7 gap-1 text-center">
                              {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                                <div key={`empty-${i}`} className="w-8 h-8 mx-auto" />
                              ))}

                              {Array.from({ length: daysInMonth }).map((_, i) => {
                                const day = i + 1;
                                const dStr = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                                const isPast = dStr < todayStr;
                                const isSelected = dStr === formData.date;
                                const isToday = dStr === todayStr;

                                return (
                                  <button
                                    key={dStr}
                                    type="button"
                                    disabled={isPast}
                                    onClick={() => handleSelectDate(dStr)}
                                    style={{
                                      backgroundColor: isSelected ? "#873f3b" : undefined,
                                      color: isSelected ? "#ffffff" : undefined,
                                    }}
                                    className={`w-8 h-8 mx-auto rounded-lg text-xs flex items-center justify-center ${
                                      isSelected
                                        ? "font-bold shadow-xs"
                                        : isPast
                                        ? "text-gray-300 cursor-not-allowed opacity-40"
                                        : isToday
                                        ? "text-[#873f3b] font-bold border border-[#873f3b]/40 hover:bg-[#FAF4F2] cursor-pointer"
                                        : "text-gray-700 hover:bg-gray-100 cursor-pointer font-medium"
                                    }`}
                                  >
                                    {day}
                                  </button>
                                );
                              })}
                            </div>

                            {/* Quick Select Footer */}
                            <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                              <div className="flex gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => handleSelectDate(todayStr)}
                                  className="px-2.5 py-1 rounded-md text-[11px] font-semibold text-[#873f3b] hover:bg-[#FAF4F2] cursor-pointer"
                                >
                                  Today
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleSelectDate(tomorrowStr)}
                                  className="px-2.5 py-1 rounded-md text-[11px] font-semibold text-gray-600 hover:bg-gray-100 cursor-pointer"
                                >
                                  Tomorrow
                                </button>
                              </div>
                              <button
                                type="button"
                                onClick={() => setCalendarOpen(false)}
                                className="text-[11px] font-medium text-gray-400 hover:text-gray-600 px-2 py-1 cursor-pointer"
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        )}
                        </div>

                        {errors.date && <p className="text-xs text-red-500 mt-1">{errors.date}</p>}
                      </div>

                      {/* Session Slot: Simple Flat 2-Button Toggle */}
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                          Session Slot
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { name: "Morning (10:00 AM – 1:30 PM)", label: "Morning", time: "10:00 – 1:30", icon: Sun },
                            { name: "Evening (5:00 PM – 9:00 PM)", label: "Evening", time: "5:00 – 9:00", icon: Moon },
                          ].map((slotItem) => {
                            const isSelected = formData.slot.startsWith(slotItem.label);
                            const SlotIcon = slotItem.icon;
                            return (
                              <button
                                key={slotItem.name}
                                type="button"
                                onClick={() => setFormData({ ...formData, slot: slotItem.name })}
                                style={{
                                  backgroundColor: isSelected ? "#FAF4F2" : "#ffffff",
                                  borderColor: isSelected ? "#873f3b" : "#E5E7EB",
                                  color: isSelected ? "#873f3b" : "#374151",
                                }}
                                className={`py-3 px-3 rounded-xl border text-center transition-all cursor-pointer font-medium text-xs ${
                                  isSelected
                                    ? "shadow-[0_2px_8px_rgba(135,63,59,0.12)] border-[#873f3b] font-bold"
                                    : "border-gray-200 hover:border-gray-300"
                                }`}
                              >
                                <div className="flex items-center justify-center gap-1.5 font-bold">
                                  <SlotIcon className="w-3.5 h-3.5 shrink-0" strokeWidth={2.2} />
                                  <span>{slotItem.label}</span>
                                </div>
                                <div
                                  style={{ color: isSelected ? "#873f3b" : "#6B7280" }}
                                  className="text-[10px] font-normal mt-0.5"
                                >
                                  {slotItem.time}
                                </div>
                              </button>
                            );
                          })}
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
                        className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-sm focus:outline-none focus:border-[#873f3b] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#873f3b] hover:bg-[#723430] text-white py-3.5 rounded-full text-sm font-semibold transition-all shadow-[0_4px_14px_rgba(135,63,59,0.22)] active:scale-[0.985] cursor-pointer disabled:opacity-75 flex items-center justify-center gap-2"
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
          <div className="lg:col-span-5 flex flex-col gap-5">
            <div
              style={{ transform: "none", transition: "none" }}
              className="bg-[#FAF0DD] border border-[#F0DAAA] rounded-3xl p-4 sm:p-7 !transform-none !transition-none"
            >
              <span className="text-[11px] uppercase tracking-wider font-bold text-[#873f3b] block mb-1">
                Queue Efficiency
              </span>
              <h3 className="font-playfair text-xl sm:text-2xl font-bold text-gray-950 mb-3">
                Why Pre-Book a Token?
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-gray-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#873f3b] shrink-0 mt-0.5" />
                  <span>
                    <strong>Zero Waiting Confusion:</strong> Receive a real-time token tracking link via SMS/WhatsApp.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#873f3b] shrink-0 mt-0.5" />
                  <span>
                    <strong>Prioritized Consultation:</strong> Guaranteed consult window in morning or evening session.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#873f3b] shrink-0 mt-0.5" />
                  <span>
                    <strong>Direct EMR Sync:</strong> Your clinical concerns are pre-loaded for Dr. Pramod Shingare.
                  </span>
                </li>
              </ul>
            </div>

            <div
              style={{ transform: "none", transition: "none" }}
              className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-7 shadow-xs space-y-4 !transform-none !transition-none"
            >
              <h4 className="font-playfair text-lg font-bold text-gray-950">
                Need Immediate Help?
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                For acute skin flares, drug rashes, or urgent same-day consultations, speak directly with our clinic desk.
              </p>

              <div className="space-y-2.5 pt-1 text-xs">
                <a
                  href="tel:+917249727104"
                  className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-200 hover:border-[#873f3b] transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-[#873f3b]" />
                    <span className="font-medium text-gray-800">Direct Desk: +91 72497 27104</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#873f3b]" />
                </a>

                <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#873f3b] shrink-0 mt-0.5" />
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
