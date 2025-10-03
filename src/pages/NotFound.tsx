import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <div className="w-full max-w-md rounded-3xl border border-border/40 bg-card/40 p-10 text-center backdrop-blur-2xl shadow-glow">
        <h1 className="mb-4 text-5xl font-bold text-primary">404</h1>
        <p className="mb-6 text-lg text-muted-foreground">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <Link to="/">
          <Button variant="secondary" className="shadow-glow">
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
