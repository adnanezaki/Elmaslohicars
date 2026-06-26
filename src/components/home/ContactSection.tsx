'use client';


import { useTranslations } from 'next-intl';

import { MapPin, Phone, Clock, Mail, MessageSquare, ExternalLink } from 'lucide-react';

import { GOOGLE_MAPS_EMBED_URL, CONTACT_PHONE, WHATSAPP_NUMBER } from '@/config/contact';


// 👇 Reel Instagram à afficher (ID = ce qui vient après /reel/ dans l'URL)

const INSTAGRAM_REEL_ID = 'DXkJUDvtbJe';

const INSTAGRAM_USERNAME = 'maslohi.cars'; // 👈 sans le @

// SVG component for Instagram since brand icons are removed from lucide-react v1.0+
const Instagram = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function ContactSection() {

  const t = useTranslations('Footer');

  const h = useTranslations('HomePage');


  const handleWhatsApp = () => {

    const url = `https://wa.me/${WHATSAPP_NUMBER}`;

    window.open(url, '_blank', 'noopener,noreferrer');

  };


  return (

    <>

      {/* ================= CONTACT SECTION ================= */}

      <section id="contact" className="py-32 px-6 md:px-12 lg:px-24 bg-white">

        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col lg:flex-row gap-16 items-start">



            {/* Info Side */}

            <div className="lg:w-1/2 space-y-12">

              <div>

                <div className="w-12 h-1.5 bg-[#0A142F] mb-6 rounded-full"></div>

                <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-[#0A142F] mb-6">

                  {h('contactAgency')}

                </h2>

                <p className="text-slate-600 text-lg font-light max-w-lg leading-relaxed">

                  {t('brandDescription')}

                </p>

              </div>


              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Address */}

                <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-[#0A142F]/10 transition-all group">

                  <MapPin className="text-[#0A142F] mb-6 group-hover:scale-110 transition-transform" size={32} />

                  <h3 className="text-xl font-bold text-[#0A142F] mb-4 uppercase tracking-widest">{t('addressTitle')}</h3>

                  <div className="text-slate-500 space-y-1 font-light">

                    <p>{t('addressLine1')}</p>

                    <p>{t('addressLine2')}</p>

                    <p>{t('addressCity')}</p>

                    <div className="mt-4 inline-block px-3 py-1 rounded-md bg-[#0A142F]/5 text-[10px] font-bold tracking-widest text-[#0A142F]">

                      {t('googlePlusCode')}

                    </div>

                  </div>

                </div>


                {/* Hours */}

                <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-[#0A142F]/10 transition-all group">

                  <Clock className="text-[#0A142F] mb-6 group-hover:scale-110 transition-transform" size={32} />

                  <h3 className="text-xl font-bold text-[#0A142F] mb-4 uppercase tracking-widest">{h('openingHours')}</h3>

                  <div className="text-slate-500 font-light italic">

                    <p>{t('openingHours')}</p>

                    <p className="mt-2 text-xs uppercase tracking-widest text-slate-400 font-bold">{t('airportDelivery')}</p>

                  </div>

                </div>

              </div>


              {/* Direct Contact */}

              <div className="flex flex-col sm:flex-row gap-6">

                <a

                  href={`tel:${CONTACT_PHONE}`}

                  className="flex-1 flex items-center justify-center gap-4 bg-[#0A142F] text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-[#111d3c] transition-all active:scale-[0.98] shadow-xl shadow-[#0A142F]/10"

                >

                  <Phone size={24} />

                  {h('contact')}

                </a>

                <button

                  onClick={handleWhatsApp}

                  className="flex-1 flex items-center justify-center gap-4 bg-[#25D366]/5 border border-[#25D366]/20 text-[#25D366] py-6 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-[#25D366]/10 transition-all active:scale-[0.98]"

                >

                  <MessageSquare size={24} />

                  WhatsApp

                </button>

              </div>

            </div>


            {/* Map Side */}

            <div className="lg:w-1/2 w-full h-[600px] rounded-[2rem] overflow-hidden border border-slate-100 shadow-2xl relative group">

              <iframe

                src={GOOGLE_MAPS_EMBED_URL}

                width="100%"

                height="100%"

                style={{ border: 0 }}

                allowFullScreen

                loading="lazy"

                referrerPolicy="no-referrer-when-downgrade"

                title="Maslohi Cars Location"

                className="opacity-90 group-hover:opacity-100 transition-all duration-700"

              ></iframe>

              <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-black/5 rounded-[2rem]"></div>

            </div>


          </div>

        </div>

      </section>


      {/* ================= INSTAGRAM REEL SECTION ================= */}

      <section id="instagram" className="py-32 px-6 md:px-12 lg:px-24 bg-slate-50">

        <div className="max-w-7xl mx-auto">

          {/* Header */}

          <div className="flex flex-col items-center text-center mb-16">

            <div className="flex items-center gap-3 mb-6">

              <span className="w-12 h-1.5 bg-[#0A142F] rounded-full"></span>

              <Instagram className="text-[#0A142F]" size={20} />

              <span className="w-12 h-1.5 bg-[#0A142F] rounded-full"></span>

            </div>


            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-[#0A142F] mb-6">

              {h('instagramTitle')}

            </h2>


            <p className="text-slate-600 text-lg font-light max-w-2xl leading-relaxed">

              {h('instagramSubtitle')}

            </p>

          </div>


          {/* Reel Card */}

          <div className="flex justify-center">

            <div className="relative w-full max-w-md">

              {/* Halo glow */}

              <div className="absolute -inset-4 bg-gradient-to-tr from-[#0A142F]/10 via-pink-500/10 to-orange-400/10 rounded-[3rem] blur-2xl -z-10" />


              <div className="relative aspect-[9/16] rounded-[2rem] overflow-hidden border border-slate-200 shadow-2xl bg-white">

                <iframe

                  src={`https://www.instagram.com/reel/${INSTAGRAM_REEL_ID}/embed/`}

                  width="100%"

                  height="100%"

                  style={{ border: 0 }}

                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"

                  allowFullScreen

                  loading="lazy"

                  title={`Instagram reel by @${INSTAGRAM_USERNAME}`}

                  className="absolute inset-0 w-full h-full"

                />


                {/* Glossy ring */}

                <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-black/5 rounded-[2rem]" />

              </div>

            </div>

          </div>


          {/* CTA */}

          <div className="flex justify-center mt-14">

            <a

              href={`https://www.instagram.com/${INSTAGRAM_USERNAME}/`}

              target="_blank"

              rel="noopener noreferrer"

              className="inline-flex items-center gap-3 bg-[#0A142F] text-white px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-[#111d3c] transition-all active:scale-[0.98] shadow-xl shadow-[#0A142F]/10"

            >

              <Instagram size={22} />

              {h('followInstagram')}

              <ExternalLink size={18} />

            </a>

          </div>

        </div>

      </section>

    </>

  );

}