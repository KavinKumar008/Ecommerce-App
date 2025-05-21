import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CartProvider } from "./CartProvider.jsx";
import { ProductProvider } from "./ProductProvider.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserProfileProvider } from "./UserProfileProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="306712989449-rihapa27hp7rq7ubhitmq8t0mhc2en30.apps.googleusercontent.com">
      <UserProfileProvider>
        <ProductProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </ProductProvider>
      </UserProfileProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
