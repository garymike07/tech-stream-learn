import { courses, type Course } from "@/data/courses";
import { learningPaths } from "@/data/learningPaths";

type PathProgressLite = {
  pathId: string;
  percentage: number;
  nextCourseId: string | null;
};

export type CourseRecommendationReason = "sameCategory" | "advancedLevel" | "pathMomentum" | "freshCategory";

export interface CourseRecommendation {
  course: Course;
  reason: CourseRecommendationReason;
  values?: Record<string, string>;
}

export interface PathRecommendation {
  pathId: string;
  title: string;
  percentage: number;
  nextCourseId: string | null;
}

const difficultyWeight: Record<Course["difficulty"], number> = {
  Beginner: 1,
  Intermediate: 2,
  Advanced: 3,
};

const sortByDifficulty = (left: Course, right: Course) => difficultyWeight[right.difficulty] - difficultyWeight[left.difficulty];

export const buildCourseRecommendations = ({
  completedCourseIds,
  enrollments,
  pathProgress,
  limit = 6,
}: {
  completedCourseIds: string[];
  enrollments: string[];
  pathProgress: PathProgressLite[];
  limit?: number;
}): CourseRecommendation[] => {
  const completedSet = new Set(completedCourseIds);
  const enrolledSet = new Set(enrollments);

  const categoryFrequency = new Map<string, number>();
  completedCourseIds.forEach((courseId) => {
    const course = courses.find((candidate) => candidate.id === courseId);
    if (!course) return;
    categoryFrequency.set(course.category, (categoryFrequency.get(course.category) ?? 0) + 1);
  });

  const recommendations: CourseRecommendation[] = [];

  // Path momentum: prioritize next course from active paths
  pathProgress
    .filter((progress) => progress.nextCourseId)
    .sort((a, b) => b.percentage - a.percentage)
    .forEach((progress) => {
      if (!progress.nextCourseId) return;
      const course = courses.find((candidate) => candidate.id === progress.nextCourseId);
      if (!course || completedSet.has(course.id)) return;
      if (recommendations.some((entry) => entry.course.id === course.id)) return;
      recommendations.push({ course, reason: "pathMomentum" });
    });

  // Continuation in favourite categories
  const favCategories = Array.from(categoryFrequency.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([categoryId]) => categoryId);

  favCategories.forEach((categoryId) => {
    const categoryCourses = courses
      .filter((course) => course.category === categoryId && !completedSet.has(course.id) && !enrolledSet.has(course.id))
      .sort(sortByDifficulty);
    if (categoryCourses.length === 0) return;

    const advancedCourse = categoryCourses.find((course) => course.difficulty === "Advanced");
    if (advancedCourse) {
      if (!recommendations.some((entry) => entry.course.id === advancedCourse.id)) {
        recommendations.push({
          course: advancedCourse,
          reason: "advancedLevel",
        });
      }
    }

    const primaryCourse = categoryCourses[0];
    if (primaryCourse && !recommendations.some((entry) => entry.course.id === primaryCourse.id)) {
      recommendations.push({
        course: primaryCourse,
        reason: "sameCategory",
        values: { category: categoryId },
      });
    }
  });

  // Fresh categories to explore
  const allCategories = new Set(courses.map((course) => course.category));
  const untouchedCategories = Array.from(allCategories).filter((category) => !categoryFrequency.has(category));
  untouchedCategories.slice(0, 2).forEach((categoryId) => {
    const candidate = courses
      .filter((course) => course.category === categoryId && course.difficulty !== "Advanced")
      .sort(sortByDifficulty)
      .find((course) => !completedSet.has(course.id) && !enrolledSet.has(course.id));
    if (!candidate) return;
    if (recommendations.some((entry) => entry.course.id === candidate.id)) return;
    recommendations.push({
      course: candidate,
      reason: "freshCategory",
      values: { category: categoryId },
    });
  });

  return recommendations.slice(0, limit);
};

export const buildPathRecommendations = (pathProgress: PathProgressLite[]): PathRecommendation[] => {
  return pathProgress
    .filter((progress) => progress.percentage < 100)
    .map((progress) => {
      const path = learningPaths.find((candidate) => candidate.id === progress.pathId);
      return {
        pathId: progress.pathId,
        title: path?.title ?? progress.pathId,
        percentage: progress.percentage,
        nextCourseId: progress.nextCourseId ?? null,
      };
    })
    .sort((a, b) => b.percentage - a.percentage);
};
