import { Link, useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";

const schema = z
  .object({
    fullName: z.string().min(2, "Please enter your full name"),
    email: z.string().email("Enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm your password"),
  })
  .refine((values) => values.password === values.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type SignupFormValues = z.infer<typeof schema>;

const Signup = () => {
  const { signup, monthlyPriceKes } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const formattedPrice = monthlyPriceKes.toLocaleString("en-KE");

  const returnTo = (location.state as { intended?: string } | null)?.intended ?? "/";

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: SignupFormValues) => {
    try {
      await signup({
        fullName: values.fullName,
        email: values.email,
        password: values.password,
      });

      toast({
        title: "Account created",
        description: `Welcome to Mike Learning Centre! Enjoy 30 days of unlimited access—after that it's just KES ${formattedPrice}/month to keep going.`,
      });
      navigate(returnTo, { replace: true });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to create account right now.";
      toast({
        title: "Sign up failed",
        description: message,
        variant: "destructive",
      });
    }
  };

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
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full name</FormLabel>
                      <FormControl>
                        <Input placeholder="Ada Lovelace" className="bg-popover/70" {...field} />
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
                        <Input type="email" placeholder="you@example.com" className="bg-popover/70" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" className="bg-popover/70" {...field} />
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
                          <Input type="password" placeholder="••••••••" className="bg-popover/70" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full">
                  Create account & start trial
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col gap-3 text-sm text-muted-foreground">
            <div className="w-full text-center">
              Already have an account? <Link to="/login" className="text-primary hover:underline">Sign in</Link>.
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
};

export default Signup;
