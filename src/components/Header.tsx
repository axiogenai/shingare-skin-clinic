"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ArrowUpRight, CalendarDays, Phone } from "lucide-react";

const links = [
  { label: "Treatments", href: "/skin" },
  { label: "Our clinic", href: "/about" },
  { label: "Patient tools", href: "/live-queue" },
  { label: "Visit us", href: "/contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="clinic-header print:hidden">
      <Link href="/" className="clinic-brand" aria-label="Shingare Skin & Cosmetics Clinic home" onClick={() => setOpen(false)}>
        <Image src="/shingare-logo.png" alt="Shingare Skin & Cosmetics Clinic" width={150} height={70} priority className="clinic-brand-logo" />
      </Link>
      <nav className="clinic-nav" aria-label="Main navigation">
        {links.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
      </nav>
      <div className="clinic-header-actions">
        <a className="clinic-phone" href="tel:+917249727104" aria-label="Call clinic"><Phone size={15} /><span>Call clinic</span></a>
        <Link className="clinic-book" href="/book-now">Book a visit <ArrowUpRight size={15} /></Link>
      </div>
      <button className="clinic-menu-toggle" type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} onClick={() => setOpen(!open)}>
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
      {open && <nav className="clinic-mobile-nav" aria-label="Mobile navigation">
        {links.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}<ArrowUpRight size={15} /></Link>)}
        <Link href="/book-now" onClick={() => setOpen(false)}><CalendarDays size={16} /> Request an appointment</Link>
        <a href="tel:+917249727104" onClick={() => setOpen(false)}><Phone size={16} /> +91 72497 27104</a>
      </nav>}
    </header>
  );
}
