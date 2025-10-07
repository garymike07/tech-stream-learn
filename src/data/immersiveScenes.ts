export type ImmersiveHotspot = {
  id: string;
  title: string;
  description: string;
  executiveSignal: string;
  assetBudget: {
    drawCalls: number;
    textureMemoryMB: number;
    targetFPS: number;
  };
  conciergeCue: string;
};

export type ImmersiveTimelineCue = {
  id: string;
  label: string;
  stage: "Priming" | "Exploration" | "Synthesis" | "Playback";
  facilitatorCue: string;
  successSignal: string;
};

export type ImmersiveScene = {
  id: string;
  title: string;
  pathId: string;
  courseId: string;
  personaFit: string[];
  summary: string;
  environment: string;
  sensoryLayers: string[];
  anchors: string[];
  hotspots: ImmersiveHotspot[];
  timeline: ImmersiveTimelineCue[];
  aiPrompt: string;
};

export const immersiveScenes: ImmersiveScene[] = [
  {
    id: "frontend-aurora-stage",
    title: "Aurora Command Deck",
    pathId: "frontend-platform-architect",
    courseId: "nextjs-edge-architectures",
    personaFit: ["Experience Platform Leads", "Design System Architects"],
    summary:
      "Immersive performance war-room designed to rehearse executive playback of Core Web Vitals improvements across global regions.",
    environment: "Floating command deck overlooking a volumetric city grid with live traffic overlays.",
    sensoryLayers: ["Edge cache pulse lighting", "Spatialized KPI callouts", "Holographic audit trails"],
    anchors: ["Edge node projections", "Design token lattice", "Latency heatmap canal"],
    hotspots: [
      {
        id: "frontend-hotspot-vitals",
        title: "Vitals Orb Cluster",
        description: "Break down LCP, INP, and TTFB regressions by region with motion scrub overlays.",
        executiveSignal: "Core journeys sustain <200ms interaction budget",
        assetBudget: {
          drawCalls: 420,
          textureMemoryMB: 68,
          targetFPS: 72,
        },
        conciergeCue: "Frame the win: ‘Edge prefetching reclaimed 480ms across the Nairobi checkout flow.’",
      },
      {
        id: "frontend-hotspot-governance",
        title: "Design System Nexus",
        description: "Reveal component adoption heatmaps and governance actions staged for rollout.",
        executiveSignal: "Design system adoption exceeds 80% across squads",
        assetBudget: {
          drawCalls: 280,
          textureMemoryMB: 54,
          targetFPS: 70,
        },
        conciergeCue: "Invite studio collaborators to co-author governance scorecards in real-time.",
      },
      {
        id: "frontend-hotspot-velocity",
        title: "Release Velocity Rail",
        description: "Timeline of platform launches cross-filtered by performance envelopes and stakeholder sentiment.",
        executiveSignal: "Performance guardrails enforced ahead of launch",
        assetBudget: {
          drawCalls: 360,
          textureMemoryMB: 46,
          targetFPS: 75,
        },
        conciergeCue: "Coach spokespersons to narrate a before/after release velocity story in 90 seconds.",
      },
    ],
    timeline: [
      {
        id: "frontend-timeline-prime",
        label: "Prime the executive room",
        stage: "Priming",
        facilitatorCue: "Set ambiance to 'Alert' palette and surface the Nairobi checkout overlay.",
        successSignal: "Audience orients around the primary customer journey risk in <2 minutes.",
      },
      {
        id: "frontend-timeline-explore",
        label: "Runtime heatwalk",
        stage: "Exploration",
        facilitatorCue: "Invite platform engineer to scrub the latency river and narrate mitigations.",
        successSignal: "Leadership observes cross-region impact with quantified deltas.",
      },
      {
        id: "frontend-timeline-synthesize",
        label: "Governance convergence",
        stage: "Synthesis",
        facilitatorCue: "Co-create a governance sprint card and log action items in concierge panel.",
        successSignal: "Next sprint commitments recorded with accountable owners.",
      },
      {
        id: "frontend-timeline-playback",
        label: "Executive playback",
        stage: "Playback",
        facilitatorCue: "Trigger cinematic playback and rehearse 120-second board update.",
        successSignal: "Stakeholders confirm readiness for C-level briefing.",
      },
    ],
    aiPrompt:
      "You are guiding an Aurora Command Deck session to demonstrate how edge streaming unlocked sub-200ms journeys. Outline the executive recap tailored to {persona} with emphasis on customer impact and governance commitments.",
  },
  {
    id: "backend-atlas-bay",
    title: "Atlas Reliability Bay",
    pathId: "backend-platform-strategist",
    courseId: "go-microservices-platforms",
    personaFit: ["Platform Reliability Leads", "Service Owners"],
    summary:
      "Spatial service mesh rendering for choreographing incident retros, error budgets, and resilience narratives.",
    environment: "Subterranean command bay with layered service constellations and fault-line holograms.",
    sensoryLayers: ["Observability waveform ceiling", "Incident archive vault", "Error budget countdown beam"],
    anchors: ["Golden path conduits", "Chaos lab switchboard", "Failover terrain"],
    hotspots: [
      {
        id: "backend-hotspot-slo",
        title: "SLO Horizon",
        description: "Inspect rolling 30-day SLO adherence versus contractual SLAs across regions.",
        executiveSignal: "Four consecutive weeks within target error budget burn.",
        assetBudget: {
          drawCalls: 340,
          textureMemoryMB: 60,
          targetFPS: 70,
        },
        conciergeCue: "Narrate how new redundancy and feature flagging kept error budget intact during peak traffic.",
      },
      {
        id: "backend-hotspot-incidents",
        title: "Incident Concourse",
        description: "Replay last quarter's sev-one incidents with annotated MTTR improvements.",
        executiveSignal: "Median MTTR under 20 minutes with proactive detection stories.",
        assetBudget: {
          drawCalls: 300,
          textureMemoryMB: 45,
          targetFPS: 72,
        },
        conciergeCue: "Assign co-presenters to role-play responder and communicator perspectives.",
      },
      {
        id: "backend-hotspot-roadmap",
        title: "Reliability Roadmap Rails",
        description: "Link platform investment themes to availability uplifts and partner satisfaction.",
        executiveSignal: "Roadmap shows quantified NPS lift for partner teams.",
        assetBudget: {
          drawCalls: 260,
          textureMemoryMB: 52,
          targetFPS: 68,
        },
        conciergeCue: "Capture commitments in shared roadmap cards before closing the session.",
      },
    ],
    timeline: [
      {
        id: "backend-timeline-prime",
        label: "Resilience situational read",
        stage: "Priming",
        facilitatorCue: "Dim error budget beam, spotlight golden path conduit.",
        successSignal: "Leadership aligns on reliability focus area within 3 minutes.",
      },
      {
        id: "backend-timeline-explore",
        label: "SLO timewalk",
        stage: "Exploration",
        facilitatorCue: "Have platform SRE narrate SLO horizon fluctuations with live annotations.",
        successSignal: "All stakeholders can cite current burn rate versus target.",
      },
      {
        id: "backend-timeline-synthesize",
        label: "Incident synthesis",
        stage: "Synthesis",
        facilitatorCue: "Invite responder and comms lead to annotate the incident concourse.",
        successSignal: "Clear downstream actions captured for partner teams.",
      },
      {
        id: "backend-timeline-playback",
        label: "Roadmap alignment",
        stage: "Playback",
        facilitatorCue: "Co-create roadmap card set and capture executive approvals in concierge log.",
        successSignal: "Sponsors agree on investment slate and timeline.",
      },
    ],
    aiPrompt:
      "Host an Atlas Reliability Bay retro that proves error budget health while narrating investment returns. Produce a closing script for {persona} that links resilience work to customer trust.",
  },
  {
    id: "ai-nebula-lounge",
    title: "Nebula Product Lab",
    pathId: "ai-product-leader",
    courseId: "rag-production-patterns",
    personaFit: ["AI Product Leads", "Chief Experience Officers"],
    summary:
      "Immersive AI co-creation studio blending live model telemetry, ethical guardrails, and customer journey sandboxes.",
    environment: "Zero-gravity lounge with suspended data nebulae and responsive light fields.",
    sensoryLayers: ["Sentiment auroras", "Model drift halos", "Ethics circuit tide"],
    anchors: ["Customer holograms", "Guardrail obelisks", "Experiment sandbox"],
    hotspots: [
      {
        id: "ai-hotspot-telemetry",
        title: "Model Telemetry Halo",
        description: "Contrast live precision/recall telemetry with sentiment overlays across cohorts.",
        executiveSignal: "Model performance sustained above agreed confidence thresholds.",
        assetBudget: {
          drawCalls: 380,
          textureMemoryMB: 58,
          targetFPS: 74,
        },
        conciergeCue: "Coach storytellers to translate telemetry shifts into customer impact narratives.",
      },
      {
        id: "ai-hotspot-ethics",
        title: "Ethics Guardians",
        description: "Interactive guardrail board showcasing mitigations, open questions, and reviewer cadence.",
        executiveSignal: "Risk council satisfied with bias mitigation guardrails.",
        assetBudget: {
          drawCalls: 320,
          textureMemoryMB: 42,
          targetFPS: 72,
        },
        conciergeCue: "Invite legal and CX observers to sign off live on escalations.",
      },
      {
        id: "ai-hotspot-prototype",
        title: "Journey Sandbox",
        description: "Prototype walkthrough of AI moments with live persona immersion and toggled intents.",
        executiveSignal: "Product vision anchored to measurable customer outcomes.",
        assetBudget: {
          drawCalls: 300,
          textureMemoryMB: 48,
          targetFPS: 70,
        },
        conciergeCue: "Stage co-creation breakouts for onboarding, retention, and expansion narratives.",
      },
    ],
    timeline: [
      {
        id: "ai-timeline-prime",
        label: "Vision anchoring",
        stage: "Priming",
        facilitatorCue: "Activate customer holograms with sentiment auroras to set stakes.",
        successSignal: "Stakeholders align on north star success metric.",
      },
      {
        id: "ai-timeline-explore",
        label: "Telemetry immersion",
        stage: "Exploration",
        facilitatorCue: "Walk through telemetry halo while product strategist annotates signals.",
        successSignal: "Audience can cite leading and lagging metrics.",
      },
      {
        id: "ai-timeline-synthesize",
        label: "Guardrail council",
        stage: "Synthesis",
        facilitatorCue: "Facilitate ethics guardian review with rapid escalation matrix.",
        successSignal: "Risks assigned owners with review cadence.",
      },
      {
        id: "ai-timeline-playback",
        label: "Launch storyboard",
        stage: "Playback",
        facilitatorCue: "Storyboard launch moments and capture concierge follow-ups.",
        successSignal: "Leadership approves go-to-market rehearsal.",
      },
    ],
    aiPrompt:
      "Design an executive playback inside the Nebula Product Lab showcasing how the AI roadmap advances customer trust. Script call-to-actions for {persona} emphasizing ethical guardrails and measurable outcomes.",
  },
  {
    id: "cloud-horizon-dome",
    title: "Horizon Reliability Dome",
    pathId: "cloud-reliability-lead",
    courseId: "observability-platform-ops",
    personaFit: ["Cloud Platform Leads", "Resilience Architects"],
    summary:
      "Dynamic multi-cloud operations theatre orchestrating failover drills, spend telemetry, and compliance scans.",
    environment: "Panoramic sky dome with layered cloud strata and adaptive weather cues.",
    sensoryLayers: ["Failover jetstream", "Cost prism lattice", "Compliance pulse"],
    anchors: ["Region beacons", "Disaster recovery vault", "Cost optimization runway"],
    hotspots: [
      {
        id: "cloud-hotspot-failover",
        title: "Failover Jetstream",
        description: "Simulate cross-region failovers with timeline scrub and workload impact overlays.",
        executiveSignal: "Critical workloads failover under 90 seconds.",
        assetBudget: {
          drawCalls: 310,
          textureMemoryMB: 51,
          targetFPS: 72,
        },
        conciergeCue: "Assign observers to capture customer comms and compliance notes.",
      },
      {
        id: "cloud-hotspot-cost",
        title: "Cost Prism",
        description: "Visualize spend by environment, map cost levers to reinvestment narratives.",
        executiveSignal: "Cost optimization yields reinvestment budget for innovation.",
        assetBudget: {
          drawCalls: 270,
          textureMemoryMB: 47,
          targetFPS: 70,
        },
        conciergeCue: "Cue finance partner to annotate savings allocation live.",
      },
      {
        id: "cloud-hotspot-compliance",
        title: "Compliance Pulse",
        description: "Interactive compliance sweeps with automated evidence packets and readiness score.",
        executiveSignal: "Quarterly controls verified with zero outstanding actions.",
        assetBudget: {
          drawCalls: 250,
          textureMemoryMB: 40,
          targetFPS: 74,
        },
        conciergeCue: "Log regulator-ready briefing notes in concierge panel before closing.",
      },
    ],
    timeline: [
      {
        id: "cloud-timeline-prime",
        label: "Scenario priming",
        stage: "Priming",
        facilitatorCue: "Project weather overlay representing simulated outage region.",
        successSignal: "Stakeholders grasp outage scenario and objectives.",
      },
      {
        id: "cloud-timeline-explore",
        label: "Failover choreography",
        stage: "Exploration",
        facilitatorCue: "Run failover jetstream playback with SRE narrators.",
        successSignal: "Team confirms failover met target RTO/RPO.",
      },
      {
        id: "cloud-timeline-synthesize",
        label: "Cost prism planning",
        stage: "Synthesis",
        facilitatorCue: "Facilitate finance+platform co-planning for reinvestment.",
        successSignal: "Reinvestment plan documented with owners.",
      },
      {
        id: "cloud-timeline-playback",
        label: "Compliance playback",
        stage: "Playback",
        facilitatorCue: "Generate compliance pulse artifact and route to stakeholders.",
        successSignal: "Evidence packet logged in concierge system.",
      },
    ],
    aiPrompt:
      "Lead a Horizon Reliability Dome session to validate failover readiness and cost posture. Craft the closing note for {persona} balancing resilience, spend, and compliance.",
  },
];

export const MAX_ACTIVE_HOTSPOTS = 3;

export const getImmersiveScene = (sceneId: string) => immersiveScenes.find((scene) => scene.id === sceneId);

export const getSceneHotspots = (sceneId: string) => getImmersiveScene(sceneId)?.hotspots ?? [];

export const getScenesForPath = (pathId: string) => immersiveScenes.filter((scene) => scene.pathId === pathId);
