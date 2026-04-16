"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { buildWhatsAppMessage, openWhatsApp, formatPrice } from "@/utils/whatsapp";
import { Trash2, ShoppingBag, X, MapPin, User, Phone, MessageSquare, MapPinHouse, Banknote, Building2, CreditCard, Store, MessageCircle, Plus, Minus } from "lucide-react";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { state, dispatch, totalPrice } = useCart();
  const [errors, setErrors] = useState<string[]>([]);

  const handleQuantity = (productId: string, qty: number) => {
    dispatch({ type: "UPDATE_QUANTITY", productId, quantity: qty });
  };

  const handleSendOrder = () => {
    const errs: string[] = [];
    if (!state.customerName.trim()) errs.push("Ingresá tu nombre");
    if (!state.deliveryMethod) errs.push("Elegí si querés delivery o retiro");
    if (state.deliveryMethod === "delivery" && !state.address.trim())
      errs.push("Ingresá tu dirección para el delivery");
    if (state.items.length === 0) errs.push("Tu pedido está vacío");

    if (errs.length > 0) {
      setErrors(errs);
      return;
    }
    setErrors([]);

    const message = buildWhatsAppMessage(
      state.items,
      totalPrice,
      state.deliveryMethod,
      state.address,
      state.customerName,
      state.customerPhone,
      state.notes,
      state.paymentMethod
    );
    openWhatsApp(message);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`cart-overlay ${isOpen ? "active" : ""}`}
        onClick={onClose}
      />
      {/* Sidebar */}
      <aside className={`cart-sidebar ${isOpen ? "open" : ""}`}>
        <div className="cart-header">
          <div className="cart-title">
            <ShoppingBag size={22} />
            <span>Tu Pedido</span>
          </div>
          <button className="cart-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="cart-body">
          {state.items.length === 0 ? (
            <div className="cart-empty">
              <span className="empty-icon">🛒</span>
              <p>Tu pedido está vacío</p>
              <small>Agregá productos del menú</small>
            </div>
          ) : (
            <div className="cart-items">
              {state.items.map((item) => (
                <div key={item.product.id} className="cart-item">
                  <div className="cart-item-info">
                    <span className="cart-item-name">{item.product.name}</span>
                    <span className="cart-item-price">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                  <div className="cart-item-controls">
                    <button
                      className="qty-btn minus"
                      onClick={() => handleQuantity(item.product.id, item.quantity - 1)}
                    >
                      <Minus size={12} />
                    </button>
                    <span className="qty-num">{item.quantity}</span>
                    <button
                      className="qty-btn plus"
                      onClick={() => handleQuantity(item.product.id, item.quantity + 1)}
                    >
                      <Plus size={12} />
                    </button>
                    <button
                      className="remove-btn"
                      onClick={() => dispatch({ type: "REMOVE_ITEM", productId: item.product.id })}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Delivery method */}
          <div className="cart-section">
            <h4 className="section-title">¿Cómo querés recibir tu pedido?</h4>
            <div className="delivery-options">
              <button
                className={`delivery-option ${state.deliveryMethod === "delivery" ? "selected" : ""}`}
                onClick={() => dispatch({ type: "SET_DELIVERY_METHOD", method: "delivery" })}
              >
                <MapPin size={18} />
                <span>Delivery</span>
              </button>
              <button
                className={`delivery-option ${state.deliveryMethod === "pickup" ? "selected" : ""}`}
                onClick={() => dispatch({ type: "SET_DELIVERY_METHOD", method: "pickup" })}
              >
                <Store size={18} />
                <span>Retirar</span>
              </button>
            </div>

            {state.deliveryMethod === "delivery" && (
              <div style={{position: 'relative', width: '100%'}}>
                <MapPinHouse size={18} style={{
                  position:'absolute',
                  left:'12px',
                  top:'50%',
                  transform:'translateY(-50%)',
                  color: '#9ca3af',
                  pointerEvents: 'none',
                  }} />
                <input
                  className="cart-input"
                  placeholder="Dirección de entrega..."
                  value={state.address}
                  onChange={(e) => dispatch({ type: "SET_ADDRESS", address: e.target.value })}
                  style={{ paddingLeft: '40px', width:'100%'}}
                />
              </div>
            )}
          </div>

          {/* Payment method */}
          <div className="cart-section">
            <h4 className="section-title">Medio de pago</h4>
            <div className="delivery-options">
              <button
                className={`delivery-option ${state.paymentMethod === "cash" ? "selected" : ""}`}
                onClick={() => dispatch({ type: "SET_PAYMENT_METHOD", method: "cash" })}
              >
                <Banknote size={18} />
                <span>Efectivo</span>
              </button>
              <button
                className={`delivery-option ${state.paymentMethod === "transfer" ? "selected" : ""}`}
                onClick={() => dispatch({ type: "SET_PAYMENT_METHOD", method: "transfer" })}
              >
                <Building2 size={18} />
                <span>Transferencia</span>
              </button>
              <button
                className={`delivery-option ${state.paymentMethod === "other" ? "selected" : ""}`}
                onClick={() => dispatch({ type: "SET_PAYMENT_METHOD", method: "other" })}
              >
                <CreditCard size={18} />
                <span>Otro</span>
              </button>
            </div>
          </div>

          {/* Customer info */}
          <div className="cart-section">
            <h4 className="section-title">Tus datos</h4>
            {/* Tu nombre */}
            <div style={{position: 'relative', marginBottom:'10px'}}>
              <User size={18} style={{
                  position:'absolute',
                  left:'12px',
                  top:'50%',
                  transform:'translateY(-50%)',
                  color: '#9ca3af',
                  pointerEvents: 'none',
                  }} />
              <input
                className="cart-input"
                placeholder="Tu nombre *"
                value={state.customerName}
                onChange={(e) => dispatch({ type: "SET_CUSTOMER_NAME", name: e.target.value })}
                style={{ paddingLeft: '40px', width:'100%'}}
              />
            </div>
            {/* Tu teléfono */}
            <div style={{position: 'relative', marginBottom:'10px'}}>
              <Phone size={18} style={{
                  position:'absolute',
                  left:'12px',
                  top:'50%',
                  transform:'translateY(-50%)',
                  color: '#888',
                  pointerEvents: 'none',
                  }} />
              <input
                className="cart-input"
                placeholder="Tu teléfono"
                value={state.customerPhone}
                onChange={(e) => dispatch({ type: "SET_CUSTOMER_PHONE", phone: e.target.value })}
                style={{ paddingLeft: '40px', width:'100%'}}
              />
            </div>
            {/* Aclaraciones */}
            <div style={{ position:'relative' }}>
              <MessageSquare size={18} style={{
                  position:'absolute',
                  left:'12px',
                  top:'19px',
                  transform:'translateY(-50%)',
                  color: '#888',
                  pointerEvents: 'none',
                  }} />
              <textarea
                className="cart-input cart-textarea"
                style={{ paddingLeft: '40px', paddingTop:'10px', width:'100%'}}
                placeholder="Aclaraciones del pedido..."
                value={state.notes}
                onChange={(e) => dispatch({ type: "SET_NOTES", notes: e.target.value })}
                rows={2}
              />
            </div>
          </div>

          {/* Errors */}
          {errors.length > 0 && (
            <div className="cart-errors">
              {errors.map((e, i) => (
                <p key={i}>⚠️ {e}</p>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="cart-footer">
          {state.items.length > 0 && (
            <div className="cart-total">
              <span>Total</span>
              <span className="total-price">{formatPrice(totalPrice)}</span>
            </div>
          )}
          <button
            className="whatsapp-btn"
            onClick={handleSendOrder}
            disabled={state.items.length === 0}
          >
            <MessageCircle size={20} />
            Pedir por WhatsApp
          </button>
        </div>
      </aside>
    </>
  );
}
