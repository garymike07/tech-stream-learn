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
  badge: {
    id: string;
    name: string;
    icon: string;
  };
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
    badge: {
      id: "badge-frontend-platform",
      name: "Frontend Platform Architect",
      icon: "🛠️",
    },
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
    badge: {
      id: "badge-backend-platform",
      name: "Backend Platform Strategist",
      icon: "🔗",
    },
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
    badge: {
      id: "badge-ai-product",
      name: "AI Product Leader",
      icon: "🤖",
    },
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
    badge: {
      id: "badge-cloud-reliability",
      name: "Cloud Reliability Lead",
      icon: "☁️",
    },
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
    badge: {
      id: "badge-design-lead",
      name: "Design Leadership Catalyst",
      icon: "🎨",
    },
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
