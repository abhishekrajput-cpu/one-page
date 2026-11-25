import React from 'react';
import { CATEGORIES, PRODUCTS } from '../data/products';
import { Sun, BatteryCharging, Zap, Layers, Cpu, Shield, Package, Grid2x2 } from 'lucide-react';

interface CategoriesRowProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

const getCategoryIcon = (cat: string) => {
  switch (cat) {
    case 'Mono PERC Panels':
      return Sun;
    case 'Polycrystalline Panels':
      return Zap;
    case 'Bifacial Panels':
      return Layers;
    case 'Solar Inverters':
      return Cpu;
    case 'Solar Batteries':
      return BatteryCharging;
    case 'Mounting Structures':
      return Shield;
    case 'Complete Solar Kits':
      return Package;
    default:
      return Grid2x2;
  }
};

export const CategoriesRow: React.FC<CategoriesRowProps> = ({
  selectedCategory,
  onSelectCategory
}) => {
  const getCount = (cat: string) => {
    if (cat === 'All Categories') return PRODUCTS.length;
    return PRODUCTS.filter((p) => p.category === cat).length;
  };

  return (
    <section className="bg-white py-12 sm:py-14 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold text-[#D98A0C] mb-1">Product Categories</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0B1F3A] tracking-tight text-balance">
              Shop Certified Solar Equipment by Category
            </h2>
          </div>
          <p className="text-sm text-slate-600 max-w-md">
            Select a category to filter our live catalog of residential, commercial, and industrial solar components.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            const Icon = getCategoryIcon(cat);
            const count = getCount(cat);

            return (
              <button
                key={cat}
                type="button"
                onClick={() => onSelectCategory(cat)}
                aria-pressed={isSelected}
                className={`p-4 rounded-xl border text-left transition-all duration-150 flex items-center gap-3.5 group hover:-translate-y-0.5 ${
                  isSelected
                    ? 'bg-[#0B1F3A] text-white border-[#0B1F3A] shadow-md'
                    : 'bg-slate-50 hover:bg-white text-slate-800 border-slate-200 hover:border-[#F5A524] hover:shadow-sm'
                }`}
              >
                <span
                  className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-[#F5A524] text-[#0B1F3A]'
                      : 'bg-white text-[#0B1F3A] border border-slate-200 group-hover:border-[#F5A524]/60'
                  }`}
                >
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span
                    className={`font-semibold text-sm block leading-snug truncate ${
                      isSelected ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {cat}
                  </span>
                  <span
                    className={`text-xs mt-0.5 block tabular-nums ${
                      isSelected ? 'text-[#F5A524]' : 'text-slate-500'
                    }`}
                  >
                    {count} {count === 1 ? 'product' : 'products'}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
