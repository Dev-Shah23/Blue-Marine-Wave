// ──────────────────────────────────────────────────────────────
// Blue Wave Marine — Master Product Catalog (single source of truth)
// Feeds: homepage grid, /catalog grid + filters, slideshow,
//        product modal, product detail page, and the quote form.
// Every product is sourced and processed in India (Origin: India).
// Order is curated so the homepage featured row (first 3) and the
// showcase (first 5) span all categories for visual variety.
// ──────────────────────────────────────────────────────────────
import yellowfinTuna from '../assets/products/yellowfin-tuna.jpg';
import vannameiShrimp from '../assets/products/vannamei-shrimp.jpg';
import squidWhole from '../assets/products/squid-whole.jpg';
import indianMackerel from '../assets/products/indian-mackerel.jpg';
import mahiMahi from '../assets/products/mahi-mahi.jpg';
import squidWholeCleaned from '../assets/products/squid-whole-cleaned.jpg';
import squidRings from '../assets/products/squid-rings.jpg';
import cuttlefishWhole from '../assets/products/cuttlefish-whole.jpg';
import cuttlefishWholeCleaned from '../assets/products/cuttlefish-whole-cleaned.jpg';

// Catalog category taxonomy (drives the catalog filter sidebar)
export const CATEGORIES = ['Finfish', 'Shrimp', 'Cephalopods'];

