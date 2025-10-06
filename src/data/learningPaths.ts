export type LearningPathStage = {
  id: string;
  title: string;
  description: string;
  courseIds: string[];
  outcomes: string[];
};

export type LearningPath = {
  id: string;
  title: string;
  description: string;
  focus: string;
  duration: string;
  idealFor: string[];
  tier: "Pro" | "Elite";
  recommendedCadence: string;
  badge: {
    id: string;
    name: string;
    icon: string;
  };
  concierge?: {
    lead: string;
    title: string;
    bio: string;
    contact: string;
  };
  cohortWindows?: Array<{
    id: string;
    label: string;
    format: string;
    starts: string;
    focus: string;
  }>;
  spotlightProjects?: Array<{
    id: string;
    title: string;
    description: string;
    outcome: string;
  }>;
  stages: LearningPathStage[];
  successMetrics: string[];
  capstone: {
    title: string;
    description: string;
    deliverables: string[];
  };
  resources?: Array<{
    title: string;
    url: string;
  }>;
};

export const learningPaths: LearningPath[] = [
  {
    id: "frontend-platform-architect",
    title: "Frontend Platform Architect",
    description: "Lead high-impact web experiences with resilient architecture, performance, and design systems mastery.",
    focus: "Frontend excellence, performance, and design systems",
    duration: "8-12 weeks",
    idealFor: ["Senior Frontend Engineers", "UI Architects", "Design System Leads"],
    tier: "Pro",
    recommendedCadence: "2 deep work sessions per week + Friday playback",
    badge: {
      id: "badge-frontend-platform",
      name: "Frontend Platform Architect",
      icon: "🛠️",
    },
    concierge: {
      lead: "Nisha Patel",
      title: "Principal Frontend Architect",
      bio: "Leads experience platforms at scale with focus on performance, accessibility, and design ops.",
      contact: "nisha@mlcconcierge.com",
    },
    cohortWindows: [
      {
        id: "frontend-q3",
        label: "July 8 kickoff",
        format: "Hybrid • Weekly live design critiques",
        starts: "2024-07-08",
        focus: "Performance budgets & design tokens",
      },
      {
        id: "frontend-q4",
        label: "October 14 kickoff",
        format: "Virtual • Platform governance cohort",
        starts: "2024-10-14",
        focus: "Design system adoption surveys",
      },
    ],
    spotlightProjects: [
      {
        id: "frontend-blueprint",
        title: "Experience platform audit",
        description: "Benchmark core web vitals across flagship journeys and build remediation plan.",
        outcome: "Executive-ready performance scorecard",
      },
      {
        id: "frontend-governance",
        title: "Design system governance",
        description: "Define adoption metrics, contribution models, and rollout communications.",
        outcome: "Design system governance brief",
      },
    ],
    stages: [
      {
        id: "foundation",
        title: "Framework & Architecture",
        description: "Solidify advanced React and Next.js architecture patterns.",
        courseIds: ["react-fundamentals", "nextjs-app-router"],
        outcomes: [
          "Architect React 18 apps with concurrent rendering",
          "Ship production-grade Next.js App Router experiences",
          "Adopt resilient routing, caching, and streaming patterns",
        ],
      },
      {
        id: "performance",
        title: "Performance & Edge Delivery",
        description: "Deliver fast, resilient experiences across regions and devices.",
        courseIds: ["web-performance-optimization", "nextjs-edge-architectures"],
        outcomes: [
          "Design performance budgets and audits",
          "Adopt edge-rendered and streaming UI patterns",
          "Instrument performance analytics that influence roadmaps",
        ],
      },
      {
        id: "systems",
        title: "Design Systems at Scale",
        description: "Scale UI foundations and governance across teams.",
        courseIds: ["design-systems-storybook"],
        outcomes: [
          "Ship shared component libraries with Storybook",
          "Establish design token governance and automation",
          "Align design and engineering on quality guardrails",
        ],
      },
    ],
    successMetrics: [
      "<200ms core interactions on key journeys",
      "Adoption of shared design system across teams",
      "Performance regressions prevented via guardrails",
    ],
    capstone: {
      title: "Experience Platform Blueprint",
      description: "Design an experience platform that balances performance, accessibility, and delivery velocity.",
      deliverables: [
        "Architecture decision record",
        "Performance audit & remediation plan",
        "Design system governance playbook",
      ],
    },
  },
  {
    id: "backend-platform-strategist",
    title: "Backend Platform Strategist",
    description: "Engineer dependable, observable service platforms across multiple languages and runtimes.",
    focus: "Service design, API delivery, and platform operations",
    duration: "10-14 weeks",
    idealFor: ["Backend Tech Leads", "Platform Engineers", "Staff API Engineers"],
    tier: "Pro",
    recommendedCadence: "3 focus sprints with bi-weekly architecture reviews",
    badge: {
      id: "badge-backend-platform",
      name: "Backend Platform Strategist",
      icon: "🔗",
    },
    concierge: {
      lead: "David Ochieng",
      title: "Staff Platform Engineer",
      bio: "Specialises in multi-runtime platforms, SLO programs, and incident management playbooks.",
      contact: "david@mlcconcierge.com",
    },
    cohortWindows: [
      {
        id: "backend-q3",
        label: "August 5 kickoff",
        format: "Virtual • Architecture councils",
        starts: "2024-08-05",
        focus: "SLO instrumentation & service templates",
      },
      {
        id: "backend-q1",
        label: "January 13 kickoff",
        format: "Hybrid • Observability labs",
        starts: "2025-01-13",
        focus: "Incident response runbooks",
      },
    ],
    spotlightProjects: [
      {
        id: "backend-adr",
        title: "Multi-runtime decision record",
        description: "Document the strategy for supporting Go and .NET services within one platform.",
        outcome: "Architecture decision record reviewed by platform council",
      },
      {
        id: "backend-slo",
        title: "SLO rollout pilot",
        description: "Implement service-level objectives for two critical services and run the first error budget review.",
        outcome: "SLO scoreboard and review cadence",
      },
    ],
    stages: [
      {
        id: "api-delivery",
        title: "API Delivery Foundations",
        description: "Design resilient APIs with pragmatic runtime choices.",
        courseIds: ["fastapi-production-apis", "laravel-api-mastery"],
        outcomes: [
          "Ship authenticated, observable APIs",
          "Automate testing, quality gates, and deployments",
          "Design API contracts with versioning strategy",
        ],
      },
      {
        id: "microservices",
        title: "Scalable Microservices",
        description: "Deliver Go and .NET microservices with SLOs and resilience baked-in.",
        courseIds: ["go-microservices-platforms", "dotnet-minimal-apis"],
        outcomes: [
          "Instrument SLO-driven microservice operations",
          "Automate safety via policy-as-code and blue/green workflows",
          "Standardize service templates, observability, and deployment flows",
        ],
      },
    ],
    successMetrics: [
      "<2% critical incident rate per quarter",
      "Automated deployment success rate above 95%",
      "Unified service templates and playbooks adopted",
    ],
    capstone: {
      title: "Service Platform Blueprint",
      description: "Design a multi-language service platform with shared tooling, observability, and governance.",
      deliverables: [
        "Reference service template",
        "Operational maturity scorecard",
        "Incident response & SLO workbook",
      ],
    },
  },
  {
    id: "ai-product-leader",
    title: "AI Product Leader",
    description: "Drive AI initiatives from experimentation to responsible production delivery.",
    focus: "Responsible AI delivery and product operations",
    duration: "8-10 weeks",
    idealFor: ["AI Product Managers", "AI Tech Leads", "Founding AI Engineers"],
    tier: "Elite",
    recommendedCadence: "Weekly lab + executive synthesis clinic",
    badge: {
      id: "badge-ai-product",
      name: "AI Product Leader",
      icon: "🤖",
    },
    concierge: {
      lead: "Amelia Chen",
      title: "Head of Responsible AI",
      bio: "Guides global teams on LLM governance, evaluation frameworks, and ethical launch reviews.",
      contact: "amelia@mlcconcierge.com",
    },
    cohortWindows: [
      {
        id: "ai-q3",
        label: "July 22 kickoff",
        format: "Virtual • Responsible AI councils",
        starts: "2024-07-22",
        focus: "Evaluation frameworks & governance",
      },
      {
        id: "ai-q4",
        label: "November 4 kickoff",
        format: "Virtual • Product leadership studio",
        starts: "2024-11-04",
        focus: "AI impact storytelling",
      },
    ],
    spotlightProjects: [
      {
        id: "ai-eval",
        title: "LLM evaluation dashboard",
        description: "Design evaluation metrics, regression tracking, and qualitative review loops for a flagship LLM use case.",
        outcome: "Executive-ready evaluation scorecard",
      },
      {
        id: "ai-governance",
        title: "AI governance charter",
        description: "Define responsible launch gates, issue review templates, and compliance handoffs.",
        outcome: "Governance charter endorsed by cross-functional partners",
      },
    ],
    stages: [
      {
        id: "systems",
        title: "LLM Systems Engineering",
        description: "Design resilient LLM systems with evaluation and observability loops.",
        courseIds: ["llm-systems-engineering", "prompt-engineering-masterclass"],
        outcomes: [
          "Design prompt architectures with evaluation guardrails",
          "Instrument LLM observability and feedback cycles",
          "Partner with design and legal on AI risk reviews",
        ],
      },
      {
        id: "delivery",
        title: "Production AI Delivery",
        description: "Ship RAG and governance patterns that scale responsibly.",
        courseIds: ["rag-production-patterns", "ai-ethics-governance"],
        outcomes: [
          "Deploy retrieval pipelines with cost and latency controls",
          "Operationalize AI ethics guardrails and audits",
          "Measure AI product impact with qualitative and quantitative lenses",
        ],
      },
    ],
    successMetrics: [
      "LLM evaluation coverage and regression tracking",
      "Responsible AI checkpoints enforced across launches",
      "Model iterations informed by customer feedback loops",
    ],
    capstone: {
      title: "Responsible AI Launch Plan",
      description: "Create an AI launch playbook covering architecture, evaluation, and governance.",
      deliverables: [
        "System architecture diagram",
        "Evaluation & feedback scorecard",
        "AI governance readiness checklist",
      ],
    },
  },
  {
    id: "cloud-reliability-lead",
    title: "Cloud Reliability Lead",
    description: "Run reliable, cost-aware cloud platforms with multi-cloud, serverless, and observability mastery.",
    focus: "Multi-cloud architecture and observability",
    duration: "10-12 weeks",
    idealFor: ["Cloud Architects", "SRE Managers", "Platform Engineers"],
    tier: "Pro",
    recommendedCadence: "Bi-weekly reliability labs + asynchronous office hours",
    badge: {
      id: "badge-cloud-reliability",
      name: "Cloud Reliability Lead",
      icon: "☁️",
    },
    concierge: {
      lead: "Jonah Mwangi",
      title: "Principal SRE",
      bio: "Focuses on multi-cloud resiliency, observability, and FinOps guardrails for global teams.",
      contact: "jonah@mlcconcierge.com",
    },
    cohortWindows: [
      {
        id: "cloud-q3",
        label: "September 9 kickoff",
        format: "Hybrid • Reliability game days",
        starts: "2024-09-09",
        focus: "Serverless resiliency & FinOps",
      },
      {
        id: "cloud-q1",
        label: "February 3 kickoff",
        format: "Virtual • Multi-cloud architecture sessions",
        starts: "2025-02-03",
        focus: "Landing zones & telemetry",
      },
    ],
    spotlightProjects: [
      {
        id: "cloud-telemetry",
        title: "Telemetry architecture",
        description: "Design an observability pipeline covering traces, metrics, and logs with service-level dashboards.",
        outcome: "Unified telemetry blueprint",
      },
      {
        id: "cloud-gameday",
        title: "Reliability game day",
        description: "Run a simulated failure event with cross-team responders and document lessons learned.",
        outcome: "Game day debrief & action backlog",
      },
    ],
    stages: [
      {
        id: "architecture",
        title: "Enterprise Cloud Architecture",
        description: "Design secure and governed multi-cloud foundations.",
        courseIds: ["azure-enterprise-architect", "multi-cloud-networking-strategies"],
        outcomes: [
          "Deliver compliant landing zones and guardrails",
          "Engineer multi-region connectivity and security",
          "Align platform operations with business continuity goals",
        ],
      },
      {
        id: "operations",
        title: "Serverless & Observability Operations",
        description: "Automate serverless delivery with observability-first culture.",
        courseIds: ["serverless-platform-automation", "observability-platform-ops", "cloud-finops-analytics"],
        outcomes: [
          "Implement IaC-driven serverless delivery",
          "Operate observability platforms with SLO dashboards",
          "Run FinOps cadences that influence product decisions",
        ],
      },
    ],
    successMetrics: [
      "Reduced mean time to recovery across key workloads",
      "Automated guardrails for spend, performance, and compliance",
      "Adopted observability scorecards across service teams",
    ],
    capstone: {
      title: "Reliability Operations Runbook",
      description: "Ship a multi-cloud reliability playbook with instrumentation, operations, and cost governance.",
      deliverables: [
        "Telemetry architecture blueprint",
        "Incident response & SLO workflow",
        "FinOps review & governance template",
      ],
    },
  },
  {
    id: "product-design-leadership",
    title: "Product Design Leadership",
    description: "Scale product discovery, content, and design operations that connect craft to outcomes.",
    focus: "Design leadership, operations, and storytelling",
    duration: "6-9 weeks",
    idealFor: ["Design Leads", "Product Designers", "Content Designers"],
    tier: "Pro",
    recommendedCadence: "Weekly studio critique + storytelling showcase",
    badge: {
      id: "badge-design-lead",
      name: "Design Leadership Catalyst",
      icon: "🎨",
    },
    concierge: {
      lead: "Harper Quinn",
      title: "Director of Product Design",
      bio: "Helps design leaders align storytelling, discovery, and operational excellence across orgs.",
      contact: "harper@mlcconcierge.com",
    },
    cohortWindows: [
      {
        id: "design-q3",
        label: "July 29 kickoff",
        format: "Virtual • Storytelling studios",
        starts: "2024-07-29",
        focus: "Narrative-driven stakeholder decks",
      },
      {
        id: "design-q4",
        label: "November 18 kickoff",
        format: "Hybrid • Discovery cafes",
        starts: "2024-11-18",
        focus: "Continuous discovery rituals",
      },
    ],
    spotlightProjects: [
      {
        id: "design-playback",
        title: "Storytelling playback",
        description: "Craft an executive narrative that connects research insights to product investments.",
        outcome: "Narrative deck with action roadmap",
      },
      {
        id: "design-ops",
        title: "Design ops blueprint",
        description: "Define rituals, tooling, and adoption metrics for a high-performing design org.",
        outcome: "Design ops operating manual",
      },
    ],
    stages: [
      {
        id: "discovery",
        title: "Continuous Discovery",
        description: "Run research cadences that feed strategy and roadmaps.",
        courseIds: ["product-discovery-research", "product-analytics-design"],
        outcomes: [
          "Facilitate continuous discovery rituals",
          "Translate analytics into design bets",
          "Map opportunity solution trees for product strategy",
        ],
      },
      {
        id: "operations",
        title: "Design Ops & Leadership",
        description: "Lead teams with systems, rituals, and storytelling.",
        courseIds: ["design-ops-systems", "design-leadership-practices", "ux-writing-strategy"],
        outcomes: [
          "Scale design operations and tooling",
          "Coach teams with outcome-oriented rituals",
          "Evolve voice, tone, and narrative to influence stakeholders",
        ],
      },
    ],
    successMetrics: [
      "Consistent discovery insights informing quarterly plans",
      "Design ops rituals adopted across product teams",
      "Improved activation and retention through content strategy",
    ],
    capstone: {
      title: "Design Leadership Playbook",
      description: "Create a leadership playbook aligning discovery, operations, and storytelling.",
      deliverables: [
        "Discovery cadence framework",
        "Design ops blueprint",
        "Product narrative & storytelling toolkit",
      ],
    },
  },
];
