import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";

const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => (
  <NextThemesProvider
    attribute="class"
    defaultTheme="dark"
    enableSystem
    disableTransitionOnChange
    {...props}
  >
    {children}
  </NextThemesProvider>
);

export default ThemeProvider;
