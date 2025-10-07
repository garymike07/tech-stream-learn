import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { differenceInCalendarDays, startOfDay, subDays } from "date-fns";

import { courses } from "@/data/courses";
import { learningPaths } from "@/data/learningPaths";
import { getImmersiveScene, type ImmersiveTimelineCue } from "@/data/immersiveScenes";
import { weeklyQuests, type CommunityQuest } from "@/data/communitySignals";
import { useAuth } from "@/context/AuthContext";

const STORAGE_KEY = "tech-stream-learn-course-completions";
const MENTOR_STORAGE_KEY = "tech-stream-learn-mentor-sessions";
const STUDIO_STORAGE_KEY = "tech-stream-learn-studio-sessions";
const ANONYMOUS_KEY = "anonymous";

const generateId = () => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2, 10);
};

export type CompletionRecord = {
  courseId: string;
  completedAt: string;
};

export type MentorAttachmentRecord = {
  id: string;
  name: string;
  size: number;
  type: string;
};

export type MentorMessageRecord = {
  id: string;
  role: "user" | "mentor" | "system";
  content: string;
  createdAt: string;
  sentiment?: "accelerate" | "stabilize" | "celebrate" | "neutral";
  attachments?: MentorAttachmentRecord[];
};

export type MentorActionItem = {
  id: string;
  label: string;
  dueAt: string | null;
  completed: boolean;
};

export type MentorSessionRecord = {
  id: string;
  mentorId: string;
  topic: string;
  scenarioId: string | null;
  createdAt: string;
  updatedAt: string;
  messages: MentorMessageRecord[];
  actionItems: MentorActionItem[];
};

export type StudioTimelineStatus = "pending" | "in_progress" | "complete";

export type StudioTimelineRecord = ImmersiveTimelineCue & {
  status: StudioTimelineStatus;
  scheduledAt?: string | null;
};

export type StudioArtifactRecord = {
  id: string;
  title: string;
  type: "whiteboard" | "prototype" | "artifact" | "brief";
  summary: string;
  owner: string;
  url?: string;
  createdAt: string;
};

export type StudioSessionRecord = {
  id: string;
  sceneId: string;
  pathId: string;
  courseId: string;
  title: string;
  facilitator: string;
  participants: string[];
  createdAt: string;
  updatedAt: string;
  timeline: StudioTimelineRecord[];
  artifacts: StudioArtifactRecord[];
};

export type CommunityStreakSnapshot = {
  current: number;
  longest: number;
  activeSince: string | null;
  lastCompletionAt: string | null;
  completionsThisWeek: number;
  completionsLastWeek: number;
  cadenceDelta: number;
};

export type CommunityQuestProgress = CommunityQuest & {
  progress: number;
};

type CompletionMap = Record<string, CompletionRecord[]>;

type MentorSessionMap = Record<string, MentorSessionRecord[]>;

type StudioSessionMap = Record<string, StudioSessionRecord[]>;

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
  mentorSessions: MentorSessionRecord[];
  startMentorSession: (input: { mentorId: string; topic: string; scenarioId?: string | null }) => MentorSessionRecord;
  recordMentorMessage: (sessionId: string, message: MentorMessageRecord) => MentorSessionRecord | undefined;
  updateMentorActionItems: (sessionId: string, actionItems: MentorActionItem[]) => void;
  toggleMentorActionItem: (sessionId: string, actionItemId: string, completed: boolean) => void;
  studioSessions: StudioSessionRecord[];
  startStudioSession: (input: {
    sceneId: string;
    pathId: string;
    courseId: string;
    title: string;
    facilitator: string;
    participants: string[];
  }) => StudioSessionRecord | null;
  updateStudioTimelineStatus: (sessionId: string, timelineId: string, status: StudioTimelineStatus) => void;
  addStudioArtifact: (
    sessionId: string,
    artifact: Omit<StudioArtifactRecord, "id" | "createdAt">,
  ) => void;
  communityStreak: CommunityStreakSnapshot;
  communityQuests: CommunityQuestProgress[];
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