export const products = [
  {
    id: 'yellowfin-tuna',
    name: 'Yellowfin Tuna',
    category: 'Finfish',
    shortDescription: 'Deep-water yellowfin with firm, ruby-red meat for premium export markets.',
    forms: ['Whole', 'Loin', 'Steak'],
    image: yellowfinTuna,
    fullDescription:
      'Line-caught from the warm waters of the Indian Ocean, our Yellowfin Tuna is graded for colour, firmness and fat content, then blast-frozen to lock in sashimi-grade quality. Available whole or cut to your specification for global distribution.',
    specifications: {
      origin: 'India',
      grade: 'Export Grade A / Sashimi',
      sizes: '10–20 kg, 20–40 kg, 40 kg+',
      packaging: 'IQF, Vacuum Sealed, Bulk',
    },
  },
  {
    id: 'vannamei-shrimp',
    name: 'Vannamei Shrimp',
    category: 'Shrimp',
    shortDescription: 'Farm-raised vannamei with consistent sizing, firm meat and clean flavour.',
    forms: ['HOSO', 'HLSO', 'PD', 'PDTO', 'Cooked'],
    image: vannameiShrimp,
    fullDescription:
      'Responsibly farmed in Indian aquaculture estates and processed to international standards, our Vannamei Shrimp offers reliable count consistency and excellent yield. Available raw or cooked, in any peeled or shell-on format.',
    specifications: {
      origin: 'India',
      grade: 'Export Grade',
      sizes: '16/20, 21/25, 26/30, 31/40, 41/50 per kg',
      packaging: 'IQF, 1kg/2kg Blocks, Retail Packs',
    },
  },
  {
    id: 'squid-whole',
    name: 'Squid (Whole)',
    category: 'Cephalopods',
    shortDescription: 'Fresh whole squid, fast-frozen at catch for tender, sweet texture.',
    forms: ['Whole'],
    image: squidWhole,
    fullDescription:
      'Harvested along the Indian coastline and processed within hours of landing, our whole squid retains its natural sweetness and firm bite. Ideal for buyers who clean and portion in-market.',
    specifications: {
      origin: 'India',
      grade: 'Export Grade',
      sizes: 'U5, 5/10, 10/20, 20/40 cm',
      packaging: 'Block Frozen, IQF',
    },
  },
  {
    id: 'indian-mackerel',
    name: 'Indian Mackerel',
    category: 'Finfish',
    shortDescription: 'Wild-caught Indian mackerel, rich in Omega-3 with a bold, distinctive flavour.',
    forms: ['Whole', 'Whole Round'],
    image: indianMackerel,
    fullDescription:
      'A staple of the Arabian Sea, our Indian Mackerel is flash-frozen whole-round to preserve its high oil content and firm flesh. Perfect for grilling, canning and curry-cut markets across Asia, Africa and the Middle East.',
    specifications: {
      origin: 'India',
      grade: 'Export Grade',
      sizes: '4–6, 6–8, 8–10, 10–12 pcs/kg',
      packaging: 'Block Frozen, IQF',
    },
  },
  {
    id: 'mahi-mahi',
    name: 'Mahi Mahi',
    category: 'Finfish',
    shortDescription: 'Lean, mild white-fleshed mahi mahi with a clean flavour and firm flake.',
    forms: ['Whole', 'Fillet', 'Portions', 'Loin'],
    image: mahiMahi,
    fullDescription:
      'Caught in the Indian Ocean, our Mahi Mahi (dorado) offers versatile, lean white meat that holds beautifully on the grill or pan. Available whole or skin-on/skinless fillets and portions to specification.',
    specifications: {
      origin: 'India',
      grade: 'Export Grade A',
      sizes: '1–3 kg, 3–5 kg, 5 kg+',
      packaging: 'IQF, Vacuum Sealed, Bulk',
    },
  },
  {
    id: 'squid-whole-cleaned',
    name: 'Squid (Whole Cleaned)',
    category: 'Cephalopods',
    shortDescription: 'Whole cleaned squid tubes — skinned, gutted and ready to cook.',
    forms: ['Whole Cleaned'],
    image: squidWholeCleaned,
    fullDescription:
      'Our whole cleaned squid is hand-processed to remove the skin, head and viscera, leaving a pristine tube ready for the kitchen. A labour-saving, high-yield format trusted by HORECA and retail importers.',
    specifications: {
      origin: 'India',
      grade: 'Export Grade',
      sizes: 'U5, 5/10, 10/20, 20/40 cm',
      packaging: 'IQF, Interleaved, Vacuum',
    },
  },
  {
    id: 'squid-rings',
    name: 'Squid Rings',
    category: 'Cephalopods',
    shortDescription: 'Uniformly cut squid rings — portion-ready for fryers and food service.',
    forms: ['Rings'],
    image: squidRings,
    fullDescription:
      'Cut from cleaned squid tubes to a consistent width, our squid rings are IQF-frozen for free-flow convenience. A high-demand value-added format for quick-service restaurants and retail calamari programmes.',
    specifications: {
      origin: 'India',
      grade: 'Export Grade',
      sizes: '3/5 cm, 5/8 cm rings',
      packaging: 'IQF, Retail Packs, Bulk',
    },
  },
  {
    id: 'cuttlefish-whole',
    name: 'Cuttlefish (Whole)',
    category: 'Cephalopods',
    shortDescription: 'Whole cuttlefish, fast-frozen to preserve firm texture and bright colour.',
    forms: ['Whole'],
    image: cuttlefishWhole,
    fullDescription:
      'Our whole cuttlefish is sourced from Indian waters and frozen at peak freshness. Prized in Mediterranean and East-Asian cuisines, it delivers a meaty bite and excellent processing yield.',
    specifications: {
      origin: 'India',
      grade: 'Export Grade',
      sizes: 'U5, 5/10, 10/20, 20/40 cm',
      packaging: 'Block Frozen, IQF',
    },
  },
  {
    id: 'cuttlefish-whole-cleaned',
    name: 'Cuttlefish (Whole Cleaned)',
    category: 'Cephalopods',
    shortDescription: 'Cleaned cuttlefish — bone, ink and skin removed, ready to portion.',
    forms: ['Whole Cleaned'],
    image: cuttlefishWholeCleaned,
    fullDescription:
      'Hand-cleaned to remove the cuttlebone, ink sac and skin, our whole cleaned cuttlefish is a premium, high-yield format. Delivered IQF for consistent quality from our facility to your market.',
    specifications: {
      origin: 'India',
      grade: 'Export Grade',
      sizes: 'U5, 5/10, 10/20, 20/40 cm',
      packaging: 'IQF, Interleaved, Vacuum',
    },
  },
];
