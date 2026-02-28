import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ProductModal from "../ProductModal";

const products = [
  { id: 0, name: "Wild Alaskan Salmon",   region: "North Atlantic",  certified: true,  image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=600&auto=format&fit=crop" },
  { id: 1, name: "Black Tiger Shrimp",    region: "Pacific Coast",   certified: true,  image: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?q=80&w=600&auto=format&fit=crop" },
  { id: 2, name: "Yellowfin Tuna",        region: "Mediterranean",   certified: false, image: "https://images.unsplash.com/photo-1598514982777-1e9a1e3f0ad4?q=80&w=600&auto=format&fit=crop" },
  { id: 3, name: "Atlantic Cod",          region: "North Atlantic",  certified: true,  image: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?q=80&w=600&auto=format&fit=crop" },
  { id: 4, name: "King Crab",             region: "Arctic Circle",   certified: true,  image: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?q=80&w=600&auto=format&fit=crop" },
  { id: 5, name: "Sea Scallops",          region: "Pacific Coast",   certified: false, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=600&auto=format&fit=crop" },
];

const ALL_REGIONS = ["North Atlantic", "Pacific Coast", "Mediterranean", "Arctic Circle"];

export default function CatalogGrid() {
  const [loadedImages, setLoadedImages] = useState({});
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [mscOnly, setMscOnly] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleImageLoad = (id) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  const toggleRegion = (region) => {
    setSelectedRegions((prev) =>
      prev.includes(region) ? prev.filter((r) => r !== region) : [...prev, region]
    );
  };

  const filteredProducts = products.filter((p) => {
    const regionMatch = selectedRegions.length === 0 || selectedRegions.includes(p.region);
    const certMatch = !mscOnly || p.certified;
    return regionMatch && certMatch;
  });

  return (
    <div className="bg-gradient-to-b from-[#050D1A] to-[#0A2240] text-white min-h-screen">

      {/* ================= PRODUCT GRID SECTION ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20 flex flex-col lg:flex-row gap-12">

        {/* FILTER SIDEBAR */}
        <aside className="lg:w-64">
          <div className="sticky top-28 bg-[#0f172a]/50 backdrop-blur-md border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-6">Filters</h3>

            {/* Active filter count badge */}
            {(selectedRegions.length > 0 || mscOnly) && (
              <button
                onClick={() => { setSelectedRegions([]); setMscOnly(false); }}
                className="mb-4 text-xs text-[#C9A84C] border border-[#C9A84C]/40 px-3 py-1 rounded-full hover:bg-[#C9A84C]/10 transition-colors"
              >
                Clear all filters ×
              </button>
            )}

            <div className="mb-6">
              <p className="text-sm uppercase text-sky-400 mb-3">Region</p>
              {ALL_REGIONS.map((region) => (
                <label
                  key={region}
                  className="flex items-center gap-2 mb-2 text-sm text-gray-300 cursor-pointer hover:text-white transition-colors"
                >
                  <input
                    type="checkbox"
                    className="accent-sky-400 cursor-pointer"
                    checked={selectedRegions.includes(region)}
                    onChange={() => toggleRegion(region)}
                  />
                  {region}
                </label>
              ))}
            </div>

            <div>
              <p className="text-sm uppercase text-sky-400 mb-3">Certification</p>
              <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer hover:text-white transition-colors">
                <input
                  type="checkbox"
                  className="accent-sky-400 cursor-pointer"
                  checked={mscOnly}
                  onChange={() => setMscOnly((v) => !v)}
                />
                MSC Certified
              </label>
            </div>
          </div>
        </aside>

        {/* PRODUCT GRID */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <p className="text-lg font-semibold mb-2">No products match your filters</p>
              <button
                onClick={() => { setSelectedRegions([]); setMscOnly(false); }}
                className="text-sm text-[#C9A84C] hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
                    className="group bg-[#0f172a]/40 border border-white/10 rounded-xl flex flex-col h-full relative overflow-hidden transition-all duration-300 hover:border-[#C9A84C]/50 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(201,168,76,0.15)] cursor-pointer"
                  >
                    <div className="relative h-56 border-b border-[#1e2a3b] bg-slate-900 overflow-hidden">
                      <img
                        src={product.image}
                        className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-95 contrast-105 ${
                          loadedImages[product.id] ? "opacity-100" : "opacity-0"
                        }`}
                        alt={product.name}
                        loading="lazy"
                        onLoad={() => handleImageLoad(product.id)}
                      />
                      {product.certified && (
                        <span className="absolute top-3 right-3 bg-sky-500/80 backdrop-blur text-xs font-bold px-2 py-1 rounded-full text-white">
                          MSC
                        </span>
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-semibold group-hover:text-[#C9A84C] transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-gray-400 text-sm mt-2 flex-grow">
                        Region: {product.region}
                      </p>
                      <button 
                        onClick={() => setSelectedProduct(product)}
                        className="relative overflow-hidden w-full mt-6 border border-[var(--product-border)] text-[var(--text-primary)] py-3 px-4 uppercase text-xs font-bold tracking-[0.2em] flex items-center justify-between transition-all duration-300 hover:bg-[var(--accent-gold)] hover:text-[var(--btn-text)] hover:border-[var(--accent-gold)] group/btn"
                      >
                        <span className="relative z-10 flex items-center justify-between w-full">
                          View Specs
                          <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                        </span>
                        <div className="absolute inset-0 animate-shimmer opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

      </section>
      
      {/* Product Modal */}
      <ProductModal 
        product={selectedProduct} 
        isOpen={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)} 
      />
    </div>
  );
}