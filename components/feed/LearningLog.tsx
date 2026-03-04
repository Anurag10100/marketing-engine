"use client";

import { Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { LEARNING_TYPES } from "@/lib/constants";
import type { LearningRecord } from "@/types";

interface LearningLogProps {
  learnings: LearningRecord[];
  isAdmin: boolean;
  onDelete: (id: string) => void;
}

export function LearningLog({
  learnings,
  isAdmin,
  onDelete,
}: LearningLogProps) {
  if (learnings.length === 0) {
    return (
      <div className="flex min-h-[200px] items-center justify-center rounded-card border border-border-default bg-bg-surface">
        <p className="font-mono text-xs uppercase tracking-wider text-text-disabled">
          No learnings yet
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {learnings.map((learning, index) => {
        const typeInfo = LEARNING_TYPES.find(
          (t) => t.value === learning.type
        );
        return (
          <div
            key={learning.id}
            className={`group rounded-[6px] border border-border-default bg-bg-surface p-4 transition-colors duration-200 hover:border-border-active ${
              index === 0 ? "animate-fade-in-down" : ""
            }`}
          >
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge color={typeInfo?.color}>{typeInfo?.label}</Badge>
                <Badge>{learning.vertical}</Badge>
              </div>
              {isAdmin && (
                <button
                  onClick={() => {
                    if (confirm("Delete this learning?")) {
                      onDelete(learning.id);
                    }
                  }}
                  className="rounded-[4px] p-1 text-text-disabled opacity-0 transition-all duration-200 hover:text-danger group-hover:opacity-100"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
            <p className="text-sm text-text-primary">{learning.content}</p>
            <p className="mt-2 font-mono text-[11px] text-text-muted">
              {new Date(learning.createdAt).toLocaleDateString()} — {learning.user?.name ?? "Unknown"}
            </p>
          </div>
        );
      })}
    </div>
  );
}
