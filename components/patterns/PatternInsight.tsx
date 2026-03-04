"use client";

import { Card } from "@/components/ui/Card";
import { TrendingUp } from "lucide-react";
import type { Learning } from "@/types";

interface PatternInsightProps {
  learnings: Learning[];
}

export function PatternInsight({ learnings }: PatternInsightProps) {
  const performanceLearnings = learnings
    .filter(
      (l) =>
        l.type === "PERFORMANCE" &&
        (l.content.includes("%") || l.content.toLowerCase().includes("open rate"))
    )
    .slice(0, 10);

  if (performanceLearnings.length === 0) {
    return null;
  }

  return (
    <Card>
      <div className="mb-4 flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-success" />
        <h3 className="font-mono text-sm font-semibold uppercase tracking-wider text-text-primary">
          Top Performing Patterns
        </h3>
      </div>

      <div className="space-y-3">
        {performanceLearnings.map((l, i) => (
          <div
            key={l.id}
            className="flex items-start gap-3 text-sm text-text-secondary"
          >
            <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-success/10 font-mono text-[11px] font-bold text-success">
              {i + 1}
            </span>
            <p>{l.content}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
