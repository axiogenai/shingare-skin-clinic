"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";
import { HeroBanner, CTABanner } from "@/components/SharedSections";

interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  excerpt: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "understanding-your-skin-barrier",
    title: "Understanding Your Skin Barrier & Topical Steroid Withdrawal",
    category: "Clinical Dermatology",
    date: "March 2026",
    readTime: "5 min read",
    image: "https://dermafusion.co.uk/wp-content/uploads/Facials-home-service-box.jpg",
    excerpt:
      "The stratum corneum is your skin's vital external shield. When damaged by unauthorized steroid creams (SkinLite, Betnovate, Panderm) or harsh scrubs, trans-epidermal water loss accelerates, causing rebound redness, thinning, and rosacea. Learn how evidence-based barrier repair protocols restore structural integrity under MD dermatologist care.",
  },
  {
    id: "prp-vs-gfc-hair-loss",
    title: "PRP vs. GFC: Which Hair Regrowth Therapy Is Right For You?",
    category: "Trichology",
    date: "February 2026",
    readTime: "6 min read",
    image: "https://dermafusion.co.uk/wp-content/uploads/Advanced-treatment-home-service-box.jpg",
    excerpt:
      "Autologous Platelet-Rich Plasma (PRP) and Growth Factor Concentrate (GFC) represent the pinnacle of regenerative follicular science. Discover the biochemical differences, platelet concentrations, and clinical evidence for halting miniaturization and reversing androgenetic alopecia.",
  },
  {
    id: "preparing-for-laser-resurfacing",
    title: "Preparing For Q-Switched Nd:YAG Laser & Chemical Peels",
    category: "Aesthetic Lasers",
    date: "January 2026",
    readTime: "6 min read",
    image: "https://dermafusion.co.uk/wp-content/uploads/State-of-the-art-technology-image.jpg",
    excerpt:
      "Professional laser resurfacing and chemical peels remain dermatology's most potent modalities for clarifying acne scars and stubborn melasma. Here is what to expect before, during, and after your clinical laser sessions at Shingare Skin Clinic.",
  },
];

const categories = ["All", "Clinical Dermatology", "Trichology", "Aesthetic Lasers"] as const;

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredPosts =
    selectedCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  return (
    <main className="min-h-screen bg-white font-source">
      {/* 1. Hero Banner */}
      <HeroBanner
        badge="DERMATOLOGY EDUCATION • DR. PRAMOD SHINGARE"
        title="Clinical Journal & Insights"
        subtitle="Evidence-based articles on skin barrier repair, hair restoration & laser science"
      />

      {/* 2. Blog Posts Section */}
      <section className="py-16 md:py-24 px-5 sm:px-6 md:px-8 bg-[#f6f3eb]">
        <div className="max-w-[1140px] mx-auto">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-14">
            {categories.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#355a48] text-white shadow-xs"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-3xl border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(16,130,131,0.08)] transition-all duration-300 flex flex-col justify-between group overflow-hidden"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-3.5 left-3.5">
                      <span className="px-3 py-1 text-[11px] uppercase tracking-wider font-semibold text-[#355a48] bg-white/95 backdrop-blur-md rounded-full shadow-2xs border border-white">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#355a48]" />
                        {post.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#355a48]" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="font-playfair text-xl font-bold text-gray-950 mb-3 group-hover:text-[#355a48] transition-colors leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-1 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#355a48] flex items-center gap-1 group-hover:underline">
                    <span>Clinical Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <Link
                    href="/book-now"
                    className="text-[11px] text-gray-500 hover:text-[#355a48]"
                  >
                    Consult Doctor
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CTA Banner */}
      <CTABanner />
    </main>
  );
}


