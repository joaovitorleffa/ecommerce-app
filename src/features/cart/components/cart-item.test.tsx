import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { CartItem as CartItemType } from "../types/cart";
import { CartItem } from "./cart-item";

// Mock the lucide-react-native icons
jest.mock("lucide-react-native", () => ({
  Minus: "Minus",
  Plus: "Plus",
  Trash: "Trash",
}));

const mockProduct = {
  id: 1,
  name: "Test Product",
  description: "A test product description",
  price: 29.99,
  category: "Electronics",
  imageUrl: "https://example.com/image.jpg",
  stock: 10,
  rating: 4.5,
  reviews: [],
  specifications: {
    weight: "100g",
    battery: "2000mAh",
    connectivity: "WiFi",
  },
};

const mockCartItem: CartItemType = {
  product: mockProduct,
  quantity: 2,
};

const mockOnUpdateQuantity = jest.fn();
const mockOnRemove = jest.fn();

describe("CartItem", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly with product information", () => {
    const { queryByText } = render(
      <CartItem
        item={mockCartItem}
        onUpdateQuantity={mockOnUpdateQuantity}
        onRemove={mockOnRemove}
      />
    );

    expect(queryByText("Test Product")).toBeTruthy();
    expect(queryByText("$29.99")).toBeTruthy();
    expect(queryByText("2")).toBeTruthy();
    expect(queryByText("Total: $59.98")).toBeTruthy();
  });

  it("should display product image correctly", () => {
    const { getByTestId } = render(
      <CartItem
        item={mockCartItem}
        onUpdateQuantity={mockOnUpdateQuantity}
        onRemove={mockOnRemove}
      />
    );

    const image = getByTestId("cart-item-image");
    expect(image.props.source.uri).toBe("https://example.com/image.jpg");
  });

  it("should call onUpdateQuantity with increased quantity when plus button is pressed", () => {
    const { getByTestId } = render(
      <CartItem
        item={mockCartItem}
        onUpdateQuantity={mockOnUpdateQuantity}
        onRemove={mockOnRemove}
      />
    );

    const plusButton = getByTestId("quantity-plus-button");
    fireEvent.press(plusButton);

    expect(mockOnUpdateQuantity).toHaveBeenCalledWith(1, 3);
  });

  it("should call onUpdateQuantity with decreased quantity when minus button is pressed", () => {
    const { getByTestId } = render(
      <CartItem
        item={mockCartItem}
        onUpdateQuantity={mockOnUpdateQuantity}
        onRemove={mockOnRemove}
      />
    );

    const minusButton = getByTestId("quantity-minus-button");
    fireEvent.press(minusButton);

    expect(mockOnUpdateQuantity).toHaveBeenCalledWith(1, 1);
  });

  it("should call onRemove when remove button is pressed", () => {
    const { getByTestId } = render(
      <CartItem
        item={mockCartItem}
        onUpdateQuantity={mockOnUpdateQuantity}
        onRemove={mockOnRemove}
      />
    );

    const removeButton = getByTestId("remove-button");
    fireEvent.press(removeButton);

    expect(mockOnRemove).toHaveBeenCalledWith(1);
  });

  it("should calculate total price correctly", () => {
    const cartItemWithQuantity3 = {
      ...mockCartItem,
      quantity: 3,
    };

    const { getByText } = render(
      <CartItem
        item={cartItemWithQuantity3}
        onUpdateQuantity={mockOnUpdateQuantity}
        onRemove={mockOnRemove}
      />
    );

    expect(getByText("Total: $89.97")).toBeTruthy();
  });

  it("should handle decimal price correctly", () => {
    const cartItemWithDecimalPrice = {
      ...mockCartItem,
      product: {
        ...mockProduct,
        price: 19.99,
      },
      quantity: 2,
    };

    const { queryByText } = render(
      <CartItem
        item={cartItemWithDecimalPrice}
        onUpdateQuantity={mockOnUpdateQuantity}
        onRemove={mockOnRemove}
      />
    );

    expect(queryByText("$19.99")).toBeTruthy();
    expect(queryByText("Total: $39.98")).toBeTruthy();
  });
}); 