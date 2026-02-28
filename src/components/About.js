import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

export default function About() {
  const countRef = useRef(null);
  const isInView = useInView(countRef, { once: true, margin: "-100px" });
  
  const count = useSpring(0, { duration: 2000, bounce: 0 });
  const displayCount = useTransform(count, Math.round);

  useEffect(() => {
    if (isInView) {
      count.set(4);
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
            <div className="inline-block overflow-hidden relative mb-4">
              <motion.p 
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="text-sm font-bold tracking-widest uppercase text-[var(--accent-gold)] whitespace-nowrap border-r-2 border-[var(--accent-gold)] pr-1"
                style={{ animation: 'blink-caret .75s step-end infinite' }}
              >
                About Our Heritage
              </motion.p>
            </div>

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
                Blue Wave Marine was founded with a clear mission: to bridge the gap between 
                world-class seafood sources and Asia's growing demand for premium imported products. 
                With over two decades of combined experience, we understand the dynamic 
                challenges importers face—from complex documentation to intricate cold-chain logistics.
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
                'Asian market distribution support'
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
            className="relative"
          >
            {/* Image with Ken Burns Effect */}
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-[var(--card-border)]/20">
              <img 
                src="https://images.pexels.com/photos/35481804/pexels-photo-35481804.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt="Blue Wave Marine operations"
                className="w-full h-full object-cover animate-ken-burns"
              />
            </div>
            
            <div 
              ref={countRef}
              className="absolute -bottom-6 -left-6 bg-[var(--card-bg)]/90 backdrop-blur-md text-[var(--text-primary)] p-8 rounded-2xl shadow-xl max-w-xs border border-[var(--card-border)] transition-colors duration-500"
            >
              <p className="text-4xl font-bold mb-2 flex items-center font-serif">
                <motion.span>{displayCount}</motion.span>+
              </p>
              <p className="text-lg text-[var(--text-secondary)] transition-colors duration-500">Years serving Asian importers</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}