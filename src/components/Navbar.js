import { useEffect, useState, useRef } from "react";
import { Anchor, Sun, Moon } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [ripple, setRipple] = useState(null);
  const toggleRef = useRef(null);
  const [prevPath, setPrevPath] = useState(location.pathname);

  // Sync state with path during render (compliant with React lifecycle)
  if (location.pathname !== prevPath) {
    setPrevPath(location.pathname);
    if (location.pathname !== "/") {
      if (activeSection !== "") setActiveSection("");
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (location.pathname !== "/") {
      return;
    }

    const sections = ["products", "quality", "about", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  const scrollToSection = (id) => {
    if (location.pathname !== "/") {
      navigate(`/#${id}`);
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleThemeToggle = (e) => {
    const rect = toggleRef.current.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    setRipple({ x, y });
    
    // Switch theme halfway through animation
    setTimeout(() => {
      setTheme(theme === "dark" ? "light" : "dark");
    }, 400);

    setTimeout(() => setRipple(null), 1000);
  };

  const navLinks = [
    { id: "products", label: "Products" },
    { id: "quality", label: "Quality" },
    { id: "about", label: "About" },
  ];

  const isDark = theme === "dark";
  const navBg = scrolled 
    ? (isDark ? "bg-[#010810]/80" : "bg-[#FAF7F2]/90 shadow-sm")
    : "bg-transparent";
  
  const textColor = scrolled
    ? (isDark ? "text-[#F0F5FF]" : "text-[#0D1F35]")
    : "text-white";

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 backdrop-blur-md ${navBg}`}
      >
        <div className="w-full px-6 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className={`flex items-center gap-3 hover:text-[#C9A84C] transition-colors ${textColor}`}
          >
            <Anchor className="w-7 h-7" />
            <span className="text-lg font-bold tracking-widest font-serif">
              BLUE WAVE MARINE
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 font-medium">
            {navLinks.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`relative py-1 text-sm tracking-wide transition-colors ${
                  activeSection === id ? "text-[#C9A84C]" : `hover:text-[#C9A84C] ${textColor}`
                }`}
              >
                {label}
                {activeSection === id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#C9A84C]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}

            <Link
              to="/catalog"
              className={`relative py-1 text-sm tracking-wide transition-colors ${
                location.pathname === "/catalog" ? "text-[#C9A84C]" : `hover:text-[#C9A84C] ${textColor}`
              }`}
            >
              Catalog
              {location.pathname === "/catalog" && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#C9A84C]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>

            {/* Dark / Light Toggle */}
            {mounted && (
              <button
                ref={toggleRef}
                onClick={handleThemeToggle}
                className="text-[#C9A84C] hover:text-[#b08d2f] transition-colors flex items-center justify-center p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5"
                aria-label="Toggle Dark Mode"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            )}

            <button
              onClick={() => scrollToSection("contact")}
              className="relative overflow-hidden bg-[#C9A84C] hover:bg-[#b08d2f] text-white px-6 py-2 rounded-md font-bold tracking-wide transition-all shadow-md active:scale-95 group/btn"
              style={{ background: '#C9A84C' }}
            >
              <span className="relative z-10">Contact</span>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
            </button>
          </div>
        </div>
      </nav>

      {/* Ripple Transition Overlay */}
      <AnimatePresence>
        {ripple && (
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            style={{
              position: "fixed",
              top: ripple.y - 100,
              left: ripple.x - 100,
              width: 200,
              height: 200,
              borderRadius: "50%",
              backgroundColor: isDark ? "#FAF7F2" : "#010810",
              zIndex: 9999,
              pointerEvents: "none",
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}