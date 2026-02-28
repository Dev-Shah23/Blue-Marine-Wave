import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  ChevronRight, 
  ShieldCheck, 
  MapPin, 
  Package, 
  Box,
  Truck,
  CheckCircle2
} from "lucide-react";
import { products } from "../data/products";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((item) => item.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!product) {
      navigate("/catalog");
    }
  }, [product, navigate]);

  if (!product) return null;

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[var(--base-bg)] text-[var(--text-primary)] transition-colors duration-500">
      <Navbar />
      
      {/* Header / Hero */}
      <div className="relative pt-32 pb-16 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition-colors mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold uppercase tracking-widest">Back to Inventory</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-[var(--card-border)]/30 group"
          >
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            />
          </motion.div>

          {/* Info */}
          <div className="space-y-10">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="px-4 py-1.5 bg-[var(--accent-gold)] text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-full shadow-lg">
                  {product.category}
                </span>
                <span className="flex items-center gap-1.5 text-[var(--accent-gold)] text-[10px] font-bold uppercase tracking-widest">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Grade
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold font-serif mb-4 leading-tight">
                {product.name}
              </h1>
              <p className="text-[var(--text-secondary)] text-xl italic font-medium">
                {product.scientificName}
              </p>
            </div>

            <p className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-xl border-l-4 border-[var(--accent-gold)] pl-6 italic bg-[var(--accent-gold)]/5 py-4 rounded-r-xl">
              {product.shortDescription}
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 bg-[var(--card-bg)] rounded-2xl border border-[var(--card-border)]/20 shadow-sm">
                <Box className="w-6 h-6 text-[var(--accent-gold)] mb-4" />
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)] mb-2">Cuts & Forms</h4>
                <div className="flex flex-wrap gap-2">
                  {product.forms?.map(form => (
                    <span key={form} className="text-xs font-bold text-[var(--text-primary)] uppercase">{form}</span>
                  ))}
                </div>
              </div>
              <div className="p-6 bg-[var(--card-bg)] rounded-2xl border border-[var(--card-border)]/20 shadow-sm">
                <Package className="w-6 h-6 text-[var(--accent-gold)] mb-4" />
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)] mb-2">Supply Capacity</h4>
                <p className="text-xs font-bold text-[var(--text-primary)] uppercase">Container Loads / Bulk</p>
              </div>
            </div>

            <button 
              onClick={scrollToContact}
              className="relative overflow-hidden w-full lg:w-auto px-12 py-5 bg-[var(--accent-gold)] text-white font-bold uppercase tracking-[0.2em] rounded-xl shadow-xl shadow-[var(--accent-gold)]/30 hover:-translate-y-1 transition-all group active:scale-95"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                Request Custom Quote
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        </div>
      </div>

      {/* Specifications Section */}
      <div className="bg-[var(--importers-bg)] py-24 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Tech Specs */}
            <div>
              <h3 className="text-3xl font-bold font-serif mb-10 border-b border-[var(--accent-gold)]/30 pb-4 inline-block">Industrial Specifications</h3>
              <div className="space-y-4">
                {product.specifications && Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center py-4 border-b border-[var(--card-border)]/10">
                    <span className="text-[var(--text-secondary)] font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                    <span className="text-[var(--text-primary)] font-bold">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quality & Logistics */}
            <div className="space-y-12">
              <div className="bg-[var(--card-bg)] p-10 rounded-3xl border border-[var(--card-border)]/30 shadow-xl">
                <Truck className="w-10 h-10 text-[var(--accent-gold)] mb-6" />
                <h4 className="text-2xl font-bold font-serif mb-4">Export Logistics</h4>
                <p className="text-[var(--text-secondary)] mb-8 text-sm leading-relaxed">
                  We manage the entire cold chain from harvest to your port. Global tracking and temperature logging included.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {['Custom Invoicing', 'Cert. of Origin', 'HACCP Logs', 'Vessel Tracking'].map(item => (
                    <div key={item} className="flex items-center gap-2 text-xs font-bold text-[var(--text-primary)] uppercase">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="contact" className="py-12 bg-[var(--contact-bg)]">
        {/* Contact component is already on the Home page, 
            but for the detail page we can either import it or just link back.
            Better to have a simple CTA here since Contact is heavy. */}
        <div className="max-w-3xl mx-auto text-center px-6">
           <h4 className="text-2xl font-serif font-bold mb-6">Ready to Order?</h4>
           <p className="text-[var(--text-secondary)] mb-8">Our team will work with you to customize the perfect export plan.</p>
           <button onClick={() => navigate("/#contact")} className="bg-[var(--text-primary)] text-white px-10 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-[var(--accent-gold)] transition-colors">Go to Contact Form</button>
        </div>
      </div>

      <Footer />
    </div>
  );
}