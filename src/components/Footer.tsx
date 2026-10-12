"use client";

import React from "react";
import { Footer11 } from "@/components/ui/footer-11";

export default function Footer() {
  const navLinks = [
    { label: "Skin Care", href: "/skin" },
    { label: "Hair & PRP", href: "/hair" },
    { label: "Cosmetics", href: "/cosmetics" },
    { label: "Live Queue", href: "/live-queue" },
    { label: "Book Token", href: "/book-now" },
  ];

  return (
    <footer className="w-full relative print:hidden">
      {/* Seamless Ambient Feather Blend from page canvas into dark footer */}
      <div
        className="w-full h-24 sm:h-36 -mt-24 sm:-mt-36 pointer-events-none relative z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(9,9,11,0) 0%, rgba(9,9,11,0.03) 15%, rgba(9,9,11,0.12) 32%, rgba(9,9,11,0.32) 52%, rgba(9,9,11,0.62) 74%, rgba(9,9,11,0.88) 90%, #09090b 100%)",
        }}
      />
      <div className="flex w-full items-end justify-center bg-zinc-950">
        <Footer11
          badgeText="Shingare Skin & Cosmetics"
          heading="Want to book a consultation, explore our skin & laser treatments, or just curious to know more?"
          contactLabel="Reach out at:"
          contactEmail="+91 72497 27104"
          contactEmailHref="tel:+917249727104"
          navLinks={navLinks}
          brandName="Shingare"
        />
      </div>
    </footer>
  );
}
