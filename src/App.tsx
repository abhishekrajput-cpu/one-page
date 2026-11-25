import React, { useState } from 'react';
import { PRODUCTS } from './data/products';
import { Product } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoriesRow } from './components/CategoriesRow';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetailModal } from './components/ProductDetailModal';
import { EnquiryModal } from './components/EnquiryModal';
import { SolarCalculator } from './components/SolarCalculator';
import { WhyChooseUs } from './components/WhyChooseUs';
import { AboutAndTestimonials } from './components/AboutAndTestimonials';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [enquiryProduct, setEnquiryProduct] = useState('General Best Price Request');
  const [activeNav, setActiveNav] = useState('home');

  const handleOpenEnquiry = (productName: string = 'General Best Price Request') => {
    setEnquiryProduct(productName);
    setEnquiryModalOpen(true);
  };

  const handleBrowseProducts = () => {
    setActiveNav('products');
    const el = document.getElementById('products');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Sticky Navigation Header */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenEnquiry={handleOpenEnquiry}
        activeNav={activeNav}
        setActiveNav={setActiveNav}
      />

      <main className="flex-1">
        {/* Hero & 4-Pillar Trust Strip */}
        <Hero
          onBrowseProducts={handleBrowseProducts}
          onRequestQuote={() => handleOpenEnquiry('Custom Solar EPC / Rooftop Project')}
        />

        {/* Product Categories Quick Selector */}
        <CategoriesRow
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            setActiveNav('products');
            const el = document.getElementById('products');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Main B2B Product Grid with Live Filtering & Sorting */}
        <ProductCatalog
          products={PRODUCTS}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSelectProduct={(product) => setSelectedProduct(product)}
          onOpenEnquiry={handleOpenEnquiry}
        />

        {/* Interactive Solar Savings & ROI Calculator */}
        <SolarCalculator onOpenEnquiry={handleOpenEnquiry} />

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* About Company, Certifications, Brand Logos & Testimonials Carousel */}
        <AboutAndTestimonials />

        {/* FAQ Accordion */}
        <FaqSection />

        {/* Contact Page Section with Map Placeholder & Form */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={setSelectedCategory}
        setActiveNav={setActiveNav}
      />

      {/* Persistent Floating WhatsApp CTA */}
      <FloatingWhatsApp />

      {/* Product Detail Modal (Gallery, Specs, Datasheet Download & Inline Enquiry) */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Standalone Quote / Enquiry Modal */}
      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        initialProduct={enquiryProduct}
      />
    </div>
  );
}
