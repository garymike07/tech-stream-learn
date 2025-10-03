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
                videoUrl: "https://www.youtube.com/embed/6d1mOZ5Nmn8",
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
                videoUrl: "https://www.youtube.com/embed/3vnmZF79E1Y",
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
                videoUrl: "https://www.youtube.com/embed/ia-UEYYR44s",
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
                videoUrl: "https://www.youtube.com/embed/Ebq0H9mHkJw",
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
];

export const categories: Category[] = Object.entries(categoryMeta).map(([id, meta]) => ({
  id,
  ...meta,
  courseCount: courses.filter((course) => course.category === id).length,
}));
