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
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            value === v.value
              ? "bg-amber-500 text-zinc-900"
              : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100"
          }`}
        >
          {v.label}
        </button>
      ))}
    </div>
  );
}
