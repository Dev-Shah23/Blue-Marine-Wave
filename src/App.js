import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import CatalogPage from "./pages/CatalogPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "next-themes";
import { motion, useScroll, useSpring } from "framer-motion";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    // Don't fight in-page anchor navigation — when there's a hash, the target
    // page (e.g. Home) scrolls to the section itself.
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function GlobalStyles() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      {/* Global Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[var(--accent-gold)] z-[100] origin-left shadow-[0_0_10px_rgba(201,168,76,0.5)]"
        style={{ scaleX }}
      />
    </>
  );
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <BrowserRouter>
        <ScrollToTop />
        <GlobalStyles />
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
