import { productMock } from "@/mocks/product.mock";
import { act, renderHook } from "@testing-library/react-native";
import { useCartStore } from "./cart-store";

describe("useCartStore", () => {
  beforeEach(() => {
    // Reset the store to initial state before each test
    const { result } = renderHook(() => useCartStore());
    act(() => {
      result.current.clearCart();
    });
  });

  describe("initial state", () => {
    it("should initialize with empty cart", () => {
      const { result } = renderHook(() => useCartStore());

      expect(result.current.cart.items).toEqual([]);
      expect(result.current.cart.totalItems).toBe(0);
      expect(result.current.cart.totalPrice).toBe(0);
    });
  });

  describe("addToCart", () => {
    it("should add a new product to cart", () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addToCart(productMock);
      });

      expect(result.current.cart.items).toHaveLength(1);
      expect(result.current.cart.items[0].product).toEqual(productMock);
      expect(result.current.cart.items[0].quantity).toBe(1);
      expect(result.current.cart.totalItems).toBe(1);
      expect(result.current.cart.totalPrice).toBe(productMock.price);
    });

    it("should increment quantity when adding existing product", () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addToCart(productMock);
        result.current.addToCart(productMock);
      });

      expect(result.current.cart.items).toHaveLength(1);
      expect(result.current.cart.items[0].quantity).toBe(2);
      expect(result.current.cart.totalItems).toBe(2);
      expect(result.current.cart.totalPrice).toBe(productMock.price * 2);
    });

    it("should handle multiple different products", () => {
      const { result } = renderHook(() => useCartStore());
      const secondProduct = {
        ...productMock,
        id: 2,
        name: "Product 2",
        price: 200,
      };

      act(() => {
        result.current.addToCart(productMock);
        result.current.addToCart(secondProduct);
      });

      expect(result.current.cart.items).toHaveLength(2);
      expect(result.current.cart.totalItems).toBe(2);
      expect(result.current.cart.totalPrice).toBe(
        productMock.price + secondProduct.price
      );
    });
  });

  describe("updateQuantity", () => {
    it("should update quantity of existing item", () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addToCart(productMock);
        result.current.updateQuantity(productMock.id, 3);
      });

      expect(result.current.cart.items[0].quantity).toBe(3);
      expect(result.current.cart.totalItems).toBe(3);
      expect(result.current.cart.totalPrice).toBe(productMock.price * 3);
    });

    it("should remove item when quantity is set to 0", () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addToCart(productMock);
        result.current.updateQuantity(productMock.id, 0);
      });

      expect(result.current.cart.items).toHaveLength(0);
      expect(result.current.cart.totalItems).toBe(0);
      expect(result.current.cart.totalPrice).toBe(0);
    });

    it("should remove item when quantity is negative", () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addToCart(productMock);
        result.current.updateQuantity(productMock.id, -1);
      });

      expect(result.current.cart.items).toHaveLength(0);
      expect(result.current.cart.totalItems).toBe(0);
      expect(result.current.cart.totalPrice).toBe(0);
    });

    it("should not change cart when updating non-existent product", () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addToCart(productMock);
        result.current.updateQuantity(999, 5);
      });

      expect(result.current.cart.items).toHaveLength(1);
      expect(result.current.cart.items[0].quantity).toBe(1);
      expect(result.current.cart.totalItems).toBe(1);
      expect(result.current.cart.totalPrice).toBe(productMock.price);
    });

    it("should handle quantity decrease correctly", () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addToCart(productMock);
        result.current.addToCart(productMock); // quantity = 2
        result.current.updateQuantity(productMock.id, 1);
      });

      expect(result.current.cart.items[0].quantity).toBe(1);
      expect(result.current.cart.totalItems).toBe(1);
      expect(result.current.cart.totalPrice).toBe(productMock.price);
    });
  });

  describe("clearCart", () => {
    it("should clear all items from cart", () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addToCart(productMock);
        result.current.clearCart();
      });

      expect(result.current.cart.items).toEqual([]);
      expect(result.current.cart.totalItems).toBe(0);
      expect(result.current.cart.totalPrice).toBe(0);
    });

    it("should reset cart to initial state", () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addToCart(productMock);
        result.current.addToCart(productMock);
        result.current.clearCart();
      });

      expect(result.current.cart).toEqual({
        items: [],
        totalItems: 0,
        totalPrice: 0,
      });
    });
  });

  describe("getItemQuantity", () => {
    it("should return correct quantity for existing item", () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addToCart(productMock);
        result.current.addToCart(productMock);
      });

      expect(result.current.getItemQuantity(productMock.id)).toBe(2);
    });

    it("should return 0 for non-existent item", () => {
      const { result } = renderHook(() => useCartStore());

      expect(result.current.getItemQuantity(999)).toBe(0);
    });

    it("should return 0 for empty cart", () => {
      const { result } = renderHook(() => useCartStore());

      expect(result.current.getItemQuantity(productMock.id)).toBe(0);
    });
  });

  describe("removeFromCart", () => {
    // Placeholder describe block as requested
    it("should be implemented", () => {
      expect(true).toBe(true);
    });
  });
});
