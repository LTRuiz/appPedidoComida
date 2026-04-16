"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { Product } from "@/data/menu";

export interface CartItem {
  product: Product;
  quantity: number;
}

export type DeliveryMethod = "delivery" | "pickup" | null;

interface CartState {
  items: CartItem[];
  deliveryMethod: DeliveryMethod;
  address: string;
  customerName: string;
  customerPhone: string;
  notes: string;
}

type CartAction =
  | { type: "ADD_ITEM"; product: Product }
  | { type: "REMOVE_ITEM"; productId: string }
  | { type: "UPDATE_QUANTITY"; productId: string; quantity: number }
  | { type: "SET_DELIVERY_METHOD"; method: DeliveryMethod }
  | { type: "SET_ADDRESS"; address: string }
  | { type: "SET_CUSTOMER_NAME"; name: string }
  | { type: "SET_CUSTOMER_PHONE"; phone: string }
  | { type: "SET_NOTES"; notes: string }
  | { type: "CLEAR_CART" };

const initialState: CartState = {
  items: [],
  deliveryMethod: null,
  address: "",
  customerName: "",
  customerPhone: "",
  notes: "",
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find((i) => i.product.id === action.product.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.product.id === action.product.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { ...state, items: [...state.items, { product: action.product, quantity: 1 }] };
    }
    case "REMOVE_ITEM":
      return { ...state, items: state.items.filter((i) => i.product.id !== action.productId) };
    case "UPDATE_QUANTITY": {
      if (action.quantity <= 0) {
        return { ...state, items: state.items.filter((i) => i.product.id !== action.productId) };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.product.id === action.productId ? { ...i, quantity: action.quantity } : i
        ),
      };
    }
    case "SET_DELIVERY_METHOD":
      return { ...state, deliveryMethod: action.method };
    case "SET_ADDRESS":
      return { ...state, address: action.address };
    case "SET_CUSTOMER_NAME":
      return { ...state, customerName: action.name };
    case "SET_CUSTOMER_PHONE":
      return { ...state, customerPhone: action.phone };
    case "SET_NOTES":
      return { ...state, notes: action.notes };
    case "CLEAR_CART":
      return initialState;
    default:
      return state;
  }
}

interface CartContextType {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  totalItems: number;
  totalPrice: number;
  getItemQuantity: (productId: string) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const getItemQuantity = (productId: string) =>
    state.items.find((i) => i.product.id === productId)?.quantity ?? 0;

  return (
    <CartContext.Provider value={{ state, dispatch, totalItems, totalPrice, getItemQuantity }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
