import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { AuthProvider } from "@/context/AuthContext";
import { ClerkProvider } from "@clerk/clerk-react";
import "./index.css";

if (!document.documentElement.classList.contains("dark")) {
  document.documentElement.classList.add("dark");
}

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPublishableKey) {
  throw new Error("Missing VITE_CLERK_PUBLISHABLE_KEY environment variable");
}

createRoot(document.getElementById("root")!).render(
  <ClerkProvider publishableKey={clerkPublishableKey} afterSignOutUrl="/">
    <AuthProvider>
      <App />
    </AuthProvider>
  </ClerkProvider>,
);
