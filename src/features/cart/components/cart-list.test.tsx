import { productMock } from "@/mocks/product.mock";
import { render } from "@testing-library/react-native";
import { CartItem, UseCartStore } from "../types/cart";
import { CartList } from "./cart-list";

// Mock the cart context
const mockUpdateQuantity = jest.fn();
const mockRemoveFromCart = jest.fn();

const mockCartContext: UseCartStore = {
  cart: {
    items: [],
    totalItems: 0,
    totalPrice: 0,
  },
  clearCart: jest.fn(),
  addToCart: jest.fn(),
  removeFromCart: mockRemoveFromCart,
  updateQuantity: mockUpdateQuantity,
  getItemQuantity: jest.fn(),
};

// Mock the useCart hook
jest.mock("../context/cart-context", () => ({
  ...jest.requireActual("../context/cart-context"),
  useCart: () => mockCartContext,
}));

describe("CartList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset cart to empty state
    mockCartContext.cart = {
      items: [],
      totalItems: 0,
      totalPrice: 0,
    };
  });

  describe("Empty Cart State", () => {
    it("should render CartEmpty component when cart is empty", () => {
      const { queryByText } = render(<CartList />);

      expect(queryByText("Your cart is empty")).toBeTruthy();
      expect(queryByText("Add some products to get started!")).toBeTruthy();
    });

    it("should not render FlatList when cart is empty", () => {
      const { queryByTestId } = render(<CartList />);

      // FlatList should not be rendered when cart is empty
      expect(queryByTestId("cart-list")).toBeFalsy();
    });

    it("should not render summary container when cart is empty", () => {
      const { queryByText } = render(<CartList />);

      expect(queryByText("Total Items:")).toBeFalsy();
      expect(queryByText("Total Price:")).toBeFalsy();
      expect(queryByText("Checkout")).toBeFalsy();
    });
  });

  describe("Cart with Items", () => {
    beforeEach(() => {
      const cartItems: CartItem[] = [
        {
          product: productMock,
          quantity: 2,
        },
        {
          product: { ...productMock, id: 2, name: "Product 2", price: 50 },
          quantity: 1,
        },
      ];

      mockCartContext.cart = {
        items: cartItems,
        totalItems: 3,
        totalPrice: 250, // (100 * 2) + (50 * 1)
      };
    });

    it("should render FlatList with cart items", () => {
      const { queryByText } = render(<CartList />);

      // Should render product names
      expect(queryByText("Product 1")).toBeTruthy();
      expect(queryByText("Product 2")).toBeTruthy();
    });

    it("should render correct total items count", () => {
      const { queryByText } = render(<CartList />);

      expect(queryByText("Total Items:")).toBeTruthy();
      expect(queryByText("3")).toBeTruthy();
    });

    it("should render correct total price", () => {
      const { queryByText } = render(<CartList />);

      expect(queryByText("Total Price:")).toBeTruthy();
      expect(queryByText("$250.00")).toBeTruthy();
    });

    it("should render checkout button", () => {
      const { queryByText } = render(<CartList />);

      expect(queryByText("Checkout")).toBeTruthy();
    });

    it("should render CartItem components with correct props", () => {
      const { queryByText } = render(<CartList />);

      // Verify that CartItem components are rendered with the correct data
      // The actual CartItem component rendering is tested separately
      expect(queryByText("Product 1")).toBeTruthy();
      expect(queryByText("Product 2")).toBeTruthy();
    });
  });

  describe("Edge Cases", () => {
    it("should handle cart with zero total price", () => {
      mockCartContext.cart = {
        items: [],
        totalItems: 0,
        totalPrice: 0,
      };

      const { queryByText } = render(<CartList />);

      expect(queryByText("Your cart is empty")).toBeTruthy();
    });
  });
});
