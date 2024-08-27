import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
//product provider
import ProductProvider from "./components/pages/user/contexts/ProductContext";
//sidebar provider
import SidebarProvider from "./components/pages/user/contexts/SidebarContext";

import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { store } from "./store/store";
import { Provider } from "react-redux";
import CartProvider from "./components/pages/user/contexts/CartContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <SidebarProvider>
      <CartProvider>
        <ProductProvider>
          <React.StrictMode>

            <App />

          </React.StrictMode>
        </ProductProvider>
      </CartProvider>
    </SidebarProvider>
  </Provider>
);
reportWebVitals();
