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
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

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
        className={`rounded-2xl px-6 transition-all duration-300 border ${
          isOpen
            ? "bg-[#0e787a]/[0.08] border-[#0e787a] ring-2 ring-[#0e787a]/30 shadow-xs"
            : "bg-white/90 hover:bg-white border-stone-200/80 shadow-2xs"
        }`}
      >
        <button
          type="button"
          onClick={() => toggleItem(faq.id)}
          aria-expanded={isOpen}
          className="group flex w-full items-center justify-between py-5 text-left hover:no-underline cursor-pointer"
        >
          <span
            className={`pr-4 text-left text-[15px] sm:text-base font-medium transition-colors ${
              isOpen
                ? "text-[#0f172a] font-semibold"
                : "text-stone-800 group-hover:text-[#0e787a]"
            }`}
          >
            {faq.question}
          </span>
          <div
            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors ${
              isOpen
                ? "bg-[#0e787a] text-white"
                : "bg-stone-100 text-stone-600 group-hover:bg-[#0e787a]/10 group-hover:text-[#0e787a]"
            }`}
          >
            <ChevronDown
              className={`block h-4 w-4 transition-transform duration-300 ${
                isOpen ? "rotate-0" : "rotate-180"
              }`}
            />
          </div>
        </button>

        {isOpen && (
          <div className="pt-0 pb-5 animate-in fade-in duration-200">
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
      <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-2xl">
          {badge && (
            <div className="bg-[#0e787a]/10 text-[#0e787a] border-[#0e787a]/20 mb-4 inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-semibold uppercase tracking-wider">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0e787a]" />
              <span>{badge}</span>
            </div>
          )}
          <h2 className="font-playfair text-stone-950 mb-3 text-3xl font-normal tracking-tight md:text-5xl leading-[1.15]">
            {title}
          </h2>
          {description && (
            <p className="text-stone-600 text-sm sm:text-base md:text-lg leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {buttonText && buttonHref && (
          <div className="mb-2 shrink-0 md:mb-0">
            <Link
              href={buttonHref}
              className="inline-flex items-center gap-2 rounded-full bg-stone-950 hover:bg-[#93231f] text-stone-50 px-6 py-3 text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-sm active:scale-95"
            >
              <span>{buttonText}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#FAEDDA]" />
            </Link>
          </div>
        )}
      </div>

      <div className="w-full">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 items-start">
          <div className="flex flex-col gap-3">
            {leftFaqs.map((faq) => renderFaqCard(faq))}
          </div>
          <div className="flex flex-col gap-3">
            {rightFaqs.map((faq) => renderFaqCard(faq))}
          </div>
        </div>
      </div>
    </section>
  );
}
export default Faq4;
