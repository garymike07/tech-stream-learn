import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { categories } from "@/data/courses";
import { ArrowRight, BookOpen, Users, Award, Code2, ShieldCheck, MonitorPlay, Sparkles } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "@/context/LocaleContext";

const Index = () => {
  const { monthlyPriceKes } = useAuth();
  const formattedPrice = `KES ${monthlyPriceKes}/month`;
  const { t } = useTranslation();

  const heroHighlights = [
    {
      id: "tracks",
      label: "Expert-led tracks",
      description: "11 in-depth technology categories spanning frontend, backend, cloud, data, AI, and product design.",
    },
    {
      id: "exercises",
      label: "Guided practice",
      description: "Project briefs, assessments, and deliverables make every lesson actionable.",
    },
    {
      id: "pricing",
      label: "Learner-first pricing",
      description: "Start with a generous 30-day unlimited trial before upgrading on your terms.",
    },
  ];

  const heroCallouts = [
    {
      id: "secure",
      icon: ShieldCheck,
      title: "Clerk-secured onboarding",
      description: "Enterprise-grade Google and GitHub sign-in keeps every learner protected.",
    },
    {
      id: "curation",
      icon: MonitorPlay,
      title: "Curated video pathways",
      description: "Hand-picked lessons sequenced into outlines, milestones, and momentum checkpoints.",
    },
    {
      id: "projects",
      icon: Sparkles,
      title: "Project-first mastery",
      description: "Each course delivers briefs, assessments, and outcomes so progress is tangible.",
    },
  ];

  const heroStats = [
    { id: "courses", value: "70+", label: "Courses live" },
    { id: "projects", value: "45", label: "Project briefs" },
    { id: "trial", value: "30d", label: "Unlimited trial" },
  ];

  const featureHighlights = [
    {
      id: "curriculum",
      icon: BookOpen,
      title: "Structured Curriculum",
      description: "Move from fundamentals to advanced systems with multi-level pathways built to stack.",
    },
    {
      id: "quality",
      icon: Users,
      title: "Quality Content",
      description: "Learn from meticulously curated video lessons and insights that keep pace with industry.",
    },
    {
      id: "self-paced",
      icon: Award,
      title: "Self-Paced Momentum",
      description: "Return anytime with lifetime updates, guided exercises, and transparent learning outcomes.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <section className="relative overflow-hidden py-24 md:py-36">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[url('/mike-hero.png')] bg-cover bg-center opacity-[0.18] mix-blend-screen" />
          <div className="absolute inset-0 bg-gradient-to-tr from-background via-background/80 to-transparent" />
        </div>
        <div className="absolute right-[-12%] top-[-18%] h-[30rem] w-[30rem] rounded-full bg-primary/25 blur-3xl opacity-70 animate-diagonal-drift" />
        <div className="absolute left-[-20%] bottom-[-24%] h-[34rem] w-[34rem] rounded-full bg-secondary/22 blur-3xl opacity-65 animate-float-tilt" />
        <div className="container relative z-10 mx-auto px-4">
          <div className="hero-grid items-center">
            <div className="space-y-8">
              <span className="hero-badge">
                <Code2 className="h-3.5 w-3.5" />
                {t("landing.hero.badge")}
              </span>
              <h1 className="text-4xl font-bold md:text-6xl">
                {t("landing.hero.title")}
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl">
                {t("landing.hero.subtitle", { values: { price: formattedPrice } })}
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link to="/categories">
                  <Button size="lg" variant="secondary" className="group shadow-glow">
                    {t("landing.hero.primaryCta")}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/exercises">
                  <Button size="lg" variant="outline" className="group border border-border/55 backdrop-blur-lg">
                    {t("landing.hero.secondaryCta")}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/subscribe">
                  <Button size="lg" variant="ghost" className="group border border-border/45 text-primary hover:text-primary">
                    {t("landing.hero.pricingCta")}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {heroHighlights.map((highlight) => (
                  <div
                    key={highlight.id}
                    className="relative overflow-hidden rounded-2xl border border-border/40 bg-card/55 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/45 hover:shadow-glow"
                  >
                    <Badge variant="outline" className="mb-3 border-border/50 bg-card/70 text-[0.68rem] uppercase tracking-[0.32em] text-muted-foreground">
                      {highlight.label}
                    </Badge>
                    <p className="text-sm text-muted-foreground">{highlight.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-panel glass-panel-strong relative overflow-hidden p-6 md:p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/12 via-transparent to-secondary/18 opacity-80" />
              <div className="absolute -right-16 top-8 h-44 w-44 rounded-full bg-primary/22 blur-3xl" />
              <div className="absolute -bottom-16 left-14 h-52 w-52 rounded-full bg-secondary/18 blur-3xl" />
              <div className="relative z-10 space-y-6">
                <div className="grid gap-4">
                  {heroCallouts.map((callout, index) => {
                    const Icon = callout.icon;
                    return (
                      <div
                        key={callout.id}
                        className="group rounded-2xl border border-border/40 bg-card/65 p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow"
                        style={{ animationDelay: `${index * 120}ms` }}
                      >
                        <div className="flex items-start gap-4">
                          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                            <Icon className="h-5 w-5" />
                          </span>
                          <div className="space-y-1.5">
                            <h3 className="text-base font-semibold">{callout.title}</h3>
                            <p className="text-sm text-muted-foreground">{callout.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  {heroStats.map((stat) => (
                    <div
                      key={stat.id}
                      className="rounded-2xl border border-border/45 bg-card/60 py-4 backdrop-blur transition-all hover:-translate-y-0.5 hover:border-primary/45"
                    >
                      <p className="text-2xl font-semibold text-primary">{stat.value}</p>
                      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-14 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">{t("landing.highlights.title")}</h2>
            <p className="mt-3 text-lg text-muted-foreground">{t("landing.highlights.description")}</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {featureHighlights.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={feature.id}
                  className="group relative overflow-hidden border border-border/40 glass-panel transition-all duration-300 hover:-translate-y-1 hover:border-primary/45 hover:shadow-glow"
                  style={{ animationDelay: `${index * 120}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-secondary/12 opacity-70 transition-opacity group-hover:opacity-95" />
                  <CardHeader className="relative z-10 space-y-4 pb-2">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10 pt-0">
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      <section className="bg-muted/15 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold md:text-4xl bg-gradient-hero bg-clip-text text-transparent">
              {t("landing.categories.title")}
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">{t("landing.categories.description")}</p>
          </div>
          <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.slice(0, 6).map((category, index) => (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card className="group relative h-full overflow-hidden border border-border/35 glass-panel transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/6 via-transparent to-secondary/10 opacity-60 transition-opacity group-hover:opacity-90" />
                  <CardHeader className="relative z-10 space-y-4">
                    <div className="text-4xl">{category.icon}</div>
                    <CardTitle className="text-xl transition-colors group-hover:text-primary">{category.name}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="relative z-10 flex items-center justify-between pt-0 text-sm">
                    <span className="text-muted-foreground">
                      {category.courseCount} {category.courseCount === 1 ? "course" : "courses"}
                    </span>
                    <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link to="/categories">
              <Button variant="outline" size="lg" className="group border border-border/45 backdrop-blur-lg">
                {t("landing.categories.viewAll")}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <span className="hero-badge uppercase tracking-[0.35em] text-primary">{t("landing.pricing.badge")}</span>
            <h2 className="mt-5 text-3xl font-bold md:text-4xl">{t("landing.pricing.title")}</h2>
            <p className="mt-2 text-lg text-muted-foreground">{t("landing.pricing.description")}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="relative overflow-hidden border border-border/40 glass-panel shadow-none">
              <div className="absolute inset-0 bg-gradient-to-br from-card/40 via-transparent to-primary/5 opacity-60" />
              <CardHeader className="relative z-10">
                <CardTitle>{t("landing.pricing.freeTitle")}</CardTitle>
                <CardDescription>{t("landing.pricing.freeDescription")}</CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✅ Full access to 3 complete courses</li>
                  <li>✅ Dynamic exercise centre previews</li>
                  <li>✅ Progress tracking on every lesson</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="relative overflow-hidden border border-primary/45 glass-panel-strong shadow-glow">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-secondary/20 opacity-80" />
              <CardHeader className="relative z-10">
                <CardTitle className="text-primary">{t("landing.pricing.premiumTitle", { args: [formattedPrice] })}</CardTitle>
                <CardDescription className="text-primary/80">
                  Enjoy a 30-day unlimited trial, then unlock advanced exercises, new tracks, and learning perks.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10 space-y-4">
                <ul className="space-y-2 text-sm text-primary/85">
                  <li>✨ Unlimited courses & exercise walkthroughs</li>
                  <li>✨ Early access to new tracks & badges</li>
                  <li>✨ Priority influence on the roadmap</li>
                </ul>
                <Button asChild variant="secondary" disabled className="w-full shadow-glow">
                  <span>{t("landing.pricing.premiumCta")}</span>
                </Button>
                <p className="text-xs text-primary/75">{t("landing.pricing.premiumNote")}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="glass-panel glass-panel-strong relative overflow-hidden p-10 text-center md:p-14">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/12 via-transparent to-secondary/18 opacity-85" />
            <div className="relative z-10 space-y-6">
              <h2 className="text-3xl font-bold md:text-4xl">{t("landing.callToAction.title")}</h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">{t("landing.callToAction.description")}</p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link to="/categories">
                  <Button size="lg" variant="secondary" className="shadow-glow">
                    {t("landing.callToAction.browse")}
                  </Button>
                </Link>
                <Link to="/subscribe" className="text-sm text-primary underline-offset-4 hover:underline">
                  {t("landing.pricing.unlockPricing", { args: [formattedPrice] })}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
