export const products = [
  {
    id: 'wild-alaskan-salmon',
    name: 'Wild Alaskan Salmon',
    scientificName: 'Oncorhynchus spp.',
    shortDescription: 'Premium wild-caught salmon from pristine Alaskan waters',
    forms: ['Whole', 'Fillet', 'Steak', 'Portions'],
    image: 'https://images.pexels.com/photos/3029526/pexels-photo-3029526.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    fullDescription: 'Our Wild Alaskan Salmon is sourced from the cold, pristine waters of Alaska during peak season. Rich in Omega-3 fatty acids, this premium fish offers exceptional flavor and texture. Available year-round through our advanced freezing technology.',
    specifications: {
      origin: 'Alaska, USA',
      season: 'May - September (Fresh), Year-round (Frozen)',
      packaging: 'IQF, Vacuum Sealed, Bulk',
      certifications: ['MSC Certified', 'BAP', 'ISO 22000']
    }
  },
  {
    id: 'black-tiger-shrimp',
    name: 'Black Tiger Shrimp',
    scientificName: 'Penaeus monodon',
    shortDescription: 'Large, succulent tiger shrimp with distinctive striping',
    forms: ['HOSO', 'HLSO', 'PD', 'PDTO', 'Cooked'],
    image: 'https://images.unsplash.com/photo-1756364084889-9a8d9ece6112?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTN8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHNocmltcCUyMHJhdyUyMHNlYWZvb2R8ZW58MHx8fHwxNzcxODU5MDM1fDA&ixlib=rb-4.1.0&q=85',
    fullDescription: 'Black Tiger Shrimp are known for their large size and sweet, firm meat. Carefully farmed and processed to maintain freshness, these shrimp are perfect for high-end restaurants and seafood distributors.',
    specifications: {
      origin: 'Southeast Asia',
      sizes: '16/20, 21/25, 26/30, 31/40 per kg',
      packaging: 'IQF 1kg/2kg blocks, Retail packs',
      certifications: ['ASC', 'BAP', 'HACCP']
    }
  },
  {
    id: 'yellowfin-tuna',
    name: 'Yellowfin Tuna',
    scientificName: 'Thunnus albacares',
    shortDescription: 'Sashimi-grade tuna with vibrant red flesh',
    forms: ['Whole', 'Loin', 'Steak', 'Saku Block'],
    image: 'https://images.unsplash.com/photo-1770839112008-f6a165687cca?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHNhbG1vbiUyMGZpbGxldCUyMHJhdyUyMHNlYWZvb2R8ZW58MHx8fHwxNzcxODU5MDM2fDA&ixlib=rb-4.1.0&q=85',
    fullDescription: 'Our Yellowfin Tuna is line-caught and immediately processed to preserve its premium quality. Perfect for sashimi, sushi, and high-end culinary applications. Deep red color and buttery texture.',
    specifications: {
      origin: 'Pacific Ocean',
      grade: 'Sashimi Grade, #1, #2+',
      packaging: 'Vacuum sealed, CO treated options',
      certifications: ['Dolphin Safe', 'MSC', 'ISO 22000']
    }
  },
  {
    id: 'atlantic-cod',
    name: 'Atlantic Cod',
    scientificName: 'Gadus morhua',
    shortDescription: 'Mild, flaky white fish perfect for versatile cooking',
    forms: ['Whole', 'Fillet', 'Loin', 'Portion'],
    image: 'https://images.pexels.com/photos/3029526/pexels-photo-3029526.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    fullDescription: 'Atlantic Cod from the cold North Atlantic waters offers a mild, sweet flavor and firm, flaky texture. A versatile fish suitable for various cooking methods and cuisines.',
    specifications: {
      origin: 'North Atlantic',
      season: 'Year-round',
      packaging: 'Skin-on/off, Boneless, IQF',
      certifications: ['MSC Certified', 'HACCP']
    }
  },
  {
    id: 'king-crab',
    name: 'King Crab',
    scientificName: 'Paralithodes camtschaticus',
    shortDescription: 'Premium sweet and tender crab meat',
    forms: ['Whole', 'Legs & Claws', 'Meat Only'],
    image: 'https://images.unsplash.com/photo-1756364084889-9a8d9ece6112?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTN8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHNocmltcCUyMHJhdyUyMHNlYWZvb2R8ZW58MHx8fHwxNzcxODU5MDM1fDA&ixlib=rb-4.1.0&q=85',
    fullDescription: 'Our King Crab is harvested from the icy waters of the Bering Sea. Known for its sweet, tender meat and impressive size, this premium product is perfect for luxury markets.',
    specifications: {
      origin: 'Bering Sea, Alaska',
      sizes: '9-12 lbs, 12-14 lbs, 14+ lbs',
      packaging: 'Frozen sections, Cooked/Raw',
      certifications: ['MSC', 'RFM']
    }
  },
  {
    id: 'sea-scallops',
    name: 'Sea Scallops',
    scientificName: 'Placopecten magellanicus',
    shortDescription: 'Sweet, buttery scallops with delicate texture',
    forms: ['IQF', 'Dry Pack', 'Wet Pack'],
    image: 'https://images.pexels.com/photos/3029526/pexels-photo-3029526.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    fullDescription: 'Premium sea scallops hand-harvested and quickly processed. Dry pack scallops contain no added water or chemicals, ensuring maximum flavor and perfect searing.',
    specifications: {
      origin: 'North Atlantic',
      sizes: 'U10, 10/20, 20/30 per lb',
      packaging: 'IQF, 5lb bags, Bulk',
      certifications: ['MSC', 'HACCP', 'BAP']
    }
  },
  {
    id: 'mahi-mahi',
    name: 'Mahi Mahi',
    scientificName: 'Coryphaena hippurus',
    shortDescription: 'Firm, lean white fish with mild sweet flavor',
    forms: ['Whole', 'Fillet', 'Portion', 'Steak'],
    image: 'https://images.unsplash.com/photo-1770839112008-f6a165687cca?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHNhbG1vbiUyMGZpbGxldCUyMHJhdyUyMHNlYWZvb2R8ZW58MHx8fHwxNzcxODU5MDM2fDA&ixlib=rb-4.1.0&q=85',
    fullDescription: 'Wild-caught Mahi Mahi offers a firm texture and mildly sweet taste. This sustainable fish is perfect for grilling, baking, and pan-searing. Popular in restaurants worldwide.',
    specifications: {
      origin: 'Pacific & Atlantic',
      season: 'Year-round',
      packaging: 'Skin-on/off, Boneless, Vacuum sealed',
      certifications: ['FIP Certified', 'HACCP']
    }
  },
  {
    id: 'octopus',
    name: 'Octopus',
    scientificName: 'Octopus vulgaris',
    shortDescription: 'Tender, flavorful cephalopod for gourmet dishes',
    forms: ['Whole', 'Tentacles', 'Pre-cooked'],
    image: 'https://images.unsplash.com/photo-1756364084889-9a8d9ece6112?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTN8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHNocmltcCUyMHJhdyUyMHNlYWZvb2R8ZW58MHx8fHwxNzcxODU5MDM1fDA&ixlib=rb-4.1.0&q=85',
    fullDescription: 'Our octopus is carefully processed and available fresh or pre-cooked for convenience. Known for its tender texture when properly prepared, ideal for Mediterranean and Asian cuisines.',
    specifications: {
      origin: 'Mediterranean, Atlantic',
      sizes: '500-1000g, 1-2kg, 2-3kg',
      packaging: 'IQF, Vacuum sealed, Bulk',
      certifications: ['HACCP', 'ISO 22000']
    }
  },
  {
    id: 'red-snapper',
    name: 'Red Snapper',
    scientificName: 'Lutjanus campechanus',
    shortDescription: 'Premium white fish with sweet, nutty flavor',
    forms: ['Whole', 'Fillet', 'Scaled & Gutted'],
    image: 'https://images.pexels.com/photos/3029526/pexels-photo-3029526.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    fullDescription: 'Red Snapper is prized for its firm, moist flesh and distinctive sweet, nutty flavor. Perfect for grilling, steaming, or pan-frying. A favorite in upscale dining establishments.',
    specifications: {
      origin: 'Gulf of Mexico, Caribbean',
      sizes: '1-2 lbs, 2-3 lbs, 3+ lbs',
      packaging: 'Whole on ice, Fillet vacuum sealed',
      certifications: ['Gulf Wild', 'HACCP']
    }
  },
  {
    id: 'blue-mussels',
    name: 'Blue Mussels',
    scientificName: 'Mytilus edulis',
    shortDescription: 'Plump, sweet mussels perfect for steaming',
    forms: ['Live', 'IQF Half Shell', 'Meat Only'],
    image: 'https://images.unsplash.com/photo-1770839112008-f6a165687cca?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHNhbG1vbiUyMGZpbGxldCUyMHJhdyUyMHNlYWZvb2R8ZW58MHx8fHwxNzcxODU5MDM2fDA&ixlib=rb-4.1.0&q=85',
    fullDescription: 'Farm-raised Blue Mussels are sustainably grown and carefully cleaned. These plump, sweet mussels are perfect for classic preparations and modern culinary creations.',
    specifications: {
      origin: 'North Atlantic, Prince Edward Island',
      sizes: 'Small, Medium, Large',
      packaging: 'Mesh bags, IQF, Retail packs',
      certifications: ['ASC', 'BAP', 'Organic options']
    }
  }
];