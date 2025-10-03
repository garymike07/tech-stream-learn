import { Link, useNavigate } from "react-router-dom";
import { BookOpen, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast({
      title: "Signed out",
      description: "Come back soon to continue learning.",
    });
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-card/40 backdrop-blur-2xl shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-gradient-hero rounded-lg group-hover:shadow-glow transition-all duration-300">
              <BookOpen className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              TechLearn
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
          </nav>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <div className="hidden text-sm font-medium text-foreground/60 sm:flex sm:flex-col sm:items-end">
                  <span className="text-xs uppercase tracking-wide text-primary/80">Learner</span>
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
