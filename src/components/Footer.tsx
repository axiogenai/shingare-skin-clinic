import Link from "next/link";
import { MapPin, Phone, CalendarCheck } from "lucide-react";

const links = [
  { label: "Skin care", href: "/skin" },
  { label: "Hair & scalp", href: "/hair" },
  { label: "Cosmetics", href: "/cosmetics" },
  { label: "About the clinic", href: "/about" },
  { label: "Live queue", href: "/live-queue" },
  { label: "Patient prescriptions", href: "/my-rx" },
  { label: "Verify certificate", href: "/verify" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#334642] bg-[#202e2b] px-5 py-12 text-white sm:px-8 sm:py-14 lg:px-12">
      <div className="mx-auto grid max-w-[1280px] gap-10 md:grid-cols-[1fr_1fr]">
        <div>
          <p className="font-['Cormorant_Garamond',Georgia,serif] text-3xl font-medium tracking-tight">Shingare Skin &amp; Cosmetics Clinic</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-[#cedbd6]">Skin, hair and cosmetic care in Peth Vadgaon, Kolhapur. Contact the clinic to discuss your concern or request an appointment.</p>
          <div className="mt-5 flex flex-col gap-3 text-sm text-[#e5eeea]">
            <a href="tel:+917249727104" className="inline-flex items-center gap-2 hover:text-white"><Phone size={16} aria-hidden="true" /> +91 72497 27104</a>
            <a href="https://maps.google.com/?q=Shingare+Skin+Clinic+Peth+Vadgaon+Kolhapur" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-white"><MapPin size={16} aria-hidden="true" /> Peth Vadgaon, Kolhapur</a>
            <Link href="/book-now" className="mt-2 inline-flex min-h-11 w-fit items-center gap-2 bg-white px-5 text-sm font-semibold text-[#20332f] hover:bg-[#edf4f1]"><CalendarCheck size={15} aria-hidden="true" /> Request a consultation</Link>
          </div>
        </div>
        <nav aria-label="Footer navigation" className="grid grid-cols-2 content-start gap-x-6 gap-y-4 text-sm">
          {links.map((link) => <Link key={link.href} href={link.href} className="text-[#d4e1dc] transition-colors hover:text-white">{link.label}</Link>)}
        </nav>
      </div>
      <div className="mx-auto mt-10 max-w-[1280px] border-t border-white/15 pt-5 text-xs text-[#b8c9c2]">
        © {new Date().getFullYear()} Shingare Skin &amp; Cosmetics Clinic
      </div>
    </footer>
  );
}
