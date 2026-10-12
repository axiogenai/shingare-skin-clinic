export interface TreatmentItem {
  id: string;
  title: string;
  category: "skin" | "hair" | "cosmetics";
  categoryLabel: string;
  indications: string;
  description: string;
  highlights: string[];
  image: string;
  imagePosition?: string;
  downtime: string;
  sessions: string;
}

export const TREATMENTS: TreatmentItem[] = [
  // =========================================================================
  // 1. SKIN TREATMENTS (Clinical Dermatology)
  // =========================================================================
  {
    id: "acne-management",
    title: "Severe Acne & Cystic Breakouts",
    category: "skin",
    categoryLabel: "Skin Care (Clinical Dermatology)",
    indications:
      "Inflammatory papules, pustules, nodulocystic lesions, chronic recurring breakouts, post-acne scarring risk",
    description:
      "Evidence-based medical dermatological protocols combining systemic evaluation, dermoscopy, topical retinoid therapy, and medical-grade comedone extraction to permanently clear active breakouts and prevent long-term scarring.",
    highlights: [
      "Targeted Medical Antibacterial Regimens",
      "Regulates Excess Sebum & Follicular Keratinization",
      "Prevents Deep Dermal Scar Formation",
      "Custom Digital Prescription with Voice Notes",
    ],
    image: "/services/anti-acne.png",
    imagePosition: "object-center",
    downtime: "Zero Downtime",
    sessions: "Monthly OPD Follow-ups",
  },
  {
    id: "eczema-dermatitis",
    title: "Eczema & Atopic Dermatitis",
    category: "skin",
    categoryLabel: "Skin Care (Clinical Dermatology)",
    indications:
      "Dry red scaly patches, intense chronic pruritus (itching), skin barrier breakdown, recurrent weeping flare-ups",
    description:
      "Targeted barrier-repair protocols, non-steroidal topical immunomodulators, and personalized trigger avoidance regimens designed to restore the epidermal lipid barrier and achieve sustained long-term remission.",
    highlights: [
      "100% Steroid-Sparing Maintenance Protocols",
      "Calms Severe Itching & Tissue Inflammation",
      "Restores Dermal Lipid Barrier & Hydration",
      "Safe for Both Pediatric & Adult Sensitive Skin",
    ],
    image: "/services/eczema.jpg",
    imagePosition: "object-center",
    downtime: "Zero Downtime",
    sessions: "Evaluated per Flare Severity",
  },
  {
    id: "psoriasis-dermatoses",
    title: "Psoriasis & Chronic Dermatoses",
    category: "skin",
    categoryLabel: "Skin Care (Clinical Dermatology)",
    indications:
      "Plaque psoriasis, scalp scaling, silvery erythema, chronic lichen planus, autoimmune stubborn dermatoses",
    description:
      "Comprehensive clinical management of autoimmune skin conditions utilizing topical vitamin D3 analogs, descaling agents, and systemic therapies formulated to minimize toxicity and deliver prolonged clinical remission.",
    highlights: [
      "Evidence-Based Remission Protocols",
      "Controls Hyperkeratotic Scaling & Plaque Thickening",
      "Customized Scalp Descaling Regimens",
      "Supervised Personally by MD Dermatologist",
    ],
    image: "/services/psoriasis.jpg",
    imagePosition: "object-center",
    downtime: "Zero Downtime",
    sessions: "Regular Clinical Monitoring",
  },
  {
    id: "pigmentation-melasma",
    title: "Pigmentation & Melasma Treatment",
    category: "skin",
    categoryLabel: "Skin Care (Clinical Dermatology)",
    indications:
      "Epidermal & dermal melasma, post-inflammatory hyperpigmentation (PIH), sun spots, uneven patchy skin tone",
    description:
      "Multi-pathway pigment-clearing regimens that inhibit melanocyte hyperactivation, accelerate cellular turnover, and gradually restore a clear, luminous, and even skin tone safely for Indian skin types.",
    highlights: [
      "Inhibits Deep Melanin Overproduction",
      "Fades Stubborn Hormonal Melasma & Sun Spots",
      "Formulated for Indian Skin (Fitzpatrick IV-VI)",
      "Comprehensive UV & Barrier Protection Protocol",
    ],
    image: "/services/pigmentation.png",
    imagePosition: "object-center",
    downtime: "Zero Downtime",
    sessions: "3 - 5 Sessions",
  },
  {
    id: "moles-warts-removal",
    title: "Radiofrequency Mole, Wart & Tag Removal",
    category: "skin",
    categoryLabel: "Skin Care (Clinical Dermatology)",
    indications:
      "Elevated skin moles, viral warts, acrochordons (skin tags) on neck, face, and body folds",
    description:
      "Quick, hygienic, and precise radiofrequency ablation performed under local anesthesia with instantaneous coagulation, minimal tissue trauma, and clean cosmetic healing with negligible scarring.",
    highlights: [
      "Quick In-Clinic Procedure",
      "Virtually Painless with Local Numbing",
      "Minimal to No Residual Scarring",
      "Immediate Clear Skin with Clean Aesthetic Healing",
    ],
    image: "/services/moles-warts-removal.png",
    imagePosition: "object-center",
    downtime: "2 - 5 Days Healing",
    sessions: "1 - 2 Sessions",
  },

  // =========================================================================
  // 2. HAIR TREATMENTS (Trichology & Follicular Health)
  // =========================================================================
  {
    id: "hair-prp-gfc",
    title: "Autologous PRP & GFC Hair Restoration",
    category: "hair",
    categoryLabel: "Hair Care (Trichology)",
    indications:
      "Androgenetic alopecia (male/female pattern baldness), diffuse hair thinning, excessive telogen shedding, receding hairline",
    description:
      "High-concentration autologous Platelet-Rich Plasma (PRP) and Growth Factor Concentrate (GFC) injections delivering natural bioactive growth factors directly into miniaturizing follicles to halt shedding and trigger thick regrowth.",
    highlights: [
      "100% Autologous (Patient's Own Blood)",
      "Stimulates Dormant Follicles into Anagen Phase",
      "Thickens Miniaturized Hair Shafts",
      "Clinically Administered by MD Dermatologist",
    ],
    image: "/services/hair-prp.png",
    imagePosition: "object-center",
    downtime: "Zero Downtime",
    sessions: "4 - 6 Sessions (3-4 weeks apart)",
  },
  {
    id: "mesotherapy-hair",
    title: "Hair Mesotherapy & Follicle Biostimulation",
    category: "hair",
    categoryLabel: "Hair Care (Trichology)",
    indications:
      "Nutrient-depleted hair roots, excessive shedding, dull lifeless strands, early follicular miniaturization",
    description:
      "Precision micro-infusion of medical-grade peptide complexes, biotin, amino acids, and vasodilating actives directly into the dermal scalp layer to fortify hair roots and improve shaft tensile strength.",
    highlights: [
      "Direct Nutritional Delivery to Follicle Bulbs",
      "Strengthens Weak & Brittle Hair Roots",
      "Improves Scalp Micro-Circulation",
      "Quick & Comfortable In-Clinic Session",
    ],
    image: "/services/mesotherapy.png",
    imagePosition: "object-center",
    downtime: "Zero Downtime",
    sessions: "4 - 6 Sessions",
  },
  {
    id: "high-frequency-scalp",
    title: "High-Frequency Scalp & Follicle Therapy",
    category: "hair",
    categoryLabel: "Hair Care (Trichology)",
    indications:
      "Stubborn dandruff, seborrheic dermatitis, follicular congestion, sluggish scalp circulation, bacterial scalp issues",
    description:
      "Gentle high-frequency electrical current produces germicidal ozone to eliminate scalp bacteria and fungi, soothe persistent itchiness, and stimulate micro-circulation around follicular roots.",
    highlights: [
      "Germicidal Ozone Scalp Disinfection",
      "Controls Stubborn Dandruff & Scalp Itch",
      "Enhances Follicular Blood Perfusion",
      "Completely Pain-Free & Relaxing",
    ],
    image: "/services/high-frequency.png",
    imagePosition: "object-center",
    downtime: "Zero Downtime",
    sessions: "4 - 6 Sessions",
  },
  {
    id: "alopecia-care",
    title: "Alopecia Areata & Scalp Care",
    category: "hair",
    categoryLabel: "Hair Care (Trichology)",
    indications:
      "Patchy autoimmune hair loss, sudden circular bald spots, follicular inflammation, miniaturization",
    description:
      "Targeted intralesional immunomodulation and topical sensitization protocols designed to suppress localized autoimmune follicular attack and stimulate rapid follicle reactivation.",
    highlights: [
      "Targeted Follicular Immunomodulation",
      "Controls Autoimmune Miniaturization",
      "Monitored with Scalp Dermoscopy",
      "High Regrowth Clinical Success Rate",
    ],
    image: "/services/hair-care.png",
    imagePosition: "object-center",
    downtime: "Zero Downtime",
    sessions: "3 - 5 Sessions",
  },

  // =========================================================================
  // 3. COSMETIC TREATMENTS (Aesthetic Lasers, Peels & Medi-Facials)
  // =========================================================================
  {
    id: "signature-hydra-facial",
    title: "Clinical Medical Hydra Facial",
    category: "cosmetics",
    categoryLabel: "Cosmetic Treatments",
    indications:
      "Congested facial pores, stubborn blackheads, rough superficial texture, epidermal dehydration, dull pre-event skin",
    description:
      "Four-stage medical-grade hydro-dermabrasion combining pneumatic vortex extraction of blackheads, deep pore vacuum cleansing, gentle chemical exfoliation, and pressurized infusion of hyaluronic acid, peptides, and antioxidant serums.",
    highlights: [
      "Painless vacuum extraction of stubborn follicular plugs",
      "Instant cellular plumping & deep dermal hydration",
      "Noticeable reduction in dilated facial pores",
      "Zero downtime — resume daily activities immediately",
    ],
    image: "/services/medifacial.png",
    imagePosition: "object-center",
    downtime: "Zero Downtime",
    sessions: "45 Minutes",
  },
  {
    id: "carbon-laser-peel",
    title: "Hollywood Carbon Laser Glow Peel",
    category: "cosmetics",
    categoryLabel: "Cosmetic Treatments",
    indications:
      "Excessive facial sebum & oiliness, enlarged pores, superficial pigmentation, stubborn sun tanning, lifeless complexion",
    description:
      "Liquid medical nano-carbon particles penetrate deep into follicular openings, followed by specialized 1064nm Q-Switched Nd:YAG laser pulses that photomechanically vaporize the carbon, shrinking oil glands, gently exfoliating, and stimulating immediate collagen.",
    highlights: [
      "Immediate reduction in surface oiliness and shine",
      "Tightens dilated facial pores and refines micro-texture",
      "Fades stubborn environmental tanning and dullness",
      "Safe, comfortable procedure with instant red-carpet glow",
    ],
    image: "/services/clinical-dermatology.png",
    imagePosition: "object-center",
    downtime: "Zero Downtime",
    sessions: "40 Minutes",
  },
  {
    id: "acne-scar-microneedling",
    title: "Acne Scar Resurfacing & Microneedling",
    category: "cosmetics",
    categoryLabel: "Cosmetic Treatments",
    indications:
      "Atrophic boxcar, rolling & icepick acne scars, enlarged pores, skin texture irregularities, surgical scars",
    description:
      "Precision medical microneedling collagen induction therapy combined with subcision to release tethered scar bands, stimulate vigorous collagen synthesis, and dramatically smooth skin texture.",
    highlights: [
      "Visibly Reduces Depressed Acne Scars",
      "Tightens & Refines Enlarged Facial Pores",
      "Releases Fibrotic Anchored Scar Bands",
      "Deep Dermal Collagen Remodeling",
    ],
    image: "/services/microneedling.png",
    imagePosition: "object-center",
    downtime: "24 - 48 Hours Mild Erythema",
    sessions: "3 - 5 Sessions",
  },
  {
    id: "chemical-peels",
    title: "Dermatological Chemical Peels",
    category: "cosmetics",
    categoryLabel: "Cosmetic Treatments",
    indications:
      "Superficial acne marks, pigmentation, uneven skin tone, fine lines, rough skin surface texture",
    description:
      "Dermatologically formulated chemical peels (Glycolic, Salicylic, Lactic) that gently exfoliate damaged outer epidermal layers, revealing smoother, brighter, and rejuvenated skin underneath with zero prolonged recovery.",
    highlights: [
      "Removes Damaged Keratinized Outer Cells",
      "Lightens Stubborn Post-Acne Marks",
      "Smooths Skin Surface Texture",
      "Customized Peel Strengths per Skin Type",
    ],
    image: "/services/chemical-peel.png",
    imagePosition: "object-center",
    downtime: "Zero to 24 Hours",
    sessions: "3 - 5 Sessions",
  },
  {
    id: "skin-prp-facial",
    title: "Skin PRP & Collagen Induction",
    category: "cosmetics",
    categoryLabel: "Cosmetic Treatments",
    indications:
      "Loss of skin elasticity, fine expression lines, early signs of facial aging, dull fatigued skin, under-eye hollowing",
    description:
      "Harnesses your body's own concentrated autologous platelets and bio-active growth factors to trigger vigorous neocollagenesis and microvascular repair, delivering deeply restored firmness, elasticity, and youthful radiance.",
    highlights: [
      "100% autologous biocompatible treatment (own blood)",
      "Stimulates deep natural collagen and elastin synthesis",
      "Improves fine expression lines and skin suppleness",
      "Personally prepared and administered by MD Dermatologist",
    ],
    image: "/services/skin-prp.png",
    imagePosition: "object-center",
    downtime: "12 - 24 Hours Mild Erythema",
    sessions: "60 Minutes",
  },
];

export const SPECIALTY_CATEGORIES = [
  {
    id: "skin",
    name: "Skin Care",
    tagline: "Clinical Dermatology",
    desc: "Acne, Eczema, Psoriasis, Melasma, Moles & Warts",
    count: 5,
  },
  {
    id: "hair",
    name: "Hair Care",
    tagline: "Trichology & PRP",
    desc: "Autologous PRP, GFC, Mesotherapy, Alopecia",
    count: 4,
  },
  {
    id: "cosmetics",
    name: "Cosmetic Treatments",
    tagline: "Lasers & Medi-Facials",
    desc: "Medical Hydra Facial, Carbon Glow, Peels, Scar Revision",
    count: 5,
  },
] as const;
