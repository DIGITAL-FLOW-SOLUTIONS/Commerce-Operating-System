import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import NotFound from "@/pages/not-found";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Dashboard from "@/pages/dashboard";
import Payouts from "@/pages/payouts";
import MyStores from "@/pages/stores";
import PublishedStores from "@/pages/published";
import StoreDetail from "@/pages/store-detail";
import NotificationsPage from "@/pages/notifications";
import AnalyticsPage from "@/pages/analytics";
import SettingsPage from "@/pages/settings";
import SubscriptionsPage from "@/pages/subscriptions";
import HelpPage from "@/pages/help";
import TemplatesPage from "@/pages/templates";
import { DataProvider } from "@/lib/mock-data";
import { UpgradeModalProvider } from "@/contexts/upgrade-modal";
import UpgradeModal from "@/components/UpgradeModal";

const queryClient = new QueryClient();

// Placeholder for unbuilt pages
function Placeholder({ title }: { title: string }) {
  return (
    <div className="flex h-[50vh] flex-col items-center justify-center space-y-4 rounded-xl border border-dashed p-8 text-center animate-in fade-in zoom-in duration-500">
      <div className="rounded-full bg-primary/10 p-3 text-primary">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
      </div>
      <div className="space-y-1">
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        <p className="text-sm text-muted-foreground">This page is under construction.</p>
      </div>
    </div>
  );
}

function Router() {
  return (
    <DashboardLayout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/stores" component={MyStores} />
        <Route path="/stores/:id" component={StoreDetail} />
        <Route path="/published" component={PublishedStores} />
        <Route path="/payouts" component={Payouts} />
        <Route path="/subscriptions" component={SubscriptionsPage} />
        <Route path="/analytics">
          <AnalyticsPage />
        </Route>
        <Route path="/notifications">
          <NotificationsPage />
        </Route>
        <Route path="/settings" component={SettingsPage} />
        <Route path="/help" component={HelpPage} />
        <Route path="/templates" component={TemplatesPage} />
        <Route component={NotFound} />
      </Switch>
    </DashboardLayout>
  );
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <QueryClientProvider client={queryClient}>
        <DataProvider>
          <UpgradeModalProvider>
            <TooltipProvider>
              <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
                <Router />
              </WouterRouter>
              <UpgradeModal />
              <Toaster />
            </TooltipProvider>
          </UpgradeModalProvider>
        </DataProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
