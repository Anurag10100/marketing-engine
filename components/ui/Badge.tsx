"use client";

interface BadgeProps {
  children: React.ReactNode;
  color?: string;
  className?: string;
}

export function Badge({ children, color, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-chip px-2.5 py-0.5 font-mono text-[11px] font-medium uppercase tracking-wider ${className}`}
      style={
        color
          ? { backgroundColor: `${color}15`, color }
          : { backgroundColor: "#152336", color: "#94A3B8" }
      }
    >
      {children}
    </span>
  );
}
