import { motion } from 'framer-motion';
import { useState } from 'react';
import axios from 'axios';
import { CheckCircle, AlertCircle } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    destination_country: '',
    destination_port: '',
    product_interest: '',
    quantity: '',
    message: ''
  });
  
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await axios.post(`${API}/contact`, formData);
      setStatus({ 
        type: 'success', 
        message: 'Thank you! Your quote request has been submitted. We will contact you within 24 hours.' 
      });
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        destination_country: '',
        destination_port: '',
        product_interest: '',
        quantity: '',
        message: ''
      });
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: 'Failed to submit form. Please try again or contact us directly.' 
      });
      console.error('Form submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" data-testid="contact-section" className="py-20 md:py-32 bg-[var(--contact-bg)] text-[var(--text-primary)] transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-medium tracking-wide uppercase text-[var(--accent-gold)] mb-4">
            Get In Touch
          </p>
          <h2 
            className="text-3xl md:text-5xl font-semibold tracking-tight text-[var(--text-primary)] mb-4"
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            Request a Quote
          </h2>
          <p className="text-lg md:text-xl leading-relaxed text-[var(--text-secondary)]">
            Share your requirements and we'll provide a detailed proposal
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-[var(--card-bg)] rounded-2xl p-8 md:p-12 shadow-sm border border-[var(--card-border)] backdrop-blur-md"
        >
          {status.message && (
            <div 
              data-testid={status.type === 'success' ? 'success-message' : 'error-message'}
              className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
                status.type === 'success' 
                  ? 'bg-green-50 text-green-800 border border-green-200' 
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}
            >
              {status.type === 'success' ? (
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              )}
              <span>{status.message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} data-testid="contact-form" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  data-testid="contact-name-input"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-[var(--input-bg)] border border-[var(--input-border)] focus:ring-2 focus:ring-[var(--accent-gold)] focus:border-[var(--accent-gold)] focus:outline-none rounded-lg px-4 py-3 w-full text-[var(--input-text)] placeholder:text-[var(--input-placeholder)]"
                  style={{ transition: 'all 0.3s' }}
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  data-testid="contact-company-input"
                  required
                  value={formData.company}
                  onChange={handleChange}
                  className="bg-[var(--input-bg)] border border-[var(--input-border)] focus:ring-2 focus:ring-[var(--accent-gold)] focus:border-[var(--accent-gold)] focus:outline-none rounded-lg px-4 py-3 w-full text-[var(--input-text)] placeholder:text-[var(--input-placeholder)]"
                  style={{ transition: 'all 0.3s' }}
                  placeholder="ABC Trading Co."
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  data-testid="contact-email-input"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-[var(--input-bg)] border border-[var(--input-border)] focus:ring-2 focus:ring-[var(--accent-gold)] focus:border-[var(--accent-gold)] focus:outline-none rounded-lg px-4 py-3 w-full text-[var(--input-text)] placeholder:text-[var(--input-placeholder)]"
                  style={{ transition: 'all 0.3s' }}
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  data-testid="contact-phone-input"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-[var(--input-bg)] border border-[var(--input-border)] focus:ring-2 focus:ring-[var(--accent-gold)] focus:border-[var(--accent-gold)] focus:outline-none rounded-lg px-4 py-3 w-full text-[var(--input-text)] placeholder:text-[var(--input-placeholder)]"
                  style={{ transition: 'all 0.3s' }}
                  placeholder="+65 1234 5678"
                />
              </div>

              <div>
                <label htmlFor="destination_country" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Destination Country *
                </label>
                <input
                  type="text"
                  id="destination_country"
                  name="destination_country"
                  data-testid="contact-country-input"
                  required
                  value={formData.destination_country}
                  onChange={handleChange}
                  className="bg-[var(--input-bg)] border border-[var(--input-border)] focus:ring-2 focus:ring-[var(--accent-gold)] focus:border-[var(--accent-gold)] focus:outline-none rounded-lg px-4 py-3 w-full text-[var(--input-text)] placeholder:text-[var(--input-placeholder)]"
                  style={{ transition: 'all 0.3s' }}
                  placeholder="Singapore"
                />
              </div>

              <div>
                <label htmlFor="destination_port" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Destination Port
                </label>
                <input
                  type="text"
                  id="destination_port"
                  name="destination_port"
                  data-testid="contact-port-input"
                  value={formData.destination_port}
                  onChange={handleChange}
                  className="bg-[var(--input-bg)] border border-[var(--input-border)] focus:ring-2 focus:ring-[var(--accent-gold)] focus:border-[var(--accent-gold)] focus:outline-none rounded-lg px-4 py-3 w-full text-[var(--input-text)] placeholder:text-[var(--input-placeholder)]"
                  style={{ transition: 'all 0.3s' }}
                  placeholder="Port of Singapore"
                />
              </div>

              <div>
                <label htmlFor="product_interest" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Product of Interest *
                </label>
                <input
                  type="text"
                  id="product_interest"
                  name="product_interest"
                  data-testid="contact-product-input"
                  required
                  value={formData.product_interest}
                  onChange={handleChange}
                  className="bg-[var(--input-bg)] border border-[var(--input-border)] focus:ring-2 focus:ring-[var(--accent-gold)] focus:border-[var(--accent-gold)] focus:outline-none rounded-lg px-4 py-3 w-full text-[var(--input-text)] placeholder:text-[var(--input-placeholder)]"
                  style={{ transition: 'all 0.3s' }}
                  placeholder="Black Tiger Shrimp"
                />
              </div>

              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Estimated Quantity *
                </label>
                <input
                  type="text"
                  id="quantity"
                  name="quantity"
                  data-testid="contact-quantity-input"
                  required
                  value={formData.quantity}
                  onChange={handleChange}
                  className="bg-[var(--input-bg)] border border-[var(--input-border)] focus:ring-2 focus:ring-[var(--accent-gold)] focus:border-[var(--accent-gold)] focus:outline-none rounded-lg px-4 py-3 w-full text-[var(--input-text)] placeholder:text-[var(--input-placeholder)]"
                  style={{ transition: 'all 0.3s' }}
                  placeholder="1000 kg/month"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                Additional Requirements
              </label>
              <textarea
                id="message"
                name="message"
                data-testid="contact-message-input"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="bg-[var(--input-bg)] border border-[var(--input-border)] focus:ring-2 focus:ring-[var(--accent-gold)] focus:border-[var(--accent-gold)] focus:outline-none rounded-lg px-4 py-3 w-full text-[var(--input-text)] placeholder:text-[var(--input-placeholder)] resize-none"
                style={{ transition: 'all 0.3s' }}
                placeholder="Please share any specific requirements, certifications needed, or questions..."
              />
            </div>

            <button
              type="submit"
              data-testid="contact-submit-btn"
              disabled={loading}
              className="relative overflow-hidden w-full bg-[var(--btn-bg)] hover:brightness-110 disabled:bg-slate-600 text-[var(--btn-text)] rounded-lg px-8 py-4 font-bold shadow-lg hover:shadow-[0_0_20px_rgba(201,168,76,0.3)] hover:-translate-y-0.5 active:scale-95 disabled:hover:translate-y-0 disabled:active:scale-100 group/btn animate-pulse-click"
              style={{ transition: 'all 0.3s' }}
            >
              <span className="relative z-10">{loading ? 'Submitting...' : 'Submit Quote Request'}</span>
              <div className="absolute inset-0 animate-shimmer opacity-0 group-hover/btn:opacity-100 transition-opacity" />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}