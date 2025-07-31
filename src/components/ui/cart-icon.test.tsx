import { useCart } from "@/cart/context/cart-context";
import { fireEvent, render } from "@testing-library/react-native";
import { CartIcon } from "./cart-icon";

// Mock the cart context
jest.mock("@/cart/context/cart-context");

const mockUseCart = useCart as jest.MockedFunction<typeof useCart>;

describe("CartIcon", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render cart icon without badge when cart is empty", () => {
    mockUseCart.mockReturnValue({
      cart: { totalItems: 0, items: [], totalPrice: 0 },
      addToCart: jest.fn(),
      removeFromCart: jest.fn(),
      updateQuantity: jest.fn(),
      getItemQuantity: jest.fn(),
    });

    const onPress = jest.fn();
    const { queryByText } = render(<CartIcon onPress={onPress} />);

    // Should not show badge when cart is empty
    expect(queryByText("0")).toBeNull();
  });

  it("should render cart icon with badge when cart has items", () => {
    mockUseCart.mockReturnValue({
      cart: { totalItems: 5, items: [], totalPrice: 25.99 },
      addToCart: jest.fn(),
      removeFromCart: jest.fn(),
      updateQuantity: jest.fn(),
      getItemQuantity: jest.fn(),
    });

    const onPress = jest.fn();
    const { getByText } = render(<CartIcon onPress={onPress} />);

    expect(getByText("5")).toBeTruthy();
  });

  it("should display 99+ when cart has more than 99 items", () => {
    mockUseCart.mockReturnValue({
      cart: { totalItems: 150, items: [], totalPrice: 750.50 },
      addToCart: jest.fn(),
      removeFromCart: jest.fn(),
      updateQuantity: jest.fn(),
      getItemQuantity: jest.fn(),
    });

    const onPress = jest.fn();
    const { getByText } = render(<CartIcon onPress={onPress} />);

    expect(getByText("99+")).toBeTruthy();
  });

  it("should call onPress when cart icon is pressed", () => {
    mockUseCart.mockReturnValue({
      cart: { totalItems: 0, items: [], totalPrice: 0 },
      addToCart: jest.fn(),
      removeFromCart: jest.fn(),
      updateQuantity: jest.fn(),
      getItemQuantity: jest.fn(),
    });

    const onPress = jest.fn();
    const { getByTestId } = render(<CartIcon onPress={onPress} />);

    const pressable = getByTestId("cart-icon-button");
    fireEvent.press(pressable);

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("should render with correct styling", () => {
    mockUseCart.mockReturnValue({
      cart: { totalItems: 3, items: [], totalPrice: 45.99 },
      addToCart: jest.fn(),
      removeFromCart: jest.fn(),
      updateQuantity: jest.fn(),
      getItemQuantity: jest.fn(),
    });

    const onPress = jest.fn();
    const { getByText } = render(<CartIcon onPress={onPress} />);

    expect(getByText("3")).toBeTruthy();
  });
}); 