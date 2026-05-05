import { Link } from "wouter";
import { Zap, Users, Crown, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const STORE_TYPES = [
  {
    id: "tiktok",
    icon: Zap,
    label: "TikTok Live Store",
    tagline: "Sell fast during live sessions",
    description:
      "Ultra-minimal storefront built for live selling. One product, one goal: get viewers to buy now. Zero distractions.",
    features: ["Single product focus", "Phone-based checkout", "M-Pesa integration", "Delivery form post-payment"],
    color: "from-rose-500 to-orange-500",
    textColor: "text-rose-600",
    bgLight: "bg-rose-50",
    border: "border-rose-200",
    badge: "Fastest",
    demoPath: "/tiktok/demo-tiktok",
  },
  {
    id: "social",
    icon: Users,
    label: "Social Store",
    tagline: "Convert your followers into buyers",
    description:
      "Multiple products, clean browsing, simple cart. Perfect for Facebook and Instagram audiences discovering your brand.",
    features: ["Product catalog", "Cart & checkout", "Order tracking", "Phone checkout"],
    color: "from-sky-500 to-blue-600",
    textColor: "text-sky-600",
    bgLight: "bg-sky-50",
    border: "border-sky-200",
    badge: "Most popular",
    demoPath: "/social/demo-social",
  },
  {
    id: "boutique",
    icon: Crown,
    label: "Boutique Store",
    tagline: "Your full e-commerce brand",
    description:
      "Complete commerce experience with accounts, wishlists, and order history. For merchants building a long-term brand.",
    features: ["Customer accounts", "Wishlist & favorites", "Order history", "Full catalog + categories"],
    color: "from-violet-500 to-purple-600",
    textColor: "text-violet-600",
    bgLight: "bg-violet-50",
    border: "border-violet-200",
    badge: "Full featured",
    demoPath: "/boutique/demo-boutique",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function TemplateSelectionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-0 z-10 backdrop-blur-sm bg-white/95">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-white font-display font-bold text-sm">S</span>
          </div>
          <span className="font-display font-bold text-foreground">Sokoa Stores</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Choose your store type
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
            What kind of store are you launching?
          </h1>
          <p className="text-muted-foreground text-base max-w-xl mx-auto">
            Each store type is built for a different selling experience. Pick the one that fits your business.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-5 sm:grid-cols-1 md:grid-cols-3"
        >
          {STORE_TYPES.map((type) => (
            <motion.div
              key={type.id}
              variants={item}
              className={`relative bg-white rounded-2xl border ${type.border} shadow-sm overflow-hidden flex flex-col group hover:shadow-lg transition-all duration-300`}
            >
              {/* Badge */}
              <div className={`absolute top-4 right-4 text-[11px] font-bold uppercase tracking-wide ${type.textColor} ${type.bgLight} px-2.5 py-1 rounded-full`}>
                {type.badge}
              </div>

              {/* Gradient bar */}
              <div className={`h-1.5 bg-gradient-to-r ${type.color}`} />

              <div className="p-6 flex flex-col flex-1">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${type.color} flex items-center justify-center mb-4 shadow-sm`}>
                  <type.icon size={22} className="text-white" />
                </div>

                <h2 className="font-display font-bold text-lg text-foreground mb-1">{type.label}</h2>
                <p className={`text-xs font-semibold ${type.textColor} mb-3`}>{type.tagline}</p>
                <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{type.description}</p>

                {/* Features */}
                <ul className="space-y-2 mb-6 flex-1">
                  {type.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                      <CheckCircle2 size={14} className="text-primary shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link href={type.demoPath}>
                  <button
                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r ${type.color} shadow-sm hover:opacity-90 active:scale-[0.98] transition-all duration-150`}
                  >
                    Preview Store
                    <ArrowRight size={16} />
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-xs text-muted-foreground mt-10"
        >
          You can switch store types anytime from the merchant dashboard.
        </motion.p>
      </div>
    </div>
  );
}
