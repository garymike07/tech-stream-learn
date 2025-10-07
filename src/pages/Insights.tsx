import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import CommunityLeaderboard from "@/components/community/Leaderboard";
import SpotlightCard from "@/components/community/SpotlightCard";
import CertificateTemplate from "@/components/certificates/CertificateTemplate";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { categories, courses } from "@/data/courses";
import { learningPaths } from "@/data/learningPaths";
import { communityLeaderboards, communitySpotlights, executiveShoutouts } from "@/data/communitySignals";
import { mentorPersonas, mentorPersonaMap } from "@/data/mentors";
import { useAuth } from "@/context/AuthContext";
import { useProgress } from "@/context/ProgressContext";
import type { MentorActionItem, MentorMessageRecord, MentorSessionRecord } from "@/context/ProgressContext";
import { buildCourseRecommendations, buildPathRecommendations } from "@/utils/recommendations";
import { downloadCertificate } from "@/utils/certificates";
import { requestMentorExchange } from "@/utils/mentorClient";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Activity,
  ArrowRight,
  Award,
  Bell,
  Bot,
  Calendar,
  Compass,
  Copy,
  Download,
  FileDown,
  Flame,
  Loader2,
  Lock,
  MessageCircle,
  Megaphone,
  Paperclip,
  Send,
  Share2,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
  Target,
  TrendingUp,
  UploadCloud,
  X,
} from "lucide-react";
import { useTranslation } from "@/context/LocaleContext";

const categoryLabelMap = new Map(categories.map((category) => [category.id, category.name]));

const sentimentStyles: Record<NonNullable<MentorMessageRecord["sentiment"]>, { label: string; className: string }> = {
  accelerate: { label: "Momentum boost", className: "bg-emerald-500/15 text-emerald-500" },
  stabilize: { label: "Course correct", className: "bg-amber-500/15 text-amber-500" },
  celebrate: { label: "Celebrate", className: "bg-sky-500/15 text-sky-500" },
  neutral: { label: "Insight", className: "bg-muted text-muted-foreground" },
};

const createLocalId = () => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2, 10);
};

