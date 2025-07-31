import { Product } from "@/home/types/product";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

export interface UseCartStore {
  cart: CartState;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (productId: number) => number;
}
