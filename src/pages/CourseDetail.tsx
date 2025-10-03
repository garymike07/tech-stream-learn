import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { courses } from "@/data/courses";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Clock, BarChart, PlayCircle, ArrowLeft, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useMemo, useState } from "react";

const COURSE_COMPLETIONS_KEY = "mlc-course-completions";

const loadCompletionSet = () => {
  try {
    const raw = localStorage.getItem(COURSE_COMPLETIONS_KEY);
    if (!raw) return new Set<string>();
    return new Set(JSON.parse(raw) as string[]);
  } catch (error) {
    console.error("Failed to load completions", error);
    return new Set<string>();
  }
};
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, enrollCourse, enrollments } = useAuth();
  const [completedCourses] = useState<Set<string>>(() => loadCompletionSet());
  const course = useMemo(() => courses.find((c) => c.id === courseId), [courseId]);

  if (!course) {
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
  };

  const firstLesson = course.modules[0]?.sections[0]?.lessons[0];
  const isEnrolled = courseId ? enrollments.includes(courseId) : false;
  const isCourseCompleted = courseId ? completedCourses.has(courseId) : false;

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
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <Link to={`/category/${course.category}`}>
            <Button variant="ghost" className="group">
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to courses
            </Button>
          </Link>

          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Button onClick={handleEnroll} className="shadow-glow">
              {isEnrolled ? "Continue learning" : "Enroll & start course"}
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate(`/exercises?course=${course.id}`)}
              className="border-primary/40 text-primary hover:text-primary"
            >
              Visit exercise centre
            </Button>
            {!user && (
              <p className="text-xs text-muted-foreground">Enrollment requires a free account.</p>
            )}
            {isCourseCompleted ? (
              <Badge variant="secondary" className="bg-emerald-500/15 text-emerald-200">
                <Award className="mr-1 h-3.5 w-3.5" /> Course completed
              </Badge>
            ) : null}
          </div>
        </div>

        <div className="mb-8 animate-fade-in rounded-3xl border border-border/40 bg-card/40 p-8 backdrop-blur-2xl shadow-glow">
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-4xl font-bold">
              {course.title}
            </h1>
            <Badge className={difficultyColors[course.difficulty]}>
              {course.difficulty}
            </Badge>
          </div>
          
          <p className="text-lg text-muted-foreground mb-6">
            {course.description}
          </p>

          <div className="flex items-center gap-6 mb-6">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-5 w-5" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <BarChart className="h-5 w-5" />
              <span>{course.modules.length} modules</span>
            </div>
          </div>

          {course.prerequisites && course.prerequisites.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-2">Prerequisites:</p>
              <div className="flex flex-wrap gap-2">
                {course.prerequisites.map((prereq, i) => (
                  <Badge key={i} variant="outline">
                    {prereq}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="animate-fade-in rounded-3xl border border-border/40 bg-card/40 p-6 backdrop-blur-2xl shadow-glow" style={{ animationDelay: "200ms" }}>
          <h2 className="text-2xl font-bold mb-6">Course Curriculum</h2>

          <Accordion type="single" collapsible className="space-y-4">
            {course.modules.map((module, moduleIndex) => (
              <AccordionItem key={module.id} value={module.id} className="overflow-hidden rounded-2xl border border-border/40 bg-background/60 backdrop-blur-xl">
                <AccordionTrigger className="px-4 py-3 text-left hover:no-underline hover:bg-muted/40">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-semibold text-primary">
                      Module {moduleIndex + 1}
                    </span>
                    <span className="text-lg font-semibold">{module.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  {module.sections.map((section) => (
                    <div key={section.id} className="mt-4">
                      <h4 className="font-semibold text-md mb-3 text-foreground">
                        {section.title}
                      </h4>
                      <div className="space-y-2 ml-4">
                        {section.lessons.map((lesson) => (
                          <Link
                            key={lesson.id}
                            to={`/course/${course.id}/lesson/${lesson.id}`}
                            className="flex items-center justify-between p-3 rounded-md hover:bg-muted/50 transition-colors group cursor-pointer"
                          >
                            <div className="flex items-center gap-3">
                              <PlayCircle className="h-4 w-4 text-primary group-hover:text-primary-glow transition-colors" />
                              <span className="text-sm">{lesson.title}</span>
                            </div>
                            {lesson.videoDuration && (
                              <span className="text-xs text-muted-foreground">
                                {lesson.videoDuration}
                              </span>
                            )}
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
      </main>
    </div>
  );
};

export default CourseDetail;
