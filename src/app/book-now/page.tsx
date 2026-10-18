"use client";

import React, { useState, useEffect, useRef, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Stethoscope,
  Droplets,
  Zap,
  ShieldCheck,
  Phone,
  MessageCircle,
  Clock,
  CheckCircle2,
  CalendarCheck,
  ArrowRight,
  Check,
  X,
  Activity,
  AlertCircle,
  Sun,
  Moon,
  Calendar as CalendarIcon,
  Lock,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { HeroBanner } from "@/components/SharedSections";
import { bookAppointment, type BookingResult } from "@/lib/clinicApi";
import { useScrollLock } from "@/lib/useScrollLock";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

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

interface TreatmentOption {
  title: string;
  subtitle: string;
  category: string;
  description: string;
  icon: any;
  doctorNote: string;
}

const treatmentOptions: TreatmentOption[] = [
  {
    title: "Clinical Dermatology",
    subtitle: "Acne, Eczema, Psoriasis & Vitiligo",
    category: "Medical OPD",
    description:
      "Comprehensive medical diagnostics and evidence-based clinical treatments by Dr. Pramod Shingare (MD Dermatology, Ayu.). Pharmacological management of chronic dermatoses.",
    icon: Stethoscope,
    doctorNote: "Consultation + Custom Digital Prescription",
  },
  {
    title: "Trichology & Hair Restoration",
    subtitle: "PRP, GFC & Follicular Growth",
    category: "Follicular Science",
    description:
      "Advanced autologous growth-factor concentrate (GFC) and PRP therapies to stop hair thinning, miniaturization, and alopecia areata.",
    icon: Activity,
    doctorNote: "Dermoscopy + Autologous Injections",
  },
  {
    title: "Aesthetic Lasers & Scar Revision",
    subtitle: "Q-Switched Nd:YAG & Resurfacing",
    category: "Laser Surgery",
    description:
      "High-precision laser resurfacing for deep atrophic acne scars, surgical scars, accidental scars, melasma, and tattoo removal.",
    icon: Zap,
    doctorNote: "Laser Resurfacing & Collagen Remodeling",
  },
  {
    title: "Signature Medi-Facials & Peels",
    subtitle: "Hydra Glow & Chemical Exfoliation",
    category: "Skin Rejuvenation",
    description:
      "Medical-grade facials, gentle extraction, carbon laser peels, and customized AHA/BHA chemical peels to deeply clarify and restore skin barrier glow.",
    icon: Droplets,
    doctorNote: "Sterile Medical Protocols & Antioxidant Infusion",
  },
];

function BookNowContent() {
  const searchParams = useSearchParams();
  const initialConcern = searchParams.get("concern") || searchParams.get("service") || "";

  const [selectedTreatment, setSelectedTreatment] = useState<TreatmentOption | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [patientGender, setPatientGender] = useState<"M" | "F" | "Other">("F");
  const [patientPhone, setPatientPhone] = useState("");
  const [patientVillage, setPatientVillage] = useState("");
  const [chiefComplaint, setChiefComplaint] = useState("");
  const [preferredSlot, setPreferredSlot] = useState("Morning (10:00 AM – 01:30 PM)");
  const [preferredDate, setPreferredDate] = useState(() => {
    return new Date().toISOString().split("T")[0];
  });

  // Custom Gender Dropdown state
  const [isGenderOpen, setIsGenderOpen] = useState(false);
  const genderRef = useRef<HTMLDivElement>(null);

  // Custom Calendar Picker state
  const [calendarOpen, setCalendarOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  const todayStr = useMemo(() => new Date().toISOString().split("T")[0], []);
  const todayDate = useMemo(() => new Date(), []);
  const todayYear = todayDate.getFullYear();
  const todayMonth = todayDate.getMonth();

  const [viewYear, setViewYear] = useState(todayYear);
  const [viewMonth, setViewMonth] = useState(todayMonth);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (genderRef.current && !genderRef.current.contains(e.target as Node)) {
        setIsGenderOpen(false);
      }
      if (calendarRef.current && !calendarRef.current.contains(e.target as Node)) {
        setCalendarOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();

  const [loading, setLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<BookingResult | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Lock background scrolling when the booking modal is open
  useScrollLock(isModalOpen);

  // Close modal on Escape key
  useEffect(() => {
    if (!isModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  useEffect(() => {
    if (initialConcern) {
      const match = treatmentOptions.find(
        (t) =>
          t.title.toLowerCase().includes(initialConcern.toLowerCase()) ||
          initialConcern.toLowerCase().includes(t.title.toLowerCase())
      );
      if (match) {
        handleOpenBooking(match);
      }
    }
  }, [initialConcern]);

  const handleOpenBooking = (treatment: TreatmentOption) => {
    setSelectedTreatment(treatment);
    setChiefComplaint(treatment.title);
    setIsModalOpen(true);
    setBookingSuccess(null);
    setErrorMessage("");
  };

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !patientPhone.trim()) {
      setErrorMessage("Please fill in your name and mobile number.");
      return;
    }

    const clean = patientPhone.replace(/\D/g, "");
    if (clean.length < 10) {
      setErrorMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const res = await bookAppointment({
        name: patientName.trim(),
        age: patientAge.trim(),
        gender: patientGender,
        phone: clean,
        village: patientVillage.trim(),
        service: selectedTreatment?.title || "Consultation",
        complaint: chiefComplaint.trim() || selectedTreatment?.title || "Skin/Hair Concern",
        preferredSlot,
        preferredDate,
        notes: `Online booking via SHINGARE SKIN & COSMETICS CLINIC Portal. Slot: ${preferredSlot}`,
      });

      if (res.success) {
        setBookingSuccess(res);
      } else {
        setErrorMessage(res.message || "Failed to complete booking. Please try again.");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Network error. Please try again or call clinic.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white font-source">
      {/* 1. Hero Banner with Primederm soft styling */}
      <HeroBanner
        badge="SHINGARE SKIN & COSMETICS CLINIC • PETH VADGAON"
        title="Book Appointment Token"
        subtitle="Consult Dr. Pramod Shingare (MD Dermatology) • Real-time ClinicOS OPD Queue Sync"
      />

      {/* 2. Intro Section */}
      <section className="w-full py-16 px-5 sm:px-6 md:px-8">
        <div className="max-w-[850px] mx-auto text-center">
          <div className="inline-block bg-[#873f3b]/8 text-[#873f3b] border border-[#873f3b]/18 text-xs md:text-sm font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider">
            INSTANT DIGITAL TOKEN GENERATION
          </div>
          <h2 className="font-['Playfair_Display',Georgia,serif] text-3xl sm:text-4xl text-[#1a241d] font-bold mb-4 tracking-tight">
            Direct Clinic Reservation
          </h2>
          <p className="text-[#555a50] text-base md:text-lg leading-relaxed mb-6 font-normal">
            Select your clinical treatment below to generate a priority OPD token. Your booking syncs immediately with the clinic&apos;s internal ClinicOS system, giving you real-time visibility over your queue position.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-[#3a4034]">
            <span className="flex items-center gap-1.5 bg-[#FAF8F5] px-3.5 py-1.5 rounded-full border border-[#292d27]/10">
              <CheckCircle2 className="w-4 h-4 text-[#873f3b]" /> Real-Time OPD Sync
            </span>
            <span className="flex items-center gap-1.5 bg-[#FAF8F5] px-3.5 py-1.5 rounded-full border border-[#292d27]/10">
              <CheckCircle2 className="w-4 h-4 text-[#873f3b]" /> Live Queue Tracking
            </span>
            <span className="flex items-center gap-1.5 bg-[#FAF8F5] px-3.5 py-1.5 rounded-full border border-[#292d27]/10">
              <CheckCircle2 className="w-4 h-4 text-[#873f3b]" /> MD Doctor Care
            </span>
          </div>
        </div>
      </section>

      {/* 3. Treatment Category Cards Grid */}
      <section className="w-full pb-20 px-5 sm:px-6 md:px-8 bg-[#FAF8F5] py-16 border-t border-[#292d27]/8">
        <div className="max-w-[1140px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-7">
            {treatmentOptions.map((category) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.title}
                  onClick={() => handleOpenBooking(category)}
                  className="bg-white rounded-2xl p-6 sm:p-7 md:p-8 border border-[#292d27]/10 shadow-[0_2px_12px_rgba(41,45,39,0.03),inset_0_1px_0_0_rgba(255,255,255,0.95)] flex flex-col justify-between cursor-pointer active:scale-[0.985] transition-transform"
                >
                  <div>
                    {/* Top Meta Strip */}
                    <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#292d27]/8">
                      <span className="font-mono text-[10.5px] uppercase font-bold text-[#873f3b] bg-[#873f3b]/8 border border-[#873f3b]/15 px-3 py-1 rounded-full tracking-wider">
                        {category.category}
                      </span>
                      <div className="w-9 h-9 rounded-xl bg-[#FAF6F0] border border-[#292d27]/10 flex items-center justify-center text-[#873f3b] shadow-2xs">
                        <Icon className="w-4 h-4 stroke-[1.75]" />
                      </div>
                    </div>

                    <h3 className="font-['Playfair_Display',Georgia,serif] text-xl sm:text-[22px] font-bold text-[#1a241d] mb-1 leading-snug tracking-tight">
                      {category.title}
                    </h3>
                    <p className="font-mono text-[10px] sm:text-[10.5px] uppercase font-semibold text-[#873f3b] tracking-[0.14em] mb-3">
                      {category.subtitle}
                    </p>

                    <p className="text-xs sm:text-[13.5px] text-[#555a50] leading-relaxed font-normal mb-5 min-h-[44px]">
                      {category.description}
                    </p>

                    <div className="bg-[#FAF8F5] border border-[#292d27]/10 text-[#292d27] text-xs px-3.5 py-2 rounded-xl mb-6 flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#873f3b] shrink-0" />
                      <span className="font-medium text-[11.5px] text-[#3a4034]">{category.doctorNote}</span>
                    </div>
                  </div>

                  <div className="w-full py-3.5 rounded-full bg-[#1a241d] text-white text-xs font-semibold uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-xs active:scale-[0.985]">
                    <CalendarCheck className="w-4 h-4 text-[#D4AF37]" />
                    <span>Book Treatment Token</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white/70" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Live Queue Quick-Check Banner */}
      <section className="w-full py-12 px-5 sm:px-6 md:px-8 bg-white">
        <div className="max-w-[1000px] mx-auto bg-[#FAF6F0] rounded-2xl p-6 sm:p-8 md:p-10 border border-[#292d27]/10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left shadow-2xs">
          <div>
            <span className="text-[10.5px] font-mono uppercase tracking-[0.16em] font-bold block text-[#873f3b]">
              Already Have A Token?
            </span>
            <h3 className="font-['Playfair_Display',Georgia,serif] text-2xl font-bold text-[#1a241d] mt-1 tracking-tight">
              Track Your Live Queue Position
            </h3>
            <p className="text-xs text-[#555a50] mt-1">
              Check how many patients are ahead and see when to leave home.
            </p>
          </div>
          <Link
            href="/live-queue"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#1a241d] text-white text-xs uppercase tracking-widest font-semibold shadow-sm active:scale-[0.985] shrink-0"
          >
            <Clock className="w-4 h-4 text-[#D4AF37]" />
            <span>Launch Token Radar</span>
            <ArrowRight className="w-4 h-4 text-white/70" />
          </Link>
        </div>
      </section>

      {/* 5. Helpline & OPD Schedule */}
      <section className="w-full py-16 px-5 sm:px-6 md:px-8 bg-[#FAF8F5] border-t border-[#292d27]/8">
        <div className="max-w-[1000px] mx-auto text-center">
          <h2 className="font-['Playfair_Display',Georgia,serif] text-2xl sm:text-3xl font-bold text-[#1a241d] mb-3 tracking-tight">
            Need Assistance Or Direct Phone Booking?
          </h2>
          <p className="text-[#555a50] max-w-xl mx-auto text-sm leading-relaxed mb-8">
            For emergencies, laser inquiries, or appointments, our reception desk at SHINGARE SKIN & COSMETICS CLINIC is happy to assist you.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[700px] mx-auto">
            <div className="bg-white rounded-2xl border border-[#292d27]/10 p-6 text-center flex flex-col items-center justify-center shadow-[0_2px_12px_rgba(41,45,39,0.03),inset_0_1px_0_0_rgba(255,255,255,0.95)]">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#FAF6F0] border border-[#292d27]/10 text-[#873f3b] mb-3 shadow-2xs">
                <Phone className="w-4 h-4" />
              </div>
              <p className="text-[10px] font-mono uppercase tracking-[0.16em] font-bold text-[#71717A] mb-1.5">
                Call Reception Desk
              </p>
              <a
                href="tel:+917249727104"
                className="text-lg font-bold text-[#1a241d] hover:text-[#873f3b] transition-colors font-mono tracking-tight"
              >
                +91 72497 27104
              </a>
            </div>

            <div className="bg-white rounded-2xl border border-[#292d27]/10 p-6 text-center flex flex-col items-center justify-center shadow-[0_2px_12px_rgba(41,45,39,0.03),inset_0_1px_0_0_rgba(255,255,255,0.95)]">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#FAF6F0] border border-[#292d27]/10 text-[#873f3b] mb-3 shadow-2xs">
                <MessageCircle className="w-4 h-4" />
              </div>
              <p className="text-[10px] font-mono uppercase tracking-[0.16em] font-bold text-[#71717A] mb-1.5">
                WhatsApp Helpline
              </p>
              <a
                href="https://wa.me/917249727104?text=Hello%20Shingare%20Skin%20Clinic,%20I%20want%20to%20inquire%20about%20an%20appointment"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-bold text-[#1a241d] hover:text-[#873f3b] transition-colors font-mono tracking-tight"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-[#555a50] text-center">
            <div className="flex items-center gap-1.5 shrink-0">
              <Clock className="w-4 h-4 text-[#873f3b]" />
              <span className="font-semibold text-gray-700">OPD Timings:</span>
            </div>
            <span>Mon–Sat 10:00 AM – 1:30 PM &amp; 5:00 PM – 9:00 PM | Sunday Closed</span>
          </div>
        </div>
      </section>

      {/* ================= MODAL APPOINTMENT BOOKING ================= */}
      <AnimatePresence>
        {isModalOpen && (
          <div
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsModalOpen(false);
            }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-2.5 sm:p-4 bg-black/50 backdrop-blur-xs overflow-y-auto overscroll-contain"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-gray-200 rounded-3xl w-full max-w-xl shadow-2xl p-4 sm:p-7 md:p-8 my-3 sm:my-8 relative"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 text-gray-400 hover:text-gray-700 p-1.5 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {bookingSuccess ? (
                /* SUCCESS STATE */
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-[#873f3b]/8 border border-[#873f3b]/20 rounded-2xl flex items-center justify-center mx-auto text-[#873f3b] mb-4 shadow-2xs">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <span className="text-[10.5px] font-mono uppercase tracking-[0.16em] font-bold text-[#873f3b]">
                    Appointment Confirmed
                  </span>

                  <div className="my-4">
                    <span className="text-[10px] font-mono text-gray-500 block uppercase font-semibold tracking-wider">Your Assigned Token</span>
                    <div className="text-5xl font-['Playfair_Display',Georgia,serif] font-bold text-[#873f3b] tracking-tight">
                      #{String(bookingSuccess.tokenNumber).padStart(2, "0")}
                    </div>
                  </div>

                  <h4 className="text-base font-bold text-gray-900">
                    {bookingSuccess.patient?.name}
                  </h4>

                  <p className="text-xs text-gray-600 mt-1">
                    Scheduled for: <strong>{bookingSuccess.date}</strong> • {preferredSlot}
                  </p>

                  <div className="bg-[#FAF8F5] border border-[#292d27]/10 rounded-2xl p-4 my-6 text-left text-xs text-gray-700 space-y-1.5 shadow-2xs">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Consulting Doctor:</span>
                      <span className="font-bold text-gray-900">Dr. Pramod Shingare (MD Dermatology, Ayu.)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Service:</span>
                      <span className="font-semibold text-[#873f3b]">{selectedTreatment?.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Clinic:</span>
                      <span>SHINGARE SKIN & COSMETICS CLINIC, Peth Vadgaon, Kolhapur</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Registration Phone:</span>
                      <span className="font-semibold">{patientPhone}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      href={`/live-queue?token=${bookingSuccess.tokenNumber}`}
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 py-3 rounded-full bg-[#1a241d] text-white text-xs font-semibold uppercase tracking-wider text-center flex items-center justify-center gap-1.5 shadow-xs active:scale-[0.985]"
                    >
                      <Clock className="w-4 h-4 text-[#D4AF37]" />
                      <span>Track In Live Queue</span>
                    </Link>

                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 py-3 rounded-full border border-gray-200 text-gray-700 text-xs font-medium hover:bg-gray-50 transition-colors"
                    >
                      Done
                    </button>
                  </div>
                </div>
              ) : (
                /* BOOKING FORM */
                <div>
                  <div className="flex items-center gap-3 mb-5 border-b border-gray-100 pb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#FAF6F0] border border-[#292d27]/10 text-[#873f3b] flex items-center justify-center shadow-2xs">
                      <CalendarCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-[0.14em] font-bold text-[#873f3b]">
                        {selectedTreatment?.category || "OPD Reservation"}
                      </span>
                      <h3 className="font-['Playfair_Display',Georgia,serif] text-xl font-bold text-[#1a241d]">
                        {selectedTreatment?.title || "Book Appointment"}
                      </h3>
                    </div>
                  </div>

                  {errorMessage && (
                    <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmitBooking} className="space-y-3.5 text-xs text-gray-700">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block font-bold uppercase tracking-wider text-gray-700 mb-1">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={patientName}
                          onChange={(e) => setPatientName(e.target.value)}
                          placeholder="e.g. Ramesh Kulkarni"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#873f3b] focus:outline-none text-xs"
                        />
                      </div>

                      <div>
                        <label className="block font-bold uppercase tracking-wider text-gray-700 mb-1">
                          Mobile Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={patientPhone}
                          onChange={(e) => setPatientPhone(e.target.value)}
                          placeholder="e.g. 9876543210"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#873f3b] focus:outline-none text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block font-bold uppercase tracking-wider text-gray-700 mb-1">
                          Age
                        </label>
                        <input
                          type="number"
                          value={patientAge}
                          onChange={(e) => setPatientAge(e.target.value)}
                          placeholder="e.g. 28"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#873f3b] focus:outline-none text-xs"
                        />
                      </div>

                      <div ref={genderRef} className="relative">
                        <label className="block font-bold uppercase tracking-wider text-gray-700 mb-1">
                          Gender
                        </label>
                        <button
                          type="button"
                          onClick={() => setIsGenderOpen((prev) => !prev)}
                          aria-haspopup="listbox"
                          aria-expanded={isGenderOpen}
                          className={`w-full px-3 py-2.5 rounded-xl border bg-white text-xs text-left text-gray-800 flex items-center justify-between transition-all cursor-pointer ${
                            isGenderOpen
                              ? "border-[#873f3b] ring-2 ring-[#FAF0DD]"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <span className="font-medium truncate">
                            {patientGender === "F" ? "Female" : patientGender === "M" ? "Male" : "Other"}
                          </span>
                          <ChevronDown
                            className={`w-3.5 h-3.5 text-gray-400 shrink-0 ml-1 transition-transform duration-200 ${
                              isGenderOpen ? "rotate-180 text-[#873f3b]" : ""
                            }`}
                          />
                        </button>

                        {isGenderOpen && (
                          <div
                            role="listbox"
                            className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-xl border border-gray-200 shadow-xl py-1 z-50 overflow-hidden"
                          >
                            {[
                              { label: "Female", val: "F" },
                              { label: "Male", val: "M" },
                              { label: "Other", val: "Other" },
                            ].map((opt) => {
                              const isSelected = patientGender === opt.val;
                              return (
                                <button
                                  key={opt.val}
                                  type="button"
                                  role="option"
                                  aria-selected={isSelected}
                                  onClick={() => {
                                    setPatientGender(opt.val as any);
                                    setIsGenderOpen(false);
                                  }}
                                  className={`w-full px-3 py-2 text-xs text-left flex items-center justify-between transition-colors cursor-pointer ${
                                    isSelected
                                      ? "bg-[#FAF0DD]/80 text-[#873f3b] font-semibold"
                                      : "text-gray-700 hover:bg-[#FAF8F5] hover:text-gray-900"
                                  }`}
                                >
                                  <span>{opt.label}</span>
                                  {isSelected && (
                                    <Check className="w-3.5 h-3.5 text-[#108283] shrink-0" />
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block font-bold uppercase tracking-wider text-gray-700 mb-1">
                          Village/City
                        </label>
                        <input
                          type="text"
                          value={patientVillage}
                          onChange={(e) => setPatientVillage(e.target.value)}
                          placeholder="e.g. Vadgaon"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#873f3b] focus:outline-none text-xs"
                        />
                      </div>
                    </div>

                    <div className="space-y-3.5">
                      {/* Preferred Date with Custom Luxury Calendar Picker */}
                      <div ref={calendarRef}>
                        <div className="flex items-center justify-between mb-1">
                          <label className="block font-bold uppercase tracking-wider text-gray-700">
                            Preferred Date
                          </label>
                          <span className="text-[10px] text-gray-500 font-medium flex items-center gap-1">
                            <Lock className="w-2.5 h-2.5 text-gray-400" />
                            Past dates locked
                          </span>
                        </div>

                        <div className="relative">
                          <button
                          type="button"
                          onClick={() => setCalendarOpen((prev) => !prev)}
                          className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-xs flex items-center justify-between transition-all cursor-pointer ${
                            calendarOpen
                              ? "border-[#873f3b] ring-2 ring-[#FAF0DD]"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <CalendarIcon className="w-4 h-4 text-[#873f3b] shrink-0" />
                            <span className="font-semibold text-gray-800 text-xs">
                              {formatDisplayDate(preferredDate)}
                            </span>
                            {preferredDate === todayStr && (
                              <span className="text-[10px] font-bold bg-[#FAF0DD] text-[#873f3b] border border-[#D4AF37]/35 px-2 py-0.5 rounded-full uppercase tracking-wider">
                                Today
                              </span>
                            )}
                          </div>
                          <ChevronDown
                            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                              calendarOpen ? "rotate-180 text-[#873f3b]" : ""
                            }`}
                          />
                        </button>

                        {/* Compact Luxury Calendar Popover (Opens Upwards Above Button) */}
                        {calendarOpen && (
                          <div className="absolute left-0 right-0 sm:right-auto sm:w-[270px] bottom-[calc(100%+6px)] bg-white rounded-xl border border-gray-200 p-3 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                            {/* Month & Year Navigation */}
                            <div className="flex items-center justify-between mb-2 px-1">
                              <span className="text-xs font-bold text-gray-900 tracking-wide">
                                {MONTH_NAMES[viewMonth]} {viewYear}
                              </span>
                              <div className="flex items-center gap-0.5">
                                <button
                                  type="button"
                                  disabled={isPrevMonthDisabled}
                                  onClick={handlePrevMonth}
                                  className="w-6 h-6 rounded-md flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer transition-colors"
                                  title="Previous month"
                                >
                                  <ChevronLeft className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={handleNextMonth}
                                  className="w-6 h-6 rounded-md flex items-center justify-center text-gray-600 hover:bg-gray-100 cursor-pointer transition-colors"
                                  title="Next month"
                                >
                                  <ChevronRight className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>

                            {/* Weekday Labels */}
                            <div className="grid grid-cols-7 gap-1 text-center mb-1">
                              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((dayName) => (
                                <span key={dayName} className="text-[10px] font-bold text-gray-400 py-0.5 uppercase">
                                  {dayName}
                                </span>
                              ))}
                            </div>

                            {/* Days Grid */}
                            <div className="grid grid-cols-7 gap-1 text-center">
                              {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                                <div key={`empty-${i}`} className="w-7 h-7 mx-auto" />
                              ))}

                              {Array.from({ length: daysInMonth }).map((_, i) => {
                                const dayNum = i + 1;
                                const mStr = String(viewMonth + 1).padStart(2, "0");
                                const dStr = String(dayNum).padStart(2, "0");
                                const dateString = `${viewYear}-${mStr}-${dStr}`;
                                const isPast = dateString < todayStr;
                                const isSelected = dateString === preferredDate;
                                const isToday = dateString === todayStr;

                                return (
                                  <button
                                    key={dateString}
                                    type="button"
                                    disabled={isPast}
                                    onClick={() => {
                                      setPreferredDate(dateString);
                                      setCalendarOpen(false);
                                    }}
                                    className={`w-7 h-7 mx-auto rounded-md text-[11px] font-medium flex items-center justify-center transition-all ${
                                      isSelected
                                        ? "bg-[#873f3b] text-white font-bold shadow-xs active:scale-95"
                                        : isPast
                                        ? "text-gray-300 cursor-not-allowed pointer-events-none line-through"
                                        : isToday
                                        ? "border border-[#873f3b] text-[#873f3b] font-bold hover:bg-[#FAF0DD]/50 cursor-pointer"
                                        : "text-gray-700 hover:bg-[#FAF8F5] cursor-pointer"
                                    }`}
                                  >
                                    {dayNum}
                                  </button>
                                );
                              })}
                            </div>

                            {/* Quick Select Buttons */}
                            <div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                              <button
                                type="button"
                                onClick={() => {
                                  setPreferredDate(todayStr);
                                  setViewYear(todayYear);
                                  setViewMonth(todayMonth);
                                  setCalendarOpen(false);
                                }}
                                className="text-[10.5px] font-bold text-[#873f3b] hover:underline cursor-pointer"
                              >
                                Select Today
                              </button>
                              <span className="text-[10px] text-gray-400">
                                Mon–Sat OPD Open
                              </span>
                            </div>
                          </div>
                        )}
                        </div>
                      </div>

                      {/* OPD Session Slot Cards */}
                      <div>
                        <label className="block font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                          OPD Session
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setPreferredSlot("Morning (10:00 AM – 1:30 PM)")}
                            className={`p-2.5 rounded-xl border-2 text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                              preferredSlot.startsWith("Morning")
                                ? "border-[#C5A059] bg-[#FAF8F4] shadow-xs"
                                : "border-stone-200/80 bg-white text-stone-700 hover:border-stone-300"
                            }`}
                          >
                            <div
                              className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border transition-colors ${
                                preferredSlot.startsWith("Morning")
                                  ? "bg-[#FAF2E6] text-[#8C6D32] border-[#E8D7BE] shadow-2xs"
                                  : "bg-stone-50 text-stone-400 border-stone-200/70"
                              }`}
                            >
                              <Sun className="w-4 h-4" />
                            </div>
                            <div>
                              <div
                                className={`text-xs leading-tight ${
                                  preferredSlot.startsWith("Morning")
                                    ? "font-bold text-stone-900"
                                    : "font-medium text-stone-700"
                                }`}
                              >
                                Morning
                              </div>
                              <div
                                className={`text-[10px] ${
                                  preferredSlot.startsWith("Morning")
                                    ? "text-stone-600 font-medium"
                                    : "text-stone-400"
                                }`}
                              >
                                10:00 – 1:30
                              </div>
                            </div>
                          </button>

                          <button
                            type="button"
                            onClick={() => setPreferredSlot("Evening (5:00 PM – 9:00 PM)")}
                            className={`p-2.5 rounded-xl border-2 text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                              preferredSlot.startsWith("Evening")
                                ? "border-[#C5A059] bg-[#FAF8F4] shadow-xs"
                                : "border-stone-200/80 bg-white text-stone-700 hover:border-stone-300"
                            }`}
                          >
                            <div
                              className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border transition-colors ${
                                preferredSlot.startsWith("Evening")
                                  ? "bg-[#EEF2F6] text-[#4A5D75] border-[#D0DBE8] shadow-2xs"
                                  : "bg-stone-50 text-stone-400 border-stone-200/70"
                              }`}
                            >
                              <Moon className="w-4 h-4" />
                            </div>
                            <div>
                              <div
                                className={`text-xs leading-tight ${
                                  preferredSlot.startsWith("Evening")
                                    ? "font-bold text-stone-900"
                                    : "font-medium text-stone-700"
                                }`}
                              >
                                Evening
                              </div>
                              <div
                                className={`text-[10px] ${
                                  preferredSlot.startsWith("Evening")
                                    ? "text-stone-600 font-medium"
                                    : "text-stone-400"
                                }`}
                              >
                                5:00 – 9:00
                              </div>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold uppercase tracking-wider text-gray-700 mb-1">
                        Chief Complaint / Details
                      </label>
                      <input
                        type="text"
                        value={chiefComplaint}
                        onChange={(e) => setChiefComplaint(e.target.value)}
                        placeholder="e.g. severe acne, itchiness, hair thinning"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#873f3b] focus:outline-none text-xs"
                      />
                    </div>

                    <div className="pt-3">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 rounded-full bg-[#1a241d] hover:bg-[#292d27] text-white text-xs uppercase tracking-wider font-semibold shadow-md active:scale-[0.985] disabled:opacity-70 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <CalendarCheck className="w-4 h-4 text-[#D4AF37]" />
                        <span>{loading ? "Registering Token..." : "Confirm & Generate Token"}</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default function BookNowPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <span className="text-sm font-semibold text-[#108283]">Loading Booking Portal...</span>
        </div>
      }
    >
      <BookNowContent />
    </Suspense>
  );
}




