import { Product } from "@/home/types/product";
import { render } from "@testing-library/react-native";
import React from "react";
import { ProductSpecifications } from "./product-specifications";

// Mock the Product type for testing
const mockSpecifications: Product["specifications"] = {
  weight: "150g",
  battery: "4000mAh",
  connectivity: "WiFi, Bluetooth 5.0",
};

const mockProductSpecificationsProps = {
  specifications: mockSpecifications,
};

describe("ProductSpecifications", () => {
  it("should render the component with title", () => {
    const { queryByText } = render(
      <ProductSpecifications {...mockProductSpecificationsProps} />
    );

    expect(queryByText("Specifications")).toBeTruthy();
  });

  it("should render all specification items", () => {
    const { queryByText } = render(
      <ProductSpecifications {...mockProductSpecificationsProps} />
    );

    // Check if all specification keys are rendered (capitalized)
    expect(queryByText("Weight")).toBeTruthy();
    expect(queryByText("Battery")).toBeTruthy();
    expect(queryByText("Connectivity")).toBeTruthy();

    // Check if all specification values are rendered
    expect(queryByText("150g")).toBeTruthy();
    expect(queryByText("4000mAh")).toBeTruthy();
    expect(queryByText("WiFi, Bluetooth 5.0")).toBeTruthy();
  });

  it("should capitalize the first letter of specification keys", () => {
    const specificationsWithLowercaseKeys: Product["specifications"] = {
      weight: "150g",
      battery: "4000mAh",
      connectivity: "WiFi, Bluetooth 5.0",
    };

    const { queryByText } = render(
      <ProductSpecifications specifications={specificationsWithLowercaseKeys} />
    );

    expect(queryByText("Weight")).toBeTruthy();
    expect(queryByText("Battery")).toBeTruthy();
    expect(queryByText("Connectivity")).toBeTruthy();
  });

  it("should handle empty specifications object", () => {
    const emptySpecifications = {} as Product["specifications"];

    const { queryByText } = render(
      <ProductSpecifications specifications={emptySpecifications} />
    );

    expect(queryByText("Specifications")).toBeTruthy();
    // Should not crash and should render the title even with empty specs
  });

  it("should handle specifications with special characters", () => {
    const specificationsWithSpecialChars: Product["specifications"] = {
      weight: "150g ±5g",
      battery: "24 hours",
      connectivity: "WiFi 6, 5G, Bluetooth 5.2",
    };

    const { queryByText } = render(
      <ProductSpecifications specifications={specificationsWithSpecialChars} />
    );

    expect(queryByText("Weight")).toBeTruthy();
    expect(queryByText("Battery")).toBeTruthy();
    expect(queryByText("Connectivity")).toBeTruthy();

    expect(queryByText("150g ±5g")).toBeTruthy();
    expect(queryByText("24 hours")).toBeTruthy();
    expect(queryByText("WiFi 6, 5G, Bluetooth 5.2")).toBeTruthy();
  });

  it("should handle specifications with numeric values as strings", () => {
    const specificationsWithNumericStrings: Product["specifications"] = {
      weight: "150",
      battery: "4000",
      connectivity: "5G",
    };

    const { queryByText } = render(
      <ProductSpecifications
        specifications={specificationsWithNumericStrings}
      />
    );

    expect(queryByText("Weight")).toBeTruthy();
    expect(queryByText("Battery")).toBeTruthy();
    expect(queryByText("Connectivity")).toBeTruthy();

    expect(queryByText("150")).toBeTruthy();
    expect(queryByText("4000")).toBeTruthy();
    expect(queryByText("5G")).toBeTruthy();
  });
});
