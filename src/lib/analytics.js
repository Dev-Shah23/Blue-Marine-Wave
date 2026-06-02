// Google Analytics 4 (privacy-respecting page-view tracking).
// Paste your GA4 Measurement ID below (looks like "G-XXXXXXXXXX") to activate.
// Until then this module is completely inert — nothing loads, nothing tracks.
const GA_MEASUREMENT_ID = 'G-8Y1823NJEN';

export const GA_ENABLED = /^G-[A-Z0-9]{6,}$/.test(GA_MEASUREMENT_ID);

let initialized = false;

export function initGA() {
  if (!GA_ENABLED || initialized || typeof window === 'undefined') return;
  initialized = true;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  // We send page_view manually on route changes (SPA), so disable the auto one.
  window.gtag('config', GA_MEASUREMENT_ID, { send_page_view: false, anonymize_ip: true });
}

export function trackPageView(path) {
  if (!GA_ENABLED || typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', 'page_view', { page_path: path });
}
