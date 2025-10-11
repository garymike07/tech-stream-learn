import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ClerkLoaded, ClerkLoading, ClerkProvider } from "@clerk/clerk-react";

import App from "./App.tsx";
import { AuthProvider } from "@/context/AuthContext";
import { ProgressProvider } from "@/context/ProgressContext";
import { LocaleProvider } from "@/context/LocaleContext";
import ThemeProvider from "@/components/providers/ThemeProvider";
import RouteLoading from "@/components/RouteLoading";
import "./index.css";

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPublishableKey) {
  throw new Error("Missing VITE_CLERK_PUBLISHABLE_KEY environment variable.");
}

createRoot(document.getElementById("root")!).render(
  <ClerkProvider publishableKey={clerkPublishableKey}>
    <ClerkLoading>
      <RouteLoading />
    </ClerkLoading>
    <ClerkLoaded>
      <BrowserRouter>
        <ThemeProvider>
          <LocaleProvider>
            <AuthProvider>
              <ProgressProvider>
                <App />
              </ProgressProvider>
            </AuthProvider>
          </LocaleProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ClerkLoaded>
  </ClerkProvider>,
);
