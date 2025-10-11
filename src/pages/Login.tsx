import { useEffect, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SignIn } from "@clerk/clerk-react";

import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { DEFAULT_AUTH_REDIRECT, resolveRedirectTarget } from "@/lib/auth";

const Login = () => {
  const { user, isLoaded } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const redirectTarget = useMemo(
    () => resolveRedirectTarget(location.state, DEFAULT_AUTH_REDIRECT),
    [location.state],
  );

  useEffect(() => {
    if (isLoaded && user) {
      navigate(redirectTarget, { replace: true });
    }
  }, [isLoaded, user, navigate, redirectTarget]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto flex items-center justify-center px-4 py-16">
        <Card className="w-full max-w-md border-border/60 bg-card/60 backdrop-blur-2xl shadow-glow animate-fade-in">
          <CardHeader className="space-y-3 text-center">
            <CardTitle className="text-3xl font-bold text-primary">Sign in</CardTitle>
            <CardDescription className="text-muted-foreground">
              Access your personalized learning dashboard and resume courses.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <SignIn
              routing="path"
              path="/login"
              signUpUrl="/signup"
              redirectUrl={redirectTarget}
              afterSignInUrl={redirectTarget}
              appearance={{ elements: { formButtonPrimary: "bg-primary hover:bg-primary/90" } }}
            />
            <p className="text-center text-xs text-muted-foreground">
              Trouble signing in? If this email isn&apos;t registered yet, create an account first or try the provider you originally used.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col gap-3 text-sm text-muted-foreground">
            <div className="w-full text-center">
              Don&apos;t have an account? <Link to="/signup" className="text-primary hover:underline">Create one</Link>.
            </div>
            <div className="w-full text-center text-xs">
              Trouble signing in? Reach out to <a className="text-accent hover:underline" href="mailto:support@techlearn.app">support@techlearn.app</a>
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
};

export default Login;
