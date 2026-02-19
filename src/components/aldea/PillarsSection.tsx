import { Sun, Droplets, Leaf, Home, Users } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";

const pillars = [
  { icon: Sun, label: "Energia", desc: "Odnawialna energia słoneczna i wiatrowa zasilająca osadę." },
  { icon: Droplets, label: "Woda", desc: "Zamknięty obieg wody deszczowej i szarej wody." },
  { icon: Leaf, label: "Żywność", desc: "Permakultury ogrody i lokalna produkcja żywności." },
  { icon: Home, label: "Budynki", desc: "Naturalne materiały i energooszczędna architektura." },
  { icon: Users, label: "Społeczność", desc: "Transparentna i otwarta wspólnota oparta na współpracy." },
];

export default function PillarsSection() {
  const { ref, inView } = useInView(0.1);

  return (
    <section
      id="pillars"
      className="relative py-28 px-6 overflow-hidden"
      style={{ background: "linear-gradient(to bottom, hsl(150,30%,6%), hsl(150,25%,9%))" }}
    >
      {/* Texture overlay */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(45,54%,56%) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div ref={ref} className="relative max-w-6xl mx-auto">
        {/* Heading */}
        <div className={`text-center mb-16 ${inView ? "animate-fade-up" : "opacity-0"}`}>
          <p className="font-sans text-xs tracking-[0.4em] uppercase text-gold/70 mb-4">
            Fundamenty projektu
          </p>
          <h2 className="font-serif text-[clamp(2.2rem,5vw,3.8rem)] font-light text-offwhite mb-5">
            Filary samowystarczalności
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          <p className="font-sans text-sm md:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Aldea to system: energia, woda i żywność tworzą podstawę – społeczność przekształca
            je w dobro wspólne i rozwija edukację.
          </p>
        </div>

        {/* Pillar Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.label}
                className={`pillar-card glass rounded-2xl p-6 flex flex-col items-center gap-4 cursor-default ${
                  inView ? "animate-fade-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                <div className="w-14 h-14 rounded-full border border-gold/20 flex items-center justify-center mb-1"
                  style={{ background: "hsla(45,54%,56%,0.08)" }}
                >
                  <Icon
                    className="pillar-icon w-6 h-6 text-offwhite/70 transition-colors duration-300"
                    strokeWidth={1.5}
                  />
                </div>
                <span className="font-serif text-lg font-medium text-offwhite tracking-wide">
                  {pillar.label}
                </span>
                <p className="font-sans text-xs text-muted-foreground text-center leading-relaxed hidden md:block">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
