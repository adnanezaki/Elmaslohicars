'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter, routing, type Locale } from '@/i18n/routing';
import { useParams } from 'next/navigation';

const LOCALES: { code: Locale; label: string; native: string }[] = [
  { code: 'fr', label: 'Français', native: 'FR' },
  { code: 'ar', label: 'العربية', native: 'ع' },
  { code: 'en', label: 'English', native: 'EN' },
  { code: 'es', label: 'Español', native: 'ES' },
];

export default function LanguageSwitcher({ scrolled = false }: { scrolled?: boolean }) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const switchLocale = (nextLocale: Locale) => {
    router.replace(
      { pathname, params } as Parameters<typeof router.replace>[0],
      { locale: nextLocale }
    );
  };

  return (
    <nav aria-label="Sélection de langue">
      <ul className="flex items-center gap-1 list-none m-0 p-0">
        {LOCALES.map(({ code, native, label }) => (
          <li key={code}>
            <button
              onClick={() => switchLocale(code)}
              aria-label={`Changer la langue en ${label}`}
              aria-current={locale === code ? 'true' : undefined}
              className={`px-3 py-1.5 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300
                ${locale === code
                  ? 'bg-[#C8922A] text-white shadow-lg shadow-[#C8922A]/30'
                  : scrolled
                    ? 'border border-slate-200 text-slate-500 hover:border-[#C8922A]/40 hover:text-[#C8922A]'
                    : 'border border-white/20 text-white/60 hover:bg-white/10 hover:text-white'
                }`}
            >
              {native}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}