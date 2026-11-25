import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import {
  SlidersHorizontal,
  ArrowUpDown,
  MessageCircle,
  RotateCcw,
  Eye
} from 'lucide-react';
import { CATEGORIES, buildWhatsAppUrl } from '../data/products';
import { ImageWithFallback } from './ImageWithFallback';

interface ProductCatalogProps {
  products: Product[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onSelectProduct: (product: Product) => void;
  onOpenEnquiry: (productName: string) => void;
}

const WATTAGE_RANGES = [
  { id: 'all', label: 'All Wattages' },
  { id: 'under-500', label: 'Under 500W' },
  { id: '500-5000', label: '500W – 5 kW' },
  { id: '5001-15000', label: '5 kW – 15 kW' },
  { id: 'above-15000', label: 'Above 15 kW' }
];

const PRICE_RANGES = [
  { id: 'all', label: 'All Prices' },
  { id: 'under-15k', label: 'Under ₹15,000' },
  { id: '15k-75k', label: '₹15,000 – ₹75,000' },
  { id: '75k-3l', label: '₹75,000 – ₹3,00,000' },
  { id: 'above-3l', label: 'Above ₹3,00,000' }
];

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  onSelectProduct,
  onOpenEnquiry
}) => {
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [wattageRange, setWattageRange] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('popular');

  const brands = useMemo(() => {
    return ['All', ...Array.from(new Set(products.map((p) => p.brand)))];
  }, [products]);

  const hasActiveFilters =
    selectedCategory !== 'All Categories' ||
    selectedBrand !== 'All' ||
    wattageRange !== 'all' ||
    priceRange !== 'all' ||
    searchQuery.trim() !== '';

  const resetAllFilters = () => {
    setSelectedCategory('All Categories');
    setSelectedBrand('All');
    setWattageRange('all');
    setPriceRange('all');
    setSearchQuery('');
    setSortBy('popular');
  };

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return products
      .filter((p) => {
        const matchesCategory =
          selectedCategory === 'All Categories' || p.category === selectedCategory;

        const matchesBrand = selectedBrand === 'All' || p.brand === selectedBrand;

        const matchesSearch =
          !query ||
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.wattageLabel.toLowerCase().includes(query);

        let matchesWattage = true;
        if (wattageRange === 'under-500') matchesWattage = p.wattage < 500;
        else if (wattageRange === '500-5000')
          matchesWattage = p.wattage >= 500 && p.wattage <= 5000;
        else if (wattageRange === '5001-15000')
          matchesWattage = p.wattage > 5000 && p.wattage <= 15000;
        else if (wattageRange === 'above-15000') matchesWattage = p.wattage > 15000;

        let matchesPrice = true;
        if (priceRange === 'under-15k') matchesPrice = p.price < 15000;
        else if (priceRange === '15k-75k')
          matchesPrice = p.price >= 15000 && p.price <= 75000;
        else if (priceRange === '75k-3l')
          matchesPrice = p.price > 75000 && p.price <= 300000;
        else if (priceRange === 'above-3l') matchesPrice = p.price > 300000;

        return (
          matchesCategory &&
          matchesBrand &&
          matchesSearch &&
          matchesWattage &&
          matchesPrice
        );
      })
      .sort((a, b) => {
        if (sortBy === 'popular') return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'wattage-desc') return b.wattage - a.wattage;
        return 0;
      });
  }, [products, selectedCategory, selectedBrand, searchQuery, wattageRange, priceRange, sortBy]);

  return (
    <section id="products" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold text-[#D98A0C] mb-1">
              B2B Wholesale &amp; Retail Catalog
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight text-balance">
              Solar Panels, Inverters, Batteries &amp; Kits
            </h2>
          </div>
          <p className="text-sm text-slate-600 tabular-nums">
            Showing <span className="font-bold text-slate-900">{filteredProducts.length}</span> of{' '}
            {products.length} certified products
          </p>
        </div>

        {/* Live Filter & Sort Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {/* Category Filter */}
            <div>
              <label
                htmlFor="filter-category"
                className="block text-xs font-semibold text-slate-600 mb-1.5"
              >
                Category
              </label>
              <select
                id="filter-category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-sm rounded-xl px-3 py-2.5 text-slate-900 font-medium focus:border-[#F5A524] focus:bg-white transition-colors"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Wattage Range Filter */}
            <div>
              <label
                htmlFor="filter-wattage"
                className="block text-xs font-semibold text-slate-600 mb-1.5"
              >
                Wattage Range
              </label>
              <select
                id="filter-wattage"
                value={wattageRange}
                onChange={(e) => setWattageRange(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-sm rounded-xl px-3 py-2.5 text-slate-900 font-medium focus:border-[#F5A524] focus:bg-white transition-colors"
              >
                {WATTAGE_RANGES.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range Filter */}
            <div>
              <label
                htmlFor="filter-price"
                className="block text-xs font-semibold text-slate-600 mb-1.5"
              >
                Price Range
              </label>
              <select
                id="filter-price"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-sm rounded-xl px-3 py-2.5 text-slate-900 font-medium focus:border-[#F5A524] focus:bg-white transition-colors"
              >
                {PRICE_RANGES.map((pr) => (
                  <option key={pr.id} value={pr.id}>
                    {pr.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Brand Filter */}
            <div>
              <label
                htmlFor="filter-brand"
                className="block text-xs font-semibold text-slate-600 mb-1.5"
              >
                Brand / Make
              </label>
              <select
                id="filter-brand"
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-sm rounded-xl px-3 py-2.5 text-slate-900 font-medium focus:border-[#F5A524] focus:bg-white transition-colors"
              >
                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b === 'All' ? 'All Brands' : b}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label
                htmlFor="filter-sort"
                className="flex items-center gap-1 text-xs font-semibold text-slate-600 mb-1.5"
              >
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                Sort By
              </label>
              <select
                id="filter-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-sm rounded-xl px-3 py-2.5 text-slate-900 font-medium focus:border-[#F5A524] focus:bg-white transition-colors"
              >
                <option value="popular">Popularity</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="wattage-desc">Highest Capacity (W/kW)</option>
              </select>
            </div>
          </div>

          {hasActiveFilters && (
            <div className="mt-4 pt-3.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
              <span>
                Active filters applied
                {searchQuery.trim() ? ` for "${searchQuery.trim()}"` : ''}
              </span>
              <button
                type="button"
                onClick={resetAllFilters}
                className="inline-flex items-center gap-1.5 font-semibold text-[#0B1F3A] hover:text-[#D98A0C] transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 px-4 bg-white rounded-2xl border border-slate-200">
            <SlidersHorizontal
              className="w-10 h-10 text-slate-300 mx-auto mb-3"
              aria-hidden="true"
            />
            <h3 className="font-display text-lg font-bold text-slate-900">
              No matching solar products found
            </h3>
            <p className="text-sm text-slate-600 mt-1 max-w-md mx-auto">
              Try widening your wattage or price range, switching categories, or clearing your search query.
            </p>
            <button
              type="button"
              onClick={resetAllFilters}
              className="mt-5 bg-[#0B1F3A] hover:bg-[#122C50] text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const whatsappHref = buildWhatsAppUrl(
                `Hello Shri Surya Solar, I would like to enquire about ${product.name} (${product.priceDisplay}). Please share wholesale pricing and availability.`
              );

              return (
                <article
                  key={product.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg hover:border-[#F5A524]/70 transition-all duration-200 hover:-translate-y-0.5 flex flex-col group"
                >
                  {/* 4:3 Product Image Lead */}
                  <button
                    type="button"
                    onClick={() => onSelectProduct(product)}
                    className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden text-left block"
                    aria-label={`View specifications for ${product.name}`}
                  >
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      fallbackLabel={product.name}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                    />
                    <span className="absolute bottom-3 right-3 bg-[#0B1F3A]/85 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-lg inline-flex items-center gap-1.5 opacity-95 group-hover:bg-[#0B1F3A] transition-colors">
                      <Eye className="w-3.5 h-3.5 text-[#F5A524]" aria-hidden="true" />
                      View Specs
                    </span>
                  </button>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                    <div className="space-y-3">
                      {/* Unboxed clean metadata kicker (no pill sandwich) */}
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="font-medium text-slate-700 truncate">
                          {product.category}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="truncate">{product.brand}</span>
                      </div>

                      <h3 className="font-display font-bold text-slate-900 text-lg leading-snug">
                        <button
                          type="button"
                          onClick={() => onSelectProduct(product)}
                          className="text-left hover:text-[#D98A0C] transition-colors line-clamp-2"
                        >
                          {product.name}
                        </button>
                      </h3>

                      {/* Price & MOQ */}
                      <div className="flex items-baseline justify-between gap-2 pt-0.5">
                        <div>
                          <span className="font-mono tabular-nums text-lg font-bold text-[#0B1F3A]">
                            {product.priceDisplay}
                          </span>
                          {product.priceDisplay !== 'Get Latest Price' && (
                            <span className="text-xs text-slate-500 ml-1">/ {product.unit}</span>
                          )}
                        </div>
                        <span className="text-xs text-slate-500 whitespace-nowrap">
                          MOQ: {product.moq}
                        </span>
                      </div>

                      {/* 3 Key Specs: Wattage, Efficiency, Warranty */}
                      <dl className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 text-xs">
                        <div>
                          <dt className="text-slate-500">Wattage</dt>
                          <dd className="font-mono tabular-nums font-semibold text-slate-900 mt-0.5">
                            {product.wattageLabel}
                          </dd>
                        </div>
                        <div className="border-l border-slate-100 pl-2.5">
                          <dt className="text-slate-500">Efficiency</dt>
                          <dd className="font-mono tabular-nums font-semibold text-slate-900 mt-0.5 truncate">
                            {product.efficiency}
                          </dd>
                        </div>
                        <div className="border-l border-slate-100 pl-2.5">
                          <dt className="text-slate-500">Warranty</dt>
                          <dd className="font-mono tabular-nums font-semibold text-slate-900 mt-0.5">
                            {product.warrantyShort}
                          </dd>
                        </div>
                      </dl>
                    </div>

                    {/* Dual Action Buttons */}
                    <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => onOpenEnquiry(product.name)}
                        className="px-3.5 py-2.5 bg-[#0B1F3A] hover:bg-[#F5A524] hover:text-[#0B1F3A] text-white text-xs sm:text-sm font-bold rounded-xl transition-colors text-center whitespace-nowrap"
                      >
                        Get Quote
                      </button>
                      <a
                        href={whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2.5 bg-emerald-50 hover:bg-emerald-600 text-emerald-800 hover:text-white border border-emerald-200 hover:border-emerald-600 text-xs sm:text-sm font-semibold rounded-xl transition-colors inline-flex items-center justify-center gap-1.5 whitespace-nowrap"
                      >
                        <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
