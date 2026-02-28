import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useParallax from "@/hooks/useParallax";

// ──────────────────────────────────────────────
// Product Data (priceNum added for counter anim)
// ──────────────────────────────────────────────
const products = [
  {
    name: "ATLANTIC SALMON",
    subtitle: "Grade A Premium Cut",
    tag: "Elite Selection",
    price: "$14.50",
    priceNum: 14.5,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAryqBRAPySh9hB229d31zc9R3TFFNX4WmNuEz_N47mw6fkS96cJHL4wDAOWLpvMUfW9lUCpqC-g_k14AmvXHPWkUegkgw-MKbB2y_t8q5eaYML5NVyzyhXybneQcG7YuZQ1FQaHv2ztHvFSd7HkGjcZFDzWEhawAZzSTkNgrXeUCoCiVVljShES3xfVNwRus-dvWiDl9sksUEynSZVtVg8b8-RmOoasgJTeZoR9IxCK4o1lR4h9wjerCf-g-v79ivZCdc3AB3rieY",
  },
  {
    name: "YELLOWFIN TUNA",
    subtitle: "Sashimi Grade",
    tag: "Premium Export",
    price: "$18.20",
    priceNum: 18.2,
    image:
      "https://images.unsplash.com/photo-1598514982777-1e9a1e3f0ad4?q=80&w=2070",
  },
  {
    name: "BLACK TIGER SHRIMP",
    subtitle: "Export Quality",
    tag: "Wild Harvest",
    price: "$11.75",
    priceNum: 11.75,
    image:
      "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?q=80&w=2070",
  },
  {
    name: "KING CRAB",
    subtitle: "Arctic Selection",
    tag: "Luxury Catch",
    price: "$32.00",
    priceNum: 32.0,
    image:
      "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?q=80&w=2070",
  },
  {
    name: "SEA SCALLOPS",
    subtitle: "Dry Pack Premium",
    tag: "Chef Grade",
    price: "$21.40",
    priceNum: 21.4,
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=2070",
  },
];

// ──────────────────────────────
// Config Panel constants
// ──────────────────────────────
const CUT_OPTIONS = [
  { label: "Whole", multiplier: 1.0 },
  { label: "Fillet", multiplier: 1.25 },
  { label: "Steak", multiplier: 1.4 },
];

const PACKAGING_OPTIONS = ["Standard", "Vacuum Sealed", "Ice Pack"];

