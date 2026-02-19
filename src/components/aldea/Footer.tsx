import aldeoLogo from "@/assets/aldea-logo.png";

const navLinks = [
  { label: "Manifest", href: "#manifest" },
  { label: "Dokumentacja", href: "#pillars" },
  { label: "System", href: "#system" },
  { label: "Dołącz", href: "#join" },
  { label: "Kontakt", href: "#footer" },
];

export default function Footer() {
  return (
    <footer
      id="footer"
      className="relative py-16 px-6 border-t border-offwhite/5"
      style={{ background: "hsl(150,32%,4%)" }}
    >
      {/* Top divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent mb-16" />

      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 mb-14">
          {/* Left: Logo + tagline */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={aldeoLogo}
                alt="Aldea Logo"
                className="w-12 h-12 rounded-full object-cover ring-1 ring-gold/30"
              />
              <div>
                <span className="font-serif text-2xl font-semibold text-offwhite tracking-widest block">
                  ALDEA
                </span>
                <span className="font-sans text-xs text-gold/60 tracking-widest uppercase">
                  Living Regenerative Project
                </span>
              </div>
            </div>
            <p className="font-sans text-xs text-muted-foreground leading-relaxed max-w-xs mt-4">
              Projekt otwartej, samowystarczalnej wspólnoty opartej na naturze, współpracy
              i technologii.
            </p>
          </div>

          {/* Right: Nav */}
          <div className="flex flex-col md:items-end">
            <nav className="flex flex-wrap gap-x-8 gap-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-sans text-sm text-muted-foreground hover:text-gold transition-colors duration-300 tracking-wider"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-offwhite/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-muted-foreground/60 tracking-wider">
            © 2026 Aldea Project. All rights reserved.
          </p>
          <p className="font-serif text-xs italic text-gold/40 tracking-wider">
            Living regenerative system.
          </p>
        </div>
      </div>
    </footer>
  );
}
