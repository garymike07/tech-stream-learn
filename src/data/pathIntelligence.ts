export type PathStretchMilestone = {
  id: string;
  label: string;
  description: string;
  targetPercentage: number;
  conciergeCue: string;
};

export type PathExecutiveSignal = {
  label: string;
  metric: string;
  description: string;
};

export type PathConciergeTouchpoint = {
  window: string;
  focus: string;
  outcome: string;
};

export type PathIntelligenceProfile = {
  narrative: string;
  readinessFactors: string[];
  stretchMilestones: PathStretchMilestone[];
  executiveSignals: PathExecutiveSignal[];
  conciergeTouchpoints: PathConciergeTouchpoint[];
  aiPromptTemplate: string;
};

export const pathIntelligenceProfiles: Record<string, PathIntelligenceProfile> = {
  "frontend-platform-architect": {
    narrative:
      "This path elevates platform leaders who can balance cinematic web experiences with reliability, accessibility, and velocity narratives for executives.",
    readinessFactors: [
      "Performance guardrails documented and enforced",
      "Accessibility QA rituals aligned with concierge standards",
      "Design system adoption stories quantified for leadership",
    ],
    stretchMilestones: [
      {
        id: "frontend-foundations",
        label: "Stabilise performance runway",
        description: "Complete architecture and performance stages with Core Web Vitals baselines captured.",
        targetPercentage: 45,
        conciergeCue: "Share initial performance scorecard with concierge mentor for executive framing.",
      },
      {
        id: "frontend-governance",
        label: "Design system governance rehearsal",
        description: "Finish design systems stage and rehearse adoption playbook.",
        targetPercentage: 70,
        conciergeCue: "Schedule governance playback with product and design sponsors.",
      },
      {
        id: "frontend-capstone",
        label: "Experience platform executive preview",
        description: "Deliver capstone blueprint with KPIs tied to business outcomes.",
        targetPercentage: 100,
        conciergeCue: "Book executive playback session with concierge to refine narrative.",
      },
    ],
    executiveSignals: [
      {
        label: "Experience velocity",
        metric: "Prototype-to-production time",
        description: "Showcase how design system governance reduces release friction without sacrificing polish.",
      },
      {
        label: "Performance confidence",
        metric: "Core Web Vitals & latency benchmarks",
        description: "Demonstrate measurable uplifts in critical journey responsiveness.",
      },
    ],
    conciergeTouchpoints: [
      {
        window: "Week 2",
        focus: "Performance baseline review",
        outcome: "Aligned action plan for quick wins and instrumentation gaps.",
      },
      {
        window: "Week 5",
        focus: "Design system adoption clinic",
        outcome: "Shared governance toolkit with adoption scorecards.",
      },
      {
        window: "Week 8",
        focus: "Executive playback rehearsal",
        outcome: "Refined storytelling ready for leadership cadence.",
      },
    ],
    aiPromptTemplate:
      "Draft a progress memo for the Frontend Platform council summarising how {pathTitle} is tracking at {percentage}% completion with {nextMilestone} as the next milestone.",
  },
  "backend-platform-strategist": {
    narrative:
      "Learners mature multi-runtime service platforms with SLO governance, deployment automation, and incident storytelling executives trust.",
    readinessFactors: [
      "Baseline SLOs defined and reviewed",
      "Service templates adopted by at least two teams",
      "Incident response rehearsed with measurable recovery improvements",
    ],
    stretchMilestones: [
      {
        id: "backend-slo",
        label: "Error budget calibration",
        description: "Complete API delivery stage and run first SLO health review.",
        targetPercentage: 40,
        conciergeCue: "Host concierge diagnostic to align KPIs with finance and product leads.",
      },
      {
        id: "backend-automation",
        label: "Progressive delivery rollout",
        description: "Finish microservices stage with automated resiliency tests in place.",
        targetPercentage: 75,
        conciergeCue: "Book release governance workshop with concierge mentor.",
      },
      {
        id: "backend-blueprint",
        label: "Service platform executive readout",
        description: "Publish capstone blueprint linking platform maturity to business impact.",
        targetPercentage: 100,
        conciergeCue: "Schedule executive readout dry-run with concierge partner.",
      },
    ],
    executiveSignals: [
      {
        label: "Reliability economics",
        metric: "Deployment success & MTTx trends",
        description: "Quantify how automation reduces incident cost and accelerates delivery.",
      },
      {
        label: "Governance confidence",
        metric: "SLO coverage & adoption",
        description: "Demonstrate progress on SLO rollout across flagship services.",
      },
    ],
    conciergeTouchpoints: [
      {
        window: "Week 2",
        focus: "Service template audit",
        outcome: "Template gap analysis with concierge playbook.",
      },
      {
        window: "Week 6",
        focus: "SLO storytelling clinic",
        outcome: "Executive-ready SLO dashboard narrative.",
      },
      {
        window: "Week 10",
        focus: "Incident rehearsal debrief",
        outcome: "Documented improvement backlog with ownership assignments.",
      },
    ],
    aiPromptTemplate:
      "Compose an operations council update showing how {pathTitle} progression at {percentage}% is de-risking platform reliability ahead of the {nextMilestone} milestone.",
  },
  "ai-product-leader": {
    narrative:
      "Participants orchestrate responsible AI launches, balancing experimentation velocity with governance narratives for boards and regulators.",
    readinessFactors: [
      "Evaluation coverage logged across priority scenarios",
      "Governance charter drafted with cross-functional input",
      "Customer feedback loops wired into AI iteration cadence",
    ],
    stretchMilestones: [
      {
        id: "ai-evaluation",
        label: "Evaluation harness pilot",
        description: "Complete LLM systems stage and publish evaluation metrics.",
        targetPercentage: 50,
        conciergeCue: "Review evaluation scorecard with responsible AI concierge mentor.",
      },
      {
        id: "ai-governance",
        label: "Governance charter dry-run",
        description: "Finish production delivery stage with governance rituals rehearsed.",
        targetPercentage: 80,
        conciergeCue: "Schedule compliance alignment session with concierge.",
      },
      {
        id: "ai-launch",
        label: "Responsible launch greenlight",
        description: "Deliver capstone launch plan with executive sign-off pathway.",
        targetPercentage: 100,
        conciergeCue: "Host executive playback to secure launch approval.",
      },
    ],
    executiveSignals: [
      {
        label: "Alignment confidence",
        metric: "Eval coverage & incident readiness",
        description: "Communicate how evaluation rigor protects outcomes and reputation.",
      },
      {
        label: "Launch readiness",
        metric: "Governance checklist completion",
        description: "Show decision-makers the path to compliant, confident launch.",
      },
    ],
    conciergeTouchpoints: [
      {
        window: "Week 1",
        focus: "Use case alignment",
        outcome: "Clarity on business impact and ethical guardrails.",
      },
      {
        window: "Week 4",
        focus: "Evaluation clinic",
        outcome: "Instrumented dashboards ready for leadership review.",
      },
      {
        window: "Week 7",
        focus: "Compliance rehearsal",
        outcome: "Stakeholder-ready governance narrative.",
      },
    ],
    aiPromptTemplate:
      "Write a responsible AI council brief capturing {pathTitle} progress at {percentage}% and outlining the plan to hit {nextMilestone} without regulatory friction.",
  },
  "cloud-reliability-lead": {
    narrative:
      "Learners lead multi-cloud programmes that blend reliability, FinOps stewardship, and incident simulations for executive assurance.",
    readinessFactors: [
      "Landing zones codified with compliance controls",
      "Telemetry pipelines unified across workloads",
      "FinOps scorecard trending towards runway preservation goals",
    ],
    stretchMilestones: [
      {
        id: "cloud-foundation",
        label: "Landing zone readiness",
        description: "Complete architecture stage and document guardrails.",
        targetPercentage: 40,
        conciergeCue: "Run guardrail review with concierge mentor and security lead.",
      },
      {
        id: "cloud-operations",
        label: "Telemetry orchestration",
        description: "Finish operations stage with observability scorecard in flight.",
        targetPercentage: 72,
        conciergeCue: "Host telemetry deep dive with concierge and SRE peers.",
      },
      {
        id: "cloud-gameday",
        label: "Reliability game day showcase",
        description: "Deliver capstone runbook with failover rehearsal outcomes.",
        targetPercentage: 100,
        conciergeCue: "Present resilience narrative to leadership council.",
      },
    ],
    executiveSignals: [
      {
        label: "Runway efficiency",
        metric: "Cloud spend variance vs. target",
        description: "Highlight FinOps wins funding new initiatives.",
      },
      {
        label: "Resilience maturity",
        metric: "Failover rehearsal adherence",
        description: "Show readiness to absorb incidents without customer impact.",
      },
    ],
    conciergeTouchpoints: [
      {
        window: "Week 2",
        focus: "Controls alignment",
        outcome: "Unified policy-as-code backlog.",
      },
      {
        window: "Week 5",
        focus: "Telemetry and FinOps sync",
        outcome: "Scorecard instrumentation plan with finance insights.",
      },
      {
        window: "Week 9",
        focus: "Game day rehearsal",
        outcome: "Ready-made narrative for executive war room.",
      },
    ],
    aiPromptTemplate:
      "Summarise for the reliability council how {pathTitle} at {percentage}% completion is improving {nextMilestone} outcomes while preserving runway.",
  },
  "product-design-leadership": {
    narrative:
      "Design leaders evolve discovery, storytelling, and operations rituals that translate craft into executive-level outcomes.",
    readinessFactors: [
      "Discovery playbooks informing quarterly plans",
      "Design ops rituals with adoption metrics",
      "Storytelling frameworks tied to business KPIs",
    ],
    stretchMilestones: [
      {
        id: "design-discovery",
        label: "Discovery operating rhythm",
        description: "Complete discovery stage with research cadence in place.",
        targetPercentage: 38,
        conciergeCue: "Share discovery insights digest with concierge mentor for executive positioning.",
      },
      {
        id: "design-ops",
        label: "Design ops governance",
        description: "Finish operations stage with tooling and rituals enabled.",
        targetPercentage: 68,
        conciergeCue: "Host design ops office hours with concierge to refine adoption messaging.",
      },
      {
        id: "design-playbook",
        label: "Leadership playbook premiere",
        description: "Deliver capstone demonstrating narrative-driven influence.",
        targetPercentage: 100,
        conciergeCue: "Schedule executive storytelling showcase with concierge feedback.",
      },
    ],
    executiveSignals: [
      {
        label: "Discovery influence",
        metric: "Insights adopted into roadmap",
        description: "Connect discovery rituals to funded initiatives.",
      },
      {
        label: "Design ops leverage",
        metric: "Operational KPI uplift",
        description: "Show efficiency gains from rituals and tooling adoption.",
      },
    ],
    conciergeTouchpoints: [
      {
        window: "Week 1",
        focus: "Narrative intent setting",
        outcome: "Clarity on leadership story arc for the path.",
      },
      {
        window: "Week 4",
        focus: "Operation metrics sprint",
        outcome: "Shared dashboard of design ops adoption signals.",
      },
      {
        window: "Week 7",
        focus: "Executive playback coaching",
        outcome: "Tailored storytelling assets for stakeholder presentations.",
      },
    ],
    aiPromptTemplate:
      "Create a design leadership update highlighting {pathTitle} progress at {percentage}% and detailing steps to unlock {nextMilestone} with cross-functional partners.",
  },
};

export const getPathIntelligenceProfile = (pathId: string) => pathIntelligenceProfiles[pathId];
