import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Send, Phone, Mail, MapPin, User, Building2, Package } from 'lucide-react';
import { BUSINESS_INFO, PRODUCTS } from '../data/products';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProduct?: string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  initialProduct = 'General Best Price Request'
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    productName: initialProduct,
    quantity: 1,
    requirementType: 'Home' as 'Home' | 'Commercial' | 'Industrial',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialProduct) {
      setFormData((prev) => ({ ...prev, productName: initialProduct }));
    }
  }, [initialProduct]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleResetAndClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedPhone = formData.phone.replace(/[^0-9+]/g, '');

    if (!formData.name.trim() || !formData.city.trim()) {
      setError('Please enter your full name and city.');
      return;
    }
    if (cleanedPhone.length < 10) {
      setError('Please enter a valid 10-digit phone or WhatsApp number.');
      return;
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setError('');
    setFormData({
      name: '',
      phone: '',
      email: '',
      city: '',
      productName: 'General Best Price Request',
      quantity: 1,
      requirementType: 'Home',
      message: ''
    });
    onClose();
  };

  const productOptions = [
    'General Best Price Request',
    'Custom Solar EPC / Rooftop Project',
    ...PRODUCTS.map((p) => p.name)
  ];

  const isCustomProduct = !productOptions.includes(formData.productName);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-modal-title"
      onClick={handleResetAndClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#071426]/75 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl max-w-xl w-full max-h-[92vh] overflow-y-auto border border-slate-200 relative p-6 sm:p-8"
      >
        <button
          type="button"
          onClick={handleResetAndClose}
          aria-label="Close enquiry modal"
          className="absolute top-4 right-4 p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" aria-hidden="true" />
            </div>
            <h3 className="font-display text-2xl font-extrabold text-[#0B1F3A]">
              Quote Request Confirmed
            </h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Thank you, <span className="font-bold text-slate-900">{formData.name}</span>. Our solar sales desk at {BUSINESS_INFO.name} has logged your enquiry and will call you at{' '}
              <span className="font-mono font-semibold text-slate-900">{formData.phone}</span> within 2 business hours.
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left text-xs space-y-1.5 max-w-md mx-auto">
              <div className="flex justify-between gap-2">
                <span className="text-slate-500">Product / Requirement:</span>
                <span className="font-semibold text-slate-900 text-right">{formData.productName}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-slate-500">Segment &amp; Quantity:</span>
                <span className="font-semibold text-slate-900">
                  {formData.requirementType} · Qty {formData.quantity}
                </span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-slate-500">Location:</span>
                <span className="font-semibold text-slate-900">{formData.city}</span>
              </div>
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="bg-[#0B1F3A] hover:bg-[#F5A524] hover:text-[#0B1F3A] text-white font-bold px-6 py-3 rounded-xl transition-colors"
              >
                Return to Catalog
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="pr-8">
              <p className="text-xs font-semibold text-[#D98A0C] mb-1">
                {BUSINESS_INFO.name} · B2B Quote Desk
              </p>
              <h3
                id="enquiry-modal-title"
                className="font-display text-2xl font-extrabold text-[#0B1F3A] tracking-tight"
              >
                Request Best Price &amp; Technical Quote
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Share your requirement for direct factory pricing, GST invoice, and delivery schedule.
              </p>
            </div>

            {error && (
              <div
                role="alert"
                className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium"
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="enq-name" className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" aria-hidden="true" />
                    <input
                      id="enq-name"
                      type="text"
                      required
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-[#F5A524]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="enq-phone" className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" aria-hidden="true" />
                    <input
                      id="enq-phone"
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-[#F5A524]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="enq-email" className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" aria-hidden="true" />
                    <input
                      id="enq-email"
                      type="email"
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-[#F5A524]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="enq-city" className="block text-xs font-semibold text-slate-700 mb-1">
                    City / State *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" aria-hidden="true" />
                    <input
                      id="enq-city"
                      type="text"
                      required
                      placeholder="e.g. Dehradun or Saharanpur"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-[#F5A524]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="enq-product" className="block text-xs font-semibold text-slate-700 mb-1">
                  Product / System Required
                </label>
                <div className="relative">
                  <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" aria-hidden="true" />
                  <select
                    id="enq-product"
                    value={formData.productName}
                    onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-[#F5A524]"
                  >
                    {isCustomProduct && (
                      <option value={formData.productName}>{formData.productName}</option>
                    )}
                    {productOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="enq-type" className="block text-xs font-semibold text-slate-700 mb-1">
                    Requirement Type
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" aria-hidden="true" />
                    <select
                      id="enq-type"
                      value={formData.requirementType}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          requirementType: e.target.value as 'Home' | 'Commercial' | 'Industrial'
                        })
                      }
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-[#F5A524]"
                    >
                      <option value="Home">Home</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Industrial">Industrial</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="enq-qty" className="block text-xs font-semibold text-slate-700 mb-1">
                    Quantity / Capacity
                  </label>
                  <input
                    id="enq-qty"
                    type="number"
                    min={1}
                    value={formData.quantity}
                    onChange={(e) =>
                      setFormData({ ...formData, quantity: Math.max(1, Number(e.target.value)) })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono tabular-nums text-slate-900 focus:bg-white focus:border-[#F5A524]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="enq-msg" className="block text-xs font-semibold text-slate-700 mb-1">
                  Message / Project Specifications
                </label>
                <textarea
                  id="enq-msg"
                  rows={3}
                  placeholder="Share roof area, monthly electricity bill, or bulk delivery requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-sm text-slate-900 focus:bg-white focus:border-[#F5A524]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#0B1F3A] hover:bg-[#F5A524] hover:text-[#0B1F3A] text-white font-bold py-3.5 px-6 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <Send className="w-4 h-4" aria-hidden="true" />
                Submit Enquiry
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
