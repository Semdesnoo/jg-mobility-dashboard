"use client";

import { useState, useRef } from "react";
import { Send, Upload, X, CheckCircle, Car, User, Camera, TrendingUp, Clock, Shield, Eye, Handshake, BadgeCheck, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

const voordelen = [
  { icon: <TrendingUp size={22} />, title: "Hogere verkoopprijs", desc: "Wij kennen de markt. Wij weten hoe en waar te presenteren om de beste prijs te halen." },
  { icon: <Clock size={22} />, title: "Wij ontzorgen jou", desc: "Geen foto's, geen advertenties, geen no-shows, geen gebel. Jij levert in — wij doen de rest." },
  { icon: <Shield size={22} />, title: "Volledig veilig", desc: "Geen vreemden over de vloer, geen valse betalingen. Elke overdracht veilig en professioneel." },
  { icon: <Eye size={22} />, title: "Premiumuitstraling", desc: "Professionele fotografie en plaatsing op de juiste premium kanalen voor maximaal bereik." },
  { icon: <Handshake size={22} />, title: "Persoonlijk & direct", desc: "Jimi begeleidt het volledige verkoopproces persoonlijk. Altijd direct contact, geen tussenpersonen." },
  { icon: <BadgeCheck size={22} />, title: "€0 kosten vooraf", desc: "Geen instapkosten, geen advertentiekosten. Onze vergoeding is enkel verschuldigd bij verkoop." },
  { icon: <Car size={22} />, title: "Maximaal bereik", desc: "Jouw auto wordt gepresenteerd aan ons kopers-netwerk én meerdere advertentieplatformen." },
  { icon: <CreditCard size={22} />, title: "Zorgeloos afronden", desc: "Wij regelen betaling, kentekenoverdracht en alle papieren. Jij ontvangt het geld — zonder stress." },
];

const inputStyle = {
  width: "100%",
  backgroundColor: "#f9f9fb",
  border: "1px solid rgba(0,19,55,0.12)",
  borderRadius: "8px",
  padding: "15px 18px",
  color: "#001337",
  fontSize: "15px",
  fontFamily: "var(--font-inter)",
  outline: "none",
};

const labelStyle = {
  display: "block",
  fontSize: "12px",
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
  color: "rgba(0,19,55,0.5)",
  marginBottom: "8px",
  fontFamily: "var(--font-inter)",
  fontWeight: "600",
};

export default function ConsignatiePage() {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fotos, setFotos] = useState<File[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const handleFotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFotos((prev) => [...prev, ...Array.from(e.target.files!)].slice(0, 10));
    }
  };

  const removeFoto = (index: number) => {
    setFotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData();
    formData.append("type", "consignatie");
    formData.append("naam", (form.elements.namedItem("naam") as HTMLInputElement).value);
    formData.append("email", (form.elements.namedItem("email") as HTMLInputElement).value);
    formData.append("telefoon", (form.elements.namedItem("telefoon") as HTMLInputElement).value);
    formData.append("merk", (form.elements.namedItem("merk") as HTMLInputElement).value);
    formData.append("model", (form.elements.namedItem("model") as HTMLInputElement).value);
    formData.append("bouwjaar", (form.elements.namedItem("bouwjaar") as HTMLInputElement).value);
    formData.append("km", (form.elements.namedItem("km") as HTMLInputElement).value);
    formData.append("vraagprijs", (form.elements.namedItem("vraagprijs") as HTMLInputElement).value);
    formData.append("opmerking", (form.elements.namedItem("opmerking") as HTMLTextAreaElement).value);
    // Foto's alleen meesturen als totaal < 3MB om crashes te voorkomen
    let totaal = 0;
    for (const foto of fotos) {
      if (totaal + foto.size > 3 * 1024 * 1024) break;
      totaal += foto.size;
      formData.append("fotos", foto);
    }
    const res = await fetch("/api/contact", { method: "POST", body: formData });
    setLoading(false);
    if (!res.ok) {
      alert("Er ging iets mis. Probeer opnieuw of stuur een e-mail naar info@jgmobility.nl");
      return;
    }
    setSuccess(true);
    setTimeout(() => {
      if (successRef.current) {
        const top = successRef.current.getBoundingClientRect().top + window.scrollY - 120;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 50);
  };

  return (
    <div style={{ backgroundColor: "#ffffff" }}>

      {/* ── HERO ── */}
      <div className="pt-28 md:pt-52 pb-20 px-6" style={{ backgroundColor: "#001337" }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs tracking-widest uppercase mb-4"
            style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-inter)" }}
          >
            Vrijblijvend & gratis
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            style={{ fontFamily: "var(--font-playfair)", color: "#ffffff" }}
          >
            Uw auto verkopen<br />via consignatie
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base leading-relaxed max-w-xl mx-auto"
            style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-inter)" }}
          >
            U levert uw auto in bij JG Mobility. Wij regelen alles — van fotografie tot overdracht.
            U ontvangt de beste prijs, zonder gedoe.
          </motion.p>
        </div>
      </div>

      {/* ── VOORDELEN ── */}
      <section className="py-20 px-6" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "rgba(0,19,55,0.4)", fontFamily: "var(--font-inter)" }}>
              Waarom consignatie
            </p>
            <h2 className="text-3xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#001337" }}>
              Wat u van ons krijgt
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {voordelen.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="p-4 sm:p-6 rounded-none"
                style={{ border: "1px solid rgba(0,19,55,0.08)", backgroundColor: "#fafafa" }}
              >
                <div
                  className="w-11 h-11 rounded-none flex items-center justify-center mb-4"
                  style={{ backgroundColor: "#001337", color: "#ffffff" }}
                >
                  {v.icon}
                </div>
                <h3 className="font-bold mb-2 text-sm" style={{ color: "#001337", fontFamily: "var(--font-playfair)" }}>
                  {v.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(0,19,55,0.5)", fontFamily: "var(--font-inter)" }}>
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ── WAAROM SECTIE ── */}
      <section className="py-24 px-6 overflow-hidden" style={{ backgroundColor: "#001337" }}>
        <div className="max-w-4xl mx-auto">
          {[
            {
              label: "Beste prijs",
              title: "Wij halen meer\nuit uw auto",
              desc: "Wij kennen de markt door en door. Uw voertuig wordt professioneel gepresenteerd op de juiste kanalen — zodat u altijd de hoogst mogelijke opbrengst kunt verwachten. Geen giswerk, geen compromissen.",
            },
            {
              label: "Geen gedoe",
              title: "Wij ontzorgen jou.",
              desc: "Geen advertenties schrijven, geen no-shows, geen ellenlange onderhandelingen. Laat het werk aan ons over. Van de eerste foto tot de definitieve overdracht — wij nemen het volledig uit handen.",
            },
            {
              label: "Veiligheid & zekerheid",
              title: "Betrouwbaar\nvan begin tot eind",
              desc: "Vertrouw op onze expertise en transparantie. Elke transactie verloopt veilig, met duidelijke afspraken en persoonlijk contact. U weet altijd waar u aan toe bent — want Jimi is er altijd voor u.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center py-16"
              style={{ borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.07)" : "none" }}
            >
              {/* Label + titel — wissel links/rechts */}
              <div className={i % 2 === 1 ? "md:order-2" : ""}>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-xs tracking-widest uppercase mb-4"
                  style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-inter)" }}
                >
                  {item.label}
                </motion.p>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="text-3xl md:text-5xl font-bold text-white"
                  style={{ fontFamily: "var(--font-playfair)", whiteSpace: "pre-line", lineHeight: 1.15 }}
                >
                  {item.title}
                </motion.h2>
              </div>

              {/* Beschrijving */}
              <div className={i % 2 === 1 ? "md:order-1" : ""}>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                  className="h-px mb-8"
                  style={{ background: "linear-gradient(to right, rgba(255,255,255,0.15), transparent)" }}
                />
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.45 }}
                  className="text-base leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-inter)" }}
                >
                  {item.desc}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── HOE WERKT HET ── */}
      <section className="py-16 px-6" style={{ backgroundColor: "#ffffff", borderBottom: "1px solid rgba(0,19,55,0.06)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "rgba(0,19,55,0.4)", fontFamily: "var(--font-inter)" }}>
              In 3 stappen
            </p>
            <h2 className="text-2xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#001337" }}>
              Hoe werkt het?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", icon: <Camera size={20} />, title: "Formulier invullen", desc: "Vul de gegevens van uw auto in en voeg foto's toe." },
              { step: "02", icon: <Car size={20} />, title: "Wij beoordelen", desc: "JG Mobility beoordeelt uw auto en bepaalt of het in ons aanbod past." },
              { step: "03", icon: <User size={20} />, title: "Contact bij interesse", desc: "Als we interesse hebben, nemen we binnen 24 uur contact op." },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-4">
                <div
                  className="flex-shrink-0 w-11 h-11 rounded-none flex items-center justify-center"
                  style={{ backgroundColor: "#001337", color: "#ffffff" }}
                >
                  {item.icon}
                </div>
                <div>
                  <p className="text-[10px] tracking-widest mb-1" style={{ color: "rgba(0,19,55,0.3)", fontFamily: "var(--font-inter)" }}>STAP {item.step}</p>
                  <p className="text-sm font-semibold mb-1" style={{ color: "#001337", fontFamily: "var(--font-inter)" }}>{item.title}</p>
                  <p className="text-xs leading-relaxed text-gray-400" style={{ fontFamily: "var(--font-inter)" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORMULIER ── */}
      <section className="py-20 px-6" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "rgba(0,19,55,0.4)", fontFamily: "var(--font-inter)" }}>
              Vrijblijvend aanmelden
            </p>
            <h2 className="text-3xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#001337" }}>
              Bied uw auto aan
            </h2>
            <p className="text-sm mt-3" style={{ color: "rgba(0,19,55,0.5)", fontFamily: "var(--font-inter)" }}>
              Vul het formulier in — wij nemen contact op als uw auto in ons aanbod past.
            </p>
          </div>

          {success ? (
            <div ref={successRef} className="flex flex-col items-center justify-center py-24 gap-8">
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
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.7 }}
                className="text-center"
              >
                <p className="text-3xl font-bold mb-3" style={{ color: "#001337", fontFamily: "var(--font-playfair)" }}>
                  Auto aangemeld!
                </p>
                <p className="text-sm max-w-sm mx-auto leading-relaxed text-gray-500" style={{ fontFamily: "var(--font-inter)" }}>
                  Uw aanvraag is succesvol bij ons binnengekomen. Wij beoordelen uw auto en nemen binnen 24 uur contact op als we interesse hebben.
                </p>
              </motion.div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">

              {/* Jouw gegevens */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded flex items-center justify-center" style={{ border: "1px solid rgba(0,19,55,0.15)" }}>
                    <User size={14} color="#001337" />
                  </div>
                  <h2 className="text-lg font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#001337" }}>Uw gegevens</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label style={labelStyle}>Naam *</label>
                    <input name="naam" required style={inputStyle} placeholder="Voor- en achternaam" />
                  </div>
                  <div>
                    <label style={labelStyle}>E-mailadres *</label>
                    <input name="email" type="email" required style={inputStyle} placeholder="uw@email.nl" />
                  </div>
                  <div className="md:col-span-2">
                    <label style={labelStyle}>Telefoonnummer</label>
                    <input name="telefoon" type="tel" style={inputStyle} placeholder="+31 6 ..." />
                  </div>
                </div>
              </div>

              <div className="h-px" style={{ backgroundColor: "rgba(0,19,55,0.08)" }} />

              {/* Autogegevens */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded flex items-center justify-center" style={{ border: "1px solid rgba(0,19,55,0.15)" }}>
                    <Car size={14} color="#001337" />
                  </div>
                  <h2 className="text-lg font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#001337" }}>Autogegevens</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label style={labelStyle}>Merk *</label>
                    <input name="merk" required style={inputStyle} placeholder="bijv. BMW" />
                  </div>
                  <div>
                    <label style={labelStyle}>Model *</label>
                    <input name="model" required style={inputStyle} placeholder="bijv. M3 Competition" />
                  </div>
                  <div>
                    <label style={labelStyle}>Bouwjaar *</label>
                    <input name="bouwjaar" type="number" required min="1990" max="2026" style={inputStyle} placeholder="bijv. 2021" />
                  </div>
                  <div>
                    <label style={labelStyle}>Kilometerstand *</label>
                    <input name="km" type="number" required style={inputStyle} placeholder="bijv. 45000" />
                  </div>
                  <div className="md:col-span-2">
                    <label style={labelStyle}>Gewenste vraagprijs (€)</label>
                    <input name="vraagprijs" type="number" style={inputStyle} placeholder="bijv. 65000" />
                  </div>
                  <div className="md:col-span-2">
                    <label style={labelStyle}>Opmerkingen</label>
                    <textarea
                      name="opmerking"
                      rows={4}
                      style={{ ...inputStyle, resize: "vertical" }}
                      placeholder="Extra info over de auto: onderhoud, opties, schade, reden van verkoop..."
                    />
                  </div>
                </div>
              </div>

              <div className="h-px" style={{ backgroundColor: "rgba(0,19,55,0.08)" }} />

              {/* Foto's */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded flex items-center justify-center" style={{ border: "1px solid rgba(0,19,55,0.15)" }}>
                    <Camera size={14} color="#001337" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#001337" }}>Foto&apos;s</h2>
                    <p className="text-xs mt-0.5 text-gray-400" style={{ fontFamily: "var(--font-inter)" }}>Maximaal 10 foto&apos;s — exterieur, interieur, dashboard</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="flex items-center gap-3 px-6 py-4 rounded-none w-full justify-center transition-all mb-4"
                  style={{ border: "1.5px dashed rgba(0,19,55,0.2)", color: "rgba(0,19,55,0.5)", backgroundColor: "#f9f9fb", fontFamily: "var(--font-inter)", fontSize: "14px" }}
                >
                  <Upload size={16} />
                  Foto&apos;s toevoegen
                </button>
                <input ref={fileRef} type="file" multiple accept="image/*" className="hidden" onChange={handleFotos} />

                {fotos.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {fotos.map((foto, i) => (
                      <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-none text-xs"
                        style={{ backgroundColor: "#f5f5f5", color: "#001337", fontFamily: "var(--font-inter)" }}>
                        <span className="max-w-[120px] truncate">{foto.name}</span>
                        <button type="button" onClick={() => removeFoto(i)}>
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 w-full py-4 rounded-none text-sm font-semibold tracking-wide transition-all hover:opacity-90 disabled:opacity-50"
                style={{ backgroundColor: "#001337", color: "#ffffff", fontFamily: "var(--font-inter)" }}
              >
                {loading ? "Versturen..." : (
                  <>
                    <Send size={15} />
                    Auto aanbieden
                  </>
                )}
              </button>

            </form>
          )}
        </div>
      </section>

    </div>
  );
}
