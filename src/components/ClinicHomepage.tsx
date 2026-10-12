"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, ArrowUpRight, Check, Clock3, MapPin, Phone, Sparkles,
  ScanFace, Droplets, Waves, Leaf, Activity, CircleHelp, CalendarDays,
} from "lucide-react";
import ClinicHero22 from "@/components/watermelon-ui/clinic-hero-22";
import FAQSection from "@/components/FAQSection";
import styles from "./clinic-homepage.module.css";

const treatments = [
  { title: "Clinical dermatology", text: "Personalised care for acne, eczema, psoriasis, pigmentation and other skin concerns.", image: "/services/clinical-dermatology.png", tag: "Skin health", href: "/skin", icon: ScanFace },
  { title: "Hair & scalp care", text: "Assessment and treatment planning for hair fall, scalp concerns and hair thinning.", image: "/services/hair-care.png", tag: "Hair health", href: "/hair", icon: Waves },
  { title: "Cosmetic treatments", text: "Doctor-guided options for skin texture, uneven tone, rejuvenation and cosmetic concerns.", image: "/services/medifacial.png", tag: "Aesthetic care", href: "/cosmetics", icon: Sparkles },
  { title: "Peels & skin renewal", text: "Explore suitable clinical exfoliation and skin-renewal options after consultation.", image: "/services/chemical-peel.png", tag: "Skin renewal", href: "/advanced-treatments", icon: Droplets },
];

const principles = [
  { n: "01", title: "Start with understanding", text: "A consultation begins with your concerns, history and the details that make your skin or hair unique." },
  { n: "02", title: "Explain the options", text: "Understand the purpose of a recommended treatment, the expected process and the care it requires." },
  { n: "03", title: "Care beyond the visit", text: "Clear after-care guidance helps you understand what to do next and when to seek follow-up advice." },
];

