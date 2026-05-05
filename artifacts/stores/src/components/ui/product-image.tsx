import { cn } from "@/lib/utils";

interface ProductImageProps {
  imageUrl?: string | null;
  name: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const GRADIENTS = [
  "from-emerald-400 to-teal-600",
  "from-orange-400 to-rose-500",
  "from-violet-400 to-purple-600",
  "from-sky-400 to-blue-600",
  "from-amber-400 to-orange-500",
  "from-pink-400 to-fuchsia-600",
];

function getGradient(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return GRADIENTS[Math.abs(hash) % GRADIENTS.length];
}

function getInitials(name: string) {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

export function ProductImage({ imageUrl, name, className, size = "md" }: ProductImageProps) {
  const gradient = getGradient(name);
  const initials = getInitials(name);

  const sizeClass = {
    sm: "text-sm",
    md: "text-xl",
    lg: "text-3xl",
    xl: "text-5xl",
  }[size];

  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={name}
        className={cn("object-cover w-full h-full", className)}
      />
    );
  }

  return (
    <div className={cn(`bg-gradient-to-br ${gradient} w-full h-full flex items-center justify-center`, className)}>
      <span className={cn("font-display font-bold text-white/90", sizeClass)}>{initials}</span>
    </div>
  );
}
