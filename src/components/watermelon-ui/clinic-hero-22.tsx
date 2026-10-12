"use client";

// Adapted from Watermelon UI's hero-22 editorial block:
// https://ui.watermelon.sh/block/hero-22
// Reworked for Shingare Skin & Cosmetics Clinic and the existing Next.js app.
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, CheckCircle2, Sparkles } from "lucide-react";
import styles from "./clinic-hero-22.module.css";

export default function ClinicHero22() {
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.hero} id="top" aria-labelledby="clinic-hero-title">
      <div className={styles.paperGlow} aria-hidden="true" />
      <div className={styles.heroGrid}>
        <motion.div
          className={styles.copy}
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            Dermatology · Trichology · Clinical Cosmetology
          </div>
          <h1 id="clinic-hero-title">
            Skin health,
            <br />
            <em>beautifully</em> considered.
          </h1>
          <p className={styles.description}>
            Thoughtful, doctor-led care for your skin and hair — grounded in clinical
            experience, clear guidance and a plan made around you.
          </p>
          <div className={styles.actions}>
            <Link href="/book-now" className={styles.primaryAction}>
              Request an appointment <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
            <Link href="#treatments" className={styles.secondaryAction}>
              Explore treatments <ArrowDownRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className={styles.trustNotes}>
            <span><CheckCircle2 size={15} /> Personalised consultations</span>
            <span><CheckCircle2 size={15} /> Skin and hair care</span>
          </div>
        </motion.div>

        <motion.div
          className={styles.visual}
          initial={reduceMotion ? false : { opacity: 0, scale: 0.97, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.imageFrame}>
            <Image
              src="/hero-shingare-2k.jpg"
              alt="A calm, welcoming skin-care clinic atmosphere"
              fill
              priority
              sizes="(max-width: 800px) 100vw, 52vw"
              className={styles.heroImage}
            />
            <div className={styles.imageShade} />
            <div className={styles.imageCaption}>
              <span className={styles.captionIcon}><Sparkles size={16} /></span>
              <span>
                <strong>Care that feels considered</strong>
                <small>From your first consultation onward</small>
              </span>
            </div>
          </div>
          <div className={styles.floatingNote}>
            <span className={styles.noteMark}>S.</span>
            <span><strong>Shingare Clinic</strong><small>Peth Vadgaon · Kolhapur</small></span>
          </div>
          <div className={styles.orbit} aria-hidden="true">SKIN · HAIR · WELLNESS</div>
        </motion.div>
      </div>
      <div className={styles.heroFoot}>
        <span>01 / A more thoughtful approach to skin health</span>
        <a href="#treatments">Scroll to explore <ArrowDownRight size={15} /></a>
      </div>
    </section>
  );
}
