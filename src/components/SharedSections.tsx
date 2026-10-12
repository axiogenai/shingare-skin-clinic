"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CalendarDays, CheckCircle2, Sparkles } from "lucide-react";

interface HeroBannerProps {
  title: string;
  subtitle?: string;
  badge?: string;
}

export function HeroBanner({ title, subtitle, badge }: HeroBannerProps) {
  const reduceMotion = useReducedMotion();
  return (
    <section className="clinic-subhero">
      <div className="clinic-subhero-glow" aria-hidden="true" />
      <motion.div
        className="clinic-subhero-content"
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        {badge && <span className="clinic-subhero-badge"><Sparkles size={13} />{badge}</span>}
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
        <div className="clinic-subhero-actions">
          <Link href="/book-now" className="clinic-subhero-primary">Request an appointment <ArrowRight size={16} /></Link>
          <Link href="/contact" className="clinic-subhero-secondary">Contact the clinic</Link>
        </div>
        <div className="clinic-subhero-foot"><span><CheckCircle2 size={14} /> Personalised consultations</span><span><CheckCircle2 size={14} /> Peth Vadgaon · Kolhapur</span></div>
      </motion.div>
    </section>
  );
}

interface CTABannerProps {
  heading?: string;
  text?: string;
  buttonText?: string;
  buttonHref?: string;
}

export function CTABanner({
  heading = "A thoughtful next step for your skin and hair",
  text = "Start with a consultation and get clear information about the options that may suit your concern.",
  buttonText = "Request an appointment",
  buttonHref = "/book-now",
}: CTABannerProps) {
  const reduceMotion = useReducedMotion();
  return (
    <section className="clinic-cta-wrap">
      <motion.div
        className="clinic-cta-banner"
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="clinic-cta-glow" aria-hidden="true" />
        <div className="clinic-cta-copy">
          <span className="clinic-cta-kicker"><CalendarDays size={14} /> YOUR CARE, YOUR PACE</span>
          <h2>{heading}</h2>
          <p>{text}</p>
          <Link href={buttonHref} className="clinic-cta-button">{buttonText} <ArrowRight size={16} /></Link>
        </div>
        <div className="clinic-cta-seal" aria-hidden="true"><span>S.</span><small>SHINGARE CLINIC</small></div>
      </motion.div>
    </section>
  );
}

export function LeafDivider() {
  return <div className="flex items-center justify-center my-6 text-[#6f8873]" aria-hidden="true"><span className="w-10 h-px bg-current opacity-40" /><span className="mx-3 text-xs">✳</span><span className="w-10 h-px bg-current opacity-40" /></div>;
}
