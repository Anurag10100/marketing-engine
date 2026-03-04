"use client";

import { Button } from "@/components/ui/Button";
import { Sparkles } from "lucide-react";

interface GenerateButtonProps {
  onClick: () => void;
  disabled: boolean;
  loading: boolean;
  learningsCount: number;
}

export function GenerateButton({
  onClick,
  disabled,
  loading,
  learningsCount,
}: GenerateButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      loading={loading}
      size="lg"
      className="w-full"
    >
      {loading ? (
        <>Generating with {learningsCount} learnings...</>
      ) : (
        <>
          <Sparkles className="h-4 w-4" />
          Generate
        </>
      )}
    </Button>
  );
}
