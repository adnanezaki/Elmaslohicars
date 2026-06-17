'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import LanguageSwitcher from './LanguageSwitcher';
import { Link } from '@/i18n/routing';
import { Menu, X, Car } from 'lucide-react';

const NAV_LINKS = [
  { href: '/',        label: 'Accueil',      scroll: false },
  { href: '#fleet',   label: 'Notre Flotte', scroll: true  },
  { href: '#contact', label: 'Contact',      scroll: true  },
];

export default function Header() {
  const [logoError, setLogoError] = useState(false);
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on scroll
  useEffect(() => { if (scrolled) setMenuOpen(false); }, [scrolled]);

  const navBase = `font-bold text-sm uppercase tracking-widest transition-all duration-300 relative group`;
  const navActive = scrolled
    ? `text-[#0A142F] hover:text-[#C8922A]`
    : `text-white/80 hover:text-white`;
  const underline = `after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#C8922A] after:transition-all after:duration-300 group-hover:after:w-full`;

  return (
    <>
      <nav
        aria-label="Navigation principale"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3 bg-white/95 backdrop-blur-xl shadow-sm border-b border-slate-100'
            : 'py-7 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex items-center justify-between gap-8">

          {/* ── Logo ── */}
          <Link href="/" className="relative h-10 w-36 md:h-12 md:w-44 flex-shrink-0 transition-opacity hover:opacity-80">
            {!logoError ? (
              <Image
                src="/logo.png"
                alt="Maslohi Cars"
                fill
                className="object-contain object-left"
                priority
                onError={() => setLogoError(true)}
              />
            ) : (
              <span className={`text-xl font-black italic uppercase tracking-tighter flex items-center gap-2 transition-colors ${scrolled ? 'text-[#0A142F]' : 'text-white'}`}>
                <Car size={20} className="text-[#C8922A]" />
                Maslohi <span className="text-[#C8922A]">Cars</span>
              </span>
            )}
          </Link>

          {/* ── Desktop Nav ── */}
          <div className="hidden md:flex items-center gap-8 flex-1 justify-center">
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className={`${navBase} ${navActive} ${underline}`}
              >
                {label}
              </a>
            ))}
          </div>

          {/* ── Right side: Language + Mobile Menu ── */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher scrolled={scrolled} />

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(v => !v)}
              className={`md:hidden p-2 rounded-xl transition-colors ${
                scrolled ? 'text-[#0A142F] hover:bg-slate-100' : 'text-white hover:bg-white/10'
              }`}
              aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* ── Mobile Menu Panel ── */}
        {menuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/97 backdrop-blur-xl border-b border-slate-100 shadow-xl py-6 px-6">
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-3.5 rounded-xl font-bold text-sm uppercase tracking-widest text-[#0A142F] hover:bg-[#C8922A]/5 hover:text-[#C8922A] transition-all duration-200 block"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Spacer for fixed nav — only visible on light sections */}
      <div className="h-0" aria-hidden="true" />
    </>
  );
}