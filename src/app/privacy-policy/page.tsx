"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#F4F7F8] py-24 md:py-32 px-5 sm:px-6 md:px-8 font-source">
      <div className="max-w-[900px] mx-auto bg-white p-8 sm:p-12 md:p-16 shadow-[0_10px_35px_rgba(0,0,0,0.04)] border border-gray-100 rounded-3xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#108283] hover:underline mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF0DD] text-[#108283] text-xs font-semibold uppercase tracking-wider mb-4">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>ClinicOS Data Governance</span>
        </div>

        <h1 className="font-playfair text-3xl sm:text-4xl font-normal text-gray-950 mb-3">
          Privacy Policy &amp; Clinical Data Protection
        </h1>
        <p className="text-xs text-gray-500 mb-8 pb-6 border-b border-gray-100">
          <strong>Effective Date:</strong> 1st January 2026 &bull; Shingare Skin &amp; Cosmetics Clinic, Peth Vadgaon
        </p>

        <div className="space-y-6 text-sm text-gray-700 leading-relaxed font-normal">
          <p>
            At <strong>Shingare Skin &amp; Cosmetics Clinic</strong> (Dr. Pramod Shingare, MD Dermatology), we adhere to the highest ethical and regulatory standards for medical confidentiality. This policy outlines how patient health information, registration records, and prescription data are securely processed via ClinicOS.
          </p>

          <div>
            <h2 className="font-playfair text-xl font-bold text-gray-950 mb-2">
              1. Information We Collect
            </h2>
            <p className="mb-2">To provide safe, accurate dermatological care, we collect:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-gray-600">
              <li><strong>Patient Demographics:</strong> Full name, mobile number, age, gender, and residential village/city.</li>
              <li><strong>Clinical History:</strong> Presenting complaints, previous medication history, allergies, dermoscopy images, and clinical examination records.</li>
              <li><strong>Prescription &amp; Audio Data:</strong> Formulated digital prescriptions, voice recordings for dosage instructions, and follow-up schedules.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-playfair text-xl font-bold text-gray-950 mb-2">
              2. How Your Clinical Data Is Protected
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              All electronic medical records (EMR) and digital prescriptions are encrypted and stored within our local clinic server infrastructure. Patient voice recordings are streamed securely and never shared with unauthorized third parties or commercial advertising platforms.
            </p>
          </div>

          <div>
            <h2 className="font-playfair text-xl font-bold text-gray-950 mb-2">
              3. Online Appointment &amp; Queue Radar Transparency
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              When using the Live Queue Radar, only your sequential token number and initials are visible on public displays to protect your medical privacy.
            </p>
          </div>

          <div>
            <h2 className="font-playfair text-xl font-bold text-gray-950 mb-2">
              4. Contact Our Clinic Privacy Officer
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              If you have any questions regarding your clinical data or wish to request copies of your historical case papers, please contact our reception desk at Shingare Skin Clinic, Peth Vadgaon, Kolhapur: <strong className="text-gray-900">+91 72497 27104</strong>.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}


