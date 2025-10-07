import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { CommunityLeaderboard } from "@/data/communitySignals";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";

const trendIcon = {
  up: ArrowUpRight,
  down: ArrowDownRight,
  steady: Minus,
} as const;

const trendTone = {
  up: "text-emerald-500",
  down: "text-rose-500",
  steady: "text-muted-foreground",
} as const;

const trendBackground = {
  up: "bg-emerald-500/10",
  down: "bg-rose-500/10",
  steady: "bg-muted",
} as const;

const tierTone = {
  Free: "border-border/40 text-muted-foreground",
  Pro: "border-primary/40 text-primary",
  Elite: "border-secondary/40 text-secondary",
} as const;

const formatScore = (score: number, unit?: string) => (unit ? `${score}${unit}` : score);

const CommunityLeaderboard = ({ leaderboard }: { leaderboard: CommunityLeaderboard }) => (
  <Card className="h-full border-border/35 bg-card/70 backdrop-blur">
    <CardHeader className="space-y-1">
      <Badge variant="outline" className="border-primary/30 text-xs uppercase tracking-[0.3em] text-primary">
        {leaderboard.label}
      </Badge>
      <CardTitle className="text-lg font-semibold text-foreground">{leaderboard.metric}</CardTitle>
    </CardHeader>
    <CardContent className="space-y-3">
      {leaderboard.entries.map((entry, index) => {
        const Icon = trendIcon[entry.trend];
        return (
          <div key={entry.id} className="flex items-center justify-between gap-4 rounded-2xl border border-border/30 bg-background/60 px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-muted-foreground/80">{index + 1}</span>
              <div>
                <p className="text-sm font-semibold text-foreground">{entry.name}</p>
                <p className="text-xs text-muted-foreground">{entry.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-base font-semibold text-foreground">{formatScore(entry.score, leaderboard.unit)}</p>
                <p className="flex items-center justify-end gap-1 text-xs">
                  <span className={`${trendTone[entry.trend]} ${trendBackground[entry.trend]} rounded-full px-2 py-0.5`}>{entry.delta >= 0 ? `+${entry.delta}` : entry.delta}</span>
                  <Icon className={`h-3.5 w-3.5 ${trendTone[entry.trend]}`} />
                </p>
              </div>
              <Badge variant="outline" className={`${tierTone[entry.tier]} text-[0.65rem] uppercase tracking-[0.3em]`}>
                {entry.tier}
              </Badge>
            </div>
          </div>
        );
      })}
    </CardContent>
  </Card>
);

export default CommunityLeaderboard;
