import { cn } from "@/lib/utils";
import { formatKes } from "@/lib/mock-data";

interface PriceBadgeProps {
  priceKes: number;
  originalPriceKes?: number | null;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function PriceBadge({ priceKes, originalPriceKes, size = "md", className }: PriceBadgeProps) {
  const discount = originalPriceKes
    ? Math.round(((originalPriceKes - priceKes) / originalPriceKes) * 100)
    : null;

  const priceClass = {
    sm: "text-base font-bold",
    md: "text-xl font-bold",
    lg: "text-2xl font-bold",
    xl: "text-4xl font-extrabold",
  }[size];

  const originalClass = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
    xl: "text-lg",
  }[size];

  return (
    <div className={cn("flex items-baseline gap-2 flex-wrap", className)}>
      <span className={cn("text-primary", priceClass)}>{formatKes(priceKes)}</span>
      {originalPriceKes && (
        <span className={cn("text-muted-foreground line-through", originalClass)}>
          {formatKes(originalPriceKes)}
        </span>
      )}
      {discount && discount > 0 && (
        <span className="text-xs font-semibold bg-secondary/15 text-secondary px-2 py-0.5 rounded-full">
          -{discount}%
        </span>
      )}
    </div>
  );
}
