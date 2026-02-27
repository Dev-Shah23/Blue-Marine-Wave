import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion, useScroll } from "framer-motion";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import CatalogPage from "./pages/CatalogPage";


function App() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="App">
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-[#C9A84C] origin-left z-[100] shadow-[0_0_10px_rgba(201,168,76,0.6)] pointer-events-none"
        style={{ scaleX: scrollYProgress }}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/catalog" element={<CatalogPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
