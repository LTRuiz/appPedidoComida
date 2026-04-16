"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface HeaderProps {
  onCartOpen: () => void;
}

export default function Header({ onCartOpen }: HeaderProps) {
  const { totalItems, totalPrice } = useCart();

  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="logo">
          <span className="logo-icon">🔥</span>
          <div className="logo-text">
            <span className="logo-name">QuickBite</span>
            <span className="logo-tagline">Comida rápida & sabrosa</span>
          </div>
        </div>

        <button className="cart-trigger" onClick={onCartOpen}>
          <ShoppingBag size={20} />
          <span className="cart-trigger-label">Mi Pedido</span>
          {totalItems > 0 && (
            <>
              <span className="cart-badge">{totalItems}</span>
              <span className="cart-trigger-price">
                ${totalPrice.toLocaleString("es-AR")}
              </span>
            </>
          )}
        </button>
      </div>
    </header>
  );
}
