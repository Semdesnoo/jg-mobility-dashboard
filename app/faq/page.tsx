"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import Link from "next/link";
import AnimateOnScroll from "@/components/AnimateOnScroll";

const faqItems = [
  {
    question: "Wat is auto consignatie?",
    answer:
      "Bij consignatie verkoopt JG Mobility jouw auto in jouw opdracht. Wij verzorgen de advertenties, bezichtigingen, onderhandelingen en alle administratie. Jij rijdt gewoon door in je auto totdat hij verkocht is — en pas bij een succesvolle verkoop betaal je een vergoeding.",
  },
  {
    question: "Hoe werkt consignatie bij JG Mobility?",
    answer:
      "Het begint met een gratis taxatie. We bepalen samen een eerlijke vraagprijs. Daarna maken wij professionele foto's, plaatsen we de auto op de grootste autoplatformen en begeleiden we alle geïnteresseerden. Zodra er een koper is, regelen wij de overdracht en administratie compleet voor je.",
  },
  {
    question: "Wat zijn de kosten voor consignatie?",
    answer:
      "We werken met een transparante commissiestructuur. Je betaalt alleen als je auto daadwerkelijk verkocht is — geen voorschot, geen advertentiekosten. De exacte voorwaarden bespreken we persoonlijk, zodat je precies weet waar je aan toe bent.",
  },
  {
    question: "Hoe snel wordt mijn auto verkocht?",
    answer:
      "Dat hangt af van het merk, de vraagprijs en de marktvraag. Premium occasions vinden gemiddeld binnen 2 tot 6 weken een nieuwe eigenaar. We adviseren altijd een realistische marktconforme vraagprijs voor het snelste resultaat.",
  },
  {
    question: "Hoe wordt mijn auto getaxeerd bij JG Mobility?",
    answer:
      "We kijken naar de actuele marktwaarde via handelsplatformen, de staat van de auto, het onderhoud, de kilometerstand en eventuele bijzonderheden. We combineren dit met onze marktkennis voor een eerlijk en realistisch advies — altijd gratis en vrijblijvend.",
  },
  {
    question: "Welke auto's koopt JG Mobility in?",
    answer:
      "We zijn gespecialiseerd in premium occasions. We kopen in principe alle merken in, maar de nadruk ligt op goed onderhouden auto's in het midden- en premiumsegment. Twijfel je? Neem gewoon contact op voor een vrijblijvende taxatie.",
  },
  {
    question: "Kan ik mijn auto ook direct verkopen zonder consignatie?",
    answer:
      "Ja! Als je snel van je auto af wilt, kopen we hem ook direct in. We maken dezelfde dag nog een eerlijk bod op basis van de actuele marktwaarde. Snel, transparant en betrouwbaar — dezelfde dag uitbetaald is daarbij de norm.",
  },
  {
    question: "Is financiering mogelijk bij JG Mobility?",
    answer:
      "Ja, we werken samen met financieringspartners voor een passende lening of lease-oplossing. Of je nu een zakelijke of particuliere koper bent — we vinden een constructie die bij jouw budget past.",
  },
  {
    question: "Waar is JG Mobility gevestigd?",
    answer:
      "Ons bedrijf is gevestigd aan de Arnhemseweg 10a in Barendrecht (2994 LA), Zuid-Holland. We zijn goed bereikbaar vanuit Rotterdam, Ridderkerk, Dordrecht en de rest van de regio.",
  },
  {
    question: "Wat zijn jullie openingstijden?",
    answer:
      "We zijn zeven dagen per week bereikbaar van 10:00 tot 21:00. Voor een bezoek of taxatie plannen we altijd een afspraak in — zo krijg je de aandacht die je verdient.",
  },
  {
    question: "Hoe neem ik contact op met JG Mobility?",
    answer:
      "Bel of WhatsApp ons op +31 6 21331374, stuur een e-mail naar info@jgmobility.nl of vul het contactformulier in op onze website. We reageren altijd binnen één werkdag.",
  },
  {
    question: "Rijden jullie ook buiten Barendrecht voor taxaties?",
    answer:
      "Absoluut. We bedienen klanten door heel Zuid-Holland en ver daarbuiten. We rijden graag naar je toe voor een taxatie in Rotterdam, Ridderkerk, Dordrecht, Spijkenisse, Capelle aan den IJssel en omgeving.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <div className="relative pt-28 md:pt-52 pb-20 px-6 overflow-hidden" style={{ backgroundColor: "#001337" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 80% at 20% 50%, rgba(255,255,255,0.06) 0%, transparent 70%)" }} />
        <div className="relative max-w-7xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs tracking-widest uppercase mb-3"
            style={{ color: "#ffffff", fontFamily: "var(--font-inter)" }}
          >
            Hulp & informatie
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-bold text-white"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Veelgestelde vragen
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 text-sm max-w-xl leading-relaxed"
            style={{ color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-inter)" }}
          >
            Alles wat je wilt weten over consignatie, inkoop, taxatie en financiering bij JG Mobility.
          </motion.p>
        </div>
      </div>

      {/* FAQ sectie */}
      <section className="py-24 px-6" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col">
            {faqItems.map((item, i) => (
              <AnimateOnScroll key={i} delay={i < 4 ? i * 0.07 : 0}>
                <div style={{ borderBottom: "1px solid rgba(0,19,55,0.08)" }}>
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    className="w-full flex items-center justify-between gap-4 py-6 text-left transition-colors hover:opacity-70"
                  >
                    <span
                      className="text-base font-semibold"
                      style={{ fontFamily: "var(--font-playfair)", color: "#001337" }}
                    >
                      {item.question}
                    </span>
                    <ChevronDown
                      size={18}
                      style={{ color: "#001337", flexShrink: 0 }}
                      className={`transition-transform duration-300 ${open === i ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {open === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: "hidden" }}
                      >
                        <p
                          className="pb-6 text-sm leading-loose"
                          style={{ color: "rgba(0,19,55,0.6)", fontFamily: "var(--font-inter)" }}
                        >
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center" style={{ backgroundColor: "#f5f5f5" }}>
        <AnimateOnScroll>
          <h2
            className="text-3xl font-bold mb-4"
            style={{ fontFamily: "var(--font-playfair)", color: "#001337" }}
          >
            Staat jouw vraag er niet bij?
          </h2>
          <p
            className="text-sm mb-8 max-w-sm mx-auto"
            style={{ color: "rgba(0,19,55,0.5)", fontFamily: "var(--font-inter)" }}
          >
            Neem vrijblijvend contact op. We helpen je graag persoonlijk verder.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold transition-all hover:scale-105"
            style={{ backgroundColor: "#001337", color: "#ffffff", fontFamily: "var(--font-inter)" }}
          >
            Contact opnemen <ArrowRight size={14} />
          </Link>
        </AnimateOnScroll>
      </section>
    </>
  );
}
