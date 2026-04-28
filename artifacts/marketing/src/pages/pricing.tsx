import { SEO } from "@/components/SEO";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useListPricingPlans, getListPricingPlansQueryKey } from "@workspace/api-client-react";
import { formatKES } from "@/lib/format";
import { CheckCircle2 } from "lucide-react";
import { Link } from "wouter";

export default function Pricing() {
  const { data: plans, isLoading } = useListPricingPlans({ query: { queryKey: getListPricingPlansQueryKey() } });

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Pricing | Sokoa" description="Simple, transparent pricing for African merchants. Pay per hour for TikTok live, or get a full boutique subscription." />
      <Navbar />

      <section className="pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-foreground leading-[1.1] tracking-tight mb-6">
              Pricing that makes sense for the hustle.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              No hidden transaction fees on top of M-Pesa charges. Choose the model that fits how you sell.
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center p-12">
              <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans?.map((plan) => (
                <div 
                  key={plan.id} 
                  className={`bg-card rounded-3xl p-8 border-2 relative flex flex-col ${
                    plan.popular ? "border-primary shadow-xl shadow-primary/10" : "border-border shadow-sm"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold tracking-wide uppercase">
                      Most Popular
                    </div>
                  )}
                  
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold font-display mb-2">{plan.name}</h3>
                    <p className="text-muted-foreground text-sm h-10">{plan.tagline}</p>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-baseline gap-1">
                      {plan.priceKes === 0 ? (
                        <span className="text-4xl font-extrabold">Free</span>
                      ) : (
                        <>
                          <span className="text-2xl font-bold text-muted-foreground">KES</span>
                          <span className="text-5xl font-extrabold tracking-tight">{plan.priceKes.toLocaleString()}</span>
                        </>
                      )}
                    </div>
                    <div className="text-muted-foreground font-medium mt-1">
                      {plan.priceKes > 0 && `per ${plan.cadence}`}
                    </div>
                  </div>

                  <div className="flex-1">
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 className={`w-5 h-5 shrink-0 ${plan.popular ? "text-primary" : "text-muted-foreground"}`} />
                          <span className="text-sm font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link href={plan.cadence === 'hour' ? "/tiktok" : "/signup"}>
                    <Button 
                      className={`w-full h-12 rounded-xl font-bold text-base ${
                        plan.popular ? "bg-primary hover:bg-primary/90 text-white" : "bg-secondary text-white hover:bg-secondary/90"
                      }`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      {plan.ctaLabel}
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
