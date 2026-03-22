import salmonCatalog from '../fwdphotos/salmon_catalog.png';
import crabCatalog from '../fwdphotos/crab_catalog.png';
import mackerelCatalog from '../fwdphotos/mackrel_catalog.png';
import prawnsCatalog from '../fwdphotos/prawns_catalog.png';
import squidCatalog from '../fwdphotos/squid_photo_catalog.png';
import shrimpCatalog from '../fwdphotos/shrimp_catalog.png';

export const products = [
  {
    id: 'atlantic-salmon',
    name: 'Atlantic Salmon',
    scientificName: 'Salmo salar',
    shortDescription: 'Premium salmon with rich flavor and firm texture',
    forms: ['Whole', 'Fillet', 'Steak', 'Portions'],
    image: salmonCatalog,
    fullDescription: 'Our Atlantic Salmon is sourced from cold, pristine waters, offering exceptional flavor and high Omega-3 content. Perfectly processed and frozen to lock in freshness.',
    specifications: {
      origin: 'North Atlantic',
      season: 'Year-round',
      packaging: 'IQF, Vacuum Sealed, Bulk',
      certifications: ['ASC Certified', 'BAP', 'ISO 22000']
    }
  },
  {
    id: 'king-crab',
    name: 'King Crab',
    scientificName: 'Paralithodes camtschaticus',
    shortDescription: 'Premium sweet and tender crab meat from icy waters',
    forms: ['Whole', 'Legs & Claws', 'Meat Only'],
    image: crabCatalog,
    fullDescription: 'Harvested from the icy waters of the Bering Sea, our King Crab is known for its sweet, tender meat and impressive size. Perfect for luxury markets and high-end dining.',
    specifications: {
      origin: 'Bering Sea, Alaska',
      sizes: '9-12 lbs, 12-14 lbs, 14+ lbs',
      packaging: 'Frozen sections, Cooked/Raw',
      certifications: ['MSC', 'RFM']
    }
  },
  {
    id: 'pacific-mackerel',
    name: 'Pacific Mackerel',
    scientificName: 'Scomber japonicus',
    shortDescription: 'Wild caught mackerel with rich, distinctive flavor',
    forms: ['Whole Round', 'HGT', 'Fillet'],
    image: mackerelCatalog,
    fullDescription: 'Rich in healthy fats and packed with flavor, our wild-caught Pacific Mackerel is a versatile choice for grilling, smoking, or canning. Flash-frozen to preserve quality.',
    specifications: {
      origin: 'Pacific Ocean',
      season: 'Winter/Spring',
      packaging: 'Block frozen, IQF',
      certifications: ['HACCP', 'ISO 22000']
    }
  },
  {
    id: 'tiger-prawns',
    name: 'Tiger Prawns',
    scientificName: 'Penaeus monodon',
    shortDescription: 'Extra large, succulent prawns with firm meat',
    forms: ['HOSO', 'HLSO', 'PD', 'PDTO'],
    image: prawnsCatalog,
    fullDescription: 'Our Tiger Prawns are known for their massive size and firm, sweet meat. Carefully processed to maintain their striking appearance and exceptional quality.',
    specifications: {
      origin: 'Southeast Asia',
      sizes: '8/12, 13/15, 16/20 per kg',
      packaging: 'IQF blocks, Retail packs',
      certifications: ['ASC', 'BAP', 'HACCP']
    }
  },
  {
    id: 'premium-squid',
    name: 'Premium Squid',
    scientificName: 'Loligo vulgaris',
    shortDescription: 'Tender, sweet calamari perfect for any preparation',
    forms: ['Whole Round', 'Cleaned Tubes', 'Rings & Tentacles'],
    image: squidCatalog,
    fullDescription: 'Our premium squid is quickly processed after catch to guarantee the most tender texture. Ideal for frying, grilling, or culinary preparations in Mediterranean and Asian cuisines.',
    specifications: {
      origin: 'Mediterranean',
      sizes: 'U10, 10/20, 20/40 cm',
      packaging: 'Block frozen, IQF rings',
      certifications: ['HACCP', 'ISO 22000']
    }
  },
  {
    id: 'black-tiger-shrimp',
    name: 'Black Tiger Shrimp',
    scientificName: 'Penaeus monodon',
    shortDescription: 'Export quality stripe-patterned tiger shrimp',
    forms: ['HOSO', 'HLSO', 'Cooked'],
    image: shrimpCatalog,
    fullDescription: 'Black Tiger Shrimp deliver sweet, firm meat. Carefully farmed and processed to maintain maximum freshness, perfect for high-end restaurants.',
    specifications: {
      origin: 'Southeast Asia',
      sizes: '21/25, 26/30, 31/40 per kg',
      packaging: 'IQF 1kg/2kg blocks',
      certifications: ['ASC', 'BAP', 'HACCP']
    }
  }
];