export type LeaderboardTrend = "up" | "steady" | "down";

export type CommunityLeaderboardEntry = {
  id: string;
  name: string;
  role: string;
  tier: "Free" | "Pro" | "Elite";
  score: number;
  delta: number;
  trend: LeaderboardTrend;
};

export type CommunityLeaderboard = {
  id: string;
  label: string;
  metric: string;
  unit?: string;
  entries: CommunityLeaderboardEntry[];
};

export type CommunitySpotlight = {
  id: string;
  title: string;
  summary: string;
  metricLabel: string;
  metricValue: string;
  delta: string;
  narrative: string;
};

export type CommunityQuest = {
  id: string;
  title: string;
  description: string;
  reward: string;
  progress: number;
  target: number;
};

export type ExecutiveShoutout = {
  id: string;
  persona: string;
  statement: string;
  focus: string;
};

export const communityLeaderboards: CommunityLeaderboard[] = [
  {
    id: "velocity",
    label: "Velocity momentum",
    metric: "Lessons this week",
    entries: [
      { id: "leader-zara", name: "Zara M.", role: "AI Product Lead", tier: "Elite", score: 18, delta: 4, trend: "up" },
      { id: "leader-noah", name: "Noah K.", role: "Frontend Architect", tier: "Pro", score: 15, delta: 2, trend: "up" },
      { id: "leader-anaya", name: "Anaya P.", role: "Cloud Reliability Lead", tier: "Elite", score: 13, delta: 1, trend: "steady" },
      { id: "leader-tai", name: "Tai W.", role: "Backend Strategist", tier: "Pro", score: 11, delta: -1, trend: "down" },
      { id: "leader-leila", name: "Leila R.", role: "Product Designer", tier: "Free", score: 9, delta: 2, trend: "up" },
    ],
  },
  {
    id: "streaks",
    label: "Streak keepers",
    metric: "Active days",
    entries: [
      { id: "streak-sena", name: "Sena O.", role: "AI Staff Engineer", tier: "Elite", score: 42, delta: 5, trend: "up" },
      { id: "streak-david", name: "David P.", role: "DevOps Lead", tier: "Pro", score: 31, delta: 0, trend: "steady" },
      { id: "streak-ines", name: "Ines T.", role: "Frontend Tech Lead", tier: "Pro", score: 27, delta: -2, trend: "down" },
      { id: "streak-raj", name: "Raj K.", role: "Platform Architect", tier: "Elite", score: 25, delta: 1, trend: "up" },
      { id: "streak-kai", name: "Kai A.", role: "Mobile Staff Engineer", tier: "Free", score: 22, delta: 3, trend: "up" },
    ],
  },
  {
    id: "concierge",
    label: "Concierge readiness",
    metric: "Executive score",
    unit: "pts",
    entries: [
      { id: "concierge-lina", name: "Lina M.", role: "AI Product Lead", tier: "Elite", score: 96, delta: 6, trend: "up" },
      { id: "concierge-jon", name: "Jon C.", role: "Platform Director", tier: "Elite", score: 93, delta: 3, trend: "up" },
      { id: "concierge-mara", name: "Mara F.", role: "Experience Engineer", tier: "Pro", score: 89, delta: 1, trend: "steady" },
      { id: "concierge-omar", name: "Omar G.", role: "Cloud Reliability Lead", tier: "Elite", score: 87, delta: -1, trend: "down" },
      { id: "concierge-nia", name: "Nia H.", role: "Product Strategist", tier: "Pro", score: 85, delta: 2, trend: "up" },
    ],
  },
];

export const communitySpotlights: CommunitySpotlight[] = [
  {
    id: "spotlight-edge",
    title: "Edge streaming showcase",
    summary: "A Nairobi start-up team demoed a 38% faster checkout via the Aurora deck.",
    metricLabel: "Latency delta",
    metricValue: "-380ms",
    delta: "▲ Executive applause",
    narrative: "Invited investors to experience the before-after journey, capturing board-ready metrics in minutes.",
  },
  {
    id: "spotlight-rag",
    title: "Responsible AI playback",
    summary: "Elite cohort rehearsed bias mitigation rituals live with the Nebula lab.",
    metricLabel: "Guardrail approvals",
    metricValue: "5/5",
    delta: "▲ Trust council",
    narrative: "Legal, CX, and engineering aligned on launch gates, unlocking green status for executive review.",
  },
];

export const weeklyQuests: CommunityQuest[] = [
  {
    id: "quest-streak",
    title: "Momentum keeper",
    description: "Log learning activity five days in a row and capture a concierge-ready insight.",
    reward: "+150 prestige",
    progress: 3,
    target: 5,
  },
  {
    id: "quest-cadre",
    title: "Cohort catalyst",
    description: "Co-host a studio rehearsal or mentor playback with at least two peers.",
    reward: "Concierge badge",
    progress: 1,
    target: 2,
  },
  {
    id: "quest-exec",
    title: "Executive storyteller",
    description: "Submit a 90-second executive recap referencing signal scores and customer outcomes.",
    reward: "+1 spotlight credit",
    progress: 0,
    target: 1,
  },
];

export const executiveShoutouts: ExecutiveShoutout[] = [
  {
    id: "shoutout-platform",
    persona: "VP Platform Excellence",
    statement: "“The concierge rehearsal helped us narrate platform investments with confidence to the board.”",
    focus: "Platform storytelling",
  },
  {
    id: "shoutout-ai",
    persona: "Chief Experience Officer",
    statement: "“Seeing live guardrail walkthroughs in Nebula made responsible AI feel executive-ready.”",
    focus: "Responsible AI",
  },
  {
    id: "shoutout-cloud",
    persona: "Head of Cloud Reliability",
    statement: "“The Horizon dome made our failover runbook real for leadership in under ten minutes.”",
    focus: "Reliability storytelling",
  },
];
