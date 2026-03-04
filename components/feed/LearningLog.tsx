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
      <div className="flex min-h-[200px] items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-500">
        No learnings yet. Add your first one!
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {learnings.map((learning) => {
        const typeInfo = LEARNING_TYPES.find(
          (t) => t.value === learning.type
        );
        return (
          <div
            key={learning.id}
            className="group rounded-lg border border-zinc-800 bg-zinc-900 p-4"
          >
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge color={typeInfo?.color}>{typeInfo?.label}</Badge>
                <Badge className="bg-zinc-800 text-zinc-400">
                  {learning.vertical}
                </Badge>
              </div>
              {isAdmin && (
                <button
                  onClick={() => {
                    if (confirm("Delete this learning?")) {
                      onDelete(learning.id);
                    }
                  }}
                  className="rounded p-1 text-zinc-600 opacity-0 transition-opacity hover:text-red-500 group-hover:opacity-100"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
            <p className="text-sm text-zinc-300">{learning.content}</p>
            <p className="mt-2 text-xs text-zinc-600">
              {new Date(learning.createdAt).toLocaleDateString()} by{" "}
              {learning.user?.name ?? "Unknown"}
            </p>
          </div>
        );
      })}
    </div>
  );
}
