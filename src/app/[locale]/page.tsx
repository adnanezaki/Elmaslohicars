import { useTranslations } from 'next-intl';
import { fleetCars } from '@/data/cars';
import CarCard from '@/components/cars/CarCard';
import ContactSection from '@/components/home/ContactSection';

export default function Home() {
  const t = useTranslations('HomePage');

  return (
    <main className="min-h-screen bg-[#f8f9fc] selection:bg-[#C8922A] selection:text-white">

      {/* ═══════════════════════════════════════════
          HERO SECTION — Cinematic Video Background
      ═══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">

        {/* ── Video Background ── */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="hero-video"
            poster="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2670"
          >
            {/* Free-to-use car footage from Pexels */}
            <source
              src="https://videos.pexels.com/video-files/3209828/3209828-uhd_2560_1440_25fps.mp4"
              type="video/mp4"
            />
          </video>

          {/* Deep multi-layer gradient for legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A142F]/95 via-[#0A142F]/70 to-[#0A142F]/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A142F] via-transparent to-[#0A142F]/30" />
          {/* Gold accent vignette at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#C8922A]/10 to-transparent" />
        </div>

        {/* ── Hero Content ── */}
        <div className="max-w-7xl mx-auto w-full relative z-20 px-6 md:px-12 lg:px-24 pt-36 pb-24">
          <div className="max-w-3xl">

            {/* Live badge */}
            <div className="inline-flex items-center gap-3 mb-8 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C8922A] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C8922A]"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/90">
                {t('badge')}
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-[0.88] uppercase tracking-tighter text-white">
              {t('heroTitle')} <br />
              <span className="text-shimmer">
                {t('heroLocation')}
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-xl md:text-2xl text-white/70 font-light mb-12 leading-relaxed max-w-xl">
              {t('heroSubtitle')}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-5">
              <a
                href="#fleet"
                className="group relative px-10 py-5 bg-[#C8922A] text-white rounded-full font-black uppercase tracking-widest hover:bg-[#E8A830] transition-all duration-300 transform hover:-translate-y-1 shadow-2xl shadow-[#C8922A]/30 overflow-hidden"
              >
                <span className="relative z-10">{t('ourFleet')}</span>
                <div className="absolute inset-0 bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </a>
              <a
                href="#contact"
                className="px-10 py-5 bg-white/10 border border-white/30 text-white rounded-full font-black uppercase tracking-widest hover:bg-white/20 transition-all duration-300 backdrop-blur-md"
              >
                {t('contact')}
              </a>
            </div>
          </div>
        </div>

        {/* ── Scroll indicator ── */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-50">
          <div className="w-5 h-8 rounded-full border-2 border-white flex justify-center pt-1.5">
            <div className="w-1 h-2 rounded-full bg-white animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          STATS STRIP
      ═══════════════════════════════════════════ */}
      <section className="bg-[#0A142F] py-8 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-3 gap-6 divide-x divide-white/10">
          {[
            { number: '500+', label: 'Clients satisfaits' },
            { number: '3', label: 'Véhicules premium' },
            { number: '24/7', label: 'Assistance' },
          ].map(({ number, label }) => (
            <div key={label} className="text-center px-4">
              <div className="text-3xl font-black text-[#C8922A] mb-1">{number}</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-white/40">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FLEET SECTION
      ═══════════════════════════════════════════ */}
      <section id="fleet" className="py-32 px-6 md:px-12 lg:px-24 bg-[#f8f9fc]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div>
              <div className="w-12 h-1 bg-[#C8922A] mb-6 rounded-full"></div>
              <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-[#0A142F]">
                {t('ourFleet')}
              </h2>
            </div>
            <p className="text-slate-500 max-w-md font-light text-lg leading-relaxed">
              {t('fleetSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fleetCars.map((car, i) => (
              <CarCard key={car.id} car={car} priority={i === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <ContactSection />

      {/* ═══════════════════════════════════════════
          MARQUEE STRIP
      ═══════════════════════════════════════════ */}
      <section className="py-10 bg-[#0A142F] flex overflow-hidden whitespace-nowrap border-t border-[#C8922A]/20">
        <div className="flex animate-marquee gap-16 items-center">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex gap-16 items-center">
              <span className="text-white text-3xl font-black uppercase tracking-tighter italic">Maslohi Cars</span>
              <span className="text-[#C8922A] text-3xl font-black">◆</span>
              <span className="text-white text-3xl font-black uppercase tracking-tighter italic">{t('premiumQuality')}</span>
              <span className="text-[#C8922A] text-3xl font-black">◆</span>
              <span className="text-white text-3xl font-black uppercase tracking-tighter italic">{t('service247')}</span>
              <span className="text-[#C8922A] text-3xl font-black">◆</span>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
