import { useState } from "react";
import { useInView } from "@/hooks/use-in-view";
import { Send, CheckCircle } from "lucide-react";

const helpOptions = [
  "Tworzenie dokumentacji",
  "Tłumaczenia",
  "Rozwój koncepcji",
  "Technologia i IT",
  "Wsparcie finansowe",
  "Inne",
];

export default function JoinSection() {
  const { ref, inView } = useInView(0.1);
  const [form, setForm] = useState({ name: "", email: "", help: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="join"
      className="relative py-28 px-6 overflow-hidden"
      style={{ background: "linear-gradient(to bottom, hsl(150,30%,4%), hsl(150,28%,6%))" }}
    >
      {/* Glow */}
      <div
        className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsla(120,40%,30%,0.08) 0%, transparent 70%)",
        }}
      />

      <div ref={ref} className="relative max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-start">
        {/* Left: Text */}
        <div className={inView ? "animate-fade-up" : "opacity-0"}>
          <p className="font-sans text-xs tracking-[0.4em] uppercase text-gold/70 mb-4">
            Otwarte zaproszenie
          </p>
          <h2 className="font-serif text-[clamp(2.2rem,5vw,3.5rem)] font-light text-offwhite mb-6 leading-tight">
            Dołącz do projektu
          </h2>
          <div className="w-12 h-px bg-gold/50 mb-8" />
          <p className="font-sans text-sm md:text-base text-muted-foreground leading-relaxed mb-8">
            Aldea jest projektem otwartym. Możesz współtworzyć dokumentację, tłumaczyć treści,
            rozwijać koncepcję, wspierać rozwój technologii.
          </p>

          {/* Features list */}
          <ul className="space-y-3">
            {[
              "Otwarta dokumentacja projektowa",
              "Transparentne zarządzanie zasobami",
              "Społeczność z całego świata",
              "Regularne aktualizacje z terenu",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                <span className="font-sans text-sm text-offwhite/70">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Form */}
        <div
          className={`glass rounded-2xl p-8 border border-offwhite/8 ${
            inView ? "animate-fade-up-delay-2" : "opacity-0"
          }`}
        >
          {submitted ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center gap-4">
              <CheckCircle className="w-12 h-12 text-gold" strokeWidth={1.5} />
              <h3 className="font-serif text-2xl text-offwhite">Dziękujemy!</h3>
              <p className="font-sans text-sm text-muted-foreground">
                Skontaktujemy się z Tobą wkrótce.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="font-sans text-xs text-gold/70 tracking-widest uppercase block mb-2">
                  Imię
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Twoje imię..."
                  className="w-full bg-offwhite/5 border border-offwhite/10 rounded-lg px-4 py-3 font-sans text-sm text-offwhite placeholder:text-muted-foreground focus:outline-none focus:border-gold/50 focus:bg-gold/5 transition-all duration-300"
                />
              </div>
              <div>
                <label className="font-sans text-xs text-gold/70 tracking-widest uppercase block mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="twoj@email.com"
                  className="w-full bg-offwhite/5 border border-offwhite/10 rounded-lg px-4 py-3 font-sans text-sm text-offwhite placeholder:text-muted-foreground focus:outline-none focus:border-gold/50 focus:bg-gold/5 transition-all duration-300"
                />
              </div>
              <div>
                <label className="font-sans text-xs text-gold/70 tracking-widest uppercase block mb-2">
                  W czym chcesz pomóc?
                </label>
                <select
                  required
                  value={form.help}
                  onChange={(e) => setForm({ ...form, help: e.target.value })}
                  className="w-full bg-offwhite/5 border border-offwhite/10 rounded-lg px-4 py-3 font-sans text-sm text-offwhite focus:outline-none focus:border-gold/50 focus:bg-gold/5 transition-all duration-300 cursor-pointer"
                  style={{ colorScheme: "dark" }}
                >
                  <option value="" className="bg-background">
                    Wybierz obszar...
                  </option>
                  {helpOptions.map((opt) => (
                    <option key={opt} value={opt} className="bg-background">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="w-full glass font-sans text-sm font-medium text-gold border border-gold/40 py-4 rounded-lg hover:bg-gold/10 hover:border-gold transition-all duration-300 flex items-center justify-center gap-2 tracking-wider mt-2"
              >
                <Send className="w-4 h-4" />
                Wyślij zgłoszenie
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
