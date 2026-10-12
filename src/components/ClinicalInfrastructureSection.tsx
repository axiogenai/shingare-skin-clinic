"use client";

import Link from "next/link";
import { Activity, Droplets, Microscope, ScanLine, ShieldCheck, Zap } from "lucide-react";

const platforms = [
  {
    name: "Laser-based skin treatments",
    category: "Laser care",
    description: "Laser options may be discussed for selected pigmentation, tattoo and scar concerns after a clinical assessment.",
    note: "Suitability and expected recovery vary by individual.",
    icon: Zap,
  },
  {
    name: "Skin and scalp examination",
    category: "Assessment",
    description: "Clinical examination tools can help your clinician assess skin and scalp concerns as part of a consultation.",
    note: "Testing and imaging depend on the concern being assessed.",
    icon: Microscope,
  },
  {
    name: "Hair and scalp treatment options",
    category: "Hair health",
    description: "Discuss available approaches for hair fall and scalp concerns, including whether procedural options are appropriate.",
    note: "No single treatment is suitable for everyone.",
    icon: Activity,
  },
  {
    name: "Clinic-based facial treatments",
    category: "Clinical aesthetics",
    description: "Facial and peel options are selected with attention to your skin type, sensitivity and stated concerns.",
    note: "Your clinician can explain potential benefits and risks.",
    icon: Droplets,
  },
  {
    name: "Skin concerns and lesion review",
    category: "Skin health",
    description: "Raise questions about skin growths, uneven tone or changes that need an in-person clinical review.",
    note: "A clinical review is needed before any procedure.",
    icon: ScanLine,
  },
];

export default function ClinicalInfrastructureSection() {
  return (
    <section aria-labelledby="clinic-care-tools-heading" className="border-t border-[#e1e7e3] bg-white px-5 py-16 font-source sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-10 grid gap-4 lg:grid-cols-[1fr_.7fr] lg:items-end lg:gap-12">
          <div>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[.18em] text-[#287a78]">Treatments & assessment</p>
            <h2 id="clinic-care-tools-heading" className="max-w-3xl font-['Cormorant_Garamond',Georgia,serif] text-4xl font-medium leading-[1.02] tracking-[-.035em] text-[#202a28] sm:text-5xl">
              The right approach starts with the right assessment.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-[#64716b] sm:text-base sm:leading-7">
            Explore the types of care available at the clinic. The clinician can explain what is suitable, what to expect, and when another approach may be preferable.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {platforms.map(({ name, category, description, note, icon: Icon }) => (
            <article key={name} className="flex min-w-0 flex-col border border-[#e1e7e3] bg-[#f7f9f7] p-5 sm:p-6">
              <div className="mb-5 flex items-center justify-between gap-3">
                <span className="text-[10px] font-semibold uppercase tracking-[.15em] text-[#6d7c76]">{category}</span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#287a78]">
                  <Icon size={19} strokeWidth={1.6} aria-hidden="true" />
                </span>
              </div>
              <h3 className="font-['Cormorant_Garamond',Georgia,serif] text-2xl font-semibold leading-tight text-[#25322f]">{name}</h3>
              <p className="mt-3 text-sm leading-6 text-[#62706a]">{description}</p>
              <p className="mt-5 border-t border-[#e0e7e2] pt-4 text-xs leading-5 text-[#748079]">{note}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 border-l-2 border-[#8bb6ae] bg-[#f5f8f6] px-5 py-4 sm:px-6">
          <p className="flex items-start gap-3 text-sm leading-6 text-[#4f5e58]">
            <ShieldCheck size={18} className="mt-0.5 shrink-0 text-[#287a78]" aria-hidden="true" />
            Equipment and treatment availability can change. Please confirm details, candidacy, risks and aftercare with the clinic before booking a procedure.
          </p>
          <Link href="/book-now" className="mt-3 inline-flex items-center text-sm font-semibold text-[#176e6d] underline underline-offset-4 hover:text-[#125958]">
            Discuss a treatment <span aria-hidden="true" className="ml-2">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
