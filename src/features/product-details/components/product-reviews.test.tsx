import { Product } from "@/home/types/product";
import { render } from "@testing-library/react-native";
import React from "react";
import { ProductReviews } from "./product-reviews";

// Mock the Product type for testing
const mockReviews: Product["reviews"] = [
  {
    user: "John Doe",
    rating: 5,
    comment: "Excellent product! Highly recommended.",
  },
  {
    user: "Jane Smith",
    rating: 4,
    comment: "Great quality, fast delivery.",
  },
  {
    user: "Mike Johnson",
    rating: 3,
    comment: "Good product but could be better.",
  },
];

describe("ProductReviews", () => {
  it("should render correctly with no reviews", () => {
    const { queryByText } = render(<ProductReviews reviews={[]} />);

    expect(queryByText("Reviews")).toBeTruthy();
    expect(queryByText("No reviews yet")).toBeTruthy();
  });

  it("should render correctly with reviews", () => {
    const { queryByText } = render(<ProductReviews reviews={mockReviews} />);

    expect(queryByText("Customer Reviews (3)")).toBeTruthy();
  });

  it("should display all review information correctly", () => {
    const { queryByText } = render(<ProductReviews reviews={mockReviews} />);

    // Check if all user names are displayed
    expect(queryByText("John Doe")).toBeTruthy();
    expect(queryByText("Jane Smith")).toBeTruthy();
    expect(queryByText("Mike Johnson")).toBeTruthy();

    // Check if all comments are displayed
    expect(queryByText("Excellent product! Highly recommended.")).toBeTruthy();
    expect(queryByText("Great quality, fast delivery.")).toBeTruthy();
    expect(queryByText("Good product but could be better.")).toBeTruthy();
  });

  it("should display correct number of stars for each rating", () => {
    const { queryByText } = render(<ProductReviews reviews={mockReviews} />);

    // Check 5-star rating
    expect(queryByText("⭐⭐⭐⭐⭐")).toBeTruthy();

    // Check 4-star rating
    expect(queryByText("⭐⭐⭐⭐")).toBeTruthy();

    // Check 3-star rating
    expect(queryByText("⭐⭐⭐")).toBeTruthy();
  });

  it("should render with single review", () => {
    const singleReview = [mockReviews[0]];
    const { queryByText } = render(<ProductReviews reviews={singleReview} />);

    expect(queryByText("Customer Reviews (1)")).toBeTruthy();
    expect(queryByText("John Doe")).toBeTruthy();
    expect(queryByText("Excellent product! Highly recommended.")).toBeTruthy();
    expect(queryByText("⭐⭐⭐⭐⭐")).toBeTruthy();
  });
});
