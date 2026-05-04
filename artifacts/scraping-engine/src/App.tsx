import { useEffect } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ProcessingPage from "@/pages/ProcessingPage";
import PreviewPage from "@/pages/PreviewPage";
import ManualPage from "@/pages/ManualPage";
import NotFound from "@/pages/not-found";
import { detectInput } from "@/lib/detection";
import { saveInput } from "@/lib/cache";

const queryClient = new QueryClient();

function Root() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get("input");
    if (raw && raw.trim()) {
      const detected = detectInput(raw.trim());
      saveInput(detected);
      setLocation("/processing");
    } else {
      setLocation("/manual");
    }
  }, [setLocation]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <img src="/logos/sokoa-mark.svg" alt="Sokoa" className="w-10 h-10 animate-pulse" />
        <p className="text-sm text-muted-foreground font-medium">Preparing your store…</p>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Root} />
      <Route path="/processing" component={ProcessingPage} />
      <Route path="/preview" component={PreviewPage} />
      <Route path="/manual" component={ManualPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
