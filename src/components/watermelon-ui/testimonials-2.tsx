"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ShieldCheck, MapPin, ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface TestimonialItem {
  id: string;
  quote: string;
  patientName: string;
  initials: string;
  location: string;
  treatment: string;
  verified: boolean;
}

const testimonials: TestimonialItem[] = [
  {
    id: "review-1",
    quote:
      "I had stubborn melasma patches on both cheeks for 3 years after pregnancy. Local beauty parlors only made it darker with harsh bleaches. Dr. Pramod Shingare started Q-Switched laser toning and proper barrier creams. In 8 weeks, it's visibly faded and my skin feels healthy, not sensitive.",
    patientName: "Sunita Kulkarni",
    initials: "SK",
    location: "Peth Vadgaon, Kolhapur",
    treatment: "Melasma & Q-Switched Laser",
    verified: true,
  },
  {
    id: "review-2",
    quote:
      "Suffered intense hair thinning around the crown. Dr. Pramod did a trichoscopy scan on my scalp right on the screen and explained the root cause. Finished 4 sessions of Autologous GFC therapy. Hair shedding stopped completely by the 2nd session and new growth is clearly visible.",
    patientName: "Prashant Patil",
    initials: "PP",
    location: "Kolhapur City",
    treatment: "Hair GFC & Trichology",
    verified: true,
  },
  {
    id: "review-3",
    quote:
      "Dr. Priyanka Shingare's care for cystic acne was life-changing. She prescribed a medical chemical peel and oral therapy, plus the QR code audio note on the case paper explained everything in Marathi so my mother knew exactly when to apply which cream at home. Zero confusion.",
    patientName: "Neha Jadhav",
    initials: "NJ",
    location: "Ichalkaranji",
    treatment: "Severe Acne & Barrier Care",
    verified: true,
  },
  {
    id: "review-4",
    quote:
      "Took the Medi-Hydra Facial before my brother's wedding. Completely medical-grade with ultrasonic extraction — no painful squeezing, no irritation or post-facial redness. My skin was glowing naturally for weeks without heavy foundation.",
    patientName: "Aishwarya Deshmukh",
    initials: "AD",
    location: "Jaysingpur",
    treatment: "Medical Hydra Medi-Facial",
    verified: true,
  },
  {
    id: "review-5",
    quote:
      "What impressed me most was the honesty. No trying to sell 10-session packages. Dr. Pramod told me exactly which eczema ointment to use and what soap to stop. Within 2 weeks my chronic hand eczema cleared up after struggling for months.",
    patientName: "Sanjay Mane",
    initials: "SM",
    location: "Peth Vadgaon, Kolhapur",
    treatment: "Chronic Eczema OPD",
    verified: true,
  },
  {
    id: "review-6",
    quote:
      "The Live Queue feature on their website is brilliant. I checked my token number from home in Shirol, reached the clinic right when my turn was near, and didn't have to wait in a crowded waiting room with my elderly father.",
    patientName: "Vikas Powar",
    initials: "VP",
    location: "Shirol, Kolhapur",
    treatment: "ClinicOS Live Queue OPD",
    verified: true,
  },
];

