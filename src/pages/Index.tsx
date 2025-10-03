import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { categories } from "@/data/courses";
import { ArrowRight, BookOpen, Users, Award } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl animate-slide-up">
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
              Master Technology Skills with Structured Learning
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8">
              Comprehensive courses across frontend, backend, cloud, data science, and more. 
              Learn at your own pace with curated video tutorials and detailed curriculum outlines.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/categories">
                <Button size="lg" variant="secondary" className="group shadow-lg">
                  Explore Courses
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary-glow rounded-full blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-secondary rounded-full blur-3xl opacity-20 animate-float" style={{ animationDelay: "1s" }}></div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose TechLearn?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to succeed in your technology learning journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center bg-gradient-card shadow-md border-border animate-slide-up" style={{ animationDelay: "100ms" }}>
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-gradient-hero rounded-full w-fit">
                  <BookOpen className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle>Structured Curriculum</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Follow comprehensive course outlines designed by experts to take you from beginner to advanced.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center bg-gradient-card shadow-md border-border animate-slide-up" style={{ animationDelay: "200ms" }}>
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-gradient-hero rounded-full w-fit">
                  <Users className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle>Quality Content</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Learn from curated YouTube tutorials selected for clarity, depth, and teaching quality.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center bg-gradient-card shadow-md border-border animate-slide-up" style={{ animationDelay: "300ms" }}>
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-gradient-hero rounded-full w-fit">
                  <Award className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle>Self-Paced Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Learn on your schedule with lifetime access to all course materials and updates.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
              Explore Learning Categories
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From web development to data science, we cover all major technology domains
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {categories.slice(0, 6).map((category, index) => (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="group animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card className="h-full transition-all duration-300 hover:shadow-lg hover:scale-105 border-border bg-gradient-card">
                  <CardHeader>
                    <div className="text-5xl mb-4 group-hover:animate-float">{category.icon}</div>
                    <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                      {category.name}
                    </CardTitle>
                    <CardDescription>{category.description}</CardDescription>
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

          <div className="text-center">
            <Link to="/categories">
              <Button variant="outline" size="lg" className="group">
                View All Categories
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-hero rounded-2xl p-8 md:p-12 text-center shadow-glow animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Start Learning?
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Join thousands of learners mastering technology skills. Start your journey today with our comprehensive courses.
            </p>
            <Link to="/categories">
              <Button size="lg" variant="secondary" className="shadow-lg">
                Browse All Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
