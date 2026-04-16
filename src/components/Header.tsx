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
        <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src="https://png.pngtree.com/png-clipart/20250107/original/pngtree-spicy-burger-logo-with-fire-png-image_19863031.png" alt="logo-burger" style={{ width:'45px', height:'45px', objectFit:'contain'}} />
          {/* <div className="logo-text" style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="logo-name" style={{ 
              fontSize: '1.5rem', 
              fontWeight: 'bold', 
              lineHeight: '1.1',
              color: '#fff'
            }}>
              QuickBite
            </span>
            <span className="logo-tagline" style={{ 
              fontSize: '0.75rem', 
              opacity: '0.8',
              color: '#fff'
            }}>
              Comida rápida & sabrosa
            </span>
          </div> */}
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
