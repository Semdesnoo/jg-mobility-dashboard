"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import AppointmentScheduler from "@/components/AppointmentScheduler";

const inputStyle = {
  width: "100%",
  backgroundColor: "rgba(0,19,55,0.03)",
  border: "1px solid rgba(0,19,55,0.12)",
  borderRadius: "6px",
  padding: "13px 16px",
  color: "#001337",
  fontSize: "13px",
  fontFamily: "var(--font-inter)",
  outline: "none",
};

const labelStyle = {
  display: "block",
  fontSize: "10px",
  letterSpacing: "0.12em",
  textTransform: "uppercase" as const,
  color: "rgba(0,19,55,0.5)",
  marginBottom: "7px",
  fontFamily: "var(--font-inter)",
};

export default function ContactClient() {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "contact",
        naam: (form.elements.namedItem("naam") as HTMLInputElement).value,
        email: (form.elements.namedItem("email") as HTMLInputElement).value,
        telefoon: (form.elements.namedItem("telefoon") as HTMLInputElement).value,
        bericht: (form.elements.namedItem("bericht") as HTMLTextAreaElement).value,
      }),
    });
    setLoading(false);
    setSuccess(true);
  };

  return (
    <>
      {/* Hero */}
      <div className="relative pt-28 md:pt-52 pb-16 px-6 overflow-hidden" style={{ backgroundColor: "#001337" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 80% at 80% 50%, rgba(255,255,255,0.03) 0%, transparent 70%)" }} />
        <div className="relative max-w-7xl mx-auto">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="text-xs tracking-widest uppercase mb-3" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-inter)" }}>
            Neem contact op
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-bold text-white" style={{ fontFamily: "var(--font-playfair)" }}>
            Contact
          </motion.h1>
        </div>
      </div>

      {/* Appointment Scheduler */}
      <section className="py-20 px-6" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "rgba(0,19,55,0.45)", fontFamily: "var(--font-inter)" }}>
              Kom langs
            </p>
            <h2 className="text-4xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#001337" }}>
              Plan een afspraak
            </h2>
            <p className="text-sm text-gray-500 mt-3 max-w-lg leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
              Kies een datum en tijdstip dat u uitkomt. Vul uw e-mailadres in en wij bevestigen de afspraak zo snel mogelijk.
            </p>
          </div>
          <AppointmentScheduler />
        </div>
      </section>

      {/* Ticker */}
      <div className="overflow-hidden py-4" style={{ backgroundColor: "#001337" }}>
        <style>{`
          @keyframes ticker {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .ticker-track {
            display: flex;
            width: max-content;
            animation: ticker 28s linear infinite;
          }
        `}</style>
        <div className="ticker-track">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center gap-0">
              {[
                "Kom gerust langs",
                "Persoonlijk advies van Jimi",
                "Geen verborgen kosten",
                "Volledig ontzorgd van A tot Z",
                "Eerlijke taxatie — altijd",
                "Premium voertuigen, zorgvuldig geselecteerd",
                "Barendrecht, Zuid-Holland",
                "Direct contact, geen tussenpersoon",
              ].map((tekst) => (
                <span key={tekst} className="flex items-center gap-6 px-6">
                  <span
                    className="text-xs font-semibold tracking-widest uppercase whitespace-nowrap"
                    style={{ color: "rgba(255,255,255,0.75)", fontFamily: "var(--font-inter)" }}
                  >
                    {tekst}
                  </span>
                  <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "6px" }}>◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <section className="py-16 px-6" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">

          {/* Contactinfo */}
          <div>
            <h2 className="text-xl font-bold mb-8" style={{ fontFamily: "var(--font-playfair)", color: "#001337" }}>
              Bereikbaarheid
            </h2>
            <ul className="flex flex-col gap-6 mb-12">
              <li className="flex items-start gap-4">
                <div className="w-9 h-9 rounded flex items-center justify-center flex-shrink-0" style={{ border: "1px solid rgba(0,19,55,0.15)" }}>
                  <MapPin size={14} color="#001337" />
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "#001337", fontFamily: "var(--font-inter)" }}>Barendrecht</p>
                  <p className="text-xs mt-0.5 text-gray-400" style={{ fontFamily: "var(--font-inter)" }}>Zuid-Holland</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-9 h-9 rounded flex items-center justify-center flex-shrink-0" style={{ border: "1px solid rgba(0,19,55,0.15)" }}>
                  <Mail size={14} color="#001337" />
                </div>
                <div>
                  <a href="mailto:info@jgmobility.nl" className="text-sm font-semibold hover:opacity-70 transition-opacity" style={{ color: "#001337", fontFamily: "var(--font-inter)" }}>
                    info@jgmobility.nl
                  </a>
                  <p className="text-xs mt-0.5 text-gray-400" style={{ fontFamily: "var(--font-inter)" }}>E-mail</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-9 h-9 rounded flex items-center justify-center flex-shrink-0" style={{ border: "1px solid rgba(0,19,55,0.15)" }}>
                  <Phone size={14} color="#001337" />
                </div>
                <div>
                  <a href="tel:+31621331374" className="text-sm font-semibold hover:opacity-70 transition-opacity" style={{ color: "#001337", fontFamily: "var(--font-inter)" }}>
                    +31 6 21331374
                  </a>
                  <p className="text-xs mt-0.5 text-gray-400" style={{ fontFamily: "var(--font-inter)" }}>Telefoonnummer</p>
                </div>
              </li>
            </ul>

            {/* Consignatie CTA */}
            <div className="p-5 rounded-none" style={{ border: "1px solid rgba(0,19,55,0.1)", backgroundColor: "rgba(0,19,55,0.03)" }}>
              <p className="text-sm font-semibold mb-2" style={{ color: "#001337", fontFamily: "var(--font-playfair)" }}>
                Auto verkopen?
              </p>
              <p className="text-xs leading-relaxed mb-4 text-gray-500" style={{ fontFamily: "var(--font-inter)" }}>
                Bied je auto aan via onze consignatiepagina.
              </p>
              <Link
                href="/consignatie"
                className="group inline-flex items-center gap-2 text-xs font-semibold hover:opacity-70 transition-opacity"
                style={{ color: "#001337", fontFamily: "var(--font-inter)" }}
              >
                Naar consignatie
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Formulier */}
          <div className="md:col-span-2">
            <div className="h-0.5 mb-10" style={{ backgroundColor: "rgba(0,19,55,0.08)" }} />

            {success ? (
              <div className="flex flex-col items-center justify-center py-20 gap-6">
                {/* Check animatie */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center justify-center rounded-full"
                  style={{ width: 120, height: 120, backgroundColor: "#001337" }}
                >
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.4, type: "spring", stiffness: 260 }}
                  >
                    <CheckCircle size={56} color="#ffffff" strokeWidth={1.5} />
                  </motion.div>
                </motion.div>

                {/* Tekst */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="text-center"
                >
                  <p className="text-xl font-bold mb-2" style={{ color: "#001337", fontFamily: "var(--font-playfair)" }}>
                    Bericht ontvangen!
                  </p>
                  <p className="text-sm text-gray-500 max-w-xs mx-auto leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                    Uw bericht is succesvol bij ons binnengekomen. We nemen zo snel mogelijk contact met u op.
                  </p>
                </motion.div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label style={labelStyle}>Naam *</label>
                    <input name="naam" required style={inputStyle} placeholder="Jouw naam" />
                  </div>
                  <div>
                    <label style={labelStyle}>E-mailadres *</label>
                    <input name="email" type="email" required style={inputStyle} placeholder="jouw@email.nl" />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Telefoonnummer</label>
                  <input name="telefoon" type="tel" style={inputStyle} placeholder="+31 6 ..." />
                </div>
                <div>
                  <label style={labelStyle}>Bericht *</label>
                  <textarea
                    name="bericht"
                    required
                    rows={6}
                    style={{ ...inputStyle, resize: "vertical" }}
                    placeholder="Hoe kan ik je helpen?"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 px-8 py-3.5 rounded-none text-sm font-semibold tracking-wide transition-all hover:opacity-90"
                    style={{
                      backgroundColor: "#001337",
                      color: "#ffffff",
                      fontFamily: "var(--font-inter)",
                      opacity: loading ? 0.7 : 1,
                    }}
                  >
                    <Send size={14} />
                    {loading ? "Versturen..." : "Verstuur bericht"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
