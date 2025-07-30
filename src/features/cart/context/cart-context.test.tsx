import { render, renderHook, screen } from "@testing-library/react-native";
import { Text } from "react-native";
import { CartProvider, useCart } from "./cart-context";

describe("CartContext", () => {
  describe("CartProvider", () => {
    it("should render children without crashing", () => {
      render(
        <CartProvider>
          <Text testID="test-child">Test Child</Text>
        </CartProvider>
      );

      expect(screen.getByTestId("test-child")).toBeTruthy();
    });
  });

  describe("useCart hook", () => {
    it("should return cart context when used within CartProvider", () => {
      const { result } = renderHook(() => useCart(), {
        wrapper: CartProvider,
      });

      expect(result.current).toBeDefined();
      expect(result.current.cart).toBeDefined();
      expect(result.current.addToCart).toBeDefined();
      expect(result.current.removeFromCart).toBeDefined();
      expect(result.current.updateQuantity).toBeDefined();
      expect(result.current.getItemQuantity).toBeDefined();
    });

    it("should throw error when used outside CartProvider", () => {
      // Suppress console.error for this test since we expect an error
      const consoleSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});

      expect(() => {
        renderHook(() => useCart());
      }).toThrow("useCart must be used within a CartProvider");

      consoleSpy.mockRestore();
    });
  });
});
