import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { categories } from "@/data/courses";
import { ArrowRight, BookOpen, Users, Award, Code2 } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      {/* Hero Section */}
      <section
        className="relative overflow-hidden py-20 md:py-32 bg-center bg-cover"
        style={{ backgroundImage: "linear-gradient(120deg, rgba(10, 13, 35, 0.72), rgba(13, 19, 42, 0.82)), url('/mike-hero.png')" }}
      >
        <div className="absolute inset-0 bg-code-rain opacity-80" />
        <div className="absolute -top-10 right-10 h-80 w-80 rounded-full bg-primary/30 blur-3xl opacity-60 animate-diagonal-drift" />
        <div className="absolute bottom-[-6rem] left-[-4rem] h-[28rem] w-[28rem] rounded-full bg-secondary/25 blur-3xl opacity-70 animate-float-tilt" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background/90 to-transparent" />

        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-4xl animate-fade-in rounded-3xl border border-border/40 bg-card/50 p-10 backdrop-blur-2xl shadow-glow animate-glow-pulse">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-primary">
              <Code2 className="h-3.5 w-3.5" />
              Accelerate your craft
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Build Future-Proof Skills with Mike Learning Centre
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Comprehensive tracks across frontend, backend, cloud, data science, and more. Learn at your own pace with curated video tutorials, detailed curriculum outlines, and our dynamic exercise centre packed with step-by-step practice briefs. Start free with three full courses—upgrade for unlimited mastery when you&apos;re ready.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/categories">
                <Button size="lg" variant="secondary" className="group shadow-glow">
                  Explore Courses
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/exercises">
                <Button size="lg" variant="outline" className="group border-border/50 bg-card/60 backdrop-blur-lg">
                  Explore Exercise Centre
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/subscribe">
                <Button size="lg" variant="ghost" className="group border border-border/40 bg-card/50 backdrop-blur-lg text-primary hover:text-primary">
                  View Pricing
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
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
            <Card className="text-center border border-border/40 bg-card/50 backdrop-blur-xl shadow-lg animate-fade-in animate-glow-pulse" style={{ animationDelay: "100ms" }}>
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

            <Card className="text-center border border-border/40 bg-card/50 backdrop-blur-xl shadow-lg animate-fade-in animate-glow-pulse" style={{ animationDelay: "200ms" }}>
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

            <Card className="text-center border border-border/40 bg-card/50 backdrop-blur-xl shadow-lg animate-fade-in animate-glow-pulse" style={{ animationDelay: "300ms" }}>
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

      {/* Plans Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
              Flexible access
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold">Choose how you learn</h2>
            <p className="mt-2 text-lg text-muted-foreground">Master three courses for free. Upgrade anytime for unlimited access and premium exercises.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border border-border/40 bg-card/40 backdrop-blur-xl shadow-glow">
              <CardHeader>
                <CardTitle>Free • 0 KES</CardTitle>
                <CardDescription>Kickstart your journey with generous limits.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✅ Full access to 3 complete courses</li>
                  <li>✅ Dynamic exercise centre previews</li>
                  <li>✅ Progress tracking on every lesson</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border border-primary/40 bg-primary/10 backdrop-blur-xl shadow-glow">
              <CardHeader>
                <CardTitle className="text-primary">Premium • 500 KES / month</CardTitle>
                <CardDescription className="text-primary/80">Unlimited learning, advanced exercises, and upcoming perks.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm text-primary/80">
                  <li>✨ Unlimited courses & exercise walkthroughs</li>
                  <li>✨ Early access to new tracks & badges</li>
                  <li>✨ Priority roadmap influence</li>
                </ul>
                <Button asChild variant="secondary" disabled className="w-full shadow-glow">
                  <span>M-Pesa checkout launching soon</span>
                </Button>
                <p className="text-xs text-primary/70">Secure M-Pesa STK push payments are on the way. We&apos;ll notify you before launch.</p>
              </CardContent>
            </Card>
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
            <div className="mt-4 flex justify-center">
              <Link to="/subscribe" className="text-sm text-primary underline-offset-4 hover:underline">
                Unlock unlimited access for KES 500/month • M-Pesa coming soon
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
