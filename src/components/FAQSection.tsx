"use client";

import React from "react";
import { Faq4, type FaqItem } from "@/components/watermelon-ui/faq-4";

const clinicFaqs: FaqItem[] = [
  {
    id: "faq-1",
    question: "What skin, hair, and laser conditions are treated at Shingare Clinic?",
    answer:
      "Dr. Pramod Shingare (MD Ayu, D.Dermatology MUHS) and Dr. Priyanka Shingare specialize in Clinical Dermatology (acne, melasma, eczema, psoriasis, vitiligo, fungal infections), Trichology (hair fall, PRP & GFC hair restoration, dandruff), and Aesthetic Lasers (acne scar resurfacing, tattoo removal, and medical hydra-facials).",
  },
  {
    id: "faq-2",
    question: "How does the ClinicOS Live Queue Radar work for patients?",
    answer:
      "When you book a consultation token online or at reception, you receive a sequential token number. On our 'Live Queue' page, you can view real-time cabin status, your exact position in line, and your estimated consultation time before arriving at the clinic.",
  },
  {
    id: "faq-3",
    question: "How do I listen to my doctor's voice prescription in Marathi or English?",
    answer:
      "Every digital prescription printed at Shingare Skin & Cosmetics Clinic includes a secure QR code. Scan the QR code with your phone or enter your prescription ID on the 'My Rx' portal to play personalized audio instructions explaining how and when to apply each medication.",
  },
  {
    id: "faq-4",
    question: "Are all laser, PRP, and GFC procedures performed by the doctors?",
    answer:
      "Yes, 100%. Every dermoscopy diagnosis, autologous GFC/PRP hair restoration session, chemical peel, and Q-Switched Nd:YAG laser treatment is personally evaluated and supervised by Dr. Pramod Shingare and Dr. Priyanka Shingare under strict clinical safety standards.",
  },
  {
    id: "faq-5",
    question: "What are the daily OPD consultation timings at Peth Vadgaon?",
    answer:
      "Our clinic operates Monday to Saturday across two daily sessions: Morning OPD from 10:00 AM to 1:30 PM, and Evening OPD from 5:00 PM to 9:00 PM. Routine OPD remains closed on Sundays.",
  },
  {
    id: "faq-6",
    question: "How can an employer or institution verify a medical certificate?",
    answer:
      "All official medical fitness and treatment certificates issued at our clinic carry a cryptographic verification ID and QR code. Anyone can verify authenticity instantaneously on our 'Verify Certificate' portal.",
  },
];

export default function FAQSection() {
  return (
    <div id="faqs" className="bg-[#FAF6F2] border-t border-stone-200/70 scroll-mt-20">
      <Faq4
        badge="Patient Information & Guidance"
        title={
          <>
            Frequently Asked{" "}
            <span className="font-semibold italic text-[#0e787a]">
              Questions
            </span>
          </>
        }
        description="Clear, transparent answers about our dermatology consultations, laser & hair PRP procedures, and digital ClinicOS patient tools."
        buttonText="Book Consultation"
        buttonHref="/book-now"
        faqs={clinicFaqs}
      />
    </div>
  );
}
