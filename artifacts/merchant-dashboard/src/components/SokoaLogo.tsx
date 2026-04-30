interface SokoaLogoProps {
  variant?: "horizontal" | "stacked" | "submark" | "mark";
  theme?: "light" | "dark";
  className?: string;
  height?: number;
}

export function SokoaLogo({ variant = "horizontal", theme = "light", className = "", height }: SokoaLogoProps) {
  const wordColor = theme === "dark" ? "#FAFAFA" : "#171717";
  const taglineColor = theme === "dark" ? "#A3A3A3" : "#737373";

  if (variant === "submark") {
    const size = height ?? 40;
    return (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} aria-label="Sokoa">
        <rect width="64" height="64" rx="14" fill="#10B981" />
        <path
          d="M46 20C46 16 42 12 36 12L26 12C20 12 16 16 16 22C16 28 20 32 26 32L38 32C44 32 48 36 48 42C48 48 44 52 38 52L26 52C20 52 16 48 16 44"
          stroke="#FFFFFF"
          strokeWidth="6.5"
          strokeLinecap="round"
        />
        <circle cx="50" cy="14" r="6" fill="#F97316" stroke="#10B981" strokeWidth="2.5" />
      </svg>
    );
  }

  if (variant === "mark") {
    const size = height ?? 40;
    return (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} aria-label="Sokoa">
        <path
          d="M46 20C46 16 42 12 36 12L26 12C20 12 16 16 16 22C16 28 20 32 26 32L38 32C44 32 48 36 48 42C48 48 44 52 38 52L26 52C20 52 16 48 16 44"
          stroke="#10B981"
          strokeWidth="6.5"
          strokeLinecap="round"
        />
        <circle cx="50" cy="14" r="6" fill="#F97316" />
      </svg>
    );
  }

  if (variant === "stacked") {
    const w = height ? (height * 240) / 180 : 200;
    const h = height ?? 150;
    return (
      <svg width={w} height={h} viewBox="0 0 240 180" fill="none" className={className} aria-label="Sokoa">
        <g transform="translate(88, 0)">
          <rect width="64" height="64" rx="14" fill="#10B981" />
          <path
            d="M46 20C46 16 42 12 36 12L26 12C20 12 16 16 16 22C16 28 20 32 26 32L38 32C44 32 48 36 48 42C48 48 44 52 38 52L26 52C20 52 16 48 16 44"
            stroke="#FFFFFF"
            strokeWidth="6.5"
            strokeLinecap="round"
          />
          <circle cx="50" cy="14" r="6" fill="#F97316" stroke="#10B981" strokeWidth="2.5" />
        </g>
        <text
          x="120"
          y="125"
          textAnchor="middle"
          fontFamily="'Outfit', system-ui, sans-serif"
          fontSize="44"
          fontWeight="800"
          fill={wordColor}
          letterSpacing="-2"
        >
          sokoa
        </text>
        <text
          x="120"
          y="160"
          textAnchor="middle"
          fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
          fontSize="13"
          fontWeight="600"
          fill={taglineColor}
          letterSpacing="3"
        >
          SOCIAL · TO · STORE
        </text>
      </svg>
    );
  }

  // horizontal (default)
  const h = height ?? 36;
  const w = (h * 240) / 64;
  return (
    <svg width={w} height={h} viewBox="0 0 240 64" fill="none" className={className} aria-label="Sokoa">
      <g>
        <path
          d="M46 20C46 16 42 12 36 12L26 12C20 12 16 16 16 22C16 28 20 32 26 32L38 32C44 32 48 36 48 42C48 48 44 52 38 52L26 52C20 52 16 48 16 44"
          stroke="#10B981"
          strokeWidth="6.5"
          strokeLinecap="round"
        />
        <circle cx="50" cy="14" r="6" fill="#F97316" />
      </g>
      <text
        x="76"
        y="44"
        fontFamily="'Outfit', system-ui, sans-serif"
        fontSize="36"
        fontWeight="800"
        fill={wordColor}
        letterSpacing="-1.5"
      >
        sokoa
      </text>
    </svg>
  );
}
