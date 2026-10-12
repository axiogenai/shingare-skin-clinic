import Link from "next/link";
import { ArrowRight, Clock, FileText, ShieldCheck, Volume2 } from "lucide-react";

const tools = [
  {
    title: "Prescription information",
    eyebrow: "MY RX",
    description: "Use the clinic's prescription portal to access available prescription details or audio guidance associated with your record.",
    note: "Have your prescription ID or QR code ready.",
    href: "/my-rx",
    action: "Open My Rx",
    icon: Volume2,
  },
  {
    title: "OPD queue information",
    eyebrow: "LIVE QUEUE",
    description: "Check the queue page for currently available clinic status and token information before travelling.",
    note: "Queue details and estimated waiting times can change.",
    href: "/live-queue",
    action: "View queue",
    icon: Clock,
  },
  {
    title: "Certificate verification",
    eyebrow: "VERIFY",
    description: "Use the verification page to check a clinic-issued certificate when you have its reference details.",
    note: "Only details returned by the verification system can be confirmed.",
    href: "/verify",
    action: "Verify a certificate",
    icon: ShieldCheck,
  },
];

export default function ClinicOSFeaturesSection() {
  return (
    <section aria-labelledby="patient-tools-heading" className="border-t border-[#e1e7e3] bg-white px-5 py-16 font-source sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-10 grid gap-4 lg:grid-cols-[1fr_.7fr] lg:items-end lg:gap-12">
          <div>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[.18em] text-[#287a78]">Useful patient links</p>
            <h2 id="patient-tools-heading" className="max-w-3xl font-['Cormorant_Garamond',Georgia,serif] text-4xl font-medium leading-[1.02] tracking-[-.035em] text-[#202a28] sm:text-5xl">
              Helpful information, when you need it.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-[#64716b] sm:text-base sm:leading-7">
            A few digital tools are available to help you find clinic information and access your records. Availability depends on the information supplied by the clinic systems.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {tools.map(({ title, eyebrow, description, note, href, action, icon: Icon }) => (
            <article key={title} className="flex flex-col border border-[#e1e7e3] bg-[#f7f9f7] p-5 sm:p-6">
              <div className="mb-5 flex items-center justify-between gap-3">
                <span className="text-[10px] font-semibold uppercase tracking-[.15em] text-[#6d7c76]">{eyebrow}</span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#287a78]">
                  <Icon size={19} strokeWidth={1.6} aria-hidden="true" />
                </span>
              </div>
              <h3 className="font-['Cormorant_Garamond',Georgia,serif] text-2xl font-semibold leading-tight text-[#25322f]">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#62706a]">{description}</p>
              <p className="mt-5 border-t border-[#e0e7e2] pt-4 text-xs leading-5 text-[#748079]">{note}</p>
              <Link href={href} className="mt-6 inline-flex min-h-10 items-center justify-between border-t border-[#d9e3de] pt-3 text-sm font-semibold text-[#176e6d] hover:text-[#125958]">
                {action} <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
