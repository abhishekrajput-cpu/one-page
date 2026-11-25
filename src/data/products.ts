import { Product } from '../types';

/**
 * ============================================================================
 * EDITABLE BUSINESS DETAILS
 * Update the values below with your real company information.
 * Changes here automatically update the Header, Hero, Contact, WhatsApp links,
 * Datasheets, and Footer across the entire website.
 * ============================================================================
 */
export const BUSINESS_INFO = {
  name: 'Shri Surya Solar',
  tagline: 'Reliable Solar Solutions for Homes, Businesses & Industry',
  location: '[City, State, India]',
  address: '[City, State, India]',
  phone: '[xyz no]',
  whatsapp: '[xyz no]',
  email: '[xyz mail]',
  gstNo: '[optional]',
  yearsInBusiness: '[X]+',
  installationsCount: '500+',
  businessHours: 'Mon – Sat: 9:30 AM – 7:00 PM IST',
  mapUrl: 'https://maps.google.com/?q=India',
  social: {
    linkedin: 'https://linkedin.com',
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    youtube: 'https://youtube.com'
  }
};

/** Helper to construct safe WhatsApp enquiry URLs */
export function buildWhatsAppUrl(message: string): string {
  const digitsOnly = BUSINESS_INFO.whatsapp.replace(/[^0-9]/g, '');
  const base = digitsOnly ? `https://wa.me/${digitsOnly}` : 'https://wa.me/';
  return `${base}?text=${encodeURIComponent(message)}`;
}

/**
 * ============================================================================
 * PRODUCT CATALOG DATA (JSON-COMPATIBLE ARRAY)
 * Add, remove, or edit products below. Place your real product images in
 * `/src/assets/images/` and update the `image` and `gallery` paths.
 * ============================================================================
 */
const IMG_HERO = '/src/assets/images/solar_hero_banner_1795440001167.jpg';
const IMG_PANEL = '/src/assets/images/mono_perc_panel_1795439991905.jpg';
const IMG_INVERTER = '/src/assets/images/solar_inverter_1795440002436.jpg';
const IMG_BATTERY = '/src/assets/images/solar_battery_1795440035691.jpg';

