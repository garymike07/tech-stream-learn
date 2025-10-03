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
    courseCount: 3,
  },
  {
    id: "backend",
    name: "Backend Development",
    description: "Build robust server-side applications and APIs",
    icon: "⚙️",
    courseCount: 2,
  },
  {
    id: "cloud",
    name: "Cloud Computing",
    description: "Deploy and scale applications on AWS, Azure, and GCP",
    icon: "☁️",
    courseCount: 2,
  },
  {
    id: "data-science",
    name: "Data Science",
    description: "Analyze data, build ML models, and create visualizations",
    icon: "📊",
    courseCount: 2,
  },
  {
    id: "databases",
    name: "Databases",
    description: "Design and manage SQL and NoSQL databases",
    icon: "🗄️",
    courseCount: 2,
  },
  {
    id: "apis",
    name: "API Development",
    description: "Create RESTful and GraphQL APIs",
    icon: "🔌",
    courseCount: 1,
  },
];

export const courses: Course[] = [
  {
    id: "react-fundamentals",
    title: "React Fundamentals",
    description: "Learn React from scratch and build modern web applications",
    category: "frontend",
    difficulty: "Beginner",
    duration: "8 hours",
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
    id: "nodejs-backend",
    title: "Node.js Backend Development",
    description: "Build scalable backend applications with Node.js and Express",
    category: "backend",
    difficulty: "Intermediate",
    duration: "12 hours",
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
    duration: "10 hours",
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
    duration: "15 hours",
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
            ],
          },
        ],
      },
    ],
  },
];
