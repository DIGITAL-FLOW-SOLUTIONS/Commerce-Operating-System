import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import InputPage from "@/pages/InputPage";
import ProcessingPage from "@/pages/ProcessingPage";
import PreviewPage from "@/pages/PreviewPage";
import ManualPage from "@/pages/ManualPage";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={InputPage} />
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
