"use client";

import Link from "next/link";
import Image from "next/image";
import { CalendarCheck, Phone, ShieldCheck } from "lucide-react";

const doctors = [
  {
    id: "dr-pramod",
    name: "Dr. Pramod Suresh Shingare",
    role: "Skin, hair and laser care",
    qualifications: "MD (Ayu) · D. Dermatology (Ay.) MUHS",
    registration: "MMC Reg. No. I-87218-A",
    image: "/docbg.png",
    lead: "Consultation-led care for skin and scalp concerns, with treatment options explained before proceeding.",
    href: "/book-now",
  },
  {
    id: "dr-priyanka",
    name: "Dr. Priyanka Pramod Shingare",
    role: "Clinical cosmetology and skin care",
    qualifications: "BHMS, FCHD, CCHC, CCMP (MUHS)",
    registration: "Council Reg. No. 73338",
    image: "/docbg1.png",
    lead: "An individual approach to skin-care concerns, clinic-based facials and peel options, guided by assessment.",
    href: "/book-now",
  },
];

export default function DoctorsSilkEditorial() {
  return (
    <section aria-labelledby="our-clinicians-heading" className="border-t border-[#e1e7e3] bg-white px-5 py-16 font-source sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-10 max-w-3xl">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[.18em] text-[#287a78]">Meet the clinicians</p>
          <h2 id="our-clinicians-heading" className="font-['Cormorant_Garamond',Georgia,serif] text-4xl font-medium leading-[1.02] tracking-[-.035em] text-[#202a28] sm:text-5xl">
            Experienced care, explained with clarity.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#64716b] sm:text-base">
            Learn about the clinicians and their areas of practice before your visit.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {doctors.map((doctor) => (
            <article key={doctor.id} className="grid overflow-hidden border border-[#e1e7e3] bg-[#f7f9f7] sm:grid-cols-[.72fr_1fr]">
              <div className="relative min-h-[250px] bg-[#e8eeea] sm:min-h-[330px]">
                <Image
                  src={doctor.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 90vw, 30vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col p-5 sm:p-7">
                <p className="text-[10px] font-semibold uppercase tracking-[.14em] text-[#287a78]">{doctor.role}</p>
                <h3 className="mt-3 font-['Cormorant_Garamond',Georgia,serif] text-3xl font-semibold leading-tight text-[#202a28]">{doctor.name}</h3>
                <p className="mt-3 text-sm leading-6 text-[#56645e]">{doctor.lead}</p>
                <div className="mt-5 space-y-2 border-t border-[#dfe7e2] pt-4 text-xs leading-5 text-[#53615b]">
                  <p>{doctor.qualifications}</p>
                  <p className="inline-flex items-center gap-2"><ShieldCheck size={14} aria-hidden="true" className="shrink-0 text-[#287a78]" /> {doctor.registration}</p>
                </div>
                <div className="mt-auto flex flex-col gap-2 pt-6">
                  <Link href={doctor.href} className="inline-flex min-h-11 items-center justify-center gap-2 bg-[#176e6d] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#125958]">
                    <CalendarCheck size={15} aria-hidden="true" /> Request a consultation
                  </Link>
                  <a href="tel:+917249727104" className="inline-flex min-h-10 items-center justify-center gap-2 border border-[#d3dfda] bg-white px-4 text-sm font-semibold text-[#263632] hover:bg-[#f1f6f4]">
                    <Phone size={15} aria-hidden="true" /> +91 72497 27104
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
