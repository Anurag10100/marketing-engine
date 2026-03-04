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
          <label className="text-sm font-medium text-zinc-400">{label}</label>
        )}
        <textarea
          ref={ref}
          className={`w-full min-h-[140px] resize-y rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50 ${className}`}
          {...props}
        />
        {maxChars !== undefined && (
          <div className="text-right text-xs text-zinc-500">
            {charCount ?? 0}/{maxChars}
          </div>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
