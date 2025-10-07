import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, LogOut, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import ThemeToggle from "@/components/ThemeToggle";
import LocaleToggle from "@/components/LocaleToggle";
import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "@/context/LocaleContext";
import { toast } from "@/hooks/use-toast";
import { categories } from "@/data/courses";

const Header = () => {
  const { user, logout, subscriptionStatus, trialDaysRemaining } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);

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

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

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
      { type: "link" as const, label: t("nav.home"), to: "/" },
      { type: "categories" as const, label: t("nav.categories") },
      { type: "link" as const, label: t("nav.paths"), to: "/paths" },
      { type: "link" as const, label: t("nav.immersive"), to: "/immersive-studio" },
      { type: "link" as const, label: t("nav.insights"), to: "/insights" },
      { type: "link" as const, label: t("nav.exercises"), to: "/exercises" },
      { type: "link" as const, label: t("nav.pricing"), to: "/subscribe" },
    ],
    [t],
  );

  const isActivePath = (to: string) => {
    if (to === "/") return location.pathname === "/";
    return location.pathname.startsWith(to);
  };

  const featuredCategories = useMemo(
    () =>
      categories
        .slice(0, 6)
        .map((category) => ({
          id: category.id,
          name: category.name,
          description: category.description,
          icon: category.icon,
          count: category.courseCount,
        })),
    [],
  );

  const tierChip = useMemo(() => {
    if (!user) return null;
    if (subscriptionStatus === "premium") return "Pro member";
    if (subscriptionStatus === "trial") {
      if (typeof trialDaysRemaining === "number" && trialDaysRemaining > 0) {
        return `Trial • ${trialDaysRemaining}d left`;
      }
      return "Trial access";
    }
    if (subscriptionStatus === "trial_expired") return "Trial ended";
    return "Free explorer";
  }, [subscriptionStatus, trialDaysRemaining, user]);

  return (
    <header className="sticky top-0 z-50">
      <div
        className={`relative transition-all duration-500 ${
          scrolled ? "border-b border-border/35 bg-background/80 backdrop-blur-2xl" : "border-b border-transparent bg-transparent"
        }`}
      >
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

          <nav className="hidden items-center gap-1 rounded-full border border-border/35 bg-card/40 px-1.5 py-1 backdrop-blur-xl md:flex">
            {navItems.map((item) => {
              if (item.type === "link") {
                return (
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
                );
              }

              return (
                <Popover key="categories">
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      className="group relative flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-foreground/70 transition-all hover:text-primary data-[state=open]:text-primary"
                    >
                      {item.label}
                      <ChevronDown className="h-3.5 w-3.5 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                      <span className="absolute inset-x-4 bottom-1 h-px bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/40" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[520px] border-border/40 bg-card/90 backdrop-blur-2xl">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.35em] text-primary/80">Signature tracks</p>
                        <h3 className="mt-1 text-lg font-semibold text-foreground">Explore curated category blueprints</h3>
                      </div>
                      <Sparkles className="h-4 w-4 text-primary" />
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {featuredCategories.map((category) => (
                        <Link
                          key={category.id}
                          to={`/category/${category.id}`}
                          className="group rounded-xl border border-border/30 bg-card/50 p-3 transition-all hover:border-primary/40 hover:bg-primary/10"
                        >
                          <div className="text-3xl">{category.icon}</div>
                          <h4 className="mt-2 text-base font-semibold group-hover:text-primary">{category.name}</h4>
                          <p className="text-xs text-muted-foreground">{category.description}</p>
                          <span className="mt-3 inline-flex items-center text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">
                            {category.count} courses
                          </span>
                        </Link>
                      ))}
                    </div>
                    <div className="lux-divider my-4" />
                    <Link
                      to="/categories"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                    >
                      {t("landing.categories.viewAll")}
                      <ChevronDown className="h-3 w-3 rotate-180" />
                    </Link>
                  </PopoverContent>
                </Popover>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <LocaleToggle />
            <ThemeToggle />
            {tierChip ? <span className="hidden text-xs uppercase tracking-[0.35em] text-primary/75 lg:inline-flex">{tierChip}</span> : null}
            {user ? (
              <div className="flex items-center gap-3">
                <div className="hidden text-right text-sm font-medium text-foreground/70 sm:flex sm:flex-col">
                  <span className="lux-chip">{statusText}</span>
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
