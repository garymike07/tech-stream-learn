import { useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";
import ThemeToggle from "@/components/ThemeToggle";
import LocaleToggle from "@/components/LocaleToggle";
import { useTranslation } from "@/context/LocaleContext";

const Header = () => {
  const { user, logout, subscriptionStatus, trialDaysRemaining } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const statusText = useMemo(() => {
    switch (subscriptionStatus) {
      case "premium":
        return t("header.status.premium");
      case "trial":
        if (typeof trialDaysRemaining === "number") {
          if (trialDaysRemaining > 0) {
            return t("header.status.trialDays", { args: [trialDaysRemaining] });
          }
          return t("header.status.trialEndsToday");
        }
        return t("header.status.trial");
      case "trial_expired":
        return t("header.status.trialEnded");
      default:
        return t("header.status.free");
    }
  }, [subscriptionStatus, trialDaysRemaining, t]);

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Signed out",
        description: "Come back soon to continue learning.",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Sign out failed",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const navItems = useMemo(
    () => [
      { label: t("nav.home"), to: "/" },
      { label: t("nav.categories"), to: "/categories" },
      { label: t("nav.paths"), to: "/paths" },
      { label: t("nav.insights"), to: "/insights" },
      { label: t("nav.exercises"), to: "/exercises" },
      { label: t("nav.pricing"), to: "/subscribe" },
    ],
    [t],
  );

  const isActivePath = (to: string) => {
    if (to === "/") return location.pathname === "/";
    return location.pathname.startsWith(to);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-2xl">
      <div className="relative border-b border-border/50 bg-card/40">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
        <div className="container mx-auto flex items-center justify-between gap-6 px-4 py-4">
          <Link to="/" className="group flex items-center gap-3">
            <div className="relative h-12 w-12 overflow-hidden rounded-2xl border border-border/40 bg-card/60 shadow-glow">
              <img
                src="/mike-logo.jpg"
                alt="Mike Learning Centre"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div>
              <span className="text-lg font-semibold uppercase tracking-[0.28em] text-primary/75">Mike Learning Centre</span>
              <p className="text-xs text-muted-foreground">Future-ready technology learning</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-2 rounded-full border border-border/40 bg-card/50 px-2 py-1 backdrop-blur-xl md:flex">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  isActivePath(item.to)
                    ? "bg-primary/15 text-primary"
                    : "text-foreground/70 hover:text-primary"
                }`}
              >
                {item.label}
                {isActivePath(item.to) ? (
                  <span className="absolute inset-x-4 bottom-1 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
                ) : null}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <LocaleToggle />
            <ThemeToggle />
            {user ? (
              <div className="flex items-center gap-3">
                <div className="hidden text-right text-sm font-medium text-foreground/65 sm:flex sm:flex-col">
                  <span className="text-xs uppercase tracking-[0.3em] text-primary/80">{statusText}</span>
                  <span>{user.fullName}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                  className="border border-border/50 bg-card/50 text-muted-foreground hover:text-primary"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" className="text-foreground/70 hover:text-primary">
                    {t("nav.signIn")}
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="shadow-glow">{t("nav.join")}</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
