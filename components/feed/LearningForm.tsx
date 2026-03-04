"use client";

import { useState } from "react";
import { VERTICALS, LEARNING_TYPES } from "@/lib/constants";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Plus, Check } from "lucide-react";
import type { Vertical, LearningType } from "@/types";

interface LearningFormProps {
  onSubmit: (data: {
    vertical: string;
    type: string;
    content: string;
  }) => void;
  loading?: boolean;
}

export function LearningForm({ onSubmit, loading }: LearningFormProps) {
  const [vertical, setVertical] = useState<Vertical>("BFSI");
  const [type, setType] = useState<LearningType>("WHAT_WORKED");
  const [content, setContent] = useState("");
  const [success, setSuccess] = useState(false);

  const selectedType = LEARNING_TYPES.find((t) => t.value === type);

  const handleSubmit = () => {
    if (!content.trim()) return;
    onSubmit({ vertical, type, content: content.trim() });
    setContent("");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <div className="space-y-5">
      {/* Vertical selector */}
      <div>
        <label className="mb-2 block font-mono text-xs font-medium uppercase tracking-wider text-text-muted">
          Vertical
        </label>
        <div className="flex flex-wrap gap-2">
          {VERTICALS.map((v) => (
            <button
              key={v.value}
              onClick={() => setVertical(v.value)}
              className={`rounded-chip px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-wider transition-all duration-200 ${
                vertical === v.value
                  ? "bg-accent text-bg-primary"
                  : "bg-bg-surface text-text-muted border border-border-default hover:border-border-active"
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      {/* Learning type selector */}
      <div>
        <label className="mb-2 block font-mono text-xs font-medium uppercase tracking-wider text-text-muted">
          Type
        </label>
        <div className="flex flex-wrap gap-2">
          {LEARNING_TYPES.map((lt) => (
            <button
              key={lt.value}
              onClick={() => setType(lt.value)}
              className={`rounded-chip px-3 py-1.5 font-mono text-[11px] font-medium transition-all duration-200 ${
                type === lt.value
                  ? "ring-1"
                  : "opacity-60 hover:opacity-100"
              }`}
              style={{
                backgroundColor: `${lt.color}15`,
                color: lt.color,
                ...(type === lt.value
                  ? { ringColor: lt.color }
                  : {}),
              }}
            >
              {lt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <Textarea
        label="Learning"
        placeholder={selectedType?.placeholder ?? "Enter your learning..."}
        value={content}
        onChange={(e) => {
          if (e.target.value.length <= 500) setContent(e.target.value);
        }}
        charCount={content.length}
        maxChars={500}
      />

      {/* Submit */}
      <Button
        onClick={handleSubmit}
        disabled={!content.trim()}
        loading={loading}
        className={success ? "success-flash !bg-success" : ""}
      >
        {success ? (
          <>
            <Check className="h-4 w-4" />
            Added
          </>
        ) : (
          <>
            <Plus className="h-4 w-4" />
            Add Learning
          </>
        )}
      </Button>
    </div>
  );
}
