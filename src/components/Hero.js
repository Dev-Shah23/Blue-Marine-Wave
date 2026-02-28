import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

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
            backgroundImage: "url('/images/cargo.png')",
            filter: "brightness(0.92) contrast(1.08)",
          }}
        />
      </motion.div>

      {/* Layered Gradients (Balanced) */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

      {/* Content — FULL LEFT ALIGN */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 pt-72 pb-32">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="w-full max-w-none"
        >
          {/* Tag */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="inline-block mb-6 px-4 py-2 rounded-full bg-[#C9A84C]/20 text-[#C9A84C] text-sm font-semibold tracking-wide border border-[#C9A84C]/30 backdrop-blur-sm"
          >
            CERTIFIED GLOBAL LOGISTICS
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.05] tracking-[-0.02em] text-shadow: 0 2px 20px rgba(0,0,0,0.4);"
          >
            Blue Wave Marine <br />
            <span className="bg-gradient-to-r from-[#C9A84C] to-[#f0d78c] bg-clip-text text-transparent">
              Premium Seafood
            </span>{" "}
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            className="mt-6 text-lg md:text-xl text-slate-300 max-w-xl leading-relaxed"
          >
            Certified cold-chain logistics ensuring the highest quality seafood
            delivery worldwide. From open ocean to your distribution center
            with uncompising freshness.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            className="flex flex-wrap gap-5 mt-10"
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

            
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}