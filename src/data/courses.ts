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

export const categories: Category[] = [
  {
    id: "frontend",
    name: "Frontend Development",
    description: "Master modern web interfaces with HTML, CSS, JavaScript, and frameworks",
    icon: "💻",
    courseCount: 6,
  },
  {
    id: "backend",
    name: "Backend Development",
    description: "Build robust server-side applications and APIs",
    icon: "⚙️",
    courseCount: 5,
  },
  {
    id: "cloud",
    name: "Cloud Computing",
    description: "Deploy and scale applications on AWS, Azure, and GCP",
    icon: "☁️",
    courseCount: 5,
  },
  {
    id: "data-science",
    name: "Data Science",
    description: "Analyze data, build ML models, and create visualizations",
    icon: "📊",
    courseCount: 5,
  },
  {
    id: "databases",
    name: "Databases",
    description: "Design and manage SQL and NoSQL databases",
    icon: "🗄️",
    courseCount: 5,
  },
  {
    id: "apis",
    name: "API Development",
    description: "Create RESTful and GraphQL APIs",
    icon: "🔌",
    courseCount: 4,
  },
];

export const courses: Course[] = [
  {
    id: "react-fundamentals",
    title: "React Fundamentals",
    description: "Learn React from scratch and build modern web applications",
    category: "frontend",
    difficulty: "Beginner",
    duration: "12 hours",
    prerequisites: ["JavaScript basics", "HTML & CSS"],
    modules: [
      {
        id: "module-1",
        title: "Introduction to React",
        sections: [
          {
            id: "section-1-1",
            title: "Getting Started",
            lessons: [
              {
                id: "lesson-1-1-1",
                title: "What is React?",
                videoUrl: "https://www.youtube.com/embed/N3AkSS5hXMA",
                videoDuration: "12:30",
              },
              {
                id: "lesson-1-1-2",
                title: "Setting up Development Environment",
                videoUrl: "https://www.youtube.com/embed/SqcY0GlETPg",
                videoDuration: "15:45",
              },
            ],
          },
          {
            id: "section-1-2",
            title: "React Basics",
            lessons: [
              {
                id: "lesson-1-2-1",
                title: "Components and JSX",
                videoUrl: "https://www.youtube.com/embed/h3yp6vr8Uxo",
                videoDuration: "20:15",
              },
              {
                id: "lesson-1-2-2",
                title: "Props and State",
                videoUrl: "https://www.youtube.com/embed/O6P86uwfdR0",
                videoDuration: "25:30",
              },
            ],
          },
        ],
      },
      {
        id: "module-2",
        title: "Advanced React Concepts",
        sections: [
          {
            id: "section-2-1",
            title: "Hooks",
            lessons: [
              {
                id: "lesson-2-1-1",
                title: "useState and useEffect",
                videoUrl: "https://www.youtube.com/embed/O6P86uwfdR0",
                videoDuration: "30:00",
              },
              {
                id: "lesson-2-1-2",
                title: "Custom Hooks",
                videoUrl: "https://www.youtube.com/embed/6ThXsUwLWvc",
                videoDuration: "18:45",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "vue-complete",
    title: "Complete Vue.js Course",
    description: "Master Vue.js and build dynamic single-page applications",
    category: "frontend",
    difficulty: "Intermediate",
    duration: "10 hours",
    prerequisites: ["JavaScript", "HTML & CSS"],
    modules: [
      {
        id: "module-1",
        title: "Vue Fundamentals",
        sections: [
          {
            id: "section-1-1",
            title: "Introduction to Vue",
            lessons: [
              {
                id: "lesson-1-1-1",
                title: "What is Vue.js?",
                videoUrl: "https://www.youtube.com/embed/bzlFvd0b65c",
                videoDuration: "18:30",
              },
              {
                id: "lesson-1-1-2",
                title: "Vue Instance and Data Binding",
                videoUrl: "https://www.youtube.com/embed/YrxBCBibVo0",
                videoDuration: "22:15",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "html-css-mastery",
    title: "HTML & CSS Mastery",
    description: "Build beautiful, responsive websites from scratch",
    category: "frontend",
    difficulty: "Beginner",
    duration: "8 hours",
    modules: [
      {
        id: "module-1",
        title: "HTML Fundamentals",
        sections: [
          {
            id: "section-1-1",
            title: "HTML Basics",
            lessons: [
              {
                id: "lesson-1-1-1",
                title: "Introduction to HTML",
                videoUrl: "https://www.youtube.com/embed/qz0aGYrrlhU",
                videoDuration: "25:00",
              },
              {
                id: "lesson-1-1-2",
                title: "HTML Elements and Structure",
                videoUrl: "https://www.youtube.com/embed/pQN-pnXPaVg",
                videoDuration: "30:45",
              },
            ],
          },
        ],
      },
      {
        id: "module-2",
        title: "CSS Styling",
        sections: [
          {
            id: "section-2-1",
            title: "CSS Fundamentals",
            lessons: [
              {
                id: "lesson-2-1-1",
                title: "CSS Selectors and Properties",
                videoUrl: "https://www.youtube.com/embed/1PnVor36_40",
                videoDuration: "28:20",
              },
              {
                id: "lesson-2-1-2",
                title: "Flexbox and Grid",
                videoUrl: "https://www.youtube.com/embed/3YW65K6LcIA",
                videoDuration: "35:00",
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
    description: "Build scalable backend applications with Node.js and Express",
    category: "backend",
    difficulty: "Intermediate",
    duration: "14 hours",
    prerequisites: ["JavaScript", "Basic HTTP knowledge"],
    modules: [
      {
        id: "module-1",
        title: "Node.js Fundamentals",
        sections: [
          {
            id: "section-1-1",
            title: "Getting Started with Node.js",
            lessons: [
              {
                id: "lesson-1-1-1",
                title: "Introduction to Node.js",
                videoUrl: "https://www.youtube.com/embed/TlB_eWDSMt4",
                videoDuration: "15:00",
              },
              {
                id: "lesson-1-1-2",
                title: "Node.js Architecture",
                videoUrl: "https://www.youtube.com/embed/JZXQ455OT3A",
                videoDuration: "22:30",
              },
            ],
          },
          {
            id: "section-1-2",
            title: "Express Framework",
            lessons: [
              {
                id: "lesson-1-2-1",
                title: "Setting up Express Server",
                videoUrl: "https://www.youtube.com/embed/L72fhGm1tfE",
                videoDuration: "20:15",
              },
              {
                id: "lesson-1-2-2",
                title: "Routing and Middleware",
                videoUrl: "https://www.youtube.com/embed/lY6icfhap2o",
                videoDuration: "25:45",
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
    description: "Create robust web applications with Python and Django",
    category: "backend",
    difficulty: "Intermediate",
    duration: "16 hours",
    prerequisites: ["Python basics"],
    modules: [
      {
        id: "module-1",
        title: "Django Fundamentals",
        sections: [
          {
            id: "section-1-1",
            title: "Getting Started",
            lessons: [
              {
                id: "lesson-1-1-1",
                title: "Django Introduction",
                videoUrl: "https://www.youtube.com/embed/F5mRW0jo-U4",
                videoDuration: "18:00",
              },
              {
                id: "lesson-1-1-2",
                title: "Models and Databases",
                videoUrl: "https://www.youtube.com/embed/rHux0gMZ3Eg",
                videoDuration: "32:15",
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
    description: "Master Amazon Web Services and cloud computing fundamentals",
    category: "cloud",
    difficulty: "Beginner",
    duration: "12 hours",
    modules: [
      {
        id: "module-1",
        title: "Introduction to AWS",
        sections: [
          {
            id: "section-1-1",
            title: "AWS Basics",
            lessons: [
              {
                id: "lesson-1-1-1",
                title: "What is Cloud Computing?",
                videoUrl: "https://www.youtube.com/embed/dH0yz-Osy54",
                videoDuration: "18:00",
              },
              {
                id: "lesson-1-1-2",
                title: "AWS Services Overview",
                videoUrl: "https://www.youtube.com/embed/JIbIYCM48to",
                videoDuration: "24:30",
              },
            ],
          },
          {
            id: "section-1-2",
            title: "EC2 and Compute",
            lessons: [
              {
                id: "lesson-1-2-1",
                title: "EC2 Instances",
                videoUrl: "https://www.youtube.com/embed/iHX-jtKIVNA",
                videoDuration: "28:15",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "azure-fundamentals",
    title: "Microsoft Azure Fundamentals",
    description: "Learn Azure cloud services and deployment",
    category: "cloud",
    difficulty: "Beginner",
    duration: "10 hours",
    modules: [
      {
        id: "module-1",
        title: "Azure Basics",
        sections: [
          {
            id: "section-1-1",
            title: "Introduction to Azure",
            lessons: [
              {
                id: "lesson-1-1-1",
                title: "Azure Overview",
                videoUrl: "https://www.youtube.com/embed/3vnmZF79E1Y",
                videoDuration: "22:00",
              },
              {
                id: "lesson-1-1-2",
                title: "Azure Portal Tour",
                videoUrl: "https://www.youtube.com/embed/pN8EekXx_1c",
                videoDuration: "19:45",
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
    description: "Learn data analysis, visualization, and machine learning with Python",
    category: "data-science",
    difficulty: "Beginner",
    duration: "18 hours",
    prerequisites: ["Basic Python"],
    modules: [
      {
        id: "module-1",
        title: "Data Analysis Fundamentals",
        sections: [
          {
            id: "section-1-1",
            title: "Introduction to Data Science",
            lessons: [
              {
                id: "lesson-1-1-1",
                title: "What is Data Science?",
                videoUrl: "https://www.youtube.com/embed/ua-CiDNNj30",
                videoDuration: "20:00",
              },
              {
                id: "lesson-1-1-2",
                title: "Python for Data Analysis",
                videoUrl: "https://www.youtube.com/embed/vmEHCJofslg",
                videoDuration: "45:30",
              },
            ],
          },
          {
            id: "section-1-2",
            title: "Pandas and NumPy",
            lessons: [
              {
                id: "lesson-1-2-1",
                title: "NumPy Arrays",
                videoUrl: "https://www.youtube.com/embed/QUT1VHiLmmI",
                videoDuration: "32:15",
              },
              {
                id: "lesson-1-2-2",
                title: "Pandas DataFrames",
                videoUrl: "https://www.youtube.com/embed/vmEHCJofslg",
                videoDuration: "38:20",
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
    description: "Build and train ML models with Python and scikit-learn",
    category: "data-science",
    difficulty: "Advanced",
    duration: "20 hours",
    prerequisites: ["Python", "Statistics", "Linear Algebra"],
    modules: [
      {
        id: "module-1",
        title: "ML Basics",
        sections: [
          {
            id: "section-1-1",
            title: "Introduction to ML",
            lessons: [
              {
                id: "lesson-1-1-1",
                title: "What is Machine Learning?",
                videoUrl: "https://www.youtube.com/embed/ukzFI9rgwfU",
                videoDuration: "25:00",
              },
              {
                id: "lesson-1-1-2",
                title: "Supervised vs Unsupervised Learning",
                videoUrl: "https://www.youtube.com/embed/1FZ0A1QCMWc",
                videoDuration: "18:30",
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
    description: "Master PostgreSQL for robust data management",
    category: "databases",
    difficulty: "Intermediate",
    duration: "12 hours",
    prerequisites: ["Basic SQL"],
    modules: [
      {
        id: "module-1",
        title: "PostgreSQL Fundamentals",
        sections: [
          {
            id: "section-1-1",
            title: "Getting Started",
            lessons: [
              {
                id: "lesson-1-1-1",
                title: "Introduction to PostgreSQL",
                videoUrl: "https://www.youtube.com/embed/qw--VYLpxG4",
                videoDuration: "22:45",
              },
              {
                id: "lesson-1-1-2",
                title: "Database Design",
                videoUrl: "https://www.youtube.com/embed/ztHopE5Wnpc",
                videoDuration: "28:30",
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
    description: "Learn MongoDB for flexible, scalable data storage",
    category: "databases",
    difficulty: "Beginner",
    duration: "10 hours",
    modules: [
      {
        id: "module-1",
        title: "MongoDB Basics",
        sections: [
          {
            id: "section-1-1",
            title: "Introduction",
            lessons: [
              {
                id: "lesson-1-1-1",
                title: "What is MongoDB?",
                videoUrl: "https://www.youtube.com/embed/-56x56UppqQ",
                videoDuration: "20:15",
              },
              {
                id: "lesson-1-1-2",
                title: "CRUD Operations",
                videoUrl: "https://www.youtube.com/embed/ExcRbA7fy_A",
                videoDuration: "35:40",
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
    description: "Design and build professional REST APIs",
    category: "apis",
    difficulty: "Intermediate",
    duration: "14 hours",
    prerequisites: ["JavaScript or Python", "HTTP basics"],
    modules: [
      {
        id: "module-1",
        title: "REST API Fundamentals",
        sections: [
          {
            id: "section-1-1",
            title: "API Design Principles",
            lessons: [
              {
                id: "lesson-1-1-1",
                title: "What is REST?",
                videoUrl: "https://www.youtube.com/embed/lsMQRaeKNDk",
                videoDuration: "16:30",
              },
              {
                id: "lesson-1-1-2",
                title: "HTTP Methods and Status Codes",
                videoUrl: "https://www.youtube.com/embed/-mN3VyJuCjM",
                videoDuration: "22:15",
              },
            ],
          },
          {
            id: "section-1-2",
            title: "Building APIs",
            lessons: [
              {
                id: "lesson-1-2-1",
                title: "Creating REST Endpoints",
                videoUrl: "https://www.youtube.com/embed/pKd0Rpw7O48",
                videoDuration: "38:45",
              },
              {
                id: "lesson-1-2-2",
                title: "Authentication and Security",
                videoUrl: "https://www.youtube.com/embed/926mknSW9Lo",
                videoDuration: "28:20",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "angular-enterprise",
    title: "Angular for Enterprise",
    description: "Build large-scale applications with Angular",
    category: "frontend",
    difficulty: "Advanced",
    duration: "18 hours",
    prerequisites: ["TypeScript", "Advanced JavaScript"],
    modules: [
      {
        id: "module-ae-1",
        title: "Introduction",
        sections: [
          {
            id: "section-ae-1-1",
            title: "Getting Started",
            lessons: [
              {
                id: "lesson-ae-1-1-1",
                title: "Course Overview",
                videoUrl: "https://www.youtube.com/embed/placeholder",
                videoDuration: "10:00",
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
    description: "Learn to build web applications with SvelteKit",
    category: "frontend",
    difficulty: "Intermediate",
    duration: "9 hours",
    prerequisites: ["JavaScript", "Svelte"],
    modules: [
      {
        id: "module-se-1",
        title: "Introduction",
        sections: [
          {
            id: "section-se-1-1",
            title: "Getting Started",
            lessons: [
              {
                id: "lesson-se-1-1-1",
                title: "Course Overview",
                videoUrl: "https://www.youtube.com/embed/placeholder",
                videoDuration: "10:00",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "advanced-css-sass",
    title: "Advanced CSS with Sass",
    description: "Master advanced CSS concepts and Sass",
    category: "frontend",
    difficulty: "Intermediate",
    duration: "7 hours",
    prerequisites: ["HTML", "CSS"],
    modules: [
      {
        id: "module-acs-1",
        title: "Introduction",
        sections: [
          {
            id: "section-acs-1-1",
            title: "Getting Started",
            lessons: [
              {
                id: "lesson-acs-1-1-1",
                title: "Course Overview",
                videoUrl: "https://www.youtube.com/embed/placeholder",
                videoDuration: "10:00",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "go-for-beginners",
    title: "Go (Golang) for Beginners",
    description: "Learn the Go programming language from scratch",
    category: "backend",
    difficulty: "Beginner",
    duration: "11 hours",
    modules: [
      {
        id: "module-gfb-1",
        title: "Introduction",
        sections: [
          {
            id: "section-gfb-1-1",
            title: "Getting Started",
            lessons: [
              {
                id: "lesson-gfb-1-1-1",
                title: "Course Overview",
                videoUrl: "https://www.youtube.com/embed/placeholder",
                videoDuration: "10:00",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "microservices-spring-boot",
    title: "Building Microservices with Spring Boot",
    description: "Create and manage microservices with Spring Boot",
    category: "backend",
    difficulty: "Advanced",
    duration: "20 hours",
    prerequisites: ["Java", "Spring Framework"],
    modules: [
      {
        id: "module-msb-1",
        title: "Introduction",
        sections: [
          {
            id: "section-msb-1-1",
            title: "Getting Started",
            lessons: [
              {
                id: "lesson-msb-1-1-1",
                title: "Course Overview",
                videoUrl: "https://www.youtube.com/embed/placeholder",
                videoDuration: "10:00",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "intro-ruby-on-rails",
    title: "Introduction to Ruby on Rails",
    description: "Learn to build web applications with Ruby on Rails",
    category: "backend",
    difficulty: "Beginner",
    duration: "13 hours",
    prerequisites: ["Ruby"],
    modules: [
      {
        id: "module-iror-1",
        title: "Introduction",
        sections: [
          {
            id: "section-iror-1-1",
            title: "Getting Started",
            lessons: [
              {
                id: "lesson-iror-1-1-1",
                title: "Course Overview",
                videoUrl: "https://www.youtube.com/embed/placeholder",
                videoDuration: "10:00",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "gcp-associate-cloud-engineer",
    title: "GCP Associate Cloud Engineer",
    description: "Prepare for the Google Cloud Associate Cloud Engineer certification",
    category: "cloud",
    difficulty: "Intermediate",
    duration: "22 hours",
    prerequisites: ["Basic cloud knowledge"],
    modules: [
      {
        id: "module-gcp-1",
        title: "Introduction",
        sections: [
          {
            id: "section-gcp-1-1",
            title: "Getting Started",
            lessons: [
              {
                id: "lesson-gcp-1-1-1",
                title: "Course Overview",
                videoUrl: "https://www.youtube.com/embed/placeholder",
                videoDuration: "10:00",
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
    description: "Learn how to deploy and manage applications on Kubernetes",
    category: "cloud",
    difficulty: "Intermediate",
    duration: "16 hours",
    prerequisites: ["Docker"],
    modules: [
      {
        id: "module-kfd-1",
        title: "Introduction",
        sections: [
          {
            id: "section-kfd-1-1",
            title: "Getting Started",
            lessons: [
              {
                id: "lesson-kfd-1-1-1",
                title: "Course Overview",
                videoUrl: "https://www.youtube.com/embed/placeholder",
                videoDuration: "10:00",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "terraform-iac",
    title: "Terraform for Infrastructure as Code",
    description: "Manage infrastructure with Terraform",
    category: "cloud",
    difficulty: "Intermediate",
    duration: "12 hours",
    prerequisites: ["Basic cloud knowledge"],
    modules: [
      {
        id: "module-tiac-1",
        title: "Introduction",
        sections: [
          {
            id: "section-tiac-1-1",
            title: "Getting Started",
            lessons: [
              {
                id: "lesson-tiac-1-1-1",
                title: "Course Overview",
                videoUrl: "https://www.youtube.com/embed/placeholder",
                videoDuration: "10:00",
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
    description: "Build deep learning models with TensorFlow",
    category: "data-science",
    difficulty: "Advanced",
    duration: "25 hours",
    prerequisites: ["Python", "Machine Learning"],
    modules: [
      {
        id: "module-dlt-1",
        title: "Introduction",
        sections: [
          {
            id: "section-dlt-1-1",
            title: "Getting Started",
            lessons: [
              {
                id: "lesson-dlt-1-1-1",
                title: "Course Overview",
                videoUrl: "https://www.youtube.com/embed/placeholder",
                videoDuration: "10:00",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "nlp-with-python",
    title: "Natural Language Processing (NLP) with Python",
    description: "Learn to process and analyze text data",
    category: "data-science",
    difficulty: "Advanced",
    duration: "19 hours",
    prerequisites: ["Python", "Machine Learning"],
    modules: [
      {
        id: "module-nlp-1",
        title: "Introduction",
        sections: [
          {
            id: "section-nlp-1-1",
            title: "Getting Started",
            lessons: [
              {
                id: "lesson-nlp-1-1-1",
                title: "Course Overview",
                videoUrl: "https://www.youtube.com/embed/placeholder",
                videoDuration: "10:00",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "big-data-spark",
    title: "Big Data with Apache Spark",
    description: "Process large datasets with Apache Spark",
    category: "data-science",
    difficulty: "Advanced",
    duration: "24 hours",
    prerequisites: ["Python or Scala"],
    modules: [
      {
        id: "module-bds-1",
        title: "Introduction",
        sections: [
          {
            id: "section-bds-1-1",
            title: "Getting Started",
            lessons: [
              {
                id: "lesson-bds-1-1-1",
                title: "Course Overview",
                videoUrl: "https://www.youtube.com/embed/placeholder",
                videoDuration: "10:00",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "redis-caching",
    title: "Redis for Caching",
    description: "Learn how to use Redis for caching and performance",
    category: "databases",
    difficulty: "Intermediate",
    duration: "8 hours",
    modules: [
      {
        id: "module-rc-1",
        title: "Introduction",
        sections: [
          {
            id: "section-rc-1-1",
            title: "Getting Started",
            lessons: [
              {
                id: "lesson-rc-1-1-1",
                title: "Course Overview",
                videoUrl: "https://www.youtube.com/embed/placeholder",
                videoDuration: "10:00",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "graphql-apollo",
    title: "GraphQL with Apollo Server",
    description: "Build GraphQL APIs with Apollo Server",
    category: "databases",
    difficulty: "Intermediate",
    duration: "11 hours",
    prerequisites: ["Node.js", "Express"],
    modules: [
      {
        id: "module-ga-1",
        title: "Introduction",
        sections: [
          {
            id: "section-ga-1-1",
            title: "Getting Started",
            lessons: [
              {
                id: "lesson-ga-1-1-1",
                title: "Course Overview",
                videoUrl: "https://www.youtube.com/embed/placeholder",
                videoDuration: "10:00",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "database-design-modeling",
    title: "Database Design and Modeling",
    description: "Learn the fundamentals of database design and modeling",
    category: "databases",
    difficulty: "Beginner",
    duration: "9 hours",
    prerequisites: ["Basic SQL"],
    modules: [
      {
        id: "module-ddm-1",
        title: "Introduction",
        sections: [
          {
            id: "section-ddm-1-1",
            title: "Getting Started",
            lessons: [
              {
                id: "lesson-ddm-1-1-1",
                title: "Course Overview",
                videoUrl: "https://www.youtube.com/embed/placeholder",
                videoDuration: "10:00",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "grpc-high-performance-apis",
    title: "gRPC for High-Performance APIs",
    description: "Build high-performance APIs with gRPC",
    category: "apis",
    difficulty: "Advanced",
    duration: "15 hours",
    prerequisites: ["Protocol Buffers"],
    modules: [
      {
        id: "module-grpc-1",
        title: "Introduction",
        sections: [
          {
            id: "section-grpc-1-1",
            title: "Getting Started",
            lessons: [
              {
                id: "lesson-grpc-1-1-1",
                title: "Course Overview",
                videoUrl: "https://www.youtube.com/embed/placeholder",
                videoDuration: "10:00",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "api-security-best-practices",
    title: "API Security Best Practices",
    description: "Learn how to secure your APIs",
    category: "apis",
    difficulty: "Intermediate",
    duration: "10 hours",
    prerequisites: ["Basic API knowledge"],
    modules: [
      {
        id: "module-asbp-1",
        title: "Introduction",
        sections: [
          {
            id: "section-asbp-1-1",
            title: "Getting Started",
            lessons: [
              {
                id: "lesson-asbp-1-1-1",
                title: "Course Overview",
                videoUrl: "https://www.youtube.com/embed/placeholder",
                videoDuration: "10:00",
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
    description: "Create fast and efficient APIs with FastAPI",
    category: "apis",
    difficulty: "Intermediate",
    duration: "12 hours",
    prerequisites: ["Python"],
    modules: [
      {
        id: "module-baf-1",
        title: "Introduction",
        sections: [
          {
            id: "section-baf-1-1",
            title: "Getting Started",
            lessons: [
              {
                id: "lesson-baf-1-1-1",
                title: "Course Overview",
                videoUrl: "https://www.youtube.com/embed/placeholder",
                videoDuration: "10:00",
              },
            ],
          },
        ],
      },
    ],
  },
];
