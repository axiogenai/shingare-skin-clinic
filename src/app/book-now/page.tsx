"use client";

import React, { useState, useEffect, Suspense } from "react";
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
} from "lucide-react";
import { HeroBanner } from "@/components/SharedSections";
import { bookAppointment, type BookingResult } from "@/lib/clinicApi";

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

  const [loading, setLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<BookingResult | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

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
          <div className="inline-block bg-[#FAEDDA] text-[#108283] text-xs md:text-sm font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider">
            INSTANT DIGITAL TOKEN GENERATION
          </div>
          <h2 className="font-playfair text-3xl sm:text-4xl text-gray-950 font-normal mb-4">
            Direct Clinic Reservation
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6 font-normal">
            Select your clinical treatment below to generate a priority OPD token. Your booking syncs immediately with the clinic&apos;s internal ClinicOS system, giving you real-time visibility over your queue position.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-gray-800">
            <span className="flex items-center gap-1.5 bg-[#FAF0DD] px-3.5 py-1.5 rounded-full border border-[#F0DAAA]/60">
              <CheckCircle2 className="w-4 h-4 text-[#108283]" /> Real-Time OPD Sync
            </span>
            <span className="flex items-center gap-1.5 bg-[#FAF0DD] px-3.5 py-1.5 rounded-full border border-[#F0DAAA]/60">
              <CheckCircle2 className="w-4 h-4 text-[#108283]" /> Live Queue Tracking
            </span>
            <span className="flex items-center gap-1.5 bg-[#FAF0DD] px-3.5 py-1.5 rounded-full border border-[#F0DAAA]/60">
              <CheckCircle2 className="w-4 h-4 text-[#108283]" /> MD Doctor Care
            </span>
          </div>
        </div>
      </section>

      {/* 3. Treatment Category Cards Grid */}
      <section className="w-full pb-20 px-5 sm:px-6 md:px-8 bg-[#F4F7F8] py-16">
        <div className="max-w-[1140px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {treatmentOptions.map((category) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.title}
                  onClick={() => handleOpenBooking(category)}
                  className="group cursor-pointer bg-white rounded-3xl p-7 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(16,130,131,0.08)] border border-gray-100 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Icon */}
                    <div className="w-12 h-12 mb-5 rounded-2xl flex items-center justify-center bg-[#108283]/10 text-[#108283] group-hover:bg-[#108283] group-hover:text-white transition-all duration-200">
                      <Icon className="w-6 h-6" />
                    </div>

                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#FAF0DD] text-[#108283] mb-3 inline-block">
                      {category.category}
                    </span>

                    <h3 className="font-playfair text-xl sm:text-2xl font-bold mb-1 text-gray-950">
                      {category.title}
                    </h3>
                    <p className="text-xs font-semibold text-[#108283] uppercase tracking-wider mb-3">
                      {category.subtitle}
                    </p>

                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-normal mb-6 min-h-[50px]">
                      {category.description}
                    </p>

                    <div className="bg-[#FAF0DD]/50 border border-[#F0DAAA]/60 text-gray-800 text-xs px-3.5 py-2 rounded-xl mb-6 flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#108283] shrink-0" />
                      <span className="font-medium">{category.doctorNote}</span>
                    </div>
                  </div>

                  <div className="w-full py-3 rounded-full bg-[#108283] text-white text-xs font-semibold text-center transition-all flex items-center justify-center gap-2 shadow-xs group-hover:bg-[#0c6b6c]">
                    <CalendarCheck className="w-4 h-4" />
                    <span>Book This Treatment Token</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Live Queue Quick-Check Banner */}
      <section className="w-full py-12 px-5 sm:px-6 md:px-8 bg-white">
        <div className="max-w-[1000px] mx-auto bg-[#F4F7F8] rounded-3xl p-6 sm:p-8 md:p-10 border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <span className="text-xs uppercase tracking-widest font-bold block text-[#108283]">
              Already Have A Token?
            </span>
            <h3 className="font-playfair text-2xl font-bold text-gray-950 mt-1">
              Track Your Live Queue Position
            </h3>
            <p className="text-xs text-gray-600 mt-1">
              Check how many patients are ahead and see when to leave home.
            </p>
          </div>
          <Link
            href="/live-queue"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#108283] hover:bg-[#0c6b6c] text-white text-xs uppercase tracking-widest font-semibold transition-all shadow-sm active:scale-95 shrink-0"
          >
            <Clock className="w-4 h-4" />
            <span>Launch Token Radar</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 5. Helpline & OPD Schedule */}
      <section className="w-full py-16 px-5 sm:px-6 md:px-8 bg-[#FAF0DD]/50 border-t border-[#F0DAAA]/60">
        <div className="max-w-[1000px] mx-auto text-center">
          <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-gray-950 mb-3">
            Need Assistance Or Direct Phone Booking?
          </h2>
          <p className="text-gray-700 max-w-xl mx-auto text-sm leading-relaxed mb-8">
            For emergencies, laser inquiries, or appointments, our reception desk at SHINGARE SKIN & COSMETICS CLINIC is happy to assist you.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[700px] mx-auto">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center flex flex-col items-center justify-center shadow-2xs">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-teal-50 text-[#108283] mb-3">
                <Phone className="w-5 h-5" />
              </div>
              <p className="text-xs uppercase tracking-wider font-bold text-gray-500 mb-1">
                Call Reception Desk
              </p>
              <a
                href="tel:+917249727104"
                className="text-lg font-bold text-[#108283] hover:underline"
              >
                +91 72497 27104
              </a>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center flex flex-col items-center justify-center shadow-2xs">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#108283]/8 text-[#108283] mb-3">
                <MessageCircle className="w-5 h-5" />
              </div>
              <p className="text-xs uppercase tracking-wider font-bold text-gray-500 mb-1">
                WhatsApp Helpline
              </p>
              <a
                href="https://wa.me/917249727104?text=Hello%20Shingare%20Skin%20Clinic,%20I%20want%20to%20inquire%20about%20an%20appointment"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-bold text-[#108283] hover:underline"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-600">
            <Clock className="w-4 h-4 text-[#108283]" />
            <span>
              OPD Timings: Mon–Sat 10:00 AM – 1:30 PM &amp; 5:00 PM – 9:00 PM | Sunday Closed
            </span>
          </div>
        </div>
      </section>

      {/* ================= MODAL APPOINTMENT BOOKING ================= */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-gray-200 rounded-3xl w-full max-w-xl shadow-2xl p-6 sm:p-8 my-8 relative overflow-hidden"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 p-1.5 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {bookingSuccess ? (
                /* SUCCESS STATE */
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-[#108283]/8 border-2 border-[#108283] rounded-full flex items-center justify-center mx-auto text-[#108283] mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <span className="text-xs uppercase tracking-widest font-bold text-[#108283]">
                    Appointment Confirmed
                  </span>

                  <div className="my-4">
                    <span className="text-xs text-gray-500 block uppercase font-semibold">Your Assigned Token</span>
                    <div className="text-5xl font-playfair font-bold text-[#108283] tracking-tight">
                      #{String(bookingSuccess.tokenNumber).padStart(2, "0")}
                    </div>
                  </div>

                  <h4 className="text-base font-bold text-gray-900">
                    {bookingSuccess.patient?.name}
                  </h4>

                  <p className="text-xs text-gray-600 mt-1">
                    Scheduled for: <strong>{bookingSuccess.date}</strong> • {preferredSlot}
                  </p>

                  <div className="bg-[#F4F7F8] border border-gray-200 rounded-2xl p-4 my-6 text-left text-xs text-gray-700 space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Consulting Doctor:</span>
                      <span className="font-bold text-gray-900">Dr. Pramod Shingare (MD Dermatology, Ayu.)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Service:</span>
                      <span className="font-semibold text-[#108283]">{selectedTreatment?.title}</span>
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
                      className="flex-1 py-3 rounded-full bg-[#108283] text-white text-xs font-semibold text-center hover:bg-[#0c6b6c] transition-all flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <Clock className="w-4 h-4" />
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
                    <div className="w-10 h-10 rounded-2xl bg-[#108283]/10 text-[#108283] flex items-center justify-center">
                      <CalendarCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] uppercase tracking-wider font-bold text-[#108283]">
                        {selectedTreatment?.category || "OPD Reservation"}
                      </span>
                      <h3 className="font-playfair text-xl font-bold text-gray-950">
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
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#108283] focus:outline-none text-xs"
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
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#108283] focus:outline-none text-xs"
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
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#108283] focus:outline-none text-xs"
                        />
                      </div>

                      <div>
                        <label className="block font-bold uppercase tracking-wider text-gray-700 mb-1">
                          Gender
                        </label>
                        <select
                          value={patientGender}
                          onChange={(e) => setPatientGender(e.target.value as any)}
                          className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-[#108283] focus:outline-none text-xs"
                        >
                          <option value="F">Female</option>
                          <option value="M">Male</option>
                          <option value="Other">Other</option>
                        </select>
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
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#108283] focus:outline-none text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block font-bold uppercase tracking-wider text-gray-700 mb-1">
                          Preferred Date
                        </label>
                        <input
                          type="date"
                          value={preferredDate}
                          min={new Date().toISOString().split("T")[0]}
                          onChange={(e) => setPreferredDate(e.target.value)}
                          className="w-full px-3.5 py-2 rounded-xl border border-gray-200 focus:border-[#108283] focus:outline-none text-xs"
                        />
                      </div>

                      <div>
                        <label className="block font-bold uppercase tracking-wider text-gray-700 mb-1">
                          OPD Session
                        </label>
                        <select
                          value={preferredSlot}
                          onChange={(e) => setPreferredSlot(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-[#108283] focus:outline-none text-xs"
                        >
                          <option value="Morning (10:00 AM – 01:30 PM)">Morning (10:00 AM – 1:30 PM)</option>
                          <option value="Evening (05:00 PM – 09:00 PM)">Evening (5:00 PM – 9:00 PM)</option>
                        </select>
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
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#108283] focus:outline-none text-xs"
                      />
                    </div>

                    <div className="pt-3">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 rounded-full bg-[#108283] hover:bg-[#0c6b6c] text-white text-xs uppercase tracking-wider font-semibold transition-all shadow-md active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <CalendarCheck className="w-4 h-4" />
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




