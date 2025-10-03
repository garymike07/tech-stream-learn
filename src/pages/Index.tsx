import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { categories } from "@/data/courses";
import { ArrowRight, BookOpen, Users, Award } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0">
          <div className="h-full w-full bg-gradient-hero opacity-80 blur-[120px]" />
        </div>
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-3xl animate-fade-in rounded-3xl border border-border/40 bg-card/40 p-10 backdrop-blur-2xl shadow-glow">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Build Future-Proof Skills with Mike Learning Centre
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Comprehensive tracks across frontend, backend, cloud, data science, and more. Learn at your own pace with curated video tutorials and detailed curriculum outlines.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/categories">
                <Button size="lg" variant="secondary" className="group shadow-glow">
                  Explore Courses
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-24 right-16 h-72 w-72 rounded-full bg-primary/30 blur-3xl opacity-60 animate-float"></div>
        <div className="absolute bottom-10 left-10 h-96 w-96 rounded-full bg-secondary/25 blur-3xl opacity-70 animate-float" style={{ animationDelay: "1s" }}></div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Mike Learning Centre?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to succeed in your technology learning journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border border-border/40 bg-card/50 backdrop-blur-xl shadow-lg animate-fade-in" style={{ animationDelay: "100ms" }}>
              <CardHeader>
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <BookOpen className="h-7 w-7" />
                </div>
                <CardTitle>Structured Curriculum</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Follow comprehensive course outlines designed by experts to take you from beginner to advanced.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border border-border/40 bg-card/50 backdrop-blur-xl shadow-lg animate-fade-in" style={{ animationDelay: "200ms" }}>
              <CardHeader>
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Users className="h-7 w-7" />
                </div>
                <CardTitle>Quality Content</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Learn from curated YouTube tutorials selected for clarity, depth, and teaching quality.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border border-border/40 bg-card/50 backdrop-blur-xl shadow-lg animate-fade-in" style={{ animationDelay: "300ms" }}>
              <CardHeader>
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Award className="h-7 w-7" />
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

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            {categories.slice(0, 6).map((category, index) => (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="group animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card className="h-full border border-border/40 bg-card/40 backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-glow">
                  <CardHeader>
                    <div className="mb-4 text-4xl group-hover:animate-float">{category.icon}</div>
                    <CardTitle className="text-xl mb-2 transition-colors group-hover:text-primary">
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
              <Button variant="outline" size="lg" className="group border-border/40 bg-card/40 backdrop-blur-lg">
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
          <div className="rounded-3xl border border-border/40 bg-card/40 p-8 text-center backdrop-blur-2xl shadow-glow animate-fade-in md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Learning?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of learners mastering technology skills with Mike Learning Centre. Start your journey today with our comprehensive courses.
            </p>
            <Link to="/categories">
              <Button size="lg" variant="secondary" className="shadow-glow">
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
