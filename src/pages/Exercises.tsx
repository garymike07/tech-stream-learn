import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { courseExercises } from "@/data/exercises";
import { categories, courses } from "@/data/courses";
import { Sparkles } from "lucide-react";

const COURSE_COMPLETIONS_KEY = "mlc-course-completions";
const EXERCISE_COMPLETIONS_KEY = "mlc-exercise-completions";

const loadCompletionSet = (key: string) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return new Set<string>();
    const parsed = JSON.parse(raw) as string[];
    return new Set(parsed);
  } catch (error) {
    console.error("Failed to parse completion set", error);
    return new Set<string>();
  }
};

const Exercises = () => {
  const location = useLocation();
  const [highlightedCourse, setHighlightedCourse] = useState<string | null>(null);
  const [completedCourses, setCompletedCourses] = useState<Set<string>>(() => loadCompletionSet(COURSE_COMPLETIONS_KEY));
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(() => loadCompletionSet(EXERCISE_COMPLETIONS_KEY));

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const targetCourse = (location.state as { course?: string } | null)?.course ?? params.get("course");
    if (targetCourse) {
      setHighlightedCourse(targetCourse);
      setTimeout(() => {
        const section = document.getElementById(`category-${targetCourse}`);
        section?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);
    }
  }, [location]);

  useEffect(() => {
    const handleStorage = () => {
      setCompletedCourses(loadCompletionSet(COURSE_COMPLETIONS_KEY));
      setCompletedExercises(loadCompletionSet(EXERCISE_COMPLETIONS_KEY));
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const courseCompletionsLabel = useMemo(() => completedCourses.size, [completedCourses]);
  const exerciseCompletionsLabel = useMemo(() => completedExercises.size, [completedExercises]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="relative">
        <section className="relative overflow-hidden py-20 md:py-28">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 blur-3xl" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background/95 to-transparent" />
          <div className="container relative z-10 mx-auto px-4">
            <Card className="max-w-5xl border border-border/40 bg-card/50 backdrop-blur-2xl shadow-glow animate-fade-in">
              <CardHeader className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                  <Sparkles className="h-3.5 w-3.5" />
                  Practice Hub
                </div>
                <CardTitle className="text-3xl md:text-4xl font-bold">Dynamic Exercise Centre</CardTitle>
                <CardDescription className="text-base md:text-lg">
                  Every learning path includes multi-stage briefs, realistic deliverables, and curated references sourced from trusted documentation so you can specialise through deliberate practice.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="secondary" className="bg-primary/15 text-primary">
                    Guided practice
                  </Badge>
                  <Badge variant="secondary" className="bg-secondary/15 text-secondary-foreground">
                    Real-world briefs
                  </Badge>
                  <Badge variant="secondary" className="bg-muted/40 text-muted-foreground">
                    Skills-focused outcomes
                  </Badge>
                  <Badge variant="secondary" className="bg-emerald-500/15 text-emerald-200">
                    {courseCompletionsLabel} course badges
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-500/15 text-blue-200">
                    {exerciseCompletionsLabel} exercises completed
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <div className="container mx-auto space-y-20 px-4 pb-24">
          {categories.map((category) => {
            const categoryCourses = courses.filter((course) => course.category === category.id);

            if (categoryCourses.length === 0) return null;

            return (
              <section key={category.id} className="space-y-10">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                  <div>
                    <h2 className="text-3xl font-semibold md:text-4xl">
                      {category.icon} {category.name}
                    </h2>
                    <p className="text-muted-foreground md:text-lg">{category.description}</p>
                  </div>
                  <Button asChild variant="outline" className="border-border/40 bg-card/40 backdrop-blur-lg">
                    <a href={`#category-${category.id}`}>Jump to {category.name}</a>
                  </Button>
                </div>

                <div
                  id={`category-${category.id}`}
                  className={`grid gap-8 lg:grid-cols-2 ${highlightedCourse === category.id ? "animate-glow-pulse" : ""}`}
                >
                  {categoryCourses.map((course) => {
                    const exercises = courseExercises[course.id] ?? [];

                    return (
                      <Card
                        key={course.id}
                        className="relative flex h-full flex-col border border-border/40 bg-card/40 backdrop-blur-xl shadow-glow animate-fade-in hover:border-primary/50 transition-colors"
                      >
                        <CardHeader className="space-y-3">
                          <CardTitle className="text-2xl font-bold">{course.title}</CardTitle>
                          <CardDescription>{course.description}</CardDescription>
                          {completedCourses.has(course.id) ? (
                            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                              <Sparkles className="h-3.5 w-3.5" /> Course badge earned
                            </div>
                          ) : null}
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Guided Exercises</h3>
                            <Accordion type="single" collapsible className="space-y-2">
                              {exercises.map((exercise) => (
                                <AccordionItem key={exercise.id} value={exercise.id} className="overflow-hidden rounded-xl border border-border/30 bg-background/60">
                                  <AccordionTrigger className="px-4 py-3 text-left text-sm font-medium">
                                    <div className="flex flex-col gap-1 text-left">
                                      <span className="inline-flex flex-wrap items-center gap-2">
                                        <Badge variant="outline" className="border-primary/40 text-primary">
                                          {exercise.level}
                                        </Badge>
                                        <Badge variant="outline" className="border-secondary/40 text-secondary">
                                          {exercise.estimatedTime}
                                        </Badge>
                                        {completedExercises.has(exercise.id) ? (
                                          <Badge variant="secondary" className="bg-emerald-500/15 text-emerald-200">
                                            Completed
                                          </Badge>
                                        ) : null}
                                      </span>
                                      <span className="text-foreground">{exercise.title}</span>
                                    </div>
                                  </AccordionTrigger>
                                  <AccordionContent className="space-y-4 px-4 pb-4 text-sm text-muted-foreground">
                                    <p>{exercise.overview}</p>
                                    <div className="flex flex-wrap gap-2">
                                      {exercise.skills.map((skill) => (
                                        <Badge key={skill} variant="secondary" className="bg-muted/40 text-muted-foreground">
                                          {skill}
                                        </Badge>
                                      ))}
                                    </div>
                                    <div>
                                      <p className="mb-2 font-medium text-foreground">Actionable tasks</p>
                                      <ul className="list-disc space-y-2 pl-5 text-foreground/80">
                                        {exercise.tasks.map((task, index) => (
                                          <li key={index}>{task}</li>
                                        ))}
                                      </ul>
                                    </div>
                                    {exercise.resources.length > 0 ? (
                                      <div>
                                        <p className="mb-2 font-medium text-foreground">Reference material</p>
                                        <ul className="list-disc space-y-1 pl-5">
                                          {exercise.resources.map((resource) => (
                                            <li key={resource.url}>
                                              <a
                                                className="text-primary underline-offset-2 hover:underline"
                                                href={resource.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                              >
                                                {resource.label}
                                              </a>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    ) : null}
                                    <div className="flex justify-end">
                                      <Button asChild variant="secondary" size="sm" className="shadow-glow">
                                        <Link to={`/exercise/${course.id}/${exercise.id}`}>Resolve this exercise</Link>
                                      </Button>
                                    </div>
                                  </AccordionContent>
                                </AccordionItem>
                              ))}
                            </Accordion>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Exercises;
