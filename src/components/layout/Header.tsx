'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import LanguageSwitcher from './LanguageSwitcher';
import { Link } from '@/i18n/routing';
import { Menu, X, Car } from 'lucide-react';
import { useLocale } from 'next-intl';

// ── Dictionnaire de traduction local ──
const TRANSLATIONS = {
  fr: { home: 'Accueil', fleet: 'Notre Flotte', contact: 'Contact' },
  ar: { home: 'الرئيسية', fleet: 'أسطولنا', contact: 'التواصل' },
  en: { home: 'Home', fleet: 'Our Fleet', contact: 'Contact' },
  es: { home: 'Inicio', fleet: 'Nuestra Flota', contact: 'Contacto' },
};

export default function Header() {
  const locale = useLocale() as keyof typeof TRANSLATIONS;
  const [logoError, setLogoError] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Fallback sur le français si la langue détectée n'est pas configurée
  const t = TRANSLATIONS[locale] || TRANSLATIONS.fr;

  // Liens de navigation dynamiques basés sur la traduction locale
  const NAV_LINKS = [
    { href: '/', label: t.home, scroll: false },
    { href: '#fleet', label: t.fleet, scroll: true },
    { href: '#contact', label: t.contact, scroll: true },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Fermer le menu mobile lors du scroll
  useEffect(() => {
    if (scrolled) setMenuOpen(false);
  }, [scrolled]);

  const navBase = `font-bold text-sm uppercase tracking-widest transition-all duration-300 relative group`;
  const navActive = `text-white/80 hover:text-white`;
  const underline = `after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#C8922A] after:transition-all after:duration-300 group-hover:after:w-full`;

  return (
    <>
      <nav
        aria-label="Navigation principale"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled
            ? 'py-2 bg-[#0A142F]/90 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] border-b border-[#C8922A]/15'
            : 'py-4 bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex items-center justify-between gap-8">

          {/* ── Logo ── */}
          <Link href="/" className="relative h-14 w-48 md:h-16 md:w-56 flex-shrink-0 transition-opacity hover:opacity-80">
            {!logoError ? (
              <Image
                src="/logo.png"
                alt="Maslohi Cars"
                fill
                sizes="(max-width: 768px) 192px, 224px"
                className="object-contain object-left"
                priority
                onError={() => setLogoError(true)}
              />
            ) : (
              <span className="text-2xl font-black italic uppercase tracking-tighter flex items-center gap-2 transition-colors text-white">
                <Car size={24} className="text-[#C8922A]" />
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
            <LanguageSwitcher scrolled={false} />

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(v => !v)}
              className="md:hidden p-2 rounded-xl transition-colors text-white hover:bg-white/10"
              aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* ── Mobile Menu Panel ── */}
        {menuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-[#0A142F]/95 backdrop-blur-xl border-b border-[#C8922A]/15 shadow-2xl py-6 px-6">
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-3.5 rounded-xl font-bold text-sm uppercase tracking-widest text-white/90 hover:bg-[#C8922A]/10 hover:text-[#C8922A] transition-all duration-200 block"
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