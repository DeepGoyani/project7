import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#work" },
  { label: "Team", href: "#team" },
  { label: "Blog", href: "#blog" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 z-50 flex w-full items-center justify-between px-6 py-6 md:px-12 mix-blend-difference">
        <a href="#home" className="text-lg font-bold uppercase tracking-widest text-foreground hoverable">
          AGENCY
        </a>
        {/* Desktop links */}
        <div className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hoverable text-xs font-medium uppercase tracking-wider text-foreground transition-opacity hover:opacity-60"
            >
              {link.label}
            </a>
          ))}
        </div>
        {/* Mobile menu button */}
        <button
          className="hoverable lg:hidden text-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-[90] flex flex-col items-center justify-center bg-background transition-all duration-500 lg:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center gap-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="hoverable text-4xl font-black uppercase tracking-tight text-foreground transition-opacity hover:opacity-60"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
