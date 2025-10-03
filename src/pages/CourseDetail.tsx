import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import { courses } from "@/data/courses";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Clock, BarChart, PlayCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const CourseDetail = () => {
  const { courseId } = useParams();
  const course = courses.find((c) => c.id === courseId);

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
    Beginner: "bg-green-500/10 text-green-600 border-green-500/20",
    Intermediate: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
    Advanced: "bg-red-500/10 text-red-600 border-red-500/20",
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <Link to={`/category/${course.category}`}>
          <Button variant="ghost" className="mb-6 group">
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to courses
          </Button>
        </Link>

        <div className="mb-8 animate-slide-up">
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent">
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

        <div className="bg-gradient-card rounded-lg p-6 shadow-md animate-slide-up" style={{ animationDelay: "200ms" }}>
          <h2 className="text-2xl font-bold mb-6">Course Curriculum</h2>
          
          <Accordion type="single" collapsible className="space-y-4">
            {course.modules.map((module, moduleIndex) => (
              <AccordionItem key={module.id} value={module.id} className="border rounded-lg bg-background">
                <AccordionTrigger className="px-4 hover:no-underline hover:bg-muted/50 rounded-t-lg">
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
                          <div
                            key={lesson.id}
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
                          </div>
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
