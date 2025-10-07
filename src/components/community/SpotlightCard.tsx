import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { CommunitySpotlight } from "@/data/communitySignals";
import { Sparkles } from "lucide-react";

const SpotlightCard = ({ spotlight }: { spotlight: CommunitySpotlight }) => (
  <Card className="border-border/35 bg-card/70 backdrop-blur">
    <CardHeader className="space-y-2">
      <Badge variant="outline" className="border-secondary/40 text-xs uppercase tracking-[0.3em] text-secondary">
        Spotlight
      </Badge>
      <CardTitle className="text-lg font-semibold text-foreground">{spotlight.title}</CardTitle>
      <p className="text-sm text-muted-foreground">{spotlight.summary}</p>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="flex items-center justify-between rounded-2xl border border-border/30 bg-background/60 px-4 py-3">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{spotlight.metricLabel}</p>
          <p className="text-2xl font-semibold text-foreground">{spotlight.metricValue}</p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary">
          <Sparkles className="h-3.5 w-3.5" />
          {spotlight.delta}
        </span>
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">{spotlight.narrative}</p>
    </CardContent>
  </Card>
);

export default SpotlightCard;