const normalizeMentorMessages = (messages: unknown): MentorMessageRecord[] => {
  if (!Array.isArray(messages)) return [];
  return messages
    .map((entry) => {
      if (typeof entry !== "object" || entry === null) return null;
      const record = entry as Partial<MentorMessageRecord> & { role?: string };
      const role = record.role === "mentor" || record.role === "system" ? record.role : "user";
      const content = typeof record.content === "string" ? record.content : null;
      if (!content) return null;
      const createdAt = typeof record.createdAt === "string" ? record.createdAt : new Date().toISOString();
      const sentiment = record.sentiment && ["accelerate", "stabilize", "celebrate", "neutral"].includes(record.sentiment)
        ? (record.sentiment as MentorMessageRecord["sentiment"])
        : undefined;
      const attachments = Array.isArray(record.attachments)
        ? record.attachments
            .map((attachment) => {
              if (typeof attachment !== "object" || attachment === null) return null;
              const summary = attachment as Partial<MentorAttachmentRecord>;
              const name = typeof summary.name === "string" ? summary.name : null;
              if (!name) return null;
              return {
                id: typeof summary.id === "string" && summary.id.length > 0 ? summary.id : generateId(),
                name,
                size: typeof summary.size === "number" ? summary.size : 0,
                type: typeof summary.type === "string" ? summary.type : "",
              } satisfies MentorAttachmentRecord;
            })
            .filter((item): item is MentorAttachmentRecord => Boolean(item))
        : undefined;
      return {
        id: typeof record.id === "string" && record.id.length > 0 ? record.id : generateId(),
        role,
        content,
        createdAt,
        sentiment,
        attachments,
      } satisfies MentorMessageRecord;
    })
    .filter((item): item is MentorMessageRecord => Boolean(item));
};

const normalizeMentorSessions = (records: unknown): MentorSessionRecord[] => {
  if (!Array.isArray(records)) return [];
  return records
    .map((entry) => {
      if (typeof entry !== "object" || entry === null) return null;
      const record = entry as Partial<MentorSessionRecord> & { mentorId?: string; topic?: string };
      const mentorId = typeof record.mentorId === "string" ? record.mentorId : null;
      if (!mentorId) return null;
      const topic = typeof record.topic === "string" ? record.topic : "Mentor session";
      const scenarioId = typeof record.scenarioId === "string" ? record.scenarioId : null;
      const createdAt = typeof record.createdAt === "string" ? record.createdAt : new Date().toISOString();
      const updatedAt = typeof record.updatedAt === "string" ? record.updatedAt : createdAt;
      const messages = normalizeMentorMessages(record.messages ?? []);
      const actionItems = Array.isArray(record.actionItems)
        ? record.actionItems
            .map((item) => {
              if (typeof item !== "object" || item === null) return null;
              const summary = item as Partial<MentorActionItem>;
              const label = typeof summary.label === "string" ? summary.label : null;
              if (!label) return null;
              return {
                id: typeof summary.id === "string" && summary.id.length > 0 ? summary.id : generateId(),
                label,
                dueAt: typeof summary.dueAt === "string" ? summary.dueAt : null,
                completed: Boolean(summary.completed),
              } satisfies MentorActionItem;
            })
            .filter((item): item is MentorActionItem => Boolean(item))
        : [];
      return {
        id: typeof record.id === "string" && record.id.length > 0 ? record.id : generateId(),
        mentorId,
        topic,
        scenarioId,
        createdAt,
        updatedAt,
        messages,
        actionItems,
      } satisfies MentorSessionRecord;
    })
    .filter((item): item is MentorSessionRecord => Boolean(item));
};

const loadMentorSessionMap = (): MentorSessionMap => {
  const raw = typeof window !== "undefined" ? localStorage.getItem(MENTOR_STORAGE_KEY) : null;
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return {
        [ANONYMOUS_KEY]: normalizeMentorSessions(parsed),
      } satisfies MentorSessionMap;
    }
    if (typeof parsed !== "object" || parsed === null) return {};
    return Object.entries(parsed as Record<string, unknown>).reduce<MentorSessionMap>((acc, [key, value]) => {
      acc[key] = normalizeMentorSessions(value);
      return acc;
    }, {});
  } catch (error) {
    console.error("Failed to parse stored mentor sessions", error);
    return {};
  }
};

