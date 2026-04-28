import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Home from "@/pages/home";
import TikTok from "@/pages/tiktok";
import Socials from "@/pages/socials";
import Sneakers from "@/pages/sneakers";
import Build from "@/pages/build";
import Boutique from "@/pages/boutique";
import Pricing from "@/pages/pricing";
import Features from "@/pages/features";
import HowItWorks from "@/pages/how-it-works";
import Templates from "@/pages/templates";
import Help from "@/pages/help";
import Contact from "@/pages/contact";
import Login from "@/pages/login";
import Signup from "@/pages/signup";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/tiktok" component={TikTok} />
      <Route path="/socials" component={Socials} />
      <Route path="/sneakers" component={Sneakers} />
      <Route path="/build" component={Build} />
      <Route path="/boutique" component={Boutique} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/features" component={Features} />
      <Route path="/how-it-works" component={HowItWorks} />
      <Route path="/templates" component={Templates} />
      <Route path="/help" component={Help} />
      <Route path="/contact" component={Contact} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
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
