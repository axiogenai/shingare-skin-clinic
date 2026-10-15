"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Volume2, Clock, ShieldCheck, Activity } from "lucide-react";

interface Feature {
  step: string;
  badge: string;
  title: string;
  description: string;
  linkText: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const features: Feature[] = [
  {
    step: "01",
    badge: "Marathi & English",
    title: "Digital Prescription Audio Note",
    description:
      "Scan the QR code on your clinic paper to hear Dr. Pramod Shingare's voice instructions for medicines, dosages, and application tips anytime at home.",
    linkText: "Open Voice Player",
    href: "/my-rx",
    icon: Volume2,
  },
  {
    step: "02",
    badge: "Live Token Sync",
    title: "Real-Time OPD Queue Radar",
    description:
      "Track active consultation tokens and estimated wait times live from your phone. Arrive right when your turn is near without sitting in crowded waiting rooms.",
    linkText: "Check Live Queue",
    href: "/live-queue",
    icon: Clock,
  },
  {
    step: "03",
    badge: "Tamper-Proof QR",
    title: "Medical Certificate Verifier",
    description:
      "Instant cryptographic verification for medical fitness and clinical leave certificates issued by Dr. Pramod Shingare by scanning the official QR stamp.",
    linkText: "Verify Certificate",
    href: "/verify",
    icon: ShieldCheck,
  },
  {
    step: "04",
    badge: "Saves 10 Minutes",
    title: "Pre-Consultation Skin Quiz",
    description:
      "Answer 4 brief clinical questions about your skin type and concerns before arrival. Your details pre-load into the doctor's desk for a faster consultation.",
    linkText: "Start Skin Quiz",
    href: "/skin-quiz",
    icon: Activity,
  },
];

export default function ClinicOSFeaturesSection() {
  return (
    <section className="py-16 md:py-24 bg-white relative font-source border-t border-[#292d27]/8 [&_*]:!transform-none [&_*]:!transition-none [&_*]:hover:!transform-none">
      <div className="max-w-[1140px] mx-auto px-5 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 bg-[#7e423e]/8 text-[#7e423e] text-[10px] sm:text-[11px] font-mono font-semibold px-3.5 py-1.5 rounded-full mb-3 uppercase tracking-[0.2em] border border-[#7e423e]/15">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7e423e]" />
            Powered by ClinicOS
          </div>
          <h2 className="font-['Playfair_Display',Georgia,serif] text-3xl sm:text-4xl md:text-5xl text-[#1b261e] font-bold leading-tight mb-3">
            Smart Digital Health For{" "}
            <span className="italic font-medium text-[#873f3b]">
              Every Patient
            </span>
          </h2>
          <p className="text-[#616558] text-xs sm:text-sm md:text-base leading-relaxed max-w-4xl mx-auto">
            <span className="block">
              Our clinic integrates clinical-grade software to minimize waiting time, provide audio dosage guidance
            </span>
            <span className="block">
              in Marathi, and ensure 100% verified medical records — built for the patients of Peth Vadgaon and Kolhapur.
            </span>
          </p>
        </div>

        {/* 4 Compact, Professional Cards Grid (No emoji animation, sleek height) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="bg-[#FAF8F5] border border-[#292d27]/10 rounded-2xl p-5 sm:p-6 shadow-[0_2px_12px_rgba(41,45,39,0.03)] flex flex-col justify-between"
              >
                <div>
                  {/* Top Meta Strip */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#292d27]/8">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#873f3b]">
                        {feat.step}
                      </span>
                      <span className="h-3 w-px bg-[#292d27]/20" />
                      <span className="font-mono text-[10px] uppercase font-semibold text-[#616558] tracking-wider">
                        {feat.badge}
                      </span>
                    </div>

                    <div className="w-7 h-7 rounded-lg bg-white border border-[#292d27]/10 flex items-center justify-center text-[#873f3b]">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-['Playfair_Display',Georgia,serif] text-lg sm:text-xl font-bold text-[#1a241d] mb-2 leading-snug">
                    {feat.title}
                  </h3>

                  {/* Concise Description */}
                  <p className="text-xs sm:text-[13px] text-[#555d4d] leading-relaxed mb-5">
                    {feat.description}
                  </p>
                </div>

                {/* Bottom Action Link */}
                <div className="pt-3 border-t border-[#292d27]/8 flex items-center justify-between">
                  <Link
                    href={feat.href}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1a241d] uppercase tracking-wider active:scale-95 transition-transform"
                  >
                    <span>{feat.linkText}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#873f3b]" />
                  </Link>

                  <span className="text-[10px] font-mono text-[#8a8d83]">
                    Instant Access
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
