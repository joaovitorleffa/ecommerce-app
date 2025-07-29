import { productMock } from "@/mocks/product.mock";
import { fireEvent, render } from "@testing-library/react-native";
import { ProductCard } from "./product-card";

describe("ProductCard", () => {
  it("should call onPressProduct with the correct product when press product card", () => {
    const expectedProduct = productMock;
    const onPressProduct = jest.fn();

    const { getByTestId } = render(
      <ProductCard
        item={expectedProduct}
        onPressProduct={onPressProduct}
        onPressAddToCart={jest.fn()}
      />
    );

    fireEvent.press(getByTestId("product-card"));

    expect(onPressProduct).toHaveBeenCalledWith(expectedProduct);
  });

  it("should call onPressAddToCart with the correct product when press add to cart button", () => {
    const expectedProduct = productMock;
    const onPressAddToCart = jest.fn();

    const { getByTestId } = render(
      <ProductCard
        item={expectedProduct}
        onPressProduct={jest.fn()}
        onPressAddToCart={onPressAddToCart}
      />
    );

    fireEvent.press(getByTestId("add-to-cart-button"));

    expect(onPressAddToCart).toHaveBeenCalledWith(expectedProduct);
  });
});
