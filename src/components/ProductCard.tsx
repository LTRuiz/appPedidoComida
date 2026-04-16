"use client";

import { Product } from "@/data/menu";
import { useCart } from "@/context/CartContext";
import { Plus, Minus } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { dispatch, getItemQuantity } = useCart();
  const quantity = getItemQuantity(product.id);

  const handleAdd = () => dispatch({ type: "ADD_ITEM", product });
  const handleMinus = () =>
    dispatch({ type: "UPDATE_QUANTITY", productId: product.id, quantity: quantity - 1 });

  return (
    <div className="product-card">
      {product.popular && <span className="popular-badge">🔥 Popular</span>}
      <div className="product-img-wrap">
        <img src={product.image} alt={product.name} className="product-img" />
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-desc">{product.description}</p>
        <div className="product-footer">
          <span className="product-price">
            ${product.price.toLocaleString("es-AR")}
          </span>
          <div className="qty-control">
            {quantity > 0 ? (
              <>
                <button className="qty-btn minus" onClick={handleMinus} aria-label="Quitar">
                  <Minus size={14} />
                </button>
                <span className="qty-num">{quantity}</span>
                <button className="qty-btn plus" onClick={handleAdd} aria-label="Agregar">
                  <Plus size={14} />
                </button>
              </>
            ) : (
              <button className="add-btn" onClick={handleAdd}>
                <Plus size={16} />
                Agregar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
