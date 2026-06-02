import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import useParallax from "@/hooks/useParallax";
import { products as catalogProducts } from "@/data/products";

// ──────────────────────────────────────────────
// Showcase data — curated straight from the live
// catalog so it always stays in sync with products.
// ──────────────────────────────────────────────
const products = catalogProducts.map((p) => ({
  name: p.name.toUpperCase(),
  scientificName: p.scientificName,
  category: p.category,
  description: p.shortDescription,
  forms: p.forms,
  image: p.image,
}));

// ════════════════════════════════════════
// FeaturedShowcase Component
// ════════════════════════════════════════
export default function FeaturedShowcase() {
  // ── Rotation state ──
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  // ── Image loaded state (blur placeholder) ──
  const [imageLoaded, setImageLoaded] = useState(false);

  // ── Parallax hook ──
  const { style: parallaxStyle, handleMove, handleLeave } = useParallax(6);

  const product = products[index];

  // ──────────────────────────
  // Auto-rotation with pause
  // ──────────────────────────
  const startInterval = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % products.length);
    }, 6000);
  }, []);

  useEffect(() => {
    if (!isPaused) startInterval();
    return () => clearInterval(intervalRef.current);
  }, [isPaused, startInterval]);

  // Reset image-loaded flag on product change
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setImageLoaded(false);
  }, [index]);
  /* eslint-enable react-hooks/set-state-in-effect */

  // ──────────────────────
  // Keyboard navigation
  // ──────────────────────
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") {
        setIndex((prev) => (prev + 1) % products.length);
        startInterval();
      } else if (e.key === "ArrowLeft") {
        setIndex((prev) => (prev - 1 + products.length) % products.length);
        startInterval();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [startInterval]);

  // ──────────────────────
  // Touch swipe detection
  // ──────────────────────
  const touchStart = useRef(null);
  const handleTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setIndex((prev) => (prev + 1) % products.length);
      } else {
        setIndex((prev) => (prev - 1 + products.length) % products.length);
      }
      startInterval();
    }
    touchStart.current = null;
  };

  // ──────────────────────
  // Quote scroll
  // ──────────────────────
  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // ══════════════════════
  // RENDER
  // ══════════════════════
  return (
    <div className="text-white font-sans antialiased w-full bg-gradient-to-b from-[#020810] to-[#050D1A] animate-page-fade-in overflow-x-hidden">
      {/* ── SHOWCASE SECTION (locked to viewport) ── */}
      <div
        className="min-h-screen w-full relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          setIsPaused(false);
          handleLeave();
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* ── CAUSTIC OVERLAY ── */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04] animate-caustic"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, rgba(56,189,248,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(201,168,76,0.2) 0%, transparent 50%)",
            backgroundSize: "600px 600px",
          }}
        />

        {/* ── GHOST TEXT WATERMARK ── */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[12vw] font-black text-white/[0.02] tracking-widest whitespace-nowrap animate-drift">
            PREMIUM SEAFOOD
          </span>
        </div>

        {/* ── CENTER GRID ── */}
        <main className="relative z-10 min-h-screen flex flex-col justify-center px-6 lg:px-12 max-w-[1500px] mx-auto pt-28 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 w-full items-center">
            {/* ── PRODUCT IMAGE with parallax + transitions ── */}
            <div className="relative flex justify-center items-center order-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  className="relative w-full max-w-xl aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10"
                  style={{ ...parallaxStyle, willChange: "transform, opacity" }}
                  onMouseMove={handleMove}
                >
                  {/* Blur placeholder */}
                  {!imageLoaded && (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse" />
                  )}
                  <img
                    src={product.image}
                    className={`w-full h-full object-cover transition-all duration-700 ${
                      imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
                    }`}
                    alt={product.name}
                    loading="lazy"
                    onLoad={() => setImageLoaded(true)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute top-4 left-4 bg-black/50 backdrop-blur px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                    {product.category}
                  </span>
                  <span className="absolute top-4 right-4 bg-[#C9A84C]/90 backdrop-blur px-3 py-1.5 rounded-full text-[10px] font-bold text-[#050D1A]">
                    Origin: India
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ── RIGHT INFO ── */}
            <div className="flex flex-col justify-center order-2 z-20">
              <div className="max-w-lg">
                {/* Category tag */}
                <AnimatePresence mode="wait">
                  <motion.p
                    key={`tag-${index}`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-[#C9A84C] font-bold tracking-[0.3em] text-xs mb-3 uppercase"
                  >
                    Featured Catalog · {product.category}
                  </motion.p>
                </AnimatePresence>

                {/* Product Name — Stagger Letters */}
                <h1 className="font-bold text-5xl lg:text-6xl leading-[0.95] mb-4 font-serif">
                  <AnimatePresence mode="wait">
                    <motion.span key={`name-${index}`} className="inline-block">
                      {product.name.split(" ").map((word, wIdx) => {
                        const wordsBefore = product.name.split(" ").slice(0, wIdx);
                        const prevCharCount = wordsBefore.reduce(
                          (acc, w) => acc + w.length + 1,
                          0
                        );
                        return (
                          <span key={wIdx}>
                            {wIdx > 0 && " "}
                            <span className="inline-block whitespace-nowrap">
                              {word.split("").map((char, cIdx) => {
                                const globalIndex = prevCharCount + cIdx;
                                return (
                                  <motion.span
                                    key={cIdx}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: globalIndex * 0.03, duration: 0.3 }}
                                    className="inline-block"
                                  >
                                    {char}
                                  </motion.span>
                                );
                              })}
                            </span>
                          </span>
                        );
                      })}
                    </motion.span>
                  </AnimatePresence>
                </h1>

                {/* Scientific name */}
                <AnimatePresence mode="wait">
                  <motion.p
                    key={`sci-${index}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="italic text-xl text-gray-400 mb-5"
                  >
                    {product.scientificName}
                  </motion.p>
                </AnimatePresence>

                {/* Description */}
                <AnimatePresence mode="wait">
                  <motion.p
                    key={`desc-${index}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-gray-300 leading-relaxed mb-6 max-w-md"
                  >
                    {product.description}
                  </motion.p>
                </AnimatePresence>

                {/* Processing forms */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`forms-${index}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, delay: 0.25 }}
                    className="flex flex-wrap gap-2 mb-8"
                  >
                    {product.forms.map((form) => (
                      <span
                        key={form}
                        className="px-3 py-1.5 text-[11px] uppercase tracking-wider border border-white/15 text-gray-300 rounded-md"
                      >
                        {form}
                      </span>
                    ))}
                  </motion.div>
                </AnimatePresence>

                {/* Request Quote */}
                <button
                  onClick={scrollToContact}
                  className="relative overflow-hidden px-8 py-4 bg-[#C9A84C] text-[#050D1A] font-bold rounded-lg hover:bg-[#b08d2f] transition group inline-flex items-center gap-2"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Request a Quote
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>
            </div>
          </div>

          {/* ── SIDE INDEX ── */}
          <div className="absolute left-8 top-1/2 -translate-y-1/2 text-gray-500 text-sm tracking-widest hidden lg:block">
            {String(index + 1).padStart(2, "0")} / {String(products.length).padStart(2, "0")}
          </div>

          {/* ── DOT NAVIGATION with progress bar ── */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
            {products.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setIndex(i);
                  startInterval();
                }}
                aria-label={`Show product ${i + 1}`}
                className={`relative w-3 h-3 rounded-full transition-all duration-300 hover:scale-150 ${
                  i === index
                    ? "bg-[#C9A84C] scale-125 shadow-[0_0_10px_rgba(201,168,76,0.5)]"
                    : "bg-white/30 hover:bg-white"
                }`}
              >
                {i === index && (
                  <div
                    key={`progress-${index}`}
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-[2px] bg-[#C9A84C] animate-progress rounded-full"
                    style={{ maxWidth: "24px" }}
                  />
                )}
              </button>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
