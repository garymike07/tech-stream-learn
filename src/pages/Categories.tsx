import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { categories } from "@/data/courses";
import { ArrowRight } from "lucide-react";

const Categories = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="mb-12 animate-fade-in rounded-3xl border border-border/40 bg-card/40 p-8 backdrop-blur-2xl shadow-glow">
          <h1 className="text-4xl font-bold mb-4">
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
              className="group animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Card className="h-full border border-border/40 bg-card/40 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-glow">
                <CardHeader>
                  <div className="text-4xl mb-4 group-hover:animate-float">{category.icon}</div>
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
