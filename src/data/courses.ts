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
];

export const categories: Category[] = Object.entries(categoryMeta).map(([id, meta]) => ({
  id,
  ...meta,
  courseCount: courses.filter((course) => course.category === id).length,
}));
