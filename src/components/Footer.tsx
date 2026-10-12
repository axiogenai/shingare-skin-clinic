import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, Phone } from "lucide-react";

const footerLinks = [
  { label: "About the clinic", href: "/about" },
  { label: "Skin treatments", href: "/skin" },
  { label: "Hair care", href: "/hair" },
  { label: "Cosmetic care", href: "/cosmetics" },
  { label: "Book appointment", href: "/book-now" },
  { label: "Live queue", href: "/live-queue" },
];

export default function Footer() {
  return (
    <footer className="clinic-footer print:hidden">
      <div className="clinic-footer-top">
        <div className="clinic-footer-brand">
          <Link href="/" aria-label="Shingare Clinic home"><Image src="/shingare-logo.png" alt="Shingare Skin & Cosmetics Clinic" width={160} height={75} className="clinic-footer-logo" /></Link>
          <p>Thoughtful skin, hair and cosmetic care — with clear guidance at every step.</p>
          <a href="tel:+917249727104" className="clinic-footer-call"><Phone size={16} /> +91 72497 27104 <ArrowUpRight size={15} /></a>
        </div>
        <div className="clinic-footer-links">
          <span>Explore</span>
          {footerLinks.map((link) => <Link href={link.href} key={link.href}>{link.label}</Link>)}
        </div>
        <div className="clinic-footer-location">
          <span>Visit the clinic</span>
          <p><MapPin size={16} /> Peth Vadgaon, Kolhapur, Maharashtra, India</p>
          <p>Monday–Saturday<br />10:00 AM–1:30 PM · 5:00 PM–9:00 PM</p>
          <Link href="/contact">Contact & directions <ArrowUpRight size={15} /></Link>
        </div>
      </div>
      <div className="clinic-footer-bottom"><span>© {new Date().getFullYear()} Shingare Skin & Cosmetics Clinic</span><span>Medical information on this website is general and does not replace a consultation.</span><Link href="#top">Back to top ↑</Link></div>
    </footer>
  );
}
