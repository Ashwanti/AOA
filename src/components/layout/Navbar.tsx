'use client';

import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const links = [
  { href: '#work', label: 'Work' },
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'Process' },
  { href: '#about', label: 'About' },
  { href: '#testimonials', label: 'Testimonials' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`site-nav ${scrolled ? 'is-scrolled' : ''}`} aria-label="Main navigation">
      <a className="wordmark" href="#top" onClick={() => setMenuOpen(false)}>
        <span className="dot" />
        AOA
      </a>

      <div className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
        {links.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
            {link.label}
          </a>
        ))}
        <a className="nav-cta" href="#contact" onClick={() => setMenuOpen(false)}>
          Start a project <ArrowUpRight size={14} />
        </a>
      </div>

      <button
        className="menu-toggle"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X /> : <Menu />}
      </button>
    </nav>
  );
}
