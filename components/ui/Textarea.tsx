"use client";

import { TextareaHTMLAttributes, forwardRef } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  charCount?: number;
  maxChars?: number;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, charCount, maxChars, className = "", ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && (
          <label className="font-mono text-xs font-medium uppercase tracking-wider text-text-muted">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={`w-full min-h-[140px] resize-y rounded-[6px] border border-border-default bg-bg-elevated px-4 py-3 text-sm text-text-primary placeholder-text-disabled focus:border-border-active focus:outline-none focus:ring-1 focus:ring-accent/30 ${className}`}
          {...props}
        />
        {maxChars !== undefined && (
          <div className="text-right font-mono text-[11px] text-text-muted">
            {charCount ?? 0}/{maxChars}
          </div>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
