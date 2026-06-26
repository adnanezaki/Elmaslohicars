'use client';

import { useState, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { Fuel, Settings2, Users, AirVent, MessageSquareText } from 'lucide-react';
import { Car } from '@/data/cars';
import { WHATSAPP_NUMBER } from '@/config/contact';
import DateRangePicker, { toISO } from './DateRangePicker';

interface CarCardProps {
  car: Car;
  priority?: boolean;
}

export default function CarCard({ car, priority = false }: CarCardProps) {
  const t = useTranslations('CarCard');
  const locale = useLocale();

  // Pas de dates pré-remplies : l'utilisateur choisit activement.
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const hasDates = !!startDate && !!endDate;
  const diffInDays = hasDates
    ? Math.max(1, Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / 86400000))
    : 0;
  const totalPrice = hasDates ? car.pricePerDay * diffInDays : 0;

  const handleBook = useCallback(() => {
    if (!hasDates) return;
    const rawMessage = t('whatsappMessage', {
      name: car.name, start: startDate, end: endDate,
      days: diffInDays, total: totalPrice,
    });
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(rawMessage)}`;
    const a = document.createElement('a');
    a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer'; a.click();
  }, [hasDates, t, car.name, startDate, endDate, diffInDays, totalPrice]);

  return (
    <article className="group flex flex-col bg-white rounded-[2rem] overflow-visible border border-slate-100 hover:border-[#C8922A]/25 transition-all duration-500 hover:shadow-[0_30px_80px_rgba(200,146,42,0.10)] relative">

      <div className="absolute top-5 right-5 z-10">
        <div className="bg-[#C8922A] text-white px-4 py-1.5 rounded-full font-black text-xs uppercase tracking-tighter shadow-lg shadow-[#C8922A]/30">
          {car.pricePerDay} {t('MAD')} / {t('perDay')}
        </div>
      </div>

      <div className="relative h-52 w-full bg-gradient-to-br from-slate-50 via-[#f8f9fc] to-slate-100 rounded-t-[2rem] overflow-hidden">
        <Image
          src={car.imagePath}
          alt={car.name}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain p-6 group-hover:scale-105 transform-gpu transition-transform duration-700 drop-shadow-xl"
        />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-4 bg-black/5 blur-xl rounded-full" />
      </div>

      <div className="flex flex-col flex-1 p-7 gap-6">

        <h3 className="text-xl font-black uppercase tracking-tight text-[#0A142F] leading-none">
          {car.name}
        </h3>

        <div className="grid grid-cols-2 gap-3" role="list" aria-label={t('features')}>
          {[
            { icon: Settings2, label: car.transmission },
            { icon: Fuel, label: car.fuel },
            { icon: Users, label: `${car.seats} ${t('seats')}` },
            { icon: AirVent, label: t('ac') },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-slate-500" role="listitem">
              <div className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center flex-shrink-0">
                <Icon size={13} className="text-[#0A142F]/60" />
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-wider truncate">{label}</span>
            </div>
          ))}
        </div>

        <div className="pt-1">
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            onStartChange={(d) => {
              setStartDate(d);
              if (endDate) {
                const s = new Date(d);
                const e = new Date(endDate);
                if (e <= s) {
                  const next = new Date(s); next.setDate(next.getDate() + 1);
                  setEndDate(toISO(next));
                }
              }
            }}
            onEndChange={setEndDate}
            locale={locale}
            labelStart={t('startDate')}
            labelEnd={t('endDate')}
            labelSelectDepart={t('selectDepart')}
            labelSelectReturn={t('selectReturn')}
          />
        </div>

        <div className="flex items-end justify-between pt-1">
          <div>
            <div className="text-[9px] uppercase tracking-widest font-black text-[#0A142F]/30 mb-1">{t('totalEstimated')}</div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-4xl font-black text-[#0A142F] leading-none">{hasDates ? totalPrice : '—'}</span>
              <span className="text-sm font-bold text-[#C8922A]">{t('MAD')}</span>
            </div>
          </div>

          <div className="bg-[#C8922A]/8 border border-[#C8922A]/20 rounded-2xl px-5 py-3 flex flex-col items-center">
            <span className="text-2xl font-black text-[#C8922A] leading-none">{hasDates ? diffInDays : '—'}</span>
            <span className="text-[8px] uppercase tracking-widest font-black text-[#0A142F]/30 mt-0.5">
              {diffInDays > 1 ? t('days') : t('day')}
            </span>
          </div>
        </div>

        <button
          onClick={handleBook}
          disabled={!hasDates}
          aria-label={`${t('bookNow')} — ${car.name}`}
          className={`w-full py-4 rounded-xl font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all duration-300 shadow-xl group/btn ${hasDates
              ? 'bg-[#0A142F] text-white hover:bg-[#C8922A] active:scale-[0.98] shadow-[#0A142F]/10'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
            }`}
        >
          <MessageSquareText size={18} aria-hidden="true" className="group-hover/btn:translate-x-0.5 transition-transform" />
          {t('bookNow')}
        </button>
      </div>
    </article>
  );
}