import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Package, Truck, FileCheck } from 'lucide-react';
import { products } from '../data/products';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Product Not Found</h2>
          <button
            onClick={() => navigate('/')}
            className="text-[#C9A84C] hover:underline"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const scrollToContact = () => {
    navigate('/');
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <button
            data-testid="back-to-products-btn"
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-[#0A2540] hover:text-[#C9A84C] font-semibold mb-8 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1" style={{ transition: 'transform 0.3s' }} />
            Back to Products
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
            >
              <img 
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-6">
                <h1 
                  data-testid="product-detail-name"
                  className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-3"
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                >
                  {product.name}
                </h1>
                {product.scientificName && (
                  <p className="text-lg italic text-slate-500 mb-4">
                    {product.scientificName}
                  </p>
                )}
              </div>

              <p className="text-lg leading-relaxed text-slate-600 mb-8">
                {product.fullDescription}
              </p>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-[#0F172A] mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  Available Forms
                </h3>
                <div className="flex flex-wrap gap-3">
                  {product.forms.map(form => (
                    <span 
                      key={form}
                      className="bg-slate-100 text-slate-700 px-4 py-2 rounded-full font-medium"
                    >
                      {form}
                    </span>
                  ))}
                </div>
              </div>

              <button
                data-testid="product-detail-quote-btn"
                onClick={scrollToContact}
                className="bg-[#C9A84C] hover:bg-[#b08d2f] text-[#050D1A] rounded-full px-8 py-4 font-bold shadow-[0_0_15px_rgba(201,168,76,0.3)] hover:shadow-[0_0_25px_rgba(201,168,76,0.5)] hover:-translate-y-0.5 active:scale-95"
                style={{ transition: 'all 0.3s' }}
              >
                Request Quote for {product.name}
              </button>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[#F5F7FA] rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Package className="w-8 h-8 text-[#C9A84C]" />
                <h3 className="text-2xl font-semibold text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  Specifications
                </h3>
              </div>
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-slate-500 mb-1">Origin</dt>
                  <dd className="text-base text-slate-900">{product.specifications.origin}</dd>
                </div>
                {product.specifications.season && (
                  <div>
                    <dt className="text-sm font-medium text-slate-500 mb-1">Season / Availability</dt>
                    <dd className="text-base text-slate-900">{product.specifications.season}</dd>
                  </div>
                )}
                {product.specifications.sizes && (
                  <div>
                    <dt className="text-sm font-medium text-slate-500 mb-1">Sizes Available</dt>
                    <dd className="text-base text-slate-900">{product.specifications.sizes}</dd>
                  </div>
                )}
                {product.specifications.grade && (
                  <div>
                    <dt className="text-sm font-medium text-slate-500 mb-1">Grade</dt>
                    <dd className="text-base text-slate-900">{product.specifications.grade}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-sm font-medium text-slate-500 mb-1">Packaging Options</dt>
                  <dd className="text-base text-slate-900">{product.specifications.packaging}</dd>
                </div>
              </dl>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-[#F5F7FA] rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <FileCheck className="w-8 h-8 text-[#C9A84C]" />
                <h3 className="text-2xl font-semibold text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  Certifications
                </h3>
              </div>
              <ul className="space-y-3">
                {product.specifications.certifications.map(cert => (
                  <li key={cert} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#C9A84C] flex-shrink-0" />
                    <span className="text-base text-slate-900">{cert}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-[#0A2540] text-white rounded-2xl p-8 md:p-12 text-center shadow-xl border border-white/5"
          >
            <Truck className="w-16 h-16 mx-auto mb-6" />
            <h3 className="text-3xl font-semibold mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Ready to Order?
            </h3>
            <p className="text-lg text-slate-200 mb-6 max-w-2xl mx-auto">
              Contact us for detailed pricing, minimum order quantities, and delivery schedules. 
              Our team will work with you to customize the perfect solution for your market.
            </p>
            <button
              onClick={scrollToContact}
              className="mt-4 bg-[#C9A84C] hover:bg-[#b08d2f] text-[#050D1A] rounded-full px-8 py-4 font-bold shadow-[0_0_15px_rgba(201,168,76,0.3)] hover:shadow-[0_0_25px_rgba(201,168,76,0.5)] hover:-translate-y-0.5 active:scale-95"
              style={{ transition: 'all 0.3s' }}
            >
              Get a Custom Quote
            </button>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}