export const PRODUCTS: Product[] = [
  {
    id: 'surya-540-mono',
    name: '540W Mono PERC Half-Cut Solar Panel',
    category: 'Mono PERC Panels',
    brand: 'Shri Surya Pro',
    wattage: 540,
    wattageLabel: '540W',
    efficiency: '21.3%',
    warranty: '25 Years Linear Output',
    warrantyShort: '25 Yrs',
    price: 11250,
    priceDisplay: '₹10,800 – ₹11,500',
    unit: 'Piece',
    moq: '10 Pieces',
    image: IMG_PANEL,
    gallery: [
      { url: IMG_PANEL, label: 'Front Module View' },
      { url: IMG_HERO, label: 'Commercial Rooftop Array' },
      { url: IMG_INVERTER, label: 'Compatible On-Grid System' }
    ],
    description:
      'High-output 144 half-cut cell Mono PERC photovoltaic module engineered for Indian climate conditions. Delivers superior low-light morning/evening generation and minimal thermal degradation.',
    specs: {
      'Rated Power (Pmax)': '540 Wp (0 to +5W tolerance)',
      'Module Efficiency': '21.3%',
      'Cell Architecture': '144 Half-Cut Mono PERC (M10)',
      'Open Circuit Voltage (Voc)': '49.60 V',
      'Max Power Current (Imp)': '13.12 A',
      'Dimensions': '2279 × 1134 × 35 mm',
      'Weight': '28.5 kg',
      'Junction Box': 'IP68, 3 Bypass Diodes',
      'Warranty': '12 Yrs Product / 25 Yrs Performance'
    },
    features: [
      'Lower hot-spot risk and reduced shading losses via half-cut architecture',
      'Anti-PID and salt-mist corrosion certified for coastal and industrial regions',
      'Certified for 2400 Pa wind load and 5400 Pa static mechanical load',
      'ALMM & BIS certified for government tender and subsidy eligibility'
    ],
    inStock: true,
    popular: true
  },
  {
    id: 'surya-335-poly',
    name: '335W Polycrystalline Solar Panel (72-Cell)',
    category: 'Polycrystalline Panels',
    brand: 'Shri Surya Standard',
    wattage: 335,
    wattageLabel: '335W',
    efficiency: '17.4%',
    warranty: '25 Years Linear Output',
    warrantyShort: '25 Yrs',
    price: 6400,
    priceDisplay: '₹6,200 – ₹6,600',
    unit: 'Piece',
    moq: '10 Pieces',
    image: IMG_PANEL,
    gallery: [
      { url: IMG_PANEL, label: '72-Cell Poly Module' },
      { url: IMG_HERO, label: 'Field Deployment' }
    ],
    description:
      'Economical 24V polycrystalline solar panel built for agricultural solar water pumps, off-grid inverter charging, and budget commercial lighting projects.',
    specs: {
      'Rated Power (Pmax)': '335 Wp',
      'Module Efficiency': '17.4%',
      'Cell Architecture': '72-Cell Polycrystalline (5BB)',
      'Open Circuit Voltage (Voc)': '45.8 V',
      'Max Power Current (Imp)': '8.86 A',
      'Dimensions': '1956 × 992 × 40 mm',
      'Weight': '21.5 kg',
      'Junction Box': 'IP67 Weatherproof',
      'Warranty': '10 Yrs Product / 25 Yrs Performance'
    },
    features: [
      'Cost-effective per-watt pricing for solar pumps and rural off-grid installations',
      'Heavy-duty 40mm anodized aluminum alloy frame for rigid roof mounting',
      'High-transmission 3.2mm tempered low-iron AR coated glass',
      'Compatible with both PWM and MPPT solar charge controllers'
    ],
    inStock: true,
    popular: false
  },
  {
    id: 'surya-580-bifacial',
    name: '580W N-Type TOPCon Bifacial Glass-to-Glass Panel',
    category: 'Bifacial Panels',
    brand: 'Waaree / Tier-1 OEM',
    wattage: 580,
    wattageLabel: '580W',
    efficiency: '22.5%',
    warranty: '30 Years Linear Output',
    warrantyShort: '30 Yrs',
    price: 13800,
    priceDisplay: '₹13,400 – ₹14,200',
    unit: 'Piece',
    moq: '20 Pieces',
    image: IMG_PANEL,
    gallery: [
      { url: IMG_PANEL, label: 'Dual-Glass Bifacial Module' },
      { url: IMG_HERO, label: 'Industrial Rooftop Array' }
    ],
    description:
      'Next-generation dual-glass N-Type TOPCon bifacial module harvesting sunlight from both front and rear surfaces for up to 25% additional energy yield on reflective roofs.',
    specs: {
      'Rated Power (Pmax)': '580 Wp (+ up to 25% Rear Gain)',
      'Module Efficiency': '22.5%',
      'Cell Architecture': '144-Cell N-Type TOPCon Bifacial',
      'Bifaciality Factor': '80% ± 5%',
      'Temperature Coefficient': '-0.30% / °C',
      'Dimensions': '2278 × 1134 × 30 mm',
      'Weight': '31.5 kg',
      'Protection Rating': 'IP68 Dual Glass',
      'Warranty': '12 Yrs Product / 30 Yrs Performance'
    },
    features: [
      'Zero LID (Light Induced Degradation) with N-Type silicon wafers',
      'Superior hot-weather output with ultra-low temperature coefficient',
      'Dual-glass encapsulation eliminates backsheet weathering and moisture ingress',
      'Ideal for high-albedo white RCC roofs and elevated utility structures'
    ],
    inStock: true,
    popular: true
  },
  {
    id: 'inverter-10kw-on',
    name: '10kW Three-Phase On-Grid String Inverter',
    category: 'Solar Inverters',
    brand: 'Growatt / Sungrow',
    wattage: 10000,
    wattageLabel: '10 kW',
    efficiency: '98.6%',
    warranty: '10 Years Comprehensive',
    warrantyShort: '10 Yrs',
    price: 68000,
    priceDisplay: '₹65,000 – ₹71,000',
    unit: 'Unit',
    moq: '1 Unit',
    image: IMG_INVERTER,
    gallery: [
      { url: IMG_INVERTER, label: 'Wall-Mounted 10kW Inverter' },
      { url: IMG_HERO, label: 'Commercial Solar Integration' }
    ],
    description:
      'Transformerless three-phase grid-tied inverter with dual independent MPPT trackers, built-in Wi-Fi monitoring stick, and Type II AC/DC surge protection.',
    specs: {
      'Rated AC Output': '10,000 W (Three-Phase 415V)',
      'Max Efficiency': '98.6% (Euro 98.2%)',
      'Max DC Input Voltage': '1100 V DC',
      'MPPT Trackers': '2 Independent MPPTs',
      'Communication': 'Wi-Fi / RS485 / Smart App',
      'Dimensions': '425 × 387 × 180 mm',
      'Weight': '17.5 kg',
      'Enclosure Rating': 'IP65 Outdoor Waterproof',
      'Warranty': '10 Years Standard'
    },
    features: [
      'Dual MPPT trackers support east-west split roof orientations efficiently',
      'Live generation & fault alerts via Android/iOS mobile app',
      'Integrated DC isolator switch and anti-islanding grid safety compliance',
      'Silent fanless natural convection cooling with rugged IP65 casing'
    ],
    inStock: true,
    popular: true
  },
  {
    id: 'inverter-5kw-hybrid',
    name: '5kW Single-Phase Hybrid Solar Inverter',
    category: 'Solar Inverters',
    brand: 'Deye / Tier-1 OEM',
    wattage: 5000,
    wattageLabel: '5 kW',
    efficiency: '97.8%',
    warranty: '5 Years (Ext. 10 Yrs)',
    warrantyShort: '5 Yrs',
    price: 52000,
    priceDisplay: '₹49,500 – ₹54,000',
    unit: 'Unit',
    moq: '1 Unit',
    image: IMG_INVERTER,
    gallery: [
      { url: IMG_INVERTER, label: '5kW Hybrid Inverter Unit' },
      { url: IMG_BATTERY, label: 'Paired with 48V LiFePO4 Rack' }
    ],
    description:
      'Smart hybrid inverter combining net-metered grid export with seamless battery backup during grid outages. Compatible with both LiFePO4 lithium and tubular lead-acid banks.',
    specs: {
      'Rated AC Output': '5,000 W (Single Phase 230V)',
      'Max Efficiency': '97.8%',
      'Battery Voltage Range': '40V – 60V DC (48V Nominal)',
      'Switchover Time': '< 10 ms UPS Grade',
      'Max PV Input Power': '6,500 W (Dual MPPT)',
      'Dimensions': '480 × 330 × 210 mm',
      'Weight': '20.5 kg',
      'Enclosure Rating': 'IP65 Outdoor/Indoor',
      'Warranty': '5 Years Standard'
    },
    features: [
      'Sub-10ms UPS transfer keeps computers, Wi-Fi, and appliances running smoothly',
      'Programmable time-of-use charging and zero-export CT sensor included',
      'Native BMS communication (CAN/RS485) with 48V lithium battery racks',
      'Color LCD touch interface with built-in Wi-Fi telemetry'
    ],
    inStock: true,
    popular: true
  },
  {
    id: 'battery-lifepo4-5kwh',
    name: '5.12kWh 48V 100Ah LiFePO4 Rack Solar Battery',
    category: 'Solar Batteries',
    brand: 'Shri Surya Energy',
    wattage: 5120,
    wattageLabel: '5.12 kWh',
    efficiency: '95% Roundtrip',
    warranty: '10 Years / 6000 Cycles',
    warrantyShort: '10 Yrs',
    price: 92000,
    priceDisplay: '₹89,000 – ₹96,000',
    unit: 'Module',
    moq: '1 Module',
    image: IMG_BATTERY,
    gallery: [
      { url: IMG_BATTERY, label: 'Rack-Mount LiFePO4 Bank' },
      { url: IMG_INVERTER, label: 'Hybrid Inverter Compatibility' }
    ],
    description:
      'Grade-A prismatic Lithium Iron Phosphate (LiFePO4) energy storage module featuring an intelligent 100A BMS and stackable 19-inch rack architecture for residential and C&I backup.',
    specs: {
      'Usable Capacity': '5.12 kWh (51.2V / 100Ah)',
      'Cycle Life': '6,000+ Cycles @ 80% DoD',
      'Roundtrip Efficiency': '95%',
      'Max Discharge Current': '100A Continuous',
      'Scalability': 'Up to 15 Modules in Parallel',
      'Dimensions': '442 × 480 × 177 mm (4U)',
      'Weight': '44 kg',
      'BMS Protocol': 'CAN / RS485 / RS232',
      'Warranty': '10 Years Performance'
    },
    features: [
      'Zero maintenance, zero acid fumes, and thermally stable LFP chemistry',
      '3x faster solar recharge compared to conventional tubular lead-acid batteries',
      'Direct plug-and-play BMS sync with Deye, Growatt, Sungrow & Victron inverters',
      'Front LCD status display showing cell voltages, SoC, and temperature'
    ],
    inStock: true,
    popular: true
  },
  {
    id: 'battery-tubular-150ah',
    name: '12V 150Ah C10 Tall Tubular Solar Battery',
    category: 'Solar Batteries',
    brand: 'Luminous / Exide OEM',
    wattage: 1800,
    wattageLabel: '1.8 kWh',
    efficiency: '88% Coulombic',
    warranty: '5 Years Replacement',
    warrantyShort: '5 Yrs',
    price: 14200,
    priceDisplay: '₹13,800 – ₹14,800',
    unit: 'Unit',
    moq: '2 Units',
    image: IMG_BATTERY,
    gallery: [
      { url: IMG_BATTERY, label: 'Solar Storage Bank' },
      { url: IMG_INVERTER, label: 'PCU Backup Integration' }
    ],
    description:
      'Deep-cycle C10 rated tall tubular solar battery engineered to handle frequent daily charge-discharge cycles in areas with extended rural or semi-urban power cuts.',
    specs: {
      'Nominal Voltage': '12V DC',
      'Rated Capacity': '150 Ah @ C10 Rating',
      'Energy Storage': '1.8 kWh',
      'Plate Design': 'High-Pressure Cast Tubular',
      'Cycle Life': '1,500 Cycles @ 80% DoD',
      'Dimensions': '505 × 190 × 415 mm',
      'Weight': '54 kg (Filled)',
      'Maintenance': 'Low Antimony / Water-Level Indicators',
      'Warranty': '60 Months Warranty'
    },
    features: [
      'Engineered specifically for solar C10 slow and fast charging profiles',
      'Thick tubular gauntlet plates resist deep discharge sulfation',
      'Color-coded float indicators make electrolyte monitoring effortless',
      'Ideal for 1kVA – 5kVA off-grid home solar PCUs'
    ],
    inStock: true,
    popular: false
  },
  {
    id: 'kit-3kw-homes',
    name: '3kW Residential On-Grid Rooftop Solar Kit',
    category: 'Complete Solar Kits',
    brand: 'Shri Surya Turnkey',
    wattage: 3000,
    wattageLabel: '3 kW',
    efficiency: '21.3%',
    warranty: '25 Years System Support',
    warrantyShort: '25 Yrs',
    price: 145000,
    priceDisplay: '₹1,40,000 – ₹1,55,000',
    unit: 'Complete Kit',
    moq: '1 Kit',
    image: IMG_HERO,
    gallery: [
      { url: IMG_HERO, label: 'Completed Rooftop Installation' },
      { url: IMG_PANEL, label: '6 × 540W Mono PERC Panels' },
      { url: IMG_INVERTER, label: '3kW Wi-Fi On-Grid Inverter' }
    ],
    description:
      'Best-selling home rooftop solar package eligible for ₹78,000 PM-Surya Ghar central subsidy. Includes 6× 540W Mono PERC panels, 3kW on-grid inverter, GI structure, ACDB/DCDB, earthing & lightning arrestor.',
    specs: {
      'System Capacity': '3.24 kWp DC / 3 kW AC',
      'Avg. Daily Generation': '12 – 14 Units (kWh / day)',
      'Roof Space Required': '250 – 300 sq. ft.',
      'Monthly Bill Savings': '₹3,000 – ₹3,800 / month',
      'Subsidy Eligibility': 'Up to ₹78,000 (PM-Surya Ghar)',
      'Panels Included': '6 × 540W Mono PERC Half-Cut',
      'Inverter Included': '3kW Single-Phase IP65 Wi-Fi',
      'BOS Safety Kit': 'ACDB, DCDB, 3 Earthing Kits, LA',
      'Warranty': '25 Yrs Panels / 7 Yrs Inverter'
    },
    features: [
      'Complete turnkey supply including DISCOM net-metering paperwork support',
      'Reduces residential electricity bills by up to 85% year-round',
      'Fast 2-day installation on flat RCC roofs without waterproofing damage',
      'Real-time daily generation tracking on smartphone'
    ],
    inStock: true,
    popular: true
  },
  {
    id: 'kit-5kw-residential',
    name: '5kW Hybrid Rooftop Solar System (Panels + LiFePO4)',
    category: 'Complete Solar Kits',
    brand: 'Shri Surya Turnkey',
    wattage: 5000,
    wattageLabel: '5 kW',
    efficiency: '21.3%',
    warranty: '25 Years Panel / 10 Yrs Battery',
    warrantyShort: '25 Yrs',
    price: 275000,
    priceDisplay: '₹2,65,000 – ₹2,85,000',
    unit: 'Complete Kit',
    moq: '1 Kit',
    image: IMG_HERO,
    gallery: [
      { url: IMG_HERO, label: '5kW Turnkey Rooftop Layout' },
      { url: IMG_BATTERY, label: '5.12kWh LiFePO4 Backup' },
      { url: IMG_INVERTER, label: '5kW Hybrid Inverter' }
    ],
    description:
      'All-in-one solar + storage package for villas, clinics, and offices requiring both electricity bill savings and uninterrupted 24×7 AC backup during power outages.',
    specs: {
      'System Capacity': '5.4 kWp DC / 5 kW Hybrid AC',
      'Avg. Daily Generation': '20 – 23 Units (kWh / day)',
      'Battery Backup Included': '5.12 kWh LiFePO4 (10-Yr Life)',
      'Roof Space Required': '450 sq. ft.',
      'Phase Configuration': 'Single Phase 230V',
      'Panels Included': '10 × 540W Mono PERC',
      'Structure': 'Hot-Dip Galvanized Elevated GI',
      'Safety Gear': 'SPD Type II AC/DC, Copper Earthing',
      'Warranty': '25 Yrs Panels / 10 Yrs Lithium'
    },
    features: [
      'Runs 1.5 Ton Inverter AC, refrigerator, lights, fans, and computers seamlessly',
      'Exports excess daytime solar energy to the grid via net metering',
      'Compact wall/rack lithium battery occupies 60% less space than lead-acid',
      'Full engineering site survey and subsidy documentation included'
    ],
    inStock: true,
    popular: true
  },
  {
    id: 'surya-400-mono-half',
    name: '400W Mono PERC Compact Rooftop Panel',
    category: 'Mono PERC Panels',
    brand: 'Shri Surya Standard',
    wattage: 400,
    wattageLabel: '400W',
    efficiency: '20.8%',
    warranty: '25 Years Linear Output',
    warrantyShort: '25 Yrs',
    price: 8500,
    priceDisplay: '₹8,200 – ₹8,800',
    unit: 'Piece',
    moq: '10 Pieces',
    image: IMG_PANEL,
    gallery: [
      { url: IMG_PANEL, label: 'Compact 108-Cell Module' },
      { url: IMG_HERO, label: 'Urban Rooftop Application' }
    ],
    description:
      'Lightweight 108-cell Mono PERC panel tailored for space-constrained urban roofs, tin sheds, carports, and commercial balconies where easier handling is essential.',
    specs: {
      'Rated Power (Pmax)': '400 Wp',
      'Module Efficiency': '20.8%',
      'Cell Architecture': '108 Half-Cut Mono PERC',
      'Open Circuit Voltage (Voc)': '37.2 V',
      'Max Power Current (Imp)': '12.90 A',
      'Dimensions': '1722 × 1134 × 30 mm',
      'Weight': '20.5 kg',
      'Junction Box': 'IP68 Rated',
      'Warranty': '12 Yrs Product / 25 Yrs Performance'
    },
    features: [
      'Compact 20.5 kg frame enables easy single-technician rooftop installation',
      'Fits tight roof geometries around water tanks and parapet walls',
      'Low degradation rate (< 0.55% annually after year 1)',
      'Tested for hail impact and extreme summer thermal cycling'
    ],
    inStock: true,
    popular: false
  },
  {
    id: 'mounting-galvanized-structure',
    name: 'Hot-Dip Galvanized Elevated Solar Mounting Structure (10kW)',
    category: 'Mounting Structures',
    brand: 'Shri Surya Structures',
    wattage: 10000,
    wattageLabel: '10 kW Set',
    efficiency: '180 km/h Wind',
    warranty: '15 Years Anti-Rust',
    warrantyShort: '15 Yrs',
    price: 29500,
    priceDisplay: '₹28,000 – ₹32,000',
    unit: '10kW Kit',
    moq: '1 Kit',
    image: IMG_HERO,
    gallery: [
      { url: IMG_HERO, label: 'Elevated RCC Roof Array' },
      { url: IMG_PANEL, label: 'Precision Module Clamping' }
    ],
    description:
      'Heavy-duty 80–120 micron Hot-Dip Galvanized (HDG) steel elevated mounting structure engineered for flat RCC roofs, keeping terrace space usable underneath.',
    specs: {
      'Capacity Supported': 'Up to 10 kW (18–20 Panels)',
      'Material Grade': 'IS 2062 Mild Steel, Hot-Dip Galvanized',
      'Galvanization Coating': '80 – 120 Microns (ASTM A123)',
      'Wind Speed Rating': 'Up to 180 km/h Cyclonic Zones',
      'Tilt Angle': 'Adjustable 12° – 25° Latitude Optimized',
      'Fasteners': 'SS304 Anti-Theft Bolts & EPDM Pads',
      'Total Kit Weight': '145 kg',
      'Assembly Type': '100% Nut-Bolt (Zero Site Welding)',
      'Warranty': '15 Years Structural Corrosion'
    },
    features: [
      'Zero on-site welding preserves galvanization and prevents rust joints',
      'Includes waterproof chemical anchor fasteners and EPDM rubber base pads',
      'Elevated walkway height keeps roof usable for family or maintenance access',
      'Custom-engineered wind load drawings available for commercial projects'
    ],
    inStock: true,
    popular: false
  },
  {
    id: 'kit-50kw-industrial',
    name: '50kW Commercial & Industrial On-Grid Solar Plant',
    category: 'Complete Solar Kits',
    brand: 'Shri Surya Industrial EPC',
    wattage: 50000,
    wattageLabel: '50 kW',
    efficiency: '22.5%',
    warranty: '25 Years EPC Support',
    warrantyShort: '25 Yrs',
    price: 1850000,
    priceDisplay: 'Get Latest Price',
    unit: 'Turnkey Plant',
    moq: '1 Plant',
    image: IMG_HERO,
    gallery: [
      { url: IMG_HERO, label: '50kW Industrial Roof Installation' },
      { url: IMG_PANEL, label: '580W Bifacial TOPCon Modules' },
      { url: IMG_INVERTER, label: 'Three-Phase String Inverters' }
    ],
    description:
      'Turnkey 50kW commercial solar power plant engineered for factories, cold storages, hospitals, schools, and warehouses seeking 3-year payback and 40% Accelerated Depreciation tax benefits.',
    specs: {
      'Plant Capacity': '50 kWp AC / DC Engineered',
      'Avg. Daily Generation': '200 – 225 Units (kWh / day)',
      'Annual Generation': '~72,000 – 78,000 kWh / year',
      'Roof Space Required': '4,200 – 4,500 sq. ft.',
      'Grid Interconnect': '415V Three-Phase Net Metering',
      'Modules': '88 × 580W N-Type TOPCon Bifacial',
      'Inverter': '50kW Multi-MPPT Commercial Inverter',
      'Tax Benefit': '40% Accelerated Depreciation (Sec 32)',
      'Warranty': '25 Yrs Panels / 5 Yrs Free O&M Option'
    },
    features: [
      'Cuts commercial electricity costs by ₹6.5 – ₹8.5 Lakhs annually',
      'Complete CEIG safety approvals, DISCOM net metering, and structural audit',
      'Cloud SCADA dashboard with string-level fault diagnostics',
      'Dedicated industrial project manager and GST input tax credit invoice'
    ],
    inStock: true,
    popular: true
  }
];

