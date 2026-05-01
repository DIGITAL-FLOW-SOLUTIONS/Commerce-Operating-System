import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Shield, Bell, CreditCard, ChevronRight, Check, X,
  Pencil, Eye, EyeOff, Monitor, Smartphone, LogOut, AlertTriangle,
  Mail, Phone, Globe, Clock, Lock, KeyRound, BellRing, Zap,
  ShoppingBag, Wallet, MessageSquare, Package, CheckCircle2, Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useData } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

type Tab = "profile" | "security" | "notifications" | "plan";

const TABS: { id: Tab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "profile",       label: "Profile",       icon: User    },
  { id: "security",      label: "Security",      icon: Shield  },
  { id: "notifications", label: "Notifications", icon: Bell    },
  { id: "plan",          label: "Plan",          icon: CreditCard },
];

function SectionCard({
  title, description, children,
}: {
  title: string; description?: string; children: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">{title}</CardTitle>
        {description && <CardDescription className="text-xs leading-relaxed">{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

function FieldRow({
  label, value, icon: Icon, onEdit, editKey, editingKey, setEditingKey,
}: {
  label: string; value: string;
  icon: React.ComponentType<{ className?: string }>;
  onEdit?: () => void;
  editKey?: string; editingKey?: string | null; setEditingKey?: (k: string | null) => void;
}) {
  const isEditing = editKey && editingKey === editKey;
  const [draft, setDraft] = useState(value);

  return (
    <div className="flex items-start gap-3 py-3.5 border-b border-border last:border-0">
      <div className="mt-0.5 p-1.5 rounded-lg bg-muted">
        <Icon className="h-3.5 w-3.5 text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] text-muted-foreground font-medium mb-0.5">{label}</p>
        {isEditing ? (
          <div className="flex items-center gap-2 mt-1">
            <Input
              value={draft}
              onChange={e => setDraft(e.target.value)}
              className="h-8 text-sm"
              autoFocus
            />
            <button
              onClick={() => setEditingKey?.(null)}
              className="p-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Check className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => { setDraft(value); setEditingKey?.(null); }}
              className="p-1.5 rounded-lg bg-muted hover:bg-muted/70 transition-colors"
            >
              <X className="h-3.5 w-3.5 text-muted-foreground" />
            </button>
          </div>
        ) : (
          <p className="text-sm text-foreground font-medium">{draft}</p>
        )}
      </div>
      {editKey && !isEditing && (
        <button
          onClick={() => setEditingKey?.(editKey)}
          className="text-xs text-primary hover:underline font-medium mt-0.5 shrink-0"
        >
          Edit
        </button>
      )}
    </div>
  );
}

function ProfileTab() {
  const { user } = useData();
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const initials = user.name.split(" ").map((n: string) => n[0]).join("");

  return (
    <div className="space-y-4">
      <SectionCard title="Personal Details" description="Your name and contact information as they appear on your account.">
        <div className="flex items-center gap-4 mb-5 pb-5 border-b border-border">
          <div className="h-16 w-16 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl shrink-0">
            {initials}
          </div>
          <div>
            <p className="font-semibold text-foreground">{user.name}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{user.email}</p>
            <Button variant="outline" size="sm" className="mt-2 h-7 text-xs gap-1.5">
              <Pencil className="h-3 w-3" /> Change photo
            </Button>
          </div>
        </div>
        <FieldRow label="Full Name"     value={user.name}             icon={User}  editKey="name"  editingKey={editingKey} setEditingKey={setEditingKey} />
        <FieldRow label="Email Address" value={user.email}            icon={Mail}  editKey="email" editingKey={editingKey} setEditingKey={setEditingKey} />
        <FieldRow label="Phone Number"  value="+254 712 345 678"      icon={Phone} editKey="phone" editingKey={editingKey} setEditingKey={setEditingKey} />
      </SectionCard>

      <SectionCard title="Regional" description="Set your language and timezone. These affect how dates, times, and currency appear across your dashboard.">
        <FieldRow label="Language" value="English (Kenya)" icon={Globe} />
        <FieldRow label="Timezone" value="(GMT+03:00) Nairobi — East Africa Time" icon={Clock} />
        <FieldRow label="Currency Display" value="KES — Kenyan Shilling" icon={Wallet} />
      </SectionCard>

      <SectionCard title="Danger Zone">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-foreground">Delete account</p>
            <p className="text-xs text-muted-foreground mt-0.5 max-w-xs">
              Permanently delete your Sokoa account and all associated stores. This cannot be undone.
            </p>
          </div>
          <Button variant="destructive" size="sm" className="shrink-0">
            Delete
          </Button>
        </div>
      </SectionCard>
    </div>
  );
}

function PasswordDialog({ onClose }: { onClose: () => void }) {
  const [show, setShow] = useState(false);
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 24 }}
        className="bg-card border rounded-2xl p-5 w-full max-w-sm shadow-xl space-y-4"
      >
        <div>
          <h3 className="font-semibold text-foreground">Change Password</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Choose a strong password you haven't used before.</p>
        </div>
        <div className="space-y-3">
          {["Current password", "New password", "Confirm new password"].map((lbl, i) => (
            <div key={i} className="space-y-1">
              <Label className="text-xs">{lbl}</Label>
              <div className="relative">
                <Input type={show ? "text" : "password"} className="pr-9 h-9 text-sm" />
                <button
                  onClick={() => setShow(v => !v)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {show ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2 pt-1">
          <Button variant="outline" className="flex-1 h-9" onClick={onClose}>Cancel</Button>
          <Button className="flex-1 h-9" onClick={onClose}>Update password</Button>
        </div>
      </motion.div>
    </div>
  );
}

const SESSIONS = [
  { device: "Chrome on Android",  location: "Nairobi, Kenya",        time: "Active now",     icon: Smartphone, current: true  },
  { device: "Chrome on Windows",  location: "Nairobi, Kenya",        time: "2 hours ago",    icon: Monitor,    current: false },
  { device: "Safari on iPhone",   location: "Mombasa, Kenya",        time: "3 days ago",     icon: Smartphone, current: false },
];

function SecurityTab() {
  const [showPwd, setShowPwd] = useState(false);
  const [twoFa, setTwoFa] = useState(false);

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {showPwd && <PasswordDialog onClose={() => setShowPwd(false)} />}
      </AnimatePresence>

      <SectionCard title="Password" description="A strong password protects your stores and earnings. Update it regularly.">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-muted">
              <Lock className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Password</p>
              <p className="text-xs text-muted-foreground">Last changed 30 days ago</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={() => setShowPwd(true)}>
            Change
          </Button>
        </div>
      </SectionCard>

      <SectionCard
        title="Two-Step Verification"
        description="Add an extra layer of security. After entering your password, verify your identity with a code sent to your phone."
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={cn("p-2 rounded-xl transition-colors", twoFa ? "bg-emerald-500/10" : "bg-muted")}>
              <KeyRound className={cn("h-4 w-4 transition-colors", twoFa ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground")} />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground flex items-center gap-2">
                Two-step verification
                <Badge variant="secondary" className={cn("text-[10px] px-1.5 py-0", twoFa ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "")}>
                  {twoFa ? "On" : "Off"}
                </Badge>
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {twoFa ? "Your account is protected with 2-step verification." : "Protect your account with an SMS verification code."}
              </p>
            </div>
          </div>
          <Switch checked={twoFa} onCheckedChange={setTwoFa} />
        </div>
        {twoFa && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t border-border"
          >
            <p className="text-xs text-muted-foreground flex items-start gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
              Verification codes will be sent to your phone +254 712 *** 678 when you sign in.
            </p>
          </motion.div>
        )}
      </SectionCard>

      <SectionCard title="Active Sessions" description="Devices currently signed in to your Sokoa account. Sign out of any session you don't recognise.">
        <div className="space-y-0 divide-y divide-border">
          {SESSIONS.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="flex items-center gap-3 py-3.5 first:pt-0 last:pb-0">
                <div className="p-2 rounded-xl bg-muted shrink-0">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground flex items-center gap-2 flex-wrap">
                    {s.device}
                    {s.current && (
                      <Badge className="text-[9px] px-1.5 py-0 bg-primary/10 text-primary border-primary/20 font-semibold">
                        This device
                      </Badge>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{s.location} · {s.time}</p>
                </div>
                {!s.current && (
                  <button className="text-xs text-destructive hover:underline shrink-0 font-medium">
                    Sign out
                  </button>
                )}
              </div>
            );
          })}
        </div>
        <div className="mt-4 pt-4 border-t border-border">
          <Button variant="outline" size="sm" className="text-destructive border-destructive/30 hover:bg-destructive/5 gap-1.5 w-full sm:w-auto">
            <LogOut className="h-3.5 w-3.5" /> Sign out all other sessions
          </Button>
        </div>
      </SectionCard>
    </div>
  );
}

interface NotifSetting {
  id: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  email: boolean;
  sms: boolean;
}

const DEFAULT_NOTIFS: NotifSetting[] = [
  { id: "orders",   label: "New Orders",        description: "When a customer places an order in any of your stores.", icon: ShoppingBag,    email: true,  sms: true  },
  { id: "payouts",  label: "Payout Processed",  description: "When your daily M-Pesa or bank payout is sent.",         icon: Wallet,         email: true,  sms: true  },
  { id: "stock",    label: "Low Stock Alerts",  description: "When a product drops below 5 units.",                     icon: Package,        email: true,  sms: false },
  { id: "messages", label: "Customer Messages", description: "When a customer sends you a message.",                    icon: MessageSquare,  email: false, sms: false },
  { id: "platform", label: "Platform Updates",  description: "New features, maintenance and Sokoa announcements.",      icon: Zap,            email: true,  sms: false },
];

function NotificationsTab() {
  const [notifs, setNotifs] = useState(DEFAULT_NOTIFS);

  const toggle = (id: string, channel: "email" | "sms") => {
    setNotifs(prev => prev.map(n => n.id === id ? { ...n, [channel]: !n[channel] } : n));
  };

  return (
    <div className="space-y-4">
      <SectionCard
        title="Notification Preferences"
        description="Choose how and when Sokoa contacts you. SMS alerts may incur standard carrier rates."
      >
        <div className="divide-y divide-border">
          <div className="grid grid-cols-[1fr_44px_44px] items-center gap-2 pb-3">
            <span />
            <span className="text-[10px] font-semibold text-muted-foreground text-center uppercase tracking-wide">Email</span>
            <span className="text-[10px] font-semibold text-muted-foreground text-center uppercase tracking-wide">SMS</span>
          </div>
          {notifs.map(n => {
            const Icon = n.icon;
            return (
              <div key={n.id} className="grid grid-cols-[1fr_44px_44px] items-center gap-2 py-4">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="p-1.5 rounded-lg bg-muted mt-0.5 shrink-0">
                    <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground">{n.label}</p>
                    <p className="text-[11px] text-muted-foreground leading-relaxed mt-0.5">{n.description}</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <Switch checked={n.email} onCheckedChange={() => toggle(n.id, "email")} className="scale-90" />
                </div>
                <div className="flex justify-center">
                  <Switch checked={n.sms} onCheckedChange={() => toggle(n.id, "sms")} className="scale-90" />
                </div>
              </div>
            );
          })}
        </div>
      </SectionCard>
    </div>
  );
}

const PLAN_FEATURES = [
  { label: "Free stores",       value: "6 stores",       included: true  },
  { label: "Published stores",  value: "3 live at once", included: true  },
  { label: "Products per store", value: "50 products",   included: true  },
  { label: "M-Pesa payouts",    value: "Daily",          included: true  },
  { label: "Custom domain",     value: "—",              included: false },
  { label: "Remove Sokoa badge", value: "—",             included: false },
  { label: "Analytics export",  value: "—",              included: false },
  { label: "Team members",      value: "—",              included: false },
  { label: "Priority support",  value: "—",              included: false },
];

function PlanTab() {
  return (
    <div className="space-y-4">
      <SectionCard title="Current Plan">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2">
              <p className="text-xl font-bold text-foreground">Starter</p>
              <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">Active</Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Free plan · Renews automatically</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-foreground">Free</p>
            <p className="text-xs text-muted-foreground">No credit card required</p>
          </div>
        </div>

        <div className="mt-5 space-y-2.5">
          {PLAN_FEATURES.map((f, i) => (
            <div key={i} className="flex items-center justify-between gap-3 text-sm">
              <span className={cn("flex items-center gap-2", !f.included && "text-muted-foreground")}>
                {f.included
                  ? <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                  : <X className="h-3.5 w-3.5 text-muted-foreground/40 shrink-0" />}
                {f.label}
              </span>
              <span className={cn("text-xs font-medium shrink-0", f.included ? "text-foreground" : "text-muted-foreground/50")}>
                {f.value}
              </span>
            </div>
          ))}
        </div>
      </SectionCard>

      <Card className="border-primary/30 bg-primary/[0.03] dark:bg-primary/[0.06] overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none opacity-30" style={{
          backgroundImage: "radial-gradient(ellipse at top right, hsl(var(--primary)/0.15) 0%, transparent 70%)"
        }} />
        <CardContent className="p-5">
          <div className="flex items-start gap-3 mb-4">
            <div className="p-2 rounded-xl bg-primary/10">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="font-bold text-foreground">Upgrade to Sokoa Pro</p>
              <p className="text-xs text-muted-foreground mt-0.5">Remove limits, unlock analytics exports, custom domains, and priority support.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-4">
            {["Custom domain", "Remove branding", "Analytics CSV export", "Unlimited products", "Team members", "Priority support"].map(f => (
              <div key={f} className="flex items-center gap-1.5 text-xs text-foreground">
                <Check className="h-3 w-3 text-primary shrink-0" />
                {f}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <span className="text-2xl font-bold text-foreground">KES 2,500</span>
              <span className="text-xs text-muted-foreground"> / month</span>
            </div>
            <Button className="gap-1.5">
              <Sparkles className="h-3.5 w-3.5" /> Upgrade to Pro
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");

  const tabContent = {
    profile:       <ProfileTab />,
    security:      <SecurityTab />,
    notifications: <NotificationsTab />,
    plan:          <PlanTab />,
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-300 max-w-2xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Manage your account, security, and preferences.</p>
      </div>

      <div className="flex items-center gap-1 overflow-x-auto pb-px border-b border-border">
        {TABS.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-1.5 px-3.5 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 -mb-px transition-colors shrink-0",
                activeTab === tab.id
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.15 }}
        >
          {tabContent[activeTab]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
