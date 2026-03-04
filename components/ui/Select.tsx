"use client";

import { SelectHTMLAttributes, forwardRef } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, className = "", ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && (
          <label className="font-mono text-xs font-medium uppercase tracking-wider text-text-muted">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={`w-full rounded-[6px] border border-border-default bg-bg-elevated px-4 py-2 text-sm text-text-primary focus:border-border-active focus:outline-none focus:ring-1 focus:ring-accent/30 ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

Select.displayName = "Select";
