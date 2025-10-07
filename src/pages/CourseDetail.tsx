import { useMemo } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { courses } from "@/data/courses";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  Clock,
  BarChart,
  PlayCircle,
  ArrowLeft,
  Award,
  ShieldCheck,
  Hourglass,
  Layers,
  Sparkles,
  FileText,
  Gauge,
  Target,
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Bot,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useProgress } from "@/context/ProgressContext";
import { toast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { buildCourseIntel } from "@/utils/contentIntelligence";

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, enrollCourse, enrollments, subscriptionStatus, maxFreeCourses, trialDaysRemaining, monthlyPriceKes } = useAuth();
  const { isCourseCompleted, completedCourses } = useProgress();
  const course = useMemo(() => courses.find((c) => c.id === courseId), [courseId]);
  const courseIntel = useMemo(() => (course ? buildCourseIntel(course, completedCourses) : null), [course, completedCourses]);

  if (!course || !courseIntel) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold">Course not found</h1>
        </main>
      </div>
    );
  }

  const difficultyColors = {
    Beginner: "border-emerald-400/40 bg-emerald-500/15 text-emerald-100",
    Intermediate: "border-amber-400/40 bg-amber-500/15 text-amber-100",
    Advanced: "border-rose-500/40 bg-rose-500/15 text-rose-100",
  } as const;

  const firstLesson = course.modules[0]?.sections[0]?.lessons[0];
  const isEnrolled = courseId ? enrollments.includes(courseId) : false;
  const courseCompleted = courseId ? isCourseCompleted(courseId) : false;
  const isTrialActive = subscriptionStatus === "trial";
  const hasUnlimitedAccess = subscriptionStatus === "premium" || isTrialActive;
  const hasFreeQuota = hasUnlimitedAccess || isEnrolled || enrollments.length < maxFreeCourses;
  const formattedPrice = `KES ${monthlyPriceKes}/month`;

  const handleEnroll = () => {
    if (!courseId) return;

    if (!user) {
      toast({
        title: "Sign in required",
        description: "Create an account or sign in to enroll in this course.",
      });
      navigate("/login", {
        replace: false,
        state: {
          from: location.pathname,
          intended: firstLesson ? `/course/${courseId}/lesson/${firstLesson.id}` : location.pathname,
        },
      });
      return;
    }

    try {
      if (!isEnrolled) {
        enrollCourse(courseId);
        toast({
          title: "Enrollment confirmed",
          description: `You are now enrolled in ${course.title}.`,
        });
      }

      if (firstLesson) {
        navigate(`/course/${courseId}/lesson/${firstLesson.id}`);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to enroll right now.";
      toast({
        title: "Subscription required",
        description: message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <Link to={`/category/${course.category}`}>
            <Button variant="ghost" className="group border border-border/45 text-muted-foreground hover:text-primary">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to category
            </Button>
          </Link>

          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Button onClick={handleEnroll} className="shadow-glow" disabled={!hasFreeQuota && !isEnrolled}>
              {isEnrolled ? "Continue learning" : hasFreeQuota ? "Enroll & start course" : "Subscription required"}
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate(`/exercises?course=${course.id}`)}
              className="border-primary/40 text-primary hover:text-primary"
            >
              Visit exercise centre
            </Button>
            {!user && <p className="text-xs text-muted-foreground">Enrollment requires a free account.</p>}
            {isTrialActive ? (
              <div className="flex flex-col gap-2 rounded-2xl border border-primary/40 bg-primary/10 px-4 py-3 text-xs text-primary">
                <span className="inline-flex items-center gap-2 font-semibold uppercase tracking-[0.3em]">
                  <Hourglass className="h-3.5 w-3.5" /> Trial access
                </span>
                <p>
                  {typeof trialDaysRemaining === "number"
                    ? trialDaysRemaining > 0
                      ? `Your 30-day trial ends in ${trialDaysRemaining} day${trialDaysRemaining === 1 ? "" : "s"}. Enjoy unlimited courses until then.`
                      : "Your 30-day trial ends today. Keep learning without limits while it lasts."
                    : "You are currently on a 30-day trial with unlimited access."}
                </p>
              </div>
            ) : null}
            {subscriptionStatus === "trial_expired" ? (
              <div className="flex flex-col gap-2 rounded-2xl border border-primary/40 bg-primary/10 px-4 py-3 text-xs text-primary">
                <span className="inline-flex items-center gap-2 font-semibold uppercase tracking-[0.3em]">
                  <ShieldCheck className="h-3.5 w-3.5" /> Trial ended
                </span>
                <p>
                  Your free trial has ended. Continue your learning journey with unlimited access for {formattedPrice} when checkout opens.
                </p>
                <Button asChild variant="secondary" size="sm" className="self-start shadow-glow">
                  <Link to="/subscribe">Secure your spot</Link>
                </Button>
              </div>
            ) : null}
            {!hasFreeQuota && !isEnrolled ? (
              <div className="flex flex-col gap-2 rounded-2xl border border-primary/40 bg-primary/10 px-4 py-3 text-xs text-primary">
                <span className="inline-flex items-center gap-2 font-semibold uppercase tracking-[0.3em]">
                  <ShieldCheck className="h-3.5 w-3.5" /> Upgrade
                </span>
                <p>
                  You have reached the free tier limit of {maxFreeCourses} courses. Subscribe for {formattedPrice} via M-Pesa (coming soon) to unlock unlimited learning.
                </p>
                <Button asChild variant="secondary" size="sm" className="self-start shadow-glow">
                  <Link to="/subscribe">View subscription details</Link>
                </Button>
              </div>
            ) : null}
            {courseCompleted ? (
              <Badge variant="secondary" className="bg-emerald-500/15 text-emerald-200">
                <Award className="mr-1 h-3.5 w-3.5" /> Course completed
              </Badge>
            ) : null}
          </div>
        </div>

        <div className="glass-panel glass-panel-strong relative overflow-hidden border border-border/45 p-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/12 via-transparent to-secondary/18 opacity-80" />
          <div className="relative z-10 space-y-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-4">
                <Badge className={difficultyColors[course.difficulty]}>{course.difficulty}</Badge>
                <h1 className="text-4xl font-bold md:text-5xl">{course.title}</h1>
                <p className="text-lg text-muted-foreground md:max-w-3xl">{course.description}</p>
              </div>
              <div className="grid gap-3 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2 rounded-2xl border border-border/50 bg-card/60 px-3 py-2">
                  <Clock className="h-4 w-4 text-primary" />
                  {course.duration}
                </span>
                <span className="inline-flex items-center gap-2 rounded-2xl border border-border/50 bg-card/60 px-3 py-2">
                  <BarChart className="h-4 w-4 text-primary" />
                  {course.modules.length} modules
                </span>
                {course.projectBriefs && course.projectBriefs.length > 0 ? (
                  <span className="inline-flex items-center gap-2 rounded-2xl border border-border/50 bg-card/60 px-3 py-2">
                    <FileText className="h-4 w-4 text-primary" />
                    {course.projectBriefs.length} project brief{course.projectBriefs.length > 1 ? "s" : ""}
                  </span>
                ) : null}
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {course.prerequisites && course.prerequisites.length > 0 ? (
                <div className="rounded-2xl border border-border/45 bg-card/60 p-6">
                  <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    <Layers className="h-4 w-4 text-primary" /> prerequisites
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {course.prerequisites.map((prereq, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {prereq}
                      </Badge>
                    ))}
                  </div>
                </div>
              ) : null}

              {course.outcomes && course.outcomes.length > 0 ? (
                <div className="rounded-2xl border border-border/45 bg-card/60 p-6">
                  <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    <Sparkles className="h-4 w-4 text-primary" /> outcomes
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {course.outcomes.slice(0, 4).map((outcome, index) => (
                      <li key={index} className="leading-relaxed">• {outcome}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_minmax(0,1fr)]">
          <div className="glass-panel border border-border/40 p-6 lg:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="space-y-3">
                  <Badge variant="outline" className="border-primary/45 text-primary">
                    <Sparkles className="mr-2 h-3.5 w-3.5" /> Concierge content intelligence
                  </Badge>
                  <h2 className="text-2xl font-semibold">Executive brief</h2>
                  <p className="text-sm text-muted-foreground md:max-w-2xl">{courseIntel.executiveSummary}</p>
                </div>
                <div className="rounded-2xl border border-primary/30 bg-primary/10 px-4 py-3 text-right">
                  <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-primary">
                    <Gauge className="h-3.5 w-3.5" /> Signal score
                  </span>
                  <div className="mt-2 text-4xl font-semibold text-primary">{courseIntel.signalScore}</div>
                  <p className="text-xs text-muted-foreground">{courseIntel.signalLabel}</p>
                </div>
              </div>

              <div className="rounded-2xl border border-border/40 bg-card/60 p-5">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                      <Target className="h-4 w-4 text-primary" /> {courseIntel.spotlightMetric.label}
                    </span>
                    <p className="mt-2 text-sm text-muted-foreground md:max-w-xl">{courseIntel.signalNarrative}</p>
                  </div>
                  <p className="text-xs text-muted-foreground md:max-w-xs">{courseIntel.spotlightMetric.description}</p>
                </div>
                {courseIntel.signatureMoments.length > 0 ? (
                  <>
                    <Separator className="my-4" />
                    <ul className="grid gap-2 text-sm text-muted-foreground">
                      {courseIntel.signatureMoments.map((moment, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                          <span>{moment}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : null}
              </div>

              <div className="rounded-2xl border border-border/40 bg-card/60 p-5">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  <Bot className="h-4 w-4 text-primary" /> Concierge prompt
                </div>
                <p className="mt-3 rounded-2xl border border-dashed border-primary/30 bg-background/60 p-4 text-sm leading-relaxed text-muted-foreground">
                  {courseIntel.aiConciergePrompt}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass-panel border border-border/40 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Recommended follow-ups</h3>
                  <p className="text-sm text-muted-foreground">Strategic pairings curated for your concierge journey.</p>
                </div>
                <span className="text-xs text-muted-foreground">{courseIntel.followUps.length} picks</span>
              </div>
              <div className="mt-4 space-y-3">
                {courseIntel.followUps.map((followUp) => (
                  <Link
                    key={followUp.courseId}
                    to={`/course/${followUp.courseId}`}
                    className="group flex flex-col gap-2 rounded-2xl border border-border/40 bg-background/60 p-4 transition hover:border-primary/40 hover:bg-muted/40"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-sm font-semibold text-foreground">{followUp.title}</div>
                      <Badge variant={followUp.status === "completed" ? "secondary" : "outline"} className="uppercase tracking-[0.3em]">
                        {followUp.status === "completed" ? "Completed" : "Available"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{followUp.difficulty}</span>
                      <span>{followUp.duration}</span>
                    </div>
                    <p className="text-sm text-muted-foreground/90">{followUp.reason}</p>
                    <span className="inline-flex items-center gap-1 text-xs text-primary">
                      Continue journey
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="glass-panel border border-border/40 p-6">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                <ClipboardList className="h-4 w-4 text-primary" /> Assessment cadence
              </div>
              <h3 className="mt-3 text-lg font-semibold">{courseIntel.assessmentPlan.cadence}</h3>
              <p className="text-sm text-muted-foreground">{courseIntel.assessmentPlan.successMetric}</p>
              <Separator className="my-4" />
              <ul className="space-y-3 text-sm text-muted-foreground">
                {courseIntel.assessmentPlan.rituals.map((ritual, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                    <span>{ritual}</span>
                  </li>
                ))}
              </ul>
              {courseIntel.assessmentPlan.items.length > 0 ? (
                <div className="mt-4 rounded-2xl border border-dashed border-border/40 bg-background/60 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Course assets</p>
                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                    {courseIntel.assessmentPlan.items.map((item) => (
                      <li key={item.id} className="leading-relaxed">
                        <span className="font-medium text-foreground">{item.title}</span>
                        <span className="ml-2 text-xs uppercase tracking-[0.3em] text-primary">{item.type}</span>
                        <p className="text-xs text-muted-foreground/90">{item.description}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>

            {courseIntel.conciergeArtifacts.length > 0 ? (
              <div className="glass-panel border border-border/40 p-6">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  <FileText className="h-4 w-4 text-primary" /> Concierge artefacts
                </div>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {courseIntel.conciergeArtifacts.map((artifact, index) => (
                    <li key={index} className="leading-relaxed">• {artifact}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </section>

        <div className="mt-10 space-y-6">
          <div className="glass-panel border border-border/40 p-6">
            <h2 className="text-2xl font-bold">Course Curriculum</h2>
            <p className="text-sm text-muted-foreground">Expand each module to jump directly into the lessons.</p>
          </div>

          <div className="glass-panel border border-border/40 p-6" style={{ animationDelay: "200ms" }}>
            <Accordion type="single" collapsible className="space-y-4">
              {course.modules.map((module, moduleIndex) => (
                <AccordionItem
                  key={module.id}
                  value={module.id}
                  className="overflow-hidden rounded-2xl border border-border/40 bg-background/60 backdrop-blur-xl"
                >
                  <AccordionTrigger className="px-4 py-3 text-left hover:no-underline hover:bg-muted/40">
                    <div className="flex flex-col gap-1 text-left md:flex-row md:items-center md:gap-3">
                      <span className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
                        Module {moduleIndex + 1}
                      </span>
                      <span className="text-lg font-semibold text-foreground">{module.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    {module.sections.map((section) => (
                      <div key={section.id} className="mt-4 rounded-2xl border border-border/40 bg-card/60 p-4">
                        <h4 className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                          {section.title}
                        </h4>
                        <div className="space-y-2">
                          {section.lessons.map((lesson) => (
                            <Link
                              key={lesson.id}
                              to={`/course/${course.id}/lesson/${lesson.id}`}
                              className="group flex items-center justify-between rounded-xl border border-transparent bg-background/40 px-3 py-2 text-sm transition-colors hover:border-primary/40 hover:bg-muted/40"
                            >
                              <div className="flex items-center gap-3">
                                <PlayCircle className="h-4 w-4 text-primary transition-colors group-hover:text-primary-glow" />
                                <span>{lesson.title}</span>
                              </div>
                              {lesson.videoDuration ? (
                                <span className="text-xs text-muted-foreground">{lesson.videoDuration}</span>
                              ) : null}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseDetail;
