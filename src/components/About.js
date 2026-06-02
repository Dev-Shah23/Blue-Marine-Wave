import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import owner from "../assets/owner.jpg";

export default function About() {
  const countRef = useRef(null);
  const isInView = useInView(countRef, { once: true, margin: "-100px" });
  
  const count = useSpring(0, { duration: 2000, bounce: 0 });
  const displayCount = useTransform(count, Math.round);

  useEffect(() => {
    if (isInView) {
      count.set(40);
    }
  }, [isInView, count]);

  return (
    <section 
      id="about" 
      data-testid="about-section" 
      className={`py-20 md:py-32 bg-[var(--about-bg)] text-[var(--text-primary)] transition-colors duration-500 relative overflow-hidden gold-bottom-border ${isInView ? "in-view" : ""}`}
    >
      {/* Upward bubbles for depth */}
      <div className="absolute bottom-10 left-1/4 w-3 h-3 rounded-full bg-[var(--accent-gold)]/20 animate-bubble-up-slow pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-2 h-2 rounded-full bg-blue-300/10 animate-bubble-up-slow pointer-events-none" style={{ animationDelay: '3s' }} />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-sm font-bold tracking-widest uppercase text-[var(--accent-gold)] mb-4"
            >
              About Our Heritage
            </motion.p>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)] mb-6 transition-colors duration-500 font-serif relative"
            >
              Your Trusted Seafood Export Partner
              {/* Shimmer Sweep Effect */}
              <motion.div 
                initial={{ left: "-100%" }}
                whileInView={{ left: "200%" }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--accent-gold)]/10 to-transparent skew-x-12 z-0"
              />
            </motion.h2>
            
            <div className="space-y-6 text-base leading-relaxed text-[var(--text-secondary)] mb-8 transition-colors duration-500">
              <p>
                Blue Wave Marine Company is built on a proud 40-year legacy in the seafood industry. Our journey began with our grandfather,
                Mr. Antony, who owned and operated three fishing boats, laying the foundation of trust, quality, and honest trade.
                The next generation expanded the business by establishing a seafood processing unit and growing into supply operations. 
                With hands-on industry experience and exposure to export-oriented factories, we developed strong expertise in quality standards and global market requirements.
              </p>
              
              <p>
                We work directly with certified fisheries and processing facilities across the globe. 
                Our extensive network allows us to offer competitive pricing, consistent supply, and the 
                flexibility to customize packaging and processing based on your specific market needs.
              </p>
            </div>

            <div className="space-y-4">
              <h3 
                className="text-xl font-bold text-[var(--text-primary)] mb-4 transition-colors duration-500 font-serif"
              >
                Our Export Advantages:
              </h3>
              {[
                'Direct-to-source supply chains',
                'Custom processing & sorting options',
                'Comprehensive cold-chain tracking',
                'Multi-national compliance expertise',
                'European and Asian market distribution support'
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-[var(--accent-gold)] flex-shrink-0 mt-0.5" />
                  <span className="text-[var(--text-secondary)] transition-colors duration-500">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-sm">
              {/* Decorative gold frame accent */}
              <div className="absolute -inset-3 rounded-3xl border border-[var(--accent-gold)]/20 pointer-events-none hidden sm:block" />

              {/* Owner Portrait — passport-style, elegantly framed */}
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-[var(--card-border)]/30 bg-slate-100">
                <img
                  src={owner}
                  alt="Founder of Blue Wave Marine"
                  className="w-full h-full object-cover object-top"
                />
                {/* Caption gradient + label */}
                <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />
                <div className="absolute bottom-5 left-6 right-6 text-white">
                  <p className="text-2xl font-bold font-serif leading-tight drop-shadow-md">
                    Dominic Antony
                  </p>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent-gold)] mt-1.5">
                    Founder &amp; Managing Director
                  </p>
                </div>
              </div>

              {/* Legacy milestone badge — balanced horizontal layout */}
              <div
                ref={countRef}
                className="absolute -top-6 -right-3 sm:-right-6 flex items-center gap-3.5 bg-[var(--card-bg)]/95 backdrop-blur-md text-[var(--text-primary)] pl-5 pr-6 py-4 rounded-2xl shadow-xl border border-[var(--card-border)] transition-colors duration-500"
              >
                <span className="font-serif font-bold text-[var(--accent-gold)] leading-none text-5xl">
                  <motion.span>{displayCount}</motion.span>
                  <span className="align-top text-2xl">+</span>
                </span>
                <span className="h-10 w-px bg-[var(--card-border)] flex-shrink-0" />
                <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--text-secondary)] leading-snug transition-colors duration-500">
                  Years of<br />Seafood Heritage
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
