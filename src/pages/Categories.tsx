import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { categories } from "@/data/courses";
import { ArrowRight, LayoutDashboard, Layers, Sparkles } from "lucide-react";
import { useTranslation } from "@/context/LocaleContext";

const Categories = () => {
  const { t } = useTranslation();

  const highlights = [
    {
      id: "tracks",
      icon: LayoutDashboard,
      title: "Comprehensive tracks",
      description: "Every category expands across beginner, intermediate, and advanced journeys.",
    },
    {
      id: "breadth",
      icon: Layers,
      title: "11 modern disciplines",
      description: "Stay future-proof with coverage across engineering, data, AI, security, and design.",
    },
    {
      id: "quality",
      icon: Sparkles,
      title: "Project-ready outcomes",
      description: "Courses ship with project briefs, assessments, and practical deliverables.",
    },
  ];

  const stats = [
    { id: "categories", value: categories.length, label: "Categories" },
    { id: "avgCourses", value: Math.round(categories.reduce((sum, c) => sum + c.courseCount, 0) / categories.length), label: "Avg courses per track" },
    { id: "totalCourses", value: categories.reduce((sum, c) => sum + c.courseCount, 0), label: "Total courses" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="container mx-auto px-4 py-16">
        <section className="mb-16 grid gap-8 lg:grid-cols-[2fr,1fr]">
          <div className="glass-panel glass-panel-strong relative overflow-hidden p-10">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/12 via-transparent to-secondary/15 opacity-80" />
            <div className="relative z-10 space-y-6">
              <Badge variant="outline" className="border-border/60 bg-card/70 text-xs uppercase tracking-[0.32em] text-muted-foreground">
                {t("categories.badge")}
              </Badge>
              <h1 className="text-4xl font-bold md:text-5xl">{t("categories.title")}</h1>
              <p className="text-lg text-muted-foreground md:max-w-2xl">
                {t("categories.description", { args: [categories.length] })}
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link to="/categories">
                  <Button size="lg" variant="secondary" className="shadow-glow">
                    {t("categories.primaryCta")}
                  </Button>
                </Link>
                <Link to="/exercises">
                  <Button size="lg" variant="ghost" className="border border-border/45 text-primary hover:text-primary">
                    {t("categories.secondaryCta")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            {highlights.map((highlight, index) => {
              const Icon = highlight.icon;
              return (
                <div
                  key={highlight.id}
                  className="glass-panel relative overflow-hidden border border-border/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/45 hover:shadow-glow"
                  style={{ animationDelay: `${index * 120}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/12 opacity-75" />
                  <div className="relative z-10 flex items-start gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-base font-semibold">{highlight.title}</h3>
                      <p className="text-sm text-muted-foreground">{highlight.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mb-16 grid gap-6 sm:grid-cols-3">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className="glass-panel flex flex-col items-center gap-2 border border-border/45 px-6 py-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/45"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="text-3xl font-semibold text-primary">{stat.value}</span>
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </section>

        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="group"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <Card className="group relative h-full overflow-hidden border border-border/35 glass-panel transition-all duration-300 hover:-translate-y-1 hover:border-primary/45 hover:shadow-glow">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/6 via-transparent to-secondary/10 opacity-70 transition-opacity group-hover:opacity-95" />
                <CardHeader className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-4xl">{category.icon}</div>
                    <Badge variant="outline" className="border-border/50 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                      {category.courseCount} {category.courseCount === 1 ? "course" : "courses"}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl transition-colors group-hover:text-primary">{category.name}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent className="relative z-10 flex items-center justify-between pt-0 text-sm text-muted-foreground">
                  <span>View curriculum</span>
                  <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Categories;
