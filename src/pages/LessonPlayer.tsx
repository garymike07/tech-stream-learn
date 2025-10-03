import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { courses, Lesson } from "@/data/courses";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, CheckCircle, List } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const LessonPlayer = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [nextLesson, setNextLesson] = useState<{ id: string; title: string } | null>(null);
  const [prevLesson, setPrevLesson] = useState<{ id: string; title: string } | null>(null);

  const course = courses.find((c) => c.id === courseId);

  useEffect(() => {
    if (!course || !lessonId) return;

    // Flatten all lessons to find current, previous, and next
    const allLessons: Array<{ lesson: Lesson; courseId: string }> = [];
    course.modules.forEach((module) => {
      module.sections.forEach((section) => {
        section.lessons.forEach((lesson) => {
          allLessons.push({ lesson, courseId: course.id });
        });
      });
    });

    const currentIndex = allLessons.findIndex((l) => l.lesson.id === lessonId);
    if (currentIndex !== -1) {
      setCurrentLesson(allLessons[currentIndex].lesson);
      
      if (currentIndex > 0) {
        setPrevLesson({
          id: allLessons[currentIndex - 1].lesson.id,
          title: allLessons[currentIndex - 1].lesson.title,
        });
      } else {
        setPrevLesson(null);
      }

      if (currentIndex < allLessons.length - 1) {
        setNextLesson({
          id: allLessons[currentIndex + 1].lesson.id,
          title: allLessons[currentIndex + 1].lesson.title,
        });
      } else {
        setNextLesson(null);
      }
    }
  }, [course, lessonId]);

  if (!course || !currentLesson) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold">Lesson not found</h1>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Link to={`/course/${courseId}`}>
          <Button variant="ghost" className="mb-6 group">
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to course
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video Player Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="animate-slide-up">
              <h1 className="text-3xl font-bold mb-2">{currentLesson.title}</h1>
              {currentLesson.videoDuration && (
                <p className="text-sm text-muted-foreground mb-4">
                  Duration: {currentLesson.videoDuration}
                </p>
              )}
              
              <div className="relative w-full aspect-video bg-muted rounded-lg overflow-hidden shadow-lg">
                {currentLesson.videoUrl ? (
                  <iframe
                    src={currentLesson.videoUrl}
                    title={currentLesson.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-muted-foreground">No video available for this lesson</p>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation Buttons */}
            <Card className="bg-gradient-card animate-slide-up" style={{ animationDelay: "100ms" }}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    {prevLesson && (
                      <Button
                        variant="outline"
                        onClick={() => navigate(`/course/${courseId}/lesson/${prevLesson.id}`)}
                        className="group"
                      >
                        <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        <div className="text-left">
                          <div className="text-xs text-muted-foreground">Previous</div>
                          <div className="text-sm">{prevLesson.title}</div>
                        </div>
                      </Button>
                    )}
                  </div>
                  
                  <Button variant="default" className="mx-4">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark Complete
                  </Button>

                  <div className="flex-1 flex justify-end">
                    {nextLesson && (
                      <Button
                        onClick={() => navigate(`/course/${courseId}/lesson/${nextLesson.id}`)}
                        className="group"
                      >
                        <div className="text-right">
                          <div className="text-xs">Next</div>
                          <div className="text-sm">{nextLesson.title}</div>
                        </div>
                        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Course Curriculum Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-gradient-card sticky top-24 animate-slide-up" style={{ animationDelay: "200ms" }}>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <List className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-bold">Course Content</h2>
                </div>
                
                <Accordion type="single" collapsible className="space-y-2">
                  {course.modules.map((module, moduleIndex) => (
                    <AccordionItem key={module.id} value={module.id} className="border rounded-lg bg-background">
                      <AccordionTrigger className="px-3 py-2 hover:no-underline hover:bg-muted/50 rounded-t-lg text-sm">
                        <span className="font-semibold">Module {moduleIndex + 1}: {module.title}</span>
                      </AccordionTrigger>
                      <AccordionContent className="px-3 pb-2">
                        {module.sections.map((section) => (
                          <div key={section.id} className="mt-2">
                            <p className="text-xs font-medium text-muted-foreground mb-2">{section.title}</p>
                            <div className="space-y-1 ml-2">
                              {section.lessons.map((lesson) => (
                                <button
                                  key={lesson.id}
                                  onClick={() => navigate(`/course/${courseId}/lesson/${lesson.id}`)}
                                  className={`w-full text-left p-2 rounded text-xs transition-colors ${
                                    lesson.id === lessonId
                                      ? "bg-primary text-primary-foreground"
                                      : "hover:bg-muted"
                                  }`}
                                >
                                  {lesson.title}
                                  {lesson.videoDuration && (
                                    <span className="text-xs opacity-75 ml-2">
                                      ({lesson.videoDuration})
                                    </span>
                                  )}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LessonPlayer;
