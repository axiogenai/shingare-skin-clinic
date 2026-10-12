import Link from "next/link";
import { ArrowRight, ClipboardList, MessageCircle, Stethoscope } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Tell us what concerns you",
    description: "Share your skin, hair or scalp concern, relevant history and what you would like help with.",
    icon: MessageCircle,
  },
  {
    number: "02",
    title: "Have a clinical consultation",
    description: "Your clinician will assess the concern, discuss possible explanations and answer your questions.",
    icon: Stethoscope,
  },
  {
    number: "03",
    title: "Review your options",
    description: "Understand the proposed plan, possible benefits, limitations, costs and follow-up before deciding.",
    icon: ClipboardList,
  },
];

export default function PatientJourneySection() {
  return (
    <section aria-labelledby="patient-journey-heading" className="border-t border-[#e1e7e3] bg-[#f7f7f3] px-5 py-16 font-source sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-[1280px]">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[.18em] text-[#287a78]">Your visit, clearly explained</p>
          <h2 id="patient-journey-heading" className="font-['Cormorant_Garamond',Georgia,serif] text-4xl font-medium leading-[1.02] tracking-[-.035em] text-[#202a28] sm:text-5xl">
            A thoughtful process, from first question to follow-up.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#64716b] sm:text-base">
            Every visit is different. These are the usual steps to help you know what to expect.
          </p>
        </div>

        <ol className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {steps.map(({ number, title, description, icon: Icon }) => (
            <li key={number} className="border border-[#e1e7e3] bg-white p-6 sm:p-7">
              <div className="mb-6 flex items-center justify-between">
                <span className="font-['Cormorant_Garamond',Georgia,serif] text-4xl text-[#a8bdb5]">{number}</span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#edf4f1] text-[#287a78]">
                  <Icon size={19} strokeWidth={1.6} aria-hidden="true" />
                </span>
              </div>
              <h3 className="text-lg font-semibold text-[#25322f]">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#62706a]">{description}</p>
            </li>
          ))}
        </ol>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-y border-[#dfe7e2] py-5 sm:flex-row sm:items-center">
          <p className="max-w-2xl text-sm leading-6 text-[#53615b]">A consultation gives you space to understand the options and decide what feels right for you.</p>
          <Link href="/book-now" className="inline-flex min-h-11 items-center gap-2 bg-[#176e6d] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#125958]">
            Request a consultation <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
