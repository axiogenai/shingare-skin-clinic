"use client";

import React, { useEffect, useState, useRef } from "react";

function AnimatedCounter({ end, suffix = "", duration = 2 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime: number | null = null;
          const animate = (time: number) => {
            if (!startTime) startTime = time;
            const progress = Math.min((time - startTime) / (duration * 1000), 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(end);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.25 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return (
    <span ref={ref} className="font-playfair font-normal italic">
      {count}
      {suffix}
    </span>
  );
}

export default function ConfidenceSection() {
  const stats = [
    { label: "Years in Dermatology & Hair Care", value: 12, suffix: "+" },
    { label: "Patients Treated Annually", value: 3, suffix: "k+" },
    { label: "Doctor-Led Procedures", value: 100, suffix: "%" },
    { label: "MMC / Medical Council Verified Doctors", value: 2, suffix: "" },
  ];

  return (
    <section className="bg-transparent py-20 md:py-28 relative font-source">
      <div className="max-w-[1140px] mx-auto px-5 sm:px-6 md:px-8 flex flex-col items-center text-center">
        {/* Pill Badge */}
        <div className="inline-block bg-[#FAEDDA]/90 backdrop-blur-md text-gray-900 text-xs md:text-sm font-semibold px-5 py-1.5 rounded-full mb-5 uppercase tracking-wider border border-[#E8DCBE]/70 shadow-2xs">
          CONFIDENCE ROOTED IN CLINICAL SCIENCE
        </div>

        {/* Short, Clean Headline */}
        <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-normal leading-[1.2] text-gray-950 max-w-3xl mb-4">
          Skin, Hair &amp; Laser Health.{" "}
          <span className="italic text-[#108283] font-medium">
            Expertly cared for.
          </span>
        </h2>

        {/* Concise Subtitle */}
        <p className="font-source text-gray-700 text-base sm:text-lg font-normal max-w-2xl mb-12 md:mb-16 leading-relaxed">
          Evidence-based dermatological therapies at <strong className="font-semibold text-gray-950">Shingare Skin &amp; Cosmetics Clinic</strong>, Peth Vadgaon, delivering scientific care with zero guesswork.
        </p>

        {/* 4 Stats Grid - Clean numbers and text without card wrappers */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 w-full pt-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center text-center"
            >
              {/* Number on top in teal italic serif */}
              <div className="text-[#108283] text-4xl sm:text-5xl md:text-6xl lg:text-[76px] font-normal leading-none mb-3 font-playfair">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>

              {/* Label underneath in delicate italic serif */}
              <p className="font-playfair text-sm sm:text-base lg:text-[17px] text-gray-800 italic font-normal tracking-wide max-w-[200px]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
