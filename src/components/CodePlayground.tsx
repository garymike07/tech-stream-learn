import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CodePlaygroundProps {
  title: string;
  description: string;
  embedUrl: string;
  docsUrl?: string;
}

const CodePlayground = ({ title, description, embedUrl, docsUrl }: CodePlaygroundProps) => {
  return (
    <Card className="border border-border/40 bg-card/40 backdrop-blur-xl shadow-glow animate-fade-in">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative overflow-hidden rounded-2xl border border-border/30 bg-background/70 shadow-inner">
          <iframe
            title={title}
            src={embedUrl}
            className="h-[420px] w-full"
            allow="accelerometer; ambient-light-sensor; camera; clipboard-read; clipboard-write; encrypted-media; geolocation; gyroscope; microphone; midi"
            sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
          />
          <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/5" />
        </div>
        {docsUrl ? (
          <div className="flex justify-end">
            <Button asChild variant="secondary" className="shadow-glow">
              <a href={docsUrl} target="_blank" rel="noopener noreferrer">
                View Documentation
              </a>
            </Button>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default CodePlayground;
