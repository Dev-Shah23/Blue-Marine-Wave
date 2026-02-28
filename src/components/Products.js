import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { products } from "../data/products";
import { useNavigate } from "react-router-dom";

export default function Products({ onProductClick }) {
  // Only show first 3 products (one row)
  const displayProducts = products.slice(0, 3);
  const navigate = useNavigate();

  // Track image load state for lens focus animation
  const [loadedImages, setLoadedImages] = useState({});

  const handleImageLoad = (id) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };


  return (
    <section
      id="products"
      className="py-24 px-4 md:px-8 lg:px-16 w-full bg-[var(--products-bg)] relative overflow-hidden transition-colors duration-500"
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#2d3748 1px, transparent 1px), linear-gradient(90deg, #2d3748 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-20 text-center">
          <span className="text-[#cca43b] tracking-[0.3em] text-xs font-bold uppercase mb-4 block">
            Global Export Standards
          </span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight mb-6 text-[var(--text-primary)]">
            Premium Industrial <br />
            <span className="text-[var(--text-secondary)]">Inventory</span>
          </h2>

          <div className="w-16 h-1 bg-[#cca43b] mx-auto"></div>
        </div>

        {/* Grid – ONLY ONE ROW */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {displayProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.2, 0.8, 0.2, 1] }}
              onClick={() => onProductClick(product)}
              className="group bg-[var(--product-bg)] border border-[var(--product-border)] flex flex-col h-full relative overflow-hidden transition-all duration-300 hover:border-[var(--accent-gold)] hover:-translate-y-2 hover:shadow-[var(--product-hover-shadow)] cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-72 overflow-hidden border-b border-[var(--product-border)] bg-slate-900 animate-shimmer-skeleton">
                <img
                  src={product.image}
                  alt={product.name}
                  className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-95 contrast-105 ${
                    loadedImages[product.id] ? "animate-lens-focus" : "opacity-0"
                  }`}
                  loading="lazy"
                  onLoad={() => handleImageLoad(product.id)}
                />

                <div className="absolute top-4 left-4 bg-[#0A2240]/90 backdrop-blur border border-[#1e2a3b] px-3 py-1">
                  <span className="text-[10px] font-bold tracking-widest text-white uppercase">
                    Export Grade
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex-grow flex flex-col">
                <div className="mb-6 border-b border-[var(--product-border)] pb-6">
                  <h3 className="text-3xl font-bold text-[var(--text-primary)] uppercase tracking-tight mb-2">
                    {product.name}
                  </h3>

                  {product.scientificName && (
                    <p className="text-[var(--text-tertiary)] text-sm italic">
                      {product.scientificName}
                    </p>
                  )}
                </div>

                {/* Short Description */}
                <p className="text-[var(--text-secondary)] text-sm mb-6 flex-grow">
                  {product.shortDescription}
                </p>

                {/* Available Forms */}
                <div className="mb-8 space-y-2">
                  {product.forms.slice(0, 3).map((form) => (
                    <div
                      key={form}
                      className="flex justify-between text-xs border-b border-[var(--product-border)] pb-2"
                    >
                      <span className="text-[var(--text-tertiary)] font-medium">
                        Processing
                      </span>
                      <span className="text-[var(--text-secondary)] font-bold uppercase tracking-wide">
                        {form}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Button */}
                <button className="relative overflow-hidden w-full border border-[var(--product-border)] text-[var(--text-primary)] py-4 px-6 uppercase text-xs font-bold tracking-[0.2em] flex items-center justify-between transition-all duration-300 hover:bg-[var(--accent-gold)] hover:text-[var(--btn-text)] hover:border-[var(--accent-gold)] group/btn animate-pulse-click">
                  <span className="relative z-10 flex items-center justify-between w-full">
                    View Specs
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 animate-shimmer opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Button */}
        <div className="text-center">
          <button
            onClick={() => navigate("/catalog")}
            className="inline-flex items-center justify-center bg-[var(--btn-bg)] hover:brightness-90 text-[var(--btn-text)] px-10 py-5 uppercase font-bold tracking-[0.15em] transition-all duration-300 transform hover:-translate-y-1 shadow-[0_10px_30px_-10px_rgba(204,164,59,0.3)]">
            View More Products
          </button>
        </div>
      </div>
    </section>
  );
}