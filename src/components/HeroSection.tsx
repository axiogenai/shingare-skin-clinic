"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarCheck, MapPin, CheckCircle2 } from "lucide-react";

const carePoints = [
  "Skin & dermatology",
  "Hair and scalp care",
  "Clinical aesthetics",
];

export default function HeroSection() {
  return (
    <section
      id="hero"
      aria-labelledby="homepage-hero-title"
      className="relative overflow-hidden bg-[#f7f7f3] px-5 pb-12 pt-28 text-[#202a28] sm:px-8 sm:pb-16 sm:pt-32 lg:px-12 lg:pb-20 lg:pt-32"
    >
      <div className="mx-auto grid max-w-[1280px] items-center gap-10 lg:grid-cols-[1fr_.9fr] lg:gap-16">
        <div className="max-w-2xl">
          <p className="mb-6 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[.18em] text-[#287a78]">
            <span aria-hidden="true" className="h-px w-7 bg-[#287a78]" />
            Shingare Skin &amp; Cosmetics Clinic
          </p>

          <h1
            id="homepage-hero-title"
            className="max-w-[720px] font-['Cormorant_Garamond',Georgia,serif] text-[clamp(3.35rem,6.7vw,6.5rem)] font-medium leading-[.94] tracking-[-.045em] text-[#202a28]"
          >
            Skin health deserves{" "}
            <span className="italic text-[#287a78]">thoughtful care.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-[#56615e] sm:text-lg sm:leading-8">
            Consultation-led skin, hair and aesthetic care with clear guidance,
            considered treatment plans and a focus on your individual needs.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/book-now"
              className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-md bg-[#176e6d] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#125958] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#176e6d]"
            >
              <CalendarCheck size={17} aria-hidden="true" />
              Request a consultation
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link
              href="#services"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-[#d5dfdc] bg-white px-6 text-sm font-semibold text-[#263633] transition-colors hover:border-[#9ab9b4] hover:bg-[#f1f6f4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#176e6d]"
            >
              Explore services
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 border-t border-[#d9e0dc] pt-5">
            {carePoints.map((point) => (
              <span key={point} className="inline-flex items-center gap-2 text-xs font-medium text-[#53615d] sm:text-sm">
                <CheckCircle2 size={15} strokeWidth={1.7} className="text-[#287a78]" aria-hidden="true" />
                {point}
              </span>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[580px] lg:ml-auto">
          <div className="relative aspect-[4/4.4] overflow-hidden rounded-[46%_46%_12px_12px] bg-[#e8eeea] sm:aspect-[4/4.2]">
            <Image
              src="/girl-latest.png"
              alt="Portrait used by Shingare Skin & Cosmetics Clinic"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 44vw"
              className="object-contain object-bottom"
            />
          </div>

          <div className="absolute -bottom-4 left-4 right-4 flex items-center justify-between gap-4 border border-[#e0e7e3] bg-white p-4 shadow-[0_12px_32px_rgba(22,45,40,.08)] sm:left-8 sm:right-8 sm:p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#edf4f1] text-[#287a78]">
                <MapPin size={18} aria-hidden="true" />
              </span>
              <span>
                <span className="block text-[10px] font-semibold uppercase tracking-[.13em] text-[#71807b]">Visit the clinic</span>
                <span className="mt-1 block text-sm font-semibold text-[#25322f]">Peth Vadgaon, Kolhapur</span>
              </span>
            </div>
            <Link href="/contact" className="shrink-0 text-xs font-semibold text-[#176e6d] underline decoration-[#a4c2bc] underline-offset-4 hover:text-[#125958]">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
