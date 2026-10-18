"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Activity,
  Sun,
  Clock,
  Calendar,
  Hourglass,
  Droplets,
  Scale,
  Shield,
  CheckCircle2,
  AlertCircle,
  Stethoscope,
  Check,
  ArrowRight,
  ArrowLeft,
  CalendarCheck,
  Award,
  Zap,
} from "lucide-react";
import { HeroBanner } from "@/components/SharedSections";

interface Question {
  id: number;
  title: string;
  subtitle: string;
  options: {
    label: string;
    tag: string;
    icon: any;
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    title: "What is your primary clinical concern?",
    subtitle: "Select the main condition you wish Dr. Pramod Shingare to examine",
    options: [
      { label: "Active Acne, Pimples & Scars", tag: "Acne Vulgaris", icon: Activity },
      { label: "Pigmentation, Melasma & Sun Damage", tag: "Hyperpigmentation", icon: Sun },
      { label: "Hair Fall, Dandruff & Thinning", tag: "Trichology & Hair Loss", icon: Zap },
      { label: "Eczema, Itching, Ringworm or Rashes", tag: "Dermatitis / Fungal", icon: Stethoscope },
      { label: "Acne Scars & Laser Resurfacing", tag: "Aesthetic Lasers", icon: Zap },
      { label: "Psoriasis, Vitiligo or Chronic Issue", tag: "Chronic Dermatosis", icon: Shield },
    ],
  },
  {
    id: 2,
    title: "How long have you experienced this?",
    subtitle: "Helps the doctor differentiate acute vs. chronic condition",
    options: [
      { label: "Recent (< 2 weeks)", tag: "Acute (<2w)", icon: Clock },
      { label: "1 to 3 months", tag: "Subacute (1-3m)", icon: Calendar },
      { label: "3 to 12 months", tag: "Chronic (3-12m)", icon: Calendar },
      { label: "More than 1 year", tag: "Longstanding (>1y)", icon: Hourglass },
    ],
  },
  {
    id: 3,
    title: "What is your skin type?",
    subtitle: "Guides topical vehicle selection and laser platform parameters",
    options: [
      { label: "Oily & Shiny (Acne-prone)", tag: "Oily Skin", icon: Droplets },
      { label: "Dry, Tight or Flaky", tag: "Dry Skin", icon: Droplets },
      { label: "Combination (Oily T-Zone)", tag: "Combination Skin", icon: Scale },
      { label: "Sensitive & Easily Irritated", tag: "Sensitive Skin", icon: Shield },
    ],
  },
  {
    id: 4,
    title: "Any previous steroid or OTC cream usage?",
    subtitle: "Essential for evaluating skin barrier compromise and steroid-induced rosacea",
    options: [
      { label: "No / First time medical consultation", tag: "No prior steroids", icon: CheckCircle2 },
      { label: "Used OTC creams (SkinLite, Betnovate, Panderm)", tag: "Prior OTC steroid use", icon: AlertCircle },
      { label: "Home remedies / natural only", tag: "Home remedies", icon: CheckCircle2 },
      { label: "Previously treated by another dermatologist", tag: "Prior dermatologist care", icon: Stethoscope },
    ],
  },
];

export default function SkinQuizPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [completed, setCompleted] = useState(false);

  const handleSelectOption = (questionId: number, optionTag: string) => {
    const updated = { ...answers, [questionId]: optionTag };
    setAnswers(updated);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCompleted(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentQ = questions[currentStep];

  return (
    <main className="min-h-screen bg-[#F4F7F8] font-source">
      {/* 1. Hero Banner */}
      <HeroBanner
        badge="PRE-CONSULTATION CLINICAL QUIZ"
        title="Skin &amp; Hair Assessment"
        subtitle="4 quick questions to prepare your case paper before consulting Dr. Pramod Shingare"
      />

      {/* 2. Main Quiz Container */}
      <section className="w-full py-14 px-5 sm:px-6 md:px-8">
        <div className="max-w-[720px] mx-auto text-center">
          {!completed ? (
            <div className="bg-white rounded-3xl border border-gray-100 p-4 sm:p-8 md:p-10 shadow-[0_10px_35px_rgba(0,0,0,0.04)] relative text-left">
              {/* Progress Bar */}
              <div className="w-full bg-gray-100 rounded-full h-2 mb-8 overflow-hidden">
                <div
                  className="bg-[#108283] h-full transition-all duration-300 rounded-full"
                  style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                />
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase font-bold tracking-wider text-[#108283]">
                  Question {currentStep + 1} of {questions.length}
                </span>
                {currentStep > 0 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="text-xs text-gray-500 hover:text-gray-900 flex items-center gap-1 font-semibold cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                )}
              </div>

              <h3 className="font-playfair text-xl sm:text-2xl font-bold text-gray-950 mb-1">
                {currentQ.title}
              </h3>
              <p className="text-xs text-gray-500 mb-6 font-normal">
                {currentQ.subtitle}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentQ.options.map((opt) => {
                  const isSelected = answers[currentQ.id] === opt.tag;
                  const IconComp = opt.icon;
                  return (
                    <button
                      key={opt.tag}
                      type="button"
                      onClick={() => handleSelectOption(currentQ.id, opt.tag)}
                      className={`p-4 text-left rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between group ${
                        isSelected
                          ? "border-[#108283] bg-[#FAF0DD] shadow-xs"
                          : "border-gray-200 bg-white hover:border-[#108283] hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                            isSelected
                              ? "bg-[#108283] text-white"
                              : "bg-[#F4F7F8] text-[#108283] group-hover:bg-[#108283]/10"
                          }`}
                        >
                          <IconComp className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-semibold text-gray-900">{opt.label}</span>
                      </div>
                      {isSelected && <Check className="text-[#108283] w-4 h-4" />}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            /* COMPLETED SUMMARY & DIRECT BOOKING ACTION */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl border border-gray-100 p-4 sm:p-8 md:p-10 shadow-md text-left space-y-6"
            >
              <div className="text-center">
                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="w-7 h-7" />
                </div>
                <span className="text-xs uppercase tracking-widest font-bold text-[#108283] block">
                  Clinical Assessment Prepared
                </span>
                <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-gray-950 mt-1">
                  Ready For Consultation
                </h3>
              </div>

              <div className="bg-[#F4F7F8] rounded-2xl border border-gray-100 p-5 space-y-2 text-xs text-gray-700">
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-500">Chief Clinical Concern:</span>
                  <strong className="font-bold text-gray-900">{answers[1] || "Clinical Dermatology"}</strong>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-500">Condition Duration:</span>
                  <span className="font-medium text-gray-800">{answers[2]}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-500">Skin Barrier Type:</span>
                  <span className="font-medium text-gray-800">{answers[3]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Prior Medication History:</span>
                  <span className="font-medium text-gray-800">{answers[4]}</span>
                </div>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed">
                Your symptom tags will be loaded automatically into <strong>Dr. Pramod Shingare&apos;s</strong> consultation terminal when you book your token.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link
                  href={`/book-now?concern=${encodeURIComponent(answers[1] || "Clinical Dermatology")}`}
                  className="flex-1 py-3.5 rounded-full bg-[#108283] hover:bg-[#0c6b6c] text-white text-xs font-semibold text-center transition-all shadow-xs flex items-center justify-center gap-2"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Book Appointment Token With This Profile</span>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setAnswers({});
                    setCurrentStep(0);
                    setCompleted(false);
                  }}
                  className="px-5 py-3 rounded-full border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50"
                >
                  Retake Quiz
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
}

