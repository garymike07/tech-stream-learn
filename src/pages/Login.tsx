import { useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

const Login = () => {
  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const redirectTarget = useMemo(() => {
    const state = location.state as { from?: string; intended?: string } | null;
    return state?.intended ?? state?.from ?? "/";
  }, [location.state]);

  const handleSubmit = form.handleSubmit(async (values) => {
    try {
      await login(values);
      toast({
        title: "Welcome back",
        description: "You are now signed in.",
      });
      navigate(redirectTarget, { replace: true });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to sign in. Please check your credentials and try again.";
      toast({
        title: "Sign in failed",
        description: message,
        variant: "destructive",
      });
      form.setError("root", { message });
    }
  });

  const rootError = form.formState.errors.root?.message;

  const isSubmitting = form.formState.isSubmitting;

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
            <Form {...form}>
              <form onSubmit={handleSubmit} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="you@example.com" autoComplete="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" autoComplete="current-password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {rootError ? <p className="text-sm text-destructive">{rootError}</p> : null}
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Signing in..." : "Sign in"}
                </Button>
              </form>
            </Form>
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
