import { Link, useParams } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { categories, courses } from "@/data/courses";
import { Clock, BarChart, ArrowLeft, Sparkles, Target } from "lucide-react";

const CategoryCourses = () => {
  const { categoryId } = useParams();
  const category = categories.find((c) => c.id === categoryId);
  const categoryCourses = courses.filter((c) => c.category === categoryId);

  if (!category) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold">Category not found</h1>
        </main>
      </div>
    );
  }

  const difficultyColors = {
    Beginner: "border-emerald-400/40 bg-emerald-500/15 text-emerald-100",
    Intermediate: "border-amber-400/40 bg-amber-500/15 text-amber-100",
    Advanced: "border-rose-500/40 bg-rose-500/15 text-rose-100",
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="container mx-auto px-4 py-16">
        <section className="grid gap-8 lg:grid-cols-[2fr,1fr]">
          <div className="glass-panel glass-panel-strong relative overflow-hidden p-10">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/12 via-transparent to-secondary/18 opacity-85" />
            <div className="relative z-10 space-y-6">
              <div className="flex flex-wrap items-center gap-4">
                <Link to="/categories">
                  <Button variant="ghost" size="sm" className="group border border-border/50 text-muted-foreground hover:text-primary">
                    <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    Categories
                  </Button>
                </Link>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 text-3xl text-primary">
                  {category.icon}
                </span>
              </div>
              <div className="space-y-4">
                <h1 className="text-4xl font-bold md:text-5xl">{category.name}</h1>
                <p className="text-lg text-muted-foreground md:max-w-2xl">{category.description}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="border-border/55 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  {category.courseCount} curated {category.courseCount === 1 ? "course" : "courses"}
                </Badge>
                <Badge variant="outline" className="border-border/55 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  Project briefs & assessments
                </Badge>
              </div>
            </div>
          </div>

          <div className="glass-panel relative overflow-hidden border border-border/45 p-6">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/15 opacity-80" />
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold">What you&apos;ll achieve</h2>
              </div>
              <p className="text-sm text-muted-foreground">
                Follow modular outlines, master tools, and deliver practice projects aligned to industry expectations. Each course includes outcomes, assessments, and project briefs.
              </p>
              <div className="rounded-2xl border border-border/45 bg-card/60 p-4 text-sm">
                <div className="flex items-center gap-3 text-primary">
                  <Target className="h-4 w-4" />
                  <span>Suggested next steps</span>
                </div>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-muted-foreground">
                  <li>Enroll in two complementary courses to build breadth.</li>
                  <li>Use project briefs to create portfolio-ready deliverables.</li>
                  <li>Track outcomes and revisit lessons to reinforce learning.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12">
          {categoryCourses.length === 0 ? (
            <div className="glass-panel text-center border border-border/40 p-12">
              <p className="text-lg text-muted-foreground">No courses available yet in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {categoryCourses.map((course, index) => (
                <Link
                  key={course.id}
                  to={`/course/${course.id}`}
                  className="group"
                  style={{ animationDelay: `${index * 90}ms` }}
                >
                  <Card className="group relative h-full overflow-hidden border border-border/40 glass-panel transition-all duration-300 hover:-translate-y-1 hover:border-primary/45 hover:shadow-glow">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-secondary/12 opacity-70 transition-opacity group-hover:opacity-95" />
                    <CardHeader className="relative z-10 space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <CardTitle className="text-2xl transition-colors group-hover:text-primary">
                          {course.title}
                        </CardTitle>
                        <Badge className={difficultyColors[course.difficulty]}>{course.difficulty}</Badge>
                      </div>
                      <CardDescription className="text-base">{course.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="relative z-10 space-y-4">
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {course.duration}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <BarChart className="h-4 w-4" />
                          {course.modules.length} modules
                        </span>
                        {course.projectBriefs && course.projectBriefs.length > 0 ? (
                          <span className="text-xs uppercase tracking-[0.3em] text-primary/80">
                            {course.projectBriefs.length} project brief{course.projectBriefs.length > 1 ? "s" : ""}
                          </span>
                        ) : null}
                      </div>

                      {course.prerequisites && course.prerequisites.length > 0 ? (
                        <div className="space-y-2">
                          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">Prerequisites</p>
                          <div className="flex flex-wrap gap-2">
                            {course.prerequisites.map((prereq, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {prereq}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ) : null}

                      {course.outcomes && course.outcomes.length > 0 ? (
                        <div className="space-y-2">
                          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">Key outcomes</p>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            {course.outcomes.slice(0, 3).map((outcome, i) => (
                              <li key={i} className="leading-snug">
                                • {outcome}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default CategoryCourses;
