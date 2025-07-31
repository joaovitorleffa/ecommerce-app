import { createContext, ReactNode, useContext } from "react";
import { useCartStore } from "../store/cart-store";
import { UseCartStore } from "../types/cart";

interface CartContextType {
  cart: UseCartStore["cart"];
  addToCart: UseCartStore["addToCart"];
  removeFromCart: UseCartStore["removeFromCart"];
  updateQuantity: UseCartStore["updateQuantity"];
  getItemQuantity: UseCartStore["getItemQuantity"];
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const cartStore = useCartStore();

  return (
    <CartContext.Provider value={cartStore}>{children}</CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
