import React, { useState } from 'react';
import { BUSINESS_INFO, buildWhatsAppUrl } from '../data/products';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
  Send,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    requirementType: 'Commercial' as 'Home' | 'Commercial' | 'Industrial',
    message: ''
  });
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const whatsappHref = buildWhatsAppUrl(
    `Hello ${BUSINESS_INFO.name}, I would like to discuss a solar procurement or installation requirement.`
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedPhone = formData.phone.replace(/[^0-9+]/g, '');
    if (!formData.name.trim() || cleanedPhone.length < 10 || !formData.city.trim()) {
      setError('Please enter your name, a valid 10-digit phone number, and city.');
      return;
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-semibold text-[#D98A0C] mb-1">Contact &amp; Supply Desk</p>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight text-balance">
            Talk to Our Solar Engineers &amp; B2B Sales Team
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3">
            Visit our warehouse, call directly for live stock availability, or send your project specs for a same-day quotation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Direct Contact Info + Map Placeholder */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-[#0B1F3A] text-white p-6 sm:p-8 rounded-2xl shadow-lg space-y-6">
              <div>
                <h3 className="font-display text-xl font-bold text-white">
                  {BUSINESS_INFO.name}
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm mt-1">
                  {BUSINESS_INFO.tagline}
                </p>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3.5">
                  <span className="p-2 rounded-lg bg-white/10 text-[#F5A524] shrink-0">
                    <MapPin className="w-4 h-4" aria-hidden="true" />
                  </span>
                  <div>
                    <span className="font-semibold block text-white">Office &amp; Warehouse</span>
                    <span className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      {BUSINESS_INFO.address}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <span className="p-2 rounded-lg bg-white/10 text-[#F5A524] shrink-0">
                    <Phone className="w-4 h-4" aria-hidden="true" />
                  </span>
                  <div>
                    <span className="font-semibold block text-white">Phone / WhatsApp</span>
                    <a
                      href={`tel:${BUSINESS_INFO.phone.replace(/\s+/g, '')}`}
                      className="font-mono text-[#F5A524] hover:underline text-sm"
                    >
                      {BUSINESS_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <span className="p-2 rounded-lg bg-white/10 text-[#F5A524] shrink-0">
                    <Mail className="w-4 h-4" aria-hidden="true" />
                  </span>
                  <div>
                    <span className="font-semibold block text-white">Email</span>
                    <a
                      href={`mailto:${BUSINESS_INFO.email}`}
                      className="text-[#F5A524] hover:underline text-sm break-all"
                    >
                      {BUSINESS_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <span className="p-2 rounded-lg bg-white/10 text-[#F5A524] shrink-0">
                    <Clock className="w-4 h-4" aria-hidden="true" />
                  </span>
                  <div>
                    <span className="font-semibold block text-white">Working Hours</span>
                    <span className="text-slate-300 text-xs sm:text-sm">
                      {BUSINESS_INFO.businessHours}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
                <a
                  href={`tel:${BUSINESS_INFO.phone.replace(/\s+/g, '')}`}
                  className="bg-[#F5A524] hover:bg-[#e59412] text-[#0B1F3A] font-bold py-2.5 px-4 rounded-xl text-center transition-colors text-xs sm:text-sm inline-flex items-center justify-center gap-1.5 whitespace-nowrap"
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  Click to Call
                </a>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl text-center transition-colors text-xs sm:text-sm inline-flex items-center justify-center gap-1.5 whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Embedded Map Placeholder */}
            <div className="relative flex-1 min-h-[210px] rounded-2xl overflow-hidden bg-slate-200/70 border border-slate-300 flex items-center justify-center p-5">
              {/* Stylized grid road lines */}
              <svg
                aria-hidden="true"
                className="absolute inset-0 w-full h-full opacity-45"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <pattern id="map-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                    <path
                      d="M 32 0 L 0 0 0 32"
                      fill="none"
                      stroke="#94a3b8"
                      strokeWidth="0.75"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#map-grid)" />
                <path d="M0 140 Q 160 110 420 155" stroke="#cbd5e1" strokeWidth="10" fill="none" />
                <path d="M180 0 L 210 260" stroke="#cbd5e1" strokeWidth="8" fill="none" />
              </svg>

              <div className="relative z-10 bg-white/95 backdrop-blur-sm rounded-xl shadow-md border border-slate-200 p-4 text-center max-w-xs w-full">
                <div className="w-9 h-9 rounded-full bg-[#0B1F3A] text-[#F5A524] flex items-center justify-center mx-auto mb-2">
                  <MapPin className="w-5 h-5" aria-hidden="true" />
                </div>
                <p className="font-display font-bold text-[#0B1F3A] text-sm">
                  {BUSINESS_INFO.name}
                </p>
                <p className="text-xs text-slate-600 mt-0.5">{BUSINESS_INFO.location}</p>
                <a
                  href={BUSINESS_INFO.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B1F3A] hover:text-[#D98A0C] transition-colors"
                >
                  Open Directions in Google Maps
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Enquiry Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 lg:p-10 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center">
            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
                </div>
                <h3 className="font-display text-2xl font-extrabold text-[#0B1F3A]">
                  Message Sent Successfully
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="font-semibold text-slate-900">{formData.name}</span>. Our solar desk will reach out on{' '}
                  <span className="font-mono font-semibold text-slate-900">{formData.phone}</span> shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      phone: '',
                      email: '',
                      city: '',
                      requirementType: 'Commercial',
                      message: ''
                    });
                  }}
                  className="bg-[#0B1F3A] hover:bg-[#122C50] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="font-display text-2xl font-bold text-[#0B1F3A]">
                    Send Us Your Solar Requirement
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">
                    Need bulk panel pricing, dealer partnership rates, or a turnkey rooftop quote? Fill in the form below.
                  </p>
                </div>

                {error && (
                  <div
                    role="alert"
                    className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded-xl"
                  >
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-[#F5A524]"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Phone / WhatsApp *
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-[#F5A524]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-[#F5A524]"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-city" className="block text-xs font-semibold text-slate-700 mb-1.5">
                      City / State *
                    </label>
                    <input
                      id="contact-city"
                      type="text"
                      required
                      placeholder="e.g. Dehradun or Saharanpur"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-[#F5A524]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-type" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Requirement Type
                  </label>
                  <select
                    id="contact-type"
                    value={formData.requirementType}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        requirementType: e.target.value as 'Home' | 'Commercial' | 'Industrial'
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-[#F5A524]"
                  >
                    <option value="Home">Home / Residential Rooftop</option>
                    <option value="Commercial">Commercial / Institutional</option>
                    <option value="Industrial">Industrial / Bulk B2B Supply</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Project Details / Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    placeholder="Tell us the capacity (kW), panel wattage, or quantity you need..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3.5 text-sm text-slate-900 focus:bg-white focus:border-[#F5A524]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0B1F3A] hover:bg-[#F5A524] hover:text-[#0B1F3A] text-white font-bold py-3.5 px-6 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                  Submit Enquiry to Sales Desk
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
