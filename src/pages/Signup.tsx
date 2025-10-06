import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { SignUp } from "@clerk/clerk-react";

import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";

const Signup = () => {
  const { monthlyPriceKes } = useAuth();
  const location = useLocation();
  const formattedPrice = monthlyPriceKes.toLocaleString("en-KE");

  const returnTo = useMemo(() => {
    const state = location.state as { intended?: string } | null;
    return state?.intended ?? "/";
  }, [location.state]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto flex items-center justify-center px-4 py-16">
        <Card className="w-full max-w-lg border-border/60 bg-card/60 backdrop-blur-2xl shadow-glow animate-fade-in">
          <CardHeader className="space-y-3 text-center">
            <CardTitle className="text-3xl font-bold text-primary">Create your account</CardTitle>
            <CardDescription className="text-muted-foreground">
              Unlock personalized learning paths, progress tracking, and an automatic 30-day unlimited trial.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <SignUp
              routing="path"
              path="/signup"
              signInUrl="/login"
              afterSignUpUrl={returnTo}
              appearance={{
                elements: {
                  card: "bg-transparent shadow-none",
                  formButtonPrimary: "bg-primary hover:bg-primary/90",
                  footer: "hidden",
                },
              }}
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-3 text-sm text-muted-foreground">
            <div className="w-full text-center">
              Already have an account? <Link to="/login" className="text-primary hover:underline">Sign in</Link>.
            </div>
            <div className="w-full text-center text-xs">
              After your 30-day trial, continue learning for KES {formattedPrice}/month.
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
};

export default Signup;
