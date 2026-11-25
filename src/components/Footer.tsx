import React from 'react';
import { Sun, Phone, Mail, MapPin, ShieldCheck, Linkedin, Facebook, Instagram, Youtube } from 'lucide-react';
import { BUSINESS_INFO, CATEGORIES } from '../data/products';

interface FooterProps {
  onSelectCategory: (cat: string) => void;
  setActiveNav: (nav: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, setActiveNav }) => {
  const handleNavClick = (sectionId: string) => {
    setActiveNav(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const socialLinks = [
    { name: 'LinkedIn', href: BUSINESS_INFO.social.linkedin, icon: Linkedin },
    { name: 'Facebook', href: BUSINESS_INFO.social.facebook, icon: Facebook },
    { name: 'Instagram', href: BUSINESS_INFO.social.instagram, icon: Instagram },
    { name: 'YouTube', href: BUSINESS_INFO.social.youtube, icon: Youtube }
  ];

  return (
    <footer className="bg-[#071426] text-white pt-16 pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand Summary & Social Icons */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-lg bg-[#F5A524] flex items-center justify-center text-[#0B1F3A]">
                <Sun className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
              </span>
              <span className="font-display text-xl font-extrabold tracking-tight text-white">
                Shri Surya <span className="text-[#F5A524]">Solar</span>
              </span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              {BUSINESS_INFO.tagline}. Wholesale B2B supplier and EPC partner for Mono PERC panels, inverters, batteries, and complete solar kits.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#F5A524] font-medium">
              <ShieldCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>ISO 9001:2015 · MNRE &amp; BIS Approved Supplier</span>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${BUSINESS_INFO.name} on ${social.name}`}
                    className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#F5A524] text-slate-200 hover:text-[#0B1F3A] flex items-center justify-center transition-colors"
                  >
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="font-display text-sm font-bold text-[#F5A524]">Quick Links</h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              {[
                { id: 'home', label: 'Home' },
                { id: 'products', label: 'Products Catalog' },
                { id: 'calculator', label: 'Savings Calculator' },
                { id: 'about', label: 'About Us' },
                { id: 'certifications', label: 'Certifications' },
                { id: 'faq', label: 'FAQ' },
                { id: 'contact', label: 'Contact Us' }
              ].map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => handleNavClick(link.id)}
                    className="hover:text-[#F5A524] transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Product Categories */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="font-display text-sm font-bold text-[#F5A524]">Product Categories</h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              {CATEGORIES.filter((c) => c !== 'All Categories').map((cat) => (
                <li key={cat}>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectCategory(cat);
                      handleNavClick('products');
                    }}
                    className="hover:text-[#F5A524] transition-colors text-left"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact Information */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="font-display text-sm font-bold text-[#F5A524]">Contact Details</h4>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#F5A524] shrink-0 mt-1" aria-hidden="true" />
                <span className="leading-relaxed">{BUSINESS_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#F5A524] shrink-0" aria-hidden="true" />
                <a
                  href={`tel:${BUSINESS_INFO.phone.replace(/\s+/g, '')}`}
                  className="font-mono hover:text-[#F5A524] transition-colors"
                >
                  {BUSINESS_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#F5A524] shrink-0" aria-hidden="true" />
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="hover:text-[#F5A524] transition-colors break-all"
                >
                  {BUSINESS_INFO.email}
                </a>
              </div>
              {BUSINESS_INFO.gstNo && (
                <p className="text-xs font-mono text-slate-400 pt-1">
                  GSTIN: {BUSINESS_INFO.gstNo}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Legal Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>
            © {new Date().getFullYear()} {BUSINESS_INFO.name}. All rights reserved.
          </p>
          <p>Serving Residential, Commercial &amp; Industrial Solar Projects in Dehradun &amp; Saharanpur</p>
        </div>
      </div>
    </footer>
  );
};
