"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CalendarCheck, Stethoscope, Activity, Waves, Droplets } from "lucide-react";

type Specialty = {
  id: string;
  title: string;
  eyebrow: string;
  summary: string;
  image: string;
  alt: string;
  conditions: string[];
  icon: typeof Stethoscope;
  href: string;
  bookingParam: string;
};

const specialties: Specialty[] = [
  {
    id: "skin",
    title: "Clinical dermatology",
    eyebrow: "SKIN HEALTH",
    summary: "Consultation and treatment planning for common skin concerns, including acne, eczema, psoriasis and pigmentation.",
    image: "/girl-latest.png",
    alt: "Portrait representing skin and cosmetic care",
    conditions: ["Acne", "Eczema", "Psoriasis", "Pigmentation"],
    icon: Stethoscope,
    href: "/skin",
    bookingParam: "Clinical Dermatology",
  },
  {
    id: "hair",
    title: "Hair & scalp care",
    eyebrow: "HAIR HEALTH",
    summary: "Assessment of hair fall and scalp concerns, with suitable options discussed during consultation.",
    image: "/docbg.png",
    alt: "Clinic editorial background used for care information",
    conditions: ["Hair fall", "Scalp concerns", "Thinning"],
    icon: Activity,
    href: "/hair",
    bookingParam: "Trichology & Hair Restoration",
  },
  {
    id: "laser",
    title: "Laser & scar care",
    eyebrow: "CLINICAL AESTHETICS",
    summary: "Learn about laser-based and scar-care options. Suitability, possible outcomes and recovery are reviewed with your clinician.",
    image: "/docbg1.png",
    alt: "Soft neutral editorial background used for clinical aesthetics",
    conditions: ["Acne scars", "Pigmentation", "Texture"],
    icon: Waves,
    href: "/cosmetics",
    bookingParam: "Aesthetic Lasers & Scar Revision",
  },
  {
    id: "facials",
    title: "Medi-facials & peels",
    eyebrow: "SKIN TREATMENTS",
    summary: "Explore clinic-based facial and peel options selected around your skin type, concerns and skin-barrier health.",
    image: "/girl-latest.png",
    alt: "Portrait representing cosmetic skin care",
    conditions: ["Medi-facials", "Chemical peels", "Oil control"],
    icon: Droplets,
    href: "/cosmetics",
    bookingParam: "Signature Medi-Facials & Peels",
  },
];

export default function SpecialtyCardsSection() {
  return (
    <section id="services" aria-labelledby="specialties-heading" className="scroll-mt-24 bg-[#f7f7f3] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-9 grid gap-4 md:grid-cols-[1fr_.7fr] md:items-end md:gap-12">
          <div>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[.18em] text-[#287a78]">Areas of care</p>
            <h2 id="specialties-heading" className="max-w-2xl font-['Cormorant_Garamond',Georgia,serif] text-4xl font-medium leading-[1.02] tracking-[-.035em] text-[#202a28] sm:text-5xl md:text-6xl">
              Find the care that fits your concern.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-[#64716b] sm:text-base sm:leading-7">
            Explore each service to understand what it involves. A consultation helps determine whether a treatment is suitable for you.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {specialties.map((item, index) => {
            const Icon = item.icon;
            return (
              <article key={item.id} className="group flex min-w-0 flex-col overflow-hidden border border-[#e1e7e3] bg-white transition-colors duration-200 hover:border-[#a6c4bd]">
                <div className="relative aspect-[4/3] overflow-hidden bg-[#e8eeea]">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 1280px) 45vw, 24vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#172c29]/50 via-transparent to-transparent" aria-hidden="true" />
                  <span className="absolute bottom-4 left-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.16em] text-white">
                    <Icon size={15} aria-hidden="true" />
                    {item.eyebrow}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="font-['Cormorant_Garamond',Georgia,serif] text-2xl font-semibold leading-tight tracking-[-.02em] text-[#23312d] sm:text-[27px]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[#62706a]">{item.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.conditions.map((condition) => (
                      <span key={condition} className="border border-[#e4e9e6] bg-[#f7f9f7] px-2.5 py-1 text-[10px] font-medium text-[#56645e]">
                        {condition}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex flex-col gap-2 pt-6">
                    <Link href={item.href} className="inline-flex min-h-10 items-center justify-between gap-2 border-t border-[#e5eae7] pt-3 text-sm font-semibold text-[#263632] transition-colors hover:text-[#176e6d]">
                      Explore service <ArrowRight size={15} aria-hidden="true" />
                    </Link>
                    <Link href={`/book-now?concern=${encodeURIComponent(item.bookingParam)}`} className="inline-flex min-h-10 items-center justify-center gap-2 bg-[#176e6d] px-4 text-xs font-semibold text-white transition-colors hover:bg-[#125958] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#176e6d]">
                      <CalendarCheck size={14} aria-hidden="true" /> Request a consultation
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-5 text-[#728079]">
          Available options and expected outcomes vary by individual. Your clinician will discuss suitability, potential benefits and risks.
        </p>
      </div>
    </section>
  );
}
