import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
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
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/categories" 
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Categories
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
