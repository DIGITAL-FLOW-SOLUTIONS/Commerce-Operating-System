import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SokoaLogo } from "@/components/SokoaLogo";
import { SEO } from "@/components/SEO";
import { Download } from "lucide-react";

const downloads = [
  { label: "Primary (stacked)", file: "sokoa-stacked.svg" },
  { label: "Primary — dark", file: "sokoa-stacked-dark.svg" },
  { label: "Secondary (horizontal)", file: "sokoa-horizontal.svg" },
  { label: "Secondary — dark", file: "sokoa-horizontal-dark.svg" },
  { label: "Submark / Favicon", file: "sokoa-submark.svg" },
  { label: "Submark — dark surface", file: "sokoa-submark-dark.svg" },
  { label: "Mark only", file: "sokoa-mark.svg" },
  { label: "Mark monochrome", file: "sokoa-mark-mono.svg" },
];

const palette = [
  { name: "Primary — Sokoa Emerald", hex: "#10B981", hsl: "hsl(160, 84%, 39%)", text: "white" },
  { name: "Secondary — Live Spark", hex: "#F97316", hsl: "hsl(25, 95%, 53%)", text: "white" },
  { name: "Foreground — Ink", hex: "#171717", hsl: "hsl(0, 0%, 9%)", text: "white" },
  { name: "Surface — Paper", hex: "#FAFAFA", hsl: "hsl(0, 0%, 98%)", text: "#171717" },
];

