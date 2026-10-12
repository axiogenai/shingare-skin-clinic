"use client";

import LogoIcon from '@/assets/logo-icon';
import * as React from 'react';
import { ArrowUp, ArrowRight } from 'lucide-react';

export interface Footer11NavLink {
  label: string;
  href: string;
}

export interface Footer11Props {
  /** Small tagline badge text displayed at top-left */
  badgeText?: string;
  /** Large heading text in the upper section */
  heading?: string;
  /** Label above the contact email */
  contactLabel?: string;
  /** Contact email address displayed */
  contactEmail?: string;
  /** Href for the contact email link */
  contactEmailHref?: string;
  /** Navigation links displayed at bottom-right of upper section */
  navLinks?: Footer11NavLink[];
  /** Brand name displayed in the bottom section */
  brandName?: string;
  /** Custom brand logo element (SVG or ReactNode) */
  brandLogo?: React.ReactNode;
  /** Callback when scroll to top is clicked */
  onScrollToTop?: () => void;
}

export function Footer11({
  badgeText = 'Loved by Creators',
  heading = 'Want to collaborate with us, explore our tools or just curious to know more?',
  contactLabel = 'Reach out at:',
  contactEmail = 'hello@watermelon.sh',
  contactEmailHref = 'mailto:hello@watermelon.sh',
  navLinks = [
    { label: 'Products', href: '#' },
    { label: 'Company', href: '#' },
    { label: 'Pricing', href: '#' },
    { label: 'Contact', href: '#' },
  ],
  brandName = 'watermelon.io',
  brandLogo,
  onScrollToTop,
}: Footer11Props) {
  const handleScrollToTop = () => {
    if (onScrollToTop) {
      onScrollToTop();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full overflow-hidden">
      <div className="relative bg-zinc-950 px-6 pt-6 pb-5 sm:px-10 md:px-16 lg:px-20 border-t border-zinc-800/70">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#108283]" />
            <span className="text-sm font-light text-zinc-300">{badgeText}</span>
          </div>

          <button
            onClick={handleScrollToTop}
            className="group text-sm inline-flex items-center gap-1.5 font-light tracking-wide text-zinc-400 transition-colors duration-200 hover:text-white cursor-pointer"
          >
            <span>Scroll to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-zinc-400 transition-all duration-200 group-hover:text-white" />
          </button>
        </div>

        <div className="mt-5 max-w-lg sm:mt-6">
          <h2 className="text-xl leading-snug font-light tracking-tight text-zinc-100 sm:text-2xl md:text-3xl">
            {heading}
          </h2>
        </div>

        <div className="mt-8 flex flex-col gap-6 sm:mt-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-light tracking-wide text-zinc-400">
              {contactLabel}
            </span>
            <a
              href={contactEmailHref}
              className="group inline-flex items-center gap-2 text-lg sm:text-xl font-medium text-zinc-200 transition-colors duration-200 hover:text-white"
            >
              <span>{contactEmail}</span>
              <ArrowRight className="w-5 h-5 text-zinc-400 transition-all duration-200 group-hover:text-white" />
            </a>
          </div>

          <nav className="flex flex-wrap items-center gap-6 sm:gap-8 lg:gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-zinc-300 transition-colors duration-200 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="relative bg-zinc-950 px-6 pt-3 pb-6 sm:px-10 md:px-16 lg:px-20 border-t border-zinc-900/80">
        <div className="relative z-10 flex w-full flex-col items-center justify-center gap-6 overflow-hidden sm:flex-row sm:gap-8">
          <div className="hidden shrink-0 sm:block">
            {brandLogo || (
              <LogoIcon className="size-16 text-white/20 lg:size-24" />
            )}
          </div>

          <svg
            className="h-auto w-full flex-1 select-none"
            viewBox={`0 0 ${Math.max(brandName.length * 90, 400)} 132`}
            preserveAspectRatio="xMidYMid meet"
            aria-label={brandName}
          >
            <text
              x="0%"
              y="76%"
              dominantBaseline="alphabetic"
              textAnchor="start"
              className="fill-white/10 font-sans font-bold tracking-tight"
              fontSize="132"
            >
              {brandName}
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Footer11;
