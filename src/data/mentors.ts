export type MentorTier = "pro" | "elite";

export type MentorScenario = {
  id: string;
  label: string;
  description: string;
  sentiment: "accelerate" | "stabilize" | "celebrate";
  prompt: string;
  recommendedFor: string[];
};

export type MentorPersona = {
  id: string;
  name: string;
  title: string;
  tagline: string;
  tierAccess: MentorTier[];
  tone: "strategic" | "empathetic" | "direct" | "visionary";
  bio: string;
  specialties: string[];
  languages: string[];
  avatarInitials: string;
  signatureMoves: string[];
  scenarioPresets: MentorScenario[];
};

export const mentorPersonas: MentorPersona[] = [
  {
    id: "visionary-architect",
    name: "Amelia Kendi",
    title: "Principal Product Architect",
    tagline: "Scales product ecosystems from v1 concept to billion-user launch.",
    tierAccess: ["pro", "elite"],
    tone: "strategic",
    bio: "Former VP of Product at three unicorns, Amelia now mentors cross-functional leaders on orchestrating moonshot roadmaps without losing craft.",
    specialties: [
      "North-star storytelling",
      "Multi-quarter roadmap synthesis",
      "C-suite stakeholder alignment",
    ],
    languages: ["English", "French"],
    avatarInitials: "AK",
    signatureMoves: [
      "Pressure-tests visions against success metrics",
      "Turns qualitative research into executive punchlines",
      "Builds weekly operating cadences for hybrid squads",
    ],
    scenarioPresets: [
      {
        id: "roadmap-clash",
        label: "Roadmap conflict reset",
        description: "Untangle competing priorities and exit with a single narrative your execs will endorse.",
        sentiment: "stabilize",
        prompt: "Help me resolve a roadmap conflict between platform refactors and an enterprise launch. I need a story that earns executive confidence within 48 hours.",
        recommendedFor: ["Product directors", "Heads of platform"],
      },
      {
        id: "vision-sync",
        label: "Vision sync dry-run",
        description: "Craft a three-slide north star story that resonates with both builders and the board.",
        sentiment: "accelerate",
        prompt: "I am preparing a north-star review with the board. Outline the three slide story that balances ambition with believable velocity.",
        recommendedFor: ["Early-stage founders", "Product leads"]
      },
      {
        id: "exec-debrief",
        label: "Executive debrief coach",
        description: "Refine the post-mortem storyline after a partial launch miss without eroding trust.",
        sentiment: "celebrate",
        prompt: "Our beta missed revenue goals but crushed engagement. How do I brief executives so we keep runway for the next iteration?",
        recommendedFor: ["Product marketing", "Chief of staff"],
      },
    ],
  },
  {
    id: "ml-ops-maestro",
    name: "Ravi Patel",
    title: "MLOps Program Director",
    tagline: "Turns fragile experiments into responsible AI platforms with executive guardrails.",
    tierAccess: ["pro", "elite"],
    tone: "direct",
    bio: "Ravi previously led Applied AI at a global telco and now coaches teams on scaling evaluation pipelines, regulatory alignment, and platform governance.",
    specialties: [
      "Eval harness design",
      "Responsible AI compliance",
      "Cross-functional incident response",
    ],
    languages: ["English", "Hindi"],
    avatarInitials: "RP",
    signatureMoves: [
      "Exposes blind spots in model lifecycle plans",
      "Designs KPI stacks that balance velocity and safety",
      "Builds operating playbooks for red-team drills",
    ],
    scenarioPresets: [
      {
        id: "eval-upgrade",
        label: "Evaluation redesign",
        description: "Rebuild your evaluation rubric so legal, product, and science teams all trust the signal.",
        sentiment: "accelerate",
        prompt: "We are shipping a GenAI assistant. Help me craft a cross-functional evaluation plan that nails alignment, safety, and latency KPIs.",
        recommendedFor: ["Applied AI leads", "QA engineering"],
      },
      {
        id: "incident-posture",
        label: "Incident posture drill",
        description: "Pressure-test how you will respond when a model misbehaves in production.",
        sentiment: "stabilize",
        prompt: "Design an incident response rehearsal for hallucinated outputs so compliance, comms, and engineering know their first three moves.",
        recommendedFor: ["SRE", "AI program managers"],
      },
      {
        id: "roadmap-trim",
        label: "Trim the model roadmap",
        description: "Prioritize the highest business leverage experiments without derailing quarterly OKRs.",
        sentiment: "celebrate",
        prompt: "We have 11 AI experiments. Which two should we ship this quarter to show unmistakable business impact?",
        recommendedFor: ["Founders", "AI product managers"],
      },
    ],
  },
  {
    id: "experience-alchemist",
    name: "Noor Atieno",
    title: "Director of Service Design",
    tagline: "Architects hospitality-grade customer journeys for fintech and luxury retail.",
    tierAccess: ["elite"],
    tone: "empathetic",
    bio: "Noor helps growth-stage startups operationalize concierge-grade service rituals while keeping NPS and profitability balanced.",
    specialties: [
      "End-to-end journey orchestration",
      "Frontline enablement",
      "Experience analytics",
    ],
    languages: ["English", "Swahili"],
    avatarInitials: "NA",
    signatureMoves: [
      "Maps emotion curves to backstage playbooks",
      "Designs concierge rituals that scale gracefully",
      "Reframes ops debt into experience experiments",
    ],
    scenarioPresets: [
      {
        id: "concierge-launch",
        label: "Concierge launch game plan",
        description: "Stand up a seven-day white glove pilot with clear backstage rituals and KPIs.",
        sentiment: "accelerate",
        prompt: "We are rolling out an elite concierge tier. Guide me through the first-week service choreography and backstage checklist.",
        recommendedFor: ["Customer experience", "Elite success leads"],
      },
      {
        id: "journey-diagnostics",
        label: "Journey diagnostics",
        description: "Pinpoint where the luxury promise breaks and how to repair it fast.",
        sentiment: "stabilize",
        prompt: "Our onboarding feels premium, but renewals dip. Help me diagnose the sentiment cliff and prescribe win-back rituals.",
        recommendedFor: ["Service designers", "Retention PMs"],
      },
      {
        id: "celebration-story",
        label: "Celebrate the wins",
        description: "Craft a moment of delight after a milestone delivery without ballooning costs.",
        sentiment: "celebrate",
        prompt: "A flagship client hit their revenue target. How do we celebrate the team and the client with a luxury touch within $500?",
        recommendedFor: ["Account managers", "Operations"],
      },
    ],
  },
  {
    id: "growth-strategist",
    name: "Liam Chen",
    title: "Revenue Operations Partner",
    tagline: "Activates compounding growth loops across demand gen, sales, and product-led motions.",
    tierAccess: ["pro", "elite"],
    tone: "visionary",
    bio: "Previously led GTM strategy at a leading SaaS unicorn, Liam now supports founders and RevOps leads in building data-informed growth engines.",
    specialties: [
      "Revenue diagnostics",
      "Pricing experiments",
      "Lifecycle storytelling",
    ],
    languages: ["English", "Mandarin"],
    avatarInitials: "LC",
    signatureMoves: [
      "Designs weekly growth rooms with crystal KPIs",
      "Codifies customer signals into tiered playbooks",
      "Aligns product, marketing, and sales cadences",
    ],
    scenarioPresets: [
      {
        id: "growth-audit",
        label: "Growth audit",
        description: "Diagnose where pipeline is stalling and prescribe quick-turn experiments.",
        sentiment: "stabilize",
        prompt: "Our pipelines are leaking between demo and proposal. Coach me on a 14-day fix that unblocks conversion.",
        recommendedFor: ["RevOps", "Founders"],
      },
      {
        id: "pricing-lab",
        label: "Pricing lab",
        description: "Test a new luxury pricing tier while protecting core revenue.",
        sentiment: "accelerate",
        prompt: "We want to introduce a premium concierge add-on. Give me a pricing experiment plan and messaging angle for existing customers.",
        recommendedFor: ["Product marketing", "Revenue leads"],
      },
      {
        id: "celebrate-renewal",
        label: "Renewal celebration",
        description: "Design thank-you rituals that compound future expansion.",
        sentiment: "celebrate",
        prompt: "A strategic account renewed early. Suggest three gestures that feel bespoke yet are operationally lightweight.",
        recommendedFor: ["Customer success", "Sales"],
      },
    ],
  },
];

export const mentorPersonaMap = new Map(mentorPersonas.map((persona) => [persona.id, persona] as const));
