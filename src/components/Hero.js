import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import heroImg from "../assets/hero.avif";

export default function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollY } = useScroll();

  // Smooth parallax
  const y = useTransform(scrollY, [0, 600], [0, 120]);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      className={`relative min-h-screen flex items-center justify-center overflow-hidden text-white gold-bottom-border ${isInView ? "in-view" : ""}`}
    >
      {/* Background with Parallax — seafood flat-lay (framed edges, dark centre) */}
      <motion.div style={{ y }} className="absolute inset-0">
        <div
          className="w-full h-full bg-cover bg-center animate-zoom"
          style={{
            backgroundImage: `url(${heroImg})`,
            filter: "brightness(0.95) contrast(1.05)",
          }}
        />
      </motion.div>

      {/* Overlays — keep the seafood visible while guaranteeing centre text contrast */}
      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/55" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at center, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.15) 55%, transparent 80%)",
        }}
      />

      {/* Centered content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center py-32">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="flex flex-col items-center"
        >
          {/* Primary heading — company name (dominant) */}
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            className="font-serif font-bold leading-[0.95] tracking-tight text-6xl sm:text-7xl lg:text-8xl xl:text-9xl drop-shadow-[0_2px_30px_rgba(0,0,0,0.7)]"
          >
            Blue Wave{" "}
            <span className="bg-gradient-to-r from-[#C9A84C] to-[#f0d78c] bg-clip-text text-transparent">
              Marine
            </span>
          </motion.h1>

          {/* Secondary tagline — supporting, framed by symmetric gold rules */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="mt-6 flex items-center justify-center gap-4"
          >
            <span className="h-px w-8 sm:w-12 bg-[#C9A84C]/80" />
            <p className="font-serif italic font-light tracking-wide text-slate-100 text-xl sm:text-2xl lg:text-3xl whitespace-nowrap drop-shadow-[0_1px_14px_rgba(0,0,0,0.7)]">
              Rising With Every Tide
            </p>
            <span className="h-px w-8 sm:w-12 bg-[#C9A84C]/80" />
          </motion.div>

          {/* Supporting line */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            className="mt-6 text-base md:text-lg text-slate-200/90 max-w-xl mx-auto leading-relaxed drop-shadow-[0_1px_10px_rgba(0,0,0,0.6)]"
          >
            From India's coastline to the world's finest tables — sustainably
            sourced and delivered with uncompromising freshness and cold-chain
            precision.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            className="flex flex-wrap gap-4 mt-10 justify-center"
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
              className="px-8 py-4 rounded-lg font-bold border border-white/30 text-white hover:bg-white/10 hover:border-white/50 backdrop-blur-sm transition-all flex items-center gap-2"
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
