import { useCallback } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, useNavigate } from "react-router-dom";
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

const AppProviders = () => {
  const navigate = useNavigate();

  const handlePush = useCallback((to: string) => navigate(to), [navigate]);
  const handleReplace = useCallback((to: string) => navigate(to, { replace: true }), [navigate]);

  return (
    <ClerkProvider
      publishableKey={clerkPublishableKey}
      routerPush={handlePush}
      routerReplace={handleReplace}
      navigate={handlePush}
    >
      <ClerkLoading>
        <RouteLoading />
      </ClerkLoading>
      <ClerkLoaded>
        <ThemeProvider>
          <LocaleProvider>
            <AuthProvider>
              <ProgressProvider>
                <App />
              </ProgressProvider>
            </AuthProvider>
          </LocaleProvider>
        </ThemeProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
};

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AppProviders />
  </BrowserRouter>,
);