const Insights = () => {
  const { user, enrollments, subscriptionStatus } = useAuth();
  const {
    completedCourses,
    completionRecords,
    pathProgress,
    achievements,
    mentorSessions,
    startMentorSession,
    recordMentorMessage,
    updateMentorActionItems,
    toggleMentorActionItem,
    communityStreak,
    communityQuests,
    certificates,
    certificateLedger,
  } = useProgress();
  const { t } = useTranslation();

  const [mentorDrawerOpen, setMentorDrawerOpen] = useState(false);
  const [activeMentorId, setActiveMentorId] = useState<string | null>(null);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [selectedScenarioId, setSelectedScenarioId] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isSending, setIsSending] = useState(false);

  const streak = communityStreak.current;
  const longestStreak = communityStreak.longest;
  const completionsLast7Days = communityStreak.completionsThisWeek;
  const completionsLastWeek = communityStreak.completionsLastWeek;
  const cadenceDelta = communityStreak.cadenceDelta;
  const streakActiveSince = communityStreak.activeSince ? new Date(communityStreak.activeSince) : null;
  const lastCompletionAt = communityStreak.lastCompletionAt ? new Date(communityStreak.lastCompletionAt) : null;

  const lastCompletionLabel = useMemo(() => {
    if (completionRecords.length === 0) return "—";
    const latest = completionRecords[0];
    const course = courses.find((candidate) => candidate.id === latest.courseId);
    const courseTitle = course?.title ?? latest.courseId;
    return `${courseTitle} • ${format(new Date(latest.completedAt), "PP")}`;
  }, [completionRecords]);

  const streakActiveSinceLabel = streakActiveSince ? format(streakActiveSince, "PP") : "—";
  const lastCompletionDateLabel = lastCompletionAt ? format(lastCompletionAt, "PP") : "—";
  const questHighlights = useMemo(() => communityQuests.slice(0, 3), [communityQuests]);
  const cadenceDeltaLabel = cadenceDelta >= 0 ? `+${cadenceDelta}` : `${cadenceDelta}`;
  const streakProgress = longestStreak > 0 ? Math.min(100, (streak / longestStreak) * 100) : 0;

  const accessibleTiers = useMemo(() => {
    if (subscriptionStatus === "premium") return ["pro", "elite"] as const;
    if (subscriptionStatus === "trial") return ["pro"] as const;
    return [] as const;
  }, [subscriptionStatus]);

  const mentorSessionLookup = useMemo(() => {
    const map = new Map<string, MentorSessionRecord>();
    mentorSessions.forEach((session) => {
      const existing = map.get(session.mentorId);
      if (!existing) {
        map.set(session.mentorId, session);
        return;
      }
      if (new Date(session.updatedAt).getTime() > new Date(existing.updatedAt).getTime()) {
        map.set(session.mentorId, session);
      }
    });
    return map;
  }, [mentorSessions]);

  const activePersona = activeMentorId ? mentorPersonaMap.get(activeMentorId) ?? null : null;

  const activeSession = useMemo(
    () => (activeSessionId ? mentorSessions.find((session) => session.id === activeSessionId) ?? null : null),
    [mentorSessions, activeSessionId],
  );

  const hasMentorAccess = accessibleTiers.length > 0;

  const handleDrawerOpenChange = useCallback((open: boolean) => {
    setMentorDrawerOpen(open);
    if (!open) {
      setActiveMentorId(null);
      setActiveSessionId(null);
      setSelectedScenarioId(null);
      setMessageInput("");
      setAttachments([]);
      setIsSending(false);
    }
  }, []);

  const handleOpenMentor = useCallback(
    (mentorId: string, scenarioId?: string | null) => {
      const persona = mentorPersonaMap.get(mentorId);
      if (!persona) return;
      const scenario = scenarioId ? persona.scenarioPresets.find((preset) => preset.id === scenarioId) : undefined;
      const topic = scenario ? scenario.label : persona.tagline;
      const session = startMentorSession({ mentorId, topic, scenarioId: scenario?.id ?? null });
      setActiveMentorId(mentorId);
      setActiveSessionId(session.id);
      setMentorDrawerOpen(true);
      if (scenario) {
        setSelectedScenarioId(scenario.id);
        if (session.messages.length === 0) {
          setMessageInput(scenario.prompt);
        }
      } else {
        setSelectedScenarioId(null);
        if (session.messages.length === 0) {
          setMessageInput("");
        }
      }
      setAttachments([]);
    },
    [startMentorSession],
  );

  const handleScenarioPreset = useCallback(
    (scenarioId: string) => {
      if (!activeMentorId) return;
      const persona = mentorPersonaMap.get(activeMentorId);
      if (!persona) return;
      const scenario = persona.scenarioPresets.find((preset) => preset.id === scenarioId);
      if (!scenario) return;
      setSelectedScenarioId(scenarioId);
      setMessageInput(scenario.prompt);
    },
    [activeMentorId],
  );

  const handleFileChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    if (files.length === 0) {
      return;
    }
    setAttachments((current) => [...current, ...files].slice(0, 3));
    event.target.value = "";
  }, []);

  const handleRemoveAttachment = useCallback((index: number) => {
    setAttachments((current) => current.filter((_, position) => position !== index));
  }, []);

  const handleSendMessage = useCallback(async () => {
    if (!activeMentorId || !activeSessionId) return;
    const trimmed = messageInput.trim();
    if (trimmed.length === 0 && attachments.length === 0) return;

    const currentSession = activeSession ?? mentorSessions.find((session) => session.id === activeSessionId) ?? null;
    if (!currentSession) return;

    const attachmentRecords = attachments.map((file) => ({
      id: createLocalId(),
      name: file.name,
      size: file.size,
      type: file.type,
    }));

    const content = trimmed.length > 0 ? trimmed : `Uploaded ${attachments.length} attachment${attachments.length === 1 ? "" : "s"}.`;
    const userMessage: MentorMessageRecord = {
      id: createLocalId(),
      role: "user",
      content,
      createdAt: new Date().toISOString(),
      attachments: attachmentRecords,
    };

    setIsSending(true);

    const updatedSession = recordMentorMessage(activeSessionId, userMessage) ?? {
      ...currentSession,
      messages: [...currentSession.messages, userMessage],
    };

    try {
      const response = await requestMentorExchange({
        mentorId: activeMentorId,
        topic: updatedSession.topic,
        scenarioId: updatedSession.scenarioId ?? undefined,
        messages: updatedSession.messages.map((message) => ({
          role: message.role,
          content: message.content,
          sentiment: message.sentiment,
        })),
        attachments: attachments.map((file) => ({ name: file.name, size: file.size, type: file.type })),
        profile: user ? { name: user.fullName, email: user.email } : null,
      });

      const mentorMessage: MentorMessageRecord = {
        id: createLocalId(),
        role: "mentor",
        content: response.reply.content,
        createdAt: new Date().toISOString(),
        sentiment: response.reply.sentiment ?? "neutral",
      };

      recordMentorMessage(activeSessionId, mentorMessage);

      if (response.actionItems.length > 0) {
        const existingMap = new Map(activeSession?.actionItems.map((item) => [item.id, item]));
        const normalized: MentorActionItem[] = response.actionItems.map((item) => {
          const previous = existingMap.get(item.id);
          return {
            id: item.id,
            label: item.label,
            dueAt: item.dueAt ?? null,
            completed: previous?.completed ?? false,
          } satisfies MentorActionItem;
        });
        updateMentorActionItems(activeSessionId, normalized);
      }

      setMessageInput("");
      setAttachments([]);

      const persona = mentorPersonaMap.get(activeMentorId);
      toast({
        title: persona ? `${persona.name} replied` : "Mentor replied",
        description: "Fresh guidance and action items are waiting in this session.",
      });
    } catch (error) {
      console.error("Failed to fetch mentor response", error);
      toast({
        title: "Mentor unavailable",
        description: "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  }, [
    activeMentorId,
    activeSession,
    activeSessionId,
    attachments,
    messageInput,
    mentorSessions,
    recordMentorMessage,
    updateMentorActionItems,
    user,
  ]);

  const isSendDisabled = isSending || (messageInput.trim().length === 0 && attachments.length === 0);

  const handleToggleActionItem = useCallback(
    (actionItemId: string, completed: boolean) => {
      if (!activeSessionId) return;
      toggleMentorActionItem(activeSessionId, actionItemId, completed);
    },
    [activeSessionId, toggleMentorActionItem],
  );

  const categoryStats = useMemo(() => {
    const counts = new Map<string, number>();
    completionRecords.forEach((record) => {
      const course = courses.find((candidate) => candidate.id === record.courseId);
      if (!course) return;
      counts.set(course.category, (counts.get(course.category) ?? 0) + 1);
    });
    return counts;
  }, [completionRecords]);

  const categoryCoverage = useMemo(() => {
    const covered = categoryStats.size;
    if (categories.length === 0) return 0;
    return Math.round((covered / categories.length) * 100);
  }, [categoryStats]);

  const mostActiveCategory = useMemo(() => {
    let activeCategory: string | null = null;
    let max = 0;
    categoryStats.forEach((count, categoryId) => {
      if (count > max) {
        max = count;
        activeCategory = categoryId;
      }
    });
    if (!activeCategory) return "—";
    return categoryLabelMap.get(activeCategory) ?? activeCategory;
  }, [categoryStats]);

  const courseRecommendations = useMemo(
    () => buildCourseRecommendations({ completedCourseIds: completedCourses, enrollments, pathProgress }),
    [completedCourses, enrollments, pathProgress],
  );

  const pathRecommendations = useMemo(() => buildPathRecommendations(pathProgress), [pathProgress]);

  const leadingPathProgress = useMemo(() => {
    if (pathProgress.length === 0) return null;
    return [...pathProgress].sort((a, b) => b.percentage - a.percentage)[0];
  }, [pathProgress]);

  const leadingPathDefinition = useMemo(() => {
    if (!leadingPathProgress) return null;
    return learningPaths.find((path) => path.id === leadingPathProgress.pathId) ?? null;
  }, [leadingPathProgress]);

  const eliteProgressDetails = useMemo(
    () =>
      learningPaths
        .filter((path) => path.tier === "Elite")
        .map((path) => ({
          path,
          progress: pathProgress.find((entry) => entry.pathId === path.id) ?? null,
        })),
    [pathProgress],
  );

  const upcomingCohorts = useMemo(() => {
    return learningPaths
      .flatMap((path) =>
        (path.cohortWindows ?? []).map((window) => ({
          ...window,
          pathTitle: path.title,
          tier: path.tier,
        })),
      )
      .sort((a, b) => new Date(a.starts).getTime() - new Date(b.starts).getTime())
      .slice(0, 3);
  }, []);

  const aiMentorPrompts = useMemo(() => {
    const prompts = [] as Array<{ id: string; title: string; description: string; action: string }>;

    if (completionsLast7Days === 0) {
      prompts.push({
        id: "cadence-reset",
        title: "Refocus your cadence",
        description: "No completions logged this week. Protect a 90-minute deep work block to rebuild momentum.",
        action: "Block deep work",
      });
    }

    const activeElite = eliteProgressDetails.find((entry) => entry.progress && entry.progress.percentage > 0);
    if (activeElite?.progress) {
      const { path, progress } = activeElite;
      const remaining = Math.max(0, 100 - progress.percentage);
      prompts.push({
        id: "elite-check-in",
        title: `${path.title} concierge checkpoint`,
        description: `You are ${progress.percentage}% through this elite track. Share blockers with your concierge to accelerate the remaining ${remaining}% milestone.`,
        action: "Message concierge",
      });
    }

    if (leadingPathDefinition?.spotlightProjects?.length) {
      const nextSpotlight = leadingPathDefinition.spotlightProjects[0];
      prompts.push({
        id: "spotlight-readiness",
        title: `${nextSpotlight.title} rehearsal`,
        description: `Draft the narrative for “${nextSpotlight.outcome}” and gather proof points before your next executive playback.`,
        action: "Open spotlight brief",
      });
    }

    return prompts;
  }, [completionsLast7Days, eliteProgressDetails, leadingPathDefinition]);

  const upcomingAchievement = useMemo(() => achievements.find((achievement) => !achievement.earned && achievement.progress > 0)?.title ?? null, [achievements]);

  const notificationFeed = useMemo(() => {
    const feed = [] as Array<{ id: string; title: string; description: string; meta: string }>;
    const cohort = upcomingCohorts[0];
    if (cohort) {
      feed.push({
        id: `cohort-${cohort.id}`,
        title: `${cohort.pathTitle} cohort starting ${format(new Date(cohort.starts), "PP")}`,
        description: cohort.focus,
        meta: `${cohort.format} • ${cohort.tier}`,
      });
    }
    if (upcomingAchievement) {
      feed.push({
        id: "achievement",
        title: `${upcomingAchievement} is within reach`,
        description: "Stay on cadence to unlock your next badge and concierge celebration call.",
        meta: "Achievement milestone",
      });
    }
    if (streak > 0) {
      feed.push({
        id: "streak",
        title: `Streak: ${streak} day${streak === 1 ? "" : "s"}`,
        description: "Keep your momentum with a quick lesson recap today.",
        meta: "Momentum",
      });
    }
    return feed;
  }, [upcomingCohorts, upcomingAchievement, streak]);

  const handleShare = async () => {
    const snapshot = [
      `${t("insights.hero.shareFallback")}: ${completedCourses.length} courses`,
      `${t("insights.analytics.streak")}: ${streak} days`,
      `${t("insights.analytics.weekly")}: ${completionsLast7Days}`,
      `${t("insights.analytics.coverage")}: ${categoryCoverage}%`,
    ].join(" • ");

    try {
      await navigator.clipboard?.writeText(snapshot);
      toast({ title: t("insights.hero.shareSuccess") });
    } catch (error) {
      console.error("Failed to copy progress snapshot", error);
      toast({ title: t("insights.hero.shareFallback"), description: snapshot });
    }
  };

  const handleDownloadBrief = useCallback(() => {
    const lines = [
      "Concierge executive briefing",
      `Learner: ${user?.fullName ?? "Member"}`,
      `Active streak: ${streak} days (record ${longestStreak})`,
      `Weekly completions: ${completionsLast7Days} vs ${completionsLastWeek} (${cadenceDeltaLabel})`,
      `Cadence delta: ${cadenceDeltaLabel}`,
      `Category coverage: ${categoryCoverage}%`,
      `Latest completion: ${lastCompletionLabel}`,
    ];

    try {
      const blob = new Blob([lines.join("\n")], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `concierge-brief-${format(new Date(), "yyyy-MM-dd")}.txt`;
      anchor.click();
      URL.revokeObjectURL(url);
      toast({ title: "Executive briefing exported" });
    } catch (error) {
      console.error("Failed to export executive briefing", error);
      toast({ title: "Download unavailable", description: lines.join(" • ") });
    }
  }, [
    cadenceDeltaLabel,
    categoryCoverage,
    completionsLast7Days,
    completionsLastWeek,
    lastCompletionLabel,
    longestStreak,
    streak,
    user,
  ]);

  const certificateCount = certificates.length;
  const latestCertificate = useMemo(() => (certificates.length > 0 ? certificates[0] : null), [certificates]);
  const latestCertificateIssuedLabel = latestCertificate ? format(new Date(latestCertificate.issuedAt), "PP") : null;
  const certificateLedgerPreview = useMemo(() => certificateLedger.slice(0, 5), [certificateLedger]);

  const handleDownloadLatestCertificate = useCallback(
    async (format: "png" | "svg") => {
      if (!latestCertificate) {
        toast({
          title: "No certificate available",
          description: "Complete a concierge course to unlock credential downloads.",
          variant: "destructive",
        });
        return;
      }

      try {
        await downloadCertificate(latestCertificate, { format });
        toast({
          title: `Certificate exported`,
          description: `${format.toUpperCase()} saved for ${latestCertificate.title}.`,
        });
      } catch (error) {
        console.error("Failed to export latest certificate", error);
        toast({
          title: "Export unavailable",
          description: "We could not render the certificate. Please retry shortly.",
          variant: "destructive",
        });
      }
    },
    [latestCertificate],
  );

  const handleCopyLatestCertificateLink = useCallback(async () => {
    if (!latestCertificate) {
      toast({
        title: "No certificate to share",
        description: "Earn a credential to unlock verification sharing.",
        variant: "destructive",
      });
      return;
    }

    try {
      if (typeof window === "undefined" || !navigator.clipboard) {
        throw new Error("Clipboard unavailable");
      }
      const url = `${window.location.origin}/certificates/verify?code=${latestCertificate.verificationCode}`;
      await navigator.clipboard.writeText(url);
      toast({ title: "Verification link copied", description: latestCertificate.verificationCode });
    } catch (error) {
      console.error("Failed to copy certificate verification link", error);
      toast({
        title: "Copy unavailable",
        description: "Your browser blocked clipboard access.",
        variant: "destructive",
      });
    }
  }, [latestCertificate]);

  const cohortSuggestions = useMemo(() => {
    const suggestions = [] as Array<{ id: string; labelKey: string; description: string }>;
    if (categoryStats.get("frontend")) {
      suggestions.push({
        id: "frontend",
        labelKey: "insights.cohorts.labels.frontend",
        description: "Ship design-system sprints with fellow UI engineers and share weekly reviews.",
      });
    }
    if (categoryStats.get("backend")) {
      suggestions.push({
        id: "backend",
        labelKey: "insights.cohorts.labels.backend",
        description: "Pair with platform engineers tackling resilient API rollouts and observability playbooks.",
      });
    }
    if (categoryStats.get("ai-engineering")) {
      suggestions.push({
        id: "ai",
        labelKey: "insights.cohorts.labels.ai",
        description: "Co-design evaluation dashboards and prompt experiments with applied AI builders.",
      });
    }
    if (categoryStats.get("cloud") || categoryStats.get("devops-sre")) {
      suggestions.push({
        id: "cloud",
        labelKey: "insights.cohorts.labels.cloud",
        description: "Trade multi-cloud reliability playbooks and FinOps benchmarks every Friday.",
      });
    }
    return suggestions;
  }, [categoryStats]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-4 py-12 space-y-10">
        <section className="glass-panel glass-panel-strong relative overflow-hidden border border-border/45 p-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-secondary/15" />
          <div className="relative z-10 space-y-6">
            <Badge variant="outline" className="border-primary/40 text-primary">
              <TrendingUp className="mr-2 h-3.5 w-3.5" />
              {t("nav.insights")}
            </Badge>
            <h1 className="text-4xl font-bold md:text-5xl">{t("insights.hero.title")}</h1>
            <p className="text-lg text-muted-foreground md:max-w-3xl">{t("insights.hero.subtitle")}</p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button onClick={handleShare} className="shadow-glow">
                <Share2 className="mr-2 h-4 w-4" />
                {t("insights.hero.shareCta")}
              </Button>
              <Button
                variant="outline"
                onClick={handleDownloadBrief}
                className="border-border/40 bg-background/40 backdrop-blur transition hover:border-secondary/50 hover:text-secondary"
              >
                <Download className="mr-2 h-4 w-4" /> Executive brief
              </Button>
              {user ? <p className="text-sm text-muted-foreground">{user.fullName}</p> : null}
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <Card className="glass-panel border border-border/45">
            <CardHeader className="space-y-3">
              <Badge variant="outline" className="border-primary/40 text-primary">
                <ShieldCheck className="mr-2 h-3.5 w-3.5" /> Executive credentials
              </Badge>
              <CardTitle className="text-2xl font-semibold">Certification status</CardTitle>
              <CardDescription>Preview your latest concierge credential and unlock high-fidelity downloads.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {latestCertificate ? (
                <>
                  <div className="rounded-3xl border border-border/40 bg-card/40 p-4 shadow-lg">
                    <CertificateTemplate certificate={latestCertificate} width={640} height={452} className="w-full" />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-border/35 bg-background/60 p-4">
                      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Credential</p>
                      <p className="mt-2 text-sm font-semibold text-foreground">{latestCertificate.title}</p>
                      <p className="mt-1 text-xs text-muted-foreground">Issued {latestCertificateIssuedLabel}</p>
                    </div>
                    <div className="rounded-2xl border border-border/35 bg-background/60 p-4">
                      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Verification code</p>
                      <p className="mt-2 text-sm font-semibold text-foreground">{latestCertificate.verificationCode}</p>
                      <Badge variant="outline" className="mt-3 border-secondary/40 text-secondary">
                        Tier {latestCertificate.tier}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Button className="shadow-glow" onClick={() => handleDownloadLatestCertificate("png")}>
                      <Download className="mr-2 h-4 w-4" /> Download PNG
                    </Button>
                    <Button variant="outline" className="border-border/40" onClick={() => handleDownloadLatestCertificate("svg")}>
                      <FileDown className="mr-2 h-4 w-4" /> Download SVG
                    </Button>
                    <Button variant="outline" className="border-border/40" onClick={handleCopyLatestCertificateLink}>
                      <Copy className="mr-2 h-4 w-4" /> Copy verification link
                    </Button>
                    <Button variant="ghost" asChild>
                      <Link to="/certificates" className="inline-flex items-center gap-2">
                        <Award className="h-4 w-4" /> Open certificate vault
                      </Link>
                    </Button>
                  </div>
                </>
              ) : (
                <div className="rounded-2xl border border-dashed border-border/50 bg-background/40 p-6 text-sm text-muted-foreground">
                  <p className="font-semibold text-foreground">No concierge certificates yet</p>
                  <p className="mt-2">
                    Complete your next guided course to mint an executive certificate with shareable verification.
                  </p>
                  <Button asChild className="mt-4 shadow-glow">
                    <Link to="/paths">Browse guided paths</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="glass-panel border border-border/45">
            <CardHeader className="space-y-3">
              <Badge variant="outline" className="border-secondary/40 text-secondary">
                <Award className="mr-2 h-3.5 w-3.5" /> Verification ledger
              </Badge>
              <CardTitle className="text-2xl font-semibold">Ledger insights</CardTitle>
              <CardDescription>Latest credentials recorded for external validation across your account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-2xl border border-border/35 bg-background/60 p-4">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  <span>Issued credentials</span>
                  <span>Ledger records</span>
                </div>
                <div className="mt-3 flex items-end justify-between">
                  <p className="text-3xl font-semibold text-foreground">{certificateCount}</p>
                  <p className="text-sm text-muted-foreground">{certificateLedger.length}</p>
                </div>
              </div>

              <div className="space-y-3">
                {certificateLedgerPreview.length > 0 ? (
                  certificateLedgerPreview.map((entry) => (
                    <div key={`${entry.verificationCode}-${entry.id}`} className="rounded-2xl border border-border/35 bg-background/55 p-4">
                      <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                        <span>{entry.verificationCode}</span>
                        <span>{format(new Date(entry.issuedAt), "PP")}</span>
                      </div>
                      <p className="mt-2 text-sm font-semibold text-foreground">{entry.title}</p>
                      <p className="text-xs text-muted-foreground">{entry.recipientName}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">Ledger entries appear here once certificates are issued.</p>
                )}
              </div>

              <div className="flex flex-wrap gap-3">
                <Button asChild variant="outline" className="border-border/40">
                  <Link to="/certificates">View certificate vault</Link>
                </Button>
                <Button asChild variant="ghost">
                  <Link to="/certificates/verify">Open verification portal</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.4fr_minmax(0,1fr)]">
          <Card className="glass-panel border border-border/45">
            <CardHeader className="space-y-3">
              <Badge variant="outline" className="border-primary/40 text-primary">
                <Users className="mr-2 h-3.5 w-3.5" /> Community pulse
              </Badge>
              <CardTitle className="text-2xl font-semibold">Concierge cadence outlook</CardTitle>
              <CardDescription>Executive momentum signals across streaks, completions, and cadence stability.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Streak health</p>
                <Progress value={streakProgress} className="mt-3 h-2" />
                <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{streak} day streak</span>
                  <span>Record {longestStreak}</span>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-border/35 bg-background/60 p-4 backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Weekly cadence</p>
                  <p className="mt-2 text-2xl font-semibold text-foreground">{completionsLast7Days}</p>
                  <p className={`mt-1 text-xs ${cadenceDelta >= 0 ? "text-emerald-500" : "text-rose-500"}`}>
                    {cadenceDeltaLabel} vs last week ({completionsLastWeek})
                  </p>
                </div>
                <div className="rounded-2xl border border-border/35 bg-background/60 p-4 backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Latest completion</p>
                  <p className="mt-2 text-sm font-medium text-foreground">{lastCompletionLabel}</p>
                  <p className="mt-1 text-xs text-muted-foreground">Recorded {lastCompletionDateLabel}</p>
                </div>
              </div>
              <div className="rounded-2xl border border-border/35 bg-background/60 p-4 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Active since</p>
                <p className="mt-2 text-sm font-medium text-foreground">{streakActiveSinceLabel}</p>
                <p className="mt-1 text-xs text-muted-foreground">Cadence delta {cadenceDeltaLabel}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel border border-border/45">
            <CardHeader className="space-y-3">
              <Badge variant="outline" className="border-secondary/40 text-secondary">
                <Sparkles className="mr-2 h-3.5 w-3.5" /> Weekly quests
              </Badge>
              <CardTitle className="text-2xl font-semibold">Concierge rituals in play</CardTitle>
              <CardDescription>Track concierge quests fueling prestige, spotlights, and executive readiness.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {questHighlights.length > 0 ? (
                questHighlights.map((quest) => {
                  const completionPercent = quest.target === 0 ? 0 : Math.min(100, (quest.progress / quest.target) * 100);
                  return (
                    <div key={quest.id} className="rounded-2xl border border-border/35 bg-background/55 p-4 backdrop-blur">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-base font-semibold text-foreground">{quest.title}</h3>
                          <p className="text-sm text-muted-foreground">{quest.description}</p>
                        </div>
                        <Badge variant="outline" className="border-secondary/40 text-secondary">
                          {quest.reward}
                        </Badge>
                      </div>
                      <Progress value={completionPercent} className="mt-4 h-2" />
                      <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                        <span>
                          {quest.progress}/{quest.target} rituals
                        </span>
                        <span>{Math.round(completionPercent)}%</span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-sm text-muted-foreground">Unlock community quests by logging concierge sessions and studio rehearsals.</p>
              )}
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          <Card className="glass-panel border border-border/45">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Flame className="h-4 w-4 text-primary" />
                {t("insights.analytics.streak")}
              </CardTitle>
              <CardDescription>{t("insights.analytics.lastCompletion", { args: [lastCompletionLabel] })}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-semibold text-primary">{streak}</p>
            </CardContent>
          </Card>

          <Card className="glass-panel border border-border/45">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Activity className="h-4 w-4 text-primary" />
                {t("insights.analytics.weekly")}
              </CardTitle>
              <CardDescription>{t("insights.analytics.completedThisWeek", { args: [completionsLast7Days] })}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-semibold text-primary">{completionsLast7Days}</p>
            </CardContent>
          </Card>

          <Card className="glass-panel border border-border/45">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Compass className="h-4 w-4 text-primary" />
                {t("insights.analytics.coverage")}
              </CardTitle>
              <CardDescription>{t("insights.analytics.mostActiveCategory", { args: [mostActiveCategory] })}</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={categoryCoverage} className="h-2" />
              <p className="mt-2 text-sm text-muted-foreground">{categoryCoverage}%</p>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-6">
          <div className="space-y-2">
            <Badge variant="outline" className="w-fit border-primary/40 text-primary">
              <Trophy className="mr-2 h-3.5 w-3.5" /> Leaderboards
            </Badge>
            <div>
              <h2 className="text-2xl font-semibold text-foreground">Community leaderboards</h2>
              <p className="text-sm text-muted-foreground">
                Concierge telemetry on velocity, streak resilience, and executive readiness across the cohort.
              </p>
            </div>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {communityLeaderboards.map((leaderboard) => (
              <CommunityLeaderboard key={leaderboard.id} leaderboard={leaderboard} />
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.6fr_minmax(0,1fr)]">
          <div className="space-y-4">
            <Badge variant="outline" className="w-fit border-secondary/40 text-secondary">
              <Sparkles className="mr-2 h-3.5 w-3.5" /> Executive spotlights
            </Badge>
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-foreground">Immersive spotlights</h2>
              <p className="text-sm text-muted-foreground">
                Weekly showcases from XR studios and concierge rehearsals primed for executive playback.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {communitySpotlights.map((spotlight) => (
                <SpotlightCard key={spotlight.id} spotlight={spotlight} />
              ))}
            </div>
          </div>

          <Card className="glass-panel border border-border/45">
            <CardHeader className="space-y-3">
              <Badge variant="outline" className="border-primary/40 text-primary">
                <Megaphone className="mr-2 h-3.5 w-3.5" /> Executive shoutouts
              </Badge>
              <CardTitle className="text-2xl font-semibold">Concierge testimonials</CardTitle>
              <CardDescription>Leadership voices amplifying outcomes born from your learning studio.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {executiveShoutouts.map((shoutout) => (
                <blockquote key={shoutout.id} className="rounded-2xl border border-border/35 bg-background/55 p-5 backdrop-blur">
                  <p className="text-sm font-medium text-foreground">{shoutout.statement}</p>
                  <div className="mt-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">{shoutout.persona}</div>
                  <div className="text-xs text-muted-foreground">{shoutout.focus}</div>
                </blockquote>
              ))}
            </CardContent>
          </Card>
        </section>

        <section>
          <Card className="glass-panel border border-border/45">
            <CardHeader className="space-y-4">
              <Badge variant="outline" className="border-primary/40 text-primary">
                <MessageCircle className="mr-2 h-3.5 w-3.5" /> Concierge mentorship
              </Badge>
              <CardTitle className="text-2xl font-semibold">Executive-grade AI mentors on call</CardTitle>
              <CardDescription>
                Tap curated mentor personas for scenario run-throughs, course corrections, and action plans that sync with your concierge dashboard.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {mentorPersonas.map((mentor) => {
                  const latestSession = mentorSessionLookup.get(mentor.id) ?? null;
                  const locked = mentor.tierAccess.every((tier) => !accessibleTiers.includes(tier));
                  const openItems = latestSession ? latestSession.actionItems.filter((item) => !item.completed).length : 0;
                  const lastSyncLabel = latestSession ? format(new Date(latestSession.updatedAt), "PP") : null;

                  return (
                    <div key={mentor.id} className="relative flex h-full flex-col gap-4 rounded-2xl border border-border/40 bg-card/60 p-5 backdrop-blur-xl">
                      <div className="flex items-center justify-between gap-2">
                        <Avatar className="h-10 w-10 border border-border/40 bg-primary/10">
                          <AvatarFallback className="text-sm font-semibold text-primary">{mentor.avatarInitials}</AvatarFallback>
                        </Avatar>
                        <Badge
                          variant="outline"
                          className={mentor.tierAccess.includes("elite") ? "border-secondary/50 text-secondary" : "border-primary/50 text-primary"}
                        >
                          {mentor.tierAccess.includes("elite") ? "Elite concierge" : "Pro mentor"}
                        </Badge>
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-foreground">{mentor.name}</h3>
                        <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground/70">{mentor.title}</p>
                      </div>
                      <p className="text-sm text-muted-foreground/90">{mentor.tagline}</p>
                      <div className="flex flex-wrap gap-2">
                        {mentor.specialties.slice(0, 3).map((specialty) => (
                          <span
                            key={specialty}
                            className="rounded-full border border-border/40 bg-background/60 px-2 py-1 text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                      {latestSession ? (
                        <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                          <span>{lastSyncLabel ? `Last sync • ${lastSyncLabel}` : "Active session"}</span>
                          {openItems > 0 ? (
                            <span className="inline-flex items-center gap-1 text-primary">
                              <Sparkles className="h-3 w-3" /> {openItems} open action item{openItems === 1 ? "" : "s"}
                            </span>
                          ) : null}
                        </div>
                      ) : (
                        <p className="text-xs text-muted-foreground/80">No session yet—start a concierge rehearsal with a preset.</p>
                      )}
                      <div className="flex flex-wrap gap-2">
                        {mentor.scenarioPresets.slice(0, 2).map((scenario) => (
                          <button
                            key={scenario.id}
                            type="button"
                            onClick={() => {
                              if (locked) {
                                toast({
                                  title: mentor.tierAccess.includes("elite") ? "Elite concierge unlock required" : "Upgrade required",
                                  description:
                                    mentor.tierAccess.includes("elite")
                                      ? "Elite concierge mentorship is included with the annual Elite plan."
                                      : "Activate Pro or Elite to access concierge mentors.",
                                });
                                return;
                              }
                              handleOpenMentor(mentor.id, scenario.id);
                            }}
                            className={cn(
                              "rounded-full border px-3 py-1 text-xs font-medium transition",
                              locked
                                ? "cursor-not-allowed border-border/40 text-muted-foreground/60"
                                : "border-border/40 hover:border-primary/45 hover:bg-primary/10",
                            )}
                          >
                            {scenario.label}
                          </button>
                        ))}
                      </div>
                      {locked ? (
                        <Button asChild variant="outline" size="sm" className="mt-auto w-full border-dashed">
                          <Link to="/subscribe" className="flex items-center justify-center gap-2">
                            <Lock className="h-3.5 w-3.5" /> Upgrade to unlock
                          </Link>
                        </Button>
                      ) : (
                        <Button onClick={() => handleOpenMentor(mentor.id)} variant="secondary" size="sm" className="mt-auto w-full shadow-glow">
                          <MessageCircle className="mr-2 h-4 w-4" /> Open session
                        </Button>
                      )}
                    </div>
                  );
                })}
              </div>
              {!hasMentorAccess ? (
                <p className="text-xs text-muted-foreground">
                  Unlock concierge mentorship with a Pro or Elite membership for on-call guidance, tailored feedback, and synced action plans.
                </p>
              ) : null}
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="glass-panel border border-border/45 lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Bot className="h-4 w-4 text-primary" /> AI mentor prompts
              </CardTitle>
              <CardDescription>Adaptive nudges crafted from your recent progress.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {aiMentorPrompts.length === 0 ? (
                <p className="text-sm text-muted-foreground">All clear! Keep shipping and we&apos;ll surface new prompts after your next milestone.</p>
              ) : (
                aiMentorPrompts.map((prompt) => (
                  <div key={prompt.id} className="rounded-2xl border border-border/40 bg-card/60 p-4">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="text-sm font-semibold">{prompt.title}</h3>
                        <p className="text-sm text-muted-foreground/80">{prompt.description}</p>
                      </div>
                      <Button variant="ghost" className="px-0 text-primary">
                        {prompt.action}
                        <ArrowRight className="ml-2 h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          <Card className="glass-panel border border-border/45">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Bell className="h-4 w-4 text-primary" /> Notifications center
              </CardTitle>
              <CardDescription>Key events curated for your tier.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {notificationFeed.length === 0 ? (
                <p className="text-sm text-muted-foreground">You&apos;re caught up. We&apos;ll ping you when new cohorts or milestones unlock.</p>
              ) : (
                notificationFeed.map((item) => (
                  <div key={item.id} className="rounded-2xl border border-border/40 bg-card/60 p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground/70">{item.meta}</p>
                    <h3 className="mt-2 text-sm font-semibold">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground/80">{item.description}</p>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {leadingPathDefinition && leadingPathProgress ? (
            <Card className="glass-panel border border-border/45">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Target className="h-4 w-4 text-primary" /> Spotlight readiness
                </CardTitle>
                <CardDescription>{leadingPathDefinition.title}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Progress value={leadingPathProgress.percentage} className="h-2" />
                  <p className="mt-2 text-sm text-muted-foreground">{leadingPathProgress.percentage}% complete</p>
                </div>
                {leadingPathDefinition.spotlightProjects?.slice(0, 2).map((project) => (
                  <div key={project.id} className="rounded-2xl border border-border/40 bg-card/60 p-3">
                    <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{project.outcome}</p>
                    <p className="mt-1 text-sm font-semibold">{project.title}</p>
                  </div>
                ))}
                <Button asChild variant="secondary" className="w-full justify-center">
                  <Link to="/paths">Review path dashboard</Link>
                </Button>
              </CardContent>
            </Card>
          ) : null}
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">{t("insights.recommendations.title")}</h2>
              <p className="text-sm text-muted-foreground">{t("insights.recommendations.subtitle")}</p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {courseRecommendations.map((recommendation) => {
              const categoryName = categoryLabelMap.get(recommendation.course.category) ?? recommendation.course.category;
              const values = recommendation.values
                ? Object.fromEntries(
                    Object.entries(recommendation.values).map(([key, value]) => [key, categoryLabelMap.get(value) ?? value]),
                  )
                : undefined;
              const reason = values
                ? t(`insights.recommendations.reasons.${recommendation.reason}`, { values })
                : t(`insights.recommendations.reasons.${recommendation.reason}`);

              return (
                <Card key={recommendation.course.id} className="glass-panel border border-border/45">
                  <CardHeader>
                    <CardTitle className="text-lg">{recommendation.course.title}</CardTitle>
                    <CardDescription>{reason}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      <p>{categoryName}</p>
                      <p>{recommendation.course.difficulty}</p>
                    </div>
                    <Button variant="secondary" asChild className="shadow-glow">
                      <Link to={`/course/${recommendation.course.id}`}>{t("insights.recommendations.courseCTA")}</Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {pathRecommendations.length > 0 ? (
          <section className="glass-panel border border-border/45 p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold">Active learning paths</h2>
                <p className="text-sm text-muted-foreground">Stay on pace with milestones that unlock your next badge.</p>
              </div>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {pathRecommendations.slice(0, 4).map((path) => {
                const progress = pathProgress.find((candidate) => candidate.pathId === path.pathId);
                return (
                  <Card key={path.pathId} className="border border-border/40 bg-card/60">
                    <CardHeader>
                      <CardTitle className="text-lg">{path.title}</CardTitle>
                      <CardDescription>{progress ? `${progress.completed}/${progress.total} courses completed` : null}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Progress value={path.percentage} className="h-2" />
                      <div className="flex items-center justify-between text-sm">
                        <span>{path.percentage}%</span>
                        {path.nextCourseId ? (
                          <Button variant="ghost" size="sm" asChild>
                            <Link to={`/course/${path.nextCourseId}`} className="inline-flex items-center gap-2 text-primary">
                              {t("insights.recommendations.pathCTA")}
                              <Sparkles className="h-3.5 w-3.5" />
                            </Link>
                          </Button>
                        ) : null}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>
        ) : null}

        {cohortSuggestions.length > 0 ? (
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <div>
                <h2 className="text-lg font-semibold">{t("insights.cohorts.title")}</h2>
                <p className="text-sm text-muted-foreground">{t("insights.cohorts.subtitle")}</p>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {cohortSuggestions.map((cohort) => (
                <Card key={cohort.id} className="glass-panel border border-border/45">
                  <CardHeader>
                    <CardTitle>{t(cohort.labelKey)}</CardTitle>
                    <CardDescription>{cohort.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </section>
        ) : null}

        <Sheet open={mentorDrawerOpen} onOpenChange={handleDrawerOpenChange}>
          <SheetContent className="flex h-full w-full flex-col space-y-6 overflow-hidden sm:max-w-3xl">
            {activePersona ? (
              <>
                <SheetHeader>
                  <SheetTitle>{activePersona.name}</SheetTitle>
                  <SheetDescription>
                    {activePersona.title} • {activePersona.tagline}
                  </SheetDescription>
                </SheetHeader>
                <div className="flex flex-1 flex-col gap-5 overflow-y-auto pr-2">
                  <div className="rounded-2xl border border-border/40 bg-card/70 p-4">
                    <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground/70">Scenario presets</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {activePersona.scenarioPresets.map((preset) => {
                        const isSelected = preset.id === selectedScenarioId;
                        return (
                          <button
                            key={preset.id}
                            type="button"
                            onClick={() => handleScenarioPreset(preset.id)}
                            className={cn(
                              "rounded-full border px-3 py-1 text-xs font-medium transition",
                              isSelected ? "border-primary/60 bg-primary/10 text-primary" : "border-border/45 hover:border-primary/45 hover:bg-primary/10",
                            )}
                          >
                            {preset.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-border/40 bg-card/70">
                    <ScrollArea className="max-h-[360px] p-4 pr-6">
                      <div className="space-y-4">
                        {activeSession && activeSession.messages.length > 0 ? (
                          activeSession.messages.map((message) => {
                            const isUser = message.role === "user";
                            const sentiment = message.sentiment ?? "neutral";
                            const sentimentMeta = sentimentStyles[sentiment];
                            return (
                              <div key={message.id} className={cn("flex", isUser ? "justify-end" : "justify-start")}>
                                <div
                                  className={cn(
                                    "max-w-[78%] rounded-2xl border p-4 text-sm shadow-md",
                                    isUser ? "border-primary/40 bg-primary/10 text-primary" : "border-border/40 bg-background/80 text-foreground",
                                  )}
                                >
                                  <div className="flex items-center justify-between text-xs text-muted-foreground/80">
                                    <span>{isUser ? "You" : activePersona.name}</span>
                                    <span>{format(new Date(message.createdAt), "p")}</span>
                                  </div>
                                  {sentimentMeta ? (
                                    <span className={cn(
                                      "mt-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.65rem] uppercase tracking-[0.28em]",
                                      sentimentMeta.className,
                                    )}>
                                      {sentimentMeta.label}
                                    </span>
                                  ) : null}
                                  <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">{message.content}</p>
                                  {message.attachments && message.attachments.length > 0 ? (
                                    <div className="mt-3 flex flex-wrap gap-2">
                                      {message.attachments.map((attachment) => (
                                        <span
                                          key={attachment.id}
                                          className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-background/70 px-3 py-1 text-xs text-muted-foreground"
                                        >
                                          <Paperclip className="h-3 w-3" />
                                          {attachment.name}
                                        </span>
                                      ))}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <p className="text-sm text-muted-foreground">
                            Kick off this session by describing your challenge or selecting a preset scenario.
                          </p>
                        )}
                      </div>
                    </ScrollArea>
                  </div>

                  <div className="rounded-2xl border border-border/40 bg-card/70 p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold">Action items</h3>
                      {activeSession && activeSession.actionItems.length > 0 ? (
                        <span className="text-xs text-muted-foreground">
                          {activeSession.actionItems.filter((item) => !item.completed).length} open
                        </span>
                      ) : null}
                    </div>
                    <Separator className="my-3" />
                    {activeSession && activeSession.actionItems.length > 0 ? (
                      <div className="space-y-3">
                        {activeSession.actionItems.map((item) => (
                          <label key={item.id} className="flex items-start gap-3">
                            <Checkbox checked={item.completed} onCheckedChange={(value) => handleToggleActionItem(item.id, value === true)} className="mt-1" />
                            <div>
                              <p className={cn("text-sm font-medium", item.completed ? "text-muted-foreground line-through" : "text-foreground")}>{item.label}</p>
                              {item.dueAt ? <p className="text-xs text-muted-foreground">Due {format(new Date(item.dueAt), "PP")}</p> : null}
                            </div>
                          </label>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">Action items from your mentor will appear here after each exchange.</p>
                    )}
                  </div>
                </div>
                <SheetFooter className="flex flex-col gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="mentor-message" className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
                      Compose update
                    </Label>
                    <Textarea
                      id="mentor-message"
                      value={messageInput}
                      onChange={(event) => setMessageInput(event.target.value)}
                      placeholder="Share blockers, celebrate wins, or request a rehearsal."
                      rows={3}
                      className="resize-none bg-card/80"
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <input id="mentor-attachments" type="file" multiple className="hidden" onChange={handleFileChange} />
                      <Label
                        htmlFor="mentor-attachments"
                        className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border/45 px-3 py-1 text-xs font-medium text-muted-foreground transition hover:border-primary/45 hover:text-primary"
                      >
                        <UploadCloud className="h-3.5 w-3.5" /> Attach brief
                      </Label>
                      <span className="text-xs text-muted-foreground/80">We&apos;ll summarise documents into your mentor transcript.</span>
                    </div>
                    {attachments.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {attachments.map((file, index) => (
                          <span
                            key={`${file.name}-${index}`}
                            className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-background/70 px-3 py-1 text-xs text-muted-foreground"
                          >
                            <Paperclip className="h-3 w-3" />
                            {file.name}
                            <button
                              type="button"
                              onClick={() => handleRemoveAttachment(index)}
                              className="text-muted-foreground transition hover:text-destructive"
                              aria-label="Remove attachment"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-muted-foreground">Mentor responses sync with concierge insights and your action item tracker.</p>
                    <Button onClick={handleSendMessage} disabled={isSendDisabled} className="w-full justify-center shadow-glow sm:w-auto">
                      {isSending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                      Send update
                    </Button>
                  </div>
                </SheetFooter>
              </>
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                Select a mentor from the concierge grid to begin your session.
              </div>
            )}
          </SheetContent>
        </Sheet>

      </main>
    </div>
  );
};

export default Insights;
