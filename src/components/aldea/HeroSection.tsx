import heroImage from "@/assets/aldea-hero.jpg";
import { Download } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { useCounter } from "@/hooks/use-counter";

export default function HeroSection() {
  const { ref, inView } = useInView(0.1);
  const count = useCounter({ target: 4827, duration: 2500, start: inView });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Aldea – osada w lesie"
          className="w-full h-full object-cover object-center"
        />
        {/* Dark forest gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(8,22,12,0.5) 0%, rgba(10,26,14,0.72) 40%, rgba(8,20,11,0.92) 80%, hsl(150,30%,6%) 100%)",
          }}
        />
        {/* Subtle vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(5,15,8,0.7) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div ref={ref} className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-24">
        {/* Tag line */}
        <p className={`font-sans text-xs tracking-[0.4em] uppercase text-gold/80 mb-6 ${inView ? "animate-fade-up" : "opacity-0"}`}>
          Living Regenerative Project
        </p>

        {/* Main Title */}
        <h1
          className={`font-serif text-[clamp(4rem,14vw,10rem)] font-light leading-none tracking-[0.15em] text-offwhite mb-6 ${
            inView ? "animate-fade-up-delay-1" : "opacity-0"
          }`}
          style={{ textShadow: "0 2px 40px rgba(197,179,88,0.2)" }}
        >
          ALDEA
        </h1>

        {/* Subtitle */}
        <p
          className={`font-serif text-[clamp(1.2rem,3vw,1.8rem)] font-light italic text-cream/90 mb-8 ${
            inView ? "animate-fade-up-delay-2" : "opacity-0"
          }`}
        >
          Projekt samowystarczalnej osady przyszłości.
        </p>

        {/* Description */}
        <p
          className={`font-sans text-sm md:text-base font-light leading-relaxed text-muted-foreground max-w-2xl mx-auto mb-3 ${
            inView ? "animate-fade-up-delay-3" : "opacity-0"
          }`}
        >
          Projekt Aldea to żywa dokumentacja budowy samowystarczalnej wspólnoty opartej na
          naturze, współpracy i technologii. To zaproszenie do wspólnego tworzenia przyszłości
          — krok po kroku.
        </p>
        <p
          className={`font-sans text-sm md:text-base font-semibold text-offwhite/90 mb-12 tracking-wide ${
            inView ? "animate-fade-up-delay-3" : "opacity-0"
          }`}
        >
          Nie jesteśmy sami.
        </p>

        {/* Buttons */}
        <div
          className={`flex flex-wrap items-center justify-center gap-4 mb-16 ${
            inView ? "animate-fade-up-delay-4" : "opacity-0"
          }`}
        >
          <a
            href="#pillars"
            className="glass glass-hover font-sans text-sm font-medium text-offwhite px-7 py-3.5 rounded-full border border-offwhite/20 hover:border-gold/50 transition-all duration-400 tracking-wider"
          >
            Przeglądaj dokumentację
          </a>
          <a
            href="#join"
            className="glass glass-hover font-sans text-sm font-medium text-gold px-7 py-3.5 rounded-full border border-gold/40 hover:border-gold transition-all duration-400 tracking-wider"
          >
            Dołącz do projektu
          </a>
          <a
            href="#"
            className="glass glass-hover font-sans text-sm font-medium text-offwhite/70 px-6 py-3.5 rounded-full border border-offwhite/15 hover:text-gold hover:border-gold/40 transition-all duration-400 flex items-center gap-2 tracking-wider"
          >
            <Download className="w-4 h-4" />
            Pobierz PDF
          </a>
        </div>

        {/* Visit Counter */}
        <div
          className={`flex items-center justify-center gap-3 ${
            inView ? "animate-fade-up-delay-4" : "opacity-0"
          }`}
        >
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <span
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-gold/60"
                style={{ animationDelay: `${i * 0.3}s` }}
              />
            ))}
          </div>
          <p className="font-sans text-xs text-muted-foreground tracking-widest uppercase">
            Odwiedziło projekt:{" "}
            <span className="text-gold font-medium">
              {count.toLocaleString("pl-PL")}
            </span>{" "}
            osób
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-px h-10 bg-gradient-to-b from-transparent to-gold/50" />
      </div>
    </section>
  );
}
