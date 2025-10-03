import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { categories } from "@/data/courses";
import { ArrowRight } from "lucide-react";

const Categories = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="mb-12 animate-slide-up">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
            Explore Learning Paths
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Choose your technology category and start your learning journey with curated courses and expert tutorials.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="group animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:scale-105 hover:-translate-y-1 border-border bg-gradient-card">
                <CardHeader>
                  <div className="text-5xl mb-4 group-hover:animate-float">{category.icon}</div>
                  <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {category.courseCount} {category.courseCount === 1 ? "course" : "courses"}
                    </span>
                    <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Categories;
