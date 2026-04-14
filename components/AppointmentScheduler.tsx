"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar, Send, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const WEEKDAYS_SHORT = ["ZO", "MA", "DI", "WO", "DO", "VR", "ZA"];
const WEEKDAYS_FULL = ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"];
const MONTHS_NL = ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"];
const MONTHS_SHORT = ["Jan", "Feb", "Mrt", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"];

function isAvailable(date: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const minDate = new Date(today);
  minDate.setDate(today.getDate() + 1);
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 60);
  const day = date.getDay();
  return date >= minDate && date <= maxDate && day !== 0;
}

function getTimeSlots(date: Date): string[] {
  const day = date.getDay();
  if (day === 0) return [];
  const slots: string[] = [];
  const endHour = day === 6 ? 17 : 20;
  for (let h = 9; h <= endHour; h++) {
    slots.push(`${String(h).padStart(2, "0")}:00`);
    if (!(h === endHour && day === 6)) {
      slots.push(`${String(h).padStart(2, "0")}:30`);
    }
  }
  return slots;
}

function getDaysInMonth(year: number, month: number): Date[] {
  const days: Date[] = [];
  const d = new Date(year, month, 1);
  while (d.getMonth() === month) {
    days.push(new Date(d));
    d.setDate(d.getDate() + 1);
  }
  return days;
}

function formatDateFull(date: Date): string {
  return `${WEEKDAYS_FULL[date.getDay()]} ${date.getDate()} ${MONTHS_NL[date.getMonth()]} ${date.getFullYear()}`;
}

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

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "10px",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "rgba(0,19,55,0.5)",
  marginBottom: "7px",
  fontFamily: "var(--font-inter)",
};

