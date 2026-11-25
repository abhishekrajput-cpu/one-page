import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import {
  X,
  Download,
  MessageCircle,
  CheckCircle2,
  Send,
  FileCheck2
} from 'lucide-react';
import { BUSINESS_INFO, buildWhatsAppUrl } from '../data/products';
import { ImageWithFallback } from './ImageWithFallback';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose
}) => {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [downloaded, setDownloaded] = useState(false);

  // Embedded quick enquiry form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    quantity: 10,
    requirementType: 'Commercial' as 'Home' | 'Commercial' | 'Industrial',
    message: ''
  });
  const [formError, setFormError] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    setActiveImageIdx(0);
    setDownloaded(false);
    setFormSubmitted(false);
    setFormError('');
    setFormData((prev) => ({
      ...prev,
      quantity: product?.category.includes('Panels') ? 10 : 1,
      message: ''
    }));
  }, [product]);

  useEffect(() => {
    if (!product) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product, onClose]);

  if (!product) return null;

  const gallery = product.gallery.length
    ? product.gallery
    : [{ url: product.image, label: product.name }];
  const currentImage = gallery[activeImageIdx] || gallery[0];

  const handleDownloadDatasheet = () => {
    const specsLines = Object.entries(product.specs)
      .map(([k, v]) => `  - ${k}: ${v}`)
      .join('\n');
    const featuresLines = product.features.map((f) => `  * ${f}`).join('\n');

    const content = [
      `${BUSINESS_INFO.name.toUpperCase()} — TECHNICAL DATASHEET`,
      `============================================================`,
      `Product:      ${product.name}`,
      `Category:     ${product.category}`,
      `Brand:        ${product.brand}`,
      `Price Guide:  ${product.priceDisplay}${product.priceDisplay !== 'Get Latest Price' ? ` / ${product.unit}` : ''}`,
      `MOQ:          ${product.moq}`,
      ``,
      `OVERVIEW`,
      `--------`,
      product.description,
      ``,
      `TECHNICAL SPECIFICATIONS`,
      `------------------------`,
      specsLines,
      ``,
      `KEY FEATURES`,
      `------------`,
      featuresLines,
      ``,
      `SUPPLIER CONTACT`,
      `----------------`,
      `Company:  ${BUSINESS_INFO.name}`,
      `Address:  ${BUSINESS_INFO.address}`,
      `Phone:    ${BUSINESS_INFO.phone}`,
      `Email:    ${BUSINESS_INFO.email}`,
      BUSINESS_INFO.gstNo ? `GSTIN:    ${BUSINESS_INFO.gstNo}` : ''
    ]
      .filter(Boolean)
      .join('\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${product.id}-datasheet.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setDownloaded(true);
  };

  const handleInlineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedPhone = formData.phone.replace(/[^0-9+]/g, '');
    if (!formData.name.trim() || cleanedPhone.length < 10 || !formData.city.trim()) {
      setFormError('Please enter your name, a valid 10-digit phone number, and city.');
      return;
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setFormError('Please enter a valid email address.');
      return;
    }
    setFormError('');
    setFormSubmitted(true);
  };

  const whatsappHref = buildWhatsAppUrl(
    `Hello ${BUSINESS_INFO.name}, I am viewing ${product.name} (${product.priceDisplay}) on your website and would like bulk pricing and technical specifications.`
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#071426]/75 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[92vh] overflow-y-auto border border-slate-200 relative"
      >
        {/* Sticky Modal Header */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-slate-200 px-5 sm:px-8 py-4 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-[#D98A0C]">{product.category}</span>
              <span aria-hidden="true">·</span>
              <span>{product.brand}</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-700 font-medium">
                {product.inStock ? 'In Stock' : 'Made to Order'}
              </span>
            </div>
            <h2
              id="product-modal-title"
              className="font-display text-lg sm:text-2xl font-extrabold text-[#0B1F3A] tracking-tight truncate"
            >
              {product.name}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close product details"
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-8 space-y-8">
          {/* Top Split: Image Gallery + Core Specs & Features */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Interactive Image Gallery */}
            <div className="lg:col-span-5 space-y-3">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                <ImageWithFallback
                  src={currentImage.url}
                  alt={`${product.name} - ${currentImage.label}`}
                  fallbackLabel={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-[#0B1F3A]/85 text-white text-xs font-medium px-2.5 py-1 rounded-md">
                  {currentImage.label}
                </div>
              </div>

              {/* Gallery Thumbnails */}
              {gallery.length > 1 && (
                <div className="grid grid-cols-3 gap-2.5">
                  {gallery.map((img, idx) => (
                    <button
                      key={`${img.label}-${idx}`}
                      type="button"
                      onClick={() => setActiveImageIdx(idx)}
                      aria-label={`View ${img.label}`}
                      aria-current={activeImageIdx === idx ? 'true' : undefined}
                      className={`relative aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all ${
                        activeImageIdx === idx
                          ? 'border-[#F5A524] ring-2 ring-[#F5A524]/30'
                          : 'border-slate-200 opacity-75 hover:opacity-100'
                      }`}
                    >
                      <ImageWithFallback
                        src={img.url}
                        alt={img.label}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Datasheet & WhatsApp Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={handleDownloadDatasheet}
                  className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-[#0B1F3A] text-xs sm:text-sm font-bold py-3 px-4 rounded-xl border border-slate-300 transition-colors"
                >
                  {downloaded ? (
                    <>
                      <FileCheck2 className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                      <span>Datasheet Saved</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 text-[#D98A0C]" aria-hidden="true" />
                      <span>Download Datasheet</span>
                    </>
                  )}
                </button>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold py-3 px-4 rounded-xl shadow-sm transition-colors"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>WhatsApp Enquiry</span>
                </a>
              </div>
            </div>

            {/* Right: Pricing, Description, Features, Full Specs Table */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-baseline justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <span className="text-xs font-medium text-slate-500 block">
                    Indicative B2B Price
                  </span>
                  <span className="font-mono tabular-nums text-2xl sm:text-3xl font-extrabold text-[#0B1F3A]">
                    {product.priceDisplay}
                  </span>
                  {product.priceDisplay !== 'Get Latest Price' && (
                    <span className="text-sm text-slate-500 ml-1.5">/ {product.unit}</span>
                  )}
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500 block">Minimum Order</span>
                  <span className="font-mono text-sm font-semibold text-slate-900">
                    {product.moq}
                  </span>
                </div>
              </div>

              <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                {product.description}
              </p>

              {/* Key Features */}
              <div>
                <h3 className="font-display text-sm font-bold text-[#0B1F3A] mb-2.5">
                  Key Product Features
                </h3>
                <ul className="space-y-2">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <CheckCircle2
                        className="w-4 h-4 text-[#D98A0C] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Full Technical Specifications Table */}
              <div>
                <h3 className="font-display text-sm font-bold text-[#0B1F3A] mb-2.5">
                  Full Technical Specifications
                </h3>
                <div className="rounded-xl border border-slate-200 overflow-hidden">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <tbody className="divide-y divide-slate-200">
                      {Object.entries(product.specs).map(([key, val], idx) => (
                        <tr key={key} className={idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                          <th
                            scope="row"
                            className="py-2.5 px-3.5 font-medium text-slate-600 w-2/5"
                          >
                            {key}
                          </th>
                          <td className="py-2.5 px-3.5 font-mono tabular-nums font-semibold text-slate-900">
                            {val}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Embedded Product Enquiry Form */}
          <div className="pt-6 border-t border-slate-200">
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 sm:p-6">
              {formSubmitted ? (
                <div className="text-center py-6 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-[#0B1F3A]">
                    Enquiry Received for {product.name}
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    Thank you, <span className="font-semibold text-slate-900">{formData.name}</span>. Our B2B sales engineer will contact you on{' '}
                    <span className="font-mono font-semibold text-slate-900">{formData.phone}</span> with latest pricing for {formData.quantity} {product.unit}(s).
                  </p>
                  <button
                    type="button"
                    onClick={() => setFormSubmitted(false)}
                    className="text-xs font-semibold text-[#0B1F3A] underline hover:text-[#D98A0C]"
                  >
                    Submit another enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleInlineSubmit} className="space-y-4">
                  <div>
                    <h3 className="font-display text-lg font-bold text-[#0B1F3A]">
                      Send Direct Enquiry for This Product
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                      Get bulk wholesale discounts, GST quotation, and delivery timeline to your site.
                    </p>
                  </div>

                  {formError && (
                    <div
                      role="alert"
                      className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded-xl"
                    >
                      {formError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#F5A524]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#F5A524]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="name@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#F5A524]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        City / Location *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Dehradun or Saharanpur"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#F5A524]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Quantity ({product.unit}s)
                      </label>
                      <input
                        type="number"
                        min={1}
                        value={formData.quantity}
                        onChange={(e) =>
                          setFormData({ ...formData, quantity: Math.max(1, Number(e.target.value)) })
                        }
                        className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono tabular-nums text-slate-900 focus:border-[#F5A524]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Requirement Type
                      </label>
                      <select
                        value={formData.requirementType}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            requirementType: e.target.value as 'Home' | 'Commercial' | 'Industrial'
                          })
                        }
                        className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#F5A524]"
                      >
                        <option value="Home">Home / Residential</option>
                        <option value="Commercial">Commercial / Business</option>
                        <option value="Industrial">Industrial / EPC</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-end">
                    <div className="flex-1">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Additional Notes (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="Mention delivery timeline, roof type, or bulk order details..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#F5A524]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-[#0B1F3A] hover:bg-[#F5A524] hover:text-[#0B1F3A] text-white font-bold px-6 py-2.5 rounded-xl shadow-sm transition-colors inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm"
                    >
                      <Send className="w-4 h-4" aria-hidden="true" />
                      Request Best Quote
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
