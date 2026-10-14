"use client";

import React from "react";
import { Star, ShieldCheck, MapPin } from "lucide-react";

interface TestimonialItem {
  quote: string;
  patientName: string;
  initials: string;
  location: string;
  treatment: string;
  verified: boolean;
}

const testimonials: TestimonialItem[] = [
  {
    quote:
      "I had stubborn melasma patches on both cheeks for 3 years after pregnancy. Local beauty parlors only made it darker with harsh bleaches. Dr. Pramod Shingare started Q-Switched laser toning and proper barrier creams. In 8 weeks, it's visibly faded and my skin feels healthy, not sensitive.",
    patientName: "Sunita Kulkarni",
    initials: "SK",
    location: "Peth Vadgaon, Kolhapur",
    treatment: "Melasma & Q-Switched Laser",
    verified: true,
  },
  {
    quote:
      "Suffered intense hair thinning around the crown. Dr. Pramod did a trichoscopy scan on my scalp right on the screen and explained the root cause. Finished 4 sessions of Autologous GFC therapy. Hair shedding stopped completely by the 2nd session and new growth is clearly visible.",
    patientName: "Prashant Patil",
    initials: "PP",
    location: "Kolhapur City",
    treatment: "Hair GFC & Trichology",
    verified: true,
  },
  {
    quote:
      "Dr. Priyanka Shingare's care for cystic acne was life-changing. She prescribed a medical chemical peel and oral therapy, plus the QR code audio note on the case paper explained everything in Marathi so my mother knew exactly when to apply which cream at home. Zero confusion.",
    patientName: "Neha Jadhav",
    initials: "NJ",
    location: "Ichalkaranji",
    treatment: "Severe Acne & Barrier Care",
    verified: true,
  },
  {
    quote:
      "Took the Medi-Hydra Facial before my brother's wedding. Completely medical-grade with ultrasonic extraction — no painful squeezing, no irritation or post-facial redness. My skin was glowing naturally for weeks without heavy foundation.",
    patientName: "Aishwarya Deshmukh",
    initials: "AD",
    location: "Jaysingpur",
    treatment: "Medical Hydra Medi-Facial",
    verified: true,
  },
  {
    quote:
      "What impressed me most was the honesty. No trying to sell 10-session packages. Dr. Pramod told me exactly which eczema ointment to use and what soap to stop. Within 2 weeks my chronic hand eczema cleared up after struggling for months.",
    patientName: "Sanjay Mane",
    initials: "SM",
    location: "Peth Vadgaon, Kolhapur",
    treatment: "Chronic Eczema OPD",
    verified: true,
  },
  {
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
  return (
    <section id="testimonials" className="pt-16 md:pt-20 pb-6 md:pb-8 bg-white relative font-source border-t border-stone-200/70">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 bg-[#FAF0DD] text-[#108283] text-xs font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider border border-[#E8DCBE]/70">
            <span className="w-1.5 h-1.5 rounded-full bg-[#108283]" />
            Verified Patient Experiences
          </div>

          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl text-stone-950 font-normal leading-tight mb-4">
            Trusted by Patients Across{" "}
            <span className="text-[#108283] font-semibold italic">
              Kolhapur &amp; Western Maharashtra
            </span>
          </h2>

          <p className="text-stone-600 text-base md:text-lg font-normal leading-relaxed">
            Real feedback from patients treated at Shingare Skin &amp; Cosmetics Clinic. Measured by clinical recovery, patient dignity, and transparent counseling.
          </p>
        </div>

        {/* 6 Testimonial Cards Grid (Watermelon UI Testimonials-2 Pattern) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="group relative bg-[#F7F6F4] border border-stone-200/90 rounded-2xl p-6 sm:p-7 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:border-[#108283]/60 hover:bg-white hover:shadow-[0_8px_24px_rgba(16,130,131,0.06)] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Rating & Treatment Micro-Badge */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-200/60">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, idx) => (
                      <Star
                        key={idx}
                        className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]"
                      />
                    ))}
                  </div>

                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 tracking-wide uppercase border border-stone-200/60">
                    {t.treatment}
                  </span>
                </div>

                {/* Quote Text */}
                <p className="text-xs sm:text-[13px] text-stone-700 leading-relaxed italic mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Patient Profile */}
              <div className="pt-4 border-t border-stone-200/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-stone-200/80 text-stone-800 font-mono text-xs font-bold flex items-center justify-center border border-stone-300/60">
                    {t.initials}
                  </div>

                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-stone-950 font-playfair">
                      {t.patientName}
                    </h4>
                    <div className="flex items-center gap-1 text-[10.5px] text-stone-500">
                      <MapPin className="w-3 h-3 text-stone-400" />
                      <span>{t.location}</span>
                    </div>
                  </div>
                </div>

                {t.verified && (
                  <div className="flex items-center gap-1 text-[10.5px] font-semibold text-[#108283] bg-[#108283]/8 px-2 py-0.5 rounded-md border border-[#108283]/15">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Verified</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
