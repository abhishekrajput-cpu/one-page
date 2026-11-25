export type ProductCategory =
  | 'Mono PERC Panels'
  | 'Polycrystalline Panels'
  | 'Bifacial Panels'
  | 'Solar Inverters'
  | 'Solar Batteries'
  | 'Mounting Structures'
  | 'Complete Solar Kits';

export interface ProductGalleryImage {
  url: string;
  label: string;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  brand: string;
  wattage: number; // Rated power in Watts (e.g., 540 for 540W, 10000 for 10kW)
  wattageLabel: string; // Human-readable wattage (e.g., "540W", "10 kW")
  efficiency: string;
  warranty: string;
  warrantyShort: string;
  price: number; // Base numeric price in INR for sorting & range filtering
  priceDisplay: string; // Price range or "Get Latest Price"
  unit: string;
  moq: string; // Minimum order quantity for B2B buyers
  image: string;
  gallery: ProductGalleryImage[];
  description: string;
  specs: Record<string, string>;
  features: string[];
  inStock: boolean;
  popular?: boolean;
}

export interface EnquiryFormState {
  name: string;
  phone: string;
  email: string;
  city: string;
  productName: string;
  quantity: number;
  requirementType: 'Home' | 'Commercial' | 'Industrial';
  message: string;
}
