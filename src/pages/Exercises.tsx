import Header from "@/components/Header";
import CodePlayground from "@/components/CodePlayground";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { courseExercises } from "@/data/exercises";
import { categories, courses } from "@/data/courses";
import { cn } from "@/lib/utils";
import { ArrowRight, Sparkles } from "lucide-react";

const playgrounds: Record<
  string,
  {
    title: string;
    description: string;
    embedUrl: string;
    docsUrl?: string;
  }
> = {
  "react-fundamentals": {
    title: "React Sandbox",
    description: "Experiment with components, hooks, and state transitions in a live React environment.",
    embedUrl: "https://stackblitz.com/edit/stackblitz-starters-react?file=src%2FApp.tsx&embed=1&hideExplorer=1&ctl=1",
    docsUrl: "https://react.dev/learn",
  },
  "nodejs-backend": {
    title: "Node.js Playground",
    description: "Prototype Express middleware, utilities, and integration tests inside a Node runtime.",
    embedUrl: "https://stackblitz.com/edit/stackblitz-starters-node?file=index.js&embed=1&hideExplorer=1&ctl=1",
    docsUrl: "https://nodejs.org/en/docs",
  },
  "python-backend": {
    title: "Python Backend Lab",
    description: "Draft FastAPI endpoints, Celery tasks, or Django snippets with instant execution.",
    embedUrl: "https://stackblitz.com/edit/stackblitz-starters-python?file=main.py&embed=1&hideExplorer=1&ctl=1",
    docsUrl: "https://docs.python.org/3/",
  },
  "aws-cloud": {
    title: "Terraform on AWS",
    description: "Codify VPCs, Lambda functions, and IAM policies using Terraform starter templates.",
    embedUrl: "https://stackblitz.com/edit/stackblitz-starters-terraform?file=main.tf&embed=1&hideExplorer=1&ctl=1",
    docsUrl: "https://developer.hashicorp.com/terraform/docs",
  },
  "kubernetes-for-developers": {
    title: "Kubernetes YAML Studio",
    description: "Compose Deployments, Services, and Ingress manifests with schema-aware hints.",
    embedUrl: "https://stackblitz.com/edit/stackblitz-starters-yaml?file=deployment.yaml&embed=1&hideExplorer=1&ctl=1",
    docsUrl: "https://kubernetes.io/docs/",
  },
  "python-data-science": {
    title: "Data Science Notebook",
    description: "Prototype pandas transformations and Matplotlib charts with live Python execution.",
    embedUrl: "https://stackblitz.com/edit/stackblitz-starters-python?file=notebook.py&embed=1&hideExplorer=1&ctl=1",
    docsUrl: "https://pandas.pydata.org/docs/",
  },
  "machine-learning": {
    title: "scikit-learn Bench",
    description: "Train and evaluate classical ML models directly in the browser.",
    embedUrl: "https://stackblitz.com/edit/stackblitz-starters-python?file=ml_playground.py&embed=1&hideExplorer=1&ctl=1",
    docsUrl: "https://scikit-learn.org/stable/",
  },
  "postgresql": {
    title: "SQL Editor",
    description: "Sketch SQL schemas, joins, and window functions with instant feedback.",
    embedUrl: "https://stackblitz.com/edit/stackblitz-starters-sql?file=queries.sql&embed=1&hideExplorer=1&ctl=1",
    docsUrl: "https://www.postgresql.org/docs/",
  },
  "mongodb": {
    title: "Mongo Playground",
    description: "Design document structures and aggregation pipelines with runnable examples.",
    embedUrl: "https://stackblitz.com/edit/stackblitz-starters-node?file=mongodb.js&embed=1&hideExplorer=1&ctl=1",
    docsUrl: "https://www.mongodb.com/docs/",
  },
  "restful-apis": {
    title: "REST Client",
    description: "Prototype REST requests, contract examples, and OpenAPI snippets.",
    embedUrl: "https://stackblitz.com/edit/stackblitz-starters-node?file=rest-client.http&embed=1&hideExplorer=1&ctl=1",
    docsUrl: "https://restfulapi.net/",
  },
  "building-apis-fastapi": {
    title: "FastAPI Sandbox",
    description: "Experiment with Pydantic models, async endpoints, and background tasks.",
    embedUrl: "https://stackblitz.com/edit/stackblitz-starters-python?file=fastapi_app.py&embed=1&hideExplorer=1&ctl=1",
    docsUrl: "https://fastapi.tiangolo.com/",
  },
  "nextjs-app-router": {
    title: "Next.js App Router",
    description: "Prototype server components, layouts, and server actions inside the App Router.",
    embedUrl: "https://stackblitz.com/edit/stackblitz-starters-nextjs?file=app%2Fpage.tsx&embed=1&hideExplorer=1&ctl=1",
    docsUrl: "https://nextjs.org/docs/app",
  },
  "vue-pro-engineer": {
    title: "Vue Composition Lab",
    description: "Test reactive state, composables, and router flows with live Vue updates.",
    embedUrl: "https://stackblitz.com/edit/stackblitz-starters-vue?file=src%2FApp.vue&embed=1&hideExplorer=1&ctl=1",
    docsUrl: "https://vuejs.org/guide/introduction.html",
  },
  "sveltekit-essentials": {
    title: "SvelteKit Workspace",
    description: "Build Svelte components, load functions, and actions with hot reload.",
    embedUrl: "https://stackblitz.com/edit/stackblitz-starters-svelte?file=src%2Froutes%2F+page.svelte&embed=1&hideExplorer=1&ctl=1",
    docsUrl: "https://kit.svelte.dev/docs/introduction",
  },
  "go-backend-blueprints": {
    title: "Go Playground",
    description: "Run Go routines, handlers, and unit tests using the Go starter template.",
    embedUrl: "https://stackblitz.com/edit/stackblitz-starters-go?file=main.go&embed=1&hideExplorer=1&ctl=1",
    docsUrl: "https://go.dev/doc/",
  },
  "spring-boot-microservices": {
    title: "Spring Boot Kata",
    description: "Draft controllers, services, and configuration classes in a Java workspace.",
    embedUrl: "https://stackblitz.com/edit/stackblitz-starters-java?file=src%2FApp.java&embed=1&hideExplorer=1&ctl=1",
    docsUrl: "https://spring.io/projects/spring-boot",
  },
  "azure-cloud-accelerator": {
    title: "Bicep & ARM Studio",
    description: "Author Azure Bicep templates and ARM snippets for landing zones and policies.",
    embedUrl: "https://stackblitz.com/edit/stackblitz-starters-bicep?file=main.bicep&embed=1&hideExplorer=1&ctl=1",
    docsUrl: "https://learn.microsoft.com/azure/azure-resource-manager/bicep/",
  },
  "gcp-cloud-engineer": {
    title: "GCP IaC Workspace",
    description: "Compose Google Cloud resources using Terraform starter modules.",
    embedUrl: "https://stackblitz.com/edit/stackblitz-starters-terraform?file=gcp.tf&embed=1&hideExplorer=1&ctl=1",
    docsUrl: "https://cloud.google.com/docs",
  },
  "deep-learning-tensorflow": {
    title: "TensorFlow Notebook",
    description: "Prototype TensorFlow models, callbacks, and visualizations in one place.",
    embedUrl: "https://stackblitz.com/edit/stackblitz-starters-python?file=tensorflow_lab.py&embed=1&hideExplorer=1&ctl=1",
    docsUrl: "https://www.tensorflow.org/learn",
  },
  "nlp-python-roadmap": {
    title: "NLP Lab",
    description: "Experiment with tokenization, vectorization, and transformer pipelines.",
    embedUrl: "https://stackblitz.com/edit/stackblitz-starters-python?file=nlp_lab.py&embed=1&hideExplorer=1&ctl=1",
    docsUrl: "https://huggingface.co/docs",
  },
  "redis-performance": {
    title: "Redis Sandbox",
    description: "Prototype caching strategies and Lua scripts using a Redis-enabled starter.",
    embedUrl: "https://stackblitz.com/edit/stackblitz-starters-node?file=redis.js&embed=1&hideExplorer=1&ctl=1",
    docsUrl: "https://redis.io/docs/",
  },
  "mysql-masterclass": {
    title: "MySQL Workbench",
    description: "Draft SQL queries, stored procedures, and schema migrations.",
    embedUrl: "https://stackblitz.com/edit/stackblitz-starters-sql?file=mysql_playground.sql&embed=1&hideExplorer=1&ctl=1",
    docsUrl: "https://dev.mysql.com/doc/",
  },
  "graphql-apollo-server": {
    title: "GraphQL Sandbox",
    description: "Design schemas, execute operations, and inspect responses immediately.",
    embedUrl: "https://stackblitz.com/edit/stackblitz-starters-node?file=graphql-server.ts&embed=1&hideExplorer=1&ctl=1",
    docsUrl: "https://graphql.org/learn/",
  },
  "grpc-microservices": {
    title: "gRPC Studio",
    description: "Author protobuf files and gRPC handlers using polyglot starter templates.",
    embedUrl: "https://stackblitz.com/edit/stackblitz-starters-node?file=service.proto&embed=1&hideExplorer=1&ctl=1",
    docsUrl: "https://grpc.io/docs/",
  },
};

