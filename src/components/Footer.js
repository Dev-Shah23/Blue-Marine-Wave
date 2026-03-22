import { Mail, Phone, MapPin, Instagram, Linkedin, Facebook } from "lucide-react";
import logo from "../fwdphotos/logo.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function Footer() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    // Generate 25 stable random bubbles for the footer on mount
    const newBubbles = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      size: Math.random() * 10 + 4, // 4px to 14px
      left: `${Math.random() * 100}%`,
      duration: Math.random() * 10 + 8, // 8s to 18s rise time
      delay: Math.random() * 10, // 0s to 10s start delay
      opacity: Math.random() * 0.08 + 0.04, // 0.04 to 0.12 opacity
      drift: `${(Math.random() - 0.5) * 80}px`, // gentle horizontal drift
    }));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBubbles(newBubbles);
  }, []);

  return (
    <footer className="relative bg-[var(--footer-bg)] text-white pt-32 pb-12 overflow-hidden transition-colors duration-500">
      {/* Animated Bubbles Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {bubbles.map((b) => (
          <div
            key={b.id}
            className="absolute rounded-full"
            style={{
              width: `${b.size}px`,
              height: `${b.size}px`,
              left: b.left,
              bottom: "-20px",
              background: "var(--bubble-bg)",
              animation: `floatBubble ${b.duration}s ease-in ${b.delay}s infinite`,
              "--drift": b.drift,
              "--start-opacity": b.opacity,
              opacity: 0, // start invisible until animation begins
            }}
          />
        ))}
      </div>
      {/* Triple Layered Waves */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180">
        {/* Deep Wave */}
        <svg
          className="relative block w-[200%] h-[120px] animate-wave-slow opacity-30"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5,73.84-4.36,147.54,16.88,218.2,35.26,69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113,2,1200,34.19V0Z"
            fill="var(--wave-1)"
          ></path>
        </svg>
        {/* Mid Wave */}
        <svg
          className="absolute top-0 left-0 block w-[200%] h-[100px] animate-wave-medium opacity-50"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            fill="var(--wave-2)"
          ></path>
        </svg>
        {/* Top Wave (Solid) */}
        <svg
          className="absolute top-0 left-0 block w-[200%] h-[80px] animate-wave-fast"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            fill="var(--wave-3)"
          ></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 items-start">
          {/* Column 1: Brand & Contact */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Blue Wave Marine Logo" className="w-16 h-16 object-contain" />
              <span className="text-xl font-bold tracking-widest font-serif">
                BLUE WAVE MARINE
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed italic">
              Asia's and Europe's premier gateway to the world's finest seafood harvest. Connecting international fisheries with the region's top importers since 2020.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[var(--accent-gold)] hover:border-[var(--accent-gold)] transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[var(--accent-gold)] hover:border-[var(--accent-gold)] transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[var(--accent-gold)] hover:border-[var(--accent-gold)] transition-all">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
            <ul className="space-y-2 text-sm text-slate-400 mt-6">
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[var(--accent-gold)]" />
                <span>export@bluewavemarine.in</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[var(--accent-gold)]" />
                <span>+91 8891704553</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[var(--accent-gold)] mt-0.5" />
                <a href="https://maps.app.goo.gl/uYc3789abJ5titzA8" className="hover:text-[var(--accent-gold)] transition-colors">GIDC Estate,Veraval,Gujurat (362269)</a>
              </li>
            </ul>
          </div>

          {/* Column 2: Quick Links */}
          <div className="pt-4">
            <h4 className="text-lg font-bold mb-6 font-serif border-b border-[var(--accent-gold)]/30 pb-2 inline-block">Quick Links</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><a href="/#products" className="hover:text-[var(--accent-gold)] transition-colors">Products</a></li>
              <li><a href="/#quality" className="hover:text-[var(--accent-gold)] transition-colors">Quality</a></li>
              <li><a href="/#about" className="hover:text-[var(--accent-gold)] transition-colors">About</a></li>
              <li><a href="/catalog" className="hover:text-[var(--accent-gold)] transition-colors">Catalog</a></li>
              <li><a href="/#contact" className="hover:text-[var(--accent-gold)] transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Column 3: Certifications */}
          <div className="pt-4">
            <h4 className="text-lg font-bold mb-6 font-serif border-b border-[var(--accent-gold)]/30 pb-2 inline-block">Certifications</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-center gap-2 whitespace-nowrap"><span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)]" /> ISO 22000</li>
              <li className="flex items-center gap-2 whitespace-nowrap"><span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)]" /> HACCP Certified</li>
              <li className="flex items-center gap-2 whitespace-nowrap"><span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)]" /> BAP Certified</li>
              <li className="flex items-center gap-2 whitespace-nowrap"><span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)]" /> MSC Chain of Custody</li>
              <li className="flex items-center gap-2 whitespace-nowrap"><span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)]" /> ASC Certified</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-xs text-slate-500 uppercase tracking-widest">
            © 2026 Blue Wave Marine. All rights reserved. Industrial Grade Seafood Excellence.
          </p>
          <p className="text-xs text-slate-600">
            Designed & Developed by{" "}
            <a 
              href="https://github.com/Dev-Shah23" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[var(--accent-gold)] hover:underline decoration-wavy underline-offset-4 transition-all font-bold"
            >
              Dev Shah
            </a>
            {" "}&{" "}
            <a 
              href="https://github.com/KennethMartin06" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[var(--accent-gold)] hover:underline decoration-wavy underline-offset-4 transition-all font-bold"
            >
              Kenneth Martin
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
