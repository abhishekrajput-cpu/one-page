import React, { useState } from 'react';
import { BUSINESS_INFO, TESTIMONIALS } from '../data/products';
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Quote,
  Award,
  ShieldCheck,
  CheckCircle2,
  Building2
} from 'lucide-react';

const CERTIFICATIONS = [
  {
    code: 'ISO 9001:2015',
    title: 'Quality Management',
    detail: 'Audited procurement & EPC quality systems'
  },
  {
    code: 'MNRE',
    title: 'Approved Channel Partner',
    detail: 'Eligible for PM-Surya Ghar rooftop subsidy'
  },
  {
    code: 'BIS IS-14286',
    title: 'Bureau of Indian Standards',
    detail: 'Compliant PV modules & safety BOS'
  },
  {
    code: 'IEC 61215 / 61730',
    title: 'International PV Safety',
    detail: 'Salt-mist, PID & cyclonic wind certified'
  }
];

const PARTNER_BRANDS = [
  'Waaree Tier-1',
  'Adani Solar',
  'Vikram Solar',
  'Growatt',
  'Sungrow',
  'Deye Hybrid'
];

export const AboutAndTestimonials: React.FC = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[activeTestimonial];

  return (
    <section id="about" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">
        {/* About Company Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-6 space-y-5">
            <p className="text-xs font-semibold text-[#D98A0C]">About {BUSINESS_INFO.name}</p>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight leading-tight text-balance">
              Dependable Solar Supply &amp; Engineering Backed by {BUSINESS_INFO.yearsInBusiness} Years of Field Trust
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Operating from <span className="font-semibold text-slate-900">{BUSINESS_INFO.location}</span>, {BUSINESS_INFO.name} supplies verified Tier-1 photovoltaic modules, smart inverters, lithium &amp; tubular batteries, and galvanized mounting hardware to homeowners, solar EPC installers, commercial complexes, and factories across Dehradun and Saharanpur.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Every shipment is backed by genuine GST invoicing, batch EL flash-test reports, and engineering support from sizing to grid synchronization.
            </p>

            {/* Quantitative Proof Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-3">
              <div className="p-4 bg-white rounded-xl border border-slate-200">
                <span className="font-mono tabular-nums text-xl sm:text-2xl font-extrabold text-[#0B1F3A] block">
                  {BUSINESS_INFO.installationsCount}
                </span>
                <span className="text-xs text-slate-500 mt-0.5 block">Projects Delivered</span>
              </div>
              <div className="p-4 bg-white rounded-xl border border-slate-200">
                <span className="font-mono tabular-nums text-xl sm:text-2xl font-extrabold text-[#0B1F3A] block">
                  500+ MW
                </span>
                <span className="text-xs text-slate-500 mt-0.5 block">Hardware Supplied</span>
              </div>
              <div className="p-4 bg-white rounded-xl border border-slate-200">
                <span className="font-mono tabular-nums text-xl sm:text-2xl font-extrabold text-[#0B1F3A] block">
                  {BUSINESS_INFO.yearsInBusiness} Yrs
                </span>
                <span className="text-xs text-slate-500 mt-0.5 block">In Business</span>
              </div>
            </div>
          </div>

          {/* Certifications & Authorized Brands Block */}
          <div
            id="certifications"
            className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6"
          >
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <p className="text-xs font-semibold text-[#D98A0C]">Quality &amp; Compliance</p>
                <h3 className="font-display text-xl font-bold text-[#0B1F3A] mt-0.5">
                  Certifications &amp; Authorized Supply Marks
                </h3>
              </div>
              <Award className="w-7 h-7 text-[#F5A524] shrink-0" aria-hidden="true" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {CERTIFICATIONS.map((cert) => (
                <div
                  key={cert.code}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#0B1F3A] text-[#F5A524] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <span className="font-mono text-xs font-bold text-[#0B1F3A] block">
                      {cert.code}
                    </span>
                    <span className="text-xs font-semibold text-slate-800 block mt-0.5">
                      {cert.title}
                    </span>
                    <span className="text-xs text-slate-500 block mt-0.5 leading-snug">
                      {cert.detail}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Partner Brand Logo Strip */}
            <div className="pt-2 border-t border-slate-100">
              <p className="text-xs font-semibold text-slate-500 mb-3 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-[#D98A0C]" aria-hidden="true" />
                Authorized Tier-1 Brand Supply Portfolio
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {PARTNER_BRANDS.map((brand) => (
                  <div
                    key={brand}
                    className="py-2.5 px-3 rounded-lg bg-slate-50 border border-slate-200 text-center font-display font-bold text-xs sm:text-sm text-[#0B1F3A] flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" aria-hidden="true" />
                    <span className="truncate">{brand}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Customer Testimonials Carousel */}
        <div className="bg-[#0B1F3A] text-white rounded-2xl p-6 sm:p-10 lg:p-12 shadow-xl relative overflow-hidden">
          <div className="absolute -right-8 -bottom-8 text-white/[0.04] pointer-events-none" aria-hidden="true">
            <Quote className="w-56 h-56" />
          </div>

          <div className="max-w-3xl mx-auto relative z-10 text-center space-y-5">
            <p className="text-xs font-semibold text-[#F5A524]">Verified Client Outcomes</p>

            <div className="flex justify-center gap-1" aria-label="5 out of 5 stars">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-[#F5A524] text-[#F5A524]"
                  aria-hidden="true"
                />
              ))}
            </div>

            <blockquote className="text-base sm:text-xl font-medium text-slate-100 leading-relaxed">
              &ldquo;{current.text}&rdquo;
            </blockquote>

            <div className="space-y-1">
              <p className="font-mono text-xs font-semibold text-emerald-400">
                {current.metric}
              </p>
              <h4 className="font-display font-bold text-white text-base sm:text-lg">
                {current.name}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                {current.role} · {current.location}
              </p>
            </div>

            {/* Carousel Controls */}
            <div className="flex items-center justify-center gap-4 pt-3">
              <button
                type="button"
                onClick={prevTestimonial}
                aria-label="Previous testimonial"
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2" role="tablist" aria-label="Testimonial slides">
                {TESTIMONIALS.map((t, i) => (
                  <button
                    key={t.name}
                    type="button"
                    role="tab"
                    aria-selected={activeTestimonial === i}
                    aria-label={`Read testimonial from ${t.name}`}
                    onClick={() => setActiveTestimonial(i)}
                    className={`h-2 rounded-full transition-all ${
                      activeTestimonial === i
                        ? 'w-7 bg-[#F5A524]'
                        : 'w-2 bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={nextTestimonial}
                aria-label="Next testimonial"
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
