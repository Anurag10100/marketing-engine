"use client";

import { Card } from "@/components/ui/Card";
import { TrendingUp } from "lucide-react";
import type { LearningRecord } from "@/types";

interface PatternInsightProps {
  learnings: LearningRecord[];
}

export function PatternInsight({ learnings }: PatternInsightProps) {
  // Filter PERFORMANCE learnings that mention open rate / %
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
        <TrendingUp className="h-5 w-5 text-green-500" />
        <h3 className="text-lg font-semibold text-zinc-100">
          Top Performing Patterns
        </h3>
      </div>

      <div className="space-y-3">
        {performanceLearnings.map((l, i) => (
          <div
            key={l.id}
            className="flex items-start gap-3 text-sm text-zinc-300"
          >
            <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-500/10 text-xs font-bold text-green-500">
              {i + 1}
            </span>
            <p>{l.content}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
