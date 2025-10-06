import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MoonStar, SunMedium } from "lucide-react";

import { Button } from "@/components/ui/button";

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = (resolvedTheme ?? "dark") === "dark";

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      className="relative overflow-hidden border border-border/50 bg-card/50 text-muted-foreground transition-colors hover:text-primary"
      aria-label="Toggle theme"
    >
      {mounted ? (
        isDark ? <MoonStar className="h-4 w-4" /> : <SunMedium className="h-4 w-4" />
      ) : (
        <MoonStar className="h-4 w-4" />
      )}
    </Button>
  );
};

export default ThemeToggle;
