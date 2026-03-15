import { cn } from "@/lib/utils";

interface StockBadgeProps {
  stock: number;
  lowThreshold?: number;
}

type StockLevel = "out" | "low" | "ok";

function getLevel(stock: number, lowThreshold: number): StockLevel {
  if (stock === 0) return "out";
  if (stock <= lowThreshold) return "low";
  return "ok";
}

const levelStyles: Record<StockLevel, string> = {
  out: "bg-red-50 text-red-600 border-red-200",
  low: "bg-yellow-50 text-yellow-700 border-yellow-200",
  ok:  "bg-green-50 text-green-700 border-green-200",
};

const levelDot: Record<StockLevel, string> = {
  out: "bg-red-500",
  low: "bg-yellow-500",
  ok:  "bg-green-500",
};

const levelLabel: Record<StockLevel, string> = {
  out: "Out of stock",
  low: "Low stock",
  ok:  "In stock",
};

export function StockBadge({ stock, lowThreshold = 20 }: StockBadgeProps) {
  const level = getLevel(stock, lowThreshold);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border",
        levelStyles[level]
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", levelDot[level])} aria-hidden="true" />
      {levelLabel[level]}
      {level !== "out" && (
        <span className="font-normal opacity-70">({stock})</span>
      )}
    </span>
  );
}
