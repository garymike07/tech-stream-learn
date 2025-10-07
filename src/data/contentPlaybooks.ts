export type ContentPlaybook = {
  executiveSummary: string;
  signalNarrative: string;
  spotlightMetric: {
    label: string;
    description: string;
  };
  signatureMoments: string[];
  recommendedAllies: Array<{
    category: string;
    label: string;
    description: string;
  }>;
  assessmentBlueprint: {
    cadence: string;
    rituals: string[];
    successMetric: string;
  };
  aiConciergePrompt: string;
};

export const contentPlaybooks: Record<string, ContentPlaybook> = {
  frontend: {
    executiveSummary: "Elevate customer-facing surfaces with cinematic polish, resilient design systems, and performance budgets that delight premium clients.",
    signalNarrative: "This track blends interaction choreography with accessibility governance so interfaces feel couture and scale flawlessly.",
    spotlightMetric: {
      label: "Pixel-to-production velocity",
      description: "Time from prototype approval to live experience without quality regressions.",
    },
    signatureMoments: [
      "Translate luxury brand narratives into responsive design tokens",
      "Stand up accessibility QA rituals that pre-empt executive escalations",
      "Instrument Core Web Vitals dashboards for concierge surfaces",
    ],
    recommendedAllies: [
      {
        category: "product-design",
        label: "Design systems atelier",
        description: "Pair with product design to unify narrative, motion, and copy standards before rollout.",
      },
      {
        category: "backend",
        label: "Edge rendering partnerships",
        description: "Coordinate with backend teams to ship streaming and personalization without latency drift.",
      },
    ],
    assessmentBlueprint: {
      cadence: "Bi-weekly executive showcase",
      rituals: [
        "Accessibility regression sweeps scored by concierge QA squad",
        "Motion and microcopy alignment review against brand lexicon",
        "Performance budget sign-off with observability dashboards",
      ],
      successMetric: "90%+ of critical flows ship with sub-1s interaction latency and AAA accessibility coverage.",
    },
    aiConciergePrompt:
      "Draft a board-ready creative review for {course} emphasising how we balanced cinematic UI, accessibility governance, and performance budgets.",
  },
  backend: {
    executiveSummary: "Engineer fault-tolerant platforms with auditable services, concierge SLAs, and observability that reassures the board.",
    signalNarrative: "Learners practice orchestrating revenue-critical services with zero-downtime deploys and financial guardrails.",
    spotlightMetric: {
      label: "Five-nines readiness index",
      description: "Composite score across latency, failover rehearsal, and compliance evidence.",
    },
    signatureMoments: [
      "Design gold-path APIs with upgrade contracts and sunset playbooks",
      "Stand up chaos drills that prove resilience narratives to executives",
      "Quantify cost-to-serve improvements after platform refactors",
    ],
    recommendedAllies: [
      {
        category: "devops-sre",
        label: "Reliability control tower",
        description: "Sync with SRE to share runbooks, telemetry, and incident choreography.",
      },
      {
        category: "data-science",
        label: "Analytics instrumentation",
        description: "Partner with data science to expose real-time KPIs for premium dashboards.",
      },
    ],
    assessmentBlueprint: {
      cadence: "Monthly resilience audit",
      rituals: [
        "Chaos experiment report with executive briefing deck",
        "Cost optimisation ledger reviewed with finance",
        "PII and compliance checklist attested by security",
      ],
      successMetric: "All tier-one services sustain 99.99% uptime with documented failover evidence.",
    },
    aiConciergePrompt:
      "Summarise {course} for a CFO, highlighting risk reduction, compliance posture, and cost-to-serve deltas in plain language.",
  },
  cloud: {
    executiveSummary: "Operationalise multi-cloud runway with FinOps discipline, region-aware scaling, and disaster scenarios rehearsed end-to-end.",
    signalNarrative: "The syllabus moves from architecture choreography to operational storytelling for executive confidence.",
    spotlightMetric: {
      label: "Runway preservation delta",
      description: "Savings unlocked through reserved capacity, autoscaling, and observability hygiene.",
    },
    signatureMoments: [
      "Design landing zones governed by policy-as-code",
      "Simulate region failover with customer communication scripts",
      "Quantify spend reductions while preserving performance SLAs",
    ],
    recommendedAllies: [
      {
        category: "devops-sre",
        label: "Incident propagation drills",
        description: "Work with SRE to script degraded-mode playbooks and escalation maps.",
      },
      {
        category: "ai-engineering",
        label: "GPU orchestration",
        description: "Align with AI engineering on capacity planning for model training pipelines.",
      },
    ],
    assessmentBlueprint: {
      cadence: "Quarterly runway review",
      rituals: [
        "FinOps scorecard with variance explanations",
        "Capacity planning workshop for strategic workloads",
        "Business-continuity tabletop with exec Q&A",
      ],
      successMetric: "Cloud spend variance stays within ±5% while SLAs hold during failover tests.",
    },
    aiConciergePrompt:
      "Compose a scenario brief on how {course} hardens our multi-cloud estate while funding new growth bets through FinOps wins.",
  },
  "data-science": {
    executiveSummary: "Deliver trustworthy insights with reproducible pipelines, executive-ready storytelling, and governance woven into every experiment.",
    signalNarrative: "Learners balance experimental velocity with audit trails that withstand regulatory scrutiny.",
    spotlightMetric: {
      label: "Insight-to-action cadence",
      description: "Speed at which validated models or dashboards influence executive decisions.",
    },
    signatureMoments: [
      "Stand up feature stores and documentation that survive leadership turnover",
      "Translate model performance into commercial narratives",
      "Design evaluation dashboards that highlight ethical guardrails",
    ],
    recommendedAllies: [
      {
        category: "ai-engineering",
        label: "Model lifecycle guild",
        description: "Coordinate on evaluation harnesses and deployment guardrails.",
      },
      {
        category: "product-design",
        label: "Data storytelling studio",
        description: "Pair with design to craft visual narratives for executive audiences.",
      },
    ],
    assessmentBlueprint: {
      cadence: "Sprint-close executive review",
      rituals: [
        "Model card updates with compliance annotations",
        "Business narrative memo translating insights to action",
        "Bias and ethics checklist signed by governance lead",
      ],
      successMetric: "80% of shipped models include decision memos adopted by business sponsors.",
    },
    aiConciergePrompt:
      "Outline how {course} upgrades our analytics program by uniting trustworthy data pipelines with executive storytelling.",
  },
  databases: {
    executiveSummary: "Curate resilient data estates with zero-trust access, tunable performance, and archival strategies executive teams can audit.",
    signalNarrative: "From schema craftsmanship to compliance evidence, the playbook positions databases as strategic assets.",
    spotlightMetric: {
      label: "Query-to-insight efficiency",
      description: "Lag between data ingestion and stakeholder-ready reporting.",
    },
    signatureMoments: [
      "Architect sharded and replicated clusters with failover SLAs",
      "Instrument data lineage narrating every executive-critical metric",
      "Design lifecycle policies balancing performance and cost",
    ],
    recommendedAllies: [
      {
        category: "cloud",
        label: "Storage governance council",
        description: "Align backup, archival, and encryption standards across clouds.",
      },
      {
        category: "cybersecurity",
        label: "Zero-trust taskforce",
        description: "Co-design access policies and audit evidence for regulators.",
      },
    ],
    assessmentBlueprint: {
      cadence: "Monthly data estate walkthrough",
      rituals: [
        "Restore drill with recovery time benchmarking",
        "Data lineage evidence pack for auditors",
        "Performance regression review with capacity plan",
      ],
      successMetric: "Recovery objectives achieved in rehearsal with zero critical access violations detected.",
    },
    aiConciergePrompt:
      "Prepare an executive micro-brief on how {course} modernises our data estate without compromising compliance.",
  },
  apis: {
    executiveSummary: "Design API products with monetisation hooks, lifecycle governance, and partner delight at concierge latency targets.",
    signalNarrative: "Participants evolve APIs from endpoints to premium products with SLAs and reporting.",
    spotlightMetric: {
      label: "Partner adoption momentum",
      description: "Growth in revenue or usage from strategic partners consuming tiered APIs.",
    },
    signatureMoments: [
      "Map gold, silver, bronze API tiers with clear guardrails",
      "Instrument usage telemetry that feeds executive dashboards",
      "Design deprecation journeys that preserve trust",
    ],
    recommendedAllies: [
      {
        category: "backend",
        label: "Service contract guild",
        description: "Align API schemas with backend change-management rituals.",
      },
      {
        category: "product-design",
        label: "Developer experience studio",
        description: "Co-create documentation and sandbox experiences that feel luxurious.",
      },
    ],
    assessmentBlueprint: {
      cadence: "Quarterly partner council",
      rituals: [
        "API scorecard with latency, error rate, and adoption trends",
        "Partner feedback synthesis with action plan",
        "Contract change log reviewed with legal",
      ],
      successMetric: "Top-tier partners maintain NPS > 60 with zero surprise breaking changes.",
    },
    aiConciergePrompt:
      "Summarise {course} as a go-to-market enablement story for executives evaluating our API platform expansion.",
  },
  "ai-engineering": {
    executiveSummary: "Operationalise responsible AI with evaluation harnesses, human-in-the-loop governance, and metrics investors trust.",
    signalNarrative: "Learners orchestrate experimentation, deployment, and ethical guardrails without slowing momentum.",
    spotlightMetric: {
      label: "Alignment confidence index",
      description: "Blend of eval coverage, incident response readiness, and stakeholder trust.",
    },
    signatureMoments: [
      "Design alignment scorecards translating evals for executives",
      "Automate guardrail testing across data drift scenarios",
      "Facilitate post-incident debriefs that harden governance",
    ],
    recommendedAllies: [
      {
        category: "cybersecurity",
        label: "Red-team coalition",
        description: "Partner on adversarial testing and incident playbooks for AI misuse.",
      },
      {
        category: "product-design",
        label: "Responsible UX lab",
        description: "Design transparent controls and consent journeys for AI features.",
      },
    ],
    assessmentBlueprint: {
      cadence: "Evaluation council sync",
      rituals: [
        "Model eval report with sentiment analysis",
        "Alignment debt backlog triaged with product leads",
        "Responsible AI briefing for legal and comms",
      ],
      successMetric: "No high-severity alignment incidents and eval coverage exceeding 85% on priority scenarios.",
    },
    aiConciergePrompt:
      "Draft a governance update describing how {course} matures our AI programme with measurable safeguards and velocity.",
  },
  cybersecurity: {
    executiveSummary: "Curate zero-trust blueprints, breach rehearsal cadences, and boardroom-ready risk narratives that protect luxury brands.",
    signalNarrative: "The curriculum blends threat intel, tabletop simulations, and stakeholder communication mastery.",
    spotlightMetric: {
      label: "Mean-time-to-confidence",
      description: "Duration to confirm incident containment with executives and regulators.",
    },
    signatureMoments: [
      "Design layered access policies tuned for high-net-worth clients",
      "Run breach simulations complete with PR and legal choreography",
      "Quantify risk posture shifts in language boards understand",
    ],
    recommendedAllies: [
      {
        category: "devops-sre",
        label: "Incident fusion cell",
        description: "Align playbooks and telemetry for unified response beneath executive war room.",
      },
      {
        category: "cloud",
        label: "Compliance observatory",
        description: "Co-manage policy-as-code and audit artefacts across regions.",
      },
    ],
    assessmentBlueprint: {
      cadence: "Quarterly executive war game",
      rituals: [
        "Red/blue team exercise with cost-of-delay metrics",
        "Regulatory reporting dry run",
        "Zero-trust maturity score recalibration",
      ],
      successMetric: "Executive confidence index above 90% with rehearsed crisis comms playbooks.",
    },
    aiConciergePrompt:
      "Prepare a crisis-communications script explaining how {course} fortifies our security posture for premium clientele.",
  },
  "devops-sre": {
    executiveSummary: "Deliver concierge reliability with progressive delivery, golden signals instrumentation, and business-aligned postmortems.",
    signalNarrative: "Learners orchestrate change velocity and stability conversations with executives and squads alike.",
    spotlightMetric: {
      label: "Change enablement ratio",
      description: "Balance of deploy frequency, failure rate, and recovery speed across flagship services.",
    },
    signatureMoments: [
      "Calibrate SLOs tied to commercial commitments",
      "Automate release gates with feature flag guardrails",
      "Executive-ready postmortems focusing on investment narratives",
    ],
    recommendedAllies: [
      {
        category: "backend",
        label: "Platform operations guild",
        description: "Share runbooks and instrumentation patterns that keep services resilient.",
      },
      {
        category: "cloud",
        label: "Capacity stewardship council",
        description: "Align scaling strategies with spend governance and performance.",
      },
    ],
    assessmentBlueprint: {
      cadence: "Monthly reliability business review",
      rituals: [
        "Error budget burn narrative with mitigation plan",
        "Executive postmortem readout tied to customer impact",
        "Progressive delivery analytics with experimentation ROI",
      ],
      successMetric: "Error budgets stay within guardrails while deploy frequency increases quarter over quarter.",
    },
    aiConciergePrompt:
      "Compose an executive update showcasing how {course} sharpens our reliability economics and change velocity.",
  },
  mobile: {
    executiveSummary: "Ship flagship mobile experiences with concierge onboarding, continuous instrumentation, and app store choreography.",
    signalNarrative: "The journey blends offline-first engineering with brand-consistent delight and rigorous QA.",
    spotlightMetric: {
      label: "Activation elegance score",
      description: "Blend of load time, retention, and VIP feedback for mobile touchpoints.",
    },
    signatureMoments: [
      "Engineer motion and haptics that feel bespoke across devices",
      "Instrument crash-free sessions with executive dashboards",
      "Design release trains that pair with marketing and concierge operations",
    ],
    recommendedAllies: [
      {
        category: "frontend",
        label: "Unified experience squad",
        description: "Ensure mobile and web surfaces share narrative, tokens, and interactions.",
      },
      {
        category: "product-design",
        label: "Premium journey lab",
        description: "Prototype concierge flows and accessibility rituals together.",
      },
    ],
    assessmentBlueprint: {
      cadence: "Release train health review",
      rituals: [
        "App store readiness checklist",
        "Crash regression triage with SLO impact",
        "VIP usability debrief with concierge feedback",
      ],
      successMetric: "Crash-free sessions exceed 99.5% while VIP retention grows quarter over quarter.",
    },
    aiConciergePrompt:
      "Write a concierge launch memo describing how {course} refines our flagship mobile journey for elite members.",
  },
  "product-design": {
    executiveSummary: "Craft visionary journeys with service blueprints, narrative design, and executive playback rituals that secure investment.",
    signalNarrative: "Learners connect qualitative insight to board-level storytelling and measurable experience shifts.",
    spotlightMetric: {
      label: "Experience equity index",
      description: "Correlation between design investments and loyalty or revenue signals.",
    },
    signatureMoments: [
      "Facilitate executive design reviews anchored in business outcomes",
      "Prototype concierge rituals that scale across global markets",
      "Stand up qualitative research libraries with storytelling assets",
    ],
    recommendedAllies: [
      {
        category: "frontend",
        label: "Design system partners",
        description: "Align component libraries with narrative and accessibility promises.",
      },
      {
        category: "ai-engineering",
        label: "Responsible personalization squad",
        description: "Co-create transparent AI-assisted experiences with ethical guardrails.",
      },
    ],
    assessmentBlueprint: {
      cadence: "Monthly experience business review",
      rituals: [
        "Journey analytics readout tied to customer sentiment",
        "Prototype gallery with executive storytelling",
        "Accessibility and inclusivity pulse check",
      ],
      successMetric: "Experience equity index improves while maintaining global accessibility compliance.",
    },
    aiConciergePrompt:
      "Draft an executive playback for {course} highlighting design-led growth levers and concierge rituals we can monetise.",
  },
};

export const getContentPlaybook = (category: string) => contentPlaybooks[category];
