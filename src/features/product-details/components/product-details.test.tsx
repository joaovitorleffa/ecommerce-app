import { useCart } from "@/features/cart/context/cart-context";
import { CartState } from "@/features/cart/types/cart";
import { useProduct } from "@/features/product-details/api/get-product";
import { productMock } from "@/mocks/product.mock";
import { RootStackParamList } from "@/types/navigation";
import { RouteProp, useRoute } from "@react-navigation/native";
import { fireEvent, render } from "@testing-library/react-native";
import { ProductDetails } from "./product-details";

jest.mock("@react-navigation/native");
jest.mock("@/features/product-details/api/get-product");
jest.mock("@/features/cart/context/cart-context");

const mockAddToCart = jest.fn();

const mockRoute = useRoute as jest.MockedFunction<typeof useRoute>;
const mockUseProduct = useProduct as jest.MockedFunction<typeof useProduct>;
const mockUseCart = useCart as jest.MockedFunction<typeof useCart>;

describe("ProductDetails", () => {
  beforeEach(() => {
    mockRoute.mockReturnValue({
      params: { productId: 1 },
    } as RouteProp<RootStackParamList, "ProductDetails">);

    mockUseCart.mockReturnValue({
      addToCart: mockAddToCart,
      cart: {} as CartState,
      removeFromCart: jest.fn(),
      updateQuantity: jest.fn(),
      getItemQuantity: jest.fn(),
    });

    mockUseProduct.mockReturnValue({
      data: productMock,
      isLoading: false,
      isError: false,
    });
  });

  describe("Loading state", () => {
    it("should show spinner when loading product details", () => {
      mockUseProduct.mockReturnValue({
        data: null,
        isLoading: true,
        isError: false,
      });

      const { queryByTestId } = render(<ProductDetails />);

      expect(queryByTestId("spinner")).toBeTruthy();
    });
  });

  describe("User interactions", () => {
    it("should add to cart when press `add to cart` button", () => {
      const { getByText } = render(<ProductDetails />);

      fireEvent.press(getByText("Add to Cart"));

      expect(mockAddToCart).toHaveBeenCalledWith(productMock);
    });

    it("should add to cart when press `buy now` button", () => {
      const { getByText } = render(<ProductDetails />);

      fireEvent.press(getByText("Buy Now"));

      expect(mockAddToCart).toHaveBeenCalledWith(productMock);
    });
  });

  describe("Edge cases", () => {
    it("should show error message when product is not found", () => {
      mockUseProduct.mockReturnValue({
        data: null,
        isLoading: false,
        isError: true,
      });

      const { queryByTestId } = render(<ProductDetails />);

      expect(queryByTestId("main-error")).toBeTruthy();
    });

    it("should show error message when product is not found", () => {
      mockUseProduct.mockReturnValue({
        data: null,
        isLoading: false,
        isError: true,
      });

      const { queryByTestId } = render(<ProductDetails />);

      expect(queryByTestId("main-error")).toBeTruthy();
    });
  });
});
