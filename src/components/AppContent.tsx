"use client";

import { useState, useMemo, useRef } from "react";
import { categories } from "@/data/menu";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import CartSidebar from "@/components/CartSidebar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import HeroCarrusel from "@/components/HeroCarrusel";
import { useTenant } from "@/context/TenantContext";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  stock: boolean;
  category: string;
}

export default function AppContent({ initialProducts }: { initialProducts: Product[] }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [cartOpen, setCartOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const tenant = useTenant();

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const move = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollTo({ left: scrollLeft + move, behavior: 'smooth' });
    }
  };

  const filtered = useMemo(() => {
    if (activeCategory === "all") return initialProducts;
    return initialProducts.filter((p) => p.category === activeCategory);
  }, [activeCategory, initialProducts]);

  return (
    <div className="app">
      <Header onCartOpen={() => setCartOpen(true)} tenant={tenant} />
      <HeroCarrusel />
      
      <section className="categories-section" style={{ position: 'relative', padding: '0 10px'}}>
        <button onClick={() => scroll("left")} style={arrowButtonStyle({left: '10px'})}>
          <ChevronLeft size={24} />
        </button>

        <div className="categories-grid" ref={scrollRef} style={gridStyle}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`cat-card ${activeCategory === cat.id ? "active" : ""}`}
              onClick={() => setActiveCategory(cat.id)}
              style={{ "--cat-accent": cat.accent, flex:'0 0 auto' } as React.CSSProperties}
            >
              <img src={cat.image} alt={cat.name} className="cat-card-img" />
              <div className="cat-card-overlay" />
              <span className="cat-card-name">{cat.name}</span>
              {activeCategory === cat.id && <span className="cat-card-check">✓</span>}
            </button>
          ))}
        </div>

        <button onClick={() => scroll("right")} style={arrowButtonStyle({right: '10px'})}>
          <ChevronRight size={24} />
        </button>
      </section>

      <main className="main-content">
        <div className="section-header">
          <h2 className="section-title">
            {categories.find((c) => c.id === activeCategory)?.name ?? "Menú"}
          </h2>
          <span className="product-count">{filtered.length} productos</span>
        </div>
        <div className="products-grid">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}

// Estilos movidos afuera para limpieza
const gridStyle: React.CSSProperties = {
  display:'flex',
  overflowX:'auto',
  scrollBehavior: 'smooth',
  gap:'12px',
  padding:'15px 60px',
  scrollbarWidth: 'none',
};

const arrowButtonStyle = (pos: { left?: string; right?: string }): React.CSSProperties => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 10,
  backgroundColor: '#FF5722',
  color: 'white',
  border: 'none',
  borderRadius: '50%',
  width: '36px',
  height: '36px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
  ...pos
});