"use client";

import { useState, useMemo } from "react";
import { categories, products } from "@/data/menu";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import CartSidebar from "@/components/CartSidebar";
import { CartProvider } from "@/context/CartContext";

function AppContent() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [cartOpen, setCartOpen] = useState(false);

  const filtered = useMemo(() => {
    if (activeCategory === "all") return products;
    return products.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="app">
      <Header onCartOpen={() => setCartOpen(true)} />

      <section className="hero">
        <div className="hero-content">
          <p className="hero-tag">🛵 Delivery · 🏠 Retiro en local</p>
          <h1 className="hero-title">
            Tu comida favorita,<br />
            <span className="hero-accent">cuando querés</span>
          </h1>
          <p className="hero-sub">Pedí directo por WhatsApp. Sin apps, sin registro.</p>
        </div>
        <div className="hero-art">🍔</div>
      </section>

      <nav className="categories-nav">
        <div className="categories-scroll">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`cat-pill ${activeCategory === cat.id ? "active" : ""}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </nav>

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

export default function Home() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
