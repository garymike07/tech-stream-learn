import { mentorPersonaMap } from "@/data/mentors";

export type MentorMessagePayload = {
  role: "user" | "mentor" | "system";
  content: string;
  sentiment?: "accelerate" | "stabilize" | "celebrate" | "neutral";
};

export type MentorAttachmentSummary = {
  name: string;
  size: number;
  type: string;
};

export type MentorExchangeRequest = {
  mentorId: string;
  topic: string;
  scenarioId?: string | null;
  messages: MentorMessagePayload[];
  attachments?: MentorAttachmentSummary[];
  profile?: {
    name: string;
    email: string;
  } | null;
};

export type MentorActionItemPayload = {
  id: string;
  label: string;
  dueAt: string | null;
};

export type MentorExchangeResponse = {
  reply: MentorMessagePayload;
  actionItems: MentorActionItemPayload[];
};

const DEFAULT_API_URL = typeof import.meta !== "undefined" ? (import.meta.env?.VITE_MENTOR_API_URL as string | undefined) : undefined;

const createId = () => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2, 10);
};

const addDaysIso = (days: number) => {
  const timestamp = Date.now() + days * 24 * 60 * 60 * 1000;
  return new Date(timestamp).toISOString();
};

const buildStubActionItems = (topic: string): MentorActionItemPayload[] => {
  const trimmedTopic = topic.trim() || "this focus area";
  return [
    {
      id: createId(),
      label: `Define success metrics for ${trimmedTopic}.`,
      dueAt: addDaysIso(3),
    },
    {
      id: createId(),
      label: `Schedule a sync with stakeholders to review ${trimmedTopic}.`,
      dueAt: addDaysIso(7),
    },
  ];
};

const buildStubReply = (request: MentorExchangeRequest): MentorExchangeResponse => {
  const persona = mentorPersonaMap.get(request.mentorId);
  const fallbackName = persona?.name ?? "your mentor";
  const topic = request.topic || "your objectives";
  const lastUserMessage = [...request.messages].reverse().find((message) => message.role === "user");
  const attachmentsLabel = request.attachments && request.attachments.length > 0 ? ` I reviewed the ${request.attachments.length} attachment${request.attachments.length === 1 ? "" : "s"} you included.` : "";

  const sentiment: MentorMessagePayload["sentiment"] = (() => {
    if (!persona) return "neutral";
    switch (persona.tone) {
      case "direct":
        return "stabilize";
      case "empathetic":
        return "celebrate";
      case "visionary":
      case "strategic":
      default:
        return "accelerate";
    }
  })();

  const reply = {
    role: "mentor" as const,
    sentiment,
    content: `${fallbackName} here. Let’s focus on ${topic}. ${lastUserMessage?.content ?? "I see you’re looking for guidance."} ${attachmentsLabel} I recommend you outline the impact, risks, and immediate next steps so your team stays aligned. I will check back once you log the action items below.`,
  } satisfies MentorMessagePayload;

  return {
    reply,
    actionItems: buildStubActionItems(topic),
  } satisfies MentorExchangeResponse;
};

export const requestMentorExchange = async (request: MentorExchangeRequest, apiUrl: string | undefined = DEFAULT_API_URL): Promise<MentorExchangeResponse> => {
  const endpoint = apiUrl?.trim();
  if (endpoint) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
      });
      if (!response.ok) {
        throw new Error(`Mentor API responded with status ${response.status}`);
      }
      const payload = (await response.json()) as Partial<MentorExchangeResponse>;
      const reply = payload.reply && payload.reply.content ? payload.reply : null;
      const actionItems = Array.isArray(payload.actionItems)
        ? payload.actionItems
            .map((item) => {
              if (!item || typeof item !== "object") return null;
              const id = typeof item.id === "string" && item.id.length > 0 ? item.id : createId();
              const label = typeof item.label === "string" && item.label.length > 0 ? item.label : null;
              if (!label) return null;
              const dueAt = typeof item.dueAt === "string" ? item.dueAt : null;
              return { id, label, dueAt } satisfies MentorActionItemPayload;
            })
            .filter((entry): entry is MentorActionItemPayload => Boolean(entry))
        : buildStubActionItems(request.topic);

      if (reply) {
        return { reply, actionItems } satisfies MentorExchangeResponse;
      }
    } catch (error) {
      console.warn("Falling back to stub mentor response", error);
    }
  }

  return buildStubReply(request);
};
