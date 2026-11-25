import React, { useState } from 'react';
import { FAQ_LIST } from '../data/products';
import { ChevronDown } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-semibold text-[#D98A0C] mb-1">Frequently Asked Questions</p>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight text-balance">
            Subsidy, Net Metering, Warranty &amp; Maintenance
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3">
            Clear answers to the most common questions from homeowners and B2B procurement teams.
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_LIST.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const panelId = `faq-panel-${idx}`;
            const buttonId = `faq-trigger-${idx}`;

            return (
              <div
                key={faq.q}
                className={`border rounded-2xl transition-colors overflow-hidden ${
                  isOpen
                    ? 'border-[#F5A524] bg-amber-50/30'
                    : 'border-slate-200 bg-slate-50/60 hover:border-slate-300'
                }`}
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4"
                  >
                    <span className="font-display font-bold text-base sm:text-lg text-[#0B1F3A] leading-snug">
                      {faq.q}
                    </span>
                    <span
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen
                          ? 'rotate-180 bg-[#0B1F3A] text-[#F5A524]'
                          : 'bg-white border border-slate-200 text-slate-700'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" aria-hidden="true" />
                    </span>
                  </button>
                </h3>

                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="px-5 sm:px-6 pb-6 pt-3 text-sm sm:text-[15px] text-slate-600 leading-relaxed border-t border-slate-200/70"
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
