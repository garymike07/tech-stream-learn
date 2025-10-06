import { useMemo } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { categories, courses } from "@/data/courses";
import { learningPaths } from "@/data/learningPaths";
import { useAuth } from "@/context/AuthContext";
import { useProgress } from "@/context/ProgressContext";
import { buildCourseRecommendations, buildPathRecommendations } from "@/utils/recommendations";
import { toast } from "@/hooks/use-toast";
import { format, differenceInCalendarDays, isSameDay } from "date-fns";
import { Activity, Bell, Bot, Calendar, Compass, Flame, Share2, Sparkles, Target, TrendingUp } from "lucide-react";
import { useTranslation } from "@/context/LocaleContext";

const categoryLabelMap = new Map(categories.map((category) => [category.id, category.name]));

const computeStreak = (timestamps: Date[]) => {
  if (timestamps.length === 0) return 0;
  const sorted = [...timestamps].sort((a, b) => b.getTime() - a.getTime());
  let streak = 1;
  for (let index = 1; index < sorted.length; index += 1) {
    const diff = differenceInCalendarDays(sorted[index - 1], sorted[index]);
    if (diff === 1 || diff === 0) {
      if (!isSameDay(sorted[index - 1], sorted[index])) {
        streak += 1;
      }
    } else {
      break;
    }
  }
  return streak;
};

