import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/lib/cart-context";
import { CustomerProvider } from "@/lib/customer-context";
import { FavoritesProvider } from "@/lib/favorites-context";
import { useParams } from "wouter";

import TemplateSelectionPage from "@/pages/template-selection";
import NotFound from "@/pages/not-found";

// TikTok store pages
import TikTokProductPage from "@/pages/tiktok/index";
import TikTokCheckoutPage from "@/pages/tiktok/checkout";
import TikTokSuccessPage from "@/pages/tiktok/success";
import TikTokErrorPage from "@/pages/tiktok/error";
import TikTokTrackPage from "@/pages/tiktok/track";

// Social store pages
import SocialHomePage from "@/pages/social/index";
import SocialProductsPage from "@/pages/social/products";
import SocialProductDetailPage from "@/pages/social/product-detail";
import SocialCartPage from "@/pages/social/cart";
import SocialCheckoutPage from "@/pages/social/checkout";
import SocialSuccessPage from "@/pages/social/success";
import SocialErrorPage from "@/pages/social/error";
import SocialTrackPage from "@/pages/social/track";

// Boutique store pages
import BoutiqueHomePage from "@/pages/boutique/index";
import BoutiqueProductsPage from "@/pages/boutique/products";
import BoutiqueProductDetailPage from "@/pages/boutique/product-detail";
import BoutiqueCartPage from "@/pages/boutique/cart";
import BoutiqueCheckoutPage from "@/pages/boutique/checkout";
import BoutiqueSuccessPage from "@/pages/boutique/success";
import BoutiqueErrorPage from "@/pages/boutique/error";
import BoutiqueAccountPage from "@/pages/boutique/account";
import BoutiqueOrdersPage from "@/pages/boutique/orders";
import BoutiqueWishlistPage from "@/pages/boutique/wishlist";
import BoutiqueTrackPage from "@/pages/boutique/track";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
    },
  },
});

// Context wrappers that extract storeId from route params
function TikTokWrapper({ children }: { children: React.ReactNode }) {
  const { storeId } = useParams<{ storeId: string }>();
  return <CartProvider storeId={storeId}>{children}</CartProvider>;
}

function SocialWrapper({ children }: { children: React.ReactNode }) {
  const { storeId } = useParams<{ storeId: string }>();
  return (
    <CartProvider storeId={storeId}>
      <CustomerProvider storeId={storeId}>
        {children}
      </CustomerProvider>
    </CartProvider>
  );
}

function BoutiqueWrapper({ children }: { children: React.ReactNode }) {
  const { storeId } = useParams<{ storeId: string }>();
  return (
    <CartProvider storeId={storeId}>
      <CustomerProvider storeId={storeId}>
        <FavoritesProvider storeId={storeId}>
          {children}
        </FavoritesProvider>
      </CustomerProvider>
    </CartProvider>
  );
}

function Router() {
  return (
    <Switch>
      {/* Template selection */}
      <Route path="/" component={TemplateSelectionPage} />

      {/* ─── TikTok Store ─────────────────────────────────── */}
      <Route path="/tiktok/:storeId">
        {(params) => <TikTokWrapper><TikTokProductPage /></TikTokWrapper>}
      </Route>
      <Route path="/tiktok/:storeId/checkout">
        {() => <TikTokWrapper><TikTokCheckoutPage /></TikTokWrapper>}
      </Route>
      <Route path="/tiktok/:storeId/success/:orderId">
        {() => <TikTokWrapper><TikTokSuccessPage /></TikTokWrapper>}
      </Route>
      <Route path="/tiktok/:storeId/error">
        {() => <TikTokWrapper><TikTokErrorPage /></TikTokWrapper>}
      </Route>
      <Route path="/tiktok/:storeId/track">
        {() => <TikTokWrapper><TikTokTrackPage /></TikTokWrapper>}
      </Route>

      {/* ─── Social Store ─────────────────────────────────── */}
      <Route path="/social/:storeId">
        {() => <SocialWrapper><SocialHomePage /></SocialWrapper>}
      </Route>
      <Route path="/social/:storeId/products">
        {() => <SocialWrapper><SocialProductsPage /></SocialWrapper>}
      </Route>
      <Route path="/social/:storeId/products/:productId">
        {() => <SocialWrapper><SocialProductDetailPage /></SocialWrapper>}
      </Route>
      <Route path="/social/:storeId/cart">
        {() => <SocialWrapper><SocialCartPage /></SocialWrapper>}
      </Route>
      <Route path="/social/:storeId/checkout">
        {() => <SocialWrapper><SocialCheckoutPage /></SocialWrapper>}
      </Route>
      <Route path="/social/:storeId/success/:orderId">
        {() => <SocialWrapper><SocialSuccessPage /></SocialWrapper>}
      </Route>
      <Route path="/social/:storeId/error">
        {() => <SocialWrapper><SocialErrorPage /></SocialWrapper>}
      </Route>
      <Route path="/social/:storeId/track">
        {() => <SocialWrapper><SocialTrackPage /></SocialWrapper>}
      </Route>

      {/* ─── Boutique Store ───────────────────────────────── */}
      <Route path="/boutique/:storeId">
        {() => <BoutiqueWrapper><BoutiqueHomePage /></BoutiqueWrapper>}
      </Route>
      <Route path="/boutique/:storeId/products">
        {() => <BoutiqueWrapper><BoutiqueProductsPage /></BoutiqueWrapper>}
      </Route>
      <Route path="/boutique/:storeId/products/:productId">
        {() => <BoutiqueWrapper><BoutiqueProductDetailPage /></BoutiqueWrapper>}
      </Route>
      <Route path="/boutique/:storeId/cart">
        {() => <BoutiqueWrapper><BoutiqueCartPage /></BoutiqueWrapper>}
      </Route>
      <Route path="/boutique/:storeId/checkout">
        {() => <BoutiqueWrapper><BoutiqueCheckoutPage /></BoutiqueWrapper>}
      </Route>
      <Route path="/boutique/:storeId/success/:orderId">
        {() => <BoutiqueWrapper><BoutiqueSuccessPage /></BoutiqueWrapper>}
      </Route>
      <Route path="/boutique/:storeId/error">
        {() => <BoutiqueWrapper><BoutiqueErrorPage /></BoutiqueWrapper>}
      </Route>
      <Route path="/boutique/:storeId/account">
        {() => <BoutiqueWrapper><BoutiqueAccountPage /></BoutiqueWrapper>}
      </Route>
      <Route path="/boutique/:storeId/orders">
        {() => <BoutiqueWrapper><BoutiqueOrdersPage /></BoutiqueWrapper>}
      </Route>
      <Route path="/boutique/:storeId/wishlist">
        {() => <BoutiqueWrapper><BoutiqueWishlistPage /></BoutiqueWrapper>}
      </Route>
      <Route path="/boutique/:storeId/track">
        {() => <BoutiqueWrapper><BoutiqueTrackPage /></BoutiqueWrapper>}
      </Route>

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
