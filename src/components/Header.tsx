import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";

const Header = () => {
  const { user, logout, subscriptionStatus, trialDaysRemaining } = useAuth();
  const navigate = useNavigate();

  const statusText = useMemo(() => {
    switch (subscriptionStatus) {
      case "premium":
        return "Premium member";
      case "trial":
        if (typeof trialDaysRemaining === "number") {
          if (trialDaysRemaining > 0) {
            return `Trial • ${trialDaysRemaining} day${trialDaysRemaining === 1 ? "" : "s"} left`;
          }
          return "Trial ends today";
        }
        return "Trial access";
      case "trial_expired":
        return "Trial ended";
      default:
        return "Free tier";
    }
  }, [subscriptionStatus, trialDaysRemaining]);

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

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-card/40 backdrop-blur-2xl shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-border/40 bg-card/60 shadow-glow">
              <img src="/mike-logo.jpg" alt="Mike Learning Centre" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Mike Learning Centre
            </span>
          </Link>
          
          <nav className="flex items-center gap-6">
            <Link
              to="/"
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              Home
            </Link>
            <Link
              to="/categories"
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              Categories
            </Link>
            <Link
              to="/exercises"
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              Exercises
            </Link>
            <Link
              to="/subscribe"
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              Pricing
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <div className="hidden text-sm font-medium text-foreground/60 sm:flex sm:flex-col sm:items-end">
                  <span className="text-xs uppercase tracking-wide text-primary/80">{statusText}</span>
                  <span>{user.fullName}</span>
                </div>
                <Button variant="ghost" size="icon" onClick={handleLogout} className="text-muted-foreground">
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="text-foreground/70 hover:text-primary">
                    Sign in
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="shadow-glow">Join free</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
