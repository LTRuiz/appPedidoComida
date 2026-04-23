"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { TenantConfig } from "../lib/getTenant";

interface HeaderProps {
  onCartOpen: () => void;
  tenant: TenantConfig | null;
}

export default function Header({ onCartOpen, tenant }: HeaderProps) {
  const { totalItems, totalPrice } = useCart();

  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img
            src={tenant?.logo || '/logos/default.png'}
            alt={tenant?.name || 'Logo'}
            style={{ width: '45px', height: '45px', objectFit: 'contain' }}
          />
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