import { motion, AnimatePresence } from 'framer-motion';
import { X, Package, MapPin } from 'lucide-react';
import { useEffect } from 'react';

export default function ProductModal({ product, isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      return () => window.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  if (!product) return null;

  const scrollToContact = () => {
    onClose();
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
            data-testid="modal-backdrop"
          />
          
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, type: 'spring' }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto"
              data-testid="product-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
                <h2 
                  className="text-2xl font-bold text-[#0F172A]"
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                  data-testid="modal-product-name"
                >
                  {product.name}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                  aria-label="Close modal"
                  data-testid="modal-close-btn"
                >
                  <X className="w-6 h-6 text-slate-600" />
                </button>
              </div>

              <div className="p-6">
                <div className="aspect-video rounded-xl overflow-hidden mb-6">
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {product.scientificName && (
                  <p className="text-base italic text-slate-500 mb-4">
                    {product.scientificName}
                  </p>
                )}

                <p className="text-base leading-relaxed text-slate-700 mb-6">
                  {product.fullDescription || product.shortDescription}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-slate-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Package className="w-5 h-5 text-[#C9A84C]" />
                      <h3 
                        className="text-lg font-semibold text-[#0F172A]"
                        style={{ fontFamily: 'Manrope, sans-serif' }}
                      >
                        Available Forms
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {product.forms.map(form => (
                        <span 
                          key={form}
                          className="bg-white text-slate-700 px-3 py-1.5 rounded-full text-sm font-medium border border-slate-200"
                        >
                          {form}
                        </span>
                      ))}
                    </div>
                  </div>

                  {product.specifications && (
                    <div className="bg-slate-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <MapPin className="w-5 h-5 text-[#C9A84C]" />
                        <h3 
                          className="text-lg font-semibold text-[#0F172A]"
                          style={{ fontFamily: 'Manrope, sans-serif' }}
                        >
                          Origin
                        </h3>
                      </div>
                      <p className="text-slate-700">{product.specifications.origin}</p>
                      {product.specifications.certifications && (
                        <div className="mt-3">
                          <p className="text-sm font-medium text-slate-600 mb-2">Certifications:</p>
                          <div className="flex flex-wrap gap-1">
                            {product.specifications.certifications.map(cert => (
                              <span 
                                key={cert}
                                className="text-xs bg-[#C9A84C] text-[#050D1A] font-bold px-2 py-1 rounded"
                              >
                                {cert}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <button
                  onClick={scrollToContact}
                  className="w-full bg-[#C9A84C] hover:bg-[#b08d2f] text-[#050D1A] rounded-lg px-8 py-4 font-bold shadow-[0_0_15px_rgba(201,168,76,0.2)] hover:shadow-[0_0_20px_rgba(201,168,76,0.4)] hover:-translate-y-0.5 active:scale-95 transition-all"
                  data-testid="modal-request-quote-btn"
                >
                  Request Quote for {product.name}
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}