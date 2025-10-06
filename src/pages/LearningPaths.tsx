import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { learningPaths } from "@/data/learningPaths";
import { courses } from "@/data/courses";
import { useProgress } from "@/context/ProgressContext";
import { useAuth } from "@/context/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Compass, Flag, Sparkles, Trophy } from "lucide-react";

const courseTitleMap = new Map(courses.map((course) => [course.id, course.title]));

const LearningPaths = () => {
  const navigate = useNavigate();
  const { enrollments, user } = useAuth();
  const { pathProgress, getPathProgress, achievements, isCourseCompleted } = useProgress();
  const [activePathId, setActivePathId] = useState<string>(learningPaths[0]?.id ?? "");
  const activePath = useMemo(() => learningPaths.find((path) => path.id === activePathId) ?? learningPaths[0], [activePathId]);
  const activePathProgress = getPathProgress(activePath?.id ?? "");

  const stageSummaries = useMemo(() => {
    if (!activePath) return [] as Array<{
      id: string;
      title: string;
      description: string;
      completed: number;
      total: number;
    }>;
    return activePath.stages.map((stage) => {
      const completed = stage.courseIds.filter((courseId) => isCourseCompleted(courseId)).length;
      return {
        id: stage.id,
        title: stage.title,
        description: stage.description,
        completed,
        total: stage.courseIds.length,
      };
    });
  }, [activePath, isCourseCompleted]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="container mx-auto px-4 py-12 space-y-12">
        <section className="glass-panel glass-panel-strong relative overflow-hidden border border-border/45 p-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-secondary/15" />
          <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-4 max-w-2xl">
              <Badge variant="outline" className="border-primary/40 text-primary">
                <Compass className="mr-2 h-3.5 w-3.5" /> Guided learning flows
              </Badge>
              <h1 className="text-4xl font-bold md:text-5xl">Curated paths that compound your craft</h1>
              <p className="text-lg text-muted-foreground">
                Advance with structured sequences, milestone check-ins, and achievements that celebrate consistent execution.
                {user ? ` Welcome back, ${user.fullName.split(" ")[0]} — resume where you left off.` : " Sign in to sync your progress."}
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-border/50 bg-card/60 p-4 text-sm">
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Paths available</p>
                  <p className="mt-2 text-2xl font-semibold">{learningPaths.length}</p>
                </div>
                <div className="rounded-2xl border border-border/50 bg-card/60 p-4 text-sm">
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Courses completed</p>
                  <p className="mt-2 text-2xl font-semibold">{pathProgress.reduce((sum, progress) => sum + progress.completed, 0)}</p>
                </div>
                <div className="rounded-2xl border border-border/50 bg-card/60 p-4 text-sm">
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Achievements</p>
                  <p className="mt-2 text-2xl font-semibold">{achievements.filter((achievement) => achievement.earned).length}</p>
                </div>
              </div>
            </div>
            <div className="rounded-3xl border border-primary/40 bg-primary/10 p-6 text-sm text-primary max-w-sm">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em]">
                <Sparkles className="h-4 w-4" /> Momentum tracker
              </div>
              <p className="mt-3 text-base text-primary/80">
                Stay intentional: review stage milestones, complete capstone briefs, and update progress from the lesson player to unlock path badges.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Choose your path</h2>
            {activePathProgress?.nextCourseId ? (
              <Button onClick={() => navigate(`/course/${activePathProgress.nextCourseId}`)} className="shadow-glow">
                Continue next course
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : null}
          </div>

          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {learningPaths.map((path) => {
              const isActive = path.id === activePath?.id;
              const progress = getPathProgress(path.id);
              const percentage = progress?.percentage ?? 0;

              return (
                <button
                  key={path.id}
                  onClick={() => setActivePathId(path.id)}
                  className={`group rounded-3xl border border-border/45 bg-card/40 p-6 text-left transition-all hover:border-primary/40 hover:bg-card/60 ${
                    isActive ? "ring-2 ring-primary/40" : ""
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-3xl" role="img" aria-label={path.badge.name}>
                      {path.badge.icon}
                    </span>
                    <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{path.duration}</span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{path.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{path.description}</p>
                  <div className="mt-6 space-y-2">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{progress?.completed ?? 0} of {progress?.total ?? path.stages.reduce((sum, stage) => sum + stage.courseIds.length, 0)} completed</span>
                      <span>{percentage}%</span>
                    </div>
                    <Progress value={percentage} className="h-2 bg-background/40" />
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {activePath ? (
          <section className="space-y-6">
            <div className="glass-panel border border-border/45 p-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <Badge variant="outline" className="border-primary/40 text-primary">
                    <Flag className="mr-2 h-3.5 w-3.5" /> {activePath.focus}
                  </Badge>
                  <h2 className="mt-4 text-3xl font-bold">{activePath.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground md:max-w-2xl">{activePath.description}</p>
                </div>
                <div className="rounded-3xl border border-border/45 bg-card/50 p-4 text-sm">
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Ideal for</p>
                  <ul className="mt-2 space-y-1 text-muted-foreground">
                    {activePath.idealFor.map((role) => (
                      <li key={role}>• {role}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {stageSummaries.map((stage) => (
                  <div key={stage.id} className="rounded-2xl border border-border/40 bg-background/50 p-5">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold">{stage.title}</p>
                      <span className="text-xs text-muted-foreground">{stage.completed}/{stage.total}</span>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">{stage.description}</p>
                    <Progress value={stage.total === 0 ? 0 : (stage.completed / stage.total) * 100} className="mt-4 h-2 bg-card/40" />
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel border border-border/45 p-8 space-y-8">
              {activePath.stages.map((stage) => (
                <div key={stage.id} className="space-y-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Stage</p>
                      <h3 className="text-xl font-semibold">{stage.title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                      {stage.outcomes.map((outcome) => (
                        <span key={outcome} className="rounded-full border border-border/45 px-3 py-1">
                          {outcome}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground md:max-w-3xl">{stage.description}</p>

                  <div className="grid gap-3 md:grid-cols-2">
                    {stage.courseIds.map((courseId) => {
                      const courseTitle = courseTitleMap.get(courseId) ?? courseId;
                      const completed = isCourseCompleted(courseId);
                      const enrolled = enrollments.includes(courseId);
                      return (
                        <Card key={courseId} className="border border-border/45 bg-card/50">
                          <CardContent className="p-5">
                            <div className="flex items-center justify-between gap-2">
                              <p className="font-semibold">{courseTitle}</p>
                              <Badge variant={completed ? "secondary" : enrolled ? "outline" : "default"} className={completed ? "bg-emerald-500/20 text-emerald-200" : undefined}>
                                {completed ? "Completed" : enrolled ? "In progress" : "Not started"}
                              </Badge>
                            </div>
                            <div className="mt-4 flex items-center justify-between">
                              <Button asChild variant="ghost" className="px-0 text-sm text-primary">
                                <Link to={`/course/${courseId}`} className="inline-flex items-center gap-1">
                                  View course
                                  <ArrowRight className="h-3.5 w-3.5" />
                                </Link>
                              </Button>
                              {completed ? <CheckCircle2 className="h-5 w-5 text-emerald-400" /> : null}
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="glass-panel border border-border/45 p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-3">
                  <Badge variant="outline" className="border-primary/40 text-primary">
                    <Trophy className="mr-2 h-3.5 w-3.5" /> Path achievements
                  </Badge>
                  <h3 className="text-2xl font-semibold">Unlock the {activePath.badge.name} badge</h3>
                  <p className="text-sm text-muted-foreground md:max-w-xl">
                    Complete every course and submit the capstone deliverables to earn the {activePath.badge.name} badge. We&apos;ll track your momentum and highlight which milestones need attention.
                  </p>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    {activePath.successMetrics.map((metric) => (
                      <p key={metric}>• {metric}</p>
                    ))}
                  </div>
                </div>
                <div className="rounded-3xl border border-border/45 bg-card/60 p-6 text-sm lg:max-w-md">
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Capstone brief</p>
                  <h4 className="mt-3 text-lg font-semibold">{activePath.capstone.title}</h4>
                  <p className="mt-2 text-muted-foreground">{activePath.capstone.description}</p>
                  <div className="mt-4 space-y-1 text-muted-foreground">
                    {activePath.capstone.deliverables.map((item) => (
                      <p key={item}>• {item}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : null}

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Achievements</h2>
            <p className="text-sm text-muted-foreground">Earn badges as you complete courses and full paths.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {achievements.map((achievement) => (
              <Card key={achievement.id} className={`border border-border/45 bg-card/50 ${achievement.earned ? "shadow-glow" : ""}`}>
                <CardContent className="space-y-4 p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{achievement.title}</h3>
                    {achievement.earned ? <CheckCircle2 className="h-5 w-5 text-emerald-400" /> : null}
                  </div>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <div className="flex items-center justify-between">
                      <span>Progress</span>
                      <span>
                        {achievement.current}/{achievement.target}
                      </span>
                    </div>
                    <Progress value={Math.min(100, achievement.progress * 100)} className="h-2 bg-background/40" />
                    <p className="text-muted-foreground/80">Goal: {achievement.requirementLabel}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default LearningPaths;
