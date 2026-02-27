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
      count.set(20);
    }
  }, [isInView, count]);

  return (
    <section id="about" data-testid="about-section" className="py-20 md:py-32 bg-gradient-to-b from-[#0D3060] to-[#1A4A7A] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-medium tracking-wide uppercase text-slate-300 mb-4">
              About Us
            </p>
            <h2 
              className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-6"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              Your Trusted Seafood Export Partner
            </h2>
            
            <div className="space-y-6 text-base leading-relaxed text-slate-300 mb-8">
              <p>
                Blue Wave Marine was founded with a clear mission: to bridge the gap between 
                world-class seafood sources and Asia's growing demand for premium imported products. 
                With over two decades of experience in international trade, we understand the unique 
                challenges importers face—from regulatory compliance to logistics coordination.
              </p>
              
              <p>
                We work directly with certified fisheries, processing facilities, and aquaculture farms 
                across North America, Europe, and the Pacific. Our extensive network allows us to offer 
                competitive pricing, consistent supply, and the flexibility to customize orders based on 
                your market requirements.
              </p>
            </div>

            <div className="space-y-4">
              <h3 
                className="text-xl font-semibold text-white mb-4"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                What We Offer:
              </h3>
              {[
                'Direct sourcing from certified suppliers',
                'Custom processing and packaging solutions',
                'Full cold-chain logistics management',
                'Documentation and compliance support',
                'Flexible order quantities and delivery schedules'
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-[#C9A84C] flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300">{item}</span>
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
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.pexels.com/photos/35481804/pexels-photo-35481804.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt="Blue Wave Marine operations"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div 
              ref={countRef}
              className="absolute -bottom-6 -left-6 bg-[#0A2540] text-white p-8 rounded-2xl shadow-xl max-w-xs border border-white/5"
            >
              <p className="text-4xl font-bold mb-2 flex items-center" style={{ fontFamily: 'Manrope, sans-serif' }}>
                <motion.span>{displayCount}</motion.span>+
              </p>
              <p className="text-lg text-slate-300">Years serving Asian importers</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}