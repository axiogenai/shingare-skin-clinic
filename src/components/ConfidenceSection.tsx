import Link from "next/link";
import { ArrowRight, ClipboardCheck, HeartHandshake, Stethoscope } from "lucide-react";

const principles = [
  {
    icon: Stethoscope,
    title: "Start with a consultation",
    description: "Discuss your concern and history before deciding whether a treatment is appropriate.",
  },
  {
    icon: ClipboardCheck,
    title: "Understand your options",
    description: "Receive clear information about the care plan, expected steps and follow-up.",
  },
  {
    icon: HeartHandshake,
    title: "Care shaped around you",
    description: "Recommendations are considered in the context of your skin, scalp and personal needs.",
  },
];

export default function ConfidenceSection() {
  return (
    <section aria-labelledby="care-principles-heading" className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-9 lg:grid-cols-[.78fr_1.22fr] lg:gap-16">
          <div className="max-w-xl">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[.18em] text-[#287a78]">A clear approach to care</p>
            <h2 id="care-principles-heading" className="font-['Cormorant_Garamond',Georgia,serif] text-4xl font-medium leading-[1.02] tracking-[-.035em] text-[#202a28] sm:text-5xl">
              Good care begins with listening.
            </h2>
            <p className="mt-5 text-base leading-7 text-[#596560]">
              Every concern is different. We focus on understanding what brings you in, explaining the available options and helping you make an informed decision with your clinician.
            </p>
            <Link href="/about" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#176e6d] hover:text-[#125958]">
              Learn about the clinic <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <div className="divide-y divide-[#e5eae7] border-y border-[#e5eae7]">
            {principles.map(({ icon: Icon, title, description }, index) => (
              <article key={title} className="grid gap-3 py-6 sm:grid-cols-[44px_1fr] sm:gap-5 sm:py-7">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#edf4f1] text-[#287a78]">
                  <Icon size={19} strokeWidth={1.7} aria-hidden="true" />
                </span>
                <div>
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-[.15em] text-[#7a8983]">0{index + 1}</p>
                  <h3 className="text-lg font-semibold text-[#25322f]">{title}</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-[#64716b] sm:text-base">{description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
