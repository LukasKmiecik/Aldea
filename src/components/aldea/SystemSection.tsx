import { Sun, Droplets, Leaf, Users, BookOpen } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";

const nodes = [
  { icon: Sun, label: "Energia", desc: "Fotowoltaika, wiatr, baterie", color: "hsl(45,70%,65%)" },
  { icon: Droplets, label: "Woda", desc: "Deszczówka, filtracja, obieg", color: "hsl(200,60%,60%)" },
  { icon: Leaf, label: "Żywność", desc: "Permakultura, kompost, zbiory", color: "hsl(120,40%,45%)" },
  { icon: Users, label: "Społeczność", desc: "Współpraca, decyzje, dziedzictwo", color: "hsl(30,60%,60%)" },
  { icon: BookOpen, label: "Edukacja", desc: "Wiedza otwarta, warsztaty, badania", color: "hsl(45,54%,56%)" },
];

export default function SystemSection() {
  const { ref, inView } = useInView(0.15);

  return (
    <section
      id="system"
      className="relative py-28 px-6 overflow-hidden"
      style={{ background: "linear-gradient(to bottom, hsl(150,25%,9%), hsl(150,28%,6%))" }}
    >
      {/* Blueprint grid background */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(hsl(45,54%,56%) 1px, transparent 1px),
            linear-gradient(90deg, hsl(45,54%,56%) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div ref={ref} className="relative max-w-2xl mx-auto">
        {/* Heading */}
        <div className={`text-center mb-16 ${inView ? "animate-fade-up" : "opacity-0"}`}>
          <p className="font-sans text-xs tracking-[0.4em] uppercase text-gold/70 mb-4">
            Architektura projektu
          </p>
          <h2 className="font-serif text-[clamp(2.2rem,5vw,3.8rem)] font-light text-offwhite mb-5">
            Aldea jako system
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          <p className="font-sans text-sm text-muted-foreground leading-relaxed">
            Każdy element wzmacnia pozostałe. To nie zbiór budynków — to żywy organizm.
          </p>
        </div>

        {/* System Diagram */}
        <div className="relative flex flex-col items-center">
          {/* Outer border box blueprint style */}
          <div
            className="relative w-full max-w-sm border border-gold/20 rounded-lg px-8 py-10"
            style={{
              boxShadow: "inset 0 0 60px hsla(45,54%,56%,0.04), 0 0 40px hsla(45,54%,56%,0.06)",
              background: "hsla(150,30%,6%,0.7)",
            }}
          >
            {/* Corner accents */}
            {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map(
              (pos, i) => (
                <span
                  key={i}
                  className={`absolute ${pos} w-4 h-4 border-gold/60 ${
                    i === 0
                      ? "border-t border-l"
                      : i === 1
                      ? "border-t border-r"
                      : i === 2
                      ? "border-b border-l"
                      : "border-b border-r"
                  }`}
                  style={{ margin: "-1px" }}
                />
              )
            )}

            {/* Nodes */}
            <div className="flex flex-col gap-0">
              {nodes.map((node, i) => {
                const Icon = node.icon;
                return (
                  <div key={node.label}>
                    <div
                      className={`flex items-center gap-4 py-4 px-3 rounded-lg transition-all duration-300 hover:bg-gold/5 ${
                        inView ? "animate-fade-up" : "opacity-0"
                      }`}
                      style={{ animationDelay: `${i * 0.15 + 0.2}s` }}
                    >
                      {/* Side dot */}
                      <div className="flex flex-col items-center">
                        <span
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ background: node.color, boxShadow: `0 0 8px ${node.color}` }}
                        />
                      </div>
                      {/* Icon */}
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: `${node.color}18`, border: `1px solid ${node.color}40` }}
                      >
                        <Icon className="w-4 h-4" style={{ color: node.color }} strokeWidth={1.5} />
                      </div>
                      {/* Label + desc */}
                      <div>
                        <p
                          className="font-serif text-base font-medium"
                          style={{ color: node.color }}
                        >
                          {node.label}
                        </p>
                        <p className="font-sans text-xs text-muted-foreground">{node.desc}</p>
                      </div>
                    </div>

                    {/* Connector line */}
                    {i < nodes.length - 1 && (
                      <div className="flex items-center pl-[18px]">
                        <div className="w-px h-6 bg-gradient-to-b from-gold/40 to-gold/10 ml-[3px]" />
                        <span className="text-gold/30 text-xs ml-2">↓</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom label */}
          <p
            className={`mt-10 font-sans text-sm text-muted-foreground text-center max-w-xs leading-relaxed ${
              inView ? "animate-fade-up-delay-4" : "opacity-0"
            }`}
          >
            Aldea to nie zbiór budynków. To żywy organizm, w którym każdy element wzmacnia
            pozostałe.
          </p>
        </div>
      </div>
    </section>
  );
}
