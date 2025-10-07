import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import CertificateTemplate from "@/components/certificates/CertificateTemplate";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useProgress } from "@/context/ProgressContext";
import { downloadCertificate } from "@/utils/certificates";
import { toast } from "@/hooks/use-toast";
import { Copy, Download, ExternalLink, ShieldCheck, Sparkles } from "lucide-react";

const Certificates = () => {
  const { certificates, certificateLedger } = useProgress();
  const [activeId, setActiveId] = useState<string | null>(certificates[0]?.id ?? null);

  useEffect(() => {
    if (!certificates.length) {
      setActiveId(null);
      return;
    }
    if (!activeId || !certificates.some((certificate) => certificate.id === activeId)) {
      setActiveId(certificates[0]?.id ?? null);
    }
  }, [activeId, certificates]);

  const activeCertificate = useMemo(
    () => certificates.find((certificate) => certificate.id === activeId) ?? certificates[0] ?? null,
    [activeId, certificates],
  );

  const handleDownload = async (format: "png" | "svg") => {
    if (!activeCertificate) return;
    try {
      await downloadCertificate(activeCertificate, { format });
      toast({
        title: format === "png" ? "Certificate exported" : "SVG certificate exported",
        description: `${activeCertificate.title} ready for executive sharing.`,
      });
    } catch (error) {
      console.error("Certificate export failed", error);
      toast({
        title: "Export unavailable",
        description: "We could not render the certificate. Please retry shortly.",
        variant: "destructive",
      });
    }
  };

  const handleCopyVerification = async () => {
    if (!activeCertificate) return;
    try {
      const origin = typeof window !== "undefined" ? window.location.origin : "";
      const url = `${origin}/certificates/verify?code=${activeCertificate.verificationCode}`;
      if (!navigator.clipboard) {
        throw new Error("Clipboard unavailable");
      }
      await navigator.clipboard.writeText(url);
      toast({ title: "Verification link copied", description: activeCertificate.verificationCode });
    } catch (error) {
      console.error("Failed to copy verification link", error);
      toast({
        title: "Copy unavailable",
        description: "Your browser blocked clipboard access.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-4 py-12 space-y-10">
        <section className="glass-panel glass-panel-strong relative overflow-hidden border border-border/45 p-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-secondary/15" />
          <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-4">
              <Badge variant="outline" className="border-primary/40 text-primary">
                <ShieldCheck className="mr-2 h-3.5 w-3.5" /> Concierge certifications
              </Badge>
              <div className="space-y-2">
                <h1 className="text-4xl font-bold md:text-5xl">Certification vault</h1>
                <p className="text-lg text-muted-foreground md:max-w-2xl">
                  Download, verify, and showcase every executive-grade credential earned across the concierge academy.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Button asChild variant="outline" className="border-border/40 text-sm">
                <Link to="/certificates/verify" className="inline-flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" /> Open verification portal
                </Link>
              </Button>
              <div className="rounded-2xl border border-border/40 bg-card/70 px-4 py-3 text-sm">
                <p className="font-semibold text-primary">{certificateLedger.length}</p>
                <p className="text-muted-foreground">Issued credentials on record</p>
              </div>
            </div>
          </div>
        </section>

        {!certificates.length ? (
          <Card className="glass-panel border border-border/45">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base text-muted-foreground">
                <Sparkles className="h-4 w-4 text-primary" /> No certificates yet
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <p>Complete a course or concierge module to unlock your first certificate.</p>
              <Button asChild className="shadow-glow">
                <Link to="/paths">Explore guided paths</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
            <Card className="glass-panel border border-border/45">
              <CardHeader className="space-y-2">
                <CardTitle className="text-lg font-semibold">Issued certificates</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Select a credential to preview, download, or share for verification.
                </p>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[480px]">
                  <div className="space-y-1 p-4">
                    {certificates.map((certificate) => (
                      <button
                        key={certificate.id}
                        type="button"
                        onClick={() => setActiveId(certificate.id)}
                        className={`w-full rounded-2xl border px-4 py-4 text-left transition hover:border-primary/50 hover:bg-primary/10 ${
                          certificate.id === activeCertificate?.id ? "border-primary/60 bg-primary/10" : "border-border/40 bg-background/40"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-semibold text-foreground">{certificate.title}</p>
                          <Badge variant="outline" className="border-secondary/40 text-secondary">
                            Tier {certificate.tier}
                          </Badge>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">{certificate.verificationCode}</p>
                        <p className="mt-2 text-xs text-muted-foreground/70">
                          Issued {new Date(certificate.issuedAt).toLocaleDateString()}
                        </p>
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {activeCertificate ? (
              <div className="space-y-6">
                <Card className="glass-panel border border-border/45">
                  <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-2xl font-semibold">{activeCertificate.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Awarded to {activeCertificate.recipientName} &mdash; verify using code {activeCertificate.verificationCode}.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Button onClick={() => handleDownload("png")} className="shadow-glow">
                        <Download className="mr-2 h-4 w-4" /> Download PNG
                      </Button>
                      <Button variant="outline" onClick={() => handleDownload("svg")} className="border-border/40">
                        <Download className="mr-2 h-4 w-4" /> Download SVG
                      </Button>
                      <Button variant="outline" onClick={handleCopyVerification} className="border-border/40">
                        <Copy className="mr-2 h-4 w-4" /> Copy verification link
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-6 lg:flex-row">
                    <div className="mx-auto w-full max-w-2xl rounded-3xl border border-border/40 bg-card/30 p-6 shadow-lg">
                      <CertificateTemplate certificate={activeCertificate} width={840} height={594} className="w-full" />
                    </div>
                    <div className="flex-1 space-y-6">
                      <div>
                        <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">Executive highlights</h3>
                        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                          {activeCertificate.highlights.map((highlight, index) => (
                            <li key={`${activeCertificate.id}-highlight-${index}`} className="leading-relaxed">
                              • {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Separator />
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p>Issued by {activeCertificate.issuedBy}</p>
                        <p>
                          Signed by {activeCertificate.signature.name}, {activeCertificate.signature.title}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-panel border border-border/45">
                  <CardHeader>
                    <CardTitle className="text-base font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                      Ledger snapshots
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-muted-foreground">
                    {certificateLedger.slice(0, 6).map((entry) => (
                      <div
                        key={`${entry.verificationCode}-${entry.issuedAt}`}
                        className="rounded-2xl border border-border/40 bg-background/40 px-4 py-3"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground/70">
                          <span>{entry.verificationCode}</span>
                          <span>{new Date(entry.issuedAt).toLocaleDateString()}</span>
                        </div>
                        <div className="mt-2 text-sm text-foreground">{entry.title}</div>
                        <div className="text-xs text-muted-foreground/80">{entry.recipientName}</div>
                      </div>
                    ))}
                    {certificateLedger.length === 0 ? <p>No issued certificates recorded yet.</p> : null}
                  </CardContent>
                </Card>
              </div>
            ) : null}
          </div>
        )}
      </main>
    </div>
  );
};

export default Certificates;
