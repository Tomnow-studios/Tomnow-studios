"use client";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:px-12 mix-blend-difference">
      <a
        href="#top"
        className="font-display text-lg font-semibold tracking-tight text-paper"
      >
        TomNow Studios
      </a>
      <nav className="hidden gap-8 md:flex">
        {LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="font-body text-sm text-paper/80 transition-colors hover:text-paper"
          >
            {link.label}
          </a>
        ))}
      </nav>
      <a
        href="#contact"
        className="font-body text-sm font-medium text-paper underline decoration-signal decoration-2 underline-offset-4"
      >
        Book a shoot
      </a>
    </header>
  );
}
