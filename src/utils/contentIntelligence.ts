import { courses, type Course, type CourseAssessment } from "@/data/courses";
import { contentPlaybooks, getContentPlaybook } from "@/data/contentPlaybooks";

const difficultyWeight: Record<Course["difficulty"], number> = {
  Beginner: 0,
  Intermediate: 1,
  Advanced: 2,
};

const difficultyOrder = ["Beginner", "Intermediate", "Advanced"] as const satisfies ReadonlyArray<Course["difficulty"]>;

const courseMap = new Map(courses.map((course) => [course.id, course] as const));

const normaliseDurationToHours = (duration: string | undefined): number => {
  if (!duration) return 0;
  const numeric = Number.parseFloat(duration.replace(/[^0-9.]+/g, ""));
  if (Number.isNaN(numeric)) return 0;
  if (duration.toLowerCase().includes("hour")) {
    return numeric;
  }
  if (duration.toLowerCase().includes("day")) {
    return numeric * 6;
  }
  if (duration.toLowerCase().includes("week")) {
    return numeric * 12;
  }
  return numeric;
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const computeSignalScore = (course: Course) => {
  const moduleScore = clamp(course.modules.length * 2.5, 0, 12);
  const lessonCount = course.modules.reduce((total, module) => {
    return total + module.sections.reduce((sectionTotal, section) => sectionTotal + section.lessons.length, 0);
  }, 0);
  const lessonScore = clamp(lessonCount / 4, 0, 6);
  const outcomesScore = clamp((course.outcomes?.length ?? 0) * 1.5, 0, 9);
  const projectScore = clamp((course.projectBriefs?.length ?? 0) * 1.5, 0, 6);
  const assessmentScore = clamp((course.assessments?.length ?? 0) * 1.2, 0, 6);
  const durationScore = clamp(normaliseDurationToHours(course.duration) / 6, 0, 8);
  const base = 72 + difficultyWeight[course.difficulty] * 8;
  const aggregate = base + moduleScore + lessonScore + outcomesScore + projectScore + assessmentScore + durationScore;
  return Math.round(clamp(aggregate, 68, 98));
};

const signalLabelForScore = (score: number) => {
  if (score >= 94) return "Boardroom ready";
  if (score >= 90) return "Executive confident";
  if (score >= 84) return "Launch ready";
  if (score >= 78) return "In refinement";
  return "Foundation";
};

const pickCourseByCategory = (category: string, excludeIds: Set<string>) => {
  const candidates = courses.filter((course) => course.category === category && !excludeIds.has(course.id));
  if (candidates.length === 0) return null;
  return candidates
    .slice()
    .sort((a, b) => difficultyWeight[b.difficulty] - difficultyWeight[a.difficulty])
    .find((course) => course.projectBriefs?.length || course.assessments?.length) ?? candidates[0];
};

const buildFollowUps = (course: Course, completedIds: Set<string>) => {
  const followUps: CourseFollowUp[] = [];
  const seen = new Set<string>([course.id]);
  const playbook = getContentPlaybook(course.category);

  const nextDifficultyIndex = difficultyOrder.indexOf(course.difficulty) + 1;
  const nextDifficultyTargets = difficultyOrder.slice(nextDifficultyIndex) as Course["difficulty"][];
  const categoryMatches = courses
    .filter((candidate) => candidate.category === course.category && candidate.id !== course.id)
    .filter((candidate) => {
      if (nextDifficultyTargets.length === 0) return true;
      return nextDifficultyTargets.includes(candidate.difficulty);
    })
    .sort((a, b) => difficultyWeight[b.difficulty] - difficultyWeight[a.difficulty])
    .slice(0, 2);

  categoryMatches.forEach((match) => {
    if (seen.has(match.id)) return;
    seen.add(match.id);
    followUps.push({
      courseId: match.id,
      title: match.title,
      difficulty: match.difficulty,
      duration: match.duration,
      status: completedIds.has(match.id) ? "completed" : "available",
      reason: `Extend your ${match.category.replace(/-/g, " ")} mastery with a ${match.difficulty.toLowerCase()} build.`,
    });
  });

  if (playbook) {
    playbook.recommendedAllies.forEach((ally) => {
      if (followUps.length >= 3) return;
      const candidate = pickCourseByCategory(ally.category, seen);
      if (!candidate) return;
      seen.add(candidate.id);
      followUps.push({
        courseId: candidate.id,
        title: candidate.title,
        difficulty: candidate.difficulty,
        duration: candidate.duration,
        status: completedIds.has(candidate.id) ? "completed" : "available",
        reason: ally.description,
      });
    });
  }

  if (followUps.length < 3) {
    courses.some((candidate) => {
      if (followUps.length >= 3) return true;
      if (seen.has(candidate.id)) return false;
      seen.add(candidate.id);
      followUps.push({
        courseId: candidate.id,
        title: candidate.title,
        difficulty: candidate.difficulty,
        duration: candidate.duration,
        status: completedIds.has(candidate.id) ? "completed" : "available",
        reason: `Broaden your perspective with ${candidate.category.replace(/-/g, " ")} excellence.`,
      });
      return false;
    });
  }

  return followUps.slice(0, 3);
};

const formatAssessmentItems = (assessments: Course["assessments"]) => {
  if (!assessments || assessments.length === 0) return [] as CourseAssessmentSummary[];
  return assessments.map((assessment) => ({
    id: assessment.id,
    title: assessment.title,
    type: assessment.type,
    description: assessment.description,
  }));
};

const buildAssessmentPlan = (course: Course, playbook: ReturnType<typeof getContentPlaybook>) => {
  const availableAssessments = formatAssessmentItems(course.assessments);
  if (playbook) {
    return {
      cadence: playbook.assessmentBlueprint.cadence,
      rituals: playbook.assessmentBlueprint.rituals,
      successMetric: playbook.assessmentBlueprint.successMetric,
      items: availableAssessments,
    } satisfies CourseIntel["assessmentPlan"];
  }
  return {
    cadence: "Monthly course instrumentation",
    rituals: [
      "Capture qualitative wins and blockers",
      "Review skill benchmark progress with mentor",
      "Plan next sprint experiments based on outcomes",
    ],
    successMetric: "Learners advance to the next pathway milestone within 30 days.",
    items: availableAssessments,
  } satisfies CourseIntel["assessmentPlan"];
};

const buildConciergeArtifacts = (course: Course, playbook: ReturnType<typeof getContentPlaybook>) => {
  const artifacts = course.projectBriefs?.map((brief) => brief.title) ?? [];
  if (artifacts.length > 0) {
    return artifacts;
  }
  return playbook?.signatureMoments ?? [];
};

const interpolatePrompt = (template: string, course: Course) =>
  template.replace("{course}", course.title).replace("{difficulty}", course.difficulty.toLowerCase());

export type CourseFollowUp = {
  courseId: string;
  title: string;
  difficulty: Course["difficulty"];
  duration: string;
  status: "completed" | "available";
  reason: string;
};

export type CourseAssessmentSummary = Pick<CourseAssessment, "id" | "title" | "type" | "description">;

export type CourseIntel = {
  signalScore: number;
  signalLabel: string;
  executiveSummary: string;
  signalNarrative: string;
  spotlightMetric: ContentPlaybook["spotlightMetric"];
  signatureMoments: string[];
  followUps: CourseFollowUp[];
  assessmentPlan: {
    cadence: string;
    rituals: string[];
    successMetric: string;
    items: CourseAssessmentSummary[];
  };
  conciergeArtifacts: string[];
  aiConciergePrompt: string;
};

export const buildCourseIntel = (course: Course, completedCourseIds: string[]) => {
  const playbook = getContentPlaybook(course.category);
  const completedIds = new Set(completedCourseIds);
  const signalScore = computeSignalScore(course);
  const intel: CourseIntel = {
    signalScore,
    signalLabel: signalLabelForScore(signalScore),
    executiveSummary: playbook?.executiveSummary ?? "Elevate this learning stream with concierge rituals and executive storytelling.",
    signalNarrative: playbook?.signalNarrative ?? "This curriculum advances craft while maintaining stakeholder confidence.",
    spotlightMetric:
      playbook?.spotlightMetric ?? {
        label: "Momentum index",
        description: "Observed uplift in learner throughput and confidence after completion.",
      },
    signatureMoments: playbook?.signatureMoments ?? [],
    followUps: buildFollowUps(course, completedIds),
    assessmentPlan: buildAssessmentPlan(course, playbook),
    conciergeArtifacts: buildConciergeArtifacts(course, playbook),
    aiConciergePrompt: interpolatePrompt(
      playbook?.aiConciergePrompt ?? "Describe how {course} unlocks measurable wins for our executive sponsors.",
      course,
    ),
  };
  return intel;
};

export const resolveCourse = (courseId: string) => courseMap.get(courseId) ?? null;

export const availableContentPlaybooks = Object.keys(contentPlaybooks);
