import React, { useState } from 'react';
import { Sun, Search, Menu, X } from 'lucide-react';
import { BUSINESS_INFO } from '../data/products';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onOpenEnquiry: (productName?: string) => void;
  activeNav: string;
  setActiveNav: (nav: string) => void;
}

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'products', label: 'Products' },
  { id: 'about', label: 'About' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' }
];

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  onOpenEnquiry,
  activeNav,
  setActiveNav
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    setActiveNav(sectionId);
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0B1F3A]/95 backdrop-blur-md text-white border-b border-white/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-[72px] flex items-center justify-between gap-4 lg:gap-6">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          className="flex items-center gap-2.5 shrink-0 whitespace-nowrap group"
          aria-label={`${BUSINESS_INFO.name} Home`}
        >
          <span className="w-9 h-9 rounded-lg bg-[#F5A524] flex items-center justify-center text-[#0B1F3A] shadow-sm transition-transform duration-200 group-hover:scale-105">
            <Sun className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
          </span>
          <span className="font-display text-lg sm:text-xl font-extrabold tracking-tight text-white">
            Shri Surya <span className="text-[#F5A524]">Solar</span>
          </span>
        </a>

        {/* Search Bar (Desktop) */}
        <form
          onSubmit={handleSearchSubmit}
          role="search"
          className="hidden md:flex items-center flex-1 max-w-sm lg:max-w-md relative"
        >
          <Search
            className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none"
            aria-hidden="true"
          />
          <input
            type="search"
            aria-label="Search solar panels, inverters, batteries"
            placeholder="Search solar panels, inverters, batteries..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full bg-white/10 border border-white/15 text-sm rounded-lg pl-10 pr-4 py-2 text-white placeholder-slate-300/80 focus:outline-none focus:bg-white/15 focus:border-[#F5A524] transition-colors"
          />
        </form>

        {/* Zone 2: Navigation Links */}
        <nav
          aria-label="Main navigation"
          className="hidden xl:flex items-center gap-6 text-sm font-medium text-slate-200"
        >
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavClick(item.id)}
              className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors duration-150 ${
                activeNav === item.id
                  ? 'text-[#F5A524] border-[#F5A524] font-semibold'
                  : 'border-transparent hover:text-white hover:border-white/40'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: Primary Action & Mobile Drawer Trigger */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => onOpenEnquiry('General Best Price Request')}
            className="bg-[#F5A524] hover:bg-[#e59412] text-[#0B1F3A] font-bold text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-lg shadow-sm transition-all duration-150 hover:-translate-y-0.5 whitespace-nowrap shrink-0"
          >
            Get Best Price
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="xl:hidden p-2.5 rounded-lg bg-white/10 text-slate-200 hover:bg-white/15 hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation & Search Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#071426] border-t border-white/10 px-4 py-4 space-y-4">
          <form onSubmit={handleSearchSubmit} role="search" className="relative md:hidden">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              aria-label="Search solar panels, inverters, batteries"
              placeholder="Search solar panels, inverters, batteries..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full bg-white/10 border border-white/15 text-sm rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-slate-400 focus:outline-none focus:border-[#F5A524]"
            />
          </form>

          <nav aria-label="Mobile navigation" className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`text-left py-2.5 px-3.5 rounded-lg text-sm font-medium transition-colors ${
                  activeNav === item.id
                    ? 'bg-[#F5A524]/15 text-[#F5A524] font-semibold'
                    : 'text-slate-200 hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => handleNavClick('calculator')}
              className="text-left py-2.5 px-3.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-white/10 transition-colors"
            >
              Savings Calculator
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
