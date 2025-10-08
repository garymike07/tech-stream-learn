import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { AuthProvider } from "@/context/AuthContext";
import { ProgressProvider } from "@/context/ProgressContext";
import { LocaleProvider } from "@/context/LocaleContext";
import ThemeProvider from "@/components/providers/ThemeProvider";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <LocaleProvider>
      <AuthProvider>
        <ProgressProvider>
          <App />
        </ProgressProvider>
      </AuthProvider>
    </LocaleProvider>
  </ThemeProvider>,
);