export default function Testimonials2() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const activeReview = testimonials[currentIndex];

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      let next = prev + newDirection;
      if (next < 0) next = testimonials.length - 1;
      if (next >= testimonials.length) next = 0;
      return next;
    });
  };

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 120 : -120,
      opacity: 0,
      scale: 0.96,
      rotate: dir > 0 ? 1.5 : -1.5,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -120 : 120,
      opacity: 0,
      scale: 0.96,
      rotate: dir > 0 ? -1.5 : 1.5,
      transition: {
        duration: 0.28,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  return (
    <section
      id="testimonials"
      className="py-16 md:py-24 bg-white relative font-source border-t border-[#292d27]/8 overflow-hidden select-none"
    >
      <div className="max-w-[1240px] mx-auto px-5 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-[#7e423e]/8 text-[#7e423e] text-[10px] sm:text-[11px] font-mono font-semibold px-3.5 py-1.5 rounded-full mb-3 uppercase tracking-[0.2em] border border-[#7e423e]/15">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7e423e]" />
            Verified Patient Experiences
          </div>

          <h2 className="font-['Playfair_Display',Georgia,serif] text-3xl sm:text-4xl md:text-5xl text-[#1b261e] font-bold leading-tight mb-3">
            Trusted by Patients Across{" "}
            <span className="italic font-medium text-[#873f3b]">
              Kolhapur &amp; Western Maharashtra
            </span>
          </h2>

          <p className="text-[#616558] text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            Real feedback from patients treated at Shingare Skin &amp; Cosmetics Clinic. Measured by clinical recovery, patient dignity, and transparent counseling.
          </p>
        </div>

        {/* 3D Stacked Swipeable Card Container */}
        <div className="relative max-w-[760px] mx-auto px-2 sm:px-4">
          {/* Background Card Stack Depth Layers */}
          <div className="absolute inset-x-8 -top-3 bottom-3 bg-[#FAF8F5] rounded-3xl border border-[#292d27]/8 scale-[0.96] opacity-70 pointer-events-none -z-10 shadow-xs" />
          <div className="absolute inset-x-14 -top-6 bottom-6 bg-[#FAF8F5] rounded-3xl border border-[#292d27]/6 scale-[0.92] opacity-40 pointer-events-none -z-20 shadow-2xs" />

          {/* Swipeable Active Card */}
          <div className="relative min-h-[340px] sm:min-h-[300px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeReview.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragEnd={(_, { offset, velocity }) => {
                  const swipe = Math.abs(offset.x) * velocity.x;
                  if (offset.x < -40 || swipe < -100) {
                    paginate(1);
                  } else if (offset.x > 40 || swipe > 100) {
                    paginate(-1);
                  }
                }}
                className="w-full bg-[#FAF8F5] border border-[#292d27]/10 rounded-3xl p-6 sm:p-8 md:p-9 shadow-[0_8px_30px_rgba(41,45,39,0.05)] cursor-grab active:cursor-grabbing"
              >
                {/* Card Top: Stars & Treatment Pill */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-[#292d27]/8">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, idx) => (
                      <Star
                        key={idx}
                        className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]"
                      />
                    ))}
                  </div>

                  <span className="font-mono text-[10px] font-bold px-3 py-1 rounded-full bg-white text-[#873f3b] border border-[#873f3b]/20 tracking-wider uppercase shadow-2xs">
                    {activeReview.treatment}
                  </span>
                </div>

                {/* Patient Quote */}
                <div className="relative mb-6">
                  <Quote className="absolute -top-2 -left-1 w-6 h-6 text-[#873f3b]/15 pointer-events-none" />
                  <p className="text-sm sm:text-base md:text-[17px] text-[#292d27] leading-relaxed italic pl-5 font-normal">
                    &ldquo;{activeReview.quote}&rdquo;
                  </p>
                </div>

                {/* Card Footer: Patient Profile */}
                <div className="pt-4 border-t border-[#292d27]/8 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#1a241d] text-white font-mono text-xs font-bold flex items-center justify-center shadow-xs">
                      {activeReview.initials}
                    </div>

                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-[#1a241d] font-['Playfair_Display',Georgia,serif]">
                        {activeReview.patientName}
                      </h4>
                      <div className="flex items-center gap-1 text-[11px] text-[#616558]">
                        <MapPin className="w-3 h-3 text-[#873f3b]" />
                        <span>{activeReview.location}</span>
                      </div>
                    </div>
                  </div>

                  {activeReview.verified && (
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1a241d] bg-white px-3 py-1 rounded-full border border-[#292d27]/10 shadow-2xs">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#873f3b]" />
                      <span>Verified Patient</span>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Swipe Controls Bar (Previous, Indicator Dots, Next) */}
          <div className="flex items-center justify-between gap-4 mt-8 pt-2">
            <button
              onClick={() => paginate(-1)}
              aria-label="Previous testimonial"
              className="inline-flex items-center gap-1.5 bg-white text-[#1a241d] px-4 py-2 rounded-full text-xs font-semibold tracking-wider shadow-sm cursor-pointer active:scale-95 border-0 outline-none focus:outline-none focus-visible:outline-none !outline-none"
            >
              <ChevronLeft className="w-4 h-4 text-[#873f3b]" />
              <span className="hidden sm:inline">Previous</span>
            </button>

            {/* Stepper Dots Navigation */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > currentIndex ? 1 : -1);
                    setCurrentIndex(i);
                  }}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer border-0 outline-none focus:outline-none focus-visible:outline-none !outline-none ${
                    currentIndex === i
                      ? "w-8 bg-[#873f3b]"
                      : "w-2 bg-[#292d27]/20 hover:bg-[#292d27]/40"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => paginate(1)}
              aria-label="Next testimonial"
              className="inline-flex items-center gap-1.5 bg-white text-[#1a241d] px-4 py-2 rounded-full text-xs font-semibold tracking-wider shadow-sm cursor-pointer active:scale-95 border-0 outline-none focus:outline-none focus-visible:outline-none !outline-none"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-4 h-4 text-[#873f3b]" />
            </button>
          </div>

          {/* Swipe Helper Text on Mobile */}
          <p className="text-center text-[10px] font-mono uppercase tracking-[0.18em] text-[#8a8d83] mt-3">
            Swipe or use arrows to view patient stories
          </p>
        </div>
      </div>
    </section>
  );
}
