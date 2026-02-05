import React from "react";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./redux/cartSlice";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { render } from "@testing-library/react"; 

const rootReducer = combineReducers({
  cart: cartReducer
});

export type RootStateForTests = ReturnType<typeof rootReducer>;

export function makeStore(preloadedState?: Partial<RootStateForTests>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState: preloadedState as RootStateForTests
  });
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    store = makeStore(),
    user = null
  }: { store?: ReturnType<typeof makeStore>; user?: any } = {}
) {
  return {
    store,
    ...render(
      <Provider store={store}>
        <AuthContext.Provider value={{ user, loading: false }}>
          <MemoryRouter>{ui}</MemoryRouter>
        </AuthContext.Provider>
      </Provider>
    )
  };
}
