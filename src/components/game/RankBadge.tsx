import { cn } from "@/lib/utils/cn";

const RANK_STYLES = [
  "bg-gradient-to-br from-gold to-amber-600 text-black shadow-md shadow-gold/40",
  "bg-gradient-to-br from-silver to-slate-400 text-black shadow-md shadow-white/20",
  "bg-gradient-to-br from-bronze to-amber-800 text-white shadow-md shadow-bronze/30",
];

export interface RankBadgeProps {
  rank: number;
}

export function RankBadge({ rank }: RankBadgeProps) {
  return (
    <span
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold",
        RANK_STYLES[rank - 1] ?? "bg-white/[0.06] text-muted",
      )}
    >
      {rank}
    </span>
  );
}