const Insights = () => {
  const { user, enrollments } = useAuth();
  const { completedCourses, completionRecords, pathProgress, achievements } = useProgress();
  const { t } = useTranslation();

  const completionDates = useMemo(() => completionRecords.map((record) => new Date(record.completedAt)), [completionRecords]);
  const streak = useMemo(() => computeStreak(completionDates), [completionDates]);

  const completionsLast7Days = useMemo(
    () =>
      completionDates.filter((date) => {
        const diff = differenceInCalendarDays(new Date(), date);
        return diff >= 0 && diff < 7;
      }).length,
    [completionDates],
  );

  const lastCompletionLabel = useMemo(() => {
    if (completionRecords.length === 0) return "—";
    const latest = completionRecords[0];
    const course = courses.find((candidate) => candidate.id === latest.courseId);
    const courseTitle = course?.title ?? latest.courseId;
    return `${courseTitle} • ${format(new Date(latest.completedAt), "PP")}`;
  }, [completionRecords]);

  const categoryStats = useMemo(() => {
    const counts = new Map<string, number>();
    completionRecords.forEach((record) => {
      const course = courses.find((candidate) => candidate.id === record.courseId);
      if (!course) return;
      counts.set(course.category, (counts.get(course.category) ?? 0) + 1);
    });
    return counts;
  }, [completionRecords]);

  const categoryCoverage = useMemo(() => {
    const covered = categoryStats.size;
    if (categories.length === 0) return 0;
    return Math.round((covered / categories.length) * 100);
  }, [categoryStats]);

  const mostActiveCategory = useMemo(() => {
    let activeCategory: string | null = null;
    let max = 0;
    categoryStats.forEach((count, categoryId) => {
      if (count > max) {
        max = count;
        activeCategory = categoryId;
      }
    });
    if (!activeCategory) return "—";
    return categoryLabelMap.get(activeCategory) ?? activeCategory;
  }, [categoryStats]);

  const courseRecommendations = useMemo(
    () => buildCourseRecommendations({ completedCourseIds: completedCourses, enrollments, pathProgress }),
    [completedCourses, enrollments, pathProgress],
  );

  const pathRecommendations = useMemo(() => buildPathRecommendations(pathProgress), [pathProgress]);

  const leadingPathProgress = useMemo(() => {
    if (pathProgress.length === 0) return null;
    return [...pathProgress].sort((a, b) => b.percentage - a.percentage)[0];
  }, [pathProgress]);

  const leadingPathDefinition = useMemo(() => {
    if (!leadingPathProgress) return null;
    return learningPaths.find((path) => path.id === leadingPathProgress.pathId) ?? null;
  }, [leadingPathProgress]);

  const eliteProgressDetails = useMemo(
    () =>
      learningPaths
        .filter((path) => path.tier === "Elite")
        .map((path) => ({
          path,
          progress: pathProgress.find((entry) => entry.pathId === path.id) ?? null,
        })),
    [pathProgress],
  );

  const upcomingCohorts = useMemo(() => {
    return learningPaths
      .flatMap((path) =>
        (path.cohortWindows ?? []).map((window) => ({
          ...window,
          pathTitle: path.title,
          tier: path.tier,
        })),
      )
      .sort((a, b) => new Date(a.starts).getTime() - new Date(b.starts).getTime())
      .slice(0, 3);
  }, []);

  const aiMentorPrompts = useMemo(() => {
    const prompts = [] as Array<{ id: string; title: string; description: string; action: string }>;

    if (completionsLast7Days === 0) {
      prompts.push({
        id: "cadence-reset",
        title: "Refocus your cadence",
        description: "No completions logged this week. Protect a 90-minute deep work block to rebuild momentum.",
        action: "Block deep work",
      });
    }

    const activeElite = eliteProgressDetails.find((entry) => entry.progress && entry.progress.percentage > 0);
    if (activeElite?.progress) {
      const { path, progress } = activeElite;
      const remaining = Math.max(0, 100 - progress.percentage);
      prompts.push({
        id: "elite-check-in",
        title: `${path.title} concierge checkpoint`,
        description: `You are ${progress.percentage}% through this elite track. Share blockers with your concierge to accelerate the remaining ${remaining}% milestone.`,
        action: "Message concierge",
      });
    }

    if (leadingPathDefinition?.spotlightProjects?.length) {
      const nextSpotlight = leadingPathDefinition.spotlightProjects[0];
      prompts.push({
        id: "spotlight-readiness",
        title: `${nextSpotlight.title} rehearsal`,
        description: `Draft the narrative for “${nextSpotlight.outcome}” and gather proof points before your next executive playback.`,
        action: "Open spotlight brief",
      });
    }

    return prompts;
  }, [completionsLast7Days, eliteProgressDetails, leadingPathDefinition]);

  const upcomingAchievement = useMemo(() => achievements.find((achievement) => !achievement.earned && achievement.progress > 0)?.title ?? null, [achievements]);

  const notificationFeed = useMemo(() => {
    const feed = [] as Array<{ id: string; title: string; description: string; meta: string }>;
    const cohort = upcomingCohorts[0];
    if (cohort) {
      feed.push({
        id: `cohort-${cohort.id}`,
        title: `${cohort.pathTitle} cohort starting ${format(new Date(cohort.starts), "PP")}`,
        description: cohort.focus,
        meta: `${cohort.format} • ${cohort.tier}`,
      });
    }
    if (upcomingAchievement) {
      feed.push({
        id: "achievement",
        title: `${upcomingAchievement} is within reach`,
        description: "Stay on cadence to unlock your next badge and concierge celebration call.",
        meta: "Achievement milestone",
      });
    }
    if (streak > 0) {
      feed.push({
        id: "streak",
        title: `Streak: ${streak} day${streak === 1 ? "" : "s"}`,
        description: "Keep your momentum with a quick lesson recap today.",
        meta: "Momentum",
      });
    }
    return feed;
  }, [upcomingCohorts, upcomingAchievement, streak]);

  const handleShare = async () => {
    const snapshot = [
      `${t("insights.hero.shareFallback")}: ${completedCourses.length} courses`,
      `${t("insights.analytics.streak")}: ${streak} days`,
      `${t("insights.analytics.weekly")}: ${completionsLast7Days}`,
      `${t("insights.analytics.coverage")}: ${categoryCoverage}%`,
    ].join(" • ");

    try {
      await navigator.clipboard?.writeText(snapshot);
      toast({ title: t("insights.hero.shareSuccess") });
    } catch (error) {
      console.error("Failed to copy progress snapshot", error);
      toast({ title: t("insights.hero.shareFallback"), description: snapshot });
    }
  };

  const cohortSuggestions = useMemo(() => {
    const suggestions = [] as Array<{ id: string; labelKey: string; description: string }>;
    if (categoryStats.get("frontend")) {
      suggestions.push({
        id: "frontend",
        labelKey: "insights.cohorts.labels.frontend",
        description: "Ship design-system sprints with fellow UI engineers and share weekly reviews.",
      });
    }
    if (categoryStats.get("backend")) {
      suggestions.push({
        id: "backend",
        labelKey: "insights.cohorts.labels.backend",
        description: "Pair with platform engineers tackling resilient API rollouts and observability playbooks.",
      });
    }
    if (categoryStats.get("ai-engineering")) {
      suggestions.push({
        id: "ai",
        labelKey: "insights.cohorts.labels.ai",
        description: "Co-design evaluation dashboards and prompt experiments with applied AI builders.",
      });
    }
    if (categoryStats.get("cloud") || categoryStats.get("devops-sre")) {
      suggestions.push({
        id: "cloud",
        labelKey: "insights.cohorts.labels.cloud",
        description: "Trade multi-cloud reliability playbooks and FinOps benchmarks every Friday.",
      });
    }
    return suggestions;
  }, [categoryStats]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-4 py-12 space-y-10">
        <section className="glass-panel glass-panel-strong relative overflow-hidden border border-border/45 p-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-secondary/15" />
          <div className="relative z-10 space-y-6">
            <Badge variant="outline" className="border-primary/40 text-primary">
              <TrendingUp className="mr-2 h-3.5 w-3.5" />
              {t("nav.insights")}
            </Badge>
            <h1 className="text-4xl font-bold md:text-5xl">{t("insights.hero.title")}</h1>
            <p className="text-lg text-muted-foreground md:max-w-3xl">{t("insights.hero.subtitle")}</p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button onClick={handleShare} className="shadow-glow">
                <Share2 className="mr-2 h-4 w-4" />
                {t("insights.hero.shareCta")}
              </Button>
              {user ? <p className="text-sm text-muted-foreground">{user.fullName}</p> : null}
            </div>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          <Card className="glass-panel border border-border/45">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Flame className="h-4 w-4 text-primary" />
                {t("insights.analytics.streak")}
              </CardTitle>
              <CardDescription>{t("insights.analytics.lastCompletion", { args: [lastCompletionLabel] })}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-semibold text-primary">{streak}</p>
            </CardContent>
          </Card>

          <Card className="glass-panel border border-border/45">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Activity className="h-4 w-4 text-primary" />
                {t("insights.analytics.weekly")}
              </CardTitle>
              <CardDescription>{t("insights.analytics.completedThisWeek", { args: [completionsLast7Days] })}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-semibold text-primary">{completionsLast7Days}</p>
            </CardContent>
          </Card>

          <Card className="glass-panel border border-border/45">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Compass className="h-4 w-4 text-primary" />
                {t("insights.analytics.coverage")}
              </CardTitle>
              <CardDescription>{t("insights.analytics.mostActiveCategory", { args: [mostActiveCategory] })}</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={categoryCoverage} className="h-2" />
              <p className="mt-2 text-sm text-muted-foreground">{categoryCoverage}%</p>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="glass-panel border border-border/45 lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Bot className="h-4 w-4 text-primary" /> AI mentor prompts
              </CardTitle>
              <CardDescription>Adaptive nudges crafted from your recent progress.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {aiMentorPrompts.length === 0 ? (
                <p className="text-sm text-muted-foreground">All clear! Keep shipping and we&apos;ll surface new prompts after your next milestone.</p>
              ) : (
                aiMentorPrompts.map((prompt) => (
                  <div key={prompt.id} className="rounded-2xl border border-border/40 bg-card/60 p-4">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="text-sm font-semibold">{prompt.title}</h3>
                        <p className="text-sm text-muted-foreground/80">{prompt.description}</p>
                      </div>
                      <Button variant="ghost" className="px-0 text-primary">
                        {prompt.action}
                        <ArrowRight className="ml-2 h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          <Card className="glass-panel border border-border/45">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Bell className="h-4 w-4 text-primary" /> Notifications center
              </CardTitle>
              <CardDescription>Key events curated for your tier.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {notificationFeed.length === 0 ? (
                <p className="text-sm text-muted-foreground">You&apos;re caught up. We&apos;ll ping you when new cohorts or milestones unlock.</p>
              ) : (
                notificationFeed.map((item) => (
                  <div key={item.id} className="rounded-2xl border border-border/40 bg-card/60 p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground/70">{item.meta}</p>
                    <h3 className="mt-2 text-sm font-semibold">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground/80">{item.description}</p>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {leadingPathDefinition && leadingPathProgress ? (
            <Card className="glass-panel border border-border/45">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Target className="h-4 w-4 text-primary" /> Spotlight readiness
                </CardTitle>
                <CardDescription>{leadingPathDefinition.title}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Progress value={leadingPathProgress.percentage} className="h-2" />
                  <p className="mt-2 text-sm text-muted-foreground">{leadingPathProgress.percentage}% complete</p>
                </div>
                {leadingPathDefinition.spotlightProjects?.slice(0, 2).map((project) => (
                  <div key={project.id} className="rounded-2xl border border-border/40 bg-card/60 p-3">
                    <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{project.outcome}</p>
                    <p className="mt-1 text-sm font-semibold">{project.title}</p>
                  </div>
                ))}
                <Button asChild variant="secondary" className="w-full justify-center">
                  <Link to="/paths">Review path dashboard</Link>
                </Button>
              </CardContent>
            </Card>
          ) : null}
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">{t("insights.recommendations.title")}</h2>
              <p className="text-sm text-muted-foreground">{t("insights.recommendations.subtitle")}</p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {courseRecommendations.map((recommendation) => {
              const categoryName = categoryLabelMap.get(recommendation.course.category) ?? recommendation.course.category;
              const values = recommendation.values
                ? Object.fromEntries(
                    Object.entries(recommendation.values).map(([key, value]) => [key, categoryLabelMap.get(value) ?? value]),
                  )
                : undefined;
              const reason = values
                ? t(`insights.recommendations.reasons.${recommendation.reason}`, { values })
                : t(`insights.recommendations.reasons.${recommendation.reason}`);

              return (
                <Card key={recommendation.course.id} className="glass-panel border border-border/45">
                  <CardHeader>
                    <CardTitle className="text-lg">{recommendation.course.title}</CardTitle>
                    <CardDescription>{reason}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      <p>{categoryName}</p>
                      <p>{recommendation.course.difficulty}</p>
                    </div>
                    <Button variant="secondary" asChild className="shadow-glow">
                      <Link to={`/course/${recommendation.course.id}`}>{t("insights.recommendations.courseCTA")}</Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {pathRecommendations.length > 0 ? (
          <section className="glass-panel border border-border/45 p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold">Active learning paths</h2>
                <p className="text-sm text-muted-foreground">Stay on pace with milestones that unlock your next badge.</p>
              </div>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {pathRecommendations.slice(0, 4).map((path) => {
                const progress = pathProgress.find((candidate) => candidate.pathId === path.pathId);
                return (
                  <Card key={path.pathId} className="border border-border/40 bg-card/60">
                    <CardHeader>
                      <CardTitle className="text-lg">{path.title}</CardTitle>
                      <CardDescription>{progress ? `${progress.completed}/${progress.total} courses completed` : null}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Progress value={path.percentage} className="h-2" />
                      <div className="flex items-center justify-between text-sm">
                        <span>{path.percentage}%</span>
                        {path.nextCourseId ? (
                          <Button variant="ghost" size="sm" asChild>
                            <Link to={`/course/${path.nextCourseId}`} className="inline-flex items-center gap-2 text-primary">
                              {t("insights.recommendations.pathCTA")}
                              <Sparkles className="h-3.5 w-3.5" />
                            </Link>
                          </Button>
                        ) : null}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>
        ) : null}

        {cohortSuggestions.length > 0 ? (
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <div>
                <h2 className="text-lg font-semibold">{t("insights.cohorts.title")}</h2>
                <p className="text-sm text-muted-foreground">{t("insights.cohorts.subtitle")}</p>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {cohortSuggestions.map((cohort) => (
                <Card key={cohort.id} className="glass-panel border border-border/45">
                  <CardHeader>
                    <CardTitle>{t(cohort.labelKey)}</CardTitle>
                    <CardDescription>{cohort.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  );
};

export default Insights;
