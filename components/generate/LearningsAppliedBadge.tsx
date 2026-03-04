"use client";

import { Brain } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

interface LearningsAppliedBadgeProps {
  count: number;
  vertical: string;
}

export function LearningsAppliedBadge({
  count,
  vertical,
}: LearningsAppliedBadgeProps) {
  return (
    <Badge color="#F59E0B" className="gap-1.5">
      <Brain className="h-3 w-3" />
      {count} learning{count !== 1 ? "s" : ""} — {vertical}
    </Badge>
  );
}
