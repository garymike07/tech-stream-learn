import type { ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";

import App from "./App.tsx";
import { AuthProvider } from "@/context/AuthContext";
import { ProgressProvider } from "@/context/ProgressContext";
import { LocaleProvider } from "@/context/LocaleContext";
import ThemeProvider from "@/components/providers/ThemeProvider";
import "./index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element #root not found in DOM");
}

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const renderApp = (node: ReactNode) => {
  createRoot(rootElement).render(node);
};

if (!clerkPublishableKey) {
  renderApp(
    <div className="flex min-h-screen items-center justify-center bg-background p-6 text-center text-foreground">
      <div className="max-w-md space-y-4">
        <h1 className="text-2xl font-semibold">Configuration required</h1>
        <p className="text-sm text-muted-foreground">
          Missing <code className="rounded bg-muted px-1">VITE_CLERK_PUBLISHABLE_KEY</code>. Update your deployment environment
          variables in Vercel and redeploy to enable authentication.
        </p>
      </div>
    </div>,
  );
} else {
  renderApp(
    <ClerkProvider publishableKey={clerkPublishableKey}>
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
    </ClerkProvider>,
  );
}
