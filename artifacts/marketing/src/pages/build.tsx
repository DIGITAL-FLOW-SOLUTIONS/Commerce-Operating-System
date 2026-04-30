import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, Store, Package, Smartphone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";

const steps = [
  { id: 1, label: "Scanning profile & bio...", icon: Store },
  { id: 2, label: "Extracting product images & prices...", icon: Package },
  { id: 3, label: "Configuring M-Pesa gateway...", icon: Smartphone },
  { id: 4, label: "Generating Sokoa storefront...", icon: CheckCircle2 },
];

export default function Build() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  
  // Extract input from query params
  const searchParams = new URLSearchParams(window.location.search);
  const sourceInput = searchParams.get("input") || "your business";

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const runSteps = async () => {
      for (let i = 0; i <= steps.length; i++) {
        setCurrentStep(i);
        if (i < steps.length) {
          // Wait 1-2 seconds per step for realism
          await new Promise(r => setTimeout(r, 1200 + Math.random() * 800));
        }
      }
      setIsComplete(true);
    };

    runSteps();
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <SEO title="Building your store | Sokoa" description="We are building your custom Sokoa storefront." />
      
      <div className="max-w-md w-full bg-card rounded-3xl shadow-xl border p-8 md:p-10 relative overflow-hidden">
        {/* Subtle decorative background */}
        <div className="absolute top-0 left-0 w-full h-2 bg-primary" />
        
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6">
            {isComplete ? <CheckCircle2 className="w-8 h-8" /> : <Store className="w-8 h-8 animate-pulse" />}
          </div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2 tracking-tight">
            {isComplete ? "Your store is ready!" : "Building your store..."}
          </h1>
          <p className="text-muted-foreground text-sm max-w-xs mx-auto truncate px-4">
            Based on: <span className="font-semibold text-foreground">{sourceInput}</span>
          </p>
        </div>

        <div className="space-y-6 mb-10 relative">
          {/* Connecting line */}
          <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-muted" />
          
          {steps.map((step, index) => {
            const isPast = currentStep > index;
            const isCurrent = currentStep === index;
            const Icon = step.icon;

            return (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ 
                  opacity: isPast || isCurrent ? 1 : 0.3, 
                  x: 0,
                  scale: isCurrent ? 1.02 : 1
                }}
                className={`flex items-center gap-4 relative z-10 ${
                  isPast ? "text-primary" : 
                  isCurrent ? "text-foreground font-semibold" : 
                  "text-muted-foreground"
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-colors duration-500 ${
                  isPast ? "bg-primary text-white shadow-md shadow-primary/20" : 
                  isCurrent ? "bg-primary/20 text-primary border-2 border-primary/30" : 
                  "bg-muted border border-border"
                }`}>
                  {isPast ? <CheckCircle2 className="w-6 h-6" /> : 
                   isCurrent && index !== steps.length - 1 ? <Loader2 className="w-5 h-5 animate-spin" /> : 
                   <Icon className="w-5 h-5" />}
                </div>
                <div className="flex-1">
                  <span className="text-[15px]">{step.label}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {isComplete ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Button 
              className="w-full h-14 text-lg font-bold rounded-xl bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 transition-all hover:scale-[1.02]"
              onClick={() => window.location.assign("/~/")}
            >
              Claim your store <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <p className="text-center text-xs text-muted-foreground mt-4 font-medium">Free account. No credit card required.</p>
          </motion.div>
        ) : (
          <div className="h-14" /> /* Placeholder to prevent layout jump */
        )}
      </div>
    </div>
  );
}