// ════════════════════════════════════════
// FeaturedHero Component
// ════════════════════════════════════════
export default function FeaturedHero() {
  // ── Rotation state ──
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  // ── Config panel state ──
  const [selectedCut, setSelectedCut] = useState(0);
  const [selectedPackaging, setSelectedPackaging] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // ── Price counter state ──
  const [displayPrice, setDisplayPrice] = useState(0);

  // ── Image loaded state (blur placeholder) ──
  const [imageLoaded, setImageLoaded] = useState(false);

  // ── Parallax hook ──
  const { style: parallaxStyle, handleMove, handleLeave } = useParallax(5);

  const product = products[index];

  // ─── Computed total price ───
  const cutMultiplier = CUT_OPTIONS[selectedCut].multiplier;
  const totalPrice = (product.priceNum * quantity * cutMultiplier).toFixed(2);

  // ──────────────────────────
  // Auto-rotation with pause
  // ──────────────────────────
  const startInterval = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % products.length);
    }, 7000);
  }, []);

  useEffect(() => {
    if (!isPaused) startInterval();
    return () => clearInterval(intervalRef.current);
  }, [isPaused, startInterval]);

  // Reset config on product change — all setState calls here are intentional resets
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setSelectedCut(0);
    setSelectedPackaging(0);
    setQuantity(1);
    setImageLoaded(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);
  /* eslint-enable react-hooks/set-state-in-effect */

  // ──────────────────────
  // Price counter animation
  // ──────────────────────
  useEffect(() => {
    let start = 0;
    const end = product.priceNum;
    const duration = 800;
    const increment = end / (duration / 16);
    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(counter);
      }
      setDisplayPrice(parseFloat(start.toFixed(2)));
    }, 16);
    return () => clearInterval(counter);
  }, [product]);

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
      {/* ── HERO SECTION (locked to viewport) ── */}
      <div
        className="h-screen w-full relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          setIsPaused(false);
          handleLeave();
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
      {/* ── CAUSTIC OVERLAY ── */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] animate-caustic"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, rgba(56,189,248,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(239,68,68,0.2) 0%, transparent 50%)",
          backgroundSize: "600px 600px",
        }}
      />

      {/* ── GHOST TEXT WATERMARK ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[12vw] font-black text-white/[0.02] tracking-widest whitespace-nowrap animate-drift">
          PREMIUM SEAFOOD
        </span>
      </div>

      {/* ── CENTER GRID (same layout) ── */}
      <main className="relative z-10 h-full flex flex-col justify-center items-center px-6 lg:px-12 max-w-[1800px] mx-auto pt-20">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full h-full items-center relative">

          {/* ── CENTER IMAGE with parallax + transitions ── */}
          <div className="col-span-1 lg:col-span-8 lg:col-start-3 relative flex justify-center items-center h-[60vh]">

            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="relative w-full max-w-4xl"
                style={{
                  ...parallaxStyle,
                  willChange: "transform, opacity",
                }}
                onMouseMove={handleMove}
              >
                {/* Blur placeholder */}
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse rounded-lg" />
                )}
                <img
                  src={product.image}
                  className={`w-full h-auto object-contain drop-shadow-2xl rotate-[-5deg] scale-110 transition-all duration-700 ${
                    imageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  alt={product.name}
                  loading="lazy"
                  onLoad={() => setImageLoaded(true)}
                  style={{ willChange: "transform" }}
                />
              </motion.div>
            </AnimatePresence>

            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-2/3 h-12 bg-black/40 blur-xl rounded-[100%]"></div>
          </div>

          {/* ── RIGHT INFO (same position) ── */}
          <div className="col-span-1 lg:col-span-4 lg:col-start-9 flex flex-col justify-center items-end text-right z-20">
            <div className="max-w-md">

              {/* Tag */}
              <AnimatePresence mode="wait">
                <motion.h2
                  key={`tag-${index}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-[#C9A84C] font-bold tracking-[0.3em] text-sm mb-2 uppercase"
                >
                  {product.tag}
                </motion.h2>
              </AnimatePresence>

              {/* ── Product Name — Stagger Letters ── */}
              <h1 className="font-bold text-6xl leading-[0.9] mb-4">
                <AnimatePresence mode="wait">
                  <motion.span key={`name-${index}`} className="inline-block">
                    {product.name.split("").map((char, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.03, duration: 0.3 }}
                        className="inline-block"
                        style={{
                          color:
                            i < product.name.split(" ")[0].length
                              ? "white"
                              : undefined,
                          backgroundImage:
                            i >= product.name.split(" ")[0].length
                              ? "linear-gradient(to right, white, #9ca3af)"
                              : undefined,
                          WebkitBackgroundClip:
                            i >= product.name.split(" ")[0].length
                              ? "text"
                              : undefined,
                          WebkitTextFillColor:
                            i >= product.name.split(" ")[0].length
                              ? "transparent"
                              : undefined,
                        }}
                      >
                        {char === " " ? "\u00A0" : char}
                      </motion.span>
                    ))}
                  </motion.span>
                </AnimatePresence>
              </h1>

              {/* Subtitle */}
              <AnimatePresence mode="wait">
                <motion.h3
                  key={`sub-${index}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="italic text-2xl text-gray-400 mb-8"
                >
                  {product.subtitle}
                </motion.h3>
              </AnimatePresence>

              {/* ── Price Counter ── */}
              <div className="text-3xl font-bold text-white mb-4">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={totalPrice}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    ${quantity > 1 || selectedCut > 0 ? totalPrice : displayPrice.toFixed(2)}
                  </motion.span>
                </AnimatePresence>
                {" "}
                <span className="text-sm text-gray-500">/ LB</span>
              </div>

              {/* ── Config Panel ── */}
              <div className="mb-6 space-y-4">
                {/* Cut Options */}
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Cut</p>
                  <div className="flex gap-2 justify-end">
                    {CUT_OPTIONS.map((cut, i) => (
                      <button
                        key={cut.label}
                        onClick={() => setSelectedCut(i)}
                        className={`px-3 py-1.5 text-xs uppercase tracking-wider border transition-all duration-300 ${
                          selectedCut === i
                            ? "border-[#C9A84C] text-[#050D1A] bg-[#C9A84C] shadow-[0_0_20px_rgba(201,168,76,0.3)] font-bold"
                            : "border-white/10 text-gray-400 hover:border-white/30"
                        }`}
                      >
                        {cut.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Packaging Options */}
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Packaging</p>
                  <div className="flex gap-2 justify-end flex-wrap">
                    {PACKAGING_OPTIONS.map((pkg, i) => (
                      <button
                        key={pkg}
                        onClick={() => setSelectedPackaging(i)}
                        className={`px-3 py-1.5 text-xs uppercase tracking-wider border transition-all duration-300 ${
                          selectedPackaging === i
                            ? "border-[#C9A84C] text-[#050D1A] bg-[#C9A84C] font-bold"
                            : "border-white/10 text-gray-400 hover:border-white/30"
                        }`}
                      >
                        {pkg}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity Stepper */}
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Quantity (LB)</p>
                  <div className="flex items-center gap-3 justify-end">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-8 h-8 border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-all flex items-center justify-center"
                    >
                      −
                    </button>
                    <span className="text-lg font-semibold w-8 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-8 h-8 border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-all flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* ── GET QUOTE Button with shimmer ── */}
              <button
                onClick={scrollToContact}
                className="relative overflow-hidden px-8 py-4 border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#050D1A] transition group"
              >
                <span className="relative z-10 font-bold">GET QUOTE →</span>
                <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

            </div>
          </div>

        </div>

        {/* ── SIDE INDEX ── */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 text-gray-500 text-sm tracking-widest hidden lg:block">
          {String(index + 1).padStart(2, "0")} / {products.length}
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
              className={`relative w-3 h-3 rounded-full transition-all duration-300 hover:scale-150 ${
                i === index
                  ? "bg-[#C9A84C] scale-125 shadow-[0_0_10px_rgba(201,168,76,0.5)]"
                  : "bg-white/30 hover:bg-white"
              }`}
            >
              {/* Progress bar under active dot */}
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
      </div>{/* end hero h-screen wrapper */}
    </div>
  );
}