import aldeoLogo from "@/assets/aldea-logo.png";

const navLinks = [
  { label: "Manifest", href: "#manifest" },
  { label: "Dokumentacja", href: "#pillars" },
  { label: "System", href: "#system" },
  { label: "Dołącz", href: "#join" },
  { label: "Kontakt", href: "#footer" },
];

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 glass border-b border-transparent">
      <a href="#" className="flex items-center gap-3 group">
        <img
          src={aldeoLogo}
          alt="Aldea Logo"
          className="w-10 h-10 rounded-full object-cover ring-1 ring-gold/40 group-hover:ring-gold transition-all duration-300"
        />
        <span className="font-serif text-xl font-semibold text-offwhite tracking-widest hidden sm:block">
          ALDEA
        </span>
      </a>

      <ul className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="font-sans text-sm font-light text-muted-foreground hover:text-gold transition-colors duration-300 tracking-wider uppercase"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Mobile menu hint */}
      <div className="md:hidden">
        <a
          href="#join"
          className="glass font-sans text-xs text-gold border border-gold/30 px-3 py-1.5 rounded-full hover:bg-gold/10 transition-all duration-300"
        >
          Dołącz
        </a>
      </div>
    </nav>
  );
}
