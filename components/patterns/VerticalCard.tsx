"use client";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { LEARNING_TYPES } from "@/lib/constants";
import type { LearningRecord } from "@/types";

interface VerticalCardProps {
  vertical: string;
  learnings: LearningRecord[];
}

export function VerticalCard({ vertical, learnings }: VerticalCardProps) {
  // Breakdown by type
  const byType: Record<string, number> = {};
  learnings.forEach((l) => {
    byType[l.type] = (byType[l.type] || 0) + 1;
  });

  // Top 3 "what worked"
  const whatWorked = learnings
    .filter((l) => l.type === "WHAT_WORKED")
    .slice(0, 3);

  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-zinc-100">{vertical}</h3>
        <span className="text-sm text-zinc-500">
          {learnings.length} learning{learnings.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {Object.entries(byType).map(([type, count]) => {
          const typeInfo = LEARNING_TYPES.find((t) => t.value === type);
          return (
            <Badge key={type} color={typeInfo?.color}>
              {typeInfo?.label}: {count}
            </Badge>
          );
        })}
      </div>

      {whatWorked.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-zinc-500 uppercase">
            Top what worked
          </p>
          {whatWorked.map((l) => (
            <p key={l.id} className="text-sm text-zinc-300">
              {l.content}
            </p>
          ))}
        </div>
      )}
    </Card>
  );
}
