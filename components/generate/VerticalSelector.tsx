"use client";

import { VERTICALS } from "@/lib/constants";
import type { Vertical } from "@/types";

interface VerticalSelectorProps {
  value: Vertical;
  onChange: (v: Vertical) => void;
  exclude?: Vertical[];
}

export function VerticalSelector({
  value,
  onChange,
  exclude = ["All"],
}: VerticalSelectorProps) {
  const filtered = VERTICALS.filter((v) => !exclude.includes(v.value));

  return (
    <div className="flex flex-wrap gap-2">
      {filtered.map((v) => (
        <button
          key={v.value}
          onClick={() => onChange(v.value)}
          className={`rounded-chip px-4 py-1.5 font-mono text-xs font-medium uppercase tracking-wider transition-all duration-200 ${
            value === v.value
              ? "bg-accent text-bg-primary"
              : "bg-bg-surface text-text-muted border border-border-default hover:border-border-active hover:text-text-primary"
          }`}
        >
          {v.label}
        </button>
      ))}
    </div>
  );
}
