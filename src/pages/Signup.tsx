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

const signupSchema = z
  .object({
    fullName: z.string().min(2, "Enter your full name."),
    email: z.string().email("Enter a valid email address."),
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string().min(8, "Confirm your password."),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

const Signup = () => {
  const { monthlyPriceKes, signup } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const formattedPrice = monthlyPriceKes.toLocaleString("en-KE");
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const returnTo = useMemo(() => {
    const state = location.state as { intended?: string } | null;
    return state?.intended ?? "/";
  }, [location.state]);

  const handleSubmit = form.handleSubmit(async ({ email, fullName, password }) => {
    try {
      await signup({ email, fullName, password });
      toast({
        title: "Account created",
        description: "Welcome to Tech Stream Learn! Enjoy your 30-day trial.",
      });
      navigate(returnTo, { replace: true });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to create the account. Please try again.";
      toast({
        title: "Sign up failed",
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
        <Card className="w-full max-w-lg border-border/60 bg-card/60 backdrop-blur-2xl shadow-glow animate-fade-in">
          <CardHeader className="space-y-3 text-center">
            <CardTitle className="text-3xl font-bold text-primary">Create your account</CardTitle>
            <CardDescription className="text-muted-foreground">
              Unlock personalized learning paths, progress tracking, and an automatic 30-day unlimited trial.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Form {...form}>
              <form onSubmit={handleSubmit} className="space-y-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full name</FormLabel>
                      <FormControl>
                        <Input placeholder="Jane Doe" autoComplete="name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                        <Input type="password" placeholder="Create a password" autoComplete="new-password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Re-enter your password" autoComplete="new-password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {rootError ? <p className="text-sm text-destructive">{rootError}</p> : null}
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Creating account..." : "Create account"}
                </Button>
              </form>
            </Form>
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