const persistMentorSessionMap = (map: MentorSessionMap) => {
  try {
    localStorage.setItem(MENTOR_STORAGE_KEY, JSON.stringify(map));
  } catch (error) {
    console.error("Failed to persist mentor sessions", error);
  }
};

const normalizeStudioTimeline = (timeline: unknown): StudioTimelineRecord[] => {
  if (!Array.isArray(timeline)) return [];
  return timeline
    .map((entry) => {
      if (typeof entry !== "object" || entry === null) return null;
      const record = entry as Partial<StudioTimelineRecord> & { stage?: string; status?: string };
      const label = typeof record.label === "string" ? record.label : null;
      if (!label) return null;
      const id = typeof record.id === "string" && record.id.length > 0 ? record.id : generateId();
      const stage: ImmersiveTimelineCue["stage"] = record.stage === "Exploration" || record.stage === "Synthesis" || record.stage === "Playback"
        ? record.stage
        : "Priming";
      const facilitatorCue = typeof record.facilitatorCue === "string" ? record.facilitatorCue : "";
      const successSignal = typeof record.successSignal === "string" ? record.successSignal : "";
      const status: StudioTimelineStatus = record.status === "in_progress" || record.status === "complete" ? record.status : "pending";
      const scheduledAt = typeof record.scheduledAt === "string" ? record.scheduledAt : null;
      return {
        id,
        label,
        stage,
        facilitatorCue,
        successSignal,
        status,
        scheduledAt,
      } satisfies StudioTimelineRecord;
    })
    .filter((item): item is StudioTimelineRecord => Boolean(item));
};

const normalizeStudioSessions = (records: unknown): StudioSessionRecord[] => {
  if (!Array.isArray(records)) return [];
  return records
    .map((entry) => {
      if (typeof entry !== "object" || entry === null) return null;
      const record = entry as Partial<StudioSessionRecord> & { title?: string; facilitator?: string };
      const sceneId = typeof record.sceneId === "string" ? record.sceneId : null;
      const pathId = typeof record.pathId === "string" ? record.pathId : null;
      const courseId = typeof record.courseId === "string" ? record.courseId : null;
      if (!sceneId || !pathId || !courseId) return null;
      const title = typeof record.title === "string" ? record.title : "Immersive studio session";
      const facilitator = typeof record.facilitator === "string" ? record.facilitator : "Concierge guide";
      const participants = Array.isArray(record.participants)
        ? record.participants.filter((item): item is string => typeof item === "string")
        : [];
      const createdAt = typeof record.createdAt === "string" ? record.createdAt : new Date().toISOString();
      const updatedAt = typeof record.updatedAt === "string" ? record.updatedAt : createdAt;
      const timeline = normalizeStudioTimeline(record.timeline ?? []);
      const artifacts = Array.isArray(record.artifacts)
        ? record.artifacts
            .map((artifact) => {
              if (typeof artifact !== "object" || artifact === null) return null;
              const summary = artifact as Partial<StudioArtifactRecord> & { title?: string; owner?: string; type?: string };
              const title = typeof summary.title === "string" ? summary.title : null;
              const owner = typeof summary.owner === "string" ? summary.owner : null;
              if (!title || !owner) return null;
              const type: StudioArtifactRecord["type"] = summary.type === "prototype" || summary.type === "artifact" || summary.type === "brief" ? summary.type : "whiteboard";
              return {
                id: typeof summary.id === "string" && summary.id.length > 0 ? summary.id : generateId(),
                title,
                owner,
                type,
                summary: typeof summary.summary === "string" ? summary.summary : "",
                url: typeof summary.url === "string" ? summary.url : undefined,
                createdAt: typeof summary.createdAt === "string" ? summary.createdAt : new Date().toISOString(),
              } satisfies StudioArtifactRecord;
            })
            .filter((item): item is StudioArtifactRecord => Boolean(item))
        : [];
      return {
        id: typeof record.id === "string" && record.id.length > 0 ? record.id : generateId(),
        sceneId,
        pathId,
        courseId,
        title,
        facilitator,
        participants,
        createdAt,
        updatedAt,
        timeline,
        artifacts,
      } satisfies StudioSessionRecord;
    })
    .filter((item): item is StudioSessionRecord => Boolean(item));
};

