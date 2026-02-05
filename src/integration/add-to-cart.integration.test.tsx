import React from "react";
import NavBar from "../components/NavBar";
import ProductCard from "../components/ProductCard";
import { renderWithProviders } from "../test-utils";
import userEvent from "@testing-library/user-event";

jest.mock("firebase/auth", () => ({
  signOut: jest.fn()
}));
jest.mock("../firebase/firebaseConfig", () => ({
  auth: {}
}));

describe("Add to Cart (integration)", () => {
  test("clicking Add to Cart updates cart count in NavBar", async () => {
    const user = userEvent.setup();

    const product = {
      id: 99,
      title: "Integration Product",
      price: 20,
      description: "desc",
      category: "cat",
      image: "img",
      rating: { rate: 5, count: 1 }
    };

    const { queryByText, getByRole, getByText } = renderWithProviders(
      <>
        <NavBar />
        <ProductCard product={product as any} />
      </>
    );

    // before
    expect(queryByText("1")).not.toBeInTheDocument();

    // action
    await user.click(getByRole("button", { name: /add to cart/i }));

    // after
    expect(getByText("1")).toBeInTheDocument();
  });
});
