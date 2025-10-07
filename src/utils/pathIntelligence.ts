import type { LearningPath } from "@/data/learningPaths";
import {
  getPathIntelligenceProfile,
  type PathConciergeTouchpoint,
  type PathExecutiveSignal,
  type PathStretchMilestone,
} from "@/data/pathIntelligence";
import type { CompletionRecord, MentorSessionRecord } from "@/context/ProgressContext";

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const completionsInWindow = (completions: CompletionRecord[], days: number) => {
  if (days <= 0) return 0;
  const limit = days * 24 * 60 * 60 * 1000;
  const now = Date.now();
  return completions.filter((record) => now - new Date(record.completedAt).getTime() <= limit).length;
};

const mentorSessionsInWindow = (sessions: MentorSessionRecord[], days: number) => {
  if (days <= 0) return 0;
  const limit = days * 24 * 60 * 60 * 1000;
  const now = Date.now();
  return sessions.filter((session) => now - new Date(session.updatedAt).getTime() <= limit).length;
};

const readinessLabel = (score: number) => {
  if (score >= 90) return "Executive-ready";
  if (score >= 80) return "Momentum strong";
  if (score >= 70) return "On trajectory";
  if (score >= 60) return "Needs acceleration";
  return "Rebuild cadence";
};

const interpolatePrompt = (template: string, path: LearningPath, percentage: number, nextMilestone: PathStretchMilestone) =>
  template
    .replace("{pathTitle}", path.title)
    .replace("{percentage}", `${Math.round(percentage)}%`)
    .replace("{nextMilestone}", nextMilestone.label);

export type PathProgressSnapshot = {
  percentage: number;
  completed: number;
  total: number;
  nextCourseId: string | null;
  completedCourses: string[];
};

export type PathIntel = {
  readinessScore: number;
  readinessLabel: string;
  narrative: string;
  readinessFactors: string[];
  nextMilestone: PathStretchMilestone;
  stretchMilestones: PathStretchMilestone[];
  executiveSignals: PathExecutiveSignal[];
  conciergeTouchpoints: PathConciergeTouchpoint[];
  completionsLast30Days: number;
  mentorSessionsLast21Days: number;
  recommendedActions: string[];
  aiPrompt: string;
};

export const buildPathIntel = ({
  path,
  progress,
  completions,
  mentorSessions,
}: {
  path: LearningPath;
  progress: PathProgressSnapshot | null | undefined;
  completions: CompletionRecord[];
  mentorSessions: MentorSessionRecord[];
}): PathIntel | null => {
  const profile = getPathIntelligenceProfile(path.id);
  if (!profile) {
    return null;
  }

  const percentage = progress?.percentage ?? 0;
  const totalCourses = progress?.total ?? 0;
  const completedCourses = progress?.completed ?? 0;
  const courseCompletionRatio = totalCourses > 0 ? completedCourses / totalCourses : 0;
  const completions30 = completionsInWindow(completions, 30);
  const mentor21 = mentorSessionsInWindow(mentorSessions, 21);

  const progressScore = percentage * 0.58;
  const cadenceScore = clamp(completions30 * 7, 0, 21);
  const mentorScore = clamp(mentor21 * 8, 0, 16);
  const stageScore = clamp(courseCompletionRatio * 13, 0, 13);
  const readinessScore = Math.round(clamp(42 + progressScore + cadenceScore + mentorScore + stageScore, 40, 100));

  const nextMilestone =
    profile.stretchMilestones.find((milestone) => percentage < milestone.targetPercentage) ??
    profile.stretchMilestones.at(-1) ??
    profile.stretchMilestones[0];

  const recommendedActions: string[] = [];
  if (completions30 < 2) {
    recommendedActions.push("Lock two deep-work sessions this week to accelerate stage completions.");
  }
  if (mentor21 === 0) {
    recommendedActions.push("Book a concierge mentor check-in to rehearse upcoming executive narratives.");
  }
  if (percentage < nextMilestone.targetPercentage) {
    recommendedActions.push(`Focus on the ${nextMilestone.label.toLowerCase()} milestone to unlock concierge touchpoints.`);
  }
  profile.readinessFactors.slice(0, Math.max(0, 3 - recommendedActions.length)).forEach((factor) => {
    if (recommendedActions.length < 3) {
      recommendedActions.push(factor);
    }
  });

  const aiPrompt = interpolatePrompt(profile.aiPromptTemplate, path, percentage, nextMilestone);

  return {
    readinessScore,
    readinessLabel: readinessLabel(readinessScore),
    narrative: profile.narrative,
    readinessFactors: profile.readinessFactors,
    nextMilestone,
    stretchMilestones: profile.stretchMilestones,
    executiveSignals: profile.executiveSignals,
    conciergeTouchpoints: profile.conciergeTouchpoints,
    completionsLast30Days: completions30,
    mentorSessionsLast21Days: mentor21,
    recommendedActions,
    aiPrompt,
  } satisfies PathIntel;
};
