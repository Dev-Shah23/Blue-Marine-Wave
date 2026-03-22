import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Info, ChevronRight } from "lucide-react";

export default function ProductModal({ product, isOpen, onClose }) {
  if (!product) return null;

  const scrollToContact = () => {
    onClose();
    setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-[var(--card-bg)] w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-3xl shadow-2xl border border-[var(--card-border)]/30 flex flex-col pointer-events-auto relative">
              
              {/* Close Button */}
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full bg-black/10 hover:bg-black/20 text-[var(--text-primary)] transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex flex-col lg:flex-row h-full overflow-y-auto lg:overflow-hidden">
                {/* Image Section */}
                <div className="lg:w-1/2 relative h-[300px] lg:h-auto overflow-hidden bg-slate-900">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="absolute top-0 left-0 w-full h-full object-cover object-center"
                  />
                  <div 
                    className="absolute bottom-0 left-0 right-0 h-[60%] pointer-events-none"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }} 
                  />
                  
                  <div className="absolute bottom-[24px] left-[24px] right-[24px] text-white z-10">
                    <p className="text-[var(--accent-gold)] text-xs font-bold uppercase tracking-[0.2em] mb-2 drop-shadow-md">Detailed Specifications</p>
                    <h2 className="text-3xl md:text-5xl font-bold font-serif leading-tight drop-shadow-xl">{product.name}</h2>
                    {product.scientificName && (
                      <p className="text-slate-300 italic text-sm mt-2 drop-shadow-md">{product.scientificName}</p>
                    )}
                  </div>
                </div>

                {/* Content Section */}
                <div className="lg:w-1/2 p-8 md:p-12 overflow-y-auto bg-[var(--card-bg)] custom-scrollbar transition-colors duration-500">
                  <div className="space-y-10">
                    {/* Brief */}
                    <div className="flex gap-4 items-start bg-[var(--accent-gold)]/5 p-6 rounded-2xl border border-[var(--accent-gold)]/10">
                      <Info className="w-6 h-6 text-[var(--accent-gold)] flex-shrink-0 mt-1" />
                      <p className="text-[var(--text-secondary)] text-sm leading-relaxed italic">
                        {product.shortDescription}
                      </p>
                    </div>

                    {/* Forms & Specs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-[var(--accent-gold)] text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Processing Forms</h4>
                        <div className="flex flex-wrap gap-2">
                          {product.forms.map(form => (
                            <span 
                              key={form} 
                              className="px-3 py-1.5 bg-[var(--text-primary)]/5 rounded-lg text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] border border-[var(--card-border)]/20"
                            >
                              {form}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-[var(--accent-gold)] text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Core Attributes</h4>
                        <div className="space-y-2">
                          {['HACCP Certified', 'Sustainably Sourced', 'Export Grade'].map(cert => (
                            <div key={cert} className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span>{cert}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Full Specs List */}
                    {product.specifications && (
                      <div className="border-t border-[var(--card-border)]/20 pt-8">
                        <h4 className="text-[var(--text-primary)] text-sm font-bold uppercase tracking-widest mb-6 font-serif">Inventory Parameters</h4>
                        <div className="space-y-3">
                          {Object.entries(product.specifications).map(([key, val]) => (
                            <div key={key} className="flex justify-between items-center py-3 border-b border-[var(--card-border)]/10 text-sm">
                              <span className="text-[var(--text-secondary)] font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                              <span className="text-[var(--text-primary)] font-bold">{val}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action Button */}
                    <div className="pt-8">
                      <button
                        onClick={scrollToContact}
                        className="w-full bg-[var(--accent-gold)] text-white py-5 rounded-xl font-bold tracking-[0.15em] uppercase text-sm shadow-xl shadow-[var(--accent-gold)]/20 hover:-translate-y-0.5 active:scale-95 transition-all flex items-center justify-center gap-3 group"
                        data-testid="modal-request-quote-btn"
                      >
                        Request Quote for {product.name}
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}