const loadStudioSessionMap = (): StudioSessionMap => {
  const raw = typeof window !== "undefined" ? localStorage.getItem(STUDIO_STORAGE_KEY) : null;
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return {
        [ANONYMOUS_KEY]: normalizeStudioSessions(parsed),
      } satisfies StudioSessionMap;
    }
    if (typeof parsed !== "object" || parsed === null) return {};
    return Object.entries(parsed as Record<string, unknown>).reduce<StudioSessionMap>((acc, [key, value]) => {
      acc[key] = normalizeStudioSessions(value);
      return acc;
    }, {});
  } catch (error) {
    console.error("Failed to parse stored studio sessions", error);
    return {};
  }
};

const persistStudioSessionMap = (map: StudioSessionMap) => {
  try {
    localStorage.setItem(STUDIO_STORAGE_KEY, JSON.stringify(map));
  } catch (error) {
    console.error("Failed to persist studio sessions", error);
  }
};

const computeCommunityStreak = (records: CompletionRecord[]): CommunityStreakSnapshot => {
  if (records.length === 0) {
    return {
      current: 0,
      longest: 0,
      activeSince: null,
      lastCompletionAt: null,
      completionsThisWeek: 0,
      completionsLastWeek: 0,
      cadenceDelta: 0,
    } satisfies CommunityStreakSnapshot;
  }

  const sortedRecords = [...records].sort(
    (a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime(),
  );
  const uniqueDays = Array.from(
    new Set(sortedRecords.map((record) => startOfDay(new Date(record.completedAt)).getTime())),
  ).sort((a, b) => b - a);

  const today = startOfDay(new Date());
  let current = 0;
  if (uniqueDays.length > 0 && differenceInCalendarDays(today, new Date(uniqueDays[0])) <= 1) {
    current = 1;
    for (let index = 1; index < uniqueDays.length; index += 1) {
      const diff = differenceInCalendarDays(new Date(uniqueDays[index - 1]), new Date(uniqueDays[index]));
      if (diff === 1) {
        current += 1;
      } else {
        break;
      }
    }
  }

  let longest = uniqueDays.length > 0 ? 1 : 0;
  let run = longest;
  for (let index = 1; index < uniqueDays.length; index += 1) {
    const diff = differenceInCalendarDays(new Date(uniqueDays[index - 1]), new Date(uniqueDays[index]));
    if (diff === 1) {
      run += 1;
    } else {
      run = 1;
    }
    if (run > longest) {
      longest = run;
    }
  }
  if (uniqueDays.length === 0) {
    longest = 0;
  }

  const activeSince = current > 0 ? new Date(uniqueDays[current - 1]).toISOString() : null;
  const lastCompletionAt = sortedRecords[0]?.completedAt ?? null;

  const todayStart = startOfDay(new Date());
  const thisWeekStart = subDays(todayStart, 6);
  const lastWeekStart = subDays(thisWeekStart, 7);
  const lastWeekEnd = subDays(thisWeekStart, 1);

  const completionsThisWeek = sortedRecords.filter((record) => {
    const completed = new Date(record.completedAt);
    return completed >= thisWeekStart && completed <= new Date();
  }).length;

  const completionsLastWeek = sortedRecords.filter((record) => {
    const completed = new Date(record.completedAt);
    return completed >= lastWeekStart && completed <= lastWeekEnd;
  }).length;

  return {
    current,
    longest,
    activeSince,
    lastCompletionAt,
    completionsThisWeek,
    completionsLastWeek,
    cadenceDelta: completionsThisWeek - completionsLastWeek,
  } satisfies CommunityStreakSnapshot;
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
  const [mentorSessionMap, setMentorSessionMap] = useState<MentorSessionMap>({});
  const [studioSessionMap, setStudioSessionMap] = useState<StudioSessionMap>({});

  useEffect(() => {
    setCompletionMap(loadCompletionMap());
  }, []);

  useEffect(() => {
    setMentorSessionMap(loadMentorSessionMap());
  }, []);

  useEffect(() => {
    setStudioSessionMap(loadStudioSessionMap());
  }, []);

  const completionRecords = useMemo(() => completionMap[accountKey] ?? [], [completionMap, accountKey]);
  const completedCourses = useMemo(() => completionRecords.map((record) => record.courseId), [completionRecords]);
  const completedSet = useMemo(() => new Set(completedCourses), [completedCourses]);
  const mentorSessions = useMemo(() => mentorSessionMap[accountKey] ?? [], [mentorSessionMap, accountKey]);
  const studioSessions = useMemo(() => studioSessionMap[accountKey] ?? [], [studioSessionMap, accountKey]);
  const communityStreak = useMemo(() => computeCommunityStreak(completionRecords), [completionRecords]);
  const executiveRecapProgress = useMemo(() => {
    const horizon = subDays(new Date(), 7).getTime();
    return mentorSessions.some((session) => {
      const updatedAt = new Date(session.updatedAt).getTime();
      if (updatedAt < horizon) return false;
      return session.messages.some((message) => message.role === "user" && message.content.toLowerCase().includes("recap"));
    })
      ? 1
      : 0;
  }, [mentorSessions]);
  const communityQuests = useMemo<CommunityQuestProgress[]>(
    () =>
      weeklyQuests.map((quest) => {
        if (quest.id === "quest-streak") {
          return { ...quest, progress: Math.min(quest.target, communityStreak.current) } satisfies CommunityQuestProgress;
        }
        if (quest.id === "quest-cadre") {
          return { ...quest, progress: Math.min(quest.target, studioSessions.length) } satisfies CommunityQuestProgress;
        }
        if (quest.id === "quest-exec") {
          return { ...quest, progress: Math.min(quest.target, executiveRecapProgress) } satisfies CommunityQuestProgress;
        }
        return { ...quest } satisfies CommunityQuestProgress;
      }),
    [communityStreak, executiveRecapProgress, studioSessions],
  );

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

  const updateMentorSessions = useCallback(
    (updater: (current: MentorSessionRecord[]) => MentorSessionRecord[]) => {
      setMentorSessionMap((currentMap) => {
        const existing = currentMap[accountKey] ?? [];
        const updatedList = updater(existing);
        if (updatedList === existing) {
          return currentMap;
        }
        const updatedMap: MentorSessionMap = {
          ...currentMap,
          [accountKey]: updatedList,
        };
        persistMentorSessionMap(updatedMap);
        return updatedMap;
      });
    },
    [accountKey],
  );

  const updateStudioSessions = useCallback(
    (updater: (current: StudioSessionRecord[]) => StudioSessionRecord[]) => {
      setStudioSessionMap((currentMap) => {
        const existing = currentMap[accountKey] ?? [];
        const updatedList = updater(existing);
        if (updatedList === existing) {
          return currentMap;
        }
        const updatedMap: StudioSessionMap = {
          ...currentMap,
          [accountKey]: updatedList,
        };
        persistStudioSessionMap(updatedMap);
        return updatedMap;
      });
    },
    [accountKey],
  );

  const startMentorSession = useCallback(
    ({ mentorId, topic, scenarioId = null }: { mentorId: string; topic: string; scenarioId?: string | null }) => {
      let session: MentorSessionRecord | undefined;
      updateMentorSessions((current) => {
        const existing = current.find(
          (candidate) => candidate.mentorId === mentorId && (scenarioId ? candidate.scenarioId === scenarioId : candidate.topic === topic),
        );
        if (existing) {
          session = existing;
          return current;
        }
        const now = new Date().toISOString();
        const created: MentorSessionRecord = {
          id: generateId(),
          mentorId,
          topic,
          scenarioId,
          createdAt: now,
          updatedAt: now,
          messages: [],
          actionItems: [],
        };
        session = created;
        return [...current, created];
      });
      if (!session) {
        throw new Error("Unable to initialize mentor session");
      }
      return session;
    },
    [updateMentorSessions],
  );

  const recordMentorMessage = useCallback(
    (sessionId: string, message: MentorMessageRecord) => {
      let updatedSession: MentorSessionRecord | undefined;
      updateMentorSessions((current) => {
        const index = current.findIndex((entry) => entry.id === sessionId);
        if (index === -1) {
          return current;
        }
        const session = current[index];
        const normalizedMessage: MentorMessageRecord = {
          ...message,
          id: message.id.length > 0 ? message.id : generateId(),
          createdAt: message.createdAt || new Date().toISOString(),
          attachments: message.attachments?.map((attachment) => ({
            ...attachment,
            id: attachment.id.length > 0 ? attachment.id : generateId(),
          })),
        };
        const updated: MentorSessionRecord = {
          ...session,
          messages: [...session.messages, normalizedMessage],
          updatedAt: normalizedMessage.createdAt,
        };
        const next = [...current];
        next[index] = updated;
        updatedSession = updated;
        return next;
      });
      return updatedSession;
    },
    [updateMentorSessions],
  );

  const updateMentorActionItems = useCallback(
    (sessionId: string, actionItems: MentorActionItem[]) => {
      updateMentorSessions((current) => {
        const index = current.findIndex((entry) => entry.id === sessionId);
        if (index === -1) {
          return current;
        }
        const session = current[index];
        const normalized = actionItems.map((item) => ({
          ...item,
          id: item.id.length > 0 ? item.id : generateId(),
          dueAt: item.dueAt ?? null,
          completed: Boolean(item.completed),
        }));
        const updated: MentorSessionRecord = {
          ...session,
          actionItems: normalized,
          updatedAt: new Date().toISOString(),
        };
        const next = [...current];
        next[index] = updated;
        return next;
      });
    },
    [updateMentorSessions],
  );

  const toggleMentorActionItem = useCallback(
    (sessionId: string, actionItemId: string, completed: boolean) => {
      updateMentorSessions((current) => {
        const index = current.findIndex((entry) => entry.id === sessionId);
        if (index === -1) {
          return current;
        }
        const session = current[index];
        let changed = false;
        const actionItems = session.actionItems.map((item) => {
          if (item.id !== actionItemId) {
            return item;
          }
          if (item.completed === completed) {
            return item;
          }
          changed = true;
          return { ...item, completed } satisfies MentorActionItem;
        });
        if (!changed) {
          return current;
        }
        const updated: MentorSessionRecord = {
          ...session,
          actionItems,
          updatedAt: new Date().toISOString(),
        };
        const next = [...current];
        next[index] = updated;
        return next;
      });
    },
    [updateMentorSessions],
  );

  const startStudioSession = useCallback(
    ({ sceneId, pathId, courseId, title, facilitator, participants }: {
      sceneId: string;
      pathId: string;
      courseId: string;
      title: string;
      facilitator: string;
      participants: string[];
    }) => {
      const scene = getImmersiveScene(sceneId);
      if (!scene) {
        return null;
      }
      let created: StudioSessionRecord | null = null;
      const participantList = Array.from(new Set(participants.filter((participant) => participant.trim().length > 0)));
      if (participantList.length === 0) {
        participantList.push("Concierge AI");
      }
      updateStudioSessions((current) => {
        const existing = current.find((session) => session.sceneId === sceneId && session.pathId === pathId);
        if (existing) {
          created = existing;
          return current;
        }
        const now = new Date().toISOString();
        const timeline: StudioTimelineRecord[] = scene.timeline.map((event) => ({
          ...event,
          status: "pending",
          scheduledAt: null,
        }));
        const record: StudioSessionRecord = {
          id: generateId(),
          sceneId,
          pathId,
          courseId,
          title,
          facilitator,
          participants: participantList,
          createdAt: now,
          updatedAt: now,
          timeline,
          artifacts: [],
        };
        created = record;
        return [...current, record];
      });
      return created;
    },
    [updateStudioSessions],
  );

  const updateStudioTimelineStatus = useCallback(
    (sessionId: string, timelineId: string, status: StudioTimelineStatus) => {
      const allowed: StudioTimelineStatus[] = ["pending", "in_progress", "complete"];
      if (!allowed.includes(status)) {
        return;
      }
      updateStudioSessions((current) => {
        const index = current.findIndex((session) => session.id === sessionId);
        if (index === -1) {
          return current;
        }
        const session = current[index];
        let changed = false;
        const timeline = session.timeline.map((event) => {
          if (event.id !== timelineId) {
            return event;
          }
          if (event.status === status) {
            return event;
          }
          changed = true;
          return {
            ...event,
            status,
            scheduledAt: status === "pending" ? event.scheduledAt ?? null : event.scheduledAt ?? new Date().toISOString(),
          } satisfies StudioTimelineRecord;
        });
        if (!changed) {
          return current;
        }
        const updated: StudioSessionRecord = {
          ...session,
          timeline,
          updatedAt: new Date().toISOString(),
        };
        const next = [...current];
        next[index] = updated;
        return next;
      });
    },
    [updateStudioSessions],
  );

  const addStudioArtifact = useCallback(
    (sessionId: string, artifact: Omit<StudioArtifactRecord, "id" | "createdAt">) => {
      updateStudioSessions((current) => {
        const index = current.findIndex((session) => session.id === sessionId);
        if (index === -1) {
          return current;
        }
        const session = current[index];
        const record: StudioArtifactRecord = {
          id: generateId(),
          createdAt: new Date().toISOString(),
          ...artifact,
        };
        const updated: StudioSessionRecord = {
          ...session,
          artifacts: [...session.artifacts, record],
          updatedAt: record.createdAt,
        };
        const next = [...current];
        next[index] = updated;
        return next;
      });
    },
    [updateStudioSessions],
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
    const elitePathIds = learningPaths.filter((path) => path.tier === "Elite").map((path) => path.id);
    const eliteProgress = pathProgress
      .filter((progress) => elitePathIds.includes(progress.pathId))
      .reduce((max, progress) => Math.max(max, progress.percentage), 0);

    const now = Date.now();
    const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
    const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
    const completionsLast7Days = completionRecords.filter((record) => now - new Date(record.completedAt).getTime() <= sevenDaysMs).length;
    const completionsLast30Days = completionRecords.filter((record) => now - new Date(record.completedAt).getTime() <= thirtyDaysMs).length;

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
      {
        id: "elite-contender",
        title: "Elite Contender",
        description: "Progress halfway through an elite path to unlock concierge intensives.",
        requirementLabel: "50% elite path progress",
        current: eliteProgress,
        target: 50,
        earned: eliteProgress >= 50,
        progress: Math.min(1, eliteProgress / 50) || 0,
      },
      {
        id: "momentum-keeper",
        title: "Momentum Keeper",
        description: "Complete three courses in a 30-day window to maintain your cadence.",
        requirementLabel: "3 completions in 30 days",
        current: completionsLast30Days,
        target: 3,
        earned: completionsLast30Days >= 3,
        progress: Math.min(1, completionsLast30Days / 3) || 0,
      },
      {
        id: "weekly-rhythm",
        title: "Weekly Rhythm",
        description: "Log a completion every week to stay aligned with coaching prompts.",
        requirementLabel: "1 completion this week",
        current: completionsLast7Days,
        target: 1,
        earned: completionsLast7Days >= 1,
        progress: Math.min(1, completionsLast7Days / 1) || 0,
      },
    ];

    return definitions.map((definition) => ({ ...definition }));
  }, [completedCourses, completionRecords, pathProgress]);

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
      mentorSessions,
      startMentorSession,
      recordMentorMessage,
      updateMentorActionItems,
      toggleMentorActionItem,
      studioSessions,
      startStudioSession,
      updateStudioTimelineStatus,
      addStudioArtifact,
      communityStreak,
      communityQuests,
    }),
    [
      achievements,
      completedCourses,
      completionRecords,
      isCourseCompleted,
      markCourseCompleted,
      pathProgress,
      pathProgressMap,
      mentorSessions,
      recordMentorMessage,
      startMentorSession,
      toggleCourseCompleted,
      toggleMentorActionItem,
      unmarkCourseCompleted,
      updateMentorActionItems,
      communityStreak,
      communityQuests,
      studioSessions,
      startStudioSession,
      updateStudioTimelineStatus,
      addStudioArtifact,
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
