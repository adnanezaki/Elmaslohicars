'use client';

import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
  const handleClick = () => {
    window.open('https://wa.me/212663366028', '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group overflow-hidden"
      aria-label="Contact us on WhatsApp"
    >
      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      <MessageCircle size={32} fill="white" className="relative" />
    </button>
  );
}
