import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Clock, ShieldCheck, Timer } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Subscribe = () => {
  const { monthlyPriceKes } = useAuth();
  const formattedPrice = `KES ${monthlyPriceKes}/month`;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto flex max-w-5xl flex-col gap-10">
          <Card className="border border-border/40 bg-card/50 backdrop-blur-2xl shadow-glow animate-fade-in">
            <CardHeader className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                <Sparkles className="h-3.5 w-3.5" /> Unlimited learning
              </div>
              <CardTitle className="text-4xl font-bold">Mike Learning Centre Premium</CardTitle>
              <CardDescription className="text-base md:text-lg">
                Start with a complimentary 30-day trial. After that, continue learning without limits for just <span className="font-semibold text-primary">{formattedPrice}</span>. We&apos;re bringing secure M-Pesa payments soon—lock in early access and stay notified when checkout opens.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.35em] text-muted-foreground">Free tier</p>
                <div className="rounded-2xl border border-border/30 bg-background/60 p-6">
                  <h3 className="text-2xl font-semibold">Free forever</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Perfect for getting started.</p>
                  <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                    <li>✅ 30-day unlimited trial for every new learner</li>
                    <li>✅ Access to 3 full-length courses</li>
                    <li>✅ Dynamic exercise centre previews</li>
                    <li>✅ Progress tracked locally</li>
                  </ul>
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.35em] text-primary">Coming soon</p>
                <div className="rounded-2xl border border-primary/40 bg-primary/10 p-6 shadow-glow">
                  <h3 className="text-2xl font-semibold text-primary">Premium • {formattedPrice}</h3>
                  <p className="mt-2 text-sm text-primary/90">Unlock unlimited access, exclusive exercises, and badge-worthy challenges.</p>
                  <ul className="mt-4 space-y-2 text-sm text-primary/80">
                    <li>✨ Unlimited courses & lessons</li>
                    <li>✨ Advanced exercise centre briefs</li>
                    <li>✨ Priority roadmap voting & support</li>
                  </ul>
                  <Button variant="secondary" className="mt-6 w-full shadow-glow" disabled>
                    M-Pesa payments launching soon
                  </Button>
                  <p className="mt-3 text-xs text-primary/70">
                    We&apos;re partnering with M-Pesa to enable secure STK push payments. Until then, enjoy the free tier—your progress is saved.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border border-border/40 bg-card/40 backdrop-blur-xl">
              <CardHeader className="space-y-3">
                <Badge variant="outline" className="border-primary/40 text-primary">
                  <Timer className="mr-1 h-3.5 w-3.5" /> 30-day trial included
                </Badge>
                <CardTitle>No hidden fees</CardTitle>
                <CardDescription>
                  Enjoy full access for 30 days at no cost, then one flat monthly rate once you subscribe.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border border-border/40 bg-card/40 backdrop-blur-xl">
              <CardHeader className="space-y-3">
                <Badge variant="outline" className="border-primary/40 text-primary">
                  <Clock className="mr-1 h-3.5 w-3.5" /> Always on
                </Badge>
                <CardTitle>Progress carries forward</CardTitle>
                <CardDescription>
                  Everything you learn on the free tier transfers instantly when you subscribe.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border border-border/40 bg-card/40 backdrop-blur-xl">
              <CardHeader className="space-y-3">
                <Badge variant="outline" className="border-primary/40 text-primary">
                  <ShieldCheck className="mr-1 h-3.5 w-3.5" /> Secure by design
                </Badge>
                <CardTitle>M-Pesa integration</CardTitle>
                <CardDescription>
                  Pay with the mobile wallet you already trust. Full compliance and clarity.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Subscribe;
