"use client";

import { Textarea } from "@/components/ui/Textarea";
import { TASK_TYPES } from "@/lib/constants";
import type { TaskType } from "@/types";

interface ContextInputProps {
  value: string;
  onChange: (v: string) => void;
  taskType: TaskType;
}

export function ContextInput({ value, onChange, taskType }: ContextInputProps) {
  const task = TASK_TYPES.find((t) => t.value === taskType);
  const placeholder = task?.placeholder ?? "Describe what you need...";

  return (
    <Textarea
      label="Context"
      placeholder={placeholder}
      value={value}
      onChange={(e) => {
        if (e.target.value.length <= 1000) onChange(e.target.value);
      }}
      charCount={value.length}
      maxChars={1000}
    />
  );
}
