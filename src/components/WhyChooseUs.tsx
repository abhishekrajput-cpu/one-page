import React from 'react';
import { ShieldCheck, Truck, Wrench, Headphones, Award, Factory } from 'lucide-react';
import { BUSINESS_INFO } from '../data/products';

const REASONS = [
  {
    icon: ShieldCheck,
    title: 'Certified Quality Assurance',
    description:
      'Every panel batch undergoes EL flash testing and comes with verifiable BIS, ALMM, and IEC 61215 compliance certificates.'
  },
  {
    icon: Factory,
    title: 'Factory-Direct Wholesale Pricing',
    description:
      'Direct partnerships with Tier-1 manufacturers allow transparent dealer, EPC, and bulk commercial rates with GST invoicing.'
  },
  {
    icon: Truck,
    title: 'Fast Dehradun & Saharanpur Delivery',
    description:
      'Shock-protected handling and insured local transport ensure safe, on-schedule delivery across Dehradun and Saharanpur within 24–48 hours.'
  },
  {
    icon: Wrench,
    title: 'Turnkey Installation Support',
    description:
      'Certified electrical and structural engineers handle site survey, mounting design, CEIG compliance, and grid synchronization.'
  },
  {
    icon: Headphones,
    title: 'Dedicated After-Sales Service',
    description:
      'Prompt warranty replacement handling, remote Wi-Fi generation monitoring, and optional Annual Maintenance Contracts (AMC).'
  },
  {
    icon: Award,
    title: 'Subsidy & Net-Metering Desk',
    description:
      'End-to-end paperwork support for PM-Surya Ghar residential subsidies and DISCOM bi-directional net meter approvals.'
  }
];

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-semibold text-[#D98A0C] mb-1">Why Choose Us</p>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight text-balance">
            Built for Long-Term Solar Performance &amp; B2B Reliability
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            With {BUSINESS_INFO.yearsInBusiness} years of field supply and turnkey execution, {BUSINESS_INFO.name} eliminates procurement risk for homeowners, installers, and industrial buyers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REASONS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-slate-50 p-6 sm:p-7 rounded-2xl border border-slate-200 hover:border-[#F5A524]/70 hover:bg-white hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0B1F3A] text-[#F5A524] flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg font-bold text-[#0B1F3A] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