const Exercises = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="relative">
        <section className="relative overflow-hidden py-20 md:py-28">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 blur-3xl" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background/95 to-transparent" />
          <div className="container relative z-10 mx-auto px-4">
            <Card className="max-w-5xl border border-border/40 bg-card/50 backdrop-blur-2xl shadow-glow animate-fade-in">
              <CardHeader className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                  <Sparkles className="h-3.5 w-3.5" />
                  Practice Hub
                </div>
                <CardTitle className="text-3xl md:text-4xl font-bold">
                  Exercises & Interactive Code Playgrounds
                </CardTitle>
                <CardDescription className="text-base md:text-lg">
                  Every learning path now includes curated exercises, implementation checklists, and a live playground so you can iterate on ideas without leaving Mike Learning Centre.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="secondary" className="bg-primary/15 text-primary">
                    Guided practice
                  </Badge>
                  <Badge variant="secondary" className="bg-secondary/15 text-secondary-foreground">
                    Real-world scenarios
                  </Badge>
                  <Badge variant="secondary" className="bg-muted/40 text-muted-foreground">
                    Live sandbox access
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <div className="container mx-auto space-y-20 px-4 pb-24">
          {categories.map((category) => {
            const categoryCourses = courses.filter((course) => course.category === category.id);

            if (categoryCourses.length === 0) return null;

            return (
              <section key={category.id} className="space-y-10">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                  <div>
                    <h2 className="text-3xl font-semibold md:text-4xl">
                      {category.icon} {category.name}
                    </h2>
                    <p className="text-muted-foreground md:text-lg">{category.description}</p>
                  </div>
                  <Button asChild variant="outline" className="border-border/40 bg-card/40 backdrop-blur-lg">
                    <a href={`#category-${category.id}`}>Jump to {category.name}</a>
                  </Button>
                </div>

                <div id={`category-${category.id}`} className="grid gap-8 lg:grid-cols-2">
                  {categoryCourses.map((course) => {
                    const exercises = courseExercises[course.id] ?? [];
                    const playground = playgrounds[course.id];

                    return (
                      <Card
                        key={course.id}
                        className={cn(
                          "relative flex h-full flex-col border border-border/40 bg-card/40 backdrop-blur-xl shadow-glow animate-fade-in",
                          "hover:border-primary/50 transition-colors"
                        )}
                      >
                        <CardHeader className="space-y-3">
                          <CardTitle className="text-2xl font-bold">{course.title}</CardTitle>
                          <CardDescription>{course.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          {playground ? (
                            <CodePlayground
                              title={playground.title}
                              description={playground.description}
                              embedUrl={playground.embedUrl}
                              docsUrl={playground.docsUrl}
                            />
                          ) : null}

                          <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Guided Exercises</h3>
                            <Accordion type="single" collapsible className="space-y-2">
                              {exercises.map((exercise) => (
                                <AccordionItem key={exercise.id} value={exercise.id} className="overflow-hidden rounded-xl border border-border/30 bg-background/60">
                                  <AccordionTrigger className="px-4 py-3 text-left text-sm font-medium">
                                    <span className="inline-flex items-center gap-2">
                                      <Badge variant="outline" className="border-primary/40 text-primary">
                                        {exercise.level}
                                      </Badge>
                                      {exercise.title}
                                    </span>
                                  </AccordionTrigger>
                                  <AccordionContent className="space-y-4 px-4 pb-4 text-sm text-muted-foreground">
                                    <p>{exercise.overview}</p>
                                    <div>
                                      <p className="mb-2 font-medium text-foreground">Tasks</p>
                                      <ul className="list-disc space-y-2 pl-5">
                                        {exercise.tasks.map((task, index) => (
                                          <li key={index}>{task}</li>
                                        ))}
                                      </ul>
                                    </div>
                                    {exercise.resources.length > 0 ? (
                                      <div>
                                        <p className="mb-2 font-medium text-foreground">Suggested resources</p>
                                        <ul className="list-disc space-y-1 pl-5">
                                          {exercise.resources.map((resource) => (
                                            <li key={resource.url}>
                                              <a
                                                className="text-primary underline-offset-2 hover:underline"
                                                href={resource.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                              >
                                                {resource.label}
                                              </a>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    ) : null}
                                  </AccordionContent>
                                </AccordionItem>
                              ))}
                            </Accordion>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Exercises;
