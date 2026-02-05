import React from "react";
import NavBar from "./NavBar";
import { renderWithProviders, makeStore } from "../test-utils";

jest.mock("firebase/auth", () => ({
    signOut: jest.fn()
}));

jest.mock("../firebase/firebaseConfig", () => ({
    auth: {}
}));

describe("NavBar (unit)", () => {
    test("shows Login and Register when no user is logged in", () => {
        const { getByText } = renderWithProviders(<NavBar />, { user: null });

        expect(getByText(/login/i)).toBeInTheDocument();
        expect(getByText(/register/i)).toBeInTheDocument();
    });
});
