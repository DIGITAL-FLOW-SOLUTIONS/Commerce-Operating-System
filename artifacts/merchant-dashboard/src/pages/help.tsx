import { useState, useMemo } from "react";
import {
  HelpCircle,
  Search,
  MessageCircle,
  Mail,
  BookOpen,
  Rocket,
  Store,
  CreditCard,
  ShoppingBag,
  UserCircle,
  ChevronDown,
  ArrowUpRight,
  Sparkles,
  Zap,
} from "lucide-react";
import { SiTiktok } from "react-icons/si";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

type CategoryId =
  | "all"
  | "getting-started"
  | "stores"
  | "payments"
  | "tiktok-live"
  | "boutique"
  | "account";

interface FAQ {
  id: string;
  category: Exclude<CategoryId, "all">;
  question: string;
  answer: string;
}

interface Category {
  id: CategoryId;
  label: string;
  icon: React.ReactNode;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const CATEGORIES: Category[] = [
  { id: "all",             label: "All topics",     icon: <BookOpen className="h-3.5 w-3.5" /> },
  { id: "getting-started", label: "Getting started", icon: <Rocket className="h-3.5 w-3.5" /> },
  { id: "stores",          label: "Stores",          icon: <Store className="h-3.5 w-3.5" /> },
  { id: "payments",        label: "Payments",        icon: <CreditCard className="h-3.5 w-3.5" /> },
  { id: "tiktok-live",     label: "TikTok Live Store",     icon: <SiTiktok className="h-3.5 w-3.5" /> },
  { id: "boutique",        label: "Boutique",        icon: <ShoppingBag className="h-3.5 w-3.5" /> },
  { id: "account",         label: "Account",         icon: <UserCircle className="h-3.5 w-3.5" /> },
];

const FAQS: FAQ[] = [
  // Getting started
  {
    id: "gs-1",
    category: "getting-started",
    question: "What is Sokoa and how does it work?",
    answer:
      "Sokoa is a multi-surface commerce platform built for African sellers. You can create TikTok Live selling stores, boutique storefronts, and pre-order stores — all managed from one dashboard. Customers shop in real time during your TikTok Lives or browse your boutique anytime. Payments are collected via M-PESA and settled directly to your payout method.",
  },
  {
    id: "gs-2",
    category: "getting-started",
    question: "How do I create my first store?",
    answer:
      "Click 'TikTok Live Selling' or 'Create Pre-order Store' in the sidebar to get started. Choose a template, add your products, set your prices, and hit Publish. Your store is live in minutes — no technical knowledge required.",
  },
  {
    id: "gs-3",
    category: "getting-started",
    question: "Is Sokoa free to use?",
    answer:
      "Yes — the Starter plan is free forever. It includes 1 TikTok Live store, 1 Boutique storefront, 1 Pre-order store, and up to 10 products per store. When you're ready to scale, upgrade to Sokoa Pro (KES 2,499/mo) or Enterprise (KES 8,499/mo) for more stores, higher product limits, custom domains, and priority support.",
  },
  {
    id: "gs-4",
    category: "getting-started",
    question: "Which devices can I use Sokoa on?",
    answer:
      "Sokoa is fully mobile-responsive and works on any device — phone, tablet, or desktop. We recommend using it on your phone for managing live sessions, and on desktop for setting up your stores and reviewing analytics.",
  },

  // Stores
  {
    id: "st-1",
    category: "stores",
    question: "How many stores can I create?",
    answer:
      "Starter: 1 store of each type (TikTok Live, Boutique, Pre-order). Sokoa Pro: up to 10 stores in each category. Enterprise: unlimited stores across all types. You can see your current usage on the Subscriptions page.",
  },
  {
    id: "st-2",
    category: "stores",
    question: "Can I use my own domain name?",
    answer:
      "Custom domains are available on Sokoa Pro and Enterprise plans. Once you upgrade, go to your store settings and enter your domain. You'll need to add a CNAME record with your domain registrar — our guide walks you through it step by step.",
  },
  {
    id: "st-3",
    category: "stores",
    question: "What happens when my store is in 'Draft' mode?",
    answer:
      "A draft store is only visible to you — it's not live to customers yet. Use draft mode to set up your store, add products, and preview how it looks before publishing. When you're happy, hit Publish and your store goes live instantly.",
  },
  {
    id: "st-4",
    category: "stores",
    question: "Can I sell the same product across multiple stores?",
    answer:
      "Yes. Products are managed per store but you can duplicate a product from one store to another. Go to the product you want to copy, tap the three-dot menu, and choose 'Duplicate to store'.",
  },
  {
    id: "st-5",
    category: "stores",
    question: "How do I remove the Sokoa badge from my store?",
    answer:
      "The Sokoa badge is shown on Starter plan stores. Upgrade to Sokoa Pro or Enterprise to remove it and present a fully branded experience to your customers.",
  },

  // Payments
  {
    id: "pay-1",
    category: "payments",
    question: "How do customers pay on Sokoa?",
    answer:
      "Customers pay via M-PESA STK push — they enter their phone number, confirm the payment prompt on their phone, and the order is confirmed instantly. No cash handling, no delays.",
  },
  {
    id: "pay-2",
    category: "payments",
    question: "When do I get paid?",
    answer:
      "Payouts are processed after order confirmation. Starter plan: 72-hour settlement. Sokoa Pro: 48-hour settlement. Enterprise: instant payouts. Funds are sent directly to your M-PESA Till, Paybill, or bank account set up in the Payouts section.",
  },
  {
    id: "pay-3",
    category: "payments",
    question: "What fees does Sokoa charge on transactions?",
    answer:
      "Sokoa charges a small platform fee per transaction (2.5% on Starter, 1.8% on Pro, 1.2% on Enterprise). M-PESA standard charges apply on top. All fees are shown clearly before a customer completes their purchase — no hidden costs.",
  },
  {
    id: "pay-4",
    category: "payments",
    question: "What if a customer requests a refund?",
    answer:
      "Go to the order in your dashboard, tap 'Issue Refund', and confirm. The refund is sent back to the customer's M-PESA number within 24 hours. Refunds are reflected in your billing history on the Subscriptions page.",
  },
  {
    id: "pay-5",
    category: "payments",
    question: "How do I add or change my payout method?",
    answer:
      "Go to Payouts in the sidebar. Tap 'Add Payout Method' and enter your M-PESA Till number, Paybill number, or bank account details. You can have multiple payout methods and set one as the default.",
  },

  // TikTok Live
  {
    id: "tt-1",
    category: "tiktok-live",
    question: "How does TikTok Live selling work on Sokoa?",
    answer:
      "When you go live on TikTok, your Sokoa store link is shared in your bio and comments. Viewers click the link, browse your live catalogue, and buy with M-PESA — all without leaving the shopping experience. Orders appear in your dashboard in real time.",
  },
  {
    id: "tt-2",
    category: "tiktok-live",
    question: "Do I need a TikTok account to use TikTok Live stores?",
    answer:
      "Yes. You need an active TikTok account that can go Live (usually requires at least 1,000 followers). Your Sokoa store works independently — you link it in your TikTok bio and share the link during your streams.",
  },
  {
    id: "tt-3",
    category: "tiktok-live",
    question: "Can I see how much I sold during a live session?",
    answer:
      "Yes — your Analytics page shows per-session revenue, orders, and top products. After each live, a session summary is saved automatically so you can review performance over time.",
  },
  {
    id: "tt-4",
    category: "tiktok-live",
    question: "How many products can I add to a TikTok Live store?",
    answer:
      "Starter plan: up to 10 products. Sokoa Pro: up to 100 products. Enterprise: unlimited products. You can pin featured products to the top of your live catalogue for easy discovery.",
  },

  // Boutique
  {
    id: "bq-1",
    category: "boutique",
    question: "What is a Boutique store?",
    answer:
      "A Boutique store is a permanent, browsable online shop — similar to a mini e-commerce site. Customers can visit anytime, browse categories, and checkout with M-PESA. It's perfect for fashion, beauty, electronics, and any physical or digital goods.",
  },
  {
    id: "bq-2",
    category: "boutique",
    question: "Can I customise how my boutique looks?",
    answer:
      "Yes. Each boutique store lets you choose a theme, set your brand colors, upload a logo, and write a custom tagline. Pro and Enterprise merchants can also connect a custom domain for full brand ownership.",
  },
  {
    id: "bq-3",
    category: "boutique",
    question: "Does Sokoa handle shipping?",
    answer:
      "Sokoa doesn't handle physical shipping directly — you arrange delivery with your own courier or use a third-party logistics partner. You can set shipping fees per product or a flat rate per order, and provide tracking info to customers through the order page.",
  },

  // Account
  {
    id: "acc-1",
    category: "account",
    question: "How do I change my account email or password?",
    answer:
      "Go to Settings in the sidebar. Under 'Account', you can update your display name, email address, and password. Changes take effect immediately. If you've forgotten your password, use the 'Forgot password' link on the login screen.",
  },
  {
    id: "acc-2",
    category: "account",
    question: "How do I upgrade or downgrade my plan?",
    answer:
      "Go to Subscriptions in the sidebar and click 'Upgrade Plan' to see all available plans. Select the plan you want and confirm. Upgrades take effect immediately. Downgrades take effect at the end of your current billing cycle.",
  },
  {
    id: "acc-3",
    category: "account",
    question: "Can I add team members to my account?",
    answer:
      "Team members are available on Sokoa Pro (up to 3) and Enterprise (up to 20). Go to Settings → Team to invite members by email and assign them roles — Admin, Manager, or Viewer.",
  },
  {
    id: "acc-4",
    category: "account",
    question: "How do I delete my Sokoa account?",
    answer:
      "Account deletion is permanent and removes all your stores, products, and data. If you're sure, go to Settings → Account → Danger Zone and tap 'Delete Account'. We recommend exporting your data first. If you need help, contact our support team before proceeding.",
  },
];

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function HelpPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return FAQS.filter(faq => {
      const matchCat = activeCategory === "all" || faq.category === activeCategory;
      const matchSearch =
        !q ||
        faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [search, activeCategory]);

  // Group filtered FAQs by category for display
  const grouped = useMemo(() => {
    const map = new Map<string, { label: string; icon: React.ReactNode; items: FAQ[] }>();
    for (const faq of filtered) {
      if (!map.has(faq.category)) {
        const cat = CATEGORIES.find(c => c.id === faq.category)!;
        map.set(faq.category, { label: cat.label, icon: cat.icon, items: [] });
      }
      map.get(faq.category)!.items.push(faq);
    }
    return Array.from(map.values());
  }, [filtered]);

  return (
    <div className="space-y-8 max-w-2xl mx-auto animate-in fade-in duration-300 pb-16">

      {/* ── Header + Search ────────────────────────────────────────── */}
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2.5">
            <HelpCircle className="h-6 w-6 text-muted-foreground" />
            Help Center
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Find answers, fast.</p>
        </div>

        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            type="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search for help… e.g. 'payout', 'custom domain'"
            className="flex h-11 w-full rounded-xl border border-input bg-card px-3 py-2 pl-10 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring transition-shadow"
          />
        </div>
      </div>

      {/* ── Category chips ─────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
              activeCategory === cat.id
                ? "border-primary bg-primary text-primary-foreground shadow-sm"
                : "border-border bg-card text-muted-foreground hover:text-foreground hover:border-foreground/20"
            )}
          >
            {cat.icon}
            {cat.label}
          </button>
        ))}
      </div>

      {/* ── FAQ sections ───────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {filtered.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center rounded-xl border border-dashed py-14 text-center space-y-3"
          >
            <Search className="h-8 w-8 text-muted-foreground/40" />
            <div>
              <p className="font-semibold text-foreground">No results found</p>
              <p className="text-sm text-muted-foreground mt-1">Try a different keyword or browse all topics.</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => { setSearch(""); setActiveCategory("all"); }}>
              Clear search
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
          >
            {grouped.map(group => (
              <section key={group.label} className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                  {group.icon}
                  {group.label}
                </div>

                <Accordion type="multiple" className="rounded-xl border border-border bg-card overflow-hidden divide-y divide-border/60 [&>*]:border-0">
                  {group.items.map(faq => (
                    <AccordionItem key={faq.id} value={faq.id} className="px-4">
                      <AccordionTrigger className="text-sm font-medium text-left py-4 hover:no-underline [&[data-state=open]>svg]:rotate-180">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4 pt-0">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Contact Support ─────────────────────────────────────────── */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Still need help?</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Live chat */}
          <div className="flex flex-col items-start gap-3 rounded-xl border border-border bg-card p-4 hover:border-border/60 hover:shadow-sm transition-all">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <MessageCircle className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">Live Chat</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">Chat with our team. Usually replies in under 5 minutes.</p>
            </div>
            <Button size="sm" className="w-full gap-1.5 mt-auto">
              <Zap className="h-3.5 w-3.5" /> Start Chat
            </Button>
          </div>

          {/* Email */}
          <div className="flex flex-col items-start gap-3 rounded-xl border border-border bg-card p-4 hover:border-border/60 hover:shadow-sm transition-all">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Mail className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">Email Support</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">Send us a message and we'll respond within 24 hours.</p>
            </div>
            <Button size="sm" variant="outline" className="w-full gap-1.5 mt-auto">
              <Mail className="h-3.5 w-3.5" /> Send Email
            </Button>
          </div>

          {/* Enterprise */}
          <div className="flex flex-col items-start gap-3 rounded-xl border border-dashed border-border bg-muted/20 p-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">Dedicated Manager</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">Enterprise merchants get a dedicated account manager.</p>
            </div>
            <Button size="sm" variant="outline" className="w-full gap-1.5 mt-auto text-muted-foreground">
              <ArrowUpRight className="h-3.5 w-3.5" /> Upgrade to Enterprise
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}
