import { Globe } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocale, useTranslation } from "@/context/LocaleContext";

const LocaleToggle = () => {
  const { locale, setLocale, availableLocales } = useLocale();
  const { t } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="border border-border/50 bg-card/50 text-muted-foreground hover:text-primary"
          aria-label={t("header.localeLabel")}
        >
          <Globe className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuLabel>{t("header.localeLabel")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {availableLocales.map((option) => (
          <DropdownMenuItem
            key={option.code}
            onSelect={() => setLocale(option.code)}
            className={option.code === locale ? "text-primary" : undefined}
          >
            {t(option.labelKey)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LocaleToggle;
