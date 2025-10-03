import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { courseExercises } from "@/data/exercises";
import { courses } from "@/data/courses";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, Award, CheckCircle } from "lucide-react";

const EXERCISE_COMPLETIONS_KEY = "mlc-exercise-completions";
const COURSE_COMPLETIONS_KEY = "mlc-course-completions";

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

const persistCompletionSet = (key: string, values: Set<string>) => {
  localStorage.setItem(key, JSON.stringify(Array.from(values)));
};

const ExerciseDetail = () => {
  const { courseId, exerciseId } = useParams<{ courseId: string; exerciseId: string }>();
  const navigate = useNavigate();

  const course = useMemo(() => courses.find((item) => item.id === courseId), [courseId]);
  const exercise = useMemo(() => {
    if (!courseId) return undefined;
    const list = courseExercises[courseId] ?? [];
    return list.find((item) => item.id === exerciseId);
  }, [courseId, exerciseId]);

  const [completedExercises, setCompletedExercises] = useState<Set<string>>(() => loadCompletionSet(EXERCISE_COMPLETIONS_KEY));
  const [completedCourses] = useState<Set<string>>(() => loadCompletionSet(COURSE_COMPLETIONS_KEY));

  const isExerciseCompleted = exerciseId ? completedExercises.has(exerciseId) : false;
  const isCourseCompleted = courseId ? completedCourses.has(courseId) : false;

  useEffect(() => {
    const handleStorage = () => {
      setCompletedExercises(loadCompletionSet(EXERCISE_COMPLETIONS_KEY));
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  if (!course || !exercise) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main className="container mx-auto px-4 py-24">
          <Card className="mx-auto max-w-2xl border border-border/40 bg-card/50 backdrop-blur-xl shadow-glow">
            <CardHeader>
              <CardTitle>Exercise not found</CardTitle>
              <CardDescription>
                The exercise you&apos;re looking for doesn&apos;t exist. Please return to the exercise centre.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link to="/exercises">Back to Exercises</Link>
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  const handleMarkComplete = () => {
    if (!exerciseId) return;
    const next = new Set(completedExercises);
    if (next.has(exerciseId)) {
      toast({
        title: "Already completed",
        description: "You have already marked this exercise as complete.",
      });
      return;
    }
    next.add(exerciseId);
    setCompletedExercises(next);
    persistCompletionSet(EXERCISE_COMPLETIONS_KEY, next);
    toast({
      title: "Exercise completed",
      description: "Badge earned! Keep the momentum going.",
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="relative">
        <section className="relative overflow-hidden py-16 md:py-20">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 blur-3xl" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background/95 to-transparent" />
          <div className="container relative z-10 mx-auto px-4">
            <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <Link to="/exercises" className="inline-flex items-center gap-1 text-primary hover:underline">
                <ArrowLeft className="h-4 w-4" />
                Back to exercise centre
              </Link>
              <span>/</span>
              <span>{course?.title}</span>
            </div>
            <Card className="border border-border/40 bg-card/50 backdrop-blur-xl shadow-glow">
              <CardHeader className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="outline" className="border-primary/40 text-primary">
                    {exercise.level}
                  </Badge>
                  <Badge variant="outline" className="border-secondary/40 text-secondary">
                    {exercise.estimatedTime}
                  </Badge>
                  {isExerciseCompleted ? (
                    <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-200">
                      <CheckCircle className="mr-1 h-3.5 w-3.5" /> Completed
                    </Badge>
                  ) : null}
                </div>
                <CardTitle className="text-3xl font-bold">{exercise.title}</CardTitle>
                <CardDescription className="text-base text-muted-foreground">
                  {exercise.overview}
                </CardDescription>
                <div className="flex flex-wrap gap-2">
                  {exercise.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-muted/40 text-muted-foreground">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
            </Card>
          </div>
        </section>

        <section className="container mx-auto space-y-12 px-4 pb-20">
          <Card className="border border-border/40 bg-card/40 backdrop-blur-xl shadow-glow">
            <CardHeader>
              <CardTitle>Action plan</CardTitle>
              <CardDescription>
                Work through each checkpoint. Feel free to adapt the stack to match your project conventions.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Accordion type="multiple" defaultValue={["tasks"]} className="space-y-4">
                <AccordionItem value="tasks" className="overflow-hidden rounded-xl border border-border/30 bg-background/60">
                  <AccordionTrigger className="px-4 py-3 text-left">Detailed checklist</AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <ol className="list-decimal space-y-3 pl-5 text-sm text-muted-foreground">
                      {exercise.tasks.map((task, index) => (
                        <li key={index}>{task}</li>
                      ))}
                    </ol>
                  </AccordionContent>
                </AccordionItem>
                {exercise.resources.length > 0 ? (
                  <AccordionItem value="resources" className="overflow-hidden rounded-xl border border-border/30 bg-background/60">
                    <AccordionTrigger className="px-4 py-3 text-left">Reference material</AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                        {exercise.resources.map((resource) => (
                          <li key={resource.url}>
                            <a
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary underline-offset-2 hover:underline"
                            >
                              {resource.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ) : null}
              </Accordion>

              <div className="flex flex-wrap items-center gap-3">
                <Button onClick={handleMarkComplete} className="shadow-glow" size="lg">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Mark exercise as completed
                </Button>
                <Button variant="outline" onClick={() => navigate("/exercises", { state: { course: course.id } })}>
                  Back to {course.title}
                </Button>
              </div>
            </CardContent>
          </Card>

          {isCourseCompleted ? (
            <Card className="border border-emerald-500/40 bg-emerald-500/10 backdrop-blur-xl shadow-glow">
              <CardHeader className="flex gap-3">
                <Award className="h-6 w-6 text-emerald-300" />
                <div>
                  <CardTitle className="text-emerald-200">Course badge unlocked</CardTitle>
                  <CardDescription className="text-emerald-100/80">
                    You&apos;ve already completed the {course.title} learning path. Keep polishing those skills!
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          ) : null}
        </section>
      </main>
    </div>
  );
};

export default ExerciseDetail;
