'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { MapPin, Phone, Clock, CreditCard } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('Footer');
  const h = useTranslations('HomePage');

  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-24 pb-12 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          
          {/* Brand Info */}
          <div className="space-y-8">
            <h3 className="text-3xl font-black uppercase tracking-tighter text-[#0A142F] italic">Maslohi Cars</h3>
            <p className="text-slate-600 font-light leading-relaxed text-lg">
              {t('brandDescription')}
            </p>
            <div className="flex gap-4">
              <CreditCard className="text-[#0A142F]/20" size={24} />
              <div className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-widest font-bold text-slate-500">{h('paymentConditions')}</span>
                <span className="text-sm font-semibold text-[#0A142F]">Cash • TPE • Virement</span>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-8">
            <h4 className="text-xl font-bold text-[#0A142F] uppercase tracking-widest flex items-center gap-3">
              <MapPin size={20} className="text-[#0A142F]" />
              {t('addressTitle')}
            </h4>
            <div className="text-slate-600 space-y-2 font-light text-lg">
              <p>{t('addressLine1')}</p>
              <p>{t('addressLine2')}</p>
              <p>{t('addressCity')}</p>
              <div className="pt-4">
                <span className="bg-[#0A142F]/5 px-4 py-2 rounded-lg border border-[#0A142F]/10 text-sm font-bold text-[#0A142F] tracking-widest">
                  {t('googlePlusCode')}
                </span>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-8">
            <h4 className="text-xl font-bold text-[#0A142F] uppercase tracking-widest flex items-center gap-3">
              <Phone size={20} className="text-[#0A142F]" />
              {h('contact')}
            </h4>
            <div className="space-y-4">
              <a href="tel:+212663366028" className="block text-3xl font-black text-[#0A142F] hover:text-slate-600 transition-colors">
                +212 663 366 028
              </a>
              <p className="text-slate-500 font-light italic">{t('assistance24h')}</p>
            </div>
          </div>

          {/* Hours */}
          <div className="space-y-8">
            <h4 className="text-xl font-bold text-[#0A142F] uppercase tracking-widest flex items-center gap-3">
              <Clock size={20} className="text-[#0A142F]" />
              {h('openingHours')}
            </h4>
            <div className="space-y-4">
              <p className="text-slate-600 font-light text-lg">{t('openingHours')}</p>
              <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs font-semibold uppercase tracking-widest text-[#0A142F] text-center">
                {t('airportDelivery')}
              </div>
            </div>
          </div>

        </div>

        <div className="pt-12 border-t border-slate-200 text-center flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-sm font-light">
            &copy; {new Date().getFullYear()} Maslohi Cars. {t('rights')}
          </p>
          <div className="flex gap-8 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            <Image src="/images/visa.png" alt="Visa" width={40} height={25} className="h-4 w-auto object-contain" onError={(e) => (e.currentTarget.style.display = 'none')} />
            <Image src="/images/mastercard.png" alt="Mastercard" width={40} height={25} className="h-4 w-auto object-contain" onError={(e) => (e.currentTarget.style.display = 'none')} />
          </div>
        </div>
      </div>
    </footer>
  );
}
