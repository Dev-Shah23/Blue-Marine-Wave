import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FeaturedShowcase from "@/components/Catalog/FeaturedShowcase";
import Catalog from "@/components/Catalog/Catalog";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import useSeo from "@/hooks/useSeo";

export default function CatalogPage() {
  useSeo({
    title: "Seafood Catalog — Blue Wave Marine",
    description:
      "Browse Blue Wave Marine's export catalog: Atlantic salmon, king crab, tiger prawns, black tiger shrimp, squid and Pacific mackerel — IQF, bulk and retail packs.",
    canonical: "/catalog",
  });

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