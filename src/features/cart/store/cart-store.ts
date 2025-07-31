import { Product } from "@/home/types/product";
import { useCallback, useState } from "react";
import { CartItem, CartState, UseCartStore } from "../types/cart";

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

export const useCartStore = (): UseCartStore => {
  const [cart, setCart] = useState<CartState>(initialState);

  const addToCart = useCallback((product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.items.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        // Update quantity if item already exists
        const updatedItems = prevCart.items.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );

        return {
          items: updatedItems,
          totalItems: prevCart.totalItems + 1,
          totalPrice: prevCart.totalPrice + product.price,
        };
      } else {
        // Add new item
        const newItem: CartItem = { product, quantity: 1 };
        return {
          items: [...prevCart.items, newItem],
          totalItems: prevCart.totalItems + 1,
          totalPrice: prevCart.totalPrice + product.price,
        };
      }
    });
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setCart((prevCart) => {
      const itemToRemove = prevCart.items.find(
        (item) => item.product.id === productId
      );

      if (!itemToRemove) return prevCart;

      const updatedItems = prevCart.items.filter(
        (item) => item.product.id !== productId
      );

      return {
        items: updatedItems,
        totalItems: prevCart.totalItems - itemToRemove.quantity,
        totalPrice:
          prevCart.totalPrice -
          itemToRemove.product.price * itemToRemove.quantity,
      };
    });
  }, []);

  const updateQuantity = useCallback(
    (productId: number, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(productId);
        return;
      }

      setCart((prevCart) => {
        const item = prevCart.items.find(
          (item) => item.product.id === productId
        );
        if (!item) return prevCart;

        const quantityDiff = quantity - item.quantity;
        const updatedItems = prevCart.items.map((cartItem) =>
          cartItem.product.id === productId
            ? { ...cartItem, quantity }
            : cartItem
        );

        return {
          items: updatedItems,
          totalItems: prevCart.totalItems + quantityDiff,
          totalPrice: prevCart.totalPrice + item.product.price * quantityDiff,
        };
      });
    },
    [removeFromCart]
  );

  const clearCart = useCallback(() => {
    setCart(initialState);
  }, []);

  const getItemQuantity = useCallback(
    (productId: number) => {
      const item = cart.items.find((item) => item.product.id === productId);
      return item?.quantity || 0;
    },
    [cart.items]
  );

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemQuantity,
  };
};
