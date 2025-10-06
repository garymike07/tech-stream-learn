import Header from "@/components/Header";
import { Skeleton } from "@/components/ui/skeleton";

const RouteLoading = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Header />
    <main className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-2xl space-y-6">
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <div className="grid gap-4 sm:grid-cols-2">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    </main>
  </div>
);

export default RouteLoading;
