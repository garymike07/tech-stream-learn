import { Link, useParams } from "react-router-dom";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { categories, courses } from "@/data/courses";
import { Clock, BarChart } from "lucide-react";

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
      
      <main className="container mx-auto px-4 py-12">
        <div className="mb-12 animate-fade-in rounded-3xl border border-border/40 bg-card/40 p-8 backdrop-blur-2xl shadow-glow">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-6xl">{category.icon}</span>
            <div>
              <h1 className="text-4xl font-bold">
                {category.name}
              </h1>
              <p className="text-lg text-muted-foreground mt-2">
                {category.description}
              </p>
            </div>
          </div>
        </div>

        {categoryCourses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No courses available yet in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {categoryCourses.map((course, index) => (
              <Link
                key={course.id}
                to={`/course/${course.id}`}
                className="group animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card className="h-full border border-border/40 bg-card/40 backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-glow">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-2xl transition-colors group-hover:text-primary">
                        {course.title}
                      </CardTitle>
                      <Badge className={difficultyColors[course.difficulty]}>
                        {course.difficulty}
                      </Badge>
                    </div>
                    <CardDescription className="text-base">
                      {course.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BarChart className="h-4 w-4" />
                        <span>{course.modules.length} modules</span>
                      </div>
                    </div>
                    
                    {course.prerequisites && course.prerequisites.length > 0 && (
                      <div className="mt-4">
                        <p className="text-xs font-medium text-muted-foreground mb-2">Prerequisites:</p>
                        <div className="flex flex-wrap gap-2">
                          {course.prerequisites.map((prereq, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {prereq}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default CategoryCourses;
