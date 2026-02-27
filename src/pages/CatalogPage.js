import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FeaturedShowcase from "@/components/Catalog/FeaturedShowcase";
import Catalog from "@/components/Catalog/Catalog";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function CatalogPage() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Strip hash and scroll to top on mount
    if (location.hash) {
      navigate(location.pathname, { replace: true });
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname, location.hash, navigate]);

  return (
    <>
      <Navbar />
      <FeaturedShowcase />
      <Catalog />
      <Contact />
      <Footer />
    </>
  );
}