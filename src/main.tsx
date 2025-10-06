import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { AuthProvider } from "@/context/AuthContext";
import { ProgressProvider } from "@/context/ProgressContext";
import { LocaleProvider } from "@/context/LocaleContext";
import { ClerkProvider } from "@clerk/clerk-react";
import ThemeProvider from "@/components/providers/ThemeProvider";
import "./index.css";

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPublishableKey) {
  throw new Error("Missing VITE_CLERK_PUBLISHABLE_KEY environment variable");
}

createRoot(document.getElementById("root")!).render(
  <ClerkProvider publishableKey={clerkPublishableKey} afterSignOutUrl="/">
    <ThemeProvider>
      <LocaleProvider>
        <AuthProvider>
          <ProgressProvider>
            <App />
          </ProgressProvider>
        </AuthProvider>
      </LocaleProvider>
    </ThemeProvider>
  </ClerkProvider>,
);
