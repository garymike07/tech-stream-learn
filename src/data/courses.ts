export interface Lesson {
  id: string;
  title: string;
  videoUrl?: string;
  videoDuration?: string;
}

export interface Section {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Module {
  id: string;
  title: string;
  sections: Section[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  modules: Module[];
  prerequisites?: string[];
  tags?: string[];
  roles?: string[];
  tools?: string[];
  outcomes?: string[];
  languages?: string[];
  status?: CourseStatus;
  syllabusUrl?: string;
  projectBriefs?: ProjectBrief[];
  assessments?: CourseAssessment[];
  localizedResources?: LocalizedResource[];
}

export type CourseStatus = "live" | "beta" | "archived";

export interface ProjectBrief {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  difficulty: "Starter" | "Intermediate" | "Advanced";
}

export interface CourseAssessment {
  id: string;
  title: string;
  type: "quiz" | "assignment" | "project";
  description: string;
}

export interface LocalizedResource {
  locale: string;
  label: string;
  url: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  courseCount: number;
}

const categoryMeta: Record<string, Omit<Category, "id" | "courseCount">> = {
  frontend: {
    name: "Frontend Development",
    description: "Master modern web interfaces with HTML, CSS, JavaScript, and frameworks",
    icon: "💻",
  },
  backend: {
    name: "Backend Development",
    description: "Build robust server-side applications and APIs",
    icon: "⚙️",
  },
  cloud: {
    name: "Cloud Computing",
    description: "Deploy and scale applications on leading cloud platforms",
    icon: "☁️",
  },
  "data-science": {
    name: "Data Science",
    description: "Analyze data, build ML models, and create visualizations",
    icon: "📊",
  },
  databases: {
    name: "Databases",
    description: "Design and manage SQL and NoSQL data systems",
    icon: "🗄️",
  },
  apis: {
    name: "API Development",
    description: "Create secure and scalable APIs",
    icon: "🔌",
  },
  "ai-engineering": {
    name: "AI Engineering",
    description: "Build, evaluate, and deploy large-scale AI systems",
    icon: "🤖",
  },
  cybersecurity: {
    name: "Cybersecurity",
    description: "Defend modern systems with offensive and defensive security",
    icon: "🛡️",
  },
  "devops-sre": {
    name: "DevOps & SRE",
    description: "Automate delivery pipelines and operate reliable infrastructure",
    icon: "🧰",
  },
  mobile: {
    name: "Mobile Development",
    description: "Design high-performance native and cross-platform mobile apps",
    icon: "📱",
  },
  "product-design": {
    name: "Product Design",
    description: "Craft world-class user experiences and design systems",
    icon: "🎨",
  },
};

export const courses: Course[] = [
  {
    id: "react-fundamentals",
    title: "React Fundamentals",
    description: "Learn React 18 from scratch and ship production-ready interfaces.",
    category: "frontend",
    difficulty: "Beginner",
    duration: "12 hours",
    prerequisites: ["Modern JavaScript", "HTML & CSS"],
    modules: [
      {
        id: "react-beginner",
        title: "Beginner Foundations",
        sections: [
          {
            id: "react-beginner-core",
            title: "Core Concepts",
            lessons: [
              {
                id: "react-beginner-1",
                title: "React Crash Course 2024",
                videoUrl: "https://www.youtube.com/embed/LDB4uaJ87e0",
              },
              {
                id: "react-beginner-2",
                title: "Props and State Explained",
                videoUrl: "https://www.youtube.com/embed/PHaECbrKgs0",
              },
            ],
          },
        ],
      },
      {
        id: "react-intermediate",
        title: "Intermediate Projects",
        sections: [
          {
            id: "react-intermediate-modern",
            title: "Modern React Patterns",
            lessons: [
              {
                id: "react-intermediate-1",
                title: "React Hooks Complete Tutorial",
                videoUrl: "https://www.youtube.com/embed/cF2lQ_gZeA8",
              },
              {
                id: "react-intermediate-2",
                title: "React Router v6.4 Guide",
                videoUrl: "https://www.youtube.com/embed/HZKkPSQPHVA",
              },
            ],
          },
        ],
      },
      {
        id: "react-advanced",
        title: "Advanced Performance",
        sections: [
          {
            id: "react-advanced-optimisation",
            title: "Performance & Concurrent Rendering",
            lessons: [
              {
                id: "react-advanced-1",
                title: "Optimize Modern React Apps",
                videoUrl: "https://www.youtube.com/embed/laf64Ms0yV4",
              },
              {
                id: "react-advanced-2",
                title: "Concurrent Rendering Deep Dive",
                videoUrl: "https://www.youtube.com/embed/sjgA23G-TXU",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "nodejs-backend",
    title: "Node.js Backend Development",
    description: "Design and deploy APIs with Node.js, Express, and modern tooling.",
    category: "backend",
    difficulty: "Intermediate",
    duration: "14 hours",
    prerequisites: ["JavaScript", "HTTP fundamentals"],
    modules: [
      {
        id: "node-beginner",
        title: "Beginner Foundations",
        sections: [
          {
            id: "node-beginner-core",
            title: "Runtime Essentials",
            lessons: [
              {
                id: "node-beginner-1",
                title: "Node.js Crash Course",
                videoUrl: "https://www.youtube.com/embed/fBNz5xF-Kx4",
              },
              {
                id: "node-beginner-2",
                title: "Node.js Architecture & Event Loop",
                videoUrl: "https://www.youtube.com/embed/TlB_eWDSMt4",
              },
            ],
          },
        ],
      },
      {
        id: "node-intermediate",
        title: "Intermediate APIs",
        sections: [
          {
            id: "node-intermediate-express",
            title: "Express Patterns",
            lessons: [
              {
                id: "node-intermediate-1",
                title: "Express.js Crash Course",
                videoUrl: "https://www.youtube.com/embed/L72fhGm1tfE",
              },
              {
                id: "node-intermediate-2",
                title: "Middleware, Routing & Validation",
                videoUrl: "https://www.youtube.com/embed/lY6icfhap2o",
              },
            ],
          },
        ],
      },
      {
        id: "node-advanced",
        title: "Advanced Scalability",
        sections: [
          {
            id: "node-advanced-scale",
            title: "Scaling Node in Production",
            lessons: [
              {
                id: "node-advanced-1",
                title: "Building Node.js Projects at Scale",
                videoUrl: "https://www.youtube.com/embed/_H6td2GaW3I",
              },
              {
                id: "node-advanced-2",
                title: "Scale Node APIs to Millions",
                videoUrl: "https://www.youtube.com/embed/tv4nLn9brPQ",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "python-backend",
    title: "Python Backend with Django",
    description: "Ship production-ready web apps and APIs using Django and Django REST Framework.",
    category: "backend",
    difficulty: "Intermediate",
    duration: "16 hours",
    prerequisites: ["Python basics", "Relational databases"],
    modules: [
      {
        id: "django-beginner",
        title: "Beginner Foundations",
        sections: [
          {
            id: "django-beginner-core",
            title: "Framework Fundamentals",
            lessons: [
              {
                id: "django-beginner-1",
                title: "Django Crash Course",
                videoUrl: "https://www.youtube.com/embed/F5mRW0jo-U4",
              },
              {
                id: "django-beginner-2",
                title: "Django Models & ORM",
                videoUrl: "https://www.youtube.com/embed/rHux0gMZ3Eg",
              },
            ],
          },
        ],
      },
      {
        id: "django-intermediate",
        title: "Intermediate APIs",
        sections: [
          {
            id: "django-intermediate-drf",
            title: "Django REST Framework",
            lessons: [
              {
                id: "django-intermediate-1",
                title: "Django REST Framework Crash Course",
                videoUrl: "https://www.youtube.com/embed/Mj3dGdBdiO4",
              },
              {
                id: "django-intermediate-2",
                title: "JWT Auth with Django & DRF",
                videoUrl: "https://www.youtube.com/embed/Xp0-Yy5ow5k",
              },
            ],
          },
        ],
      },
      {
        id: "django-advanced",
        title: "Advanced Operations",
        sections: [
          {
            id: "django-advanced-scale",
            title: "Scaling & Observability",
            lessons: [
              {
                id: "django-advanced-1",
                title: "Scale Django with Prometheus & Grafana",
                videoUrl: "https://www.youtube.com/embed/YlYL0uTgmZ0",
              },
              {
                id: "django-advanced-2",
                title: "Django Channels & WebSockets",
                videoUrl: "https://www.youtube.com/embed/cw8-KFVXpTE",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "aws-cloud",
    title: "AWS Cloud Practitioner",
    description: "Understand AWS core services and architect your first workloads.",
    category: "cloud",
    difficulty: "Beginner",
    duration: "15 hours",
    modules: [
      {
        id: "aws-beginner",
        title: "Beginner Foundations",
        sections: [
          {
            id: "aws-beginner-core",
            title: "Cloud & AWS Essentials",
            lessons: [
              {
                id: "aws-beginner-1",
                title: "AWS Cloud Practitioner Full Course",
                videoUrl: "https://www.youtube.com/embed/3hLmDS179YE",
              },
              {
                id: "aws-beginner-2",
                title: "AWS Console Tour",
                videoUrl: "https://www.youtube.com/embed/HwDlZsheaNg",
              },
            ],
          },
        ],
      },
      {
        id: "aws-intermediate",
        title: "Intermediate Deployments",
        sections: [
          {
            id: "aws-intermediate-ec2",
            title: "Compute & Networking",
            lessons: [
              {
                id: "aws-intermediate-1",
                title: "Launch Your First EC2 Instance",
                videoUrl: "https://www.youtube.com/embed/YH_DVenJHII",
              },
              {
                id: "aws-intermediate-2",
                title: "AWS VPC Console Deep Dive",
                videoUrl: "https://www.youtube.com/embed/3FumWkHSusY",
              },
            ],
          },
        ],
      },
      {
        id: "aws-advanced",
        title: "Advanced Architecture",
        sections: [
          {
            id: "aws-advanced-architect",
            title: "Design for Scale & Reliability",
            lessons: [
              {
                id: "aws-advanced-1",
                title: "AWS Solutions Architect Full Course",
                videoUrl: "https://www.youtube.com/embed/BCVRXbBAm7Y",
              },
              {
                id: "aws-advanced-2",
                title: "Serverless Architectures on AWS",
                videoUrl: "https://www.youtube.com/embed/qQk94CjRvIs",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "kubernetes-for-developers",
    title: "Kubernetes for Developers",
    description: "Package, deploy, and operate services on Kubernetes clusters.",
    category: "cloud",
    difficulty: "Intermediate",
    duration: "16 hours",
    prerequisites: ["Docker", "Containers"],
    modules: [
      {
        id: "k8s-beginner",
        title: "Beginner Foundations",
        sections: [
          {
            id: "k8s-beginner-core",
            title: "Cluster Fundamentals",
            lessons: [
              {
                id: "k8s-beginner-1",
                title: "Kubernetes Crash Course",
                videoUrl: "https://www.youtube.com/embed/X48VuDVv0do",
              },
              {
                id: "k8s-beginner-2",
                title: "Hands-on Kubernetes Tutorial",
                videoUrl: "https://www.youtube.com/embed/s_o8dwzRlu4",
              },
            ],
          },
        ],
      },
      {
        id: "k8s-intermediate",
        title: "Intermediate Operations",
        sections: [
          {
            id: "k8s-intermediate-ops",
            title: "State & Networking",
            lessons: [
              {
                id: "k8s-intermediate-1",
                title: "Stateful Workloads & Persistence",
                videoUrl: "https://www.youtube.com/embed/688K9UlEbPk",
              },
              {
                id: "k8s-intermediate-2",
                title: "Kubernetes Ingress Deep Dive",
                videoUrl: "https://www.youtube.com/embed/80Ew_fsV4rM",
              },
            ],
          },
        ],
      },
      {
        id: "k8s-advanced",
        title: "Advanced Production",
        sections: [
          {
            id: "k8s-advanced-best-practices",
            title: "Best Practices & Security",
            lessons: [
              {
                id: "k8s-advanced-1",
                title: "15 Kubernetes Best Practices",
                videoUrl: "https://www.youtube.com/embed/jImA5Nv9sAg",
              },
              {
                id: "k8s-advanced-2",
                title: "Secure Your Kubernetes Cluster",
                videoUrl: "https://www.youtube.com/embed/itQnRQlYFBA",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "python-data-science",
    title: "Python for Data Science",
    description: "Clean, analyze, and visualize data with Python, Pandas, and NumPy.",
    category: "data-science",
    difficulty: "Beginner",
    duration: "18 hours",
    prerequisites: ["Basic Python"],
    modules: [
      {
        id: "pds-beginner",
        title: "Beginner Foundations",
        sections: [
          {
            id: "pds-beginner-core",
            title: "Data Science Basics",
            lessons: [
              {
                id: "pds-beginner-1",
                title: "What is Data Science?",
                videoUrl: "https://www.youtube.com/embed/ua-CiDNNj30",
              },
              {
                id: "pds-beginner-2",
                title: "Data Analysis with Python",
                videoUrl: "https://www.youtube.com/embed/CMEWVn1uZpQ",
              },
            ],
          },
        ],
      },
      {
        id: "pds-intermediate",
        title: "Intermediate Analytics",
        sections: [
          {
            id: "pds-intermediate-libraries",
            title: "Pandas & Visualization",
            lessons: [
              {
                id: "pds-intermediate-1",
                title: "Pandas Tutorial",
                videoUrl: "https://www.youtube.com/embed/vmEHCJofslg",
              },
              {
                id: "pds-intermediate-2",
                title: "Matplotlib & Seaborn Crash Course",
                videoUrl: "https://www.youtube.com/embed/DAQNHzOcO5A",
              },
            ],
          },
        ],
      },
      {
        id: "pds-advanced",
        title: "Advanced Projects",
        sections: [
          {
            id: "pds-advanced-projects",
            title: "End-to-End Pipelines",
            lessons: [
              {
                id: "pds-advanced-1",
                title: "End-to-End Data Science Project",
                videoUrl: "https://www.youtube.com/embed/1m3CPP-93RI",
              },
              {
                id: "pds-advanced-2",
                title: "Data Engineering for Analysts",
                videoUrl: "https://www.youtube.com/embed/oXLxbk5USFg",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "machine-learning",
    title: "Machine Learning Fundamentals",
    description: "Train, evaluate, and tune models with scikit-learn and Python.",
    category: "data-science",
    difficulty: "Advanced",
    duration: "20 hours",
    prerequisites: ["Python", "Statistics", "Linear Algebra"],
    modules: [
      {
        id: "ml-beginner",
        title: "Beginner Foundations",
        sections: [
          {
            id: "ml-beginner-core",
            title: "ML Concepts",
            lessons: [
              {
                id: "ml-beginner-1",
                title: "Machine Learning Crash Course",
                videoUrl: "https://www.youtube.com/embed/ukzFI9rgwfU",
              },
              {
                id: "ml-beginner-2",
                title: "Intro to Neural Networks",
                videoUrl: "https://www.youtube.com/embed/JhHMJCUmq28",
              },
            ],
          },
        ],
      },
      {
        id: "ml-intermediate",
        title: "Intermediate Modeling",
        sections: [
          {
            id: "ml-intermediate-scikit",
            title: "Modeling with scikit-learn",
            lessons: [
              {
                id: "ml-intermediate-1",
                title: "Scikit-learn Crash Course",
                videoUrl: "https://www.youtube.com/embed/0B5eIE_1vpU",
              },
              {
                id: "ml-intermediate-2",
                title: "Feature Engineering Walkthrough",
                videoUrl: "https://www.youtube.com/embed/GduT2ZCc26E",
              },
            ],
          },
        ],
      },
      {
        id: "ml-advanced",
        title: "Advanced Techniques",
        sections: [
          {
            id: "ml-advanced-boosting",
            title: "Boosting & Model Tuning",
            lessons: [
              {
                id: "ml-advanced-1",
                title: "XGBoost Explained",
                videoUrl: "https://www.youtube.com/embed/OtD8wVaFm6E",
              },
              {
                id: "ml-advanced-2",
                title: "Hyperparameter Optimization",
                videoUrl: "https://www.youtube.com/embed/fSytzGwwBVw",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "postgresql",
    title: "PostgreSQL Database Mastery",
    description: "Design schemas, optimize queries, and operate PostgreSQL clusters.",
    category: "databases",
    difficulty: "Intermediate",
    duration: "12 hours",
    prerequisites: ["SQL fundamentals"],
    modules: [
      {
        id: "postgres-beginner",
        title: "Beginner Foundations",
        sections: [
          {
            id: "postgres-beginner-core",
            title: "SQL & Schema Basics",
            lessons: [
              {
                id: "postgres-beginner-1",
                title: "PostgreSQL Crash Course",
                videoUrl: "https://www.youtube.com/embed/qw--VYLpxG4",
              },
              {
                id: "postgres-beginner-2",
                title: "Database Design in PostgreSQL",
                videoUrl: "https://www.youtube.com/embed/ztHopE5Wnpc",
              },
            ],
          },
        ],
      },
      {
        id: "postgres-intermediate",
        title: "Intermediate Performance",
        sections: [
          {
            id: "postgres-intermediate-indexing",
            title: "Indexes & Query Planning",
            lessons: [
              {
                id: "postgres-intermediate-1",
                title: "Database Indexing Explained",
                videoUrl: "https://www.youtube.com/embed/-qNSXK7s7_w",
              },
              {
                id: "postgres-intermediate-2",
                title: "Query Planning & Optimization",
                videoUrl: "https://www.youtube.com/embed/sJN5UwC60bM",
              },
            ],
          },
        ],
      },
      {
        id: "postgres-advanced",
        title: "Advanced Operations",
        sections: [
          {
            id: "postgres-advanced-replication",
            title: "Replication & High Availability",
            lessons: [
              {
                id: "postgres-advanced-1",
                title: "Set Up PostgreSQL Replication",
                videoUrl: "https://www.youtube.com/embed/VtBVofpdXyk",
              },
              {
                id: "postgres-advanced-2",
                title: "PostgreSQL Disaster Recovery",
                videoUrl: "https://www.youtube.com/embed/Yy0GJjRQcRQ",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "mongodb",
    title: "MongoDB NoSQL Database",
    description: "Model flexible documents and aggregate data with MongoDB.",
    category: "databases",
    difficulty: "Beginner",
    duration: "10 hours",
    modules: [
      {
        id: "mongodb-beginner",
        title: "Beginner Foundations",
        sections: [
          {
            id: "mongodb-beginner-core",
            title: "Getting Started with MongoDB",
            lessons: [
              {
                id: "mongodb-beginner-1",
                title: "MongoDB Crash Course",
                videoUrl: "https://www.youtube.com/embed/-56x56UppqQ",
              },
              {
                id: "mongodb-beginner-2",
                title: "CRUD with MongoDB",
                videoUrl: "https://www.youtube.com/embed/ExcRbA7fy_A",
              },
            ],
          },
        ],
      },
      {
        id: "mongodb-intermediate",
        title: "Intermediate Modeling",
        sections: [
          {
            id: "mongodb-intermediate-schema",
            title: "Schema Design & Validation",
            lessons: [
              {
                id: "mongodb-intermediate-1",
                title: "MongoDB Schema & Data Models",
                videoUrl: "https://www.youtube.com/embed/jZ-dzj6ut54",
              },
              {
                id: "mongodb-intermediate-2",
                title: "Data Modeling Fundamentals",
                videoUrl: "https://www.youtube.com/embed/hmGz79ae2AY",
              },
            ],
          },
        ],
      },
      {
        id: "mongodb-advanced",
        title: "Advanced Aggregations",
        sections: [
          {
            id: "mongodb-advanced-aggregation",
            title: "Aggregation Framework",
            lessons: [
              {
                id: "mongodb-advanced-1",
                title: "Intro to MongoDB Aggregations",
                videoUrl: "https://www.youtube.com/embed/GL7V1TCPG1U",
              },
              {
                id: "mongodb-advanced-2",
                title: "Aggregation Pipelines in Practice",
                videoUrl: "https://www.youtube.com/embed/Kk6Er0c7srU",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "restful-apis",
    title: "RESTful API Development",
    description: "Design, secure, and scale REST APIs end-to-end.",
    category: "apis",
    difficulty: "Intermediate",
    duration: "14 hours",
    prerequisites: ["HTTP", "Backend framework"],
    modules: [
      {
        id: "rest-beginner",
        title: "Beginner Foundations",
        sections: [
          {
            id: "rest-beginner-core",
            title: "REST Essentials",
            lessons: [
              {
                id: "rest-beginner-1",
                title: "REST API Tutorial",
                videoUrl: "https://www.youtube.com/embed/fgTGADljAeg",
              },
              {
                id: "rest-beginner-2",
                title: "Best Practices for API Design",
                videoUrl: "https://www.youtube.com/embed/lsMQRaeKNDk",
              },
            ],
          },
        ],
      },
      {
        id: "rest-intermediate",
        title: "Intermediate Security",
        sections: [
          {
            id: "rest-intermediate-auth",
            title: "Authentication & Testing",
            lessons: [
              {
                id: "rest-intermediate-1",
                title: "JWT Auth for REST APIs",
                videoUrl: "https://www.youtube.com/embed/mbsmsi7l3r4",
              },
              {
                id: "rest-intermediate-2",
                title: "Test REST APIs with Postman",
                videoUrl: "https://www.youtube.com/embed/hcl22tD-xf4",
              },
            ],
          },
        ],
      },
      {
        id: "rest-advanced",
        title: "Advanced Architecture",
        sections: [
          {
            id: "rest-advanced-gateway",
            title: "Microservices & Gateways",
            lessons: [
              {
                id: "rest-advanced-1",
                title: "API Gateway with Spring Cloud",
                videoUrl: "https://www.youtube.com/embed/EKoq98KqvrI",
              },
              {
                id: "rest-advanced-2",
                title: "Rate Limiting & Throttling",
                videoUrl: "https://www.youtube.com/embed/_qNHROq0pGk",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "building-apis-fastapi",
    title: "Building APIs with FastAPI",
    description: "Deliver high-performance Python APIs with FastAPI and SQLModel.",
    category: "apis",
    difficulty: "Intermediate",
    duration: "12 hours",
    prerequisites: ["Python", "REST fundamentals"],
    modules: [
      {
        id: "fastapi-beginner",
        title: "Beginner Foundations",
        sections: [
          {
            id: "fastapi-beginner-core",
            title: "Framework Basics",
            lessons: [
              {
                id: "fastapi-beginner-1",
                title: "FastAPI Crash Course",
                videoUrl: "https://www.youtube.com/embed/0sOvCWFmrtA",
              },
              {
                id: "fastapi-beginner-2",
                title: "FastAPI Project Walkthrough",
                videoUrl: "https://www.youtube.com/embed/7t2alSnE2-I",
              },
            ],
          },
        ],
      },
      {
        id: "fastapi-intermediate",
        title: "Intermediate Data Layer",
        sections: [
          {
            id: "fastapi-intermediate-persistence",
            title: "SQLModel & Relationships",
            lessons: [
              {
                id: "fastapi-intermediate-1",
                title: "SQLModel + FastAPI",
                videoUrl: "https://www.youtube.com/embed/GONyd0CUrPc",
              },
              {
                id: "fastapi-intermediate-2",
                title: "Background Tasks & Async",
                videoUrl: "https://www.youtube.com/embed/eAHAKowv6hk",
              },
            ],
          },
        ],
      },
      {
        id: "fastapi-advanced",
        title: "Advanced Security",
        sections: [
          {
            id: "fastapi-advanced-auth",
            title: "OAuth2 & JWT",
            lessons: [
              {
                id: "fastapi-advanced-1",
                title: "FastAPI Authentication APIs",
                videoUrl: "https://www.youtube.com/embed/ac4p2jelZdk",
              },
              {
                id: "fastapi-advanced-2",
                title: "Secure FastAPI with JWT",
                videoUrl: "https://www.youtube.com/embed/KxR3OONvDvo",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "nextjs-app-router",
    title: "Next.js App Router Mastery",
    description: "Build production-ready applications with the Next.js App Router and modern rendering patterns.",
    category: "frontend",
    difficulty: "Intermediate",
    duration: "11 hours",
    prerequisites: ["React fundamentals"],
    modules: [
      {
        id: "nextjs-app-router-beginner",
        title: "Beginner Foundations",
        sections: [
          {
            id: "nextjs-app-router-intro",
            title: "Getting Started",
            lessons: [
              {
                id: "nextjs-app-router-lesson-1",
                title: "Next.js 13 Crash Course",
                videoUrl: "https://www.youtube.com/embed/T63nY70eZF0",
              },
            ],
          },
        ],
      },
      {
        id: "nextjs-app-router-intermediate",
        title: "Intermediate Projects",
        sections: [
          {
            id: "nextjs-app-router-routing",
            title: "Routing & Data Fetching",
            lessons: [
              {
                id: "nextjs-app-router-lesson-2",
                title: "Next.js App Router Deep Dive",
                videoUrl: "https://www.youtube.com/embed/__mSgDEOyv8",
              },
            ],
          },
        ],
      },
      {
        id: "nextjs-app-router-advanced",
        title: "Advanced Production",
        sections: [
          {
            id: "nextjs-app-router-production",
            title: "Performance & Deployment",
            lessons: [
              {
                id: "nextjs-app-router-lesson-3",
                title: "NextJS App Router: Learn Modern Web Development",
                videoUrl: "https://www.youtube.com/embed/Sbl04kOL1dM",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "vue-pro-engineer",
    title: "Vue 3 Professional Engineer",
    description: "Ship delightful Vue 3 interfaces with the Composition API, Pinia, and Vue Router.",
    category: "frontend",
    difficulty: "Intermediate",
    duration: "10 hours",
    prerequisites: ["JavaScript", "HTML & CSS"],
    modules: [
      {
        id: "vue-pro-beginner",
        title: "Beginner Foundations",
        sections: [
          {
            id: "vue-pro-intro",
            title: "Vue Basics",
            lessons: [
              {
                id: "vue-pro-lesson-1",
                title: "Vue JS Crash Course",
                videoUrl: "https://www.youtube.com/embed/Wy9q22isx3U",
              },
            ],
          },
        ],
      },
      {
        id: "vue-pro-intermediate",
        title: "Intermediate Projects",
        sections: [
          {
            id: "vue-pro-components",
            title: "Composition API & Tooling",
            lessons: [
              {
                id: "vue-pro-lesson-2",
                title: "Vue 3 Crash Course",
                videoUrl: "https://www.youtube.com/embed/qZXt1Aom3Cs",
              },
            ],
          },
        ],
      },
      {
        id: "vue-pro-advanced",
        title: "Advanced Production",
        sections: [
          {
            id: "vue-pro-architecture",
            title: "Scaling Vue Apps",
            lessons: [
              {
                id: "vue-pro-lesson-3",
                title: "Vue 3 Tutorial for Beginners",
                videoUrl: "https://www.youtube.com/embed/ZqgiuPt5QZo",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "sveltekit-essentials",
    title: "SvelteKit Essentials",
    description: "Learn to build fast, dynamic web apps with SvelteKit, endpoints, and progressive enhancement.",
    category: "frontend",
    difficulty: "Intermediate",
    duration: "9 hours",
    prerequisites: ["JavaScript", "Svelte"],
    modules: [
      {
        id: "sveltekit-beginner",
        title: "Beginner Foundations",
        sections: [
          {
            id: "sveltekit-intro",
            title: "Getting Started",
            lessons: [
              {
                id: "sveltekit-lesson-1",
                title: "SvelteKit Crash Course",
                videoUrl: "https://www.youtube.com/embed/9OlLxkaeVvw",
              },
            ],
          },
        ],
      },
      {
        id: "sveltekit-intermediate",
        title: "Intermediate Projects",
        sections: [
          {
            id: "sveltekit-interactivity",
            title: "Progressive Enhancement",
            lessons: [
              {
                id: "sveltekit-lesson-2",
                title: "SvelteKit in 8 Minutes",
                videoUrl: "https://www.youtube.com/embed/UU7MgYIbtAk",
              },
            ],
          },
        ],
      },
      {
        id: "sveltekit-advanced",
        title: "Advanced Production",
        sections: [
          {
            id: "sveltekit-auth",
            title: "Authentication & Data",
            lessons: [
              {
                id: "sveltekit-lesson-3",
                title: "SvelteKit Authentication Tutorial",
                videoUrl: "https://www.youtube.com/embed/SXmnrF3xfKo",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "angular-enterprise",
    title: "Angular Enterprise Foundations",
    description: "Design enterprise-grade SPA architectures with Angular, RxJS, and Nx workflows.",
    category: "frontend",
    difficulty: "Intermediate",
    duration: "13 hours",
    prerequisites: ["TypeScript", "Modern JavaScript"],
    tags: ["Angular", "TypeScript", "RxJS", "SPA"],
    roles: ["Frontend Engineer", "UI Engineer", "Solutions Architect"],
    tools: ["Angular CLI", "RxJS", "Nx", "Jest"],
    outcomes: [
      "Build production-ready Angular applications",
      "Implement reactive state management with RxJS",
      "Adopt Nx monorepo workflows for large teams",
    ],
    languages: ["en"],
    status: "live",
    syllabusUrl: "https://angular.io/guide/roadmap",
    projectBriefs: [
      {
        id: "angular-admin-dashboard",
        title: "Reactive Admin Dashboard",
        description: "Craft a modular admin workspace with real-time analytics and role-based access.",
        deliverables: ["Dashboard shell with dynamic routing", "Reusable chart components", "Role-protected feature modules"],
        difficulty: "Intermediate",
      },
    ],
    assessments: [
      {
        id: "angular-foundations-quiz",
        title: "Angular Foundations Quiz",
        type: "quiz",
        description: "Validate your understanding of dependency injection, change detection, and RxJS pipelines.",
      },
      {
        id: "angular-architecture-review",
        title: "Architecture Review Assignment",
        type: "assignment",
        description: "Document architectural decisions for an Angular monorepo and share trade-offs.",
      },
    ],
    modules: [
      {
        id: "angular-foundations",
        title: "Angular Fundamentals",
        sections: [
          {
            id: "angular-core-lessons",
            title: "Core Concepts",
            lessons: [
              {
                id: "angular-foundations-1",
                title: "Angular Crash Course",
                videoUrl: "https://www.youtube.com/embed/2OHbjep_WjQ",
              },
              {
                id: "angular-foundations-2",
                title: "Change Detection & Zone.js Deep Dive",
                videoUrl: "https://www.youtube.com/embed/f8qBeaGe2S4",
              },
            ],
          },
        ],
      },
      {
        id: "angular-architecture",
        title: "Scalable Architecture",
        sections: [
          {
            id: "angular-architecture-patterns",
            title: "Enterprise Patterns",
            lessons: [
              {
                id: "angular-architecture-1",
                title: "Nx Workspace Strategy",
                videoUrl: "https://www.youtube.com/embed/BfEjDD8mWYg",
              },
              {
                id: "angular-architecture-2",
                title: "Reactive Forms & State Isolation",
                videoUrl: "https://www.youtube.com/embed/JeeUY6WaXiA",
              },
            ],
          },
        ],
      },
      {
        id: "angular-production",
        title: "Production Excellence",
        sections: [
          {
            id: "angular-performance",
            title: "Performance & Testing",
            lessons: [
              {
                id: "angular-production-1",
                title: "Angular Performance Optimization",
                videoUrl: "https://www.youtube.com/embed/SRXuxMP8QLg",
              },
              {
                id: "angular-production-2",
                title: "Testing Angular with Jest",
                videoUrl: "https://www.youtube.com/embed/c57llB8QA2E",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "design-systems-storybook",
    title: "Design Systems with Storybook",
    description: "Create resilient design systems that bridge design and engineering using Storybook and design tokens.",
    category: "frontend",
    difficulty: "Intermediate",
    duration: "11 hours",
    prerequisites: ["React fundamentals", "Design basics"],
    tags: ["Design Systems", "Storybook", "Design Tokens", "Accessibility"],
    roles: ["Design Engineer", "Frontend Architect", "Product Designer"],
    tools: ["Storybook", "Figma", "Chromatic", "Token Studio"],
    outcomes: [
      "Publish a living design system with Storybook",
      "Sync design tokens between Figma and code",
      "Automate visual regression testing with Chromatic",
    ],
    languages: ["en"],
    status: "live",
    projectBriefs: [
      {
        id: "storybook-design-system",
        title: "Cross-platform Design System",
        description: "Ship a cohesive design system with typography, color, component primitives, and accessibility guidelines.",
        deliverables: ["Storybook documentation site", "Token pipeline script", "Accessibility checklist"],
        difficulty: "Advanced",
      },
    ],
    assessments: [
      {
        id: "design-system-review",
        title: "Component Architecture Case Study",
        type: "assignment",
        description: "Evaluate component composition strategies for multi-brand systems.",
      },
    ],
    modules: [
      {
        id: "design-system-foundations",
        title: "Foundational Principles",
        sections: [
          {
            id: "design-system-principles",
            title: "Design System Strategy",
            lessons: [
              {
                id: "design-system-1",
                title: "Design Systems 101",
                videoUrl: "https://www.youtube.com/embed/wDBEc3dJJV8",
              },
              {
                id: "design-system-2",
                title: "Design Tokens in Practice",
                videoUrl: "https://www.youtube.com/embed/OMGTP2QpfiY",
              },
            ],
          },
        ],
      },
      {
        id: "storybook-workflows",
        title: "Storybook Workflows",
        sections: [
          {
            id: "storybook-setup",
            title: "Component Documentation",
            lessons: [
              {
                id: "design-system-3",
                title: "Storybook Tutorial",
                videoUrl: "https://www.youtube.com/embed/BySFuXgG-ow",
              },
              {
                id: "design-system-4",
                title: "Chromatic Visual QA",
                videoUrl: "https://www.youtube.com/embed/AGyUh_ta3TU",
              },
            ],
          },
        ],
      },
      {
        id: "design-system-scale",
        title: "Scaling & Governance",
        sections: [
          {
            id: "design-system-governance",
            title: "Governance & Adoption",
            lessons: [
              {
                id: "design-system-5",
                title: "Scaling Design Systems",
                videoUrl: "https://www.youtube.com/embed/9w-BwzcuxYM",
              },
              {
                id: "design-system-6",
                title: "Accessibility in Design Systems",
                videoUrl: "https://www.youtube.com/embed/SHIL8sVSakE",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "web-performance-optimization",
    title: "Web Performance Optimization",
    description: "Deliver lightning-fast experiences using Core Web Vitals, edge caching, and performance tooling.",
    category: "frontend",
    difficulty: "Advanced",
    duration: "10 hours",
    prerequisites: ["HTML & CSS", "JavaScript", "Web fundamentals"],
    tags: ["Performance", "Core Web Vitals", "Edge", "Profiling"],
    roles: ["Performance Engineer", "Frontend Architect", "Technical Lead"],
    tools: ["Lighthouse", "Chrome DevTools", "WebPageTest", "Vercel"],
    outcomes: [
      "Optimize Core Web Vitals across devices",
      "Implement edge caching and image optimization",
      "Diagnose performance bottlenecks using DevTools",
    ],
    languages: ["en"],
    status: "beta",
    projectBriefs: [
      {
        id: "performance-audit",
        title: "Performance Audit & Remediation",
        description: "Audit a real-world application, prioritize fixes, and implement optimizations.",
        deliverables: ["Before/after Lighthouse reports", "Optimization roadmap", "Automated performance tests"],
        difficulty: "Advanced",
      },
    ],
    assessments: [
      {
        id: "web-vitals-quiz",
        title: "Core Web Vitals Quiz",
        type: "quiz",
        description: "Check your knowledge of CLS, LCP, INP, and optimization levers.",
      },
    ],
    modules: [
      {
        id: "performance-metrics",
        title: "Measuring Performance",
        sections: [
          {
            id: "performance-metrics-basics",
            title: "Core Metrics",
            lessons: [
              {
                id: "performance-1",
                title: "Core Web Vitals in 2025",
                videoUrl: "https://www.youtube.com/embed/sE08f4iuOhA",
              },
              {
                id: "performance-2",
                title: "Web Performance 101",
                videoUrl: "https://www.youtube.com/embed/0fONene3OIA",
              },
            ],
          },
        ],
      },
      {
        id: "performance-optimization",
        title: "Hands-on Optimization",
        sections: [
          {
            id: "performance-optimization-patterns",
            title: "Optimization Patterns",
            lessons: [
              {
                id: "performance-3",
                title: "Image Optimization Strategies",
                videoUrl: "https://www.youtube.com/embed/z6AoFvVCvg0",
              },
              {
                id: "performance-4",
                title: "JavaScript Performance Audits",
                videoUrl: "https://www.youtube.com/embed/EA9bRtw8slU",
              },
            ],
          },
        ],
      },
      {
        id: "performance-edge",
        title: "Edge & Automation",
        sections: [
          {
            id: "performance-edge-platforms",
            title: "Edge Delivery",
            lessons: [
              {
                id: "performance-5",
                title: "Next.js Performance Best Practices",
                videoUrl: "https://www.youtube.com/embed/LkDelp5WWYU",
              },
              {
                id: "performance-6",
                title: "Automating Performance Budgets",
                videoUrl: "https://www.youtube.com/embed/KTkJ3FYdqFI",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "go-backend-blueprints",
    title: "Go Backend Blueprints",
    description: "Design fast, concurrent backend services using Go, Chi, and modern tooling.",
    category: "backend",
    difficulty: "Intermediate",
    duration: "13 hours",
    prerequisites: ["Programming fundamentals"],
    modules: [
      {
        id: "go-backend-beginner",
        title: "Beginner Foundations",
        sections: [
          {
            id: "go-backend-intro",
            title: "Language Basics",
            lessons: [
              {
                id: "go-backend-lesson-1",
                title: "Go / Golang Crash Course",
                videoUrl: "https://www.youtube.com/embed/SqrbIlUwR0U",
              },
            ],
          },
        ],
      },
      {
        id: "go-backend-intermediate",
        title: "Intermediate Services",
        sections: [
          {
            id: "go-backend-concurrency",
            title: "Concurrency & Channels",
            lessons: [
              {
                id: "go-backend-lesson-2",
                title: "Golang Concurrency Explained",
                videoUrl: "https://www.youtube.com/embed/eqSgTJ6HTsw",
              },
            ],
          },
        ],
      },
      {
        id: "go-backend-advanced",
        title: "Advanced Production",
        sections: [
          {
            id: "go-backend-microservices",
            title: "Microservices & Deployment",
            lessons: [
              {
                id: "go-backend-lesson-3",
                title: "Build a Microservice with Go",
                videoUrl: "https://www.youtube.com/embed/wpnN3RIRSxs",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "nextjs-edge-architectures",
    title: "Next.js Edge Architectures",
    description: "Build ultra-fast edge-rendered experiences with Next.js 14, streaming, and global caching.",
    category: "frontend",
    difficulty: "Advanced",
    duration: "12 hours",
    prerequisites: ["React", "TypeScript", "Vercel deployment"],
    tags: ["Next.js", "Edge", "Streaming", "Caching"],
    roles: ["Frontend Architect", "Performance Engineer", "Tech Lead"],
    tools: ["Next.js 14", "Vercel", "Edge Config", "Segment"],
    outcomes: [
      "Implement streaming and partial rendering with Next.js",
      "Design edge-first caching strategies",
      "Instrument observability for user-centric performance",
    ],
    languages: ["en"],
    status: "live",
    projectBriefs: [
      {
        id: "nextjs-edge-commerce",
        title: "Edge-native Commerce Experience",
        description: "Launch a personalized commerce storefront using edge rendering and segmentation.",
        deliverables: ["Streaming product page", "Edge-configured personalization rules", "Observability dashboard"],
        difficulty: "Advanced",
      },
    ],
    assessments: [
      {
        id: "nextjs-edge-audit",
        title: "Edge Architecture Assessment",
        type: "assignment",
        description: "Review and critique an edge deployment diagram for latency bottlenecks.",
      },
    ],
    modules: [
      {
        id: "nextjs-edge-foundations",
        title: "Edge Rendering Foundations",
        sections: [
          {
            id: "nextjs-edge-streaming",
            title: "Streaming & Partial Rendering",
            lessons: [
              {
                id: "nextjs-edge-1",
                title: "Next.js Streaming Layouts",
                videoUrl: "https://www.youtube.com/embed/9REGGiU8hck",
              },
              {
                id: "nextjs-edge-2",
                title: "Building at the Edge",
                videoUrl: "https://www.youtube.com/embed/97TlBd-Uhjw",
              },
            ],
          },
        ],
      },
      {
        id: "nextjs-edge-platform",
        title: "Platform Integrations",
        sections: [
          {
            id: "nextjs-edge-config",
            title: "Edge Config & Personalization",
            lessons: [
              {
                id: "nextjs-edge-3",
                title: "Edge Config Deep Dive",
                videoUrl: "https://www.youtube.com/embed/nHGi95l87UA",
              },
              {
                id: "nextjs-edge-4",
                title: "Experimentation & Analytics",
                videoUrl: "https://www.youtube.com/embed/zFMgpxG-chM",
              },
            ],
          },
        ],
      },
      {
        id: "nextjs-edge-operations",
        title: "Observability & Operations",
        sections: [
          {
            id: "nextjs-edge-observability",
            title: "Monitoring Edge Apps",
            lessons: [
              {
                id: "nextjs-edge-5",
                title: "Observability Patterns for Frontend Engineers",
                videoUrl: "https://www.youtube.com/embed/YxvtH0_tJJY",
              },
              {
                id: "nextjs-edge-6",
                title: "Real User Monitoring in Next.js",
                videoUrl: "https://www.youtube.com/embed/MZoADO3cBGo",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "spring-boot-microservices",
    title: "Spring Boot Microservices",
    description: "Create resilient Java microservices with Spring Boot, Spring Security, and Spring Cloud.",
    category: "backend",
    difficulty: "Advanced",
    duration: "15 hours",
    prerequisites: ["Java", "Spring Framework"],
    modules: [
      {
        id: "spring-boot-beginner",
        title: "Beginner Foundations",
        sections: [
          {
            id: "spring-boot-intro",
            title: "Boot Fundamentals",
            lessons: [
              {
                id: "spring-boot-lesson-1",
                title: "Spring Boot Tutorial",
                videoUrl: "https://www.youtube.com/embed/9SGDpanrc8U",
              },
            ],
          },
        ],
      },
      {
        id: "spring-boot-intermediate",
        title: "Intermediate Services",
        sections: [
          {
            id: "spring-boot-system",
            title: "System Design & Observability",
            lessons: [
              {
                id: "spring-boot-lesson-2",
                title: "Spring Boot End-to-End Tutorial",
                videoUrl: "https://www.youtube.com/embed/GAgelbsTb9M",
              },
            ],
          },
        ],
      },
      {
        id: "spring-boot-advanced",
        title: "Advanced Production",
        sections: [
          {
            id: "spring-boot-security",
            title: "Security & Hardening",
            lessons: [
              {
                id: "spring-boot-lesson-3",
                title: "Securing Spring Boot REST APIs",
                videoUrl: "https://www.youtube.com/embed/Sdixla2yjSI",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "rust-web-services",
    title: "Rust Web Services at Scale",
    description: "Deliver high-performance APIs with Rust, Actix Web, and modern async tooling.",
    category: "backend",
    difficulty: "Advanced",
    duration: "14 hours",
    prerequisites: ["Rust fundamentals", "HTTP"],
    tags: ["Rust", "Actix", "Async", "Performance"],
    roles: ["Backend Engineer", "Systems Engineer", "Performance Engineer"],
    tools: ["Rust", "Actix Web", "Tokio", "Diesel"],
    outcomes: [
      "Build safe, concurrent web services in Rust",
      "Implement async patterns with Tokio and Actix",
      "Deploy Rust APIs with optimized Docker images",
    ],
    languages: ["en"],
    status: "live",
    projectBriefs: [
      {
        id: "rust-observability-api",
        title: "Telemetry-enabled Rust API",
        description: "Create a telemetry-aware API with structured logging, metrics, and tracing integration.",
        deliverables: ["OpenTelemetry tracing integration", "Structured logging pipeline", "Prometheus metrics exporter"],
        difficulty: "Advanced",
      },
    ],
    assessments: [
      {
        id: "rust-async-quiz",
        title: "Async Rust Quiz",
        type: "quiz",
        description: "Test your mastery of futures, lifetimes, and async/await in Rust web services.",
      },
    ],
    modules: [
      {
        id: "rust-web-foundations",
        title: "Rust Web Foundations",
        sections: [
          {
            id: "rust-actix-basics",
            title: "Actix Basics",
            lessons: [
              {
                id: "rust-web-1",
                title: "Actix Web Crash Course",
                videoUrl: "https://www.youtube.com/embed/XZtlD_m59sM",
              },
              {
                id: "rust-web-2",
                title: "Rust for the Web",
                videoUrl: "https://www.youtube.com/embed/5C_HPTJg5ek",
              },
            ],
          },
        ],
      },
      {
        id: "rust-api-engineering",
        title: "API Engineering",
        sections: [
          {
            id: "rust-service-architecture",
            title: "Service Architecture",
            lessons: [
              {
                id: "rust-web-3",
                title: "Designing Rust APIs",
                videoUrl: "https://www.youtube.com/embed/_ccDqRTx-JU",
              },
              {
                id: "rust-web-4",
                title: "Database Integration with Diesel",
                videoUrl: "https://www.youtube.com/embed/tRC4EIKhMzw",
              },
            ],
          },
        ],
      },
      {
        id: "rust-production",
        title: "Production & Deployment",
        sections: [
          {
            id: "rust-observability",
            title: "Observability & Deployment",
            lessons: [
              {
                id: "rust-web-5",
                title: "Deploy Rust APIs with Docker",
                videoUrl: "https://www.youtube.com/embed/ZF1WQGur_NA",
              },
              {
                id: "rust-web-6",
                title: "Instrumentation with OpenTelemetry",
                videoUrl: "https://www.youtube.com/embed/hLvwoow3XTk",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "laravel-api-mastery",
    title: "Laravel API Mastery",
    description: "Craft elegant REST APIs with Laravel, Sanctum, and modern PHP tooling.",
    category: "backend",
    difficulty: "Intermediate",
    duration: "12 hours",
    prerequisites: ["PHP", "SQL"],
    tags: ["Laravel", "REST", "PHP", "Sanctum"],
    roles: ["Backend Engineer", "Full-stack Developer"],
    tools: ["Laravel", "Sanctum", "Pest", "Sail"],
    outcomes: [
      "Build secure REST APIs with Laravel",
      "Implement authentication with Sanctum",
      "Document APIs with OpenAPI and Laravel tools",
    ],
    languages: ["en"],
    status: "live",
    projectBriefs: [
      {
        id: "laravel-payments-api",
        title: "Payments & Billing API",
        description: "Design a subscription billing API with webhook handling and audit logging.",
        deliverables: ["Stripe integration", "Webhook retry strategy", "Audit log dashboard"],
        difficulty: "Intermediate",
      },
    ],
    assessments: [
      {
        id: "laravel-auth-quiz",
        title: "Sanctum Authentication Quiz",
        type: "quiz",
        description: "Review token scopes, guards, and stateless auth patterns.",
      },
    ],
    modules: [
      {
        id: "laravel-foundations",
        title: "Laravel Essentials",
        sections: [
          {
            id: "laravel-setup",
            title: "Framework Basics",
            lessons: [
              {
                id: "laravel-1",
                title: "Laravel 10 Crash Course",
                videoUrl: "https://www.youtube.com/embed/MYyJ4PuL4pY",
              },
              {
                id: "laravel-2",
                title: "Eloquent Deep Dive",
                videoUrl: "https://www.youtube.com/embed/aB8T-ErB0L4",
              },
            ],
          },
        ],
      },
      {
        id: "laravel-api-architecture",
        title: "API Architecture",
        sections: [
          {
            id: "laravel-routing",
            title: "Routing & Validation",
            lessons: [
              {
                id: "laravel-3",
                title: "Advanced Routing Patterns",
                videoUrl: "https://www.youtube.com/embed/wi8kF8UniUI",
              },
              {
                id: "laravel-4",
                title: "Request Validation Strategies",
                videoUrl: "https://www.youtube.com/embed/4tFcM7NcefU",
              },
            ],
          },
        ],
      },
      {
        id: "laravel-observability",
        title: "Testing & Observability",
        sections: [
          {
            id: "laravel-testing",
            title: "Testing APIs",
            lessons: [
              {
                id: "laravel-5",
                title: "Testing Laravel APIs with Pest",
                videoUrl: "https://www.youtube.com/embed/R3UydV_lYhs",
              },
              {
                id: "laravel-6",
                title: "API Documentation & OpenAPI",
                videoUrl: "https://www.youtube.com/embed/PenvYHJ9Koc",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "dotnet-minimal-apis",
    title: ".NET Minimal APIs Blueprint",
    description: "Ship lean, fast services using .NET 8 minimal APIs, Entity Framework, and Azure integrations.",
    category: "backend",
    difficulty: "Intermediate",
    duration: "11 hours",
    prerequisites: ["C#", ".NET fundamentals"],
    tags: [".NET", "Minimal APIs", "Azure", "Entity Framework"],
    roles: ["Backend Engineer", "Full-stack Developer", "Enterprise Developer"],
    tools: [".NET 8", "Entity Framework Core", "Azure App Service", "Serilog"],
    outcomes: [
      "Build lightweight HTTP services with .NET minimal APIs",
      "Integrate EF Core for data persistence",
      "Deploy to Azure with CI/CD pipelines",
    ],
    languages: ["en"],
    status: "live",
    projectBriefs: [
      {
        id: "dotnet-observability",
        title: "Telemetry-ready Minimal API",
        description: "Develop a transactional API with structured logging, metrics, and distributed tracing.",
        deliverables: ["Serilog structured logging", "Application Insights dashboard", "Load testing report"],
        difficulty: "Intermediate",
      },
    ],
    assessments: [
      {
        id: "dotnet-minimal-quiz",
        title: "Minimal APIs Quiz",
        type: "quiz",
        description: "Assess your knowledge of binding, filters, and security for minimal APIs.",
      },
    ],
    modules: [
      {
        id: "dotnet-minimal-foundations",
        title: "Minimal API Foundations",
        sections: [
          {
            id: "dotnet-minimal-basics",
            title: "Project Setup",
            lessons: [
              {
                id: "dotnet-minimal-1",
                title: ".NET Minimal APIs Crash Course",
                videoUrl: "https://www.youtube.com/embed/fmvcAzHpsk8",
              },
              {
                id: "dotnet-minimal-2",
                title: "Minimal APIs vs Controllers",
                videoUrl: "https://www.youtube.com/embed/bpVN_plQm5E",
              },
            ],
          },
        ],
      },
      {
        id: "dotnet-data",
        title: "Data & Security",
        sections: [
          {
            id: "dotnet-efcore",
            title: "Persistence & Auth",
            lessons: [
              {
                id: "dotnet-minimal-3",
                title: "EF Core with Minimal APIs",
                videoUrl: "https://www.youtube.com/embed/KpdyvEO1Ii0",
              },
              {
                id: "dotnet-minimal-4",
                title: "Securing Minimal APIs",
                videoUrl: "https://www.youtube.com/embed/gsAuFIhXz3g",
              },
            ],
          },
        ],
      },
      {
        id: "dotnet-deployment",
        title: "Deployment & Reliability",
        sections: [
          {
            id: "dotnet-azure",
            title: "Deploying to Azure",
            lessons: [
              {
                id: "dotnet-minimal-5",
                title: "Deploy Minimal APIs to Azure",
                videoUrl: "https://www.youtube.com/embed/EKqXAMLsnKQ",
              },
              {
                id: "dotnet-minimal-6",
                title: "Adding Observability with OpenTelemetry",
                videoUrl: "https://www.youtube.com/embed/_OXYCzwFd1Y",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "go-microservices-platforms",
    title: "Go Microservices Platforms",
    description: "Engineer ultra-reliable microservices in Go with gRPC, Kubernetes, and observability-first practices.",
    category: "backend",
    difficulty: "Advanced",
    duration: "13 hours",
    prerequisites: ["Go fundamentals", "Docker", "Distributed systems"],
    tags: ["Go", "Microservices", "gRPC", "Observability"],
    roles: ["Backend Engineer", "Platform Engineer", "SRE"],
    tools: ["Go", "gRPC", "Kubernetes", "OpenTelemetry"],
    outcomes: [
      "Design and implement gRPC microservices in Go",
      "Ship production-ready services with service meshes",
      "Instrument distributed tracing and metrics",
    ],
    languages: ["en"],
    status: "live",
    projectBriefs: [
      {
        id: "go-observability-stack",
        title: "Observable Go Payments Platform",
        description: "Build a payments service mesh with tracing, retries, and chaos testing.",
        deliverables: ["gRPC service implementation", "Istio traffic policy", "Grafana dashboard"],
        difficulty: "Advanced",
      },
    ],
    assessments: [
      {
        id: "go-microservices-quiz",
        title: "Go Service Architecture Quiz",
        type: "quiz",
        description: "Evaluate knowledge of Go concurrency, gRPC contracts, and resiliency patterns.",
      },
    ],
    modules: [
      {
        id: "go-microservices-foundations",
        title: "Service Design Foundations",
        sections: [
          {
            id: "go-microservices-basics",
            title: "Go for Distributed Systems",
            lessons: [
              {
                id: "go-microservices-1",
                title: "Go Concurrency Patterns",
                videoUrl: "https://www.youtube.com/embed/LvgVSSpwND8",
              },
              {
                id: "go-microservices-2",
                title: "Designing Go Services",
                videoUrl: "https://www.youtube.com/embed/446E-r0rXHI",
              },
            ],
          },
        ],
      },
      {
        id: "go-microservices-operations",
        title: "Platform & Operations",
        sections: [
          {
            id: "go-microservices-k8s",
            title: "Kubernetes Integration",
            lessons: [
              {
                id: "go-microservices-3",
                title: "Deploy Go Services on Kubernetes",
                videoUrl: "https://www.youtube.com/embed/o5eWy-2SDtc",
              },
              {
                id: "go-microservices-4",
                title: "Service Mesh Essentials",
                videoUrl: "https://www.youtube.com/embed/16fgzklcF7Y",
              },
            ],
          },
        ],
      },
      {
        id: "go-microservices-resilience",
        title: "Resilience & Observability",
        sections: [
          {
            id: "go-microservices-observability",
            title: "Observability Patterns",
            lessons: [
              {
                id: "go-microservices-5",
                title: "Distributed Tracing with OpenTelemetry",
                videoUrl: "https://www.youtube.com/embed/idDu_jXqf4E",
              },
              {
                id: "go-microservices-6",
                title: "Chaos Engineering in Kubernetes",
                videoUrl: "https://www.youtube.com/embed/THzYL5G-ZvE",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "azure-cloud-accelerator",
    title: "Azure Cloud Accelerator",
    description: "Deploy enterprise workloads on Microsoft Azure with confidence and best practices.",
    category: "cloud",
    difficulty: "Intermediate",
    duration: "12 hours",
    prerequisites: ["Cloud fundamentals"],
    modules: [
      {
        id: "azure-cloud-beginner",
        title: "Beginner Foundations",
        sections: [
          {
            id: "azure-cloud-intro",
            title: "AZ-900 Essentials",
            lessons: [
              {
                id: "azure-cloud-lesson-1",
                title: "Azure Fundamentals Full Course",
                videoUrl: "https://www.youtube.com/embed/-pX5PjIYTJs",
              },
            ],
          },
        ],
      },
      {
        id: "azure-cloud-intermediate",
        title: "Intermediate Projects",
        sections: [
          {
            id: "azure-cloud-devops",
            title: "CI/CD with Azure",
            lessons: [
              {
                id: "azure-cloud-lesson-2",
                title: "Azure DevOps Tutorial for Beginners",
                videoUrl: "https://www.youtube.com/embed/fWNZchSiBxI",
              },
            ],
          },
        ],
      },
      {
        id: "azure-cloud-advanced",
        title: "Advanced Production",
        sections: [
          {
            id: "azure-cloud-landing-zones",
            title: "Enterprise Architecture",
            lessons: [
              {
                id: "azure-cloud-lesson-3",
                title: "Azure Landing Zones Terraform Accelerator",
                videoUrl: "https://www.youtube.com/embed/YxOzTwEnDE0",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "gcp-cloud-engineer",
    title: "Google Cloud Engineer",
    description: "Prepare for Google Cloud workloads with networking, IAM, and analytics best practices.",
    category: "cloud",
    difficulty: "Intermediate",
    duration: "13 hours",
    prerequisites: ["Cloud fundamentals"],
    modules: [
      {
        id: "gcp-cloud-beginner",
        title: "Beginner Foundations",
        sections: [
          {
            id: "gcp-cloud-intro",
            title: "GCP Fundamentals",
            lessons: [
              {
                id: "gcp-cloud-lesson-1",
                title: "Google Cloud Full Course for Beginners",
                videoUrl: "https://www.youtube.com/embed/lvZk_sc8u5I",
              },
            ],
          },
        ],
      },
      {
        id: "gcp-cloud-intermediate",
        title: "Intermediate Projects",
        sections: [
          {
            id: "gcp-cloud-networking",
            title: "Networking & Compute",
            lessons: [
              {
                id: "gcp-cloud-lesson-2",
                title: "Create GCP VPC, Subnet, Firewall & Compute Engine",
                videoUrl: "https://www.youtube.com/embed/5sC-_wCwmOE",
              },
            ],
          },
        ],
      },
      {
        id: "gcp-cloud-advanced",
        title: "Advanced Production",
        sections: [
          {
            id: "gcp-cloud-analytics",
            title: "BigQuery & Analytics",
            lessons: [
              {
                id: "gcp-cloud-lesson-3",
                title: "BigQuery + Jupyter Basics",
                videoUrl: "https://www.youtube.com/embed/Ls_695He3Rs",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "azure-enterprise-architect",
    title: "Azure Enterprise Architect",
    description: "Design resilient workloads on Microsoft Azure with landing zones, governance, and hybrid connectivity.",
    category: "cloud",
    difficulty: "Advanced",
    duration: "15 hours",
    prerequisites: ["Cloud fundamentals", "Networking"],
    tags: ["Azure", "Landing Zones", "Governance", "Networking"],
    roles: ["Cloud Architect", "Enterprise Architect", "Infrastructure Lead"],
    tools: ["Azure Portal", "Bicep", "Azure Policy", "Azure Monitor"],
    outcomes: [
      "Implement Azure landing zones with policy-driven guardrails",
      "Secure hybrid connectivity with ExpressRoute and VPN",
      "Automate monitoring and cost controls across subscriptions",
    ],
    languages: ["en"],
    status: "live",
    projectBriefs: [
      {
        id: "azure-landing-zone",
        title: "Enterprise Landing Zone Rollout",
        description: "Launch a multi-subscription Azure landing zone with compliance and CI/CD enforcement.",
        deliverables: ["Bicep landing zone templates", "Policy compliance report", "Cost governance workbook"],
        difficulty: "Advanced",
      },
    ],
    assessments: [
      {
        id: "azure-architecture-quiz",
        title: "Azure Architecture Readiness Quiz",
        type: "quiz",
        description: "Validate understanding of Azure governance, networking, and security architecture.",
      },
    ],
    modules: [
      {
        id: "azure-architect-foundations",
        title: "Azure Architecture Foundations",
        sections: [
          {
            id: "azure-landing-zones",
            title: "Landing Zones & Governance",
            lessons: [
              {
                id: "azure-architect-1",
                title: "Azure Landing Zones Deep Dive",
                videoUrl: "https://www.youtube.com/embed/mluS8ovuBKg",
              },
              {
                id: "azure-architect-2",
                title: "Azure Policy & Blueprints",
                videoUrl: "https://www.youtube.com/embed/9WO4EBgUJXk",
              },
            ],
          },
        ],
      },
      {
        id: "azure-architect-networking",
        title: "Networking & Security",
        sections: [
          {
            id: "azure-hybrid-connectivity",
            title: "Hybrid Connectivity",
            lessons: [
              {
                id: "azure-architect-3",
                title: "Azure Networking Deep Dive",
                videoUrl: "https://www.youtube.com/embed/feQvnIUJ3Iw",
              },
              {
                id: "azure-architect-4",
                title: "ExpressRoute & VPN Architecture",
                videoUrl: "https://www.youtube.com/embed/zDPAnN5GQCs",
              },
            ],
          },
        ],
      },
      {
        id: "azure-architect-operations",
        title: "Operations & Governance",
        sections: [
          {
            id: "azure-monitoring-governance",
            title: "Monitoring & Cost Controls",
            lessons: [
              {
                id: "azure-architect-5",
                title: "Azure Monitor Deep Dive",
                videoUrl: "https://www.youtube.com/embed/gzBXFnfvoXo",
              },
              {
                id: "azure-architect-6",
                title: "FinOps on Azure",
                videoUrl: "https://www.youtube.com/embed/YHUptdFtozQ",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "multi-cloud-networking-strategies",
    title: "Multi-Cloud Networking Strategies",
    description: "Create secure, observable networking fabrics across AWS, Azure, and GCP.",
    category: "cloud",
    difficulty: "Advanced",
    duration: "12 hours",
    prerequisites: ["Networking", "Cloud platforms"],
    tags: ["Networking", "Multi-cloud", "Transit Gateway", "Service Mesh"],
    roles: ["Cloud Architect", "Network Engineer", "SRE"],
    tools: ["AWS Transit Gateway", "Azure Virtual WAN", "Google Cloud Network Connectivity", "HashiCorp Terraform"],
    outcomes: [
      "Design hub-and-spoke topologies across clouds",
      "Implement zero-trust traffic with service meshes",
      "Instrument distributed networking observability",
    ],
    languages: ["en"],
    status: "beta",
    projectBriefs: [
      {
        id: "multi-cloud-transit",
        title: "Global Multi-Cloud Transit Network",
        description: "Build a multi-region transit gateway architecture with policy routing and observability.",
        deliverables: ["Terraform networking modules", "Zero-trust policy matrix", "Network monitoring dashboard"],
        difficulty: "Advanced",
      },
    ],
    assessments: [
      {
        id: "multi-cloud-networking-quiz",
        title: "Hybrid Networking Quiz",
        type: "quiz",
        description: "Assess knowledge of multi-cloud routing, DNS, and security segmentation.",
      },
    ],
    modules: [
      {
        id: "multi-cloud-foundations",
        title: "Multi-Cloud Foundations",
        sections: [
          {
            id: "multi-cloud-topologies",
            title: "Topologies & Connectivity",
            lessons: [
              {
                id: "multi-cloud-1",
                title: "Multi-Cloud Networking Overview",
                videoUrl: "https://www.youtube.com/embed/tyiO_zG1mi0",
              },
              {
                id: "multi-cloud-2",
                title: "Transit Gateway Patterns",
                videoUrl: "https://www.youtube.com/embed/a55Iud-66q0",
              },
            ],
          },
        ],
      },
      {
        id: "multi-cloud-security",
        title: "Security & Zero Trust",
        sections: [
          {
            id: "multi-cloud-zero-trust",
            title: "Zero Trust Connectivity",
            lessons: [
              {
                id: "multi-cloud-3",
                title: "Zero Trust Networking Principles",
                videoUrl: "https://www.youtube.com/embed/yn6CPQ9RioA",
              },
              {
                id: "multi-cloud-4",
                title: "Service Mesh for Multi-Cloud",
                videoUrl: "https://www.youtube.com/embed/16fgzklcF7Y",
              },
            ],
          },
        ],
      },
      {
        id: "multi-cloud-observability",
        title: "Observability & Operations",
        sections: [
          {
            id: "multi-cloud-monitoring",
            title: "Monitoring & FinOps",
            lessons: [
              {
                id: "multi-cloud-5",
                title: "Observability Across Clouds",
                videoUrl: "https://www.youtube.com/embed/lbhkwU9inoU",
              },
              {
                id: "multi-cloud-6",
                title: "FinOps Strategies for Multi-Cloud",
                videoUrl: "https://www.youtube.com/embed/F-wzoCIJq6o",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "serverless-platform-automation",
    title: "Serverless Platform Automation",
    description: "Automate end-to-end serverless delivery with AWS, Azure, and observability guardrails.",
    category: "cloud",
    difficulty: "Intermediate",
    duration: "11 hours",
    prerequisites: ["JavaScript/TypeScript", "Cloud fundamentals"],
    tags: ["Serverless", "Automation", "CI/CD", "Observability"],
    roles: ["Cloud Engineer", "Platform Engineer", "DevOps"],
    tools: ["AWS Lambda", "Azure Functions", "Serverless Framework", "Pulumi"],
    outcomes: [
      "Ship multi-cloud serverless pipelines",
      "Implement automated quality gates and testing",
      "Configure event-driven observability dashboards",
    ],
    languages: ["en"],
    status: "live",
    projectBriefs: [
      {
        id: "serverless-catalog",
        title: "Serverless Commerce Catalog",
        description: "Build an event-driven commerce backend with automated deployments and monitoring.",
        deliverables: ["CI/CD pipeline", "Observability alerts", "Cost optimization report"],
        difficulty: "Intermediate",
      },
    ],
    assessments: [
      {
        id: "serverless-automation-quiz",
        title: "Serverless Automation Quiz",
        type: "quiz",
        description: "Check knowledge of serverless CI/CD, testing, and ops guardrails.",
      },
    ],
    modules: [
      {
        id: "serverless-automation-foundations",
        title: "Automation Foundations",
        sections: [
          {
            id: "serverless-pipelines",
            title: "Pipelines & Governance",
            lessons: [
              {
                id: "serverless-automation-1",
                title: "Serverless CI/CD Best Practices",
                videoUrl: "https://www.youtube.com/embed/mB0owYlJgKs",
              },
              {
                id: "serverless-automation-2",
                title: "Policy-as-code for Serverless",
                videoUrl: "https://www.youtube.com/embed/7OSPPV2Iwoo",
              },
            ],
          },
        ],
      },
      {
        id: "serverless-observability",
        title: "Observability & Quality",
        sections: [
          {
            id: "serverless-testing",
            title: "Testing & Monitoring",
            lessons: [
              {
                id: "serverless-automation-3",
                title: "Testing Strategies for Serverless",
                videoUrl: "https://www.youtube.com/embed/OoHzaEkXFe0",
              },
              {
                id: "serverless-automation-4",
                title: "Observability for Functions",
                videoUrl: "https://www.youtube.com/embed/CAQ_a2-9UOI",
              },
            ],
          },
        ],
      },
      {
        id: "serverless-operations",
        title: "Operations & Cost",
        sections: [
          {
            id: "serverless-finops",
            title: "Cost & Resilience",
            lessons: [
              {
                id: "serverless-automation-5",
                title: "Serverless Cost Optimization",
                videoUrl: "https://www.youtube.com/embed/OKYJCHHSWb4",
              },
              {
                id: "serverless-automation-6",
                title: "Resilience in Serverless Architectures",
                videoUrl: "https://www.youtube.com/embed/aXkdBoNipdg",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "cloud-finops-analytics",
    title: "Cloud FinOps Analytics",
    description: "Master FinOps practices to align cloud spending with business value and engineering velocity.",
    category: "cloud",
    difficulty: "Intermediate",
    duration: "9 hours",
    prerequisites: ["Cloud fundamentals", "Finance basics"],
    tags: ["FinOps", "Cloud Economics", "Cost Optimization", "Analytics"],
    roles: ["FinOps Practitioner", "Cloud Analyst", "Engineering Manager"],
    tools: ["CloudHealth", "AWS Cost Explorer", "Looker", "Jupyter"],
    outcomes: [
      "Build FinOps dashboards and anomaly detection",
      "Create cost-allocation models for multi-cloud",
      "Run showback and chargeback processes",
    ],
    languages: ["en"],
    status: "beta",
    projectBriefs: [
      {
        id: "finops-trust-report",
        title: "Executive FinOps Report",
        description: "Deliver a quarterly FinOps review with savings roadmap and KPI instrumentation.",
        deliverables: ["Cost vs velocity dashboard", "Savings initiative backlog", "Executive presentation"],
        difficulty: "Intermediate",
      },
    ],
    assessments: [
      {
        id: "finops-analytics-quiz",
        title: "FinOps Analytics Quiz",
        type: "quiz",
        description: "Evaluate knowledge of FinOps KPIs, unit economics, and anomaly management.",
      },
    ],
    modules: [
      {
        id: "finops-foundations",
        title: "FinOps Foundations",
        sections: [
          {
            id: "finops-principles",
            title: "Principles & Teams",
            lessons: [
              {
                id: "finops-1",
                title: "FinOps Explained",
                videoUrl: "https://www.youtube.com/embed/gWDTRf_kGHI",
              },
              {
                id: "finops-2",
                title: "Building a FinOps Practice",
                videoUrl: "https://www.youtube.com/embed/5hMjUEMjZoI",
              },
            ],
          },
        ],
      },
      {
        id: "finops-measurement",
        title: "Measurement & Analytics",
        sections: [
          {
            id: "finops-dashboarding",
            title: "Dashboards & Reporting",
            lessons: [
              {
                id: "finops-3",
                title: "FinOps Dashboards in Practice",
                videoUrl: "https://www.youtube.com/embed/g5ngpyZSR5U",
              },
              {
                id: "finops-4",
                title: "Anomaly Detection Techniques",
                videoUrl: "https://www.youtube.com/embed/mhSFyXbCaPM",
              },
            ],
          },
        ],
      },
      {
        id: "finops-operations",
        title: "Operational Excellence",
        sections: [
          {
            id: "finops-ops-process",
            title: "Operations & Governance",
            lessons: [
              {
                id: "finops-5",
                title: "FinOps Lifecycle Deep Dive",
                videoUrl: "https://www.youtube.com/embed/C3UGs98b8Kc",
              },
              {
                id: "finops-6",
                title: "Negotiating Cloud Savings",
                videoUrl: "https://www.youtube.com/embed/ePnHvCva1_w",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "deep-learning-tensorflow",
    title: "Deep Learning with TensorFlow",
    description: "Train neural networks and deploy deep learning models with TensorFlow 2.",
    category: "data-science",
    difficulty: "Advanced",
    duration: "16 hours",
    prerequisites: ["Python", "Linear algebra"],
    modules: [
      {
        id: "deep-learning-beginner",
        title: "Beginner Foundations",
        sections: [
          {
            id: "deep-learning-intro",
            title: "TensorFlow Basics",
            lessons: [
              {
                id: "deep-learning-lesson-1",
                title: "TensorFlow 2.0 Complete Course",
                videoUrl: "https://www.youtube.com/embed/tPYj3fFJGjk",
              },
            ],
          },
        ],
      },
      {
        id: "deep-learning-intermediate",
        title: "Intermediate Models",
        sections: [
          {
            id: "deep-learning-neural-networks",
            title: "Neural Network Intuition",
            lessons: [
              {
                id: "deep-learning-lesson-2",
                title: "Neural Networks Demystified",
                videoUrl: "https://www.youtube.com/embed/aircAruvnKk",
              },
            ],
          },
        ],
      },
      {
        id: "deep-learning-advanced",
        title: "Advanced Production",
        sections: [
          {
            id: "deep-learning-systems",
            title: "Scaling Deep Learning",
            lessons: [
              {
                id: "deep-learning-lesson-3",
                title: "Deep Learning Full Course 2025",
                videoUrl: "https://www.youtube.com/embed/VsjhpUuOKn0",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "nlp-python-roadmap",
    title: "NLP with Python Roadmap",
    description: "Process text data, build transformers, and deploy NLP solutions with Python.",
    category: "data-science",
    difficulty: "Advanced",
    duration: "15 hours",
    prerequisites: ["Python", "Machine learning"],
    modules: [
      {
        id: "nlp-python-beginner",
        title: "Beginner Foundations",
        sections: [
          {
            id: "nlp-python-intro",
            title: "Text Processing Basics",
            lessons: [
              {
                id: "nlp-python-lesson-1",
                title: "NLP Tutorial with Python & NLTK",
                videoUrl: "https://www.youtube.com/embed/X2vAabgKiuM",
              },
            ],
          },
        ],
      },
      {
        id: "nlp-python-intermediate",
        title: "Intermediate Models",
        sections: [
          {
            id: "nlp-python-transformers",
            title: "Transformer Architectures",
            lessons: [
              {
                id: "nlp-python-lesson-2",
                title: "Transformers Explained",
                videoUrl: "https://www.youtube.com/embed/dIUTsFT2MeQ",
              },
            ],
          },
        ],
      },
      {
        id: "nlp-python-advanced",
        title: "Advanced Production",
        sections: [
          {
            id: "nlp-python-large-models",
            title: "Building Large Language Models",
            lessons: [
              {
                id: "nlp-python-lesson-3",
                title: "Let's Build GPT from Scratch",
                videoUrl: "https://www.youtube.com/embed/kCc8FmEb1nY",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "computer-vision-pytorch-lab",
    title: "Computer Vision with PyTorch Lab",
    description: "Build production-ready computer vision systems using PyTorch, TorchVision, and deployment pipelines.",
    category: "data-science",
    difficulty: "Advanced",
    duration: "14 hours",
    prerequisites: ["Python", "Deep learning"],
    tags: ["Computer Vision", "PyTorch", "MLOps", "Deployment"],
    roles: ["ML Engineer", "Computer Vision Engineer", "Research Scientist"],
    tools: ["PyTorch", "TorchVision", "ONNX", "TensorRT"],
    outcomes: [
      "Train and evaluate state-of-the-art vision models",
      "Optimize models for edge and cloud deployment",
      "Implement monitoring and data drift detection for vision systems",
    ],
    languages: ["en"],
    status: "live",
    projectBriefs: [
      {
        id: "vision-quality-inspection",
        title: "Vision Quality Inspection Pipeline",
        description: "Deliver an automated defect detection pipeline with labeling, training, and real-time inference.",
        deliverables: ["Model training notebook", "ONNX runtime deployment", "Monitoring dashboard"],
        difficulty: "Advanced",
      },
    ],
    assessments: [
      {
        id: "computer-vision-eval",
        title: "Computer Vision System Design",
        type: "project",
        description: "Design a vision system architecture with data sourcing, labeling, and deployment plan.",
      },
    ],
    modules: [
      {
        id: "vision-foundations",
        title: "Vision Foundations",
        sections: [
          {
            id: "vision-models-intro",
            title: "Models & Datasets",
            lessons: [
              {
                id: "vision-lesson-1",
                title: "PyTorch for Computer Vision",
                videoUrl: "https://www.youtube.com/embed/hacZU523FyM",
              },
              {
                id: "vision-lesson-2",
                title: "Data Augmentation Techniques",
                videoUrl: "https://www.youtube.com/embed/mTVf7BN7S8w",
              },
            ],
          },
        ],
      },
      {
        id: "vision-optimization",
        title: "Optimization & Deployment",
        sections: [
          {
            id: "vision-onnx",
            title: "Optimization Pipelines",
            lessons: [
              {
                id: "vision-lesson-3",
                title: "Model Optimization with Torch-TensorRT",
                videoUrl: "https://www.youtube.com/embed/TU5BMU6iYZ0",
              },
              {
                id: "vision-lesson-4",
                title: "Deploying PyTorch Models",
                videoUrl: "https://www.youtube.com/embed/jdE4hPf9juk",
              },
            ],
          },
        ],
      },
      {
        id: "vision-operations",
        title: "Operations & Monitoring",
        sections: [
          {
            id: "vision-monitoring",
            title: "Monitoring CV Systems",
            lessons: [
              {
                id: "vision-lesson-5",
                title: "Monitoring ML in Production",
                videoUrl: "https://www.youtube.com/embed/RcVVRmkBRJg",
              },
              {
                id: "vision-lesson-6",
                title: "Handling Data Drift",
                videoUrl: "https://www.youtube.com/embed/kU9EFNyTIh8",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "mlops-mlflow-production",
    title: "MLOps with MLflow & Kubernetes",
    description: "Operationalize machine learning workflows with MLflow, Kubeflow, and modern CI/CD.",
    category: "data-science",
    difficulty: "Advanced",
    duration: "13 hours",
    prerequisites: ["Machine learning", "Docker"],
    tags: ["MLOps", "MLflow", "Kubeflow", "CI/CD"],
    roles: ["MLOps Engineer", "ML Engineer", "Data Scientist"],
    tools: ["MLflow", "Kubeflow", "Great Expectations", "Argo Workflows"],
    outcomes: [
      "Build reproducible ML pipelines with MLflow",
      "Deploy models to Kubernetes with automated rollbacks",
      "Implement monitoring, governance, and lineage",
    ],
    languages: ["en"],
    status: "live",
    projectBriefs: [
      {
        id: "mlops-ci-pipeline",
        title: "Model Delivery Pipeline",
        description: "Create an automated ML deployment pipeline with approvals and shadow deployments.",
        deliverables: ["MLflow tracking setup", "Argo workflow definition", "Monitoring runbook"],
        difficulty: "Advanced",
      },
    ],
    assessments: [
      {
        id: "mlops-governance-quiz",
        title: "MLOps Governance Quiz",
        type: "quiz",
        description: "Measure understanding of ML governance, lineage, and compliance controls.",
      },
    ],
    modules: [
      {
        id: "mlops-foundations",
        title: "MLOps Foundations",
        sections: [
          {
            id: "mlops-lifecycle",
            title: "Lifecycle & Tooling",
            lessons: [
              {
                id: "mlops-lesson-1",
                title: "MLOps End-to-End",
                videoUrl: "https://www.youtube.com/embed/OejCJL2EC3k",
              },
              {
                id: "mlops-lesson-2",
                title: "MLflow Tracking Tutorial",
                videoUrl: "https://www.youtube.com/embed/6ngxBkx05Fs",
              },
            ],
          },
        ],
      },
      {
        id: "mlops-automation",
        title: "Automation & Delivery",
        sections: [
          {
            id: "mlops-kubeflow",
            title: "Kubeflow Pipelines",
            lessons: [
              {
                id: "mlops-lesson-3",
                title: "Kubeflow Pipelines Crash Course",
                videoUrl: "https://www.youtube.com/embed/rKfknA48FGk",
              },
              {
                id: "mlops-lesson-4",
                title: "Deploying Models on Kubernetes",
                videoUrl: "https://www.youtube.com/embed/DQRNt8Diyw4",
              },
            ],
          },
        ],
      },
      {
        id: "mlops-observability",
        title: "Observability & Governance",
        sections: [
          {
            id: "mlops-quality",
            title: "Quality & Compliance",
            lessons: [
              {
                id: "mlops-lesson-5",
                title: "Model Monitoring Strategies",
                videoUrl: "https://www.youtube.com/embed/RcVVRmkBRJg",
              },
              {
                id: "mlops-lesson-6",
                title: "Responsible AI & Compliance",
                videoUrl: "https://www.youtube.com/embed/yh-3WU1FKrk",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "time-series-forecasting-pro",
    title: "Time Series Forecasting Pro",
    description: "Forecast demand, finance, and sensors using statistical and deep learning models.",
    category: "data-science",
    difficulty: "Advanced",
    duration: "12 hours",
    prerequisites: ["Python", "Statistics"],
    tags: ["Time Series", "Forecasting", "Prophet", "LSTM"],
    roles: ["Data Scientist", "Quantitative Analyst", "ML Engineer"],
    tools: ["Prophet", "statsmodels", "PyTorch", "Darts"],
    outcomes: [
      "Build classical and deep learning forecasting models",
      "Evaluate time series performance with backtesting",
      "Deploy automated forecasting pipelines",
    ],
    languages: ["en"],
    status: "live",
    projectBriefs: [
      {
        id: "forecasting-retail-plan",
        title: "Retail Demand Forecasting",
        description: "Forecast multi-store demand with holiday effects and inventory constraints.",
        deliverables: ["Feature engineering notebook", "Forecast evaluation report", "Deployment script"],
        difficulty: "Intermediate",
      },
    ],
    assessments: [
      {
        id: "time-series-quiz",
        title: "Time Series Mastery Quiz",
        type: "quiz",
        description: "Check knowledge of seasonality, stationarity, and sequence modeling.",
      },
    ],
    modules: [
      {
        id: "forecasting-foundations",
        title: "Forecasting Foundations",
        sections: [
          {
            id: "forecasting-statistics",
            title: "Classical Techniques",
            lessons: [
              {
                id: "forecasting-lesson-1",
                title: "Time Series Analysis Crash Course",
                videoUrl: "https://www.youtube.com/embed/GE3JOFwTWVM",
              },
              {
                id: "forecasting-lesson-2",
                title: "ARIMA and Seasonal Models",
                videoUrl: "https://www.youtube.com/embed/IK67f3IItfw",
              },
            ],
          },
        ],
      },
      {
        id: "forecasting-deep-learning",
        title: "Deep Learning Forecasting",
        sections: [
          {
            id: "forecasting-lstm",
            title: "Neural Forecasting",
            lessons: [
              {
                id: "forecasting-lesson-3",
                title: "LSTM for Time Series",
                videoUrl: "https://www.youtube.com/embed/2np77NOdnwk",
              },
              {
                id: "forecasting-lesson-4",
                title: "Transformer Forecasting",
                videoUrl: "https://www.youtube.com/embed/_UJnMn-3NdM",
              },
            ],
          },
        ],
      },
      {
        id: "forecasting-operations",
        title: "Operations & Deployment",
        sections: [
          {
            id: "forecasting-mlops",
            title: "Deployment & Monitoring",
            lessons: [
              {
                id: "forecasting-lesson-5",
                title: "Productionizing Forecasting Models",
                videoUrl: "https://www.youtube.com/embed/M8Kiwv9gDJU",
              },
              {
                id: "forecasting-lesson-6",
                title: "Monitoring Forecast Accuracy",
                videoUrl: "https://www.youtube.com/embed/0vtRKLVNhQ8",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "data-visualization-storytelling",
    title: "Data Visualization & Storytelling",
    description: "Craft impactful visual stories using Tableau, Power BI, and narrative design frameworks.",
    category: "data-science",
    difficulty: "Intermediate",
    duration: "10 hours",
    prerequisites: ["Data analysis", "SQL"],
    tags: ["Data Storytelling", "Tableau", "Power BI", "Dashboards"],
    roles: ["Data Analyst", "Analytics Engineer", "Product Manager"],
    tools: ["Tableau", "Power BI", "dbt", "Adobe Illustrator"],
    outcomes: [
      "Design data narratives with persuasive visual structure",
      "Build accessible dashboards with advanced interactivity",
      "Implement analytics design systems for consistency",
    ],
    languages: ["en"],
    status: "live",
    projectBriefs: [
      {
        id: "data-storytelling-exec",
        title: "Executive Insights Dashboard",
        description: "Deliver a cross-functional dashboard with executive storytelling and takeaways.",
        deliverables: ["Interactive dashboard", "Storytelling script", "Accessibility audit"],
        difficulty: "Intermediate",
      },
    ],
    assessments: [
      {
        id: "data-storytelling-assessment",
        title: "Visualization Critique",
        type: "assignment",
        description: "Critique a dashboard for clarity, accessibility, and insight communication.",
      },
    ],
    modules: [
      {
        id: "data-viz-foundations",
        title: "Visualization Foundations",
        sections: [
          {
            id: "data-viz-principles",
            title: "Design Principles",
            lessons: [
              {
                id: "data-viz-lesson-1",
                title: "Data Visualization Fundamentals",
                videoUrl: "https://www.youtube.com/embed/MiiANxRHSv4",
              },
              {
                id: "data-viz-lesson-2",
                title: "Storytelling with Data",
                videoUrl: "https://www.youtube.com/embed/r5_34YnCmMY",
              },
            ],
          },
        ],
      },
      {
        id: "data-viz-tools",
        title: "Tools & Techniques",
        sections: [
          {
            id: "data-viz-tableau",
            title: "Interactive Dashboards",
            lessons: [
              {
                id: "data-viz-lesson-3",
                title: "Tableau Storytelling Tutorial",
                videoUrl: "https://www.youtube.com/embed/_jK0nIm349g",
              },
              {
                id: "data-viz-lesson-4",
                title: "Power BI Advanced Visuals",
                videoUrl: "https://www.youtube.com/embed/PnfrhEcwxdw",
              },
            ],
          },
        ],
      },
      {
        id: "data-viz-operations",
        title: "Governance & Adoption",
        sections: [
          {
            id: "data-viz-governance",
            title: "Governance & Accessibility",
            lessons: [
              {
                id: "data-viz-lesson-5",
                title: "Data Governance for Analytics",
                videoUrl: "https://www.youtube.com/embed/uPsUjKLHLAg",
              },
              {
                id: "data-viz-lesson-6",
                title: "Accessibility in Dashboards",
                videoUrl: "https://www.youtube.com/embed/im45j373T20",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "redis-performance",
    title: "Redis Performance Engineering",
    description: "Optimize caching, streaming, and clustering workloads with Redis.",
    category: "databases",
    difficulty: "Intermediate",
    duration: "9 hours",
    prerequisites: ["Backend fundamentals"],
    modules: [
      {
        id: "redis-beginner",
        title: "Beginner Foundations",
        sections: [
          {
            id: "redis-intro",
            title: "Redis Basics",
            lessons: [
              {
                id: "redis-lesson-1",
                title: "Redis Crash Course",
                videoUrl: "https://www.youtube.com/embed/jgpVdJB2sKQ",
              },
            ],
          },
        ],
      },
      {
        id: "redis-intermediate",
        title: "Intermediate Workloads",
        sections: [
          {
            id: "redis-streams",
            title: "Streams & Messaging",
            lessons: [
              {
                id: "redis-lesson-2",
                title: "Getting Started with Redis Stream",
                videoUrl: "https://www.youtube.com/embed/qcv8xr1rp8U",
              },
            ],
          },
        ],
      },
      {
        id: "redis-advanced",
        title: "Advanced Production",
        sections: [
          {
            id: "redis-cluster",
            title: "Clustering & Scale",
            lessons: [
              {
                id: "redis-lesson-3",
                title: "Redis Cluster Setup Step-by-Step",
                videoUrl: "https://www.youtube.com/embed/hlacDfYU6bM",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "mysql-masterclass",
    title: "MySQL Data Engineering Masterclass",
    description: "Design resilient relational databases and tune MySQL for performance and scale.",
    category: "databases",
    difficulty: "Intermediate",
    duration: "10 hours",
    prerequisites: ["SQL fundamentals"],
    modules: [
      {
        id: "mysql-beginner",
        title: "Beginner Foundations",
        sections: [
          {
            id: "mysql-intro",
            title: "SQL Essentials",
            lessons: [
              {
                id: "mysql-lesson-1",
                title: "MySQL Crash Course",
                videoUrl: "https://www.youtube.com/embed/9ylj9NR0Lcg",
              },
            ],
          },
        ],
      },
      {
        id: "mysql-intermediate",
        title: "Intermediate Performance",
        sections: [
          {
            id: "mysql-indexing",
            title: "Indexing Strategies",
            lessons: [
              {
                id: "mysql-lesson-2",
                title: "Indexing in MySQL",
                videoUrl: "https://www.youtube.com/embed/xDDlB51dX5E",
              },
            ],
          },
        ],
      },
      {
        id: "mysql-advanced",
        title: "Advanced Production",
        sections: [
          {
            id: "mysql-replication",
            title: "Replication & HA",
            lessons: [
              {
                id: "mysql-lesson-3",
                title: "Create a MySQL Replica Database",
                videoUrl: "https://www.youtube.com/embed/mpCeatW4t_U",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "snowflake-data-warehousing",
    title: "Snowflake Data Warehousing",
    description: "Design cloud-native data warehouses on Snowflake with performance, security, and governance baked in.",
    category: "databases",
    difficulty: "Intermediate",
    duration: "11 hours",
    prerequisites: ["SQL", "Data modeling"],
    tags: ["Snowflake", "Data Warehouse", "ELT", "Data Governance"],
    roles: ["Data Engineer", "Analytics Engineer", "BI Developer"],
    tools: ["Snowflake", "dbt", "Fivetran", "Sigma"],
    outcomes: [
      "Model data warehouses using the medallion architecture",
      "Optimize Snowflake performance and cost",
      "Automate governance and data quality checks",
    ],
    languages: ["en"],
    status: "live",
    projectBriefs: [
      {
        id: "snowflake-elt-pipeline",
        title: "Modern ELT Pipeline",
        description: "Implement a streaming ELT pipeline into Snowflake with dbt transformations and data tests.",
        deliverables: ["dbt project", "Data quality report", "Cost optimization plan"],
        difficulty: "Intermediate",
      },
    ],
    assessments: [
      {
        id: "snowflake-governance-quiz",
        title: "Snowflake Governance Quiz",
        type: "quiz",
        description: "Validate knowledge on security, masking, and data sharing features.",
      },
    ],
    modules: [
      {
        id: "snowflake-foundations",
        title: "Snowflake Foundations",
        sections: [
          {
            id: "snowflake-architecture",
            title: "Architecture & Concepts",
            lessons: [
              {
                id: "snowflake-lesson-1",
                title: "Snowflake Basics",
                videoUrl: "https://www.youtube.com/embed/VIJH7TZXkaA",
              },
              {
                id: "snowflake-lesson-2",
                title: "Virtual Warehouses Explained",
                videoUrl: "https://www.youtube.com/embed/TeD5zshkdjY",
              },
            ],
          },
        ],
      },
      {
        id: "snowflake-modeling",
        title: "Modeling & Performance",
        sections: [
          {
            id: "snowflake-optimization",
            title: "Optimization Patterns",
            lessons: [
              {
                id: "snowflake-lesson-3",
                title: "Optimizing Snowflake Queries",
                videoUrl: "https://www.youtube.com/embed/DInoHRmaAGA",
              },
              {
                id: "snowflake-lesson-4",
                title: "dbt in Snowflake",
                videoUrl: "https://www.youtube.com/embed/pzBf4KEvrUQ",
              },
            ],
          },
        ],
      },
      {
        id: "snowflake-governance",
        title: "Governance & Operations",
        sections: [
          {
            id: "snowflake-security",
            title: "Security & Sharing",
            lessons: [
              {
                id: "snowflake-lesson-5",
                title: "Snowflake Security Best Practices",
                videoUrl: "https://www.youtube.com/embed/jhWa7ANML5U",
              },
              {
                id: "snowflake-lesson-6",
                title: "Data Sharing & Marketplace",
                videoUrl: "https://www.youtube.com/embed/3pRBLrjAL0s",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "cassandra-scalable-data",
    title: "Apache Cassandra at Scale",
    description: "Operate petabyte-scale distributed data systems with Apache Cassandra and Kubernetes.",
    category: "databases",
    difficulty: "Advanced",
    duration: "12 hours",
    prerequisites: ["Data modeling", "Distributed systems"],
    tags: ["Cassandra", "Distributed Systems", "Data Modeling", "Kubernetes"],
    roles: ["Database Engineer", "Platform Engineer", "Backend Engineer"],
    tools: ["Apache Cassandra", "K8ssandra", "Stargate", "Prometheus"],
    outcomes: [
      "Design Cassandra data models for high throughput",
      "Automate operations with Kubernetes operators",
      "Implement observability and disaster recovery",
    ],
    languages: ["en"],
    status: "beta",
    projectBriefs: [
      {
        id: "cassandra-iot-platform",
        title: "IoT Data Platform",
        description: "Design a global IoT ingestion platform with Cassandra, Kafka, and governance controls.",
        deliverables: ["Data model diagrams", "Replication strategy", "Monitoring runbook"],
        difficulty: "Advanced",
      },
    ],
    assessments: [
      {
        id: "cassandra-modeling-quiz",
        title: "Cassandra Data Modeling Quiz",
        type: "quiz",
        description: "Evaluate understanding of partitioning, consistency, and query design.",
      },
    ],
    modules: [
      {
        id: "cassandra-foundations",
        title: "Cassandra Foundations",
        sections: [
          {
            id: "cassandra-architecture",
            title: "Architecture & Internals",
            lessons: [
              {
                id: "cassandra-lesson-1",
                title: "Cassandra Architecture Explained",
                videoUrl: "https://www.youtube.com/embed/YjYWsN1vek8",
              },
              {
                id: "cassandra-lesson-2",
                title: "Consistency & Replication",
                videoUrl: "https://www.youtube.com/embed/pdxGtahoqlY",
              },
            ],
          },
        ],
      },
      {
        id: "cassandra-operations",
        title: "Operations & Kubernetes",
        sections: [
          {
            id: "cassandra-k8s",
            title: "Running Cassandra on Kubernetes",
            lessons: [
              {
                id: "cassandra-lesson-3",
                title: "Kubernetes Operators for Cassandra",
                videoUrl: "https://www.youtube.com/embed/N0vHJDGi5kY",
              },
              {
                id: "cassandra-lesson-4",
                title: "Monitoring Cassandra",
                videoUrl: "https://www.youtube.com/embed/RDd35Lszpq4",
              },
            ],
          },
        ],
      },
      {
        id: "cassandra-performance",
        title: "Performance & DR",
        sections: [
          {
            id: "cassandra-resilience",
            title: "Resilience Engineering",
            lessons: [
              {
                id: "cassandra-lesson-5",
                title: "Cassandra Performance Tuning",
                videoUrl: "https://www.youtube.com/embed/M2Z0wk53GBU",
              },
              {
                id: "cassandra-lesson-6",
                title: "Disaster Recovery Playbooks",
                videoUrl: "https://www.youtube.com/embed/rVOrIh9Q6o4",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "neo4j-graph-analytics",
    title: "Neo4j Graph Analytics",
    description: "Model connected data and build recommendation engines with Neo4j and graph algorithms.",
    category: "databases",
    difficulty: "Intermediate",
    duration: "10 hours",
    prerequisites: ["Database fundamentals", "Data analysis"],
    tags: ["Graph", "Neo4j", "Recommendations", "Cypher"],
    roles: ["Data Scientist", "Knowledge Engineer", "Backend Engineer"],
    tools: ["Neo4j", "Bloom", "Graph Data Science", "Python"],
    outcomes: [
      "Design graph schemas and Cypher queries",
      "Run graph algorithms for detection and personalization",
      "Integrate Neo4j with microservices and analytics",
    ],
    languages: ["en"],
    status: "live",
    projectBriefs: [
      {
        id: "neo4j-knowledge-graph",
        title: "Enterprise Knowledge Graph",
        description: "Build a knowledge graph powering recommendations and search across silos.",
        deliverables: ["Graph schema", "Algorithm evaluation", "API integration plan"],
        difficulty: "Intermediate",
      },
    ],
    assessments: [
      {
        id: "neo4j-cypher-quiz",
        title: "Cypher & Graph Algorithms Quiz",
        type: "quiz",
        description: "Gauge proficiency in Cypher, community detection, and embeddings.",
      },
    ],
    modules: [
      {
        id: "neo4j-foundations",
        title: "Graph Fundamentals",
        sections: [
          {
            id: "neo4j-modeling",
            title: "Modeling Connected Data",
            lessons: [
              {
                id: "neo4j-lesson-1",
                title: "Neo4j Crash Course",
                videoUrl: "https://www.youtube.com/embed/8jNPelugC2s",
              },
              {
                id: "neo4j-lesson-2",
                title: "Graph Modeling Techniques",
                videoUrl: "https://www.youtube.com/embed/selD5F1ibag",
              },
            ],
          },
        ],
      },
      {
        id: "neo4j-analytics",
        title: "Graph Analytics",
        sections: [
          {
            id: "neo4j-algorithms",
            title: "Algorithms & Insights",
            lessons: [
              {
                id: "neo4j-lesson-3",
                title: "Graph Algorithms in Neo4j",
                videoUrl: "https://www.youtube.com/embed/T6L9EoBy8Zk",
              },
              {
                id: "neo4j-lesson-4",
                title: "Recommendation Systems with Neo4j",
                videoUrl: "https://www.youtube.com/embed/z3GuGTL7fHY",
              },
            ],
          },
        ],
      },
      {
        id: "neo4j-integration",
        title: "Integration & Operations",
        sections: [
          {
            id: "neo4j-api",
            title: "APIs & Deployments",
            lessons: [
              {
                id: "neo4j-lesson-5",
                title: "Build APIs with Neo4j & GraphQL",
                videoUrl: "https://www.youtube.com/embed/Wal2ZUsvye4",
              },
              {
                id: "neo4j-lesson-6",
                title: "Deploy Neo4j in Production",
                videoUrl: "https://www.youtube.com/embed/T6L9EoBy8Zk",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "cockroachdb-distributed-sql",
    title: "CockroachDB Distributed SQL",
    description: "Deliver globally resilient applications with CockroachDB, multi-region SQL, and observability.",
    category: "databases",
    difficulty: "Advanced",
    duration: "11 hours",
    prerequisites: ["SQL", "Cloud"],
    tags: ["CockroachDB", "Distributed SQL", "Multi-region", "Resilience"],
    roles: ["Database Engineer", "Backend Engineer", "SRE"],
    tools: ["CockroachDB", "Terraform", "Grafana", "Vault"],
    outcomes: [
      "Design multi-region schemas with survival goals",
      "Automate CockroachDB deployment and upgrades",
      "Instrument observability and backup strategies",
    ],
    languages: ["en"],
    status: "beta",
    projectBriefs: [
      {
        id: "cockroachdb-global-ledger",
        title: "Global Ledger Service",
        description: "Implement a financial ledger requiring strict consistency and geographic fault tolerance.",
        deliverables: ["Multi-region schema", "Terraform automation", "Disaster recovery drills"],
        difficulty: "Advanced",
      },
    ],
    assessments: [
      {
        id: "cockroachdb-quiz",
        title: "Distributed SQL Quiz",
        type: "quiz",
        description: "Test knowledge of consistency levels, rebalancing, and failure domains.",
      },
    ],
    modules: [
      {
        id: "cockroachdb-foundations",
        title: "Distributed SQL Foundations",
        sections: [
          {
            id: "cockroachdb-architecture",
            title: "Architecture & Concepts",
            lessons: [
              {
                id: "cockroachdb-lesson-1",
                title: "CockroachDB Architecture Explained",
                videoUrl: "https://www.youtube.com/embed/AeX5b89TJ2o",
              },
              {
                id: "cockroachdb-lesson-2",
                title: "Consistency & Replication",
                videoUrl: "https://www.youtube.com/embed/pdxGtahoqlY",
              },
            ],
          },
        ],
      },
      {
        id: "cockroachdb-operations",
        title: "Operations & Automation",
        sections: [
          {
            id: "cockroachdb-terraform",
            title: "Infrastructure Automation",
            lessons: [
              {
                id: "cockroachdb-lesson-3",
                title: "Deploy CockroachDB with Terraform",
                videoUrl: "https://www.youtube.com/embed/LEytD1eld8M",
              },
              {
                id: "cockroachdb-lesson-4",
                title: "Monitoring CockroachDB",
                videoUrl: "https://www.youtube.com/embed/Z9kHuKeFKRg",
              },
            ],
          },
        ],
      },
      {
        id: "cockroachdb-resilience",
        title: "Resilience & Security",
        sections: [
          {
            id: "cockroachdb-backup",
            title: "Backup & Security",
            lessons: [
              {
                id: "cockroachdb-lesson-5",
                title: "Backup Strategies in CockroachDB",
                videoUrl: "https://www.youtube.com/embed/t_ocOi_iYQ8",
              },
              {
                id: "cockroachdb-lesson-6",
                title: "Security Best Practices",
                videoUrl: "https://www.youtube.com/embed/oBf5lrmquYI",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "graphql-apollo-server",
    title: "GraphQL with Apollo Server",
    description: "Design GraphQL schemas, resolvers, and federated architectures with Apollo.",
    category: "apis",
    difficulty: "Intermediate",
    duration: "13 hours",
    prerequisites: ["JavaScript", "API fundamentals"],
    modules: [
      {
        id: "graphql-apollo-beginner",
        title: "Beginner Foundations",
        sections: [
          {
            id: "graphql-apollo-intro",
            title: "Core Concepts",
            lessons: [
              {
                id: "graphql-apollo-lesson-1",
                title: "GraphQL Crash Course with MERN",
                videoUrl: "https://www.youtube.com/embed/BcLNfwF04Kw",
              },
            ],
          },
        ],
      },
      {
        id: "graphql-apollo-intermediate",
        title: "Intermediate APIs",
        sections: [
          {
            id: "graphql-apollo-schema",
            title: "Schema Design",
            lessons: [
              {
                id: "graphql-apollo-lesson-2",
                title: "GraphQL in 100 Seconds",
                videoUrl: "https://www.youtube.com/embed/ed8SzALpx1Q",
              },
            ],
          },
        ],
      },
      {
        id: "graphql-apollo-advanced",
        title: "Advanced Production",
        sections: [
          {
            id: "graphql-apollo-federation",
            title: "Federation & Scale",
            lessons: [
              {
                id: "graphql-apollo-lesson-3",
                title: "Apollo Federation from Day One",
                videoUrl: "https://www.youtube.com/embed/DGAkGULuwEI",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "grpc-microservices",
    title: "gRPC Microservices",
    description: "Implement high-performance service-to-service communication with gRPC and Protocol Buffers.",
    category: "apis",
    difficulty: "Advanced",
    duration: "12 hours",
    prerequisites: ["Backend development", "Protocol Buffers"],
    modules: [
      {
        id: "grpc-beginner",
        title: "Beginner Foundations",
        sections: [
          {
            id: "grpc-intro",
            title: "gRPC Basics",
            lessons: [
              {
                id: "grpc-lesson-1",
                title: "gRPC Crash Course",
                videoUrl: "https://www.youtube.com/embed/Yw4rkaTc0f8",
              },
            ],
          },
        ],
      },
      {
        id: "grpc-intermediate",
        title: "Intermediate APIs",
        sections: [
          {
            id: "grpc-node",
            title: "gRPC with Node.js",
            lessons: [
              {
                id: "grpc-lesson-2",
                title: "gRPC in Node.js Tutorial",
                videoUrl: "https://www.youtube.com/embed/MCwgV9idOeY",
              },
            ],
          },
        ],
      },
      {
        id: "grpc-advanced",
        title: "Advanced Production",
        sections: [
          {
            id: "grpc-streaming",
            title: "Streaming & Observability",
            lessons: [
              {
                id: "grpc-lesson-3",
                title: "gRPC Streaming using Rust",
                videoUrl: "https://www.youtube.com/embed/WTWjWMy5hc8",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "fastapi-production-apis",
    title: "FastAPI Production APIs",
    description: "Ship blazing-fast REST APIs with FastAPI, SQLModel, and production-grade tooling.",
    category: "apis",
    difficulty: "Intermediate",
    duration: "11 hours",
    prerequisites: ["Python", "HTTP"],
    tags: ["FastAPI", "REST", "Async", "OpenAPI"],
    roles: ["Backend Engineer", "API Engineer", "Platform Engineer"],
    tools: ["FastAPI", "SQLModel", "Poetry", "Docker"],
    outcomes: [
      "Build asynchronous REST APIs with FastAPI",
      "Generate OpenAPI docs and client SDKs",
      "Deploy resilient APIs with observability and testing",
    ],
    languages: ["en"],
    status: "live",
    projectBriefs: [
      {
        id: "fastapi-billing-service",
        title: "Billing & Subscription API",
        description: "Implement a billing API with async processing, background tasks, and SLO monitoring.",
        deliverables: ["FastAPI service", "OpenAPI spec", "Synthetic monitoring suite"],
        difficulty: "Intermediate",
      },
    ],
    assessments: [
      {
        id: "fastapi-quiz",
        title: "FastAPI Architecture Quiz",
        type: "quiz",
        description: "Test knowledge of dependency injection, async patterns, and testing.",
      },
    ],
    modules: [
      {
        id: "fastapi-foundations",
        title: "FastAPI Foundations",
        sections: [
          {
            id: "fastapi-basics",
            title: "Core Concepts",
            lessons: [
              {
                id: "fastapi-lesson-1",
                title: "FastAPI Crash Course",
                videoUrl: "https://www.youtube.com/embed/0rsilnpU1DU",
              },
              {
                id: "fastapi-lesson-2",
                title: "Building Async APIs",
                videoUrl: "https://www.youtube.com/embed/3ij-rga08H4",
              },
            ],
          },
        ],
      },
      {
        id: "fastapi-quality",
        title: "Quality & Testing",
        sections: [
          {
            id: "fastapi-testing",
            title: "Testing & Performance",
            lessons: [
              {
                id: "fastapi-lesson-3",
                title: "Testing FastAPI Apps",
                videoUrl: "https://www.youtube.com/embed/sugvnHA7ElY",
              },
              {
                id: "fastapi-lesson-4",
                title: "Performance Tuning",
                videoUrl: "https://www.youtube.com/embed/dRwTssqqsPM",
              },
            ],
          },
        ],
      },
      {
        id: "fastapi-operations",
        title: "Operations & Deployment",
        sections: [
          {
            id: "fastapi-deployment",
            title: "Deployment & Monitoring",
            lessons: [
              {
                id: "fastapi-lesson-5",
                title: "Deploy FastAPI with Docker & CI/CD",
                videoUrl: "https://www.youtube.com/embed/4NHK88_GE9I",
              },
              {
                id: "fastapi-lesson-6",
                title: "Observability for FastAPI",
                videoUrl: "https://www.youtube.com/embed/SWIuHBSvnuY",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "async-event-driven-apis",
    title: "Async & Event-Driven APIs",
    description: "Design event-driven API platforms with AsyncAPI, Kafka, and reactive patterns.",
    category: "apis",
    difficulty: "Advanced",
    duration: "12 hours",
    prerequisites: ["Messaging systems", "Microservices"],
    tags: ["AsyncAPI", "Event-Driven", "Kafka", "Reactive"],
    roles: ["Platform Engineer", "Integration Architect", "Backend Engineer"],
    tools: ["Kafka", "AsyncAPI", "Redpanda", "Debezium"],
    outcomes: [
      "Model event-driven contracts with AsyncAPI",
      "Implement streaming and change data capture pipelines",
      "Govern events with schema registries and versioning",
    ],
    languages: ["en"],
    status: "beta",
    projectBriefs: [
      {
        id: "event-driven-ordering",
        title: "Event-Driven Ordering Platform",
        description: "Build a resilient ordering system with saga orchestration and observability.",
        deliverables: ["AsyncAPI specs", "Event orchestration workflow", "Monitoring dashboard"],
        difficulty: "Advanced",
      },
    ],
    assessments: [
      {
        id: "asyncapi-quiz",
        title: "AsyncAPI Design Quiz",
        type: "quiz",
        description: "Assess knowledge of event contracts, schema evolution, and reliability patterns.",
      },
    ],
    modules: [
      {
        id: "asyncapi-foundations",
        title: "Event-Driven Foundations",
        sections: [
          {
            id: "asyncapi-modeling",
            title: "Modeling Events",
            lessons: [
              {
                id: "asyncapi-lesson-1",
                title: "Event-Driven Architecture Overview",
                videoUrl: "https://www.youtube.com/embed/gOuAqRaDdHA",
              },
              {
                id: "asyncapi-lesson-2",
                title: "AsyncAPI Introduction",
                videoUrl: "https://www.youtube.com/embed/3ij-rga08H4",
              },
            ],
          },
        ],
      },
      {
        id: "asyncapi-integration",
        title: "Integration & Orchestration",
        sections: [
          {
            id: "asyncapi-sagas",
            title: "Sagas & Workflows",
            lessons: [
              {
                id: "asyncapi-lesson-3",
                title: "Saga Pattern Deep Dive",
                videoUrl: "https://www.youtube.com/embed/8fi7uSYlOdc",
              },
              {
                id: "asyncapi-lesson-4",
                title: "Event Sourcing & CQRS",
                videoUrl: "https://www.youtube.com/embed/yFjzGRb8NOk",
              },
            ],
          },
        ],
      },
      {
        id: "asyncapi-operations",
        title: "Operations & Governance",
        sections: [
          {
            id: "asyncapi-observability",
            title: "Observability & Governance",
            lessons: [
              {
                id: "asyncapi-lesson-5",
                title: "Observability for Event Architectures",
                videoUrl: "https://www.youtube.com/embed/kHCWH1kXmOs",
              },
              {
                id: "asyncapi-lesson-6",
                title: "Schema Governance & Versioning",
                videoUrl: "https://www.youtube.com/embed/93IHBZH01L0",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "api-security-zero-trust",
    title: "API Security & Zero Trust",
    description: "Secure APIs with OAuth, zero-trust patterns, and continuous security monitoring.",
    category: "apis",
    difficulty: "Advanced",
    duration: "10 hours",
    prerequisites: ["API fundamentals", "Security basics"],
    tags: ["API Security", "OAuth", "Zero Trust", "WAF"],
    roles: ["Security Engineer", "API Engineer", "Platform Architect"],
    tools: ["Okta", "Kong", "OWASP ZAP", "Cloudflare"],
    outcomes: [
      "Implement zero-trust API gateways and policies",
      "Automate API security testing and monitoring",
      "Respond to threats with anomaly detection and playbooks",
    ],
    languages: ["en"],
    status: "live",
    projectBriefs: [
      {
        id: "api-security-hardening",
        title: "API Security Hardening",
        description: "Audit existing APIs, implement zero-trust controls, and design an incident response plan.",
        deliverables: ["Security assessment", "Gateway policy set", "Incident response runbook"],
        difficulty: "Advanced",
      },
    ],
    assessments: [
      {
        id: "api-security-assessment",
        title: "API Threat Modeling Assignment",
        type: "assignment",
        description: "Create a threat model and mitigation plan for a multi-tenant API platform.",
      },
    ],
    modules: [
      {
        id: "api-security-foundations",
        title: "Security Foundations",
        sections: [
          {
            id: "api-security-threats",
            title: "Threat Landscape",
            lessons: [
              {
                id: "api-security-lesson-1",
                title: "OWASP API Security Top 10",
                videoUrl: "https://www.youtube.com/embed/YYe0FdfdgDU",
              },
              {
                id: "api-security-lesson-2",
                title: "API Threat Modeling",
                videoUrl: "https://www.youtube.com/embed/0rOYzue2JrA",
              },
            ],
          },
        ],
      },
      {
        id: "api-security-platform",
        title: "Platform Controls",
        sections: [
          {
            id: "api-security-gateways",
            title: "Gateways & Zero Trust",
            lessons: [
              {
                id: "api-security-lesson-3",
                title: "Zero Trust API Gateways",
                videoUrl: "https://www.youtube.com/embed/dG655mQFyZ0",
              },
              {
                id: "api-security-lesson-4",
                title: "OAuth 2.1 Deep Dive",
                videoUrl: "https://www.youtube.com/embed/WnzlbyTZsQY",
              },
            ],
          },
        ],
      },
      {
        id: "api-security-operations",
        title: "Operations & Response",
        sections: [
          {
            id: "api-security-monitoring",
            title: "Monitoring & Response",
            lessons: [
              {
                id: "api-security-lesson-5",
                title: "Continuous API Security Testing",
                videoUrl: "https://www.youtube.com/embed/wsZwhgGa5sE",
              },
              {
                id: "api-security-lesson-6",
                title: "Incident Response for APIs",
                videoUrl: "https://www.youtube.com/embed/2BOOl8_nwjQ",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "openapi-product-design",
    title: "OpenAPI Product Design",
    description: "Drive product-led API design using OpenAPI, governance, and developer experience best practices.",
    category: "apis",
    difficulty: "Intermediate",
    duration: "9 hours",
    prerequisites: ["API fundamentals", "Product management"],
    tags: ["OpenAPI", "DX", "Product", "Governance"],
    roles: ["API Product Manager", "Developer Experience Lead", "Backend Engineer"],
    tools: ["Stoplight", "Postman", "Swagger", "Backstage"],
    outcomes: [
      "Author product-led API specifications",
      "Establish API style guides and review workflows",
      "Measure API adoption and developer experience",
    ],
    languages: ["en"],
    status: "live",
    projectBriefs: [
      {
        id: "openapi-platform-governance",
        title: "API Governance Playbook",
        description: "Create a governance playbook with templates, review process, and DX metrics dashboard.",
        deliverables: ["API style guide", "Review checklist", "DX KPI dashboard"],
        difficulty: "Intermediate",
      },
    ],
    assessments: [
      {
        id: "openapi-assignment",
        title: "API Product Strategy Deck",
        type: "assignment",
        description: "Pitch an API product strategy with positioning, metrics, and lifecycle plan.",
      },
    ],
    modules: [
      {
        id: "openapi-foundations",
        title: "API Product Foundations",
        sections: [
          {
            id: "openapi-product-basics",
            title: "Product Thinking",
            lessons: [
              {
                id: "openapi-lesson-1",
                title: "API Product Management Fundamentals",
                videoUrl: "https://www.youtube.com/embed/T5y0WKmKenQ",
              },
              {
                id: "openapi-lesson-2",
                title: "Designing APIs with OpenAPI",
                videoUrl: "https://www.youtube.com/embed/PenvYHJ9Koc",
              },
            ],
          },
        ],
      },
      {
        id: "openapi-governance",
        title: "Governance & DX",
        sections: [
          {
            id: "openapi-style-guides",
            title: "Style Guides & Tooling",
            lessons: [
              {
                id: "openapi-lesson-3",
                title: "API Style Guide Best Practices",
                videoUrl: "https://www.youtube.com/embed/Unq0ZJmRHCc",
              },
              {
                id: "openapi-lesson-4",
                title: "Developer Experience Metrics",
                videoUrl: "https://www.youtube.com/embed/BQC4dphiu5c",
              },
            ],
          },
        ],
      },
      {
        id: "openapi-growth",
        title: "Growth & Adoption",
        sections: [
          {
            id: "openapi-adoption",
            title: "Adoption & Ecosystem",
            lessons: [
              {
                id: "openapi-lesson-5",
                title: "Measuring API Success",
                videoUrl: "https://www.youtube.com/embed/1cBO_zA2nek",
              },
              {
                id: "openapi-lesson-6",
                title: "Building a Developer Portal",
                videoUrl: "https://www.youtube.com/embed/6E3aCv08nl8",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "llm-systems-engineering",
    title: "LLM Systems Engineering",
    description: "Architect high-availability LLM platforms with vector search, orchestration, and guardrails.",
    category: "ai-engineering",
    difficulty: "Advanced",
    duration: "14 hours",
    prerequisites: ["Machine learning", "Cloud architecture"],
    tags: ["LLM Ops", "Vector Search", "Guardrails", "Observability"],
    roles: ["AI Engineer", "ML Platform Lead", "Solutions Architect"],
    tools: ["LangChain", "Ray Serve", "Pinecone", "OpenAI"],
    outcomes: [
      "Design resilient LLM serving stacks with autoscaling",
      "Implement retrieval, caching, and guardrail pipelines",
      "Instrument observability and feedback loops for LLMs",
    ],
    languages: ["en"],
    status: "live",
    projectBriefs: [
      {
        id: "llm-multi-tenant-platform",
        title: "Multi-tenant LLM Platform",
        description: "Build a multi-tenant LLM platform with vector search, routing, and safety enforcement.",
        deliverables: ["Architecture decision record", "Ray Serve deployment", "Safety evaluation report"],
        difficulty: "Advanced",
      },
    ],
    assessments: [
      {
        id: "llm-ops-quiz",
        title: "LLM Ops Readiness Quiz",
        type: "quiz",
        description: "Evaluate knowledge of LLM scaling, evaluation, and guardrail strategies.",
      },
    ],
    modules: [
      {
        id: "llm-architecture",
        title: "Platform Architecture",
        sections: [
          {
            id: "llm-architecture-foundations",
            title: "Systems & Retrieval",
            lessons: [
              {
                id: "llm-systems-1",
                title: "Productionizing LLM Applications",
                videoUrl: "https://www.youtube.com/embed/31USVCSS0sI",
              },
              {
                id: "llm-systems-2",
                title: "Retrieval-Augmented Generation Patterns",
                videoUrl: "https://www.youtube.com/embed/T-D1OfcDW1M",
              },
            ],
          },
        ],
      },
      {
        id: "llm-operations",
        title: "Operations & Guardrails",
        sections: [
          {
            id: "llm-guardrails",
            title: "Guardrails & Safety",
            lessons: [
              {
                id: "llm-systems-3",
                title: "Building Guardrails for LLMs",
                videoUrl: "https://www.youtube.com/embed/l5K4r_TJz_8",
              },
              {
                id: "llm-systems-4",
                title: "Evaluating LLM Responses",
                videoUrl: "https://www.youtube.com/embed/cRz0BWkuwHg",
              },
            ],
          },
        ],
      },
      {
        id: "llm-observability",
        title: "Observability & Feedback",
        sections: [
          {
            id: "llm-monitoring",
            title: "Monitoring & Iteration",
            lessons: [
              {
                id: "llm-systems-5",
                title: "Monitoring LLM Applications",
                videoUrl: "https://www.youtube.com/embed/csmhkFHv_ww",
              },
              {
                id: "llm-systems-6",
                title: "Human Feedback Loops",
                videoUrl: "https://www.youtube.com/embed/T_X4XFwKX8k",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "prompt-engineering-masterclass",
    title: "Prompt Engineering Masterclass",
    description: "Craft high-performing prompts, evaluation pipelines, and persona systems for LLM applications.",
    category: "ai-engineering",
    difficulty: "Intermediate",
    duration: "9 hours",
    prerequisites: ["LLM basics", "Product thinking"],
    tags: ["Prompt Engineering", "Evaluation", "Personas", "UX"],
    roles: ["Prompt Engineer", "Product Designer", "AI UX Strategist"],
    tools: ["LangSmith", "OpenAI", "Anthropic", "Notion"],
    outcomes: [
      "Design systematic prompt libraries with evaluation",
      "Create persona-driven conversational flows",
      "Run prompt experiments with guardrails and versioning",
    ],
    languages: ["en"],
    status: "live",
    projectBriefs: [
      {
        id: "prompt-playbook",
        title: "Enterprise Prompt Playbook",
        description: "Create a reusable prompt playbook with evaluation metrics and governance policies.",
        deliverables: ["Prompt taxonomy", "Evaluation harness", "Governance checklist"],
        difficulty: "Intermediate",
      },
    ],
    assessments: [
      {
        id: "prompt-design-assignment",
        title: "Prompt Optimization Assignment",
        type: "assignment",
        description: "Optimize prompts for a customer support use case and document trade-offs.",
      },
    ],
    modules: [
      {
        id: "prompt-foundations",
        title: "Prompt Foundations",
        sections: [
          {
            id: "prompt-structures",
            title: "Structures & Frameworks",
            lessons: [
              {
                id: "prompt-lesson-1",
                title: "Prompt Engineering Crash Course",
                videoUrl: "https://www.youtube.com/embed/dOxUroR57xs",
              },
              {
                id: "prompt-lesson-2",
                title: "System & Persona Prompts",
                videoUrl: "https://www.youtube.com/embed/jC4v5AS4RIM",
              },
            ],
          },
        ],
      },
      {
        id: "prompt-evaluation",
        title: "Evaluation & Experimentation",
        sections: [
          {
            id: "prompt-testing",
            title: "Testing Methodologies",
            lessons: [
              {
                id: "prompt-lesson-3",
                title: "Evaluating LLM Outputs",
                videoUrl: "https://www.youtube.com/embed/2kFjsacfiWY",
              },
              {
                id: "prompt-lesson-4",
                title: "Automated Prompt Testing",
                videoUrl: "https://www.youtube.com/embed/KQTZE3Hnhws",
              },
            ],
          },
        ],
      },
      {
        id: "prompt-governance",
        title: "Governance & Collaboration",
        sections: [
          {
            id: "prompt-libraries",
            title: "Prompt Libraries",
            lessons: [
              {
                id: "prompt-lesson-5",
                title: "Managing Prompt Repositories",
                videoUrl: "https://www.youtube.com/embed/fm3VreCt-5E",
              },
              {
                id: "prompt-lesson-6",
                title: "Collaborative Prompt Workflows",
                videoUrl: "https://www.youtube.com/embed/X3XJeTApVMM",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "rag-production-patterns",
    title: "RAG Production Patterns",
    description: "Deliver retrieval-augmented generation systems with hybrid search, evaluation, and MLOps.",
    category: "ai-engineering",
    difficulty: "Advanced",
    duration: "12 hours",
    prerequisites: ["Vector databases", "Prompt engineering"],
    tags: ["RAG", "Vector Search", "Evaluation", "Pipelines"],
    roles: ["AI Engineer", "Data Engineer", "Platform Engineer"],
    tools: ["LangChain", "Weaviate", "OpenAI", "Cohere"],
    outcomes: [
      "Compare dense and sparse retrieval strategies",
      "Implement evaluation pipelines and guardrails",
      "Automate RAG deployments with CI/CD",
    ],
    languages: ["en"],
    status: "beta",
    projectBriefs: [
      {
        id: "rag-knowledge-assistant",
        title: "Knowledge Base Assistant",
        description: "Build a RAG assistant over internal docs with hybrid retrieval and evaluation dashboards.",
        deliverables: ["Retrieval pipeline", "Evaluation notebook", "Observability dashboard"],
        difficulty: "Advanced",
      },
    ],
    assessments: [
      {
        id: "rag-evaluation-quiz",
        title: "RAG Architecture Quiz",
        type: "quiz",
        description: "Test understanding of retrieval strategies, chunking, and evaluation.",
      },
    ],
    modules: [
      {
        id: "rag-foundations",
        title: "RAG Foundations",
        sections: [
          {
            id: "rag-retrieval",
            title: "Retrieval Strategies",
            lessons: [
              {
                id: "rag-lesson-1",
                title: "Building RAG Systems",
                videoUrl: "https://www.youtube.com/embed/wVzuvf9D9BU",
              },
              {
                id: "rag-lesson-2",
                title: "Vector Databases Explained",
                videoUrl: "https://www.youtube.com/embed/dN0lsF2cvm4",
              },
            ],
          },
        ],
      },
      {
        id: "rag-evaluation",
        title: "Evaluation & Guardrails",
        sections: [
          {
            id: "rag-eval-pipelines",
            title: "Evaluation Pipelines",
            lessons: [
              {
                id: "rag-lesson-3",
                title: "Evaluating RAG Systems",
                videoUrl: "https://www.youtube.com/embed/5fp6e5nhJRk",
              },
              {
                id: "rag-lesson-4",
                title: "Guardrails & Safety",
                videoUrl: "https://www.youtube.com/embed/KOvchTohd6A",
              },
            ],
          },
        ],
      },
      {
        id: "rag-operations",
        title: "Operations & Scaling",
        sections: [
          {
            id: "rag-deployment",
            title: "Deployment & Monitoring",
            lessons: [
              {
                id: "rag-lesson-5",
                title: "Deploying RAG Apps",
                videoUrl: "https://www.youtube.com/embed/C0HwZipOqXI",
              },
              {
                id: "rag-lesson-6",
                title: "Observability for RAG",
                videoUrl: "https://www.youtube.com/embed/5fp6e5nhJRk",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "ai-ethics-governance",
    title: "AI Ethics & Governance",
    description: "Implement responsible AI frameworks, audits, and governance for enterprise AI systems.",
    category: "ai-engineering",
    difficulty: "Intermediate",
    duration: "8 hours",
    prerequisites: ["AI fundamentals", "Compliance"],
    tags: ["Responsible AI", "Governance", "Compliance", "Fairness"],
    roles: ["AI Governance Lead", "Compliance Officer", "Product Manager"],
    tools: ["AI Explainability 360", "WhyLabs", "Google Model Cards Toolkit", "Aequitas"],
    outcomes: [
      "Design responsible AI governance programs",
      "Conduct fairness and bias assessments",
      "Create model documentation and compliance workflows",
    ],
    languages: ["en"],
    status: "live",
    projectBriefs: [
      {
        id: "responsible-ai-blueprint",
        title: "Responsible AI Blueprint",
        description: "Develop a responsible AI program with policies, audits, and communication plan.",
        deliverables: ["Governance framework", "Risk assessment checklist", "Model card template"],
        difficulty: "Intermediate",
      },
    ],
    assessments: [
      {
        id: "ai-ethics-assignment",
        title: "Responsible AI Case Study",
        type: "assignment",
        description: "Evaluate an AI product for ethical risks and propose mitigation plan.",
      },
    ],
    modules: [
      {
        id: "ai-ethics-foundations",
        title: "Ethics Foundations",
        sections: [
          {
            id: "ai-ethics-principles",
            title: "Principles & Frameworks",
            lessons: [
              {
                id: "ai-ethics-lesson-1",
                title: "Responsible AI in Practice",
                videoUrl: "https://www.youtube.com/embed/2HUMFVAjlEA",
              },
              {
                id: "ai-ethics-lesson-2",
                title: "Ethical AI Frameworks",
                videoUrl: "https://www.youtube.com/embed/nmX2qG8VWmU",
              },
            ],
          },
        ],
      },
      {
        id: "ai-ethics-assurance",
        title: "Assurance & Audits",
        sections: [
          {
            id: "ai-ethics-audits",
            title: "Auditing AI Systems",
            lessons: [
              {
                id: "ai-ethics-lesson-3",
                title: "Auditing AI Models",
                videoUrl: "https://www.youtube.com/embed/rwA67-McFWo",
              },
              {
                id: "ai-ethics-lesson-4",
                title: "Bias & Fairness Testing",
                videoUrl: "https://www.youtube.com/embed/OogwtNLOtuc",
              },
            ],
          },
        ],
      },
      {
        id: "ai-ethics-governance-module",
        title: "Governance & Communication",
        sections: [
          {
            id: "ai-ethics-governance-section",
            title: "Governance Operations",
            lessons: [
              {
                id: "ai-ethics-lesson-5",
                title: "Model Cards & Documentation",
                videoUrl: "https://www.youtube.com/embed/i3J_e_ztQkw",
              },
              {
                id: "ai-ethics-lesson-6",
                title: "Communicating AI Risk",
                videoUrl: "https://www.youtube.com/embed/QgLoq4STOkk",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "vision-transformers-production",
    title: "Vision Transformers in Production",
    description: "Deploy vision transformers for real-world workloads with optimization and monitoring strategies.",
    category: "ai-engineering",
    difficulty: "Advanced",
    duration: "13 hours",
    prerequisites: ["Computer vision", "Deep learning"],
    tags: ["Vision Transformers", "PyTorch", "Optimization", "Edge"],
    roles: ["Computer Vision Engineer", "ML Engineer", "Edge AI Specialist"],
    tools: ["PyTorch", "Hugging Face", "TensorRT", "Weights & Biases"],
    outcomes: [
      "Fine-tune vision transformers for domain tasks",
      "Optimize and quantize models for edge deployment",
      "Monitor performance drift with real-world data",
    ],
    languages: ["en"],
    status: "beta",
    projectBriefs: [
      {
        id: "vit-industrial-inspection",
        title: "Industrial Inspection Transformer",
        description: "Deploy a ViT-based inspection solution with edge acceleration and monitoring.",
        deliverables: ["Fine-tuning notebook", "TensorRT deployment", "Monitoring pipeline"],
        difficulty: "Advanced",
      },
    ],
    assessments: [
      {
        id: "vision-transformer-quiz",
        title: "Vision Transformer Quiz",
        type: "quiz",
        description: "Measure understanding of ViT architectures, optimization, and deployment.",
      },
    ],
    modules: [
      {
        id: "vit-foundations",
        title: "Transformer Foundations",
        sections: [
          {
            id: "vit-architecture",
            title: "Architecture & Training",
            lessons: [
              {
                id: "vit-lesson-1",
                title: "Vision Transformers Explained",
                videoUrl: "https://www.youtube.com/embed/j3VNqtJUoz0",
              },
              {
                id: "vit-lesson-2",
                title: "Fine-tuning Vision Transformers",
                videoUrl: "https://www.youtube.com/embed/qU7wO02urYU",
              },
            ],
          },
        ],
      },
      {
        id: "vit-optimization",
        title: "Optimization & Deployment",
        sections: [
          {
            id: "vit-acceleration",
            title: "Acceleration Techniques",
            lessons: [
              {
                id: "vit-lesson-3",
                title: "Optimizing Vision Models",
                videoUrl: "https://www.youtube.com/embed/j3VNqtJUoz0",
              },
              {
                id: "vit-lesson-4",
                title: "Deploying ViT Models",
                videoUrl: "https://www.youtube.com/embed/j3VNqtJUoz0",
              },
            ],
          },
        ],
      },
      {
        id: "vit-monitoring",
        title: "Monitoring & Feedback",
        sections: [
          {
            id: "vit-drift",
            title: "Monitoring & Drift",
            lessons: [
              {
                id: "vit-lesson-5",
                title: "Monitoring Computer Vision Systems",
                videoUrl: "https://www.youtube.com/embed/puB-4LuRNys",
              },
              {
                id: "vit-lesson-6",
                title: "Closing the Loop with Feedback",
                videoUrl: "https://www.youtube.com/embed/eBpq78UqRmk",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "edge-ai-optimization",
    title: "Edge AI Optimization",
    description: "Optimize and deploy AI workloads on edge devices with TensorRT, ONNX Runtime, and acceleration toolchains.",
    category: "ai-engineering",
    difficulty: "Advanced",
    duration: "11 hours",
    prerequisites: ["Deep learning", "Embedded systems"],
    tags: ["Edge AI", "TensorRT", "Optimization", "Deployment"],
    roles: ["Edge AI Engineer", "ML Engineer", "Robotics Engineer"],
    tools: ["TensorRT", "ONNX Runtime", "NVIDIA Jetson", "Edge Impulse"],
    outcomes: [
      "Quantize and optimize models for constrained hardware",
      "Deploy AI workloads on Jetson and ARM devices",
      "Monitor performance and thermal constraints in production",
    ],
    languages: ["en"],
    status: "beta",
    projectBriefs: [
      {
        id: "edge-ai-monitoring",
        title: "Smart Edge Monitoring",
        description: "Deploy an optimized detection model on edge hardware with telemetry and remote updates.",
        deliverables: ["Optimization pipeline", "Edge deployment scripts", "Telemetry dashboard"],
        difficulty: "Advanced",
      },
    ],
    assessments: [
      {
        id: "edge-ai-quiz",
        title: "Edge Optimization Quiz",
        type: "quiz",
        description: "Test knowledge of quantization, acceleration, and deployment strategies.",
      },
    ],
    modules: [
      {
        id: "edge-ai-foundations",
        title: "Edge AI Foundations",
        sections: [
          {
            id: "edge-ai-constraints",
            title: "Constraints & Architectures",
            lessons: [
              {
                id: "edge-ai-lesson-1",
                title: "Edge AI Overview",
                videoUrl: "https://www.youtube.com/embed/z5lIrWTebOY",
              },
              {
                id: "edge-ai-lesson-2",
                title: "Designing Edge AI Systems",
                videoUrl: "https://www.youtube.com/embed/hgFgoD0ii6E",
              },
            ],
          },
        ],
      },
      {
        id: "edge-ai-optimization-module",
        title: "Optimization Pipeline",
        sections: [
          {
            id: "edge-ai-tensorrt",
            title: "TensorRT & Quantization",
            lessons: [
              {
                id: "edge-ai-lesson-3",
                title: "Model Optimization with TensorRT",
                videoUrl: "https://www.youtube.com/embed/r4KG3dehF48",
              },
              {
                id: "edge-ai-lesson-4",
                title: "ONNX Runtime on Edge",
                videoUrl: "https://www.youtube.com/embed/M4o4YRVba4o",
              },
            ],
          },
        ],
      },
      {
        id: "edge-ai-operations-module",
        title: "Operations & Monitoring",
        sections: [
          {
            id: "edge-ai-operations",
            title: "Monitoring & Updates",
            lessons: [
              {
                id: "edge-ai-lesson-5",
                title: "Deploying AI on Jetson",
                videoUrl: "https://www.youtube.com/embed/Fegmuh6_mEg",
              },
              {
                id: "edge-ai-lesson-6",
                title: "Telemetry for Edge AI",
                videoUrl: "https://www.youtube.com/embed/hLvwoow3XTk",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "agentic-ai-workflows",
    title: "Agentic AI Workflows",
    description: "Build autonomous agent systems with tool orchestration, memory, and evaluation loops.",
    category: "ai-engineering",
    difficulty: "Advanced",
    duration: "12 hours",
    prerequisites: ["LLM applications", "API integrations"],
    tags: ["Agents", "Automation", "LLM", "Tooling"],
    roles: ["AI Engineer", "Automation Architect", "Product Manager"],
    tools: ["LangGraph", "AutoGen", "OpenAI", "Supabase"],
    outcomes: [
      "Design agent architectures with memory and tool use",
      "Coordinate multi-agent collaboration and supervision",
      "Evaluate agent performance with simulation and telemetry",
    ],
    languages: ["en"],
    status: "live",
    projectBriefs: [
      {
        id: "agent-operations-center",
        title: "Agent Operations Center",
        description: "Create an agent command center with monitoring, fallbacks, and human-in-the-loop controls.",
        deliverables: ["Agent workflow diagrams", "Observation dashboard", "Escalation playbook"],
        difficulty: "Advanced",
      },
    ],
    assessments: [
      {
        id: "agentic-ai-assignment",
        title: "Agent Design Assignment",
        type: "assignment",
        description: "Design an agentic workflow for a complex business process and justify design choices.",
      },
    ],
    modules: [
      {
        id: "agentic-foundations",
        title: "Agent Foundations",
        sections: [
          {
            id: "agent-architectures",
            title: "Architectures & Memory",
            lessons: [
              {
                id: "agentic-lesson-1",
                title: "Building LLM Agents",
                videoUrl: "https://www.youtube.com/embed/aywZrzNaKjs",
              },
              {
                id: "agentic-lesson-2",
                title: "Memory Strategies for Agents",
                videoUrl: "https://www.youtube.com/embed/JTL0yp85FsE",
              },
            ],
          },
        ],
      },
      {
        id: "agentic-orchestration",
        title: "Tooling & Orchestration",
        sections: [
          {
            id: "agent-tooling",
            title: "Tools & Coordination",
            lessons: [
              {
                id: "agentic-lesson-3",
                title: "Tool-using Agents",
                videoUrl: "https://www.youtube.com/embed/hLJTcVHW8_I",
              },
              {
                id: "agentic-lesson-4",
                title: "Multi-Agent Collaboration",
                videoUrl: "https://www.youtube.com/embed/X3XJeTApVMM",
              },
            ],
          },
        ],
      },
      {
        id: "agentic-evaluation",
        title: "Evaluation & Safety",
        sections: [
          {
            id: "agent-evaluation",
            title: "Evaluation & Guardrails",
            lessons: [
              {
                id: "agentic-lesson-5",
                title: "Evaluating Agent Systems",
                videoUrl: "https://www.youtube.com/embed/_QozKR9eQE8",
              },
              {
                id: "agentic-lesson-6",
                title: "Guardrails for Agents",
                videoUrl: "https://www.youtube.com/embed/rMUycP_cp9g",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "voice-ai-production-pipelines",
    title: "Voice AI Production Pipelines",
    description: "Deliver speech-enabled experiences with ASR, TTS, voice cloning, and analytics.",
    category: "ai-engineering",
    difficulty: "Intermediate",
    duration: "10 hours",
    prerequisites: ["Audio processing", "Machine learning"],
    tags: ["Voice AI", "ASR", "TTS", "Analytics"],
    roles: ["Voice Engineer", "Conversation Designer", "AI Product Manager"],
    tools: ["Whisper", "ElevenLabs", "Speechly", "Twilio"],
    outcomes: [
      "Integrate ASR and TTS pipelines for real-time experiences",
      "Implement voice biometrics and personalization",
      "Measure voice experience quality with analytics",
    ],
    languages: ["en"],
    status: "live",
    projectBriefs: [
      {
        id: "voice-ai-assistant",
        title: "Voice Service Assistant",
        description: "Build a voice assistant with multi-language support, analytics, and guardrails.",
        deliverables: ["Voice pipeline architecture", "Analytics dashboard", "Quality scorecard"],
        difficulty: "Intermediate",
      },
    ],
    assessments: [
      {
        id: "voice-ai-quiz",
        title: "Voice AI Quiz",
        type: "quiz",
        description: "Check proficiency across ASR, TTS, and conversational design.",
      },
    ],
    modules: [
      {
        id: "voice-ai-foundations",
        title: "Voice AI Foundations",
        sections: [
          {
            id: "voice-asr",
            title: "Speech Recognition",
            lessons: [
              {
                id: "voice-ai-lesson-1",
                title: "Automatic Speech Recognition Overview",
                videoUrl: "https://www.youtube.com/embed/Q0vrQFyAdWI",
              },
              {
                id: "voice-ai-lesson-2",
                title: "Using Whisper for ASR",
                videoUrl: "https://www.youtube.com/embed/p-zyNYZQLSk",
              },
            ],
          },
        ],
      },
      {
        id: "voice-ai-synthesis",
        title: "Synthesis & Personalization",
        sections: [
          {
            id: "voice-tts",
            title: "Text-to-Speech & Emotion",
            lessons: [
              {
                id: "voice-ai-lesson-3",
                title: "Building TTS Experiences",
                videoUrl: "https://www.youtube.com/embed/n83lO14Jr1w",
              },
              {
                id: "voice-ai-lesson-4",
                title: "Voice Cloning Techniques",
                videoUrl: "https://www.youtube.com/embed/aMKeRfhZkuU",
              },
            ],
          },
        ],
      },
      {
        id: "voice-ai-analytics",
        title: "Analytics & Quality",
        sections: [
          {
            id: "voice-ai-insights",
            title: "Analytics & Monitoring",
            lessons: [
              {
                id: "voice-ai-lesson-5",
                title: "Measuring Voice Experiences",
                videoUrl: "https://www.youtube.com/embed/C9VY-nQ8ubg",
              },
              {
                id: "voice-ai-lesson-6",
                title: "Conversation Analytics",
                videoUrl: "https://www.youtube.com/embed/g9cr7CYu0Tw",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "offensive-security-red-team",
    title: "Offensive Security Red Team",
    description: "Execute advanced adversary emulation, phishing, and post-exploitation operations.",
    category: "cybersecurity",
    difficulty: "Advanced",
    duration: "14 hours",
    prerequisites: ["Penetration testing", "Networking"],
    tags: ["Red Team", "Adversary Emulation", "Post-Exploitation", "Tradecraft"],
    roles: ["Red Team Operator", "Offensive Security Engineer", "Security Consultant"],
    tools: ["Cobalt Strike", "Mythic", "BloodHound", "Empire"],
    outcomes: [
      "Plan and execute advanced adversary campaigns",
      "Bypass defenses with tradecraft and operator tooling",
      "Document findings for purple team collaboration",
    ],
    languages: ["en"],
    status: "live",
    projectBriefs: [
      {
        id: "red-team-operation",
        title: "Adversary Emulation Operation",
        description: "Conduct a multi-stage adversary emulation simulating a targeted attack.",
        deliverables: ["Operation plan", "Command log", "Executive debrief"],
        difficulty: "Advanced",
      },
    ],
    assessments: [
      {
        id: "red-team-quiz",
        title: "Red Team Tradecraft Quiz",
        type: "quiz",
        description: "Evaluate knowledge of OPSEC, lateral movement, and privilege escalation.",
      },
    ],
    modules: [
      {
        id: "red-team-foundations",
        title: "Adversary Planning",
        sections: [
          {
            id: "red-team-planning",
            title: "Campaign Planning",
            lessons: [
              {
                id: "red-team-lesson-1",
                title: "Building a Red Team Program",
                videoUrl: "https://www.youtube.com/embed/xH5vIwtSJWg",
              },
              {
                id: "red-team-lesson-2",
                title: "Adversary Emulation Plans",
                videoUrl: "https://www.youtube.com/embed/X4VuzccCDTU",
              },
            ],
          },
        ],
      },
      {
        id: "red-team-operations",
        title: "Execution & Tradecraft",
        sections: [
          {
            id: "red-team-tradecraft",
            title: "Tradecraft & Tooling",
            lessons: [
              {
                id: "red-team-lesson-3",
                title: "Phishing & Initial Access",
                videoUrl: "https://www.youtube.com/embed/u9dBGWVwMMA",
              },
              {
                id: "red-team-lesson-4",
                title: "Post-Exploitation Techniques",
                videoUrl: "https://www.youtube.com/embed/3COTqQF568g",
              },
            ],
          },
        ],
      },
      {
        id: "red-team-reporting",
        title: "Reporting & Collaboration",
        sections: [
          {
            id: "red-team-debrief",
            title: "Debrief & Purple Teaming",
            lessons: [
              {
                id: "red-team-lesson-5",
                title: "Purple Team Collaboration",
                videoUrl: "https://www.youtube.com/embed/GRTa7HfJC6w",
              },
              {
                id: "red-team-lesson-6",
                title: "Reporting to Executives",
                videoUrl: "https://www.youtube.com/embed/Fzi4T94QCjw",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "cloud-security-architecture",
    title: "Cloud Security Architecture",
    description: "Secure AWS, Azure, and GCP workloads with identity, network, and data protection patterns.",
    category: "cybersecurity",
    difficulty: "Advanced",
    duration: "12 hours",
    prerequisites: ["Cloud", "Security"],
    tags: ["Cloud Security", "Zero Trust", "IAM", "Data Protection"],
    roles: ["Cloud Security Architect", "Security Engineer", "DevSecOps"],
    tools: ["AWS Security Hub", "Azure Defender", "GCP SCC", "HashiCorp Vault"],
    outcomes: [
      "Design cloud landing zones with security guardrails",
      "Implement identity-centric zero trust architectures",
      "Automate compliance and detection controls",
    ],
    languages: ["en"],
    status: "live",
    projectBriefs: [
      {
        id: "cloud-security-reference",
        title: "Cloud Security Reference Architecture",
        description: "Create a multi-cloud security reference architecture with policies and monitoring.",
        deliverables: ["Architecture diagrams", "Policy controls", "Monitoring dashboards"],
        difficulty: "Advanced",
      },
    ],
    assessments: [
      {
        id: "cloud-security-quiz",
        title: "Cloud Security Control Quiz",
        type: "quiz",
        description: "Test understanding of IAM, networking, and data protection patterns.",
      },
    ],
    modules: [
      {
        id: "cloud-security-foundations",
        title: "Security Foundations",
        sections: [
          {
            id: "cloud-security-landing-zones",
            title: "Landing Zones & IAM",
            lessons: [
              {
                id: "cloud-security-lesson-1",
                title: "Cloud Security Fundamentals",
                videoUrl: "https://www.youtube.com/embed/M_9hRPVH5SA",
              },
              {
                id: "cloud-security-lesson-2",
                title: "IAM Best Practices",
                videoUrl: "https://www.youtube.com/embed/ZhvXW-ILyPs",
              },
            ],
          },
        ],
      },
      {
        id: "cloud-security-networking",
        title: "Network & Data Security",
        sections: [
          {
            id: "cloud-security-network",
            title: "Network Controls",
            lessons: [
              {
                id: "cloud-security-lesson-3",
                title: "Zero Trust Networking in the Cloud",
                videoUrl: "https://www.youtube.com/embed/yn6CPQ9RioA",
              },
              {
                id: "cloud-security-lesson-4",
                title: "Data Protection & Encryption",
                videoUrl: "https://www.youtube.com/embed/jpsc4c7lntw",
              },
            ],
          },
        ],
      },
      {
        id: "cloud-security-operations",
        title: "Operations & Compliance",
        sections: [
          {
            id: "cloud-security-automation",
            title: "Automation & Monitoring",
            lessons: [
              {
                id: "cloud-security-lesson-5",
                title: "Automating Cloud Security",
                videoUrl: "https://www.youtube.com/embed/Iwxr4xQ-yqY",
              },
              {
                id: "cloud-security-lesson-6",
                title: "Continuous Compliance",
                videoUrl: "https://www.youtube.com/embed/hywrc0Fwp8A",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "blue-team-detection-engineering",
    title: "Blue Team Detection Engineering",
    description: "Build and operationalize detections, hunting workflows, and SOC automation.",
    category: "cybersecurity",
    difficulty: "Advanced",
    duration: "11 hours",
    prerequisites: ["Security operations", "SIEM"],
    tags: ["Detection Engineering", "Threat Hunting", "SOC", "Automation"],
    roles: ["Detection Engineer", "SOC Analyst", "Threat Hunter"],
    tools: ["Splunk", "Elastic SIEM", "Sigma", "Chronicle"],
    outcomes: [
      "Develop behavioral detections mapped to ATT&CK",
      "Operationalize hunts and continuous measurement",
      "Automate alert triage and enrichment",
    ],
    languages: ["en"],
    status: "live",
    projectBriefs: [
      {
        id: "detection-engineering-program",
        title: "Detection Engineering Program",
        description: "Create a detection backlog, automation pipeline, and coverage reporting framework.",
        deliverables: ["Detection roadmap", "Automation workflow", "Coverage dashboard"],
        difficulty: "Advanced",
      },
    ],
    assessments: [
      {
        id: "detection-engineering-quiz",
        title: "Detection Engineering Quiz",
        type: "quiz",
        description: "Test knowledge of ATT&CK mapping, detection quality, and automation.",
      },
    ],
    modules: [
      {
        id: "detection-foundations",
        title: "Detection Foundations",
        sections: [
          {
            id: "detection-design",
            title: "Designing Detections",
            lessons: [
              {
                id: "detection-lesson-1",
                title: "Introduction to Detection Engineering",
                videoUrl: "https://www.youtube.com/embed/LGkSRlhnf-s",
              },
              {
                id: "detection-lesson-2",
                title: "Mapping to ATT&CK",
                videoUrl: "https://www.youtube.com/embed/WmQPtk3Ybxs",
              },
            ],
          },
        ],
      },
      {
        id: "detection-automation",
        title: "Automation & Hunting",
        sections: [
          {
            id: "detection-automation-section",
            title: "Automation Workflows",
            lessons: [
              {
                id: "detection-lesson-3",
                title: "Threat Hunting Playbooks",
                videoUrl: "https://www.youtube.com/embed/Ux_7HMwqTdU",
              },
              {
                id: "detection-lesson-4",
                title: "Automation for SOC",
                videoUrl: "https://www.youtube.com/embed/Xh9AP-x06jU",
              },
            ],
          },
        ],
      },
      {
        id: "detection-measurement",
        title: "Measurement & Improvement",
        sections: [
          {
            id: "detection-metrics",
            title: "Metrics & Feedback",
            lessons: [
              {
                id: "detection-lesson-5",
                title: "Measuring Detection Quality",
                videoUrl: "https://www.youtube.com/embed/rVPGL-aqKO4",
              },
              {
                id: "detection-lesson-6",
                title: "Continuous Improvement",
                videoUrl: "https://www.youtube.com/embed/anA_TiUfmbM",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "application-security-program",
    title: "Application Security Program",
    description: "Build an AppSec program with secure SDLC, threat modeling, and developer enablement.",
    category: "cybersecurity",
    difficulty: "Intermediate",
    duration: "10 hours",
    prerequisites: ["Web development", "Security basics"],
    tags: ["AppSec", "Secure SDLC", "Threat Modeling", "DevSecOps"],
    roles: ["Application Security Engineer", "DevSecOps Lead", "Software Engineer"],
    tools: ["OWASP ZAP", "Snyk", "Threat Dragon", "GitHub Advanced Security"],
    outcomes: [
      "Integrate security controls across the SDLC",
      "Run collaborative threat modeling workshops",
      "Enable developers with secure coding practices",
    ],
    languages: ["en"],
    status: "live",
    projectBriefs: [
      {
        id: "appsec-program-roadmap",
        title: "AppSec Program Roadmap",
        description: "Design an AppSec program with tooling, training, and metrics for product teams.",
        deliverables: ["Program roadmap", "Threat modeling template", "Metrics dashboard"],
        difficulty: "Intermediate",
      },
    ],
    assessments: [
      {
        id: "appsec-threat-model",
        title: "Threat Modeling Assignment",
        type: "assignment",
        description: "Perform a threat model and mitigation plan for a web application.",
      },
    ],
    modules: [
      {
        id: "appsec-foundations",
        title: "Secure SDLC Foundations",
        sections: [
          {
            id: "appsec-sdlc",
            title: "Secure Development Lifecycle",
            lessons: [
              {
                id: "appsec-lesson-1",
                title: "Secure SDLC Explained",
                videoUrl: "https://www.youtube.com/embed/mmVXL0LzLks",
              },
              {
                id: "appsec-lesson-2",
                title: "Integrating Security into DevOps",
                videoUrl: "https://www.youtube.com/embed/svnFyXvDDOE",
              },
            ],
          },
        ],
      },
      {
        id: "appsec-threat-modeling",
        title: "Threat Modeling & Testing",
        sections: [
          {
            id: "appsec-threat",
            title: "Threat Modeling",
            lessons: [
              {
                id: "appsec-lesson-3",
                title: "Threat Modeling Workshop",
                videoUrl: "https://www.youtube.com/embed/rEnJYNkUde0",
              },
              {
                id: "appsec-lesson-4",
                title: "Automation & Security Testing",
                videoUrl: "https://www.youtube.com/embed/B7tTQ272OHE",
              },
            ],
          },
        ],
      },
      {
        id: "appsec-enablement",
        title: "Developer Enablement",
        sections: [
          {
            id: "appsec-training",
            title: "Training & Metrics",
            lessons: [
              {
                id: "appsec-lesson-5",
                title: "Developer Security Enablement",
                videoUrl: "https://www.youtube.com/embed/_tUGcSy3uBk",
              },
              {
                id: "appsec-lesson-6",
                title: "Metrics that Matter",
                videoUrl: "https://www.youtube.com/embed/e-Brdho1kYs",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "zero-trust-network-architecture",
    title: "Zero Trust Network Architecture",
    description: "Design identity-centric network architectures with zero trust principles and continuous verification.",
    category: "cybersecurity",
    difficulty: "Advanced",
    duration: "10 hours",
    prerequisites: ["Networking", "Security architecture"],
    tags: ["Zero Trust", "Identity", "Network Segmentation", "Policy"],
    roles: ["Security Architect", "Network Architect", "CISO"],
    tools: ["Zscaler", "Okta", "BeyondCorp", "Illumio"],
    outcomes: [
      "Model zero trust architectures across hybrid environments",
      "Implement policy enforcement and microsegmentation",
      "Measure maturity with continuous verification telemetry",
    ],
    languages: ["en"],
    status: "live",
    projectBriefs: [
      {
        id: "zero-trust-roadmap",
        title: "Zero Trust Roadmap",
        description: "Create a zero trust transformation roadmap with milestones, metrics, and governance.",
        deliverables: ["Current state assessment", "Target architecture", "Implementation milestones"],
        difficulty: "Advanced",
      },
    ],
    assessments: [
      {
        id: "zero-trust-quiz",
        title: "Zero Trust Strategy Quiz",
        type: "quiz",
        description: "Measure understanding of policy engines, enforcement points, and data protection.",
      },
    ],
    modules: [
      {
        id: "zero-trust-foundations",
        title: "Foundations & Principles",
        sections: [
          {
            id: "zero-trust-principles",
            title: "Principles & Strategy",
            lessons: [
              {
                id: "zero-trust-lesson-1",
                title: "Zero Trust Explained",
                videoUrl: "https://www.youtube.com/embed/yn6CPQ9RioA",
              },
              {
                id: "zero-trust-lesson-2",
                title: "Designing Zero Trust Architectures",
                videoUrl: "https://www.youtube.com/embed/yn6CPQ9RioA",
              },
            ],
          },
        ],
      },
      {
        id: "zero-trust-enforcement",
        title: "Enforcement & Controls",
        sections: [
          {
            id: "zero-trust-enforcement-section",
            title: "Policy & Segmentation",
            lessons: [
              {
                id: "zero-trust-lesson-3",
                title: "Identity as the Perimeter",
                videoUrl: "https://www.youtube.com/embed/AAY1bsazcgM",
              },
              {
                id: "zero-trust-lesson-4",
                title: "Microsegmentation Strategies",
                videoUrl: "https://www.youtube.com/embed/8m3pFJEeGh8",
              },
            ],
          },
        ],
      },
      {
        id: "zero-trust-operations-module",
        title: "Operations & Measurement",
        sections: [
          {
            id: "zero-trust-operations",
            title: "Telemetry & Metrics",
            lessons: [
              {
                id: "zero-trust-lesson-5",
                title: "Zero Trust Telemetry",
                videoUrl: "https://www.youtube.com/embed/E3F-f_F8zj0",
              },
              {
                id: "zero-trust-lesson-6",
                title: "Maturity Assessments",
                videoUrl: "https://www.youtube.com/embed/uGNiNzGkSSE",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "incident-response-operations",
    title: "Incident Response Operations",
    description: "Lead security incidents with playbooks, forensics, communications, and post-incident reviews.",
    category: "cybersecurity",
    difficulty: "Intermediate",
    duration: "9 hours",
    prerequisites: ["Security operations", "Risk"],
    tags: ["Incident Response", "Forensics", "Communication", "Tabletop"],
    roles: ["Incident Commander", "Security Manager", "IR Analyst"],
    tools: ["TheHive", "MISP", "Velociraptor", "Notion"],
    outcomes: [
      "Coordinate cross-functional incident response",
      "Conduct forensics and evidence handling",
      "Run post-incident reviews with action tracking",
    ],
    languages: ["en"],
    status: "live",
    projectBriefs: [
      {
        id: "incident-response-plan",
        title: "Incident Response Plan",
        description: "Develop an enterprise IR plan with playbooks, communication matrix, and tabletop scenarios.",
        deliverables: ["Incident response plan", "Tabletop exercise", "After-action report"],
        difficulty: "Intermediate",
      },
    ],
    assessments: [
      {
        id: "incident-response-assignment",
        title: "Incident Simulation Assignment",
        type: "assignment",
        description: "Simulate an incident scenario and document decisions across lifecycle.",
      },
    ],
    modules: [
      {
        id: "ir-foundations",
        title: "IR Foundations",
        sections: [
          {
            id: "ir-lifecycle",
            title: "Lifecycle & Roles",
            lessons: [
              {
                id: "ir-lesson-1",
                title: "Incident Response Lifecycle",
                videoUrl: "https://www.youtube.com/embed/ToVVhMyU3dQ",
              },
              {
                id: "ir-lesson-2",
                title: "Roles & Responsibilities",
                videoUrl: "https://www.youtube.com/embed/fAYXMaY0Qlk",
              },
            ],
          },
        ],
      },
      {
        id: "ir-forensics",
        title: "Forensics & Response",
        sections: [
          {
            id: "ir-forensics-section",
            title: "Evidence & Containment",
            lessons: [
              {
                id: "ir-lesson-3",
                title: "Digital Forensics Tools",
                videoUrl: "https://www.youtube.com/embed/DE0C5-dk5SU",
              },
              {
                id: "ir-lesson-4",
                title: "Containment Strategies",
                videoUrl: "https://www.youtube.com/embed/oZHPxyrCSmw",
              },
            ],
          },
        ],
      },
      {
        id: "ir-communications",
        title: "Communications & Recovery",
        sections: [
          {
            id: "ir-comms",
            title: "Communication & PIR",
            lessons: [
              {
                id: "ir-lesson-5",
                title: "Communicating During Incidents",
                videoUrl: "https://www.youtube.com/embed/zf4HvkF7Ocw",
              },
              {
                id: "ir-lesson-6",
                title: "Post-Incident Reviews",
                videoUrl: "https://www.youtube.com/embed/UcEXyT6TneU",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "security-automation-soar",
    title: "Security Automation & SOAR",
    description: "Automate security operations with SOAR playbooks, enrichment, and continuous improvement.",
    category: "cybersecurity",
    difficulty: "Intermediate",
    duration: "8 hours",
    prerequisites: ["Security operations", "Scripting"],
    tags: ["SOAR", "Automation", "Playbooks", "Security Engineering"],
    roles: ["Security Automation Engineer", "SOC Engineer", "DevSecOps"],
    tools: ["Cortex XSOAR", "Tines", "Phantom", "Python"],
    outcomes: [
      "Design automation playbooks for SOC workflows",
      "Integrate enrichment, approvals, and case management",
      "Measure automation ROI and coverage",
    ],
    languages: ["en"],
    status: "live",
    projectBriefs: [
      {
        id: "soar-automation-program",
        title: "SOAR Automation Program",
        description: "Deliver a SOAR automation program with prioritized playbooks and metrics dashboard.",
        deliverables: ["Playbook backlog", "Automation runbooks", "Metrics reporting"],
        difficulty: "Intermediate",
      },
    ],
    assessments: [
      {
        id: "soar-quiz",
        title: "Security Automation Quiz",
        type: "quiz",
        description: "Assess skills in playbook design, integration, and measurement.",
      },
    ],
    modules: [
      {
        id: "soar-foundations",
        title: "Automation Foundations",
        sections: [
          {
            id: "soar-basics",
            title: "Playbook Design",
            lessons: [
              {
                id: "soar-lesson-1",
                title: "Security Automation Fundamentals",
                videoUrl: "https://www.youtube.com/embed/k7ju95jDxFA",
              },
              {
                id: "soar-lesson-2",
                title: "Designing SOAR Playbooks",
                videoUrl: "https://www.youtube.com/embed/6_LCiHOsNdw",
              },
            ],
          },
        ],
      },
      {
        id: "soar-integration",
        title: "Integration & Enrichment",
        sections: [
          {
            id: "soar-enrichment",
            title: "Integration Patterns",
            lessons: [
              {
                id: "soar-lesson-3",
                title: "Integrating Threat Intelligence",
                videoUrl: "https://www.youtube.com/embed/NO8Zn3K3ifc",
              },
              {
                id: "soar-lesson-4",
                title: "Automating Case Management",
                videoUrl: "https://www.youtube.com/embed/2ZJbtnW2n5I",
              },
            ],
          },
        ],
      },
      {
        id: "soar-operations",
        title: "Operations & Metrics",
        sections: [
          {
            id: "soar-metrics",
            title: "Metrics & Optimization",
            lessons: [
              {
                id: "soar-lesson-5",
                title: "Measuring Automation Success",
                videoUrl: "https://www.youtube.com/embed/W6L2hIPt9mg",
              },
              {
                id: "soar-lesson-6",
                title: "Continuous Improvement",
                videoUrl: "https://www.youtube.com/embed/anA_TiUfmbM",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "governance-risk-compliance",
    title: "Governance, Risk & Compliance (GRC)",
    description: "Build enterprise security programs with risk management, compliance frameworks, and audits.",
    category: "cybersecurity",
    difficulty: "Intermediate",
    duration: "9 hours",
    prerequisites: ["Security management", "Risk"],
    tags: ["GRC", "Risk Management", "Compliance", "Audits"],
    roles: ["GRC Analyst", "Security Manager", "Compliance Officer"],
    tools: ["OneTrust", "Drata", "LogicGate", "Jira"],
    outcomes: [
      "Establish risk management frameworks",
      "Operationalize compliance certifications",
      "Report risk posture to executives",
    ],
    languages: ["en"],
    status: "live",
    projectBriefs: [
      {
        id: "grc-program",
        title: "GRC Program Charter",
        description: "Develop a GRC program charter with risk register, control catalog, and audit plan.",
        deliverables: ["Program charter", "Risk register", "Audit schedule"],
        difficulty: "Intermediate",
      },
    ],
    assessments: [
      {
        id: "grc-case-study",
        title: "GRC Case Study",
        type: "assignment",
        description: "Analyze a compliance scenario and recommend mitigation strategies.",
      },
    ],
    modules: [
      {
        id: "grc-foundations",
        title: "GRC Foundations",
        sections: [
          {
            id: "grc-risk",
            title: "Risk Management",
            lessons: [
              {
                id: "grc-lesson-1",
                title: "Risk Management Fundamentals",
                videoUrl: "https://www.youtube.com/embed/BLAEuVSAlVM",
              },
              {
                id: "grc-lesson-2",
                title: "Building a Risk Register",
                videoUrl: "https://www.youtube.com/embed/X8ctOX2mEw4",
              },
            ],
          },
        ],
      },
      {
        id: "grc-compliance",
        title: "Compliance & Audits",
        sections: [
          {
            id: "grc-frameworks",
            title: "Frameworks & Controls",
            lessons: [
              {
                id: "grc-lesson-3",
                title: "SOC 2 & ISO 27001 Explained",
                videoUrl: "https://www.youtube.com/embed/mpxaZIUSOmc",
              },
              {
                id: "grc-lesson-4",
                title: "Automating Compliance",
                videoUrl: "https://www.youtube.com/embed/fWF0rtEPaE4",
              },
            ],
          },
        ],
      },
      {
        id: "grc-reporting",
        title: "Reporting & Governance",
        sections: [
          {
            id: "grc-governance",
            title: "Executive Reporting",
            lessons: [
              {
                id: "grc-lesson-5",
                title: "Security Metrics & Reporting",
                videoUrl: "https://www.youtube.com/embed/NHnjJ34crlU",
              },
              {
                id: "grc-lesson-6",
                title: "Governance Councils",
                videoUrl: "https://www.youtube.com/embed/iIgqR56QM5c",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "platform-engineering-foundations",
    title: "Platform Engineering Foundations",
    description: "Build internal developer platforms with golden paths, self-service infrastructure, and product thinking.",
    category: "devops-sre",
    difficulty: "Intermediate",
    duration: "11 hours",
    prerequisites: ["Cloud", "DevOps"],
    tags: ["Platform Engineering", "IDP", "Golden Paths", "Developer Experience"],
    roles: ["Platform Engineer", "DevOps Lead", "Engineering Manager"],
    tools: ["Backstage", "Crossplane", "Terraform", "Argo CD"],
    outcomes: [
      "Design platform products with clear personas",
      "Automate self-service infrastructure workflows",
      "Measure platform adoption and satisfaction",
    ],
    languages: ["en"],
    status: "live",
    projectBriefs: [
      {
        id: "platform-product-roadmap",
        title: "Platform Product Roadmap",
        description: "Deliver a platform product roadmap with golden paths, service templates, and metrics.",
        deliverables: ["Platform personas", "Golden path templates", "Adoption dashboard"],
        difficulty: "Intermediate",
      },
    ],
    assessments: [
      {
        id: "platform-engineering-quiz",
        title: "Platform Engineering Quiz",
        type: "quiz",
        description: "Assess understanding of platform product mindset and adoption metrics.",
      },
    ],
    modules: [
      {
        id: "platform-foundations",
        title: "Platform Strategy",
        sections: [
          {
            id: "platform-personas",
            title: "Personas & Outcomes",
            lessons: [
              {
                id: "platform-lesson-1",
                title: "What is Platform Engineering?",
                videoUrl: "https://www.youtube.com/embed/ghzsBm8vOms",
              },
              {
                id: "platform-lesson-2",
                title: "Designing Golden Paths",
                videoUrl: "https://www.youtube.com/embed/Pk8doFXXjjI",
              },
            ],
          },
        ],
      },
      {
        id: "platform-automation",
        title: "Automation & Tooling",
        sections: [
          {
            id: "platform-automation-section",
            title: "Automation Building Blocks",
            lessons: [
              {
                id: "platform-lesson-3",
                title: "Crossplane for Platform Engineering",
                videoUrl: "https://www.youtube.com/embed/AaIeNStnuew",
              },
              {
                id: "platform-lesson-4",
                title: "Backstage Golden Paths",
                videoUrl: "https://www.youtube.com/embed/QCG_Fkt-Zzc",
              },
            ],
          },
        ],
      },
      {
        id: "platform-measurement",
        title: "Measurement & Operations",
        sections: [
          {
            id: "platform-metrics",
            title: "Metrics & Adoption",
            lessons: [
              {
                id: "platform-lesson-5",
                title: "Measuring Platform Impact",
                videoUrl: "https://www.youtube.com/embed/gd-PQ80-lXU",
              },
              {
                id: "platform-lesson-6",
                title: "Operating an IDP",
                videoUrl: "https://www.youtube.com/embed/RPdtPM5I6Go",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "sre-reliability-blueprints",
    title: "SRE Reliability Blueprints",
    description: "Implement SRE practices with SLOs, error budgets, and reliability engineering playbooks.",
    category: "devops-sre",
    difficulty: "Advanced",
    duration: "12 hours",
    prerequisites: ["Site reliability", "Production operations"],
    tags: ["SRE", "SLO", "Error Budgets", "Reliability"],
    roles: ["Site Reliability Engineer", "Platform Engineer", "Engineering Manager"],
    tools: ["Nobl9", "Grafana", "Prometheus", "PagerDuty"],
    outcomes: [
      "Define SLOs and error budgets aligned with business",
      "Implement reliability automation and runbooks",
      "Lead reliability reviews and game days",
    ],
    languages: ["en"],
    status: "live",
    projectBriefs: [
      {
        id: "sre-operating-model",
        title: "SRE Operating Model",
        description: "Create an SRE operating model with SLO program, on-call structure, and review cadence.",
        deliverables: ["SLO catalog", "Error budget policy", "Incident review template"],
        difficulty: "Advanced",
      },
    ],
    assessments: [
      {
        id: "sre-quiz",
        title: "SRE Foundations Quiz",
        type: "quiz",
        description: "Test knowledge of SLO math, toil reduction, and reliability reviews.",
      },
    ],
    modules: [
      {
        id: "sre-foundations",
        title: "SRE Foundations",
        sections: [
          {
            id: "sre-slo-design",
            title: "SLO Design",
            lessons: [
              {
                id: "sre-lesson-1",
                title: "SRE Fundamentals",
                videoUrl: "https://www.youtube.com/embed/ztIIcXNzMN4",
              },
              {
                id: "sre-lesson-2",
                title: "Designing SLOs",
                videoUrl: "https://www.youtube.com/embed/U53wC2A75Is",
              },
            ],
          },
        ],
      },
      {
        id: "sre-operations-module",
        title: "Operations & Automation",
        sections: [
          {
            id: "sre-runbooks",
            title: "Runbooks & Automation",
            lessons: [
              {
                id: "sre-lesson-3",
                title: "Automating Reliability",
                videoUrl: "https://www.youtube.com/embed/a66aQ6ikqUk",
              },
              {
                id: "sre-lesson-4",
                title: "Toil Reduction Techniques",
                videoUrl: "https://www.youtube.com/embed/HMTPzMpMt9s",
              },
            ],
          },
        ],
      },
      {
        id: "sre-culture",
        title: "Culture & Reviews",
        sections: [
          {
            id: "sre-postmortems",
            title: "Incident Reviews",
            lessons: [
              {
                id: "sre-lesson-5",
                title: "Running Blameless Postmortems",
                videoUrl: "https://www.youtube.com/embed/Q_ScdoBy2qk",
              },
              {
                id: "sre-lesson-6",
                title: "Reliability Review Cadence",
                videoUrl: "https://www.youtube.com/embed/PeWBS5hfTb4",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "gitops-fleet-management",
    title: "GitOps Fleet Management",
    description: "Scale GitOps across fleets of clusters with policy, security, and automated drift remediation.",
    category: "devops-sre",
    difficulty: "Advanced",
    duration: "10 hours",
    prerequisites: ["Kubernetes", "GitOps"],
    tags: ["GitOps", "Fleet Management", "Policy", "Kubernetes"],
    roles: ["Platform Engineer", "DevOps Engineer", "SRE"],
    tools: ["Flux", "Argo CD", "Kyverno", "Fleet"],
    outcomes: [
      "Design multi-cluster GitOps architectures",
      "Enforce policy and secrets management",
      "Implement drift detection and remediation",
    ],
    languages: ["en"],
    status: "beta",
    projectBriefs: [
      {
        id: "gitops-multi-cluster",
        title: "Multi-Cluster GitOps",
        description: "Implement GitOps for multi-region clusters with policy enforcement and security controls.",
        deliverables: ["GitOps repository structure", "Policy templates", "Drift remediation runbook"],
        difficulty: "Advanced",
      },
    ],
    assessments: [
      {
        id: "gitops-quiz",
        title: "GitOps Architecture Quiz",
        type: "quiz",
        description: "Test understanding of GitOps patterns, policies, and operations.",
      },
    ],
    modules: [
      {
        id: "gitops-foundations",
        title: "GitOps Foundations",
        sections: [
          {
            id: "gitops-architecture",
            title: "Architecture & Repos",
            lessons: [
              {
                id: "gitops-lesson-1",
                title: "GitOps Principles",
                videoUrl: "https://www.youtube.com/embed/f5EpcWp0THw",
              },
              {
                id: "gitops-lesson-2",
                title: "Repository Design",
                videoUrl: "https://www.youtube.com/embed/Wiy54682d1w",
              },
            ],
          },
        ],
      },
      {
        id: "gitops-security",
        title: "Security & Policy",
        sections: [
          {
            id: "gitops-policy",
            title: "Policy & Secrets",
            lessons: [
              {
                id: "gitops-lesson-3",
                title: "Policy as Code with Kyverno",
                videoUrl: "https://www.youtube.com/embed/4cgzzMSCUAE",
              },
              {
                id: "gitops-lesson-4",
                title: "Managing Secrets in GitOps",
                videoUrl: "https://www.youtube.com/embed/OaZ41cpEaZg",
              },
            ],
          },
        ],
      },
      {
        id: "gitops-operations",
        title: "Operations & Scaling",
        sections: [
          {
            id: "gitops-drift",
            title: "Drift & Observability",
            lessons: [
              {
                id: "gitops-lesson-5",
                title: "Detecting Drift in GitOps",
                videoUrl: "https://www.youtube.com/embed/_RI5QNBZmeU",
              },
              {
                id: "gitops-lesson-6",
                title: "Scaling GitOps",
                videoUrl: "https://www.youtube.com/embed/f5EpcWp0THw",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "observability-platform-ops",
    title: "Observability Platform Operations",
    description: "Run modern observability platforms with telemetry pipelines, SLO dashboards, and governance.",
    category: "devops-sre",
    difficulty: "Intermediate",
    duration: "9 hours",
    prerequisites: ["Monitoring", "DevOps"],
    tags: ["Observability", "Telemetry", "Metrics", "Governance"],
    roles: ["Observability Engineer", "SRE", "Platform Engineer"],
    tools: ["Grafana", "Prometheus", "OpenTelemetry", "Honeycomb"],
    outcomes: [
      "Design telemetry pipelines with OpenTelemetry",
      "Curate self-service dashboards and alerts",
      "Govern observability practices with service catalogs",
    ],
    languages: ["en"],
    status: "live",
    projectBriefs: [
      {
        id: "observability-blueprint",
        title: "Observability Blueprint",
        description: "Deliver an observability blueprint with telemetry architecture and service scorecards.",
        deliverables: ["Telemetry architecture", "Dashboard library", "Alerting policy"],
        difficulty: "Intermediate",
      },
    ],
    assessments: [
      {
        id: "observability-quiz",
        title: "Observability Platform Quiz",
        type: "quiz",
        description: "Evaluate mastery of telemetry pipelines, SLOs, and governance.",
      },
    ],
    modules: [
      {
        id: "observability-foundations",
        title: "Telemetry Foundations",
        sections: [
          {
            id: "observability-telemetry",
            title: "Telemetry & Instrumentation",
            lessons: [
              {
                id: "observability-lesson-1",
                title: "Observability Engineering",
                videoUrl: "https://www.youtube.com/embed/CAQ_a2-9UOI",
              },
              {
                id: "observability-lesson-2",
                title: "OpenTelemetry Deep Dive",
                videoUrl: "https://www.youtube.com/embed/hLvwoow3XTk",
              },
            ],
          },
        ],
      },
      {
        id: "observability-experience",
        title: "Experience & Dashboards",
        sections: [
          {
            id: "observability-dashboards",
            title: "Dashboards & Alerts",
            lessons: [
              {
                id: "observability-lesson-3",
                title: "Dashboard Design Principles",
                videoUrl: "https://www.youtube.com/embed/t3cAUt7sOQg",
              },
              {
                id: "observability-lesson-4",
                title: "Alerting & SLO Dashboards",
                videoUrl: "https://www.youtube.com/embed/C4lasI0Svss",
              },
            ],
          },
        ],
      },
      {
        id: "observability-governance",
        title: "Governance & Adoption",
        sections: [
          {
            id: "observability-governance-section",
            title: "Governance & Reliability",
            lessons: [
              {
                id: "observability-lesson-5",
                title: "Service Level Objectives Practical",
                videoUrl: "https://www.youtube.com/embed/E3ReKuJ8ewA",
              },
              {
                id: "observability-lesson-6",
                title: "Establishing Observability Programs",
                videoUrl: "https://www.youtube.com/embed/CAQ_a2-9UOI",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "ci-cd-enterprise-automation",
    title: "CI/CD Enterprise Automation",
    description: "Deliver enterprise-grade CI/CD pipelines with governance, quality gates, and progressive delivery.",
    category: "devops-sre",
    difficulty: "Intermediate",
    duration: "10 hours",
    prerequisites: ["CI/CD", "Cloud"],
    tags: ["CI/CD", "Progressive Delivery", "Governance", "Quality"],
    roles: ["DevOps Engineer", "Platform Engineer", "Release Manager"],
    tools: ["GitHub Actions", "Spinnaker", "Harness", "Argo Rollouts"],
    outcomes: [
      "Implement pipelines with compliance and security gates",
      "Adopt progressive delivery patterns",
      "Measure deployment health and release velocity",
    ],
    languages: ["en"],
    status: "live",
    projectBriefs: [
      {
        id: "enterprise-cicd-roadmap",
        title: "Enterprise CI/CD Roadmap",
        description: "Design a CI/CD roadmap with platform capabilities, metrics, and rollout plan.",
        deliverables: ["Pipeline templates", "Compliance controls", "Velocity dashboard"],
        difficulty: "Intermediate",
      },
    ],
    assessments: [
      {
        id: "cicd-quiz",
        title: "CI/CD Strategy Quiz",
        type: "quiz",
        description: "Test knowledge of progressive delivery, quality gates, and governance.",
      },
    ],
    modules: [
      {
        id: "cicd-foundations",
        title: "Pipeline Foundations",
        sections: [
          {
            id: "cicd-pipelines",
            title: "Pipeline Design",
            lessons: [
              {
                id: "cicd-lesson-1",
                title: "Designing Enterprise CI/CD",
                videoUrl: "https://www.youtube.com/embed/KnSBNd3b0qI",
              },
              {
                id: "cicd-lesson-2",
                title: "Quality Gates & Compliance",
                videoUrl: "https://www.youtube.com/embed/qaNOPQmd_MY",
              },
            ],
          },
        ],
      },
      {
        id: "cicd-progressive",
        title: "Progressive Delivery",
        sections: [
          {
            id: "cicd-rollouts",
            title: "Rollouts & Observability",
            lessons: [
              {
                id: "cicd-lesson-3",
                title: "Progressive Delivery Explained",
                videoUrl: "https://www.youtube.com/embed/HKkhD6nokC8",
              },
              {
                id: "cicd-lesson-4",
                title: "Observability for Releases",
                videoUrl: "https://www.youtube.com/embed/CAQ_a2-9UOI",
              },
            ],
          },
        ],
      },
      {
        id: "cicd-metrics",
        title: "Metrics & Governance",
        sections: [
          {
            id: "cicd-measurement",
            title: "Metrics & Improvement",
            lessons: [
              {
                id: "cicd-lesson-5",
                title: "DORA Metrics Deep Dive",
                videoUrl: "https://www.youtube.com/embed/YOvEIFLWz3I",
              },
              {
                id: "cicd-lesson-6",
                title: "Continuous Improvement",
                videoUrl: "https://www.youtube.com/embed/anA_TiUfmbM",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "infrastructure-as-code-pro",
    title: "Infrastructure as Code Pro",
    description: "Master IaC patterns, policy as code, and module design for multi-cloud infrastructure delivery.",
    category: "devops-sre",
    difficulty: "Intermediate",
    duration: "11 hours",
    prerequisites: ["Cloud", "Infrastructure"],
    tags: ["Infrastructure as Code", "Terraform", "Policy", "Modules"],
    roles: ["DevOps Engineer", "Cloud Engineer", "Platform Engineer"],
    tools: ["Terraform", "Pulumi", "Terragrunt", "OPA"],
    outcomes: [
      "Design reusable IaC modules with testing",
      "Enforce compliance with policy as code",
      "Run IaC pipelines with drift detection",
    ],
    languages: ["en"],
    status: "live",
    projectBriefs: [
      {
        id: "iac-module-library",
        title: "IaC Module Library",
        description: "Create a reusable module library with policy enforcement and CI/CD.",
        deliverables: ["Module repository", "Policy tests", "Drift detection scripts"],
        difficulty: "Intermediate",
      },
    ],
    assessments: [
      {
        id: "iac-quiz",
        title: "Infrastructure as Code Quiz",
        type: "quiz",
        description: "Evaluate understanding of module design, policy, and testing.",
      },
    ],
    modules: [
      {
        id: "iac-foundations",
        title: "IaC Foundations",
        sections: [
          {
            id: "iac-patterns",
            title: "Patterns & Modules",
            lessons: [
              {
                id: "iac-lesson-1",
                title: "Infrastructure as Code Principles",
                videoUrl: "https://www.youtube.com/embed/zWw2wuiKd5o",
              },
              {
                id: "iac-lesson-2",
                title: "Terraform Module Design",
                videoUrl: "https://www.youtube.com/embed/GSXx8AZjKK4",
              },
            ],
          },
        ],
      },
      {
        id: "iac-policy",
        title: "Policy & Testing",
        sections: [
          {
            id: "iac-policy-section",
            title: "Policy as Code",
            lessons: [
              {
                id: "iac-lesson-3",
                title: "OPA & Terraform",
                videoUrl: "https://www.youtube.com/embed/DpUDYbFK4IE",
              },
              {
                id: "iac-lesson-4",
                title: "Testing IaC",
                videoUrl: "https://www.youtube.com/embed/2UZni0mCQ-g",
              },
            ],
          },
        ],
      },
      {
        id: "iac-operations-module",
        title: "Operations & Governance",
        sections: [
          {
            id: "iac-operations",
            title: "Operations & Drift",
            lessons: [
              {
                id: "iac-lesson-5",
                title: "Managing Drift",
                videoUrl: "https://www.youtube.com/embed/RtCfqohMhl0",
              },
              {
                id: "iac-lesson-6",
                title: "Scaling IaC Platforms",
                videoUrl: "https://www.youtube.com/embed/eaD-tGMOKe8",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "chaos-engineering-operations",
    title: "Chaos Engineering Operations",
    description: "Run chaos experiments with safety, automation, and reliability insights.",
    category: "devops-sre",
    difficulty: "Advanced",
    duration: "9 hours",
    prerequisites: ["SRE", "Cloud operations"],
    tags: ["Chaos Engineering", "Resilience", "Reliability", "Experiments"],
    roles: ["SRE", "Reliability Engineer", "DevOps"],
    tools: ["Gremlin", "Litmus", "Chaos Mesh", "Steadybit"],
    outcomes: [
      "Design safe chaos experiments and guardrails",
      "Automate chaos pipelines within CI/CD",
      "Translate findings into resilience backlogs",
    ],
    languages: ["en"],
    status: "beta",
    projectBriefs: [
      {
        id: "chaos-program",
        title: "Chaos Program Launch",
        description: "Launch a chaos engineering program with experiments, KPIs, and executive reporting.",
        deliverables: ["Experiment catalog", "Safety checklist", "Resilience roadmap"],
        difficulty: "Advanced",
      },
    ],
    assessments: [
      {
        id: "chaos-quiz",
        title: "Chaos Engineering Quiz",
        type: "quiz",
        description: "Assess fundamentals of chaos design, guardrails, and measuring outcomes.",
      },
    ],
    modules: [
      {
        id: "chaos-foundations",
        title: "Chaos Foundations",
        sections: [
          {
            id: "chaos-principles",
            title: "Principles & Safety",
            lessons: [
              {
                id: "chaos-lesson-1",
                title: "Chaos Engineering Explained",
                videoUrl: "https://www.youtube.com/embed/3CNNhK9JTDk",
              },
              {
                id: "chaos-lesson-2",
                title: "Designing Safe Experiments",
                videoUrl: "https://www.youtube.com/embed/1-wc7CNeIz8",
              },
            ],
          },
        ],
      },
      {
        id: "chaos-automation",
        title: "Automation & Tooling",
        sections: [
          {
            id: "chaos-tooling",
            title: "Tooling & Automation",
            lessons: [
              {
                id: "chaos-lesson-3",
                title: "Running Chaos with Litmus",
                videoUrl: "https://www.youtube.com/embed/6oOz2-Hh9GQ",
              },
              {
                id: "chaos-lesson-4",
                title: "Automating Chaos Experiments",
                videoUrl: "https://www.youtube.com/embed/618rXhCp03Y",
              },
            ],
          },
        ],
      },
      {
        id: "chaos-outcomes",
        title: "Outcomes & Resilience",
        sections: [
          {
            id: "chaos-insights",
            title: "Insights & Backlogs",
            lessons: [
              {
                id: "chaos-lesson-5",
                title: "Measuring Chaos Experiments",
                videoUrl: "https://www.youtube.com/embed/gJUSKqQZZBU",
              },
              {
                id: "chaos-lesson-6",
                title: "Prioritizing Resilience Work",
                videoUrl: "https://www.youtube.com/embed/SFwSOlQ4liI",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "cost-optimization-devops",
    title: "DevOps Cost Optimization",
    description: "Align engineering efficiency with cost governance across infrastructure, pipelines, and observability.",
    category: "devops-sre",
    difficulty: "Intermediate",
    duration: "8 hours",
    prerequisites: ["Cloud", "FinOps"],
    tags: ["Cost Optimization", "FinOps", "DevOps", "Efficiency"],
    roles: ["DevOps Engineer", "FinOps Engineer", "Engineering Manager"],
    tools: ["Kubecost", "CloudZero", "Harness CCM", "Grafana"],
    outcomes: [
      "Instrument cost-aware engineering metrics",
      "Optimize infrastructure and pipeline spend",
      "Run cost reviews tied to reliability and velocity",
    ],
    languages: ["en"],
    status: "beta",
    projectBriefs: [
      {
        id: "devops-cost-playbook",
        title: "DevOps Cost Playbook",
        description: "Produce a cost optimization playbook with runbooks, dashboards, and automation tasks.",
        deliverables: ["Cost dashboard", "Optimization backlog", "Automation scripts"],
        difficulty: "Intermediate",
      },
    ],
    assessments: [
      {
        id: "devops-cost-quiz",
        title: "Cost Optimization Quiz",
        type: "quiz",
        description: "Test knowledge of unit economics, budgeting, and automation.",
      },
    ],
    modules: [
      {
        id: "cost-optimization-foundations",
        title: "Cost Foundations",
        sections: [
          {
            id: "cost-metrics",
            title: "Metrics & Reporting",
            lessons: [
              {
                id: "cost-lesson-1",
                title: "Engineering Efficiency Metrics",
                videoUrl: "https://www.youtube.com/embed/Te9mYmonVjE",
              },
              {
                id: "cost-lesson-2",
                title: "Cost Monitoring Dashboards",
                videoUrl: "https://www.youtube.com/embed/wnS4XRLgXNI",
              },
            ],
          },
        ],
      },
      {
        id: "cost-automation",
        title: "Automation & Optimization",
        sections: [
          {
            id: "cost-automation-section",
            title: "Automation & Controls",
            lessons: [
              {
                id: "cost-lesson-3",
                title: "Automating Cost Controls",
                videoUrl: "https://www.youtube.com/embed/7I3e1dvlRQo",
              },
              {
                id: "cost-lesson-4",
                title: "Optimizing Kubernetes Spend",
                videoUrl: "https://www.youtube.com/embed/CLVDF_bxVdM",
              },
            ],
          },
        ],
      },
      {
        id: "cost-governance",
        title: "Governance & Culture",
        sections: [
          {
            id: "cost-governance-section",
            title: "Reviews & Culture",
            lessons: [
              {
                id: "cost-lesson-5",
                title: "Running FinOps Reviews",
                videoUrl: "https://www.youtube.com/embed/YHUptdFtozQ",
              },
              {
                id: "cost-lesson-6",
                title: "Creating a Cost-Aware Culture",
                videoUrl: "https://www.youtube.com/embed/KaMYF017qlQ",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "react-native-production",
    title: "React Native Production Mastery",
    description: "Ship high-performance React Native apps with modern architecture, native modules, and CI/CD.",
    category: "mobile",
    difficulty: "Advanced",
    duration: "12 hours",
    prerequisites: ["React", "Mobile basics"],
    tags: ["React Native", "Mobile Architecture", "CI/CD", "Performance"],
    roles: ["Mobile Engineer", "Frontend Engineer", "Tech Lead"],
    tools: ["React Native", "Expo", "Reanimated", "Fastlane"],
    outcomes: [
      "Architect scalable React Native applications",
      "Integrate native modules and platform APIs",
      "Automate mobile delivery pipelines",
    ],
    languages: ["en"],
    status: "live",
    projectBriefs: [
      {
        id: "react-native-superapp",
        title: "React Native Super App",
        description: "Build a modular React Native super app with microfrontends and offline capabilities.",
        deliverables: ["Modular architecture diagram", "Native module integration", "Fastlane pipeline"],
        difficulty: "Advanced",
      },
    ],
    assessments: [
      {
        id: "react-native-quiz",
        title: "React Native Architecture Quiz",
        type: "quiz",
        description: "Test knowledge of architecture, native modules, and performance tuning.",
      },
    ],
    modules: [
      {
        id: "rn-architecture",
        title: "Architecture & State",
        sections: [
          {
            id: "rn-architecture-section",
            title: "Architecture Patterns",
            lessons: [
              {
                id: "rn-lesson-1",
                title: "React Native Architecture in 2025",
                videoUrl: "https://www.youtube.com/embed/BdPkVl4Y8TQ",
              },
              {
                id: "rn-lesson-2",
                title: "State Management Strategies",
                videoUrl: "https://www.youtube.com/embed/DK9HOY93p0k",
              },
            ],
          },
        ],
      },
      {
        id: "rn-native-modules",
        title: "Native Modules & Performance",
        sections: [
          {
            id: "rn-native",
            title: "Native Integrations",
            lessons: [
              {
                id: "rn-lesson-3",
                title: "Using Native Modules",
                videoUrl: "https://www.youtube.com/embed/CdaQSlyGik8",
              },
              {
                id: "rn-lesson-4",
                title: "Performance Optimization",
                videoUrl: "https://www.youtube.com/embed/0fONene3OIA",
              },
            ],
          },
        ],
      },
      {
        id: "rn-delivery",
        title: "Delivery & Operations",
        sections: [
          {
            id: "rn-ci-cd",
            title: "CI/CD & Monitoring",
            lessons: [
              {
                id: "rn-lesson-5",
                title: "Mobile CI/CD with Fastlane",
                videoUrl: "https://www.youtube.com/embed/yNqCpMLmJqE",
              },
              {
                id: "rn-lesson-6",
                title: "Monitoring React Native Apps",
                videoUrl: "https://www.youtube.com/embed/4s8BlzwWiIA",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "swiftui-design-systems",
    title: "SwiftUI Design Systems",
    description: "Craft elegant SwiftUI interfaces with design tokens, animation, and accessibility at scale.",
    category: "mobile",
    difficulty: "Intermediate",
    duration: "9 hours",
    prerequisites: ["Swift", "iOS basics"],
    tags: ["SwiftUI", "Design Systems", "Animations", "Accessibility"],
    roles: ["iOS Engineer", "Mobile Designer", "Product Engineer"],
    tools: ["SwiftUI", "Figma", "Xcode", "Lottie"],
    outcomes: [
      "Create adaptive SwiftUI components with tokens",
      "Design fluid motion and microinteractions",
      "Ship accessible experiences across Apple platforms",
    ],
    languages: ["en"],
    status: "live",
    projectBriefs: [
      {
        id: "swiftui-design-kit",
        title: "SwiftUI Design Kit",
        description: "Build a SwiftUI design kit with reusable components, tokens, and documentation.",
        deliverables: ["Component library", "Token JSON", "Accessibility audit"],
        difficulty: "Intermediate",
      },
    ],
    assessments: [
      {
        id: "swiftui-quiz",
        title: "SwiftUI Systems Quiz",
        type: "quiz",
        description: "Evaluate proficiency in SwiftUI layout, theming, and animation.",
      },
    ],
    modules: [
      {
        id: "swiftui-foundations",
        title: "SwiftUI Foundations",
        sections: [
          {
            id: "swiftui-layout",
            title: "Layout & Components",
            lessons: [
              {
                id: "swiftui-lesson-1",
                title: "SwiftUI Layout Essentials",
                videoUrl: "https://www.youtube.com/embed/04fzFk367Dg",
              },
              {
                id: "swiftui-lesson-2",
                title: "Reusable Components",
                videoUrl: "https://www.youtube.com/embed/V-RwRsHYXDM",
              },
            ],
          },
        ],
      },
      {
        id: "swiftui-motion",
        title: "Motion & Tokens",
        sections: [
          {
            id: "swiftui-animation",
            title: "Animation & Design Tokens",
            lessons: [
              {
                id: "swiftui-lesson-3",
                title: "SwiftUI Animations Deep Dive",
                videoUrl: "https://www.youtube.com/embed/AfhUHEkS7Ew",
              },
              {
                id: "swiftui-lesson-4",
                title: "Design Tokens in SwiftUI",
                videoUrl: "https://www.youtube.com/embed/Ul661gN2_Gg",
              },
            ],
          },
        ],
      },
      {
        id: "swiftui-accessibility",
        title: "Accessibility & Testing",
        sections: [
          {
            id: "swiftui-access",
            title: "Accessibility & QA",
            lessons: [
              {
                id: "swiftui-lesson-5",
                title: "Accessibility in SwiftUI",
                videoUrl: "https://www.youtube.com/embed/SlCBMdPfWNc",
              },
              {
                id: "swiftui-lesson-6",
                title: "Snapshot Testing",
                videoUrl: "https://www.youtube.com/embed/bH2DQEPvkcI",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "kotlin-multiplatform-blueprints",
    title: "Kotlin Multiplatform Blueprints",
    description: "Ship shared mobile experiences with Kotlin Multiplatform, Compose, and modern tooling.",
    category: "mobile",
    difficulty: "Advanced",
    duration: "11 hours",
    prerequisites: ["Kotlin", "Android"],
    tags: ["Kotlin Multiplatform", "Compose", "Shared Code", "Mobile"],
    roles: ["Android Engineer", "Mobile Architect", "Full-stack Engineer"],
    tools: ["Kotlin Multiplatform", "Compose Multiplatform", "SwiftUI", "Ktor"],
    outcomes: [
      "Structure shared codebases across mobile platforms",
      "Compose UI with multiplatform components",
      "Integrate platform-specific capabilities",
    ],
    languages: ["en"],
    status: "beta",
    projectBriefs: [
      {
        id: "kmp-shared-app",
        title: "KMP Shared Experience",
        description: "Develop a shared code mobile app leveraging Kotlin Multiplatform and Compose.",
        deliverables: ["Shared modules", "Platform integrations", "CI/CD pipeline"],
        difficulty: "Advanced",
      },
    ],
    assessments: [
      {
        id: "kmp-quiz",
        title: "KMP Architecture Quiz",
        type: "quiz",
        description: "Test knowledge of multiplatform structure, testing, and performance.",
      },
    ],
    modules: [
      {
        id: "kmp-foundations",
        title: "KMP Foundations",
        sections: [
          {
            id: "kmp-architecture",
            title: "Architecture & Setup",
            lessons: [
              {
                id: "kmp-lesson-1",
                title: "Kotlin Multiplatform Crash Course",
                videoUrl: "https://www.youtube.com/embed/RSBO1C_Du2U",
              },
              {
                id: "kmp-lesson-2",
                title: "Project Setup & Structure",
                videoUrl: "https://www.youtube.com/embed/CAeWjoP525M",
              },
            ],
          },
        ],
      },
      {
        id: "kmp-ui",
        title: "UI & Integration",
        sections: [
          {
            id: "kmp-compose",
            title: "Compose Multiplatform",
            lessons: [
              {
                id: "kmp-lesson-3",
                title: "Compose Multiplatform Basics",
                videoUrl: "https://www.youtube.com/embed/vvP5vnmzY84",
              },
              {
                id: "kmp-lesson-4",
                title: "Integrating with SwiftUI",
                videoUrl: "https://www.youtube.com/embed/k4h9i6KVvi8",
              },
            ],
          },
        ],
      },
      {
        id: "kmp-operations",
        title: "Operations & Testing",
        sections: [
          {
            id: "kmp-testing",
            title: "Testing & CI",
            lessons: [
              {
                id: "kmp-lesson-5",
                title: "Testing Kotlin Multiplatform",
                videoUrl: "https://www.youtube.com/embed/N4h3K73TyZI",
              },
              {
                id: "kmp-lesson-6",
                title: "CI/CD for KMP",
                videoUrl: "https://www.youtube.com/embed/uMBepxdTb9g",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "flutter-performance-engineering",
    title: "Flutter Performance Engineering",
    description: "Optimize Flutter apps with profiling, animations, and platform integrations.",
    category: "mobile",
    difficulty: "Advanced",
    duration: "10 hours",
    prerequisites: ["Dart", "Flutter"],
    tags: ["Flutter", "Performance", "Animations", "Platform Channels"],
    roles: ["Flutter Engineer", "Mobile Developer", "Performance Engineer"],
    tools: ["Flutter", "Dart DevTools", "Firebase Performance", "Codemagic"],
    outcomes: [
      "Profile and optimize Flutter apps across platforms",
      "Create delightful animations and gestures",
      "Integrate native platform features with channels",
    ],
    languages: ["en"],
    status: "live",
    projectBriefs: [
      {
        id: "flutter-performance-app",
        title: "Flutter Performance App",
        description: "Optimize a production Flutter app with performance budgets and automation.",
        deliverables: ["Performance baseline report", "Optimization plan", "Codemagic pipeline"],
        difficulty: "Advanced",
      },
    ],
    assessments: [
      {
        id: "flutter-quiz",
        title: "Flutter Performance Quiz",
        type: "quiz",
        description: "Assess knowledge of profiling, rendering, and platform integrations.",
      },
    ],
    modules: [
      {
        id: "flutter-foundations",
        title: "Performance Foundations",
        sections: [
          {
            id: "flutter-profiling",
            title: "Profiling & Optimization",
            lessons: [
              {
                id: "flutter-lesson-1",
                title: "Flutter Performance Essentials",
                videoUrl: "https://www.youtube.com/embed/PKGguGUwSYE",
              },
              {
                id: "flutter-lesson-2",
                title: "Profiling Flutter Apps",
                videoUrl: "https://www.youtube.com/embed/_EYk-E29edo",
              },
            ],
          },
        ],
      },
      {
        id: "flutter-motion",
        title: "Motion & UX",
        sections: [
          {
            id: "flutter-animation",
            title: "Animations & Gestures",
            lessons: [
              {
                id: "flutter-lesson-3",
                title: "Advanced Flutter Animations",
                videoUrl: "https://www.youtube.com/embed/7UQgAC1kvxI",
              },
              {
                id: "flutter-lesson-4",
                title: "Building Delightful Interactions",
                videoUrl: "https://www.youtube.com/embed/UoajnqWaq_4",
              },
            ],
          },
        ],
      },
      {
        id: "flutter-integrations",
        title: "Integrations & Delivery",
        sections: [
          {
            id: "flutter-channels",
            title: "Platform Channels & Delivery",
            lessons: [
              {
                id: "flutter-lesson-5",
                title: "Platform Channels in Flutter",
                videoUrl: "https://www.youtube.com/embed/vfh2KCFEuDo",
              },
              {
                id: "flutter-lesson-6",
                title: "Automating Flutter Delivery",
                videoUrl: "https://www.youtube.com/embed/857X79cfP1g",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "mobile-ci-cd-automation",
    title: "Mobile CI/CD Automation",
    description: "Automate mobile build, test, and release pipelines with quality gates and store deployment.",
    category: "mobile",
    difficulty: "Intermediate",
    duration: "8 hours",
    prerequisites: ["Mobile development", "CI/CD"],
    tags: ["CI/CD", "Mobile Delivery", "Fastlane", "Testing"],
    roles: ["Mobile Engineer", "DevOps Engineer", "Release Manager"],
    tools: ["Fastlane", "Bitrise", "Firebase Test Lab", "App Store Connect"],
    outcomes: [
      "Design automated pipelines for iOS and Android",
      "Integrate automated testing and quality gates",
      "Manage release trains and store submissions",
    ],
    languages: ["en"],
    status: "live",
    projectBriefs: [
      {
        id: "mobile-cicd-pipeline",
        title: "Mobile Delivery Pipeline",
        description: "Implement a unified mobile CI/CD pipeline with automated testing and staged rollouts.",
        deliverables: ["Pipeline configuration", "Quality gate policy", "Release checklist"],
        difficulty: "Intermediate",
      },
    ],
    assessments: [
      {
        id: "mobile-cicd-quiz",
        title: "Mobile Delivery Quiz",
        type: "quiz",
        description: "Test knowledge of automated testing, distribution, and release governance.",
      },
    ],
    modules: [
      {
        id: "mobile-cicd-foundations",
        title: "Pipeline Foundations",
        sections: [
          {
            id: "mobile-cicd-setup",
            title: "Pipeline Setup",
            lessons: [
              {
                id: "mobile-cicd-lesson-1",
                title: "Mobile CI/CD Overview",
                videoUrl: "https://www.youtube.com/embed/scEDHsr3APg",
              },
              {
                id: "mobile-cicd-lesson-2",
                title: "Configuring Fastlane",
                videoUrl: "https://www.youtube.com/embed/zYBYegeTNwY",
              },
            ],
          },
        ],
      },
      {
        id: "mobile-cicd-quality",
        title: "Quality & Testing",
        sections: [
          {
            id: "mobile-cicd-testing",
            title: "Automated Testing",
            lessons: [
              {
                id: "mobile-cicd-lesson-3",
                title: "Running Tests in Firebase Test Lab",
                videoUrl: "https://www.youtube.com/embed/4_ZEEX1x17k",
              },
              {
                id: "mobile-cicd-lesson-4",
                title: "Setting Quality Gates",
                videoUrl: "https://www.youtube.com/embed/MmDVND6w_Ag",
              },
            ],
          },
        ],
      },
      {
        id: "mobile-cicd-release",
        title: "Release & Distribution",
        sections: [
          {
            id: "mobile-cicd-release-section",
            title: "Release Management",
            lessons: [
              {
                id: "mobile-cicd-lesson-5",
                title: "Automating App Store Deployments",
                videoUrl: "https://www.youtube.com/embed/9vkkJ4tC4SQ",
              },
              {
                id: "mobile-cicd-lesson-6",
                title: "Release Train Strategies",
                videoUrl: "https://www.youtube.com/embed/llTNNqpPFto",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "mobile-security-hardening",
    title: "Mobile Security Hardening",
    description: "Secure mobile applications with hardening, secure storage, and runtime protections.",
    category: "mobile",
    difficulty: "Advanced",
    duration: "9 hours",
    prerequisites: ["Mobile development", "Security"],
    tags: ["Mobile Security", "OWASP MASVS", "Runtime Protection", "Secure Storage"],
    roles: ["Mobile Engineer", "Security Engineer", "AppSec"],
    tools: ["OWASP ZAP", "MobSF", "AppSweep", "Pragma"],
    outcomes: [
      "Apply OWASP MASVS controls to mobile apps",
      "Implement secure storage and runtime protections",
      "Automate security testing in pipelines",
    ],
    languages: ["en"],
    status: "live",
    projectBriefs: [
      {
        id: "mobile-security-assessment",
        title: "Mobile Security Assessment",
        description: "Conduct a security assessment and remediation plan for a mobile application.",
        deliverables: ["MASVS checklist", "Threat model", "Remediation roadmap"],
        difficulty: "Advanced",
      },
    ],
    assessments: [
      {
        id: "mobile-security-quiz",
        title: "Mobile Security Quiz",
        type: "quiz",
        description: "Evaluate understanding of mobile security threats and protections.",
      },
    ],
    modules: [
      {
        id: "mobile-security-foundations",
        title: "Security Foundations",
        sections: [
          {
            id: "mobile-security-threats",
            title: "Threats & Standards",
            lessons: [
              {
                id: "mobile-security-lesson-1",
                title: "Mobile Threat Landscape",
                videoUrl: "https://www.youtube.com/embed/yfszc9yJsnU",
              },
              {
                id: "mobile-security-lesson-2",
                title: "OWASP MASVS Overview",
                videoUrl: "https://www.youtube.com/embed/fuLo64WH3SU",
              },
            ],
          },
        ],
      },
      {
        id: "mobile-security-implementation",
        title: "Implementation & Testing",
        sections: [
          {
            id: "mobile-security-storage",
            title: "Secure Storage & Runtime",
            lessons: [
              {
                id: "mobile-security-lesson-3",
                title: "Securing Mobile Storage",
                videoUrl: "https://www.youtube.com/embed/8QP7AxkWPlE",
              },
              {
                id: "mobile-security-lesson-4",
                title: "Runtime Protections",
                videoUrl: "https://www.youtube.com/embed/Yo9-DBl8nWM",
              },
            ],
          },
        ],
      },
      {
        id: "mobile-security-automation",
        title: "Automation & Monitoring",
        sections: [
          {
            id: "mobile-security-automation-section",
            title: "Automation & Compliance",
            lessons: [
              {
                id: "mobile-security-lesson-5",
                title: "Automated Mobile Security Testing",
                videoUrl: "https://www.youtube.com/embed/TV7904ZvrxE",
              },
              {
                id: "mobile-security-lesson-6",
                title: "Monitoring Mobile Threats",
                videoUrl: "https://www.youtube.com/embed/oPO6OVhLaSs",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "android-jetpack-compose-pro",
    title: "Android Jetpack Compose Pro",
    description: "Master Jetpack Compose with modular architecture, performance, and testing strategies.",
    category: "mobile",
    difficulty: "Advanced",
    duration: "11 hours",
    prerequisites: ["Android", "Kotlin"],
    tags: ["Jetpack Compose", "Android", "Architecture", "Testing"],
    roles: ["Android Engineer", "Mobile Architect", "Tech Lead"],
    tools: ["Jetpack Compose", "Kotlin", "Hilt", "Firebase"],
    outcomes: [
      "Architect scalable Compose applications",
      "Optimize Compose performance and animations",
      "Implement testing and CI for Compose apps",
    ],
    languages: ["en"],
    status: "live",
    projectBriefs: [
      {
        id: "compose-design-system",
        title: "Compose Design System",
        description: "Create a Compose-based design system with theming, animations, and documentation.",
        deliverables: ["Composable library", "Performance benchmarks", "Testing suite"],
        difficulty: "Advanced",
      },
    ],
    assessments: [
      {
        id: "compose-quiz",
        title: "Compose Architecture Quiz",
        type: "quiz",
        description: "Test Compose architecture, performance, and testing knowledge.",
      },
    ],
    modules: [
      {
        id: "compose-foundations",
        title: "Compose Foundations",
        sections: [
          {
            id: "compose-architecture",
            title: "Architecture & State",
            lessons: [
              {
                id: "compose-lesson-1",
                title: "Jetpack Compose Architecture",
                videoUrl: "https://www.youtube.com/embed/9eIhMFTs1Q8",
              },
              {
                id: "compose-lesson-2",
                title: "State Management in Compose",
                videoUrl: "https://www.youtube.com/embed/ekB0w7tkG7k",
              },
            ],
          },
        ],
      },
      {
        id: "compose-performance",
        title: "Performance & Motion",
        sections: [
          {
            id: "compose-performance-section",
            title: "Performance & Animations",
            lessons: [
              {
                id: "compose-lesson-3",
                title: "Compose Performance Tips",
                videoUrl: "https://www.youtube.com/embed/ahXLwg2JYpc",
              },
              {
                id: "compose-lesson-4",
                title: "Advanced Compose Animations",
                videoUrl: "https://www.youtube.com/embed/6ZZDPILtYlA",
              },
            ],
          },
        ],
      },
      {
        id: "compose-testing",
        title: "Testing & Delivery",
        sections: [
          {
            id: "compose-testing-section",
            title: "Testing & CI",
            lessons: [
              {
                id: "compose-lesson-5",
                title: "Testing Jetpack Compose",
                videoUrl: "https://www.youtube.com/embed/kxOwAIdTT9A",
              },
              {
                id: "compose-lesson-6",
                title: "Release Automation",
                videoUrl: "https://www.youtube.com/embed/Utt7vU3jk9s",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "mobile-analytics-growth",
    title: "Mobile Analytics & Growth",
    description: "Measure mobile product performance with analytics, experimentation, and growth loops.",
    category: "mobile",
    difficulty: "Intermediate",
    duration: "8 hours",
    prerequisites: ["Product analytics", "Mobile apps"],
    tags: ["Mobile Analytics", "Growth", "Experimentation", "Retention"],
    roles: ["Product Manager", "Growth Lead", "Mobile Engineer"],
    tools: ["Amplitude", "Mixpanel", "Firebase", "LaunchDarkly"],
    outcomes: [
      "Instrument analytics for mobile journeys",
      "Run A/B tests and growth experiments",
      "Build retention and lifecycle programs",
    ],
    languages: ["en"],
    status: "live",
    projectBriefs: [
      {
        id: "mobile-growth-loop",
        title: "Mobile Growth Loop",
        description: "Design a growth loop with analytics dashboards, experiments, and lifecycle messaging.",
        deliverables: ["Analytics implementation plan", "Experiment backlog", "Lifecycle messaging flow"],
        difficulty: "Intermediate",
      },
    ],
    assessments: [
      {
        id: "mobile-growth-quiz",
        title: "Mobile Growth Quiz",
        type: "quiz",
        description: "Test knowledge of activation, retention, and experimentation.",
      },
    ],
    modules: [
      {
        id: "mobile-analytics-foundations",
        title: "Analytics Foundations",
        sections: [
          {
            id: "mobile-analytics-setup",
            title: "Instrumentation & Events",
            lessons: [
              {
                id: "mobile-analytics-lesson-1",
                title: "Mobile Analytics Fundamentals",
                videoUrl: "https://www.youtube.com/embed/rPM9W8_uuzQ",
              },
              {
                id: "mobile-analytics-lesson-2",
                title: "Implementing Amplitude",
                videoUrl: "https://www.youtube.com/embed/wnJyhbsibu0",
              },
            ],
          },
        ],
      },
      {
        id: "mobile-analytics-experimentation",
        title: "Experimentation & Growth",
        sections: [
          {
            id: "mobile-growth-experiments",
            title: "Experiments & Growth Loops",
            lessons: [
              {
                id: "mobile-analytics-lesson-3",
                title: "Running Mobile Experiments",
                videoUrl: "https://www.youtube.com/embed/uTbsM5wNLGY",
              },
              {
                id: "mobile-analytics-lesson-4",
                title: "Designing Growth Loops",
                videoUrl: "https://www.youtube.com/embed/TwOeP9HM7fU",
              },
            ],
          },
        ],
      },
      {
        id: "mobile-analytics-lifecycle",
        title: "Lifecycle & Retention",
        sections: [
          {
            id: "mobile-lifecycle",
            title: "Lifecycle Messaging",
            lessons: [
              {
                id: "mobile-analytics-lesson-5",
                title: "Lifecycle Marketing Fundamentals",
                videoUrl: "https://www.youtube.com/embed/u6B744B5apo",
              },
              {
                id: "mobile-analytics-lesson-6",
                title: "Building Retention Programs",
                videoUrl: "https://www.youtube.com/embed/1J4p59s75XQ",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "product-discovery-research",
    title: "Product Discovery & Research",
    description: "Run continuous discovery with advanced research, synthesis, and opportunity mapping techniques.",
    category: "product-design",
    difficulty: "Intermediate",
    duration: "9 hours",
    prerequisites: ["Product management", "UX research"],
    tags: ["Discovery", "Research", "Product Strategy", "Jobs to Be Done"],
    roles: ["Product Designer", "Product Manager", "UX Researcher"],
    tools: ["Dovetail", "Miro", "Notion", "Aurelius"],
    outcomes: [
      "Plan and conduct continuous discovery interviews",
      "Synthesize insights into opportunity solution trees",
      "Communicate discovery learnings to stakeholders",
    ],
    languages: ["en"],
    status: "live",
    projectBriefs: [
      {
        id: "discovery-sprint",
        title: "Discovery Sprint",
        description: "Run a two-week discovery sprint delivering research insights and prioritized opportunities.",
        deliverables: ["Research plan", "Opportunity solution tree", "Executive summary"],
        difficulty: "Intermediate",
      },
    ],
    assessments: [
      {
        id: "discovery-assignment",
        title: "Discovery Planning Assignment",
        type: "assignment",
        description: "Create a discovery plan with interview guides and metric hypotheses.",
      },
    ],
    modules: [
      {
        id: "discovery-foundations",
        title: "Discovery Foundations",
        sections: [
          {
            id: "discovery-interviews",
            title: "Interview Techniques",
            lessons: [
              {
                id: "discovery-lesson-1",
                title: "Continuous Discovery Habits",
                videoUrl: "https://www.youtube.com/embed/ZPvG2WQDCqU",
              },
              {
                id: "discovery-lesson-2",
                title: "Jobs to Be Done Interviews",
                videoUrl: "https://www.youtube.com/embed/dbVN6EYql6k",
              },
            ],
          },
        ],
      },
      {
        id: "discovery-synthesis",
        title: "Synthesis & Mapping",
        sections: [
          {
            id: "discovery-mapping",
            title: "Opportunity Mapping",
            lessons: [
              {
                id: "discovery-lesson-3",
                title: "Opportunity Solution Trees",
                videoUrl: "https://www.youtube.com/embed/LFARGDCR_C4",
              },
              {
                id: "discovery-lesson-4",
                title: "Insight Synthesis Techniques",
                videoUrl: "https://www.youtube.com/embed/_azBW6nBrBM",
              },
            ],
          },
        ],
      },
      {
        id: "discovery-communication",
        title: "Communication & Alignment",
        sections: [
          {
            id: "discovery-communication-section",
            title: "Stakeholder Communication",
            lessons: [
              {
                id: "discovery-lesson-5",
                title: "Communicating Research Insights",
                videoUrl: "https://www.youtube.com/embed/SxAKGVERkJs",
              },
              {
                id: "discovery-lesson-6",
                title: "Prioritizing Opportunities",
                videoUrl: "https://www.youtube.com/embed/s0rL0jzdgxo",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "design-ops-systems",
    title: "Design Ops & Systems",
    description: "Scale design operations with design systems, tooling, and cross-functional workflows.",
    category: "product-design",
    difficulty: "Advanced",
    duration: "10 hours",
    prerequisites: ["Design systems", "Team leadership"],
    tags: ["Design Ops", "Design Systems", "Tooling", "Workflow"],
    roles: ["Design Ops Lead", "Design Manager", "Design Technologist"],
    tools: ["Figma", "Zeroheight", "Storybook", "Abstract"],
    outcomes: [
      "Operationalize design systems and tooling",
      "Align designers and engineers with shared workflows",
      "Measure design system adoption and ROI",
    ],
    languages: ["en"],
    status: "live",
    projectBriefs: [
      {
        id: "design-ops-blueprint",
        title: "Design Ops Blueprint",
        description: "Create a design ops blueprint covering tooling, rituals, and success metrics.",
        deliverables: ["Tooling stack", "Workflow playbook", "Metrics dashboard"],
        difficulty: "Advanced",
      },
    ],
    assessments: [
      {
        id: "design-ops-quiz",
        title: "Design Ops Quiz",
        type: "quiz",
        description: "Evaluate knowledge of design ops frameworks and collaboration practices.",
      },
    ],
    modules: [
      {
        id: "design-ops-foundations",
        title: "Operations Foundations",
        sections: [
          {
            id: "design-ops-rituals",
            title: "Rituals & Processes",
            lessons: [
              {
                id: "design-ops-lesson-1",
                title: "What is Design Ops?",
                videoUrl: "https://www.youtube.com/embed/I-z1NCbQQ38",
              },
              {
                id: "design-ops-lesson-2",
                title: "Design Ops Rituals",
                videoUrl: "https://www.youtube.com/embed/BGAsGRlWO2A",
              },
            ],
          },
        ],
      },
      {
        id: "design-ops-systems-module",
        title: "Systems & Tooling",
        sections: [
          {
            id: "design-ops-tooling",
            title: "Tooling & Automation",
            lessons: [
              {
                id: "design-ops-lesson-3",
                title: "Scaling Design Systems",
                videoUrl: "https://www.youtube.com/embed/9w-BwzcuxYM",
              },
              {
                id: "design-ops-lesson-4",
                title: "Design to Code Workflows",
                videoUrl: "https://www.youtube.com/embed/N1w07dTC3Ww",
              },
            ],
          },
        ],
      },
      {
        id: "design-ops-metrics",
        title: "Metrics & Scaling",
        sections: [
          {
            id: "design-ops-measurement",
            title: "Measurement & Adoption",
            lessons: [
              {
                id: "design-ops-lesson-5",
                title: "Measuring Design Systems",
                videoUrl: "https://www.youtube.com/embed/AOCyGKxCsvg",
              },
              {
                id: "design-ops-lesson-6",
                title: "Design Ops Case Studies",
                videoUrl: "https://www.youtube.com/embed/CNnqSL97aLE",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "ux-writing-strategy",
    title: "UX Writing Strategy",
    description: "Define voice, tone, and content frameworks that drive clarity and conversion.",
    category: "product-design",
    difficulty: "Intermediate",
    duration: "7 hours",
    prerequisites: ["Content design", "UX"],
    tags: ["UX Writing", "Content Design", "Voice & Tone", "Localization"],
    roles: ["Content Designer", "Product Designer", "Product Manager"],
    tools: ["Figma", "Ditto", "Lokalise", "Google Docs"],
    outcomes: [
      "Create voice and tone guidelines",
      "Design content testing experiments",
      "Localize content at scale with governance",
    ],
    languages: ["en"],
    status: "live",
    projectBriefs: [
      {
        id: "ux-writing-styleguide",
        title: "Content Style Guide",
        description: "Develop a product voice guide with tone, messaging frameworks, and localization readiness.",
        deliverables: ["Voice and tone guide", "Content patterns", "Localization checklist"],
        difficulty: "Intermediate",
      },
    ],
    assessments: [
      {
        id: "ux-writing-assignment",
        title: "Content Optimization Assignment",
        type: "assignment",
        description: "Rewrite a flow with voice guidelines and design a content test.",
      },
    ],
    modules: [
      {
        id: "ux-writing-foundations",
        title: "Writing Foundations",
        sections: [
          {
            id: "ux-writing-voice",
            title: "Voice & Tone",
            lessons: [
              {
                id: "ux-writing-lesson-1",
                title: "UX Writing Fundamentals",
                videoUrl: "https://www.youtube.com/embed/1Yvu-i9H6lI",
              },
              {
                id: "ux-writing-lesson-2",
                title: "Voice & Tone Systems",
                videoUrl: "https://www.youtube.com/embed/OIpb3FSWXK0",
              },
            ],
          },
        ],
      },
      {
        id: "ux-writing-experiments",
        title: "Experimentation & Localization",
        sections: [
          {
            id: "ux-writing-testing",
            title: "Testing Content",
            lessons: [
              {
                id: "ux-writing-lesson-3",
                title: "Testing Content Design",
                videoUrl: "https://www.youtube.com/embed/PsL5zHLiwWQ",
              },
              {
                id: "ux-writing-lesson-4",
                title: "Localization Strategy",
                videoUrl: "https://www.youtube.com/embed/ubAhLDPYSco",
              },
            ],
          },
        ],
      },
      {
        id: "ux-writing-ops",
        title: "Operations & Collaboration",
        sections: [
          {
            id: "ux-writing-collab",
            title: "Collaboration & Governance",
            lessons: [
              {
                id: "ux-writing-lesson-5",
                title: "Working with Designers & PMs",
                videoUrl: "https://www.youtube.com/embed/AlJ36WmXsmQ",
              },
              {
                id: "ux-writing-lesson-6",
                title: "Content Governance",
                videoUrl: "https://www.youtube.com/embed/dqEl280a0Zc",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "product-analytics-design",
    title: "Product Analytics for Designers",
    description: "Leverage analytics to inform design decisions, experiments, and product strategy.",
    category: "product-design",
    difficulty: "Intermediate",
    duration: "8 hours",
    prerequisites: ["Product analytics", "Design"],
    tags: ["Product Analytics", "Design", "Experiments", "Metrics"],
    roles: ["Product Designer", "Product Manager", "UX Researcher"],
    tools: ["Amplitude", "Mixpanel", "Looker", "Figma"],
    outcomes: [
      "Define design success metrics",
      "Run data-informed experiments",
      "Communicate insights to cross-functional stakeholders",
    ],
    languages: ["en"],
    status: "live",
    projectBriefs: [
      {
        id: "design-analytics-dashboard",
        title: "Design Analytics Dashboard",
        description: "Create a design analytics dashboard linking qualitative and quantitative insights.",
        deliverables: ["KPI framework", "Dashboard prototype", "Experiment backlog"],
        difficulty: "Intermediate",
      },
    ],
    assessments: [
      {
        id: "product-analytics-quiz",
        title: "Product Analytics Quiz",
        type: "quiz",
        description: "Test knowledge of product KPIs, experimentation, and storytelling.",
      },
    ],
    modules: [
      {
        id: "design-analytics-foundations",
        title: "Analytics Foundations",
        sections: [
          {
            id: "design-analytics-kpis",
            title: "KPIs & Dashboards",
            lessons: [
              {
                id: "design-analytics-lesson-1",
                title: "Product Analytics for Designers",
                videoUrl: "https://www.youtube.com/embed/t_4cVPXb2SQ",
              },
              {
                id: "design-analytics-lesson-2",
                title: "Designing KPI Frameworks",
                videoUrl: "https://www.youtube.com/embed/2tuWjtc2Ifk",
              },
            ],
          },
        ],
      },
      {
        id: "design-analytics-experiments",
        title: "Experimentation & Synthesis",
        sections: [
          {
            id: "design-analytics-experimentation",
            title: "Experimentation",
            lessons: [
              {
                id: "design-analytics-lesson-3",
                title: "Running Product Experiments",
                videoUrl: "https://www.youtube.com/embed/6kdZoDy7D4Q",
              },
              {
                id: "design-analytics-lesson-4",
                title: "Synthesizing Quant & Qual",
                videoUrl: "https://www.youtube.com/embed/S3k9ZMiTQ_w",
              },
            ],
          },
        ],
      },
      {
        id: "design-analytics-communication",
        title: "Storytelling & Influence",
        sections: [
          {
            id: "design-analytics-storytelling",
            title: "Storytelling",
            lessons: [
              {
                id: "design-analytics-lesson-5",
                title: "Storytelling with Data",
                videoUrl: "https://www.youtube.com/embed/r5_34YnCmMY",
              },
              {
                id: "design-analytics-lesson-6",
                title: "Design Influence",
                videoUrl: "https://www.youtube.com/embed/n5u0SlG-RsM",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "design-leadership-practices",
    title: "Design Leadership Practices",
    description: "Lead high-performing design teams with strategy, operations, and culture excellence.",
    category: "product-design",
    difficulty: "Advanced",
    duration: "9 hours",
    prerequisites: ["Design management", "Org leadership"],
    tags: ["Design Leadership", "Org Design", "Team Culture", "Design Strategy"],
    roles: ["Design Director", "Head of Design", "Product Design Manager"],
    tools: ["Miro", "Notion", "Lattice", "Figma"],
    outcomes: [
      "Craft design org strategy and operating models",
      "Coach teams with outcome-oriented rituals",
      "Partner with product and engineering leadership effectively",
    ],
    languages: ["en"],
    status: "live",
    projectBriefs: [
      {
        id: "design-leadership-playbook",
        title: "Design Leadership Playbook",
        description: "Design an org strategy, rituals, and growth plan for a scaling design team.",
        deliverables: ["Org design", "Rituals calendar", "Capability roadmap"],
        difficulty: "Advanced",
      },
    ],
    assessments: [
      {
        id: "design-leadership-case",
        title: "Leadership Scenario Case",
        type: "assignment",
        description: "Respond to leadership scenarios covering hiring, quality, and influence.",
      },
    ],
    modules: [
      {
        id: "design-leadership-strategy",
        title: "Org Strategy & Vision",
        sections: [
          {
            id: "design-leadership-vision",
            title: "Vision & Strategy",
            lessons: [
              {
                id: "design-leadership-lesson-1",
                title: "Design Org Strategy",
                videoUrl: "https://www.youtube.com/embed/41v3PENTEXw",
              },
              {
                id: "design-leadership-lesson-2",
                title: "Design Vision Narratives",
                videoUrl: "https://www.youtube.com/embed/Qn5I6F9Wqkk",
              },
            ],
          },
        ],
      },
      {
        id: "design-leadership-operations",
        title: "Operations & Culture",
        sections: [
          {
            id: "design-leadership-ops",
            title: "Operations",
            lessons: [
              {
                id: "design-leadership-lesson-3",
                title: "Design Operations for Leaders",
                videoUrl: "https://www.youtube.com/embed/2xbiKIMRg4I",
              },
              {
                id: "design-leadership-lesson-4",
                title: "Culture & Craft Excellence",
                videoUrl: "https://www.youtube.com/embed/JomsJ6MPx_g",
              },
            ],
          },
        ],
      },
      {
        id: "design-leadership-influence",
        title: "Influence & Partnership",
        sections: [
          {
            id: "design-leadership-partnership",
            title: "Cross-Functional Influence",
            lessons: [
              {
                id: "design-leadership-lesson-5",
                title: "Partnering with Product & Engineering",
                videoUrl: "https://www.youtube.com/embed/8bliweLN8C4",
              },
              {
                id: "design-leadership-lesson-6",
                title: "Executive Communication",
                videoUrl: "https://www.youtube.com/embed/Fzi4T94QCjw",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "service-design-blueprints",
    title: "Service Design & Blueprints",
    description: "Design end-to-end services with omni-channel blueprints and operational alignment.",
    category: "product-design",
    difficulty: "Advanced",
    duration: "8 hours",
    prerequisites: ["Service design", "Systems thinking"],
    tags: ["Service Design", "Blueprints", "Systems", "Operations"],
    roles: ["Service Designer", "Product Designer", "CX Strategist"],
    tools: ["Figma", "Miro", "Journey Mapper", "Notion"],
    outcomes: [
      "Map service moments across channels",
      "Design service blueprints with operational layers",
      "Align teams on backstage processes and metrics",
    ],
    languages: ["en"],
    status: "live",
    projectBriefs: [
      {
        id: "service-blueprint-delivery",
        title: "Service Blueprint Delivery",
        description: "Produce a service blueprint for a multi-channel experience with supporting operating model.",
        deliverables: ["Experience blueprint", "Process handoffs", "Operational metrics"],
        difficulty: "Advanced",
      },
    ],
    assessments: [
      {
        id: "service-design-quiz",
        title: "Service Design Quiz",
        type: "quiz",
        description: "Assess knowledge of service design thinking and blueprint structure.",
      },
    ],
    modules: [
      {
        id: "service-design-discovery",
        title: "Discovery & Mapping",
        sections: [
          {
            id: "service-design-research",
            title: "Research Methods",
            lessons: [
              {
                id: "service-design-lesson-1",
                title: "Service Design Fundamentals",
                videoUrl: "https://www.youtube.com/embed/ojqN3tZqcew",
              },
              {
                id: "service-design-lesson-2",
                title: "Journey Mapping Techniques",
                videoUrl: "https://www.youtube.com/embed/2W13ext26kQ",
              },
            ],
          },
        ],
      },
      {
        id: "service-design-blueprints-module",
        title: "Blueprint Creation",
        sections: [
          {
            id: "service-design-blueprint-techniques",
            title: "Blueprint Techniques",
            lessons: [
              {
                id: "service-design-lesson-3",
                title: "Building Service Blueprints",
                videoUrl: "https://www.youtube.com/embed/-glgJ9U_Fsk",
              },
              {
                id: "service-design-lesson-4",
                title: "Operational Layers",
                videoUrl: "https://www.youtube.com/embed/34lWQwoYddw",
              },
            ],
          },
        ],
      },
      {
        id: "service-design-ops",
        title: "Operational Alignment",
        sections: [
          {
            id: "service-design-operations",
            title: "Operations & Metrics",
            lessons: [
              {
                id: "service-design-lesson-5",
                title: "Aligning Teams Around Blueprints",
                videoUrl: "https://www.youtube.com/embed/G44jtKmbz-0",
              },
              {
                id: "service-design-lesson-6",
                title: "Measuring Service Experiences",
                videoUrl: "https://www.youtube.com/embed/mr-6gTlRXU0",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "product-design-motion",
    title: "Product Design Motion Systems",
    description: "Craft motion principles, prototypes, and systems that enhance product experiences.",
    category: "product-design",
    difficulty: "Intermediate",
    duration: "7 hours",
    prerequisites: ["Interaction design", "Animation basics"],
    tags: ["Motion Design", "Interaction", "Design Systems", "Prototyping"],
    roles: ["Product Designer", "Interaction Designer", "Design Technologist"],
    tools: ["Figma", "After Effects", "Principle", "ProtoPie"],
    outcomes: [
      "Define motion principles aligned to brand",
      "Prototype advanced interactions with motion",
      "Integrate motion tokens into design systems",
    ],
    languages: ["en"],
    status: "live",
    projectBriefs: [
      {
        id: "motion-library",
        title: "Motion System Library",
        description: "Build a motion system library with principles, prototypes, and implementation guidance.",
        deliverables: ["Motion principles", "Prototype library", "Handoff documentation"],
        difficulty: "Intermediate",
      },
    ],
    assessments: [
      {
        id: "motion-design-assignment",
        title: "Motion Prototype Assignment",
        type: "assignment",
        description: "Prototype a multi-step interaction showcasing motion principles.",
      },
    ],
    modules: [
      {
        id: "motion-principles",
        title: "Motion Principles",
        sections: [
          {
            id: "motion-principles-foundations",
            title: "Foundations",
            lessons: [
              {
                id: "motion-principles-lesson-1",
                title: "Motion Design Fundamentals",
                videoUrl: "https://www.youtube.com/embed/bKxuon6iGhg",
              },
              {
                id: "motion-principles-lesson-2",
                title: "Principles in Product Design",
                videoUrl: "https://www.youtube.com/embed/9EPTM91TBDU",
              },
            ],
          },
        ],
      },
      {
        id: "motion-prototyping",
        title: "Prototyping & Systems",
        sections: [
          {
            id: "motion-prototyping-tools",
            title: "Tools & Techniques",
            lessons: [
              {
                id: "motion-principles-lesson-3",
                title: "Prototyping Motion with Figma",
                videoUrl: "https://www.youtube.com/embed/-d6zNGeF59M",
              },
              {
                id: "motion-principles-lesson-4",
                title: "Advanced Motion Tools",
                videoUrl: "https://www.youtube.com/embed/XDy_Q6Elmlc",
              },
            ],
          },
        ],
      },
      {
        id: "motion-implementation",
        title: "Implementation & Handoff",
        sections: [
          {
            id: "motion-implementation-guidance",
            title: "Implementation",
            lessons: [
              {
                id: "motion-principles-lesson-5",
                title: "Motion in Design Systems",
                videoUrl: "https://www.youtube.com/embed/Itsg48crOjM",
              },
              {
                id: "motion-principles-lesson-6",
                title: "Partnering with Engineering",
                videoUrl: "https://www.youtube.com/embed/gQfWR-USO5c",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "design-critique-facilitation",
    title: "Design Critique Facilitation",
    description: "Facilitate high-impact design critiques and feedback rituals that elevate product quality.",
    category: "product-design",
    difficulty: "Beginner",
    duration: "6 hours",
    prerequisites: ["Design fundamentals"],
    tags: ["Design Critique", "Facilitation", "Feedback", "Team Rituals"],
    roles: ["Product Designer", "Product Manager", "Design Lead"],
    tools: ["Figma", "Zoom", "Mural", "Notion"],
    outcomes: [
      "Design critique frameworks tailored to team maturity",
      "Facilitate inclusive feedback conversations",
      "Create rituals that build craft and accountability",
    ],
    languages: ["en"],
    status: "live",
    projectBriefs: [
      {
        id: "critique-ritual",
        title: "Critique Ritual Setup",
        description: "Design a critique ritual with agenda, prompts, and feedback templates.",
        deliverables: ["Critique agenda", "Feedback prompts", "Ritual playbook"],
        difficulty: "Beginner",
      },
    ],
    assessments: [
      {
        id: "critique-facilitation-quiz",
        title: "Facilitation Quiz",
        type: "quiz",
        description: "Assess facilitation techniques and feedback models.",
      },
    ],
    modules: [
      {
        id: "critique-foundations",
        title: "Critique Foundations",
        sections: [
          {
            id: "critique-principles",
            title: "Principles",
            lessons: [
              {
                id: "critique-lesson-1",
                title: "Running Effective Critiques",
                videoUrl: "https://www.youtube.com/embed/_kGESn8ArrU",
              },
              {
                id: "critique-lesson-2",
                title: "Feedback Models",
                videoUrl: "https://www.youtube.com/embed/wtl5UrrgU8c",
              },
            ],
          },
        ],
      },
      {
        id: "critique-facilitation-techniques",
        title: "Facilitation Techniques",
        sections: [
          {
            id: "critique-tactics",
            title: "Tactics",
            lessons: [
              {
                id: "critique-lesson-3",
                title: "Inclusive Facilitation",
                videoUrl: "https://www.youtube.com/embed/So8aseCO3hY",
              },
              {
                id: "critique-lesson-4",
                title: "Remote Critiques",
                videoUrl: "https://www.youtube.com/embed/4WUXwhfKtck",
              },
            ],
          },
        ],
      },
      {
        id: "critique-operationalization",
        title: "Operationalizing Critiques",
        sections: [
          {
            id: "critique-ops",
            title: "Operations",
            lessons: [
              {
                id: "critique-lesson-5",
                title: "Scaling Critique Rituals",
                videoUrl: "https://www.youtube.com/embed/P1qp9xEhawI",
              },
              {
                id: "critique-lesson-6",
                title: "Measuring Critique Impact",
                videoUrl: "https://www.youtube.com/embed/_Bd17Szxs4s",
              },
            ],
          },
        ],
      },
    ],
  },
];

export const categories: Category[] = Object.entries(categoryMeta).map(([id, meta]) => ({
  id,
  ...meta,
  courseCount: courses.filter((course) => course.category === id).length,
}));
