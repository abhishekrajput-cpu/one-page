import React, { useState } from 'react';
import { Calculator, Zap, TrendingUp, Clock, ArrowRight, Info } from 'lucide-react';

interface SolarCalculatorProps {
  onOpenEnquiry: (productName: string) => void;
}

export const SolarCalculator: React.FC<SolarCalculatorProps> = ({ onOpenEnquiry }) => {
  const [segment, setSegment] = useState<'Home' | 'Commercial'>('Home');
  const [monthlyBill, setMonthlyBill] = useState<number>(5000);
  const [roofArea, setRoofArea] = useState<number>(400);

  // Realistic Indian solar sizing assumptions
  const tariffPerUnit = segment === 'Home' ? 8 : 10.5;
  const unitsPerKwPerMonth = 125; // ~4.1 units/day/kW average in India
  const sqftPerKw = 85;

  const monthlyUnits = monthlyBill / tariffPerUnit;
  const billDrivenKw = Math.max(1, Math.round((monthlyUnits / unitsPerKwPerMonth) * 10) / 10);
  const maxRoofKw = Math.max(1, Math.floor((roofArea / sqftPerKw) * 10) / 10);

  const recommendedKw = Math.min(billDrivenKw, maxRoofKw);
  const roofConstrained = billDrivenKw > maxRoofKw;

  const estimatedAnnualUnits = Math.round(recommendedKw * unitsPerKwPerMonth * 12);
  const estimatedYearlySavings = Math.min(
    Math.round(monthlyBill * 12 * 0.9),
    Math.round(estimatedAnnualUnits * tariffPerUnit)
  );

  // Cost per kW drops with scale
  const costPerKw = recommendedKw >= 10 ? 44000 : recommendedKw >= 5 ? 48000 : 52000;
  const grossSystemCost = Math.round(recommendedKw * costPerKw);

  // PM-Surya Ghar residential subsidy: ₹30k (1kW), ₹60k (2kW), ₹78k (3kW+)
  let subsidy = 0;
  if (segment === 'Home') {
    if (recommendedKw >= 3) subsidy = 78000;
    else if (recommendedKw >= 2) subsidy = 60000;
    else subsidy = 30000;
  }

  const netSystemCost = Math.max(25000, grossSystemCost - subsidy);
  const paybackPeriodYears = Math.max(
    1.8,
    Math.round((netSystemCost / Math.max(1, estimatedYearlySavings)) * 10) / 10
  );

  const handleConsult = () => {
    onOpenEnquiry(
      `${recommendedKw} kW ${segment} Solar System (Monthly Bill ₹${monthlyBill.toLocaleString('en-IN')})`
    );
  };

  return (
    <section id="calculator" className="py-16 sm:py-20 bg-[#0B1F3A] text-white relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-10 bg-[radial-gradient(#F5A524_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-[#F5A524] flex items-center gap-1.5 mb-2">
              <Calculator className="w-4 h-4" aria-hidden="true" />
              Solar Savings &amp; ROI Calculator
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-balance">
              Estimate Your System Size, Yearly Savings &amp; Payback
            </h2>
          </div>

          {/* Interactive Segment Selector */}
          <div
            role="group"
            aria-label="Property type"
            className="inline-flex p-1 bg-white/10 rounded-xl border border-white/10 self-start"
          >
            {(['Home', 'Commercial'] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setSegment(type)}
                aria-pressed={segment === type}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  segment === type
                    ? 'bg-[#F5A524] text-[#0B1F3A] shadow-sm'
                    : 'text-slate-200 hover:text-white'
                }`}
              >
                {type === 'Home' ? 'Home / Residential' : 'Commercial / Industry'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#122C50]/70 p-6 sm:p-8 lg:p-10 rounded-2xl border border-white/10 shadow-2xl">
          {/* Left Inputs */}
          <div className="lg:col-span-6 space-y-7 flex flex-col justify-between">
            <div className="space-y-7">
              {/* Monthly Electricity Bill */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label htmlFor="calc-bill" className="text-sm font-semibold text-slate-200">
                    Monthly Electricity Bill (₹)
                  </label>
                  <div className="flex items-center gap-1 bg-[#071426] border border-white/15 rounded-lg px-3 py-1.5">
                    <span className="text-[#F5A524] font-mono text-sm">₹</span>
                    <input
                      id="calc-bill"
                      type="number"
                      min={1000}
                      max={100000}
                      step={500}
                      value={monthlyBill}
                      onChange={(e) =>
                        setMonthlyBill(Math.max(1000, Math.min(100000, Number(e.target.value) || 1000)))
                      }
                      className="w-24 bg-transparent text-right font-mono tabular-nums font-bold text-white text-sm focus:outline-none"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  aria-label="Monthly electricity bill slider"
                  min={1000}
                  max={50000}
                  step={500}
                  value={Math.min(50000, monthlyBill)}
                  onChange={(e) => setMonthlyBill(Number(e.target.value))}
                  className="w-full accent-[#F5A524] h-2 bg-[#071426] rounded-lg"
                />
                <div className="flex justify-between text-xs text-slate-400 font-mono tabular-nums">
                  <span>₹1,000</span>
                  <span>₹25,000</span>
                  <span>₹50,000+</span>
                </div>
              </div>

              {/* Roof Area */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label htmlFor="calc-roof" className="text-sm font-semibold text-slate-200">
                    Shadow-Free Roof Area (sq. ft.)
                  </label>
                  <div className="flex items-center gap-1.5 bg-[#071426] border border-white/15 rounded-lg px-3 py-1.5">
                    <input
                      id="calc-roof"
                      type="number"
                      min={100}
                      max={10000}
                      step={50}
                      value={roofArea}
                      onChange={(e) =>
                        setRoofArea(Math.max(100, Math.min(10000, Number(e.target.value) || 100)))
                      }
                      className="w-20 bg-transparent text-right font-mono tabular-nums font-bold text-white text-sm focus:outline-none"
                    />
                    <span className="text-slate-400 text-xs">sq.ft.</span>
                  </div>
                </div>
                <input
                  type="range"
                  aria-label="Available roof area slider"
                  min={100}
                  max={5000}
                  step={50}
                  value={Math.min(5000, roofArea)}
                  onChange={(e) => setRoofArea(Number(e.target.value))}
                  className="w-full accent-[#F5A524] h-2 bg-[#071426] rounded-lg"
                />
                <div className="flex justify-between text-xs text-slate-400 font-mono tabular-nums">
                  <span>100 sq.ft.</span>
                  <span>2,500 sq.ft.</span>
                  <span>5,000+ sq.ft.</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#071426]/80 border border-white/10 text-xs text-slate-300 flex items-start gap-3">
              <Info className="w-4 h-4 text-[#F5A524] shrink-0 mt-0.5" aria-hidden="true" />
              <p className="leading-relaxed">
                {roofConstrained
                  ? `Your roof area (${roofArea} sq.ft.) comfortably supports up to ${maxRoofKw} kW. Elevated structures can expand capacity further.`
                  : segment === 'Home'
                    ? `Residential estimate includes ₹${subsidy.toLocaleString('en-IN')} PM-Surya Ghar central subsidy and avg. ₹${tariffPerUnit}/unit tariff.`
                    : `Commercial estimate uses avg. ₹${tariffPerUnit}/unit tariff. Businesses can additionally claim 40% Accelerated Depreciation tax savings.`}
              </p>
            </div>
          </div>

          {/* Right Outputs */}
          <div className="lg:col-span-6 bg-[#071426] p-6 sm:p-7 rounded-2xl border border-white/10 flex flex-col justify-between gap-6">
            <div>
              <p className="text-xs font-semibold text-[#F5A524] mb-4">
                Recommended Solar Configuration
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div className="p-4 bg-white/[0.04] rounded-xl border border-white/10">
                  <span className="text-xs text-slate-400 block">System Size</span>
                  <span className="font-mono tabular-nums text-2xl font-bold text-white mt-1 block">
                    {recommendedKw} kW
                  </span>
                </div>
                <div className="p-4 bg-white/[0.04] rounded-xl border border-white/10">
                  <span className="text-xs text-slate-400 block">Yearly Savings</span>
                  <span className="font-mono tabular-nums text-2xl font-bold text-emerald-400 mt-1 block">
                    ₹{estimatedYearlySavings.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="p-4 bg-white/[0.04] rounded-xl border border-white/10">
                  <span className="text-xs text-slate-400 block">Payback Period</span>
                  <span className="font-mono tabular-nums text-2xl font-bold text-[#F5A524] mt-1 block">
                    {paybackPeriodYears} Yrs
                  </span>
                </div>
              </div>

              <dl className="mt-5 divide-y divide-white/10 text-sm">
                <div className="flex items-center justify-between py-2.5">
                  <dt className="text-slate-300 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#F5A524]" aria-hidden="true" />
                    Est. Annual Generation
                  </dt>
                  <dd className="font-mono tabular-nums font-semibold text-white">
                    {estimatedAnnualUnits.toLocaleString('en-IN')} kWh / yr
                  </dd>
                </div>
                <div className="flex items-center justify-between py-2.5">
                  <dt className="text-slate-300 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#F5A524]" aria-hidden="true" />
                    {segment === 'Home' ? 'Est. Net Cost (After Subsidy)' : 'Est. Turnkey Investment'}
                  </dt>
                  <dd className="font-mono tabular-nums font-semibold text-white">
                    ₹{netSystemCost.toLocaleString('en-IN')}
                  </dd>
                </div>
                <div className="flex items-center justify-between py-2.5">
                  <dt className="text-slate-300 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#F5A524]" aria-hidden="true" />
                    25-Year Lifetime Savings
                  </dt>
                  <dd className="font-mono tabular-nums font-semibold text-emerald-400">
                    ₹{(estimatedYearlySavings * 25).toLocaleString('en-IN')}
                  </dd>
                </div>
              </dl>
            </div>

            <button
              type="button"
              onClick={handleConsult}
              className="w-full bg-[#F5A524] hover:bg-[#e59412] text-[#0B1F3A] font-bold py-3.5 px-6 rounded-xl shadow-lg transition-all duration-150 hover:-translate-y-0.5 flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              Get Exact Quotation for {recommendedKw} kW System
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
