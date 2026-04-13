"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AnimateOnScroll from "@/components/AnimateOnScroll";

export default function OverOnsPage() {
  return (
    <>
      {/* Hero */}
      <div className="relative pt-28 md:pt-52 pb-20 px-6 overflow-hidden" style={{ backgroundColor: "#001337" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 80% at 20% 50%, rgba(255,255,255,0.06) 0%, transparent 70%)" }} />
        <div className="relative max-w-7xl mx-auto">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="text-xs tracking-widest uppercase mb-3" style={{ color: "#ffffff", fontFamily: "var(--font-inter)" }}>
            Het verhaal
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-bold text-white" style={{ fontFamily: "var(--font-playfair)" }}>
            Over JG Mobility
          </motion.h1>
        </div>
      </div>

      {/* Verhaal sectie */}
      <section className="py-24 px-6" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
          <AnimateOnScroll direction="left">
            <div className="relative">
              <div
                className="rounded-none overflow-hidden aspect-[3/4] flex items-center justify-center"
                style={{ backgroundColor: "#001337" }}
              >
                <div className="text-center relative z-10">
                  <div className="text-8xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#ffffff", opacity: 0.15 }}>JG</div>
                  <p className="text-white/30 text-xs tracking-widest uppercase mt-4" style={{ fontFamily: "var(--font-inter)" }}>Jimi Gaillard</p>
                  <p className="text-white/20 text-xs mt-1" style={{ fontFamily: "var(--font-inter)" }}>Oprichter</p>
                </div>
                <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 70%, rgba(255,255,255,0.1) 0%, transparent 60%)" }} />
              </div>
              {/* Decoratief element */}
              <div
                className="absolute -bottom-4 -right-4 w-32 h-32 rounded-none -z-10"
                style={{ backgroundColor: "#ffffff", opacity: 0.15 }}
              />
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll direction="right">
            <div>
              <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "rgba(0,19,55,0.45)", fontFamily: "var(--font-inter)" }}>
                Jimi Gaillard — Oprichter & Eigenaar
              </p>
              <h2 className="text-4xl font-bold mb-8" style={{ fontFamily: "var(--font-playfair)", color: "#001337" }}>
                Passie voor auto&apos;s,<br />geboren uit ervaring
              </h2>

              <div className="flex flex-col gap-5 text-sm leading-loose text-gray-500" style={{ fontFamily: "var(--font-inter)" }}>
                <p>
                  Zolang ik me kan herinneren, draait bij mij alles om auto&apos;s. Als kind stond ik al met mijn neus tegen het raam van showrooms gedrukt en als tiener ging elke verdiende euro in een potje voor mijn eerste eigen wagen. Die fascinatie is nooit verdwenen; hij is door de jaren heen alleen maar groter geworden.
                </p>
                <p>
                  De afgelopen drie jaar heb ik van die passie mijn werk gemaakt. Ik dook de autobranche in en leerde de kneepjes van het vak bij verschillende dealers. Het was een leerzame tijd, maar ik ontdekte ook al snel waar mijn hart écht ligt: mensen eerlijk vooruithelpen. Ik merkte dat klanten geen behoefte hebben aan gladde verkooppraatjes of standaard scripts, maar aan oprecht advies van iemand die net zo enthousiast is over auto&apos;s als zijzelf.
                </p>
                <p>
                  Daarom doe ik het nu anders. Vanuit Barendrecht help ik je met JG Mobility bij de aan- of verkoop van je auto. Zonder die dure showroom of onnodige poespas, maar mét alle tijd en persoonlijke aandacht voor jou. Gewoon, van liefhebber tot liefhebber.
                </p>
              </div>

              <blockquote
                className="my-8 pl-5 italic text-base"
                style={{
                  fontFamily: "var(--font-playfair)",
                  color: "#001337",
                  borderLeft: "3px solid #001337",
                }}
              >
                &ldquo;Mijn mooiste resultaat? De klik tussen jou en je nieuwe auto.&rdquo;
              </blockquote>

              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 text-sm font-semibold"
                style={{ color: "#001337", fontFamily: "var(--font-inter)" }}
              >
                Neem contact op
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Waarden */}
      <section className="py-24 px-6" style={{ backgroundColor: "#f5f5f5" }}>
        <div className="max-w-7xl mx-auto">
          <AnimateOnScroll>
            <div className="text-center mb-16">
              <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "rgba(0,19,55,0.45)", fontFamily: "var(--font-inter)" }}>Waar we voor staan</p>
              <h2 className="text-4xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#001337" }}>Onze kernwaarden</h2>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { number: "01", title: "Transparantie", desc: "Geen verborgen kosten, geen mooipraterij. Je weet altijd precies waar je aan toe bent — voor, tijdens en na de deal." },
              { number: "02", title: "Persoonlijk", desc: "Je hebt altijd direct contact met Jimi. Geen callcenter, geen tussenpersonen. Gewoon een mens die voor je klaarstaat." },
              { number: "03", title: "Kwaliteit", desc: "Elk voertuig wordt zorgvuldig geselecteerd en gecontroleerd. Alleen wat we zelf zouden rijden, bieden we aan." },
            ].map((waarde, i) => (
              <AnimateOnScroll key={waarde.title} delay={i * 0.15}>
                <div
                  className="p-5 md:p-8 rounded-none h-full"
                  style={{ backgroundColor: "#ffffff", border: "1px solid rgba(0,19,55,0.07)" }}
                >
                  <div className="text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)", color: "rgba(0,19,55,0.15)" }}>
                    {waarde.number}
                  </div>
                  <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "var(--font-playfair)", color: "#001337" }}>
                    {waarde.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-500" style={{ fontFamily: "var(--font-inter)" }}>
                    {waarde.desc}
                  </p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center" style={{ backgroundColor: "#f5f5f5" }}>
        <AnimateOnScroll>
          <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)", color: "#001337" }}>
            Klaar om samen te werken?
          </h2>
          <p className="text-gray-500 text-sm mb-8 max-w-sm mx-auto" style={{ fontFamily: "var(--font-inter)" }}>
            Of je nu een auto zoekt of wil verkopen — neem vrijblijvend contact op.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-none text-sm font-semibold transition-all hover:scale-105"
            style={{ backgroundColor: "#001337", color: "#ffffff", fontFamily: "var(--font-inter)" }}
          >
            Contact opnemen <ArrowRight size={14} />
          </Link>
        </AnimateOnScroll>
      </section>
    </>
  );
}
