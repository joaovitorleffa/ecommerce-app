import { createContext, ReactNode, useContext } from "react";
import { useCartStore } from "../store/cart-store";

interface CartContextType {
  cart: ReturnType<typeof useCartStore>["cart"];
  addToCart: ReturnType<typeof useCartStore>["addToCart"];
  removeFromCart: ReturnType<typeof useCartStore>["removeFromCart"];
  updateQuantity: ReturnType<typeof useCartStore>["updateQuantity"];
  getItemQuantity: ReturnType<typeof useCartStore>["getItemQuantity"];
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
