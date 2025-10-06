import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { courses } from "@/data/courses";
import { learningPaths } from "@/data/learningPaths";
import { useAuth } from "@/context/AuthContext";

const STORAGE_KEY = "tech-stream-learn-course-completions";
const ANONYMOUS_KEY = "anonymous";

export type CompletionRecord = {
  courseId: string;
  completedAt: string;
};

type CompletionMap = Record<string, CompletionRecord[]>;

type PathProgress = {
  pathId: string;
  completed: number;
  total: number;
  percentage: number;
  nextCourseId: string | null;
  completedCourses: string[];
};

type Achievement = {
  id: string;
  title: string;
  description: string;
  requirementLabel: string;
  current: number;
  target: number;
  earned: boolean;
  progress: number;
};

interface ProgressContextValue {
  completedCourses: string[];
  completionRecords: CompletionRecord[];
  isCourseCompleted: (courseId: string) => boolean;
  markCourseCompleted: (courseId: string) => void;
  unmarkCourseCompleted: (courseId: string) => void;
  toggleCourseCompleted: (courseId: string) => void;
  pathProgress: PathProgress[];
  getPathProgress: (pathId: string) => PathProgress | undefined;
  achievements: Achievement[];
}

const ProgressContext = createContext<ProgressContextValue | undefined>(undefined);

const normalizeRecords = (records: unknown): CompletionRecord[] => {
  if (!Array.isArray(records)) return [];
  return records
    .map((entry) => {
      if (typeof entry === "string") {
        return { courseId: entry, completedAt: new Date().toISOString() } satisfies CompletionRecord;
      }
      if (typeof entry === "object" && entry !== null && "courseId" in entry) {
        const record = entry as Partial<CompletionRecord>;
        const courseId = typeof record.courseId === "string" ? record.courseId : null;
        if (!courseId) return null;
        const completedAt = typeof record.completedAt === "string" ? record.completedAt : new Date().toISOString();
        return { courseId, completedAt } satisfies CompletionRecord;
      }
      return null;
    })
    .filter((item): item is CompletionRecord => Boolean(item));
};

const loadCompletionMap = (): CompletionMap => {
  const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return {
        [ANONYMOUS_KEY]: normalizeRecords(parsed),
      };
    }
    if (typeof parsed !== "object" || parsed === null) {
      return {};
    }
    const entries = Object.entries(parsed as Record<string, unknown>).reduce<CompletionMap>((acc, [key, value]) => {
      acc[key] = normalizeRecords(value);
      return acc;
    }, {});
    return entries;
  } catch (error) {
    console.error("Failed to parse stored completions", error);
    return {};
  }
};

const persistCompletionMap = (map: CompletionMap) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch (error) {
    console.error("Failed to persist completions", error);
  }
};

const dedupeRecords = (records: CompletionRecord[]) => {
  const map = new Map<string, CompletionRecord>();
  records.forEach((record) => {
    const existing = map.get(record.courseId);
    if (!existing) {
      map.set(record.courseId, record);
      return;
    }
    if (new Date(record.completedAt).getTime() > new Date(existing.completedAt).getTime()) {
      map.set(record.courseId, record);
    }
  });
  return Array.from(map.values()).sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime());
};

const buildCourseMeta = () => {
  const entries = courses.map((course) => [course.id, { category: course.category }]);
  return new Map<string, { category: string }>(entries);
};

const courseMetaMap = buildCourseMeta();

const flattenPathCourses = (pathId: string) => {
  const path = learningPaths.find((candidate) => candidate.id === pathId);
  if (!path) return [] as string[];
  return path.stages.flatMap((stage) => stage.courseIds);
};

