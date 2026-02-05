import React from "react";
import ProductCard from "./ProductCard";
import { renderWithProviders } from "../test-utils";

describe("ProductCard (unit)", () => {
  test("renders product title and price", () => {
    const product = {
      id: 1,
      title: "Test Product",
      price: 12.5,
      description: "desc",
      category: "cat",
      image: "img",
      rating: { rate: 4.5, count: 10 }
    };

    const { getByText } = renderWithProviders(
      <ProductCard product={product as any} />
    );

    expect(getByText("Test Product")).toBeInTheDocument();
    expect(getByText("$12.50")).toBeInTheDocument();
  });
});
