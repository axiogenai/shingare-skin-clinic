"use client";

import React, { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { CheckCircle2, Phone, Send, Stethoscope } from "lucide-react";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function ContactFormSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="w-full py-16 px-5 sm:px-6 md:px-8 bg-white font-source">
      <div className="max-w-[1000px] mx-auto bg-[#F4F7F8] border border-gray-100 rounded-3xl p-8 sm:p-12 md:p-16 shadow-[0_10px_35px_rgba(0,0,0,0.03)]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <div className="inline-block bg-[#FAEDDA] text-[#108283] text-xs font-semibold px-4 py-1.5 rounded-full mb-3 uppercase tracking-wider">
            GET IN TOUCH
          </div>
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-gray-950 mb-3">
            Contact Dr. Pramod Shingare&apos;s Clinic
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Have clinical questions or need appointment assistance? Leave your details below and our clinic reception will reach out to you promptly.
          </p>
        </motion.div>

        {submitted ? (
          <div className="text-center py-10 space-y-3 bg-white rounded-2xl p-8 border border-gray-100">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-playfair text-2xl font-bold text-gray-950">
              Message Sent Successfully
            </h3>
            <p className="text-sm text-gray-600 max-w-md mx-auto">
              Thank you, {formData.name}. Our clinic desk will review your inquiry and contact you at {formData.phone}.
            </p>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: "", phone: "", email: "", message: "" });
              }}
              className="text-xs text-[#108283] font-semibold underline underline-offset-4 pt-2 cursor-pointer"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto text-xs text-gray-700">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold uppercase tracking-wider mb-1 text-gray-700">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Anand Jadhav"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:border-[#108283] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider mb-1 text-gray-700">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:border-[#108283] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider mb-1 text-gray-700">
                Email Address (Optional)
              </label>
              <input
                type="email"
                placeholder="e.g. anand@gmail.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:border-[#108283] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider mb-1 text-gray-700">
                Your Message / Health Query
              </label>
              <textarea
                rows={4}
                placeholder="Describe your skin or hair concern..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:border-[#108283] focus:outline-none resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#108283] hover:bg-[#0c6b6c] text-white font-semibold uppercase tracking-wider text-xs transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Inquiry</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

