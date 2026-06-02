import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";

// Premium maritime hero visual — dramatic ocean horizon at golden hour.
// Swap this single URL (or drop a local file) to change the hero background.
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?q=80&w=2400&auto=format&fit=crop";

export default function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollY } = useScroll();

  // Smooth parallax
  const y = useTransform(scrollY, [0, 600], [0, 150]);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      className={`relative min-h-screen flex items-center overflow-hidden text-white gold-bottom-border ${isInView ? "in-view" : ""}`}
    >
      {/* Background with Parallax */}
      <motion.div style={{ y }} className="absolute inset-0">
        <div
          className="w-full h-full bg-cover bg-center animate-zoom"
          style={{
            backgroundImage: `url('${HERO_IMAGE}')`,
            filter: "brightness(0.82) contrast(1.06)",
          }}
        />
      </motion.div>

      {/* Layered Gradients — depth + text legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/25" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-32">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="max-w-3xl"
        >
          {/* Eyebrow */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="inline-flex items-center gap-2 mb-7 px-4 py-2 rounded-full bg-[#C9A84C]/15 text-[#C9A84C] text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase border border-[#C9A84C]/30 backdrop-blur-sm"
          >
            Blue Wave Marine · Premium Seafood Exports
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            className="font-serif font-bold leading-[1.04] tracking-tight text-5xl sm:text-6xl lg:text-8xl drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)]"
          >
            Rising With <br className="hidden sm:block" />
            The{" "}
            <span className="bg-gradient-to-r from-[#C9A84C] to-[#f0d78c] bg-clip-text text-transparent">
              Tide
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            className="mt-7 text-lg md:text-xl text-slate-200/90 max-w-xl leading-relaxed"
          >
            From India's coastline to the world's finest tables — sustainably
            sourced, export-grade seafood delivered with uncompromising freshness
            and cold-chain precision.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            className="flex flex-wrap gap-4 mt-10"
          >
            <button
              onClick={() => scrollToSection("contact")}
              className="relative overflow-hidden bg-[#C9A84C] hover:bg-[#b08d2f] text-[#050D1A] px-8 py-4 rounded-lg font-bold flex items-center gap-2 transition-all shadow-lg hover:shadow-[0_0_20px_rgba(201,168,76,0.4)] group/btn animate-pulse-click"
            >
              <span className="relative z-10 flex items-center gap-2">
                Request Export Quote
                <ArrowRight size={18} />
              </span>
              <div className="absolute inset-0 animate-shimmer opacity-0 group-hover/btn:opacity-100 transition-opacity" />
            </button>

            <Link
              to="/catalog"
              className="px-8 py-4 rounded-lg font-bold border border-white/25 text-white hover:bg-white/10 hover:border-white/40 backdrop-blur-sm transition-all flex items-center gap-2"
            >
              Explore Catalog
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