export const ProgressProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const accountKey = user?.email ?? ANONYMOUS_KEY;
  const [completionMap, setCompletionMap] = useState<CompletionMap>({});

  useEffect(() => {
    setCompletionMap(loadCompletionMap());
  }, []);

  const completionRecords = useMemo(() => completionMap[accountKey] ?? [], [completionMap, accountKey]);
  const completedCourses = useMemo(() => completionRecords.map((record) => record.courseId), [completionRecords]);
  const completedSet = useMemo(() => new Set(completedCourses), [completedCourses]);

  const updateMap = useCallback(
    (updater: (current: CompletionRecord[]) => CompletionRecord[]) => {
      setCompletionMap((currentMap) => {
        const existing = currentMap[accountKey] ?? [];
        const updatedList = dedupeRecords(updater(existing));
        const updatedMap: CompletionMap = {
          ...currentMap,
          [accountKey]: updatedList,
        };
        persistCompletionMap(updatedMap);
        return updatedMap;
      });
    },
    [accountKey],
  );

  const markCourseCompleted = useCallback(
    (courseId: string) => {
      updateMap((current) => {
        const now = new Date().toISOString();
        if (current.some((record) => record.courseId === courseId)) {
          return current.map((record) => (record.courseId === courseId ? { ...record, completedAt: now } : record));
        }
        return [...current, { courseId, completedAt: now }];
      });
    },
    [updateMap],
  );

  const unmarkCourseCompleted = useCallback(
    (courseId: string) => {
      updateMap((current) => current.filter((record) => record.courseId !== courseId));
    },
    [updateMap],
  );

  const toggleCourseCompleted = useCallback(
    (courseId: string) => {
      updateMap((current) => {
        const exists = current.some((record) => record.courseId === courseId);
        if (exists) {
          return current.filter((record) => record.courseId !== courseId);
        }
        return [...current, { courseId, completedAt: new Date().toISOString() }];
      });
    },
    [updateMap],
  );

  const isCourseCompleted = useCallback((courseId: string) => completedSet.has(courseId), [completedSet]);

  const pathProgress = useMemo<PathProgress[]>(() => {
    return learningPaths.map((path) => {
      const courseIds = path.stages.flatMap((stage) => stage.courseIds);
      const completed = courseIds.filter((courseId) => completedSet.has(courseId));
      const nextCourseId = courseIds.find((courseId) => !completedSet.has(courseId)) ?? null;
      const total = courseIds.length;
      const percentage = total === 0 ? 0 : Math.round((completed.length / total) * 100);
      return {
        pathId: path.id,
        completed: completed.length,
        total,
        percentage,
        nextCourseId,
        completedCourses: completed,
      };
    });
  }, [completedSet]);

  const pathProgressMap = useMemo(() => {
    const map = new Map<string, PathProgress>();
    pathProgress.forEach((progress) => {
      map.set(progress.pathId, progress);
    });
    return map;
  }, [pathProgress]);

  const achievements = useMemo<Achievement[]>(() => {
    const completedCount = completedCourses.length;
    const uniqueCategories = new Set(
      completedCourses
        .map((courseId) => courseMetaMap.get(courseId)?.category)
        .filter((category): category is string => Boolean(category)),
    );

    const completedPathCount = pathProgress.filter((progress) => progress.total > 0 && progress.completed === progress.total).length;
    const advancedCourseIds = new Set(
      courses.filter((course) => course.difficulty === "Advanced").map((course) => course.id),
    );
    const advancedCompleted = completedCourses.filter((courseId) => advancedCourseIds.has(courseId)).length;

    const definitions: Achievement[] = [
      {
        id: "course-starter",
        title: "Course Starter",
        description: "Complete your first course and unlock your learning streak.",
        requirementLabel: "1 course completed",
        current: completedCount,
        target: 1,
        earned: completedCount >= 1,
        progress: Math.min(1, completedCount / 1) || 0,
      },
      {
        id: "course-sprinter",
        title: "Learning Sprinter",
        description: "Complete five courses across any categories.",
        requirementLabel: "5 courses completed",
        current: completedCount,
        target: 5,
        earned: completedCount >= 5,
        progress: Math.min(1, completedCount / 5) || 0,
      },
      {
        id: "path-architect",
        title: "Path Architect",
        description: "Finish an end-to-end learning path with all milestones complete.",
        requirementLabel: "1 learning path finished",
        current: completedPathCount,
        target: 1,
        earned: completedPathCount >= 1,
        progress: Math.min(1, completedPathCount / 1) || 0,
      },
      {
        id: "polyglot",
        title: "Cross-Discipline Explorer",
        description: "Complete courses in at least three different categories.",
        requirementLabel: "3 categories covered",
        current: uniqueCategories.size,
        target: 3,
        earned: uniqueCategories.size >= 3,
        progress: Math.min(1, uniqueCategories.size / 3) || 0,
      },
      {
        id: "advanced-specialist",
        title: "Advanced Specialist",
        description: "Complete three advanced-level courses.",
        requirementLabel: "3 advanced courses",
        current: advancedCompleted,
        target: 3,
        earned: advancedCompleted >= 3,
        progress: Math.min(1, advancedCompleted / 3) || 0,
      },
    ];

    return definitions.map((definition) => ({ ...definition }));
  }, [completedCourses, pathProgress]);

  const value = useMemo<ProgressContextValue>(
    () => ({
      completedCourses,
      completionRecords,
      isCourseCompleted,
      markCourseCompleted,
      unmarkCourseCompleted,
      toggleCourseCompleted,
      pathProgress,
      getPathProgress: (pathId: string) => pathProgressMap.get(pathId),
      achievements,
    }),
    [
      achievements,
      completedCourses,
      completionRecords,
      isCourseCompleted,
      markCourseCompleted,
      pathProgress,
      pathProgressMap,
      toggleCourseCompleted,
      unmarkCourseCompleted,
    ],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return context;
};