export const CATEGORIES = [
  'All Categories',
  'Mono PERC Panels',
  'Polycrystalline Panels',
  'Bifacial Panels',
  'Solar Inverters',
  'Solar Batteries',
  'Mounting Structures',
  'Complete Solar Kits'
] as const;

export const FAQ_LIST = [
  {
    q: 'How much government subsidy is available for residential rooftop solar?',
    a: 'Under the PM-Surya Ghar Muft Bijli Yojana, homeowners receive a direct bank transfer subsidy of ₹30,000 for 1 kW, ₹60,000 for 2 kW, and ₹78,000 for 3 kW or larger residential rooftop systems. Shri Surya Solar handles the entire national portal registration, technical feasibility, and subsidy claim paperwork.'
  },
  {
    q: 'How does net metering work and how much can I save on electricity bills?',
    a: 'Net metering uses a bi-directional meter to record both the electricity you draw from the grid and the surplus solar power your rooftop sends back. At the end of each billing cycle, exported units offset your consumption. Most residential and commercial clients cut their electricity bills by 80% to 90%.'
  },
  {
    q: 'What warranties cover solar panels, inverters, and batteries?',
    a: 'All Tier-1 Mono PERC and TOPCon Bifacial solar panels carry a 12-year product warranty and a 25 to 30-year linear power output warranty. Grid-tied solar inverters include 5 to 10-year manufacturer warranties, and our LiFePO4 lithium battery banks carry a 10-year / 6,000-cycle warranty.'
  },
  {
    q: 'How long does delivery and installation take after placing an order?',
    a: 'Orders across Dehradun and Saharanpur dispatch within 24–48 hours with insured local delivery. For turnkey rooftop installations (3 kW to 10 kW), physical mounting and electrical commissioning take 2 to 3 working days. DISCOM net-meter installation typically completes within 2 to 4 weeks depending on your local utility.'
  },
  {
    q: 'What maintenance does a solar power plant require?',
    a: 'Solar systems have no moving parts and require minimal upkeep. Simply rinsing dust off the panels with clean water every 15–20 days keeps generation at peak efficiency. For commercial and industrial plants, we also offer scheduled Annual Maintenance Contracts (AMC) with thermal inspection and remote generation tracking.'
  }
];

