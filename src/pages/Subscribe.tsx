import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Clock, ShieldCheck, Timer, Star, Crown, Diamond } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Subscribe = () => {
  const { monthlyPriceKes, yearlyPriceKes } = useAuth();
  const formattedMonthly = `KES ${monthlyPriceKes.toLocaleString()}`;
  const formattedYearly = `KES ${yearlyPriceKes.toLocaleString()}`;

  const tiers = [
    {
      id: "free",
      icon: Star,
      badge: "Included",
      title: "Free • 0 KES",
      description: "Perfect for getting started with curated tracks and unlimited trial access for 30 days.",
      highlight: false,
      accent: "border-border/35",
      features: [
        "Access any 3 full-length courses",
        "Automated 30-day unlimited trial",
        "Exercise previews & lesson progress",
        "Learning streak analytics & achievements",
      ],
    },
    {
      id: "pro",
      icon: Crown,
      badge: "Most popular",
      title: `Pro • ${formattedMonthly}/month`,
      description: "Everything in Free plus unlimited courses, AI mentor access, and roadmap influence.",
      highlight: true,
      accent: "border-primary/45",
      features: [
        "Unlimited courses, paths, and practice labs",
        "Full AI mentor prompts & progress coaching",
        "Priority roadmap voting & same-day support",
        "Downloadable briefs, templates, and reports",
      ],
    },
    {
      id: "elite",
      icon: Diamond,
      badge: "New",
      title: `Elite • ${formattedYearly}/year`,
      description: "Concierge onboarding, private cohorts, and quarterly strategy sessions for leaders.",
      highlight: false,
      accent: "border-secondary/45",
      features: [
        "Dedicated success concierge & goal design",
        "Private cohorts with live delivery sprints",
        "Quarterly executive skill-gap reviews",
        "Partner-led masterclasses & priority pilots",
      ],
    },
  ];

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
              <CardTitle className="text-4xl font-bold">Mike Learning Centre Memberships</CardTitle>
              <CardDescription className="text-base md:text-lg">
                Start with a complimentary 30-day trial. Continue without limits on <span className="font-semibold text-primary">Pro at {formattedMonthly}/month</span> or step up to <span className="font-semibold text-primary">Elite at {formattedYearly}/year</span>. Secure M-Pesa payments launch soon—claim your spot on the early access list.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-3">
              {tiers.map((tier) => {
                const Icon = tier.icon;
                return (
                  <div
                    key={tier.id}
                    className={`relative flex h-full flex-col rounded-2xl border ${tier.accent} ${tier.highlight ? "bg-primary/10 shadow-glow" : "bg-background/60"} p-6 backdrop-blur-lg`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/12 text-primary">
                        <Icon className="h-5 w-5" />
                      </span>
                      <Badge variant="outline" className="border-primary/40 text-primary">
                        {tier.badge}
                      </Badge>
                    </div>
                    <h3 className={`mt-6 text-2xl font-semibold ${tier.highlight ? "text-primary" : "text-foreground"}`}>{tier.title}</h3>
                    <p className={`mt-2 text-sm ${tier.highlight ? "text-primary/85" : "text-muted-foreground"}`}>{tier.description}</p>
                    <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button variant={tier.highlight ? "secondary" : "outline"} className="mt-auto w-full shadow-glow" disabled>
                      M-Pesa payments launching soon
                    </Button>
                  </div>
                );
              })}
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
                  Enjoy full access for 30 days at no cost, then choose a simple monthly or annual membership.
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
                  Everything you learn on the free tier transfers instantly whether you pick Pro or Elite.
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
                  Pay with the mobile wallet you already trust. Full compliance, clarity, and STK push comfort.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
          <p className="text-center text-xs text-muted-foreground">
            We&apos;re partnering with M-Pesa to enable secure STK push payments. Until then, enjoy the free tier—your progress and preferences are saved.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Subscribe;
