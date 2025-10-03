export interface ExerciseResource {
  label: string;
  url: string;
}

export interface Exercise {
  id: string;
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  overview: string;
  tasks: string[];
  resources: ExerciseResource[];
  estimatedTime: string;
  skills: string[];
}

export const courseExercises: Record<string, Exercise[]> = {
  "react-fundamentals": [
    {
      id: "react-fundamentals-beginner-1",
      title: "Component Playground",
      level: "Beginner",
      overview: "Reinforce JSX and props by composing small, reusable UI pieces into a landing page.",
      tasks: [
        "Build a three-section landing page (hero, features, call-to-action) by composing at least five reusable components.",
        "Pass data to those components entirely through props and render a list using the array `.map` method.",
        "Add a theme toggle button that switches light/dark styles using React state."
      ],
      estimatedTime: "2-3 hours",
      skills: ["JSX composition", "Props", "State management"],
      resources: [
        { label: "React Docs – Describing the UI", url: "https://react.dev/learn/describing-the-ui" },
        { label: "React Docs – Passing Props to a Component", url: "https://react.dev/learn/passing-props-to-a-component" }
      ],
    },
    {
      id: "react-fundamentals-intermediate-1",
      title: "Data Fetching Dashboard",
      level: "Intermediate",
      overview: "Practice hooks and side effects by wiring a dashboard to a public API with loading and error states.",
      tasks: [
        "Use `useEffect` to fetch GitHub repository data based on a username input field.",
        "Render summary cards (stars, forks, open issues) and a history chart using a lightweight charting library or SVG.",
        "Persist the last searched username in `localStorage` so it auto-loads on refresh."
      ],
      estimatedTime: "3-4 hours",
      skills: ["React hooks", "Data fetching", "State persistence"],
      resources: [
        { label: "React Docs – Synchronizing with Effects", url: "https://react.dev/learn/synchronizing-with-effects" },
        { label: "GitHub REST API", url: "https://docs.github.com/en/rest" }
      ],
    },
    {
      id: "react-fundamentals-advanced-1",
      title: "Accessible Forms with React Query",
      level: "Advanced",
      overview: "Combine React Query, forms, and performance profiling while meeting accessibility expectations.",
      tasks: [
        "Build a multi-step signup form that uses `react-hook-form` for validation and `@tanstack/react-query` mutations.",
        "Optimistically update user data and roll back on errors, showing toast notifications for every state transition.",
        "Use the React DevTools Profiler to identify a re-render hotspot and memoize it away. Document the improvement."
      ],
      estimatedTime: "4-6 hours",
      skills: ["Form validation", "React Query", "Performance profiling"],
      resources: [
        { label: "React Query Docs – Mutations", url: "https://tanstack.com/query/latest/docs/framework/react/guides/mutations" },
        { label: "WAI-ARIA Authoring Practices", url: "https://www.w3.org/WAI/ARIA/apg/" }
      ],
    },
  ],
  "nodejs-backend": [
    {
      id: "nodejs-backend-beginner-1",
      title: "Express Starter API",
      level: "Beginner",
      overview: "Solidify Express fundamentals by exposing CRUD endpoints against an in-memory collection.",
      tasks: [
        "Create an Express server with `/api/notes` routes supporting GET, POST, PUT, and DELETE.",
        "Validate incoming payloads with `zod` or `yup` and send descriptive error responses.",
        "Log concise request summaries (method, url, response time) using a custom middleware."
      ],
      estimatedTime: "2-3 hours",
      skills: ["Express routing", "Request validation", "Logging"],
      resources: [
        { label: "Express.js Guide", url: "https://expressjs.com/en/starter/hello-world.html" },
        { label: "Zod Validation", url: "https://zod.dev/" }
      ],
    },
    {
      id: "nodejs-backend-intermediate-1",
      title: "Service Layer Refactor",
      level: "Intermediate",
      overview: "Introduce architectural boundaries, environment configs, and testing to a Node API.",
      tasks: [
        "Split your Express app into router, controller, service, and repository folders with dependency injection.",
        "Integrate dotenv-driven configuration and provide default fallbacks for development vs production.",
        "Write integration tests with Jest or Vitest to cover critical routes, seeding an in-memory datastore before each run."
      ],
      estimatedTime: "4-5 hours",
      skills: ["Architecture refactoring", "Configuration management", "Integration testing"],
      resources: [
        { label: "Node.js Best Practices", url: "https://github.com/goldbergyoni/nodebestpractices" },
        { label: "Jest Docs", url: "https://jestjs.io/docs/getting-started" }
      ],
    },
    {
      id: "nodejs-backend-advanced-1",
      title: "Resilient REST + Queue Worker",
      level: "Advanced",
      overview: "Deliver background processing, graceful shutdowns, and observability for production readiness.",
      tasks: [
        "Add BullMQ or RabbitMQ to offload a heavy PDF-generation task triggered by a REST endpoint.",
        "Implement healthcheck and readiness endpoints that inspect queue health, external APIs, and DB connectivity.",
        "Wire structured logging (Pino) and metrics (Prometheus client) with dashboards for queue throughput and failures."
      ],
      estimatedTime: "5-6 hours",
      skills: ["Background processing", "Health checks", "Observability"],
      resources: [
        { label: "BullMQ Guide", url: "https://docs.bullmq.io/" },
        { label: "Prometheus Node Client", url: "https://github.com/siimon/prom-client" }
      ],
    },
  ],
  "python-backend": [
    {
      id: "python-backend-beginner-1",
      title: "Django Getting Started",
      level: "Beginner",
      overview: "Learn the Django project layout by modeling data and exposing CRUD views.",
      tasks: [
        "Generate a new project and app, create a `Course` model, and register it with the admin site.",
        "Build class-based views (ListView, DetailView, CreateView) and connect them to URLs.",
        "Style the templates with Tailwind or DaisyUI and ensure CSRF tokens exist on forms."
      ],
      estimatedTime: "3-4 hours",
      skills: ["Django ORM", "Class-based views", "Template styling"],
      resources: [
        { label: "Django Tutorial", url: "https://docs.djangoproject.com/en/stable/intro/tutorial01/" },
        { label: "Class-Based Views", url: "https://docs.djangoproject.com/en/stable/ref/class-based-views/" }
      ],
    },
    {
      id: "python-backend-intermediate-1",
      title: "RESTful Django API",
      level: "Intermediate",
      overview: "Introduce Django REST Framework with authentication and filtering.",
      tasks: [
        "Build DRF serializers and viewsets for users and their enrolled courses.",
        "Implement JWT authentication using `djangorestframework-simplejwt` and secure selected endpoints.",
        "Add search and ordering filters for courses plus pagination config documented for API consumers."
      ],
      estimatedTime: "4-5 hours",
      skills: ["Django REST Framework", "Authentication", "API filtering"],
      resources: [
        { label: "DRF Tutorial", url: "https://www.django-rest-framework.org/tutorial/quickstart/" },
        { label: "SimpleJWT", url: "https://django-rest-framework-simplejwt.readthedocs.io/en/latest/" }
      ],
    },
    {
      id: "python-backend-advanced-1",
      title: "Asynchronous Django & Channels",
      level: "Advanced",
      overview: "Blend Django async views with websocket notifications for long-running jobs.",
      tasks: [
        "Convert selected views to async and benchmark throughput vs sync equivalents.",
        "Configure Django Channels with Redis to broadcast course completion events to connected clients.",
        "Record background Celery tasks as they progress and emit structured JSON payloads over the websocket."
      ],
      estimatedTime: "5-6 hours",
      skills: ["Async Django", "WebSockets", "Task orchestration"],
      resources: [
        { label: "Async Django Docs", url: "https://docs.djangoproject.com/en/stable/topics/async/" },
        { label: "Django Channels", url: "https://channels.readthedocs.io/en/stable/" }
      ],
    },
  ],
  "aws-cloud": [
    {
      id: "aws-cloud-beginner-1",
      title: "Cloud Foundations Lab",
      level: "Beginner",
      overview: "Navigate the AWS console by provisioning foundational services safely.",
      tasks: [
        "Create an S3 bucket with versioning and lifecycle rules targeting a Glacier tier.",
        "Launch a t3.micro EC2 instance in a new security group with least-privilege inbound rules.",
        "Document the resources you created, their region, and teardown steps in a runbook."
      ],
      estimatedTime: "2-3 hours",
      skills: ["AWS console", "S3 lifecycle", "Security groups"],
      resources: [
        { label: "AWS Free Tier", url: "https://aws.amazon.com/free/" },
        { label: "Well-Architected Framework", url: "https://aws.amazon.com/architecture/well-architected/" }
      ],
    },
    {
      id: "aws-cloud-intermediate-1",
      title: "Serverless Data Ingestion",
      level: "Intermediate",
      overview: "Build an event-driven pipeline with managed AWS services.",
      tasks: [
        "Create an API Gateway endpoint triggering a Lambda function that validates JSON payloads.",
        "Store transformed data in DynamoDB with a TTL attribute and expose a Query interface via Lambda.",
        "Set up CloudWatch alarms for error spikes and configure SNS notifications for the on-call rotation."
      ],
      estimatedTime: "4-5 hours",
      skills: ["Serverless design", "DynamoDB", "Monitoring"],
      resources: [
        { label: "Lambda Developer Guide", url: "https://docs.aws.amazon.com/lambda/latest/dg/welcome.html" },
        { label: "DynamoDB Best Practices", url: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/best-practices.html" }
      ],
    },
    {
      id: "aws-cloud-advanced-1",
      title: "Infrastructure as Code + CICD",
      level: "Advanced",
      overview: "Codify AWS infrastructure and deliver it through a multi-stage pipeline.",
      tasks: [
        "Model a VPC, subnets, and ECS Fargate service with Terraform or AWS CDK and store state remotely.",
        "Create an AWS CodePipeline (or GitHub Actions) workflow that lints templates, deploys to staging, then promotes to production via manual approval.",
        "Instrument the service with AWS X-Ray and capture traces into CloudWatch dashboards for latency analysis."
      ],
      estimatedTime: "6-8 hours",
      skills: ["Infrastructure as code", "CI/CD", "Distributed tracing"],
      resources: [
        { label: "Terraform AWS Provider", url: "https://registry.terraform.io/providers/hashicorp/aws/latest/docs" },
        { label: "AWS CodePipeline User Guide", url: "https://docs.aws.amazon.com/codepipeline/latest/userguide/welcome.html" }
      ],
    },
  ],
  "kubernetes-for-developers": [
    {
      id: "k8s-beginner-1",
      title: "Cluster Tour",
      level: "Beginner",
      overview: "Familiarize yourself with core Kubernetes primitives and the CLI.",
      tasks: [
        "Deploy a sample NGINX Deployment with three replicas and expose it through a ClusterIP Service.",
        "Inspect pods, logs, and events to understand the lifecycle; delete and recreate them to watch reconciliation.",
        "Define a ConfigMap and Secret, mount them into a pod, and print their values safely."
      ],
      estimatedTime: "2-3 hours",
      skills: ["Kubectl fundamentals", "Deployments", "Config management"],
      resources: [
        { label: "Kubernetes Basics", url: "https://kubernetes.io/docs/tutorials/kubernetes-basics/" },
        { label: "kubectl Cheat Sheet", url: "https://kubernetes.io/docs/reference/kubectl/cheatsheet/" }
      ],
    },
    {
      id: "k8s-intermediate-1",
      title: "Stateful Services",
      level: "Intermediate",
      overview: "Operate stateful workloads with updates and disaster recovery.",
      tasks: [
        "Deploy PostgreSQL with a StatefulSet, PersistentVolumeClaims, and headless Service.",
        "Configure a PodDisruptionBudget and rolling update strategy, then perform a controlled upgrade.",
        "Back up the database using Velero or native tooling, simulate node failure, and restore from backup."
      ],
      estimatedTime: "4-5 hours",
      skills: ["Stateful workloads", "Release strategies", "Backup/restore"],
      resources: [
        { label: "StatefulSet Concepts", url: "https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/" },
        { label: "Velero", url: "https://velero.io/docs/" }
      ],
    },
    {
      id: "k8s-advanced-1",
      title: "Production Platform Engineering",
      level: "Advanced",
      overview: "Think like a platform engineer by adding policies, security, and observability.",
      tasks: [
        "Install an Ingress controller (NGINX or Traefik) with TLS termination and rate limiting.",
        "Enforce pod security using Kyverno or OPA Gatekeeper policies for namespaces and resource quotas.",
        "Collect metrics with Prometheus and visualize golden signals on Grafana; alert on saturation."
      ],
      estimatedTime: "5-6 hours",
      skills: ["Ingress", "Policy enforcement", "Observability"],
      resources: [
        { label: "Ingress NGINX", url: "https://kubernetes.github.io/ingress-nginx/" },
        { label: "Kyverno Policies", url: "https://kyverno.io/policies/" }
      ],
    },
  ],
  "python-data-science": [
    {
      id: "python-ds-beginner-1",
      title: "Exploratory Data Analysis",
      level: "Beginner",
      overview: "Practice loading, cleaning, and summarizing a real-world dataset in pandas.",
      tasks: [
        "Load a CSV dataset (e.g., global energy usage) and handle missing values with imputation strategies.",
        "Generate descriptive statistics, correlation heatmaps, and at least three visualizations with seaborn.",
        "Document your findings in a Jupyter notebook with Markdown narratives and action items."
      ],
      estimatedTime: "3-4 hours",
      skills: ["Pandas", "Data cleaning", "Visualization"],
      resources: [
        { label: "Pandas User Guide", url: "https://pandas.pydata.org/docs/user_guide/index.html" },
        { label: "Seaborn Tutorial", url: "https://seaborn.pydata.org/tutorial.html" }
      ],
    },
    {
      id: "python-ds-intermediate-1",
      title: "Feature Engineering Sprint",
      level: "Intermediate",
      overview: "Turn raw tabular data into model-ready features and evaluate significance.",
      tasks: [
        "Engineer new categorical, temporal, and interaction features for a Kaggle dataset of your choice.",
        "Compare performance of at least three scikit-learn models using cross-validation and ROC/AUC metrics.",
        "Log experiments with MLflow or Weights & Biases and summarize which features contributed most."
      ],
      estimatedTime: "4-5 hours",
      skills: ["Feature engineering", "Model evaluation", "Experiment tracking"],
      resources: [
        { label: "scikit-learn Feature Engineering", url: "https://scikit-learn.org/stable/modules/feature_engineering.html" },
        { label: "MLflow Tracking", url: "https://mlflow.org/docs/latest/tracking.html" }
      ],
    },
    {
      id: "python-ds-advanced-1",
      title: "Production Data Pipeline",
      level: "Advanced",
      overview: "Operationalize a batch analytics pipeline with scheduling and validation.",
      tasks: [
        "Design an ETL job using Prefect or Apache Airflow that collects data, cleans it, and stores aggregates in a warehouse.",
        "Implement data quality checks with Great Expectations or Pandera and halt runs on critical failures.",
        "Containerize the pipeline and deploy on a managed scheduler (Astronomer, Prefect Cloud, or Kubernetes CronJob)."
      ],
      estimatedTime: "6-8 hours",
      skills: ["Data orchestration", "Data quality", "Containerization"],
      resources: [
        { label: "Prefect Docs", url: "https://docs.prefect.io/latest/" },
        { label: "Great Expectations", url: "https://greatexpectations.io/" }
      ],
    },
  ],
  "machine-learning": [
    {
      id: "ml-beginner-1",
      title: "Supervised Learning Playground",
      level: "Beginner",
      overview: "Train and evaluate classic supervised models on a structured dataset.",
      tasks: [
        "Split the Iris or Titanic dataset into train/validation/test splits and scale numerical features.",
        "Train logistic regression and decision tree models, tuning hyperparameters via grid search.",
        "Plot confusion matrices and learning curves, interpreting under/over-fitting signals."
      ],
      estimatedTime: "3-4 hours",
      skills: ["Data splitting", "Model training", "Evaluation metrics"],
      resources: [
        { label: "scikit-learn Model Evaluation", url: "https://scikit-learn.org/stable/modules/model_evaluation.html" },
        { label: "Kaggle Titanic", url: "https://www.kaggle.com/competitions/titanic" }
      ],
    },
    {
      id: "ml-intermediate-1",
      title: "Gradient Boosting Challenge",
      level: "Intermediate",
      overview: "Master tree-based ensembles and feature importance interpretation.",
      tasks: [
        "Train XGBoost, LightGBM, and CatBoost models on a medium-sized dataset, tracking experiment metadata.",
        "Use SHAP values to explain predictions for key observations and summarize global feature importance.",
        "Export the best model with joblib and serve predictions through a FastAPI endpoint."
      ],
      estimatedTime: "4-5 hours",
      skills: ["Gradient boosting", "Explainability", "Model serving"],
      resources: [
        { label: "XGBoost Docs", url: "https://xgboost.readthedocs.io/en/stable/" },
        { label: "SHAP Explainers", url: "https://shap.readthedocs.io/en/latest/" }
      ],
    },
    {
      id: "ml-advanced-1",
      title: "MLOps Deployment",
      level: "Advanced",
      overview: "Move from experimentation to a managed production workflow.",
      tasks: [
        "Containerize a trained model with Docker and provide prediction + healthcheck endpoints.",
        "Automate retraining using GitHub Actions or GitLab CI triggered by new data in cloud storage.",
        "Implement drift detection with evidentlyAI or custom scripts and alert when thresholds are exceeded."
      ],
      estimatedTime: "6-8 hours",
      skills: ["Docker", "CI/CD", "Model monitoring"],
      resources: [
        { label: "Evidently AI", url: "https://docs.evidentlyai.com/" },
        { label: "MLOps Specialization", url: "https://cloud.google.com/learn/courses/mlops-fundamentals" }
      ],
    },
  ],
  "postgresql": [
    {
      id: "postgres-beginner-1",
      title: "SQL Mastery",
      level: "Beginner",
      overview: "Level up your SQL queries through schema design and analytic functions.",
      tasks: [
        "Design a normalized schema for a course catalog with students, lessons, and enrollments.",
        "Write advanced SELECT queries using window functions, CTEs, and conditional aggregates.",
        "Create indexes for frequent queries, measure improvements with `EXPLAIN (ANALYZE)`, and document findings."
      ],
      estimatedTime: "3-4 hours",
      skills: ["Schema design", "Advanced SQL", "Index tuning"],
      resources: [
        { label: "PostgreSQL Tutorial", url: "https://www.postgresql.org/docs/current/tutorial.html" },
        { label: "Use the Index", url: "https://use-the-index-luke.com/" }
      ],
    },
    {
      id: "postgres-intermediate-1",
      title: "Performance and Partitioning",
      level: "Intermediate",
      overview: "Optimize large tables with partitioning, materialized views, and monitoring.",
      tasks: [
        "Implement range partitioning on a fact table and verify pruning with explain plans.",
        "Create a materialized view for reporting queries and refresh it incrementally.",
        "Set up pg_stat_statements and track top slow queries, applying tuning to reduce latency."
      ],
      estimatedTime: "4-5 hours",
      skills: ["Partitioning", "Materialized views", "Monitoring"],
      resources: [
        { label: "Partitioning", url: "https://www.postgresql.org/docs/current/ddl-partitioning.html" },
        { label: "pg_stat_statements", url: "https://www.postgresql.org/docs/current/pgstatstatements.html" }
      ],
    },
    {
      id: "postgres-advanced-1",
      title: "High Availability & Backups",
      level: "Advanced",
      overview: "Engineer robust PostgreSQL operations with replication and failover drills.",
      tasks: [
        "Configure streaming replication to a hot standby and confirm read-only workloads succeed.",
        "Automate backups with WAL archiving and pgBackRest or barman.",
        "Perform a failover simulation, promote the replica, and re-establish the original primary as standby."
      ],
      estimatedTime: "5-6 hours",
      skills: ["Replication", "Backup strategies", "Disaster recovery"],
      resources: [
        { label: "Streaming Replication", url: "https://www.postgresql.org/docs/current/warm-standby.html" },
        { label: "pgBackRest", url: "https://pgbackrest.org/" }
      ],
    },
  ],
  "mongodb": [
    {
      id: "mongodb-beginner-1",
      title: "Mongo Basics",
      level: "Beginner",
      overview: "Transition from relational to document thinking with CRUD and schema design.",
      tasks: [
        "Model a flexible course catalog schema with embedded documents and references where appropriate.",
        "Practice CRUD operations via MongoDB Shell or Compass, leveraging projections and `find` filters.",
        "Create compound indexes for common queries and observe their impact with `explain`."
      ],
      estimatedTime: "2-3 hours",
      skills: ["Document modeling", "CRUD operations", "Indexing"],
      resources: [
        { label: "MongoDB CRUD", url: "https://www.mongodb.com/docs/manual/crud/" },
        { label: "Data Modeling", url: "https://www.mongodb.com/docs/manual/core/data-modeling-introduction/" }
      ],
    },
    {
      id: "mongodb-intermediate-1",
      title: "Aggregation Pipelines",
      level: "Intermediate",
      overview: "Master the aggregation framework for analytics and transformations.",
      tasks: [
        "Write aggregation pipelines with `$match`, `$group`, `$lookup`, and `$facet` to analyze enrollment metrics.",
        "Use `$graphLookup` or `$unwind` to explore prerequisite relationships between courses.",
        "Create a reusable pipeline stage using `$setWindowFields` for moving averages."
      ],
      estimatedTime: "3-4 hours",
      skills: ["Aggregation", "Data analysis", "Pipeline optimization"],
      resources: [
        { label: "Aggregation Pipeline", url: "https://www.mongodb.com/docs/manual/core/aggregation-pipeline/" },
        { label: "Mongo Playground", url: "https://mongoplayground.net/" }
      ],
    },
    {
      id: "mongodb-advanced-1",
      title: "Scalability & Security",
      level: "Advanced",
      overview: "Operate MongoDB clusters securely with sharding and access control.",
      tasks: [
        "Enable authentication, create application-specific roles, and rotate credentials.",
        "Shard a large collection based on a hashed key and analyze chunk distribution.",
        "Implement Ops Manager or Cloud Manager monitoring with alerting for replica lag and disk usage."
      ],
      estimatedTime: "5-6 hours",
      skills: ["Security", "Sharding", "Monitoring"],
      resources: [
        { label: "MongoDB Security", url: "https://www.mongodb.com/docs/manual/security/" },
        { label: "Sharding Introduction", url: "https://www.mongodb.com/docs/manual/sharding/" }
      ],
    },
  ],
  "restful-apis": [
    {
      id: "rest-apis-beginner-1",
      title: "Design Thinking",
      level: "Beginner",
      overview: "Practice REST design fundamentals with resource modeling and documentation.",
      tasks: [
        "Model resources for a learning platform, defining URIs, verbs, supported status codes, and error schema.",
        "Document the API with OpenAPI/Swagger, including examples and authentication requirements.",
        "Build a Postman collection that demonstrates the happy path and typical failures."
      ],
      estimatedTime: "2-3 hours",
      skills: ["REST design", "API documentation", "Client testing"],
      resources: [
        { label: "REST API Tutorial", url: "https://restfulapi.net/" },
        { label: "OpenAPI Specification", url: "https://swagger.io/specification/" }
      ],
    },
    {
      id: "rest-apis-intermediate-1",
      title: "Hardening REST",
      level: "Intermediate",
      overview: "Secure and monitor an existing API.",
      tasks: [
        "Implement rate limiting and request validation middleware for a Node or Python API.",
        "Add OAuth2 or JWT authentication flows with refresh token rotation.",
        "Capture structured logs and metrics for each endpoint, surfacing them on a Grafana dashboard."
      ],
      estimatedTime: "4-5 hours",
      skills: ["Security", "Authentication", "Monitoring"],
      resources: [
        { label: "OWASP API Security Top 10", url: "https://owasp.org/API-Security/" },
        { label: "Grafana", url: "https://grafana.com/docs/grafana/latest/" }
      ],
    },
    {
      id: "rest-apis-advanced-1",
      title: "Resilient Integrations",
      level: "Advanced",
      overview: "Integrate REST services with circuit breakers, idempotency, and contracts.",
      tasks: [
        "Implement idempotency keys for write operations and verify safe retries.",
        "Introduce circuit breakers and bulkheads using library support (resilience4j, Envoy, or Istio).",
        "Set up consumer-driven contract testing with Pact and add it to CI."
      ],
      estimatedTime: "5-6 hours",
      skills: ["Resilience", "Fault tolerance", "Contract testing"],
      resources: [
        { label: "Resilience4j", url: "https://resilience4j.readme.io/" },
        { label: "Pact Docs", url: "https://docs.pact.io/" }
      ],
    },
  ],
  "building-apis-fastapi": [
    {
      id: "fastapi-beginner-1",
      title: "FastAPI Fundamentals",
      level: "Beginner",
      overview: "Create typed routes, dependency injections, and OpenAPI docs in FastAPI.",
      tasks: [
        "Define Pydantic models for course creation and validation, returning responses with type hints.",
        "Add dependency-injected services for database access and wrap responses in pagination meta.",
        "Customize the OpenAPI schema with tags, summaries, and reusable response models."
      ],
      estimatedTime: "3-4 hours",
      skills: ["Pydantic", "Dependency injection", "OpenAPI"],
      resources: [
        { label: "FastAPI Tutorial", url: "https://fastapi.tiangolo.com/tutorial/" },
        { label: "Pydantic", url: "https://docs.pydantic.dev/latest/" }
      ],
    },
    {
      id: "fastapi-intermediate-1",
      title: "Async + Background Tasks",
      level: "Intermediate",
      overview: "Bring async data access and background processing into your FastAPI project.",
      tasks: [
        "Use SQLModel with async SQLAlchemy engine for CRUD operations against PostgreSQL.",
        "Schedule background processing of long-running tasks via Celery or FastAPI BackgroundTasks.",
        "Secure endpoints with OAuth2 password flows and refresh tokens, verifying scopes per route."
      ],
      estimatedTime: "4-5 hours",
      skills: ["Async I/O", "Background tasks", "Security"],
      resources: [
        { label: "SQLModel", url: "https://sqlmodel.tiangolo.com/" },
        { label: "Celery", url: "https://docs.celeryq.dev/en/stable/" }
      ],
    },
    {
      id: "fastapi-advanced-1",
      title: "Production-Ready FastAPI",
      level: "Advanced",
      overview: "Deploy FastAPI with observability, testing, and performance considerations.",
      tasks: [
        "Add integration tests with httpx/pytest, seeding fixtures via async context managers.",
        "Containerize the app with a multi-stage Dockerfile and run behind Uvicorn + Gunicorn.",
        "Register Prometheus metrics, structured logging, and distributed tracing with OpenTelemetry."
      ],
      estimatedTime: "5-6 hours",
      skills: ["Testing", "Docker", "Observability"],
      resources: [
        { label: "FastAPI Testing", url: "https://fastapi.tiangolo.com/tutorial/testing/" },
        { label: "OpenTelemetry Python", url: "https://opentelemetry.io/docs/instrumentation/python/" }
      ],
    },
  ],
  "nextjs-app-router": [
    {
      id: "nextjs-beginner-1",
      title: "App Router Foundations",
      level: "Beginner",
      overview: "Practice layouts, server components, and data fetching with the App Router.",
      tasks: [
        "Create nested layouts with dynamic segments for categories and courses.",
        "Fetch data with `fetch` inside server components and stream results using Suspense boundaries.",
        "Implement metadata export for SEO and generate Open Graph images for routes."
      ],
      estimatedTime: "3-4 hours",
      skills: ["App Router", "Server components", "SEO metadata"],
      resources: [
        { label: "Next.js App Router", url: "https://nextjs.org/docs/app" },
        { label: "Metadata API", url: "https://nextjs.org/docs/app/building-your-application/optimizing/metadata" }
      ],
    },
    {
      id: "nextjs-intermediate-1",
      title: "Full-Stack Next.js",
      level: "Intermediate",
      overview: "Combine client/server components with forms, streaming, and caching.",
      tasks: [
        "Build a dashboard using server actions for mutating data with optimistic updates.",
        "Implement ISR (Incremental Static Regeneration) and route-level caching strategies.",
        "Secure API routes with NextAuth or custom middleware protecting sensitive pages."
      ],
      estimatedTime: "4-5 hours",
      skills: ["Server actions", "Caching", "Authentication"],
      resources: [
        { label: "Next.js Server Actions", url: "https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions" },
        { label: "NextAuth", url: "https://next-auth.js.org/" }
      ],
    },
    {
      id: "nextjs-advanced-1",
      title: "Enterprise Observability",
      level: "Advanced",
      overview: "Improve performance and DX with profiling, error instrumentation, and bundling optimizations.",
      tasks: [
        "Profile bundle size with `next build` and reduce it by code splitting and dynamic imports.",
        "Integrate Sentry (or OpenTelemetry) for error tracking and tracing server actions.",
        "Add full e2e tests with Playwright covering streaming UIs and server actions."
      ],
      estimatedTime: "5-6 hours",
      skills: ["Performance tuning", "Error monitoring", "E2E testing"],
      resources: [
        { label: "Next.js Performance Guide", url: "https://nextjs.org/learn/foundations/performance" },
        { label: "Playwright", url: "https://playwright.dev/docs/intro" }
      ],
    },
  ],
  "vue-pro-engineer": [
    {
      id: "vue-beginner-1",
      title: "Vue Composition Basics",
      level: "Beginner",
      overview: "Adopt the Composition API while building a modular UI.",
      tasks: [
        "Refactor an Options API component to Composition API using `ref`, `reactive`, and computed values.",
        "Implement reusable composables for fetching data and debouncing inputs.",
        "Create a responsive layout using `<script setup>` and SFC `<style scoped>` utilities."
      ],
      estimatedTime: "3-4 hours",
      skills: ["Composition API", "Composables", "Responsive layouts"],
      resources: [
        { label: "Vue Composition API", url: "https://vuejs.org/guide/introduction.html" },
        { label: "VueUse Collection", url: "https://vueuse.org/" }
      ],
    },
    {
      id: "vue-intermediate-1",
      title: "State Management + Router",
      level: "Intermediate",
      overview: "Manage application state with Pinia and build nested router views.",
      tasks: [
        "Create a multi-step enrollment wizard leveraging Pinia for cross-step persistence.",
        "Implement route guards checking authentication and unsaved changes before navigation.",
        "Lazy-load route groups and analyze bundle impact using Vue CLI or Vite stats."
      ],
      estimatedTime: "4-5 hours",
      skills: ["Pinia", "Vue Router", "Code splitting"],
      resources: [
        { label: "Pinia", url: "https://pinia.vuejs.org/" },
        { label: "Vue Router", url: "https://router.vuejs.org/" }
      ],
    },
    {
      id: "vue-advanced-1",
      title: "Vue at Scale",
      level: "Advanced",
      overview: "Ensure enterprise readiness with SSR, testing, and accessibility.",
      tasks: [
        "Add server-side rendering with Nuxt 3 or Vite SSR, including hydration checks.",
        "Write component tests with Vitest + Testing Library and end-to-end tests with Cypress.",
        "Audit accessibility using Axe DevTools and remediate issues in critical flows."
      ],
      estimatedTime: "5-6 hours",
      skills: ["SSR", "Testing", "Accessibility"],
      resources: [
        { label: "Nuxt 3", url: "https://nuxt.com/docs" },
        { label: "Vue Testing Library", url: "https://testing-library.com/docs/vue-testing-library/intro/" }
      ],
    },
  ],
  "sveltekit-essentials": [
    {
      id: "sveltekit-beginner-1",
      title: "SvelteKit Fundamentals",
      level: "Beginner",
      overview: "Practice routing, stores, and form actions in SvelteKit.",
      tasks: [
        "Create pages with +page.svelte and nested layouts, exploring universal vs server-only modules.",
        "Build writable stores for user settings and persist them via the browser Storage API.",
        "Handle progressive enhancement with form actions and enhance helper for optimistic UI."
      ],
      estimatedTime: "3-4 hours",
      skills: ["Svelte stores", "Routing", "Progressive enhancement"],
      resources: [
        { label: "SvelteKit Docs", url: "https://kit.svelte.dev/docs/introduction" },
        { label: "Svelte Stores", url: "https://svelte.dev/docs/svelte-store" }
      ],
    },
    {
      id: "sveltekit-intermediate-1",
      title: "API Integrations",
      level: "Intermediate",
      overview: "Build full-stack features with endpoints, hooks, and adapters.",
      tasks: [
        "Create +server.ts endpoints for CRUD operations secured by hooks with session validation.",
        "Deploy to Vercel or Cloudflare using the corresponding SvelteKit adapter.",
        "Stream data to clients using `setHeaders` and EventSource integration for live updates."
      ],
      estimatedTime: "4-5 hours",
      skills: ["API endpoints", "Deployment", "Streaming"],
      resources: [
        { label: "SvelteKit Endpoints", url: "https://kit.svelte.dev/docs/load" },
        { label: "SvelteKit Hooks", url: "https://kit.svelte.dev/docs/hooks" }
      ],
    },
    {
      id: "sveltekit-advanced-1",
      title: "Advanced Tooling",
      level: "Advanced",
      overview: "Improve DX with testing, accessibility, and SSR performance tweaks.",
      tasks: [
        "Configure Playwright tests with SvelteKit test runner covering routing and form actions.",
        "Enable image optimization and fonts via SvelteKit's asset handling or external services.",
        "Implement security headers (CSP, HSTS) and analyze SSR performance using Lighthouse CI."
      ],
      estimatedTime: "5-6 hours",
      skills: ["Testing", "Asset optimization", "Security headers"],
      resources: [
        { label: "Playwright Test", url: "https://playwright.dev/docs/test-intro" },
        { label: "Lighthouse CI", url: "https://github.com/GoogleChrome/lighthouse-ci" }
      ],
    },
  ],
  "go-backend-blueprints": [
    {
      id: "go-backend-beginner-1",
      title: "Go Fundamentals",
      level: "Beginner",
      overview: "Get comfortable with Go syntax, tooling, and modules.",
      tasks: [
        "Write a CLI tool that processes CSV course data, computing aggregates and saving JSON output.",
        "Use goroutines and channels to parallelize heavy computations, ensuring deterministic ordering with WaitGroups.",
        "Write unit tests using Go's testing package and capture coverage reports."
      ],
      estimatedTime: "3-4 hours",
      skills: ["Go syntax", "Concurrency", "Testing"],
      resources: [
        { label: "Tour of Go", url: "https://go.dev/tour/welcome/1" },
        { label: "Go Modules", url: "https://go.dev/doc/modules" }
      ],
    },
    {
      id: "go-backend-intermediate-1",
      title: "REST API in Go",
      level: "Intermediate",
      overview: "Build idiomatic HTTP services with Chi or Gin and structured logging.",
      tasks: [
        "Construct a REST API with Chi including middleware for logging, recovery, and request ID propagation.",
        "Connect to PostgreSQL using sqlc or GORM and implement repository patterns with context timeouts.",
        "Add rate limiting via a token bucket algorithm and benchmark throughput with autocannon."
      ],
      estimatedTime: "4-5 hours",
      skills: ["HTTP services", "Database access", "Performance benchmarking"],
      resources: [
        { label: "chi router", url: "https://github.com/go-chi/chi" },
        { label: "Go Context", url: "https://go.dev/doc/context" }
      ],
    },
    {
      id: "go-backend-advanced-1",
      title: "Microservices & Observability",
      level: "Advanced",
      overview: "Design resilient Go services with gRPC, message queues, and telemetry.",
      tasks: [
        "Expose both REST and gRPC interfaces sharing business logic via clean architecture boundaries.",
        "Implement saga-like workflows using NATS or Kafka for asynchronous processing.",
        "Instrument with OpenTelemetry exporting traces to Jaeger and metrics to Prometheus."
      ],
      estimatedTime: "6-8 hours",
      skills: ["Microservices", "Event-driven design", "Telemetry"],
      resources: [
        { label: "OpenTelemetry Go", url: "https://opentelemetry.io/docs/instrumentation/go/" },
        { label: "Jaeger", url: "https://www.jaegertracing.io/docs/" }
      ],
    },
  ],
  "spring-boot-microservices": [
    {
      id: "spring-boot-beginner-1",
      title: "Spring Boot Fundamentals",
      level: "Beginner",
      overview: "Set up a REST API with Spring Boot and JPA.",
      tasks: [
        "Create a Spring Boot project with Spring Initializr (Web, Data JPA, H2).",
        "Implement CRUD endpoints with `@RestController`, using DTOs and ModelMapper for conversions.",
        "Write unit tests with JUnit 5 and Mockito for service and repository layers."
      ],
      estimatedTime: "3-4 hours",
      skills: ["Spring Boot", "Data JPA", "Testing"],
      resources: [
        { label: "Spring Boot Docs", url: "https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/" },
        { label: "Spring Guides", url: "https://spring.io/guides" }
      ],
    },
    {
      id: "spring-boot-intermediate-1",
      title: "Microservice Ecosystem",
      level: "Intermediate",
      overview: "Break a monolith into services with service discovery and API gateway.",
      tasks: [
        "Split the application into user, course, and enrollment services communicating via OpenFeign.",
        "Register services with Eureka or Consul and route traffic through Spring Cloud Gateway.",
        "Implement distributed tracing with Sleuth and Zipkin to visualize requests."
      ],
      estimatedTime: "5-6 hours",
      skills: ["Service decomposition", "Service discovery", "Distributed tracing"],
      resources: [
        { label: "Spring Cloud", url: "https://spring.io/projects/spring-cloud" },
        { label: "Zipkin", url: "https://zipkin.io/" }
      ],
    },
    {
      id: "spring-boot-advanced-1",
      title: "Resilience & Security",
      level: "Advanced",
      overview: "Harden Spring microservices for production operations.",
      tasks: [
        "Add circuit breakers, bulkheads, and retries using Resilience4j annotations.",
        "Secure endpoints with Spring Security and OAuth2, protecting gateway routes with JWT scopes.",
        "Deploy to Kubernetes with Helm charts and configure Prometheus + Grafana dashboards."
      ],
      estimatedTime: "6-8 hours",
      skills: ["Resilience patterns", "Security", "Kubernetes deployment"],
      resources: [
        { label: "Resilience4j", url: "https://resilience4j.readme.io/docs" },
        { label: "Spring Security", url: "https://spring.io/projects/spring-security" }
      ],
    },
  ],
  "azure-cloud-accelerator": [
    {
      id: "azure-beginner-1",
      title: "Azure Portal Tour",
      level: "Beginner",
      overview: "Get familiar with Azure services and resource groups.",
      tasks: [
        "Create a resource group and deploy an Azure App Service with a sample application.",
        "Provision Azure Storage (Blob + Table) and connect it to the app with managed identities.",
        "Enable Activity Log alerts for unexpected resource deletions."
      ],
      estimatedTime: "2-3 hours",
      skills: ["Azure portal", "App Service", "Managed identities"],
      resources: [
        { label: "Azure Fundamentals", url: "https://learn.microsoft.com/azure/?view=azurerm" },
        { label: "Azure Pricing Calculator", url: "https://azure.microsoft.com/pricing/calculator/" }
      ],
    },
    {
      id: "azure-intermediate-1",
      title: "CI/CD with Azure DevOps",
      level: "Intermediate",
      overview: "Build a deployment pipeline targeting Azure services.",
      tasks: [
        "Set up an Azure DevOps project with git repo, boards, and wiki documentation.",
        "Create a YAML pipeline that builds a container image, runs tests, and deploys to Azure Container Apps.",
        "Implement environment approval gates and integrate security scanning (Trivy or GitHub Advanced Security)."
      ],
      estimatedTime: "4-5 hours",
      skills: ["Azure DevOps", "CI/CD", "Security scanning"],
      resources: [
        { label: "Azure Pipeline Docs", url: "https://learn.microsoft.com/azure/devops/pipelines/?view=azure-devops" },
        { label: "Trivy", url: "https://aquasecurity.github.io/trivy/v0.49/" }
      ],
    },
    {
      id: "azure-advanced-1",
      title: "Enterprise Landing Zone",
      level: "Advanced",
      overview: "Architect secure, compliant Azure environments at scale.",
      tasks: [
        "Deploy an Azure Landing Zone with Terraform or Bicep, including management groups and policy assignments.",
        "Implement Azure Monitor workbooks and log analytics queries for cost and security insights.",
        "Automate governance with Azure Policy to enforce tag conventions and allowed SKUs."
      ],
      estimatedTime: "6-8 hours",
      skills: ["Landing zones", "Monitoring", "Governance"],
      resources: [
        { label: "Azure Landing Zone", url: "https://learn.microsoft.com/azure/cloud-adoption-framework/ready/landing-zone/" },
        { label: "Azure Policy", url: "https://learn.microsoft.com/azure/governance/policy/overview" }
      ],
    },
  ],
  "gcp-cloud-engineer": [
    {
      id: "gcp-beginner-1",
      title: "GCP Fundamentals",
      level: "Beginner",
      overview: "Provision core Google Cloud services using the console and Cloud Shell.",
      tasks: [
        "Create a new project, enable billing, and configure IAM roles for teammates.",
        "Deploy a Compute Engine VM with startup scripts installing a web server.",
        "Set up Cloud Storage buckets with lifecycle management and signed URLs."
      ],
      estimatedTime: "2-3 hours",
      skills: ["Project setup", "Compute Engine", "Cloud Storage"],
      resources: [
        { label: "GCP Getting Started", url: "https://cloud.google.com/docs/overview" },
        { label: "Cloud Shell", url: "https://cloud.google.com/shell/docs" }
      ],
    },
    {
      id: "gcp-intermediate-1",
      title: "Networking & IAM",
      level: "Intermediate",
      overview: "Design VPC networks and tighten access control.",
      tasks: [
        "Create custom VPCs with subnets across regions, using Cloud Router and Cloud NAT for outbound access.",
        "Configure IAM custom roles and service accounts with least privilege for CI/CD pipelines.",
        "Deploy a Cloud Run service and restrict invocation to specific service accounts."
      ],
      estimatedTime: "4-5 hours",
      skills: ["VPC design", "IAM", "Cloud Run"],
      resources: [
        { label: "VPC Networks", url: "https://cloud.google.com/vpc/docs/overview" },
        { label: "IAM Best Practices", url: "https://cloud.google.com/iam/docs/using-iam-securely" }
      ],
    },
    {
      id: "gcp-advanced-1",
      title: "Analytics & Observability",
      level: "Advanced",
      overview: "Harness GCP analytics and monitoring platforms.",
      tasks: [
        "Stream data into BigQuery via Pub/Sub and Dataflow, creating scheduled queries for reporting.",
        "Add Cloud Monitoring dashboards and uptime checks; configure alerting policies for key SLOs.",
        "Instrument a service with Cloud Trace and Cloud Profiler to diagnose latency."
      ],
      estimatedTime: "6-8 hours",
      skills: ["Data pipelines", "Monitoring", "Tracing"],
      resources: [
        { label: "BigQuery", url: "https://cloud.google.com/bigquery/docs" },
        { label: "Cloud Monitoring", url: "https://cloud.google.com/monitoring/docs" }
      ],
    },
  ],
  "deep-learning-tensorflow": [
    {
      id: "dl-beginner-1",
      title: "TensorFlow Foundations",
      level: "Beginner",
      overview: "Construct and train your first neural networks in TensorFlow 2.",
      tasks: [
        "Build a dense neural network for MNIST classification, experimenting with activation functions and optimizers.",
        "Visualize metrics with TensorBoard and apply callbacks for early stopping and checkpointing.",
        "Export and reload the SavedModel, running inference on custom inputs."
      ],
      estimatedTime: "4-5 hours",
      skills: ["TensorFlow basics", "Callbacks", "Model export"],
      resources: [
        { label: "TensorFlow Beginner", url: "https://www.tensorflow.org/tutorials/quickstart/beginner" },
        { label: "TensorBoard", url: "https://www.tensorflow.org/tensorboard" }
      ],
    },
    {
      id: "dl-intermediate-1",
      title: "Computer Vision",
      level: "Intermediate",
      overview: "Explore CNN architectures and transfer learning.",
      tasks: [
        "Train a CNN from scratch on CIFAR-10, tuning regularization and data augmentation.",
        "Fine-tune a pretrained EfficientNet or ResNet model and compare accuracy vs baseline.",
        "Deploy the model to TensorFlow Serving or TF Lite for edge inference."
      ],
      estimatedTime: "5-6 hours",
      skills: ["CNNs", "Transfer learning", "Model deployment"],
      resources: [
        { label: "Transfer Learning", url: "https://www.tensorflow.org/tutorials/images/transfer_learning" },
        { label: "TensorFlow Serving", url: "https://www.tensorflow.org/tfx/guide/serving" }
      ],
    },
    {
      id: "dl-advanced-1",
      title: "Distributed Training",
      level: "Advanced",
      overview: "Scale deep learning workloads across multiple devices.",
      tasks: [
        "Implement distributed data parallel training with `tf.distribute.MirroredStrategy`.",
        "Optimize input pipelines using `tf.data`, caching, and prefetching for maximal throughput.",
        "Integrate hyperparameter tuning with KerasTuner and track experiments via Vertex AI or Weights & Biases."
      ],
      estimatedTime: "6-8 hours",
      skills: ["Distributed training", "Input pipelines", "Hyperparameter tuning"],
      resources: [
        { label: "Distributed Training", url: "https://www.tensorflow.org/guide/distributed_training" },
        { label: "KerasTuner", url: "https://keras.io/keras_tuner/" }
      ],
    },
  ],
  "nlp-python-roadmap": [
    {
      id: "nlp-beginner-1",
      title: "Text Preprocessing",
      level: "Beginner",
      overview: "Clean, tokenize, and represent text data for downstream tasks.",
      tasks: [
        "Clean a corpus using regex, spaCy tokenization, stopword removal, and lemmatization.",
        "Compare Bag-of-Words vs TF-IDF features for sentiment analysis and evaluate results.",
        "Visualize word frequencies with word clouds and bar charts, noting domain-specific stopwords."
      ],
      estimatedTime: "3-4 hours",
      skills: ["Text cleaning", "Vectorization", "Visualization"],
      resources: [
        { label: "spaCy", url: "https://spacy.io/usage/spacy-101" },
        { label: "NLTK Book", url: "http://www.nltk.org/book/" }
      ],
    },
    {
      id: "nlp-intermediate-1",
      title: "Transformer Fine-Tuning",
      level: "Intermediate",
      overview: "Adapt pretrained transformers to custom datasets.",
      tasks: [
        "Fine-tune a Hugging Face transformer (DistilBERT) for text classification with Trainer API.",
        "Measure metrics like accuracy, F1, and confusion matrix using `evaluate`.",
        "Deploy the model behind FastAPI or Streamlit, adding caching for embeddings with FAISS or Chroma."
      ],
      estimatedTime: "4-5 hours",
      skills: ["Transformer fine-tuning", "Evaluation", "Model serving"],
      resources: [
        { label: "Hugging Face Course", url: "https://huggingface.co/course/chapter1" },
        { label: "FAISS", url: "https://faiss.ai/" }
      ],
    },
    {
      id: "nlp-advanced-1",
      title: "RAG & LLM Ops",
      level: "Advanced",
      overview: "Create retrieval-augmented generation systems with monitoring.",
      tasks: [
        "Build a RAG pipeline using LangChain, combining vector stores and prompt templates.",
        "Track prompt/response quality with human feedback loops and structured evaluation forms.",
        "Integrate guardrails for toxicity or PII detection, logging results to an analytics dashboard."
      ],
      estimatedTime: "6-8 hours",
      skills: ["RAG systems", "LLM evaluation", "Safety guardrails"],
      resources: [
        { label: "LangChain", url: "https://python.langchain.com/" },
        { label: "OpenAI Safety Best Practices", url: "https://platform.openai.com/docs/guides/safety-best-practices" }
      ],
    },
  ],
  "redis-performance": [
    {
      id: "redis-beginner-1",
      title: "Caching Essentials",
      level: "Beginner",
      overview: "Speed up responses with Redis caching patterns.",
      tasks: [
        "Implement request-level caching with TTLs and cache busting for critical endpoints.",
        "Experiment with Redis data structures (lists, sets, sorted sets) for leaderboards and tags.",
        "Measure hit/miss ratios and derive when to invalidate caches."
      ],
      estimatedTime: "2-3 hours",
      skills: ["Caching strategies", "Redis data types", "Metrics"],
      resources: [
        { label: "Redis Data Types", url: "https://redis.io/docs/data-types/" },
        { label: "Caching Patterns", url: "https://redis.io/docs/latest/develop/use-cases/caching/" }
      ],
    },
    {
      id: "redis-intermediate-1",
      title: "Streams & Pub/Sub",
      level: "Intermediate",
      overview: "Leverage Redis as a lightweight message broker.",
      tasks: [
        "Create producer/consumer groups with Redis Streams for event processing.",
        "Build retry and dead-letter queues for failed stream entries.",
        "Benchmark throughput under load and scale consumers horizontally."
      ],
      estimatedTime: "3-4 hours",
      skills: ["Streams", "Queue design", "Scalability"],
      resources: [
        { label: "Redis Streams", url: "https://redis.io/docs/data-types/streams/" },
        { label: "Redis Pub/Sub", url: "https://redis.io/docs/latest/develop/use-cases/pubsub/" }
      ],
    },
    {
      id: "redis-advanced-1",
      title: "Clustering & Observability",
      level: "Advanced",
      overview: "Operate Redis clusters with resilience and visibility.",
      tasks: [
        "Set up Redis Cluster or Redis Enterprise with sharding and replica failover.",
        "Implement access control lists (ACLs) and TLS for secure connections.",
        "Monitor latency, memory fragmentation, and slow log events, alerting on anomalies."
      ],
      estimatedTime: "5-6 hours",
      skills: ["Clustering", "Security", "Monitoring"],
      resources: [
        { label: "Redis Cluster", url: "https://redis.io/docs/management/scaling/" },
        { label: "Redis ACL", url: "https://redis.io/topics/acl" }
      ],
    },
  ],
  "mysql-masterclass": [
    {
      id: "mysql-beginner-1",
      title: "Relational Modeling",
      level: "Beginner",
      overview: "Design MySQL schemas with normalization and constraints.",
      tasks: [
        "Model a MySQL schema for learning resources using normal forms and foreign keys.",
        "Create stored procedures for enrollment operations and enforce business rules with triggers.",
        "Back up the database using mysqldump and restore into a fresh instance."
      ],
      estimatedTime: "3-4 hours",
      skills: ["Schema normalization", "Procedures & triggers", "Backup/restore"],
      resources: [
        { label: "MySQL Tutorial", url: "https://dev.mysql.com/doc/refman/8.0/en/tutorial.html" },
        { label: "Normalization", url: "https://dev.mysql.com/doc/refman/8.0/en/normalization.html" }
      ],
    },
    {
      id: "mysql-intermediate-1",
      title: "Query Performance",
      level: "Intermediate",
      overview: "Tune slow queries and understand the optimizer.",
      tasks: [
        "Use `EXPLAIN` and performance schema to diagnose slow queries, adding covering indexes as needed.",
        "Enable slow query log and set up alerts when thresholds exceed expected values.",
        "Benchmark improvements using sysbench or mysqlslap and record results."
      ],
      estimatedTime: "4-5 hours",
      skills: ["Query analysis", "Monitoring", "Benchmarking"],
      resources: [
        { label: "MySQL Optimizer", url: "https://dev.mysql.com/doc/refman/8.0/en/execution-plan-information.html" },
        { label: "Sysbench", url: "https://github.com/akopytov/sysbench" }
      ],
    },
    {
      id: "mysql-advanced-1",
      title: "Replication & Recovery",
      level: "Advanced",
      overview: "Ensure high availability and backup strategies for MySQL.",
      tasks: [
        "Configure asynchronous replication, monitor lag, and practice failover to a replica.",
        "Implement point-in-time recovery using binary logs.",
        "Set up MySQL InnoDB Cluster or Group Replication and test failure scenarios."
      ],
      estimatedTime: "5-6 hours",
      skills: ["Replication", "Recovery", "High availability"],
      resources: [
        { label: "MySQL Replication", url: "https://dev.mysql.com/doc/refman/8.0/en/replication.html" },
        { label: "InnoDB Cluster", url: "https://dev.mysql.com/doc/mysql-shell/8.0/en/mysql-innodb-cluster-userguide.html" }
      ],
    },
  ],
  "graphql-apollo-server": [
    {
      id: "graphql-beginner-1",
      title: "Schema Design",
      level: "Beginner",
      overview: "Craft a GraphQL schema and resolvers with Apollo Server.",
      tasks: [
        "Define types, queries, and mutations for courses, lessons, and enrollments.",
        "Implement resolvers with data loaders to batch requests and prevent N+1.",
        "Document schema with descriptions and create example operations in Apollo Sandbox."
      ],
      estimatedTime: "3-4 hours",
      skills: ["Schema design", "Resolvers", "Documentation"],
      resources: [
        { label: "Apollo Server Docs", url: "https://www.apollographql.com/docs/apollo-server/" },
        { label: "GraphQL Best Practices", url: "https://graphql.org/learn/best-practices/" }
      ],
    },
    {
      id: "graphql-intermediate-1",
      title: "Client Integration",
      level: "Intermediate",
      overview: "Connect GraphQL APIs to front-end clients with caching.",
      tasks: [
        "Use Apollo Client with React to implement queries, mutations, and cache updates.",
        "Implement field policies, pagination helpers, and optimistic UI states.",
        "Add GraphQL subscriptions for live updates via WebSocketLink."
      ],
      estimatedTime: "4-5 hours",
      skills: ["Apollo Client", "Caching", "Realtime updates"],
      resources: [
        { label: "Apollo Client", url: "https://www.apollographql.com/docs/react/" },
        { label: "GraphQL Subscriptions", url: "https://www.apollographql.com/docs/react/data/subscriptions/" }
      ],
    },
    {
      id: "graphql-advanced-1",
      title: "Federation & Governance",
      level: "Advanced",
      overview: "Operate GraphQL at scale with federation and governance practices.",
      tasks: [
        "Split schema into subgraphs using Apollo Federation and compose them with a router.",
        "Implement schema checks, contract testing, and feature flagging for new fields.",
        "Monitor GraphQL performance with Apollo Studio metrics and define schema governance rules."
      ],
      estimatedTime: "5-6 hours",
      skills: ["Federation", "Governance", "Performance monitoring"],
      resources: [
        { label: "Apollo Federation", url: "https://www.apollographql.com/docs/federation/" },
        { label: "Apollo Studio", url: "https://www.apollographql.com/docs/studio/" }
      ],
    },
  ],
  "grpc-microservices": [
    {
      id: "grpc-beginner-1",
      title: "Protocol Buffers",
      level: "Beginner",
      overview: "Understand protobuf syntax and generate idiomatic client/server stubs.",
      tasks: [
        "Define `.proto` files for course and enrollment services, compiling them for Node, Go, or Python.",
        "Implement unary RPCs and stream responses for long-running listings.",
        "Write automated tests to validate serialization compatibility across languages."
      ],
      estimatedTime: "3-4 hours",
      skills: ["Protocol Buffers", "RPC design", "Cross-language testing"],
      resources: [
        { label: "Protocol Buffers", url: "https://protobuf.dev/" },
        { label: "gRPC Basics", url: "https://grpc.io/docs/" }
      ],
    },
    {
      id: "grpc-intermediate-1",
      title: "Interservice Communication",
      level: "Intermediate",
      overview: "Build robust gRPC services with interceptors and deadlines.",
      tasks: [
        "Add client-side load balancing and retry policies using service config discovery.",
        "Implement interceptors for authentication, logging, and tracing metadata.",
        "Handle deadlines and cancellation gracefully, propagating context to downstream calls."
      ],
      estimatedTime: "4-5 hours",
      skills: ["Resilience", "Interceptors", "Deadline handling"],
      resources: [
        { label: "gRPC Service Config", url: "https://grpc.io/blog/service-config/" },
        { label: "gRPC Interceptors", url: "https://grpc.io/docs/guides/concepts/#interceptors" }
      ],
    },
    {
      id: "grpc-advanced-1",
      title: "Hybrid Architectures",
      level: "Advanced",
      overview: "Integrate gRPC with REST gateways, observability, and security.",
      tasks: [
        "Expose gRPC services to REST clients with grpc-gateway or Envoy JSON transcoding.",
        "Secure connections with mTLS certificates and enforce RBAC using Open Policy Agent.",
        "Capture distributed traces with OpenTelemetry and visualize them in Jaeger."
      ],
      estimatedTime: "5-6 hours",
      skills: ["Protocol translation", "mTLS", "Tracing"],
      resources: [
        { label: "grpc-gateway", url: "https://github.com/grpc-ecosystem/grpc-gateway" },
        { label: "mTLS Concepts", url: "https://www.cloudflare.com/learning/access-management/what-is-mutual-tls/" }
      ],
    },
  ],
};
