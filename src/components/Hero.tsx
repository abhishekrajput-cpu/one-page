import React from 'react';
import { ShieldCheck, Truck, Award, CheckCircle2, ArrowRight, PhoneCall } from 'lucide-react';
import { BUSINESS_INFO } from '../data/products';
import { ImageWithFallback } from './ImageWithFallback';

interface HeroProps {
  onBrowseProducts: () => void;
  onRequestQuote: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBrowseProducts, onRequestQuote }) => {
  const trustItems = [
    {
      icon: CheckCircle2,
      value: `${BUSINESS_INFO.installationsCount} Installations`,
      detail: 'Homes, factories & commercial sites'
    },
    {
      icon: Award,
      value: 'ISO 9001:2015 Certified',
      detail: 'MNRE & BIS approved hardware'
    },
    {
      icon: Truck,
      value: 'Dehradun & Saharanpur',
      detail: 'Fast insured local delivery & dispatch'
    },
    {
      icon: ShieldCheck,
      value: '25-Year Warranty',
      detail: 'Linear power output guarantee'
    }
  ];

  return (
    <section
      id="home"
      className="relative bg-gradient-to-br from-[#071426] via-[#0B1F3A] to-[#122C50] text-white overflow-hidden"
    >
      {/* Subtle sunrise radial glow */}
      <div
        aria-hidden="true"
        className="absolute -top-24 right-0 w-[520px] h-[520px] rounded-full bg-[#F5A524]/10 blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 sm:pt-16 sm:pb-16 lg:pt-20 lg:pb-20 relative z-10">
        {/* 2-Column Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Copy Column */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm font-medium text-[#F5A524]">
              <span>Verified B2B Solar Supplier</span>
              <span aria-hidden="true" className="text-slate-500">·</span>
              <span className="text-slate-300">{BUSINESS_INFO.location}</span>
              {BUSINESS_INFO.gstNo && (
                <>
                  <span aria-hidden="true" className="text-slate-500">·</span>
                  <span className="text-slate-300 font-mono text-xs">GST: {BUSINESS_INFO.gstNo}</span>
                </>
              )}
            </div>

            <h1 className="font-display text-3xl sm:text-5xl lg:text-[3.35rem] font-extrabold tracking-tight leading-[1.08] text-white text-balance">
              {BUSINESS_INFO.tagline}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Factory-direct Tier-1 Mono PERC &amp; N-Type Bifacial panels, smart string and hybrid inverters, LiFePO4 battery banks, and turnkey rooftop solar kits backed by {BUSINESS_INFO.yearsInBusiness} years of field engineering.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <button
                type="button"
                onClick={onBrowseProducts}
                className="bg-[#F5A524] hover:bg-[#e59412] text-[#0B1F3A] font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-black/20 transition-all duration-150 hover:-translate-y-0.5 flex items-center gap-2 text-sm sm:text-base whitespace-nowrap"
              >
                Browse Products
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={onRequestQuote}
                className="bg-white/10 hover:bg-white/15 text-white border border-white/20 font-semibold px-6 py-3.5 rounded-xl transition-all duration-150 hover:-translate-y-0.5 text-sm sm:text-base flex items-center gap-2 whitespace-nowrap"
              >
                <PhoneCall className="w-4 h-4 text-[#F5A524]" aria-hidden="true" />
                Request a Quote
              </button>
            </div>

            {/* Quiet B2B highlights */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-xs sm:text-sm text-slate-300">
              <span>PM-Surya Ghar Subsidy Assistance</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Bulk Dealer &amp; EPC Pricing</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>GST Input Credit Invoices</span>
            </div>
          </div>

          {/* Right Media Column */}
          <div className="lg:col-span-5 flex">
            <div className="relative w-full min-h-[280px] sm:min-h-[360px] lg:h-full rounded-2xl overflow-hidden border border-white/15 shadow-2xl">
              <ImageWithFallback
                src="/src/assets/images/solar_hero_banner_1795440001167.jpg"
                alt="Commercial rooftop photovoltaic solar panel installation at sunrise"
                fallbackLabel="Shri Surya Solar Commercial Installation"
                className="w-full h-full object-cover"
              />
              {/* Measured scrim for contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#071426]/90 via-[#071426]/25 to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 grid grid-cols-2 gap-4 bg-[#071426]/85 backdrop-blur-md p-4 rounded-xl border border-white/15">
                <div>
                  <span className="font-mono tabular-nums text-[#F5A524] font-bold text-xl sm:text-2xl block">
                    {BUSINESS_INFO.yearsInBusiness} Yrs
                  </span>
                  <span className="text-xs text-slate-300">Industry Experience</span>
                </div>
                <div className="border-l border-white/15 pl-4">
                  <span className="font-mono tabular-nums text-[#F5A524] font-bold text-xl sm:text-2xl block">
                    500+ MW
                  </span>
                  <span className="text-xs text-slate-300">Cumulative Supply</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Trust Strip */}
        <div className="mt-12 lg:mt-16 pt-8 border-t border-white/10 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.value}
                className="flex items-start gap-3.5 p-4 rounded-xl bg-white/[0.04] border border-white/10"
              >
                <div className="p-2 rounded-lg bg-[#F5A524]/15 text-[#F5A524] shrink-0">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="font-display font-bold text-white text-sm sm:text-base leading-snug tabular-nums">
                    {item.value}
                  </p>
                  <p className="text-xs text-slate-300 mt-0.5 leading-snug">{item.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
