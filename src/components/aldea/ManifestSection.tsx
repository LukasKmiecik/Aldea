import { useInView } from "@/hooks/use-in-view";

const manifestLines = [
  "Aldea powstaje jako odpowiedź na kryzys współczesnych systemów.",
  "Tworzymy model otwartej, regeneratywnej wspólnoty.",
  "Budujemy niezależność energetyczną.",
  "Projektujemy obieg zamknięty wody.",
  "Uprawiamy żywność lokalnie.",
  "Uczymy się razem.",
  "Działamy transparentnie.",
];

export default function ManifestSection() {
  const { ref, inView } = useInView(0.1);

  return (
    <section
      id="manifest"
      className="relative py-28 px-6 overflow-hidden"
      style={{ background: "linear-gradient(to bottom, hsl(150,28%,5%), hsl(150,30%,4%))" }}
    >
      {/* Atmospheric glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsla(45,54%,56%,0.06) 0%, transparent 70%)",
        }}
      />

      <div ref={ref} className="relative max-w-3xl mx-auto">
        {/* Heading */}
        <div className={`text-center mb-16 ${inView ? "animate-fade-up" : "opacity-0"}`}>
          <p className="font-sans text-xs tracking-[0.4em] uppercase text-gold/70 mb-4">
            Nasze wartości
          </p>
          <h2 className="font-serif text-[clamp(2.2rem,5vw,3.8rem)] font-light text-offwhite mb-5">
            Manifest Aldea
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
        </div>

        {/* Manifest lines */}
        <div className="space-y-0 mb-14">
          {manifestLines.map((line, i) => (
            <div
              key={i}
              className={`flex items-start gap-5 py-5 border-b border-offwhite/5 group cursor-default ${
                inView ? "animate-fade-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${i * 0.1 + 0.2}s` }}
            >
              <span className="font-sans text-xs text-gold/40 font-light mt-1 flex-shrink-0 w-5 text-right">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="font-serif text-lg md:text-xl font-light text-offwhite/80 group-hover:text-offwhite transition-colors duration-300 leading-relaxed">
                {line}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={`text-center ${inView ? "animate-fade-up-delay-4" : "opacity-0"}`}>
          <a
            href="#"
            className="inline-block glass font-sans text-sm font-medium text-gold border border-gold/40 px-8 py-4 rounded-full hover:bg-gold/10 hover:border-gold transition-all duration-300 tracking-wider"
          >
            Czytaj pełny manifest
          </a>
        </div>
      </div>
    </section>
  );
}
