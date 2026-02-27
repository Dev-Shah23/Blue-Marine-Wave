import { useEffect, useState } from "react";
import { Anchor } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (location.pathname !== "/") return;

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

  const getLinkClass = (id) => {
    const isActive = activeSection === id && location.pathname === "/";
    return `relative transition-colors group ${
      isActive ? "text-[#C9A84C]" : "hover:text-[#C9A84C] text-white"
    }`;
  };

  const currentPath = location.pathname;

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#050D1A]/80 backdrop-blur-lg shadow-lg border-b border-white/10"
          : "bg-transparent backdrop-blur-md"
      }`}
    >
      <div className="w-full px-6 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 text-white hover:text-[#C9A84C] transition-colors"
        >
          <Anchor className="w-7 h-7" />
          <span className="text-lg font-bold tracking-widest">
            BLUE WAVE MARINE
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-medium">
          <button
            onClick={() => scrollToSection("products")}
            className={getLinkClass("products")}
          >
            Products
            <div className={`absolute bottom-0 left-0 h-[2px] bg-[#C9A84C] transition-all duration-300 ${activeSection === 'products' && currentPath === '/' ? 'w-full' : 'w-0 group-hover:w-full'}`} />
          </button>

          <button
            onClick={() => scrollToSection("quality")}
            className={getLinkClass("quality")}
          >
            Quality
            <div className={`absolute bottom-0 left-0 h-[2px] bg-[#C9A84C] transition-all duration-300 ${activeSection === 'quality' && currentPath === '/' ? 'w-full' : 'w-0 group-hover:w-full'}`} />
          </button>

          <button
            onClick={() => scrollToSection("about")}
            className={getLinkClass("about")}
          >
            About
            <div className={`absolute bottom-0 left-0 h-[2px] bg-[#C9A84C] transition-all duration-300 ${activeSection === 'about' && currentPath === '/' ? 'w-full' : 'w-0 group-hover:w-full'}`} />
          </button>

          <Link
            to="/catalog"
            className={`relative transition-colors group ${
              currentPath === "/catalog" ? "text-[#C9A84C]" : "hover:text-[#C9A84C] text-white"
            }`}
          >
            Catalog
            <div className={`absolute bottom-0 left-0 h-[2px] bg-[#C9A84C] transition-all duration-300 ${currentPath === '/catalog' ? 'w-full' : 'w-0 group-hover:w-full'}`} />
          </Link>

          <button
            onClick={() => scrollToSection("contact")}
            className="relative overflow-hidden bg-[#C9A84C] hover:bg-[#b08d2f] text-[#050D1A] px-5 py-2 rounded-md font-semibold transition-all shadow-md hover:shadow-[0_0_15px_rgba(201,168,76,0.4)] group/btn animate-pulse-click"
          >
            <span className="relative z-10">Contact</span>
            <div className="absolute inset-0 animate-shimmer opacity-0 group-hover/btn:opacity-100 transition-opacity" />
          </button>
        </div>
      </div>
    </nav>
  );
}