export const TESTIMONIALS = [
  {
    name: 'Col. Rajesh Sharma (Retd.)',
    role: 'Homeowner — 5kW Hybrid Rooftop System',
    location: 'Pune, Maharashtra',
    metric: 'Bill reduced from ₹6,200 to ₹420/mo',
    text: 'Shri Surya Solar completed our 5kW rooftop installation in just two days with clean concealed cabling and zero roof seepage. Their team handled our net metering and PM-Surya Ghar subsidy effortlessly, and our monthly bill dropped by over 90%.'
  },
  {
    name: 'Vikram Singhal',
    role: 'Managing Director, Apex Packaging Industries',
    location: 'Ahmedabad, Gujarat',
    metric: '50kW Plant · 2.9 Year Payback',
    text: 'We commissioned a 50kW industrial plant for our manufacturing unit. Generation has consistently beat initial estimates by 8%, GST invoicing and CEIG approvals were seamless, and our factory power costs dropped by nearly ₹7.5 Lakhs in year one.'
  },
  {
    name: 'Sunita Agarwal',
    role: 'Managing Partner, Heritage Courtyard Resort',
    location: 'Indore, Madhya Pradesh',
    metric: '20kW Mono PERC + Inverter Upgrade',
    text: 'As a hospitality business with heavy daytime air-conditioning loads, switching to Shri Surya Solar was our highest-ROI capital upgrade. Genuine Tier-1 modules, prompt technical support, and transparent pricing throughout.'
  }
];
