import { useProducts } from "@/features/home/api/get-products";
import { Product } from "@/features/home/types/product";
import { productMock } from "@/mocks/product.mock";
import { useNavigation } from "@react-navigation/native";
import { fireEvent, render } from "@testing-library/react-native";
import { ProductList } from "./product-list";

// Mock the dependencies
jest.mock("@react-navigation/native");
jest.mock("@/features/home/api/get-products");

const mockUseNavigation = useNavigation as jest.MockedFunction<
  typeof useNavigation
>;
const mockUseProducts = useProducts as jest.MockedFunction<typeof useProducts>;

describe("ProductList", () => {
  const mockNavigation = {
    navigate: jest.fn(),
  };

  const mockProducts = [
    productMock,
    {
      ...productMock,
      id: 2,
      name: "Product 2",
      price: 200,
    },
    {
      ...productMock,
      id: 3,
      name: "Product 3",
      price: 300,
    },
  ];

  const mockOnAddToCart = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseNavigation.mockReturnValue(mockNavigation as any);
  });

  describe("Loading State", () => {
    it("should render spinner when loading", () => {
      mockUseProducts.mockReturnValueOnce({
        data: [] as Product[],
        isLoading: true,
        isError: false,
      });

      const { queryByTestId } = render(
        <ProductList onAddToCart={mockOnAddToCart} />
      );

      expect(queryByTestId("spinner")).toBeTruthy();
    });
  });

  describe("Error State", () => {
    it("should render MainError when there is an error", () => {
      mockUseProducts.mockReturnValueOnce({
        data: [] as Product[],
        isLoading: false,
        isError: true,
      });

      const { queryByTestId } = render(
        <ProductList onAddToCart={mockOnAddToCart} />
      );

      expect(queryByTestId("main-error")).toBeTruthy();
    });
  });

  describe("Success State", () => {
    beforeEach(() => {
      mockUseProducts.mockReturnValue({
        data: mockProducts,
        isLoading: false,
        isError: false,
      });
    });

    it("should render list with products when data is available", () => {
      const { getAllByTestId } = render(
        <ProductList onAddToCart={mockOnAddToCart} />
      );

      expect(getAllByTestId("product-card")).toHaveLength(mockProducts.length);
    });

    it("should render correct number of product cards", () => {
      const { getAllByTestId } = render(
        <ProductList onAddToCart={mockOnAddToCart} />
      );

      const productCards = getAllByTestId("product-card");
      expect(productCards).toHaveLength(3);
    });

    it("should display product names in cards", () => {
      const { getByText } = render(
        <ProductList onAddToCart={mockOnAddToCart} />
      );

      expect(getByText("Product 1")).toBeTruthy();
      expect(getByText("Product 2")).toBeTruthy();
      expect(getByText("Product 3")).toBeTruthy();
    });
  });

  describe("User Interactions", () => {
    beforeEach(() => {
      mockUseProducts.mockReturnValue({
        data: mockProducts,
        isLoading: false,
        isError: false,
      });
    });

    it("should navigate to product details when product card is pressed", () => {
      const { getAllByTestId } = render(
        <ProductList onAddToCart={mockOnAddToCart} />
      );

      const productCards = getAllByTestId("product-card");
      fireEvent.press(productCards[0]);

      expect(mockNavigation.navigate).toHaveBeenCalledWith("ProductDetails", {
        productId: mockProducts[0].id,
      });
    });

    it("should call onAddToCart when add to cart is pressed", () => {
      const { getAllByTestId } = render(
        <ProductList onAddToCart={mockOnAddToCart} />
      );

      const addToCartButtons = getAllByTestId("add-to-cart-button");
      fireEvent.press(addToCartButtons[0]);

      expect(mockOnAddToCart).toHaveBeenCalledWith(mockProducts[0]);
    });

    it("should navigate to correct product details for different products", () => {
      const { getAllByTestId } = render(
        <ProductList onAddToCart={mockOnAddToCart} />
      );

      const productCards = getAllByTestId("product-card");

      fireEvent.press(productCards[1]);
      expect(mockNavigation.navigate).toHaveBeenCalledWith("ProductDetails", {
        productId: mockProducts[1].id,
      });

      fireEvent.press(productCards[2]);
      expect(mockNavigation.navigate).toHaveBeenCalledWith("ProductDetails", {
        productId: mockProducts[2].id,
      });
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty products array", () => {
      mockUseProducts.mockReturnValue({
        data: [],
        isLoading: false,
        isError: false,
      });

      const { queryByTestId } = render(
        <ProductList onAddToCart={mockOnAddToCart} />
      );

      expect(queryByTestId("product-card")).toBeNull();
    });
  });
});
