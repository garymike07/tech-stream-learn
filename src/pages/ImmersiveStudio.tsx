import { useCallback, useMemo, useState } from "react";
import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { immersiveScenes, MAX_ACTIVE_HOTSPOTS } from "@/data/immersiveScenes";
import { useProgress, type StudioTimelineStatus } from "@/context/ProgressContext";
import { useAuth } from "@/context/AuthContext";
import { Bot, Calendar, CheckCircle2, Gauge, Sparkles, Target, Users } from "lucide-react";

const timelineStatusCopy: Record<StudioTimelineStatus, { label: string; tone: string }> = {
  pending: { label: "Pending", tone: "text-muted-foreground" },
  in_progress: { label: "In progress", tone: "text-primary" },
  complete: { label: "Complete", tone: "text-emerald-500" },
};

const cycleStatus = (status: StudioTimelineStatus): StudioTimelineStatus => {
  if (status === "pending") return "in_progress";
  if (status === "in_progress") return "complete";
  return "pending";
};

const ImmersiveStudio = () => {
  const { user } = useAuth();
  const { studioSessions, startStudioSession, updateStudioTimelineStatus, addStudioArtifact } = useProgress();
  const [selectedSceneId, setSelectedSceneId] = useState<string>(immersiveScenes[0]?.id ?? "");
  const [artifactTitle, setArtifactTitle] = useState("");
  const [artifactSummary, setArtifactSummary] = useState("");
  const [artifactLink, setArtifactLink] = useState("");

  const selectedScene = useMemo(() => immersiveScenes.find((scene) => scene.id === selectedSceneId) ?? immersiveScenes[0], [selectedSceneId]);
  const activeSession = useMemo(
    () => studioSessions.find((session) => session.sceneId === selectedScene?.id) ?? null,
    [studioSessions, selectedScene?.id],
  );
  const visibleHotspots = useMemo(
    () => (selectedScene ? selectedScene.hotspots.slice(0, MAX_ACTIVE_HOTSPOTS) : []),
    [selectedScene],
  );

  const handleLaunchSession = useCallback(() => {
    if (!selectedScene) return;
    const facilitator = user?.fullName ?? "Concierge lead";
    startStudioSession({
      sceneId: selectedScene.id,
      pathId: selectedScene.pathId,
      courseId: selectedScene.courseId,
      title: `${selectedScene.title} session`,
      facilitator,
      participants: [facilitator, "Concierge AI"],
    });
  }, [selectedScene, startStudioSession, user?.fullName]);

  const handleToggleTimeline = useCallback(
    (timelineId: string, currentStatus: StudioTimelineStatus) => {
      if (!activeSession) return;
      updateStudioTimelineStatus(activeSession.id, timelineId, cycleStatus(currentStatus));
    },
    [activeSession, updateStudioTimelineStatus],
  );

  const handleAddArtifact = useCallback(() => {
    if (!activeSession || artifactTitle.trim().length === 0 || artifactSummary.trim().length === 0) {
      return;
    }
    addStudioArtifact(activeSession.id, {
      title: artifactTitle.trim(),
      summary: artifactSummary.trim(),
      owner: user?.fullName ?? "Studio collaborator",
      type: "artifact",
      url: artifactLink.trim().length > 0 ? artifactLink.trim() : undefined,
    });
    setArtifactTitle("");
    setArtifactSummary("");
    setArtifactLink("");
  }, [activeSession, addStudioArtifact, artifactLink, artifactSummary, artifactTitle, user?.fullName]);

  const readinessScore = useMemo(() => {
    if (!activeSession || !selectedScene) return 42;
    const completed = activeSession.timeline.filter((event) => event.status === "complete").length;
    return Math.min(100, Math.round((completed / activeSession.timeline.length) * 60 + 40));
  }, [activeSession, selectedScene]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pb-24">
        <section className="relative overflow-hidden border-b border-border/20 bg-[radial-gradient(circle_at_top,_theme(colors.primary/10),_transparent_60%)]">
          <div className="container mx-auto grid gap-10 px-4 py-16 lg:grid-cols-[1.2fr_minmax(0,1fr)]">
            <div>
              <Badge variant="outline" className="border-primary/40 text-primary">
                <Sparkles className="mr-2 h-3.5 w-3.5" /> Immersive concierge studios
              </Badge>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
                Rehearse executive XR experiences with collaborative studios
              </h1>
              <p className="mt-4 max-w-2xl text-muted-foreground">
                Stage immersive walkthroughs, choreograph multi-team storyboards, and capture concierge-ready artifacts that prove
                transformation velocity.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button onClick={handleLaunchSession} variant="default" size="lg">
                  Launch selected studio
                </Button>
                {activeSession ? (
                  <Badge className="bg-primary/15 text-primary" variant="secondary">
                    Session active • {activeSession.participants.length} collaborators
                  </Badge>
                ) : (
                  <Badge className="bg-card/70 text-muted-foreground" variant="secondary">
                    No session yet
                  </Badge>
                )}
              </div>
            </div>
            <Card className="border-border/30 bg-card/60 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-muted-foreground">
                  <Gauge className="h-4 w-4 text-primary" /> Studio readiness
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-end justify-between">
                    <div className="text-4xl font-semibold text-primary">{readinessScore}</div>
                    <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Executive index</span>
                  </div>
                  <Progress value={readinessScore} className="mt-3 h-2" />
                </div>
                <Separator />
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>Hotspots curated: {visibleHotspots.length}/{selectedScene?.hotspots.length ?? 0}</p>
                  <p>Timeline stages: {selectedScene?.timeline.length ?? 0}</p>
                  <p>Persona fit: {selectedScene?.personaFit.join(", ")}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="container mx-auto px-4 py-14">
          <div className="grid gap-4 lg:grid-cols-3">
            {immersiveScenes.map((scene) => {
              const isActive = scene.id === selectedScene?.id;
              return (
                <Card
                  key={scene.id}
                  onClick={() => setSelectedSceneId(scene.id)}
                  className={`cursor-pointer border transition-all ${
                    isActive ? "border-primary/50 bg-primary/10 shadow-lg" : "border-border/30 bg-card/60 hover:border-primary/30"
                  }`}
                >
                  <CardHeader>
                    <CardTitle className="flex items-start justify-between gap-4 text-base font-semibold">
                      <span>{scene.title}</span>
                      <Badge variant="outline" className="border-border/30 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                        {scene.environment}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-muted-foreground">
                    <p>{scene.summary}</p>
                    <div className="flex flex-wrap gap-2">
                      {scene.sensoryLayers.map((layer) => (
                        <Badge key={layer} variant="secondary" className="bg-card/70 text-xs text-muted-foreground">
                          {layer}
                        </Badge>
                      ))}
                    </div>
                    <div className="rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-3 text-xs text-primary">
                      <span className="font-medium">Anchors</span>: {scene.anchors.join(", ")}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="container mx-auto grid gap-12 px-4 pb-16 lg:grid-cols-[1.4fr_minmax(0,1fr)]">
          <div className="space-y-8">
            <Card className="border-border/30 bg-card/60">
              <CardHeader className="space-y-1">
                <CardTitle className="flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-muted-foreground">
                  <Target className="h-4 w-4 text-primary" /> Storyboard timeline
                </CardTitle>
                <p className="text-base text-foreground">Guide the executive walkthrough across priming, exploration, synthesis, and playback.</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedScene?.timeline.map((event) => {
                  const status = activeSession?.timeline.find((timelineEvent) => timelineEvent.id === event.id)?.status ?? "pending";
                  const tone = timelineStatusCopy[status];
                  return (
                    <div key={event.id} className="rounded-2xl border border-border/30 bg-background/60 p-4">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-foreground">{event.label}</p>
                          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{event.stage}</p>
                        </div>
                        <Button
                          type="button"
                          variant={status === "complete" ? "default" : status === "in_progress" ? "secondary" : "outline"}
                          className="text-xs uppercase tracking-[0.3em]"
                          onClick={() => handleToggleTimeline(event.id, status)}
                        >
                          {tone.label}
                        </Button>
                      </div>
                      <p className="mt-3 text-sm text-muted-foreground">{event.facilitatorCue}</p>
                      <div className="mt-3 flex items-center gap-2 text-xs text-primary/80">
                        <CheckCircle2 className={`h-4 w-4 ${tone.tone}`} />
                        <span className={tone.tone}>{event.successSignal}</span>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            <Card className="border-border/30 bg-card/60">
              <CardHeader className="space-y-1">
                <CardTitle className="flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-muted-foreground">
                  <Users className="h-4 w-4 text-primary" /> Collaborative pulse
                </CardTitle>
                <p className="text-base text-foreground">Track participants, hotspots, and concierge-ready artifacts.</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-2xl border border-border/30 bg-background/60 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Participants</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {activeSession ? activeSession.participants.join(", ") : "Launch the studio to invite collaborators."}
                  </p>
                </div>
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Immersive hotspots</p>
                  <div className="grid gap-3 md:grid-cols-2">
                    {visibleHotspots.map((hotspot) => (
                      <div key={hotspot.id} className="rounded-2xl border border-border/30 bg-background/60 p-4">
                        <p className="text-sm font-semibold text-foreground">{hotspot.title}</p>
                        <p className="mt-2 text-sm text-muted-foreground">{hotspot.description}</p>
                        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                          <span className="inline-flex items-center gap-1 text-primary">
                            <Gauge className="h-3.5 w-3.5" /> {hotspot.assetBudget.drawCalls} draws / {hotspot.assetBudget.textureMemoryMB}MB
                          </span>
                          <span>{hotspot.assetBudget.targetFPS} fps target</span>
                        </div>
                        <p className="mt-3 text-xs text-primary">{hotspot.conciergeCue}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Concierge artifact capture</p>
                  <div className="rounded-2xl border border-border/30 bg-background/60 p-4">
                    <div className="grid gap-3 md:grid-cols-2">
                      <Input placeholder="Artifact title" value={artifactTitle} onChange={(event) => setArtifactTitle(event.target.value)} />
                      <Input placeholder="Reference link (optional)" value={artifactLink} onChange={(event) => setArtifactLink(event.target.value)} />
                    </div>
                    <Textarea
                      placeholder="Summarize executive-ready outcomes"
                      value={artifactSummary}
                      onChange={(event) => setArtifactSummary(event.target.value)}
                      className="mt-3"
                      rows={4}
                    />
                    <Button
                      type="button"
                      className="mt-3"
                      onClick={handleAddArtifact}
                      disabled={!activeSession || artifactTitle.trim().length === 0 || artifactSummary.trim().length === 0}
                    >
                      Log artifact
                    </Button>
                    <div className="mt-4 space-y-3">
                      {activeSession?.artifacts.map((artifact) => (
                        <div key={artifact.id} className="rounded-xl border border-border/30 bg-card/50 p-3 text-sm text-muted-foreground">
                          <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-muted-foreground/80">
                            <span>{artifact.type}</span>
                            <span>{new Date(artifact.createdAt).toLocaleString()}</span>
                          </div>
                          <p className="mt-1 font-semibold text-foreground">{artifact.title}</p>
                          <p className="mt-1 text-sm text-muted-foreground">{artifact.summary}</p>
                        </div>
                      ))}
                      {!activeSession?.artifacts?.length ? (
                        <p className="text-xs text-muted-foreground">Log artifacts once the studio session is underway.</p>
                      ) : null}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-border/30 bg-card/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-muted-foreground">
                <Bot className="h-4 w-4 text-primary" /> Concierge narrative companion
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-2xl border border-border/30 bg-background/60 p-5 text-sm text-muted-foreground">
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Executive persona guidance</p>
                <p className="mt-2 leading-relaxed text-foreground">
                  {(selectedScene?.aiPrompt ?? "").replace("{persona}", user?.fullName ?? "the executive sponsor")}
                </p>
              </div>
              <Separator />
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-border/30 bg-background/60 p-4">
                  <p className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5 text-primary" /> Upcoming cues
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                    {selectedScene?.timeline.slice(0, 2).map((event) => (
                      <li key={event.id}>{event.label} • {event.facilitatorCue}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-border/30 bg-background/60 p-4">
                  <p className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Success signals
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                    {selectedScene?.hotspots.slice(0, 2).map((hotspot) => (
                      <li key={hotspot.id}>{hotspot.executiveSignal}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default ImmersiveStudio;
