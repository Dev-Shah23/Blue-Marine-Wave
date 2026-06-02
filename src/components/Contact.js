import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo, useRef, useEffect } from 'react';
import axios from 'axios';
import { CheckCircle, AlertCircle, Check, ChevronDown, X, Search } from 'lucide-react';
import { products } from '../data/products';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Owner notification + client auto-confirmation email (free, no API key).
// On the first submission FormSubmit emails an activation link to the owner
// address below — click it once to start receiving quote emails.
const OWNER_EMAIL = 'bluewavemarine07@gmail.com';
const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${OWNER_EMAIL}`;
const COMPANY_WHATSAPP = '918891704553';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    country: '',
    email: '',
    phone: '',
    quantity: '',
    notes: '',
  });

  const [selectedProducts, setSelectedProducts] = useState([]); // array of product ids
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [productError, setProductError] = useState(false);

  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [waConfirmUrl, setWaConfirmUrl] = useState(null);

  const dropdownRef = useRef(null);

  // Close dropdown on outside click / Escape
  useEffect(() => {
    const onClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setDropdownOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) =>
      `${p.name} ${p.scientificName} ${p.category}`.toLowerCase().includes(q)
    );
  }, [search]);

  const selectedObjects = useMemo(
    () => products.filter((p) => selectedProducts.includes(p.id)),
    [selectedProducts]
  );

  const toggleProduct = (id) => {
    setProductError(false);
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      company: '',
      country: '',
      email: '',
      phone: '',
      quantity: '',
      notes: '',
    });
    setSelectedProducts([]);
    setSearch('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedProducts.length === 0) {
      setProductError(true);
      setStatus({ type: 'error', message: 'Please select at least one product before submitting.' });
      return;
    }

    setLoading(true);
    setStatus({ type: '', message: '' });
    setWaConfirmUrl(null);

    const productList = selectedObjects.map((p) => `${p.name} (${p.scientificName})`);
    const productsText = productList.join(', ');

    // 1) Store the quote in the backend (PostgreSQL) — exact schema it expects.
    const backendPayload = {
      name: formData.name,
      company: formData.company,
      email: formData.email,
      phone: formData.phone,
      destination_country: formData.country,
      destination_port: '',
      product_interest: productsText,
      quantity: formData.quantity,
      message: formData.notes,
    };

    // 2) Email the full quote to the owner + auto-confirm the client (FormSubmit).
    const emailPayload = {
      _subject: `New Quote Request — ${formData.company || formData.name} (${formData.country})`,
      _template: 'table',
      _captcha: 'false',
      _autoresponse: `Hello ${formData.name},\n\nThank you for your quote request to Blue Wave Marine. We have received your requirements for: ${productsText}. Our export team will get back to you with a detailed proposal within 24 hours.\n\nWarm regards,\nBlue Wave Marine`,
      name: formData.name,
      company: formData.company,
      email: formData.email, // submitter → reply-to + auto-confirmation recipient
      phone_whatsapp: formData.phone,
      destination_country: formData.country,
      products_required: productsText,
      quantity_required: formData.quantity,
      additional_notes: formData.notes || '—',
    };

    // Build the client's one-tap WhatsApp confirmation link before resetting.
    const waText =
      `Quote Request — Blue Wave Marine\n` +
      `Name: ${formData.name}\n` +
      `Company: ${formData.company}\n` +
      `Country: ${formData.country}\n` +
      `Products: ${productsText}\n` +
      `Quantity: ${formData.quantity}`;
    const waUrl = `https://wa.me/${COMPANY_WHATSAPP}?text=${encodeURIComponent(waText)}`;

    // Fire both in parallel; neither failure should block the other.
    const [storeRes, emailRes] = await Promise.allSettled([
      BACKEND_URL
        ? axios.post(`${API}/contact`, backendPayload)
        : Promise.reject(new Error('backend url not configured')),
      axios.post(FORMSUBMIT_ENDPOINT, emailPayload, {
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      }),
    ]);

    setLoading(false);

    const storeOk = storeRes.status === 'fulfilled';
    const emailOk = emailRes.status === 'fulfilled';

    if (emailOk || storeOk) {
      setWaConfirmUrl(waUrl);
      setStatus({
        type: 'success',
        message:
          'Thank you! Your quote request has been submitted. A confirmation email is on its way, and our export team will contact you within 24 hours.',
      });
      resetForm();
    } else {
      console.error('Quote submission failed', { storeRes, emailRes });
      setStatus({
        type: 'error',
        message: 'Something went wrong submitting your request. Please try again, or reach us on WhatsApp or by email.',
      });
    }
  };

  const inputClass =
    'bg-[var(--input-bg)] border border-[var(--input-border)] focus:ring-2 focus:ring-[var(--accent-gold)] focus:border-[var(--accent-gold)] focus:outline-none rounded-lg px-4 py-3 w-full text-[var(--input-text)] placeholder:text-[var(--input-placeholder)] transition-all';
  const labelClass = 'block text-sm font-medium text-[var(--text-secondary)] mb-2';

  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="py-20 md:py-32 bg-[var(--contact-bg)] text-[var(--text-primary)] transition-colors duration-500"
    >
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
            Select the products you need and we'll send a detailed export proposal
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

          {status.type === 'success' && waConfirmUrl && (
            <a
              href={waConfirmUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="contact-whatsapp-confirm"
              className="mb-6 inline-flex items-center justify-center gap-2 w-full bg-[#25D366] hover:brightness-110 text-white font-bold rounded-lg px-6 py-3 transition-all"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
                <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.515 5.26l-.999 3.648 3.873-1.116zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              Get instant confirmation on WhatsApp
            </a>
          )}

          <form onSubmit={handleSubmit} data-testid="contact-form" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className={labelClass}>Full Name *</label>
                <input type="text" id="name" name="name" data-testid="contact-name-input" required
                  value={formData.name} onChange={handleChange} className={inputClass} placeholder="John Doe" />
              </div>

              <div>
                <label htmlFor="company" className={labelClass}>Company Name *</label>
                <input type="text" id="company" name="company" data-testid="contact-company-input" required
                  value={formData.company} onChange={handleChange} className={inputClass} placeholder="ABC Trading Co." />
              </div>

              <div>
                <label htmlFor="email" className={labelClass}>Email Address *</label>
                <input type="email" id="email" name="email" data-testid="contact-email-input" required
                  value={formData.email} onChange={handleChange} className={inputClass} placeholder="john@example.com" />
              </div>

              <div>
                <label htmlFor="phone" className={labelClass}>Phone / WhatsApp *</label>
                <input type="tel" id="phone" name="phone" data-testid="contact-phone-input" required
                  value={formData.phone} onChange={handleChange} className={inputClass} placeholder="+65 1234 5678" />
              </div>

              <div>
                <label htmlFor="country" className={labelClass}>Destination Country *</label>
                <input type="text" id="country" name="country" data-testid="contact-country-input" required
                  value={formData.country} onChange={handleChange} className={inputClass} placeholder="Singapore" />
              </div>

              <div>
                <label htmlFor="quantity" className={labelClass}>Quantity Required *</label>
                <input type="text" id="quantity" name="quantity" data-testid="contact-quantity-input" required
                  value={formData.quantity} onChange={handleChange} className={inputClass} placeholder="1000 kg/month" />
              </div>
            </div>

            {/* ── Products Required — searchable multi-select ── */}
            <div ref={dropdownRef} className="relative">
              <label className={labelClass}>Products Required *</label>

              <div
                onClick={() => setDropdownOpen((o) => !o)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setDropdownOpen((o) => !o);
                  }
                }}
                data-testid="contact-products-control"
                aria-haspopup="listbox"
                aria-expanded={dropdownOpen}
                className={`min-h-[3.25rem] cursor-pointer bg-[var(--input-bg)] border rounded-lg px-3 py-2.5 flex flex-wrap gap-2 items-center transition-all focus:outline-none focus:ring-2 focus:ring-[var(--accent-gold)] ${
                  productError && selectedProducts.length === 0
                    ? 'border-red-400'
                    : 'border-[var(--input-border)]'
                }`}
              >
                {selectedObjects.length === 0 && (
                  <span className="text-[var(--input-placeholder)] px-1">Select one or more products…</span>
                )}

                {selectedObjects.map((p) => (
                  <span
                    key={p.id}
                    className="flex items-center gap-1 bg-[var(--accent-gold)]/15 text-[var(--accent-gold)] border border-[var(--accent-gold)]/30 rounded-full pl-3 pr-1.5 py-1 text-xs font-semibold"
                  >
                    {p.name}
                    <button
                      type="button"
                      aria-label={`Remove ${p.name}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleProduct(p.id);
                      }}
                      className="hover:bg-[var(--accent-gold)]/20 rounded-full p-0.5"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}

                <ChevronDown
                  className={`ml-auto w-5 h-5 text-[var(--text-secondary)] flex-shrink-0 transition-transform ${
                    dropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </div>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute z-30 mt-2 w-full bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl shadow-2xl overflow-hidden"
                  >
                    <div className="p-2 border-b border-[var(--card-border)]/40">
                      <div className="flex items-center gap-2 px-2 bg-[var(--input-bg)] rounded-lg">
                        <Search className="w-4 h-4 text-[var(--text-secondary)] flex-shrink-0" />
                        <input
                          autoFocus
                          type="text"
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          placeholder="Search products…"
                          data-testid="contact-products-search"
                          className="w-full bg-transparent py-2.5 text-sm text-[var(--input-text)] placeholder:text-[var(--input-placeholder)] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="max-h-64 overflow-y-auto custom-scrollbar" role="listbox" aria-multiselectable="true">
                      {filteredProducts.length === 0 ? (
                        <p className="px-4 py-6 text-center text-sm text-[var(--text-secondary)]">
                          No products found
                        </p>
                      ) : (
                        filteredProducts.map((p) => {
                          const checked = selectedProducts.includes(p.id);
                          return (
                            <button
                              type="button"
                              key={p.id}
                              role="option"
                              aria-selected={checked}
                              onClick={() => toggleProduct(p.id)}
                              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-[var(--accent-gold)]/10 transition-colors"
                            >
                              <span
                                className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 ${
                                  checked
                                    ? 'bg-[var(--accent-gold)] border-[var(--accent-gold)]'
                                    : 'border-[var(--input-border)]'
                                }`}
                              >
                                {checked && <Check className="w-3.5 h-3.5 text-white" />}
                              </span>
                              <span className="flex-1 min-w-0">
                                <span className="block text-sm font-semibold text-[var(--text-primary)]">
                                  {p.name}{' '}
                                  <span className="font-normal italic text-[var(--text-secondary)]">
                                    ({p.scientificName})
                                  </span>
                                </span>
                                <span className="block text-xs text-[var(--text-tertiary)]">{p.category}</span>
                              </span>
                            </button>
                          );
                        })
                      )}
                    </div>

                    <div className="flex items-center justify-between px-4 py-2.5 border-t border-[var(--card-border)]/40 text-xs">
                      <span className="text-[var(--text-secondary)]">
                        {selectedProducts.length} selected
                      </span>
                      <button
                        type="button"
                        onClick={() => setDropdownOpen(false)}
                        className="text-[var(--accent-gold)] font-semibold hover:underline"
                      >
                        Done
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {productError && selectedProducts.length === 0 && (
                <p className="mt-2 text-sm text-red-500">Please select at least one product.</p>
              )}
            </div>

            <div>
              <label htmlFor="notes" className={labelClass}>Additional Notes</label>
              <textarea
                id="notes"
                name="notes"
                data-testid="contact-message-input"
                value={formData.notes}
                onChange={handleChange}
                rows={5}
                className={`${inputClass} resize-none`}
                placeholder="Please share any specific requirements, sizes/grades, certifications needed, or questions..."
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
