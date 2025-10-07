import { FormEvent, useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import CertificateTemplate from "@/components/certificates/CertificateTemplate";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useProgress } from "@/context/ProgressContext";
import { downloadCertificate } from "@/utils/certificates";
import { useSearchParams } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { CheckCircle2, ExternalLink, Loader2, ShieldCheck } from "lucide-react";

type VerificationState = "idle" | "loading" | "resolved" | "not-found";

const VerifyCertificate = () => {
  const { certificateLedger, getCertificateByVerificationCode } = useProgress();
  const [params] = useSearchParams();
  const [code, setCode] = useState<string>(params.get("code") ?? "");
  const [status, setStatus] = useState<VerificationState>(() => (code ? "loading" : "idle"));
  const [resultId, setResultId] = useState<string | null>(null);

  const result = useMemo(
    () => certificateLedger.find((entry) => entry.id === resultId) ?? null,
    [certificateLedger, resultId],
  );

  useEffect(() => {
    if (!code) {
      setStatus("idle");
      setResultId(null);
      return;
    }
    const entry = getCertificateByVerificationCode(code);
    if (entry) {
      setResultId(entry.id);
      setStatus("resolved");
    } else {
      setResultId(null);
      setStatus("not-found");
    }
  }, [code, getCertificateByVerificationCode]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const submittedCode = (formData.get("verification-code") as string | null)?.trim() ?? "";
    if (!submittedCode) {
      setStatus("idle");
      setResultId(null);
      return;
    }
    setStatus("loading");
    const entry = getCertificateByVerificationCode(submittedCode);
    if (entry) {
      setResultId(entry.id);
      setStatus("resolved");
    } else {
      setResultId(null);
      setStatus("not-found");
    }
  };

  const handleDownload = async (format: "png" | "svg") => {
    if (!result) return;
    try {
      await downloadCertificate(result, { format });
      toast({ title: `Certificate exported as ${format.toUpperCase()}` });
    } catch (error) {
      console.error("Unable to export certificate", error);
      toast({
        title: "Export failed",
        description: "Please retry your download request.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12 space-y-10">
        <section className="glass-panel glass-panel-strong border border-border/45 p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <Badge variant="outline" className="border-primary/40 text-primary">
                <ShieldCheck className="mr-2 h-3.5 w-3.5" /> Concierge verification
              </Badge>
              <h1 className="text-4xl font-bold">Certificate verification</h1>
              <p className="text-muted-foreground md:max-w-xl">
                Enter a verification code to confirm authenticity and view certificate provenance.
              </p>
            </div>
            <div className="rounded-2xl border border-border/40 bg-card/70 px-4 py-3 text-sm text-muted-foreground">
              {certificateLedger.length} credentials on ledger
            </div>
          </div>
        </section>

        <Card className="glass-panel border border-border/45">
          <CardHeader className="space-y-2">
            <CardTitle className="text-lg font-semibold">Lookup a certificate</CardTitle>
            <p className="text-sm text-muted-foreground">
              Paste the verification code from the certificate footer. Codes are case-insensitive.
            </p>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col gap-4 md:flex-row" onSubmit={handleSubmit}>
              <Input
                name="verification-code"
                placeholder="e.g. ALPHA-12B3-CX90"
                defaultValue={code}
                className="text-base"
              />
              <Button type="submit" className="shadow-glow min-w-[160px]">
                {status === "loading" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Verify credential
              </Button>
            </form>
          </CardContent>
        </Card>

        {status === "idle" ? (
          <Card className="glass-panel border border-border/45 text-muted-foreground">
            <CardContent className="py-12 text-center text-sm">
              Provide a verification code to see credential details.
            </CardContent>
          </Card>
        ) : null}

        {status === "not-found" ? (
          <Card className="glass-panel border border-red-500/50">
            <CardContent className="flex flex-col gap-4 py-10 text-center">
              <p className="text-lg font-semibold text-red-300">No credential found for that code.</p>
              <p className="text-sm text-muted-foreground">
                Check the code formatting and try again. The concierge team can re-issue verification if required.
              </p>
            </CardContent>
          </Card>
        ) : null}

        {status === "resolved" && result ? (
          <Card className="glass-panel border border-border/45">
            <CardHeader className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <CardTitle className="text-2xl font-semibold">{result.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Issued to {result.recipientName} on {new Date(result.issuedAt).toLocaleDateString()}.
                </p>
                <p className="mt-2 flex items-center gap-2 text-sm text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" /> Credential verified
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button onClick={() => handleDownload("png")} className="shadow-glow">
                  Download PNG
                </Button>
                <Button variant="outline" onClick={() => handleDownload("svg")} className="border-border/40">
                  Download SVG
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-6 lg:flex-row">
              <div className="mx-auto w-full max-w-2xl rounded-3xl border border-border/40 bg-card/30 p-6 shadow-lg">
                <CertificateTemplate certificate={result} width={840} height={594} className="w-full" />
              </div>
              <div className="flex-1 space-y-6 text-sm text-muted-foreground">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground/80">Verification code</h3>
                  <p className="mt-2 text-lg font-semibold text-foreground">{result.verificationCode}</p>
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground/80">Highlights</h3>
                  <ul className="mt-2 space-y-2 text-sm">
                    {result.highlights.map((highlight, index) => (
                      <li key={`${result.id}-highlight-${index}`}>• {highlight}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-border/40 bg-background/40 p-4">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground/80">
                    <ExternalLink className="h-3.5 w-3.5" /> Issuer
                  </div>
                  <p className="mt-2 font-semibold text-foreground">{result.issuedBy}</p>
                  <p className="text-xs text-muted-foreground/80">
                    Signed by {result.signature.name}, {result.signature.title}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : null}
      </main>
    </div>
  );
};

export default VerifyCertificate;
