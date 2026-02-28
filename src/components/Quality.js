import { motion } from 'framer-motion';
import { Snowflake, ShieldCheck, Package } from 'lucide-react';

export default function Quality() {
  const features = [
    {
      icon: Snowflake,
      title: 'Cold-Chain Handling',
      description: 'Unbroken temperature control from catch to delivery. Our advanced cold-chain infrastructure ensures products maintain optimal freshness throughout transit.',
      testId: 'quality-coldchain'
    },
    {
      icon: ShieldCheck,
      title: 'Consistent Grading',
      description: 'Rigorous quality standards and expert grading ensure every shipment meets your exact specifications. Certified by international food safety bodies.',
      testId: 'quality-grading'
    },
    {
      icon: Package,
      title: 'Flexible Packaging',
      description: 'Custom packaging solutions tailored to your market needs. From bulk containers to retail-ready portions, we adapt to your requirements.',
      testId: 'quality-packaging'
    }
  ];

  return (
    <section id="quality" data-testid="quality-section" className="py-20 md:py-32 bg-[var(--importers-bg)] text-[var(--text-primary)] transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium tracking-wide uppercase text-[var(--accent-gold)] mb-4">
            Quality Assurance
          </p>
          <h2 
            className="text-3xl md:text-5xl font-semibold tracking-tight text-[var(--text-primary)] mb-4"
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            Why Importers Trust Us
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                data-testid={feature.testId}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="bg-[var(--trust-bg)] rounded-2xl p-8 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-1 border border-[var(--trust-border)] backdrop-blur-sm"
                style={{ transition: 'all 0.3s' }}
              >
                <div className="w-12 h-12 bg-[var(--accent-gold)] bg-opacity-10 rounded-xl flex items-center justify-center mb-6">
                  <Icon className="w-8 h-8 text-[var(--accent-gold)]" strokeWidth={1.5} />
                </div>
                <h3 
                  className="text-2xl font-medium text-[var(--text-primary)] mb-4"
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                >
                  {feature.title}
                </h3>
                <p className="text-base leading-relaxed text-[var(--text-secondary)]">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-[var(--trust-bg)] rounded-2xl p-8 md:p-12 border border-[var(--trust-border)] backdrop-blur-sm"
        >
          <p className="text-lg leading-relaxed text-[var(--text-secondary)] text-left">
            At Blue Wave Marine, quality is not just a promise—it's our foundation. 
            Every product undergoes strict inspection protocols, temperature monitoring, and traceability tracking. 
            Our partnerships with certified fisheries and aquaculture farms ensure sustainable sourcing practices. 
            With ISO 22000, HACCP, and various international certifications, we meet the highest global standards 
            while providing the flexibility Asian importers need to serve their diverse markets.
          </p>
        </motion.div>
      </div>
    </section>
  );
}