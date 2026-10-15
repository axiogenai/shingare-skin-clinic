"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight } from "lucide-react";

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface Faq4Props {
  badge?: string;
  title: React.ReactNode;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
  faqs: FaqItem[];
  className?: string;
}

export function Faq4({
  badge,
  title,
  description,
  buttonText,
  buttonHref,
  faqs,
  className = "",
}: Faq4Props) {
  const [openId, setOpenId] = useState<string | null>(null);

  const leftFaqs = faqs.filter((_, i) => i % 2 === 0);
  const rightFaqs = faqs.filter((_, i) => i % 2 !== 0);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const renderFaqCard = (faq: FaqItem) => {
    const isOpen = openId === faq.id;
    return (
      <div
        key={faq.id}
        data-state={isOpen ? "open" : "closed"}
        style={{ outline: "none" }}
        className={`rounded-2xl px-5 sm:px-6 transition-[background-color,border-color,box-shadow] duration-150 border flex flex-col justify-start !transform-none ${
          isOpen
            ? "bg-[#0e787a]/[0.08] border-[#0e787a] shadow-xs"
            : "bg-white/95 hover:bg-white border-stone-200/90 shadow-2xs"
        }`}
      >
        <button
          type="button"
          onClick={() => toggleItem(faq.id)}
          aria-expanded={isOpen}
          style={{ outline: "none", border: "none" }}
          className="group flex w-full items-center justify-between py-4 sm:py-4.5 text-left hover:no-underline cursor-pointer focus:outline-none focus-visible:outline-none focus:ring-0 outline-none border-0 ring-0 min-h-[78px] sm:min-h-[82px]"
        >
          <span
            className={`pr-3 text-left text-[14.5px] sm:text-[15px] font-medium leading-[1.35] tracking-tight transition-colors duration-150 ${
              isOpen
                ? "text-[#0f172a] font-semibold"
                : "text-stone-800 group-hover:text-[#0e787a]"
            }`}
          >
            {faq.question}
          </span>
          <div
            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-150 ${
              isOpen
                ? "bg-[#0e787a] text-white"
                : "bg-stone-100 text-stone-600 group-hover:bg-[#0e787a]/10 group-hover:text-[#0e787a]"
            }`}
          >
            <ChevronDown
              className={`block h-4 w-4 transition-transform duration-150 ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>
        </button>

        {isOpen && (
          <div className="pt-0 pb-5 animate-in fade-in duration-150">
            <p className="text-stone-600 text-sm leading-relaxed">
              {faq.answer}
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <section
      className={`mx-auto w-full max-w-[1140px] px-4 sm:px-6 md:px-8 py-16 md:py-24 font-source ${className}`}
    >
      <div className="relative mb-12 sm:mb-14">
        <div className="text-center max-w-2xl mx-auto flex flex-col items-center">
          {badge && (
            <div className="inline-flex items-center gap-2 bg-[#7e423e]/8 text-[#7e423e] border border-[#7e423e]/18 px-4 py-1.5 rounded-full mb-3.5 text-[10.5px] sm:text-[11px] font-mono font-semibold uppercase tracking-[0.2em] shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7e423e]" />
              <span>{badge}</span>
            </div>
          )}
          <h2 className="font-playfair text-stone-950 mb-3 text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight leading-[1.15] text-center">
            {title}
          </h2>
          {description && (
            <p className="text-stone-600 text-sm sm:text-base md:text-lg leading-relaxed text-center max-w-xl mx-auto">
              {description}
            </p>
          )}
        </div>

        {buttonText && buttonHref && (
          <div className="mt-5 md:mt-0 md:absolute md:right-0 md:top-0 flex justify-center md:justify-end">
            <Link
              href={buttonHref}
              style={{ backgroundColor: "#0c0a09" }}
              className="inline-flex items-center gap-2 rounded-full bg-stone-950 text-stone-50 px-6 py-3 text-xs font-bold uppercase tracking-wider shadow-sm"
            >
              <span>{buttonText}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#FAEDDA]" />
            </Link>
          </div>
        )}
      </div>

      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 items-start">
          <div className="flex flex-col gap-3.5 sm:gap-4">
            {leftFaqs.map((faq) => renderFaqCard(faq))}
          </div>
          <div className="flex flex-col gap-3.5 sm:gap-4">
            {rightFaqs.map((faq) => renderFaqCard(faq))}
          </div>
        </div>
      </div>
    </section>
  );
}
export default Faq4;
