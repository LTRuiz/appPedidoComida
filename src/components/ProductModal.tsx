"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { createPortal } from "react-dom";

interface ProductModalProps {
  product: any;
  onClose: () => void;
  onConfirm: (customizations: any[], finalPrice: number) => void;
}

export default function ProductModal({ product, onClose, onConfirm }: ProductModalProps) {
  const [selectedExtras, setSelectedExtras] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    console.log("modal-root existe?", document.getElementById("modal-root"));
    }, []);

  const extraPrice = selectedExtras.reduce((sum, item) => sum + item.price, 0);
  const finalPrice = product.price + extraPrice;

  const toggleExtra = (ing: any) => {
    const exists = selectedExtras.find((i) => i.name === ing.name);
    if (exists) {
      setSelectedExtras(selectedExtras.filter((i) => i.name !== ing.name));
    } else {
      setSelectedExtras([...selectedExtras, ing]);
    }
  };

    console.log("mounted:", mounted, "isModalOpen debería ser true acá");

    if (!mounted) return null;

    const modalRoot = document.getElementById("modal-root");
    console.log("modalRoot:", modalRoot);
    if (!modalRoot) return null;

  return createPortal(
    <div onClick={onClose} style={{ 
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', 
        backgroundColor: 'rgba(0,0,0,0.8)', padding: '1rem', animation: 'modalFadeIn 0.25s ease'
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{ 
        background: '#1A1A1A', 
        width:'100%', maxWidth:'32rem', borderRadius:'1rem', 
        overflow:'hidden', position:'relative', maxHeight:'90vh', 
        display:'flex', flexDirection:'column',
        border: '1px solid #2E2E2E', animation: 'modalSlideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
      }}>
        
        <button onClick={onClose} style={{ position:'absolute', top:'1rem', right:'1rem', background:'#2E2E2E', border:'none', borderRadius:'50%', padding:'6px', cursor:'pointer', zIndex:10, display:'flex', color:'white' }}>
          <X size={20} />
        </button>

        <img src={product.image} alt={product.name} style={{ width:'100%', height:'224px', objectFit:'cover' }} />

        <div style={{ padding:'1.5rem', overflowY:'auto' }}>
          <h2 style={{ fontSize:'1.5rem', fontWeight:'700', margin:0, color:'#F0F0F0' }}>{product.name}</h2>
          <p style={{ color:'#9A9A9A', marginTop:'4px' }}>{product.description}</p>

          <div style={{ marginTop:'1.5rem' }}>
            <h3 style={{ fontWeight:'700', fontSize:'1.1rem', marginBottom:'0.75rem', color:'#F0F0F0' }}>Personalizá tu pedido</h3>
            {product.ingredients?.map((ing: any, index: number) => (
              <div key={index} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0.75rem 0', borderBottom:'1px solid #2E2E2E' }}>
                <div>
                  <p style={{ fontWeight:'500', margin:0, color:'#F0F0F0' }}>{ing.name}</p>
                  {ing.price > 0 && <p style={{ color:'#FF5722', fontSize:'0.875rem', margin:0 }}>+$ {ing.price}</p>}
                </div>
                <button
                  onClick={() => toggleExtra(ing)}
                  style={{ 
                    padding:'4px 16px', borderRadius:'50px', 
                    border: selectedExtras.find(i => i.name === ing.name) ? 'none' : '1px solid #2E2E2E', 
                    background: selectedExtras.find(i => i.name === ing.name) ? '#FF5722' : '#242424', 
                    color: selectedExtras.find(i => i.name === ing.name) ? 'white' : '#F0F0F0', 
                    cursor:'pointer', fontWeight:'500' 
                  }}
                >
                  {selectedExtras.find(i => i.name === ing.name) ? 'Agregado' : 'Agregar'}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding:'1.5rem', background:'#242424', borderTop:'1px solid #2E2E2E' }}>
          <button 
            onClick={() => onConfirm(selectedExtras, finalPrice)}
            style={{ width:'100%', background:'#FF5722', color:'white', padding:'1rem', borderRadius:'0.75rem', fontWeight:'700', fontSize:'1.1rem', border:'none', cursor:'pointer', display:'flex', justifyContent:'space-between', paddingLeft:'2rem', paddingRight:'2rem' }}
          >
            <span>Agregar al carrito</span>
            <span>$ {finalPrice.toLocaleString("es-AR")}</span>
          </button>
        </div>
      </div>
    </div>,
    modalRoot
  );
}