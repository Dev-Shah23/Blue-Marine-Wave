import { Anchor, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer data-testid="footer" className="bg-[#004E64]/95 backdrop-blur-sm text-white py-16 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Anchor className="w-8 h-8" />
              <span className="text-2xl font-bold tracking-widest" style={{ fontFamily: 'Manrope, sans-serif' }}>
                BLUE WAVE MARINE
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed mb-6">
              Premium seafood export solutions connecting Asian markets with the world's finest seafood.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-slate-300">
                <Mail className="w-5 h-5" />
                <span>info@bluewavemarine.com</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <Phone className="w-5 h-5" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <MapPin className="w-5 h-5" />
                <span>Seattle, Washington, USA</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('products')}
                  className="text-slate-300 hover:text-white"
                  style={{ transition: 'color 0.3s' }}
                >
                  Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('quality')}
                  className="text-slate-300 hover:text-white"
                  style={{ transition: 'color 0.3s' }}
                >
                  Quality
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-slate-300 hover:text-white"
                  style={{ transition: 'color 0.3s' }}
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-slate-300 hover:text-white"
                  style={{ transition: 'color 0.3s' }}
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Certifications
            </h4>
            <ul className="space-y-2 text-slate-300">
              <li>ISO 22000</li>
              <li>HACCP Certified</li>
              <li>BAP Certified</li>
              <li>MSC Chain of Custody</li>
              <li>ASC Certified</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-600 pt-8 text-center text-slate-400">
          <p>&copy; 2026 Blue Wave Marine. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}