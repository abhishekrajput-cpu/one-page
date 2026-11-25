import React from 'react';
import { MessageCircle } from 'lucide-react';
import { BUSINESS_INFO, buildWhatsAppUrl } from '../data/products';

export const FloatingWhatsApp: React.FC = () => {
  const whatsappHref = buildWhatsAppUrl(
    `Hello ${BUSINESS_INFO.name}, I found your solar catalog online and would like to enquire about solar panels and pricing.`
  );

  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Shri Surya Solar on WhatsApp"
      className="fixed bottom-5 right-5 z-40 bg-emerald-600 hover:bg-emerald-700 text-white h-12 sm:h-13 px-4 rounded-full shadow-lg shadow-emerald-950/25 flex items-center gap-2 transition-all duration-200 hover:-translate-y-0.5"
    >
      <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
      <span className="text-xs sm:text-sm font-bold whitespace-nowrap hidden sm:inline">
        WhatsApp Us
      </span>
    </a>
  );
};