export default function Brand() {
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Brand & Logo System" description="Sokoa brand identity — primary, secondary, and submark logos." />
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
            Brand System · v1.0
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-extrabold text-foreground leading-[1.05] tracking-tight mb-6">
            The Sokoa<br />logo system.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
            Three logo variants built around the <strong className="text-foreground">"S-spark"</strong> monogram — a flowing
            S letterform paired with an orange live-spark dot, mirroring the energy of social commerce in motion.
          </p>
        </div>
      </section>

      {/* 1. Primary Logo */}
      <section className="py-16 md:py-20 border-t bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-start">
            <div>
              <div className="text-xs font-bold text-primary tracking-widest mb-3">01 · PRIMARY</div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4 tracking-tight">Stacked Logo</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The complete identifier — mark, wordmark, and tagline. Use it on website headers, business cards,
                pitch decks, brand packaging, and large-scale collateral. Minimum height: 96px.
              </p>
              <div className="text-xs text-muted-foreground space-y-1 font-mono">
                <div>Tagline: SOCIAL · TO · STORE</div>
                <div>Min size: 96px tall</div>
                <div>Clear space: 1× mark height</div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-muted/40 rounded-3xl p-12 flex items-center justify-center min-h-[260px]">
                <SokoaLogo variant="stacked" theme="light" height={200} />
              </div>
              <div className="bg-foreground rounded-3xl p-12 flex items-center justify-center min-h-[260px]">
                <SokoaLogo variant="stacked" theme="dark" height={200} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Secondary Logo */}
      <section className="py-16 md:py-20 border-t bg-muted/20">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-start">
            <div>
              <div className="text-xs font-bold text-primary tracking-widest mb-3">02 · SECONDARY</div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4 tracking-tight">Horizontal Logo</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Compact mark + wordmark for tight horizontal spaces — site navbar, email signatures, mobile headers,
                browser tabs, and footer credits. The default working logo.
              </p>
              <div className="text-xs text-muted-foreground space-y-1 font-mono">
                <div>Min size: 24px tall</div>
                <div>Clear space: 0.5× mark height</div>
                <div>Used in: Navbar, Footer, Email</div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-10 flex flex-col items-center justify-center gap-6 min-h-[200px] border">
                <SokoaLogo variant="horizontal" theme="light" height={56} />
                <SokoaLogo variant="horizontal" theme="light" height={36} />
                <SokoaLogo variant="horizontal" theme="light" height={24} />
              </div>
              <div className="bg-foreground rounded-3xl p-10 flex flex-col items-center justify-center gap-6 min-h-[200px]">
                <SokoaLogo variant="horizontal" theme="dark" height={56} />
                <SokoaLogo variant="horizontal" theme="dark" height={36} />
                <SokoaLogo variant="horizontal" theme="dark" height={24} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Submark / Favicon */}
      <section className="py-16 md:py-20 border-t bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-start">
            <div>
              <div className="text-xs font-bold text-primary tracking-widest mb-3">03 · SUBMARK</div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4 tracking-tight">Icon & Favicon</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The most distilled mark — just the S-spark in a rounded container. Built for the smallest applications:
                browser favicon, app icon, social avatar, watermark, push notifications.
              </p>
              <div className="text-xs text-muted-foreground space-y-1 font-mono">
                <div>Min size: 16px (favicon)</div>
                <div>Container: 14px corner radius</div>
                <div>Spark dot: never remove</div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-muted/40 rounded-3xl p-10 flex items-end justify-center gap-8 flex-wrap min-h-[200px]">
                <div className="flex flex-col items-center gap-2">
                  <SokoaLogo variant="submark" height={120} />
                  <span className="text-xs text-muted-foreground font-mono">120px</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <SokoaLogo variant="submark" height={64} />
                  <span className="text-xs text-muted-foreground font-mono">64px</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <SokoaLogo variant="submark" height={40} />
                  <span className="text-xs text-muted-foreground font-mono">40px</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <SokoaLogo variant="submark" height={32} />
                  <span className="text-xs text-muted-foreground font-mono">32px</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <SokoaLogo variant="submark" height={16} />
                  <span className="text-xs text-muted-foreground font-mono">16px</span>
                </div>
              </div>

              {/* Realistic context: avatar + favicon mocks */}
              <div className="grid sm:grid-cols-3 gap-4">
                {/* Browser tab mock */}
                <div className="bg-muted/40 rounded-2xl p-6 flex flex-col items-center gap-3">
                  <div className="bg-white rounded-lg shadow-sm border w-full px-3 py-2 flex items-center gap-2">
                    <SokoaLogo variant="submark" height={16} />
                    <span className="text-xs text-foreground font-medium truncate">Sokoa</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Browser tab</span>
                </div>
                {/* Social avatar mock */}
                <div className="bg-muted/40 rounded-2xl p-6 flex flex-col items-center gap-3">
                  <div className="rounded-full overflow-hidden w-16 h-16 border-2 border-white shadow">
                    <SokoaLogo variant="submark" height={64} className="rounded-full" />
                  </div>
                  <span className="text-xs text-muted-foreground">Social avatar</span>
                </div>
                {/* App icon mock */}
                <div className="bg-muted/40 rounded-2xl p-6 flex flex-col items-center gap-3">
                  <div className="shadow-lg shadow-primary/20 rounded-2xl">
                    <SokoaLogo variant="submark" height={72} />
                  </div>
                  <span className="text-xs text-muted-foreground">App icon</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Color Palette */}
      <section className="py-16 md:py-20 border-t bg-muted/20">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="text-xs font-bold text-primary tracking-widest mb-3">COLOR</div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-8 tracking-tight">Brand Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {palette.map((c) => (
              <div key={c.hex} className="rounded-2xl overflow-hidden border bg-white">
                <div className="h-32 flex items-end p-4" style={{ background: c.hex, color: c.text }}>
                  <span className="font-mono text-sm font-bold">{c.hex}</span>
                </div>
                <div className="p-4">
                  <div className="text-sm font-bold text-foreground">{c.name}</div>
                  <div className="text-xs text-muted-foreground font-mono mt-1">{c.hsl}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="py-16 md:py-20 border-t bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="text-xs font-bold text-primary tracking-widest mb-3">TYPOGRAPHY</div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-8 tracking-tight">Typeface System</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-muted/40 rounded-3xl p-8">
              <div className="text-xs text-muted-foreground font-mono mb-3">DISPLAY · OUTFIT</div>
              <div className="font-display font-extrabold text-6xl text-foreground tracking-tight leading-none mb-4">Aa</div>
              <div className="font-display font-extrabold text-2xl text-foreground tracking-tight">Your social hustle.</div>
              <div className="text-sm text-muted-foreground mt-4">Used for headlines, the wordmark, and statistic numerals.</div>
            </div>
            <div className="bg-muted/40 rounded-3xl p-8">
              <div className="text-xs text-muted-foreground font-mono mb-3">BODY · PLUS JAKARTA SANS</div>
              <div className="font-sans font-bold text-6xl text-foreground tracking-tight leading-none mb-4">Aa</div>
              <div className="font-sans text-base text-foreground leading-relaxed">
                Drop your Facebook Page or Instagram link. We'll build you a beautiful online store with M-Pesa checkout in literally seconds.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Don'ts */}
      <section className="py-16 md:py-20 border-t bg-muted/20">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="text-xs font-bold text-primary tracking-widest mb-3">DO NOT</div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-8 tracking-tight">Logo Misuse</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-6 border-2 border-red-200">
              <div className="bg-muted/40 rounded-xl h-24 flex items-center justify-center mb-3" style={{ filter: "hue-rotate(120deg)" }}>
                <SokoaLogo variant="submark" height={56} />
              </div>
              <div className="text-xs font-bold text-red-600">✗ Don't recolor</div>
            </div>
            <div className="bg-white rounded-2xl p-6 border-2 border-red-200">
              <div className="bg-muted/40 rounded-xl h-24 flex items-center justify-center mb-3">
                <div style={{ transform: "scaleX(1.6)" }}>
                  <SokoaLogo variant="submark" height={48} />
                </div>
              </div>
              <div className="text-xs font-bold text-red-600">✗ Don't stretch</div>
            </div>
            <div className="bg-white rounded-2xl p-6 border-2 border-red-200">
              <div className="bg-muted/40 rounded-xl h-24 flex items-center justify-center mb-3">
                <div style={{ transform: "rotate(15deg)" }}>
                  <SokoaLogo variant="submark" height={56} />
                </div>
              </div>
              <div className="text-xs font-bold text-red-600">✗ Don't rotate</div>
            </div>
            <div className="bg-white rounded-2xl p-6 border-2 border-red-200">
              <div className="bg-secondary/80 rounded-xl h-24 flex items-center justify-center mb-3">
                <SokoaLogo variant="submark" height={56} />
              </div>
              <div className="text-xs font-bold text-red-600">✗ Don't clash bg</div>
            </div>
          </div>
        </div>
      </section>

      {/* Downloads */}
      <section className="py-16 md:py-20 border-t bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="text-xs font-bold text-primary tracking-widest mb-3">ASSETS</div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-8 tracking-tight">Download SVGs</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {downloads.map((d) => (
              <a
                key={d.file}
                href={`${baseUrl}logos/${d.file}`}
                download
                className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl border bg-white hover:bg-muted/40 hover:border-primary/40 transition-colors group"
              >
                <span className="text-sm font-medium text-foreground truncate">{d.label}</span>
                <Download className="w-4 h-4 text-muted-foreground group-hover:text-primary shrink-0" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