export default function ClinicHomepage() {
  return (
    <main className={styles.page}>
      <ClinicHero22 />

      <section className={styles.introStrip} aria-label="Clinic highlights">
        <div className={styles.stripInner}>
          <span className={styles.stripLabel}>A thoughtful approach to care</span>
          <div className={styles.stripItems}>
            <span><Check size={15} /> Skin consultations</span>
            <span><Check size={15} /> Hair & scalp care</span>
            <span><Check size={15} /> Cosmetic guidance</span>
            <span><Check size={15} /> Patient-first communication</span>
          </div>
        </div>
      </section>

      <section className={styles.treatments} id="treatments">
        <div className={styles.sectionHeading}>
          <div>
            <span className={styles.kicker}>Explore our services</span>
            <h2>Care for your skin.<br /><em>Support for your confidence.</em></h2>
          </div>
          <p>Every concern deserves a considered conversation. Explore our areas of care, then book a consultation to discuss what may be right for you.</p>
        </div>
        <div className={styles.treatmentGrid}>
          {treatments.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link className={styles.treatmentCard} href={item.href} key={item.title}>
                <div className={styles.treatmentImage}>
                  <Image src={item.image} alt="" fill sizes="(max-width: 700px) 100vw, (max-width: 1050px) 50vw, 25vw" />
                  <span className={styles.treatmentIndex}>0{index + 1}</span>
                  <span className={styles.cardArrow}><ArrowUpRight size={18} /></span>
                </div>
                <div className={styles.treatmentBody}>
                  <span className={styles.treatmentTag}><Icon size={14} /> {item.tag}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <span className={styles.textLink}>Explore service <ArrowRight size={15} /></span>
                </div>
              </Link>
            );
          })}
        </div>
        <div className={styles.centerLink}><Link href="/advanced-treatments">View treatment information <ArrowRight size={16} /></Link></div>
      </section>

      <section className={styles.doctorSection} id="our-approach">
        <div className={styles.doctorVisual}>
          <Image src="/docbg.png" alt="" fill sizes="(max-width: 800px) 100vw, 48vw" />
          <div className={styles.doctorSeal}><span>SHINGARE</span><small>Skin & Cosmetics Clinic</small></div>
          <div className={styles.doctorImageCaption}>Medical knowledge.<br /><em>Human understanding.</em></div>
        </div>
        <div className={styles.doctorCopy}>
          <span className={styles.kicker}>A clinic built around people</span>
          <h2>Good care begins<br />with <em>a conversation.</em></h2>
          <p>Skin and hair concerns can affect everyday confidence. We aim to make each visit clear and comfortable — with time to understand your concern, discuss options and explain the next steps.</p>
          <div className={styles.principles}>
            {principles.map((item) => (
              <div className={styles.principle} key={item.n}>
                <span>{item.n}</span>
                <div><h3>{item.title}</h3><p>{item.text}</p></div>
              </div>
            ))}
          </div>
          <Link href="/about" className={styles.outlineButton}>Meet the clinic <ArrowUpRight size={16} /></Link>
        </div>
      </section>

      <section className={styles.featureSection}>
        <div className={styles.featureIntro}>
          <span className={styles.kicker}>A more considered experience</span>
          <h2>Clear guidance, from<br /><em>first visit to follow-up.</em></h2>
          <p>We bring together in-person care and practical digital tools to help patients navigate their clinic visit.</p>
          <Link href="/book-now" className={styles.darkButton}>Plan your visit <ArrowRight size={16} /></Link>
        </div>
        <div className={styles.featureCards}>
          <Link href="/book-now" className={styles.featureCard}>
            <span className={styles.featureIcon}><CalendarDays /></span>
            <span className={styles.featureNumber}>01 / APPOINTMENTS</span>
            <h3>Request a visit</h3>
            <p>Share your details and preferred consultation slot through the appointment page.</p>
            <ArrowUpRight className={styles.featureArrow} />
          </Link>
          <Link href="/live-queue" className={styles.featureCard}>
            <span className={styles.featureIcon}><Activity /></span>
            <span className={styles.featureNumber}>02 / CLINIC QUEUE</span>
            <h3>Check the live queue</h3>
            <p>Use the clinic queue page to check available patient-flow information before travelling.</p>
            <ArrowUpRight className={styles.featureArrow} />
          </Link>
          <Link href="/my-rx" className={styles.featureCard}>
            <span className={styles.featureIcon}><CircleHelp /></span>
            <span className={styles.featureNumber}>03 / PATIENT TOOLS</span>
            <h3>Prescription support</h3>
            <p>Access the clinic's prescription portal using the information provided by the clinic.</p>
            <ArrowUpRight className={styles.featureArrow} />
          </Link>
        </div>
      </section>

      <section className={styles.visitSection} id="visit">
        <div className={styles.visitCopy}>
          <span className={styles.kicker}>Find us</span>
          <h2>Your next step<br /><em>starts here.</em></h2>
          <p>Visit Shingare Skin & Cosmetics Clinic in Peth Vadgaon, Kolhapur. Call the clinic if you need help choosing a suitable appointment.</p>
          <div className={styles.contactRows}>
            <a href="tel:+917249727104"><span><Phone size={17} /></span><div><small>Call the clinic</small><strong>+91 72497 27104</strong></div><ArrowUpRight size={16} /></a>
            <div><span><Clock3 size={17} /></span><div><small>OPD hours</small><strong>Mon–Sat · 10:00–13:30 & 17:00–21:00</strong></div></div>
            <div><span><MapPin size={17} /></span><div><small>Clinic location</small><strong>Peth Vadgaon, Kolhapur, Maharashtra</strong></div></div>
          </div>
          <div className={styles.visitActions}>
            <Link href="/book-now" className={styles.darkButton}>Request appointment <ArrowRight size={16} /></Link>
            <a href="https://www.google.com/maps/search/?api=1&query=Shingare+Skin+%26+Cosmetics+Clinic+Peth+Vadgaon" target="_blank" rel="noreferrer" className={styles.mapLink}>Get directions <ArrowUpRight size={16} /></a>
          </div>
        </div>
        <div className={styles.visitVisual}>
          <div className={styles.mapPanel}>
            <div className={styles.mapPattern} aria-hidden="true" />
            <div className={styles.mapPin}><MapPin size={22} /></div>
            <span className={styles.mapLabel}>PETH VADGAON</span>
            <span className={styles.mapSub}>KOLHAPUR · MAHARASHTRA</span>
            <a href="https://www.google.com/maps/search/?api=1&query=Shingare+Skin+%26+Cosmetics+Clinic+Peth+Vadgaon" target="_blank" rel="noreferrer">Open in Maps <ArrowUpRight size={15} /></a>
          </div>
          <div className={styles.visitNote}><Leaf size={17} /><span>Personalised care, rooted in listening.</span></div>
        </div>
      </section>

      <section className={styles.finalCta}>
        <div className={styles.ctaTexture} aria-hidden="true" />
        <div className={styles.ctaContent}>
          <span className={styles.kicker}>Your care, your pace</span>
          <h2>Let's talk about<br /><em>what matters to you.</em></h2>
          <p>Start with a consultation. We'll help you understand the next step for your skin or hair concern.</p>
          <Link href="/book-now" className={styles.lightButton}>Request an appointment <ArrowUpRight size={17} /></Link>
        </div>
        <div className={styles.ctaSide}><span>SHINGARE</span><small>SKIN & COSMETICS CLINIC</small><span className={styles.ctaMark}>S.</span></div>
      </section>

      <div className={styles.faqWrap}><FAQSection /></div>
    </main>
  );
}