export default function AppointmentScheduler() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const days = getDaysInMonth(viewYear, viewMonth);
  const firstDayOfWeek = days[0].getDay();

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const handleSelectDate = (date: Date) => {
    if (!isAvailable(date)) return;
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const timeSlots = selectedDate ? getTimeSlots(selectedDate) : [];

  const handleSubmit = async () => {
    if (!selectedDate || !selectedTime || !email) return;
    setLoading(true);
    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "appointment",
        email,
        telefoon: phone,
        datum: formatDateFull(selectedDate),
        tijd: selectedTime,
      }),
    });
    setLoading(false);
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-6">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-20 h-20 flex items-center justify-center rounded-full"
          style={{ backgroundColor: "#001337" }}
        >
          <CheckCircle size={36} color="#ffffff" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <p className="text-xl font-bold mb-2" style={{ color: "#001337", fontFamily: "var(--font-playfair)" }}>
            Afspraak aangevraagd!
          </p>
          <p className="text-sm text-gray-500 max-w-sm mx-auto leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
            We bevestigen uw afspraak op <strong>{formatDateFull(selectedDate!)}</strong> om <strong>{selectedTime}</strong> zo snel mogelijk via e-mail.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Calendar + Time slots */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0" style={{ border: "1px solid rgba(0,19,55,0.1)" }}>

        {/* Calendar */}
        <div className="p-6" style={{ borderRight: "1px solid rgba(0,19,55,0.08)" }}>
          {/* Month navigation */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-base font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#001337" }}>
              {MONTHS_NL[viewMonth]}{" "}
              <span style={{ color: "rgba(0,19,55,0.4)", fontWeight: 400 }}>{viewYear}</span>
            </span>
            <div className="flex gap-1">
              <button
                onClick={prevMonth}
                className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 transition-colors"
                style={{ color: "#001337" }}
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={nextMonth}
                className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 transition-colors"
                style={{ color: "#001337" }}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 mb-1">
            {WEEKDAYS_SHORT.map(d => (
              <div
                key={d}
                className="text-center text-[10px] font-semibold tracking-wider py-2"
                style={{ color: "rgba(0,19,55,0.3)", fontFamily: "var(--font-inter)" }}
              >
                {d}
              </div>
            ))}
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7 gap-y-0.5">
            {Array.from({ length: firstDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {days.map((date) => {
              const avail = isAvailable(date);
              const isSelected = selectedDate?.toDateString() === date.toDateString();
              const isToday = date.toDateString() === today.toDateString();

              return (
                <div key={date.toDateString()} className="flex flex-col items-center py-0.5">
                  <button
                    onClick={() => handleSelectDate(date)}
                    disabled={!avail}
                    className="w-8 h-8 flex items-center justify-center text-xs transition-all"
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontWeight: isToday || isSelected ? 700 : avail ? 500 : 400,
                      backgroundColor: isSelected ? "#001337" : "transparent",
                      color: isSelected ? "#ffffff" : avail ? "#001337" : "rgba(0,19,55,0.2)",
                      borderRadius: isSelected ? "6px" : "4px",
                      cursor: avail ? "pointer" : "default",
                    }}
                  >
                    {date.getDate()}
                  </button>
                  {avail && (
                    <div
                      className="w-1 h-1 rounded-full"
                      style={{ backgroundColor: isSelected ? "#001337" : "rgba(0,19,55,0.2)" }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Time slots */}
        <div className="flex flex-col">
          {selectedDate ? (
            <>
              <div
                className="px-6 py-4 flex items-center justify-between"
                style={{ borderBottom: "1px solid rgba(0,19,55,0.08)" }}
              >
                <p className="text-sm font-semibold" style={{ color: "#001337", fontFamily: "var(--font-inter)" }}>
                  {WEEKDAYS_FULL[selectedDate.getDay()]},{" "}
                  <span style={{ color: "rgba(0,19,55,0.55)" }}>
                    {MONTHS_SHORT[selectedDate.getMonth()]} {selectedDate.getDate()}
                  </span>
                </p>
              </div>
              <div className="flex flex-col gap-1.5 p-4 overflow-y-auto" style={{ maxHeight: "320px" }}>
                {timeSlots.map((time) => {
                  const sel = selectedTime === time;
                  return (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className="py-2.5 text-sm font-medium transition-all"
                      style={{
                        fontFamily: "var(--font-inter)",
                        backgroundColor: sel ? "#001337" : "rgba(0,19,55,0.03)",
                        color: sel ? "#ffffff" : "#001337",
                        border: `1px solid ${sel ? "#001337" : "rgba(0,19,55,0.1)"}`,
                        borderRadius: "6px",
                      }}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center gap-3 p-10">
              <Calendar size={28} style={{ color: "rgba(0,19,55,0.15)" }} />
              <p className="text-xs text-center leading-relaxed" style={{ color: "rgba(0,19,55,0.3)", fontFamily: "var(--font-inter)" }}>
                Kies een datum<br />om tijdsloten te zien
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation + contact fields */}
      <AnimatePresence>
        {selectedDate && selectedTime && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-5"
          >
            {/* Selected summary */}
            <div
              className="flex items-center gap-4 px-5 py-4"
              style={{ backgroundColor: "rgba(0,19,55,0.03)", border: "1px solid rgba(0,19,55,0.08)" }}
            >
              <div className="w-8 h-8 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#001337", borderRadius: "4px" }}>
                <Calendar size={14} color="#ffffff" />
              </div>
              <div>
                <p className="text-[10px] tracking-widest uppercase" style={{ color: "rgba(0,19,55,0.4)", fontFamily: "var(--font-inter)" }}>
                  Geselecteerde afspraak
                </p>
                <p className="text-sm font-semibold mt-0.5" style={{ color: "#001337", fontFamily: "var(--font-inter)" }}>
                  {formatDateFull(selectedDate)} — {selectedTime}
                </p>
              </div>
            </div>

            {/* Form fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label style={labelStyle}>E-mailadres *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={inputStyle}
                  placeholder="jouw@email.nl"
                />
              </div>
              <div>
                <label style={labelStyle}>Telefoonnummer</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  style={inputStyle}
                  placeholder="+31 6 ..."
                />
              </div>
            </div>

            <div>
              <button
                onClick={handleSubmit}
                disabled={loading || !email}
                className="flex items-center gap-2 px-8 py-3.5 text-sm font-semibold tracking-wide transition-all hover:opacity-90"
                style={{
                  backgroundColor: "#001337",
                  color: "#ffffff",
                  fontFamily: "var(--font-inter)",
                  opacity: loading || !email ? 0.45 : 1,
                  cursor: loading || !email ? "not-allowed" : "pointer",
                  borderRadius: 0,
                }}
              >
                <Send size={14} />
                {loading ? "Versturen..." : "Afspraak aanvragen"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
