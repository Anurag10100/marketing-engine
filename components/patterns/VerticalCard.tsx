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
  const byType: Record<string, number> = {};
  learnings.forEach((l) => {
    byType[l.type] = (byType[l.type] || 0) + 1;
  });

  const whatWorked = learnings
    .filter((l) => l.type === "WHAT_WORKED")
    .slice(0, 3);

  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-mono text-sm font-semibold uppercase tracking-wider text-text-primary">
          {vertical}
        </h3>
        <span className="font-mono text-[11px] text-text-muted">
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
        <div className="space-y-2 border-t border-border-default pt-3">
          <p className="font-mono text-[11px] font-medium uppercase tracking-wider text-text-muted">
            Top what worked
          </p>
          {whatWorked.map((l) => (
            <p key={l.id} className="text-sm text-text-secondary">
              {l.content}
            </p>
          ))}
        </div>
      )}
    </Card>
  );
}
