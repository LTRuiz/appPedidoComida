"use client";

import { useState } from "react";
import { useCart, Product } from "@/context/CartContext";
import { Plus, Minus } from "lucide-react";
import ProductModal from "./ProductModal"; 

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { dispatch, getItemQuantity } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const quantity = getItemQuantity(product.id);
  const sinStock = product.stock === false;

  const handleConfirmCustomization = (extras: any[], finalPrice: number) => {
    dispatch({ 
      type: "ADD_ITEM", 
      product: { 
        ...product, 
        price: finalPrice,
        customizations: extras 
      } as any 
    });
    setIsModalOpen(false);
  };
  
  const handleMinus = () =>
    dispatch({ type: "UPDATE_QUANTITY", productId: product.id, quantity: quantity - 1 });

  return (
    <>
      <div className={`product-card ${sinStock ? "opacity-60 grayscale-[0.5]" : ""}`}>
        {product.popular && <span className="popular-badge">🔥 Popular</span>}
        {sinStock && <span className="popular-badge !bg-gray-600">Agotado</span>}
        
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
              {sinStock ? (
                <button className="add-btn !bg-gray-400 cursor-not-allowed" disabled>
                  Sin Stock
                </button>
              ) : quantity > 0 ? (
                <>
                  <button className="qty-btn minus" onClick={handleMinus} aria-label="Quitar">
                    <Minus size={14} />
                  </button>
                  <span className="qty-num">{quantity}</span>
                  <button className="qty-btn plus" onClick={() => setIsModalOpen(true)} aria-label="Agregar">
                    <Plus size={14} />
                  </button>
                </>
              ) : (
                <button className="add-btn" onClick={(e) => { 
                  console.log("CLICK AGREGAR"); 
                  e.stopPropagation(); 
                  setIsModalOpen(true); 
                }}>
                  <Plus size={16} />
                  Agregar
                </button>
                
              )}
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
          <ProductModal
            product={product}
            onClose={() => setIsModalOpen(false)}
            onConfirm={handleConfirmCustomization}
          />
        )}
    </>
  );
}