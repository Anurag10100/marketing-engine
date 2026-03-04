"use client";

import {
  Linkedin,
  Mail,
  Newspaper,
  FileText,
  Smartphone,
  Mic,
  Handshake,
  ClipboardCheck,
  Globe,
  Pencil,
} from "lucide-react";
import { TASK_TYPES } from "@/lib/constants";
import type { TaskType } from "@/types";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Linkedin,
  Mail,
  Newspaper,
  FileText,
  Smartphone,
  Mic,
  Handshake,
  ClipboardCheck,
  Globe,
  Pencil,
};

interface TaskTypeGridProps {
  value: TaskType;
  onChange: (t: TaskType) => void;
}

export function TaskTypeGrid({ value, onChange }: TaskTypeGridProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {TASK_TYPES.map((task) => {
        const Icon = iconMap[task.icon];
        const isActive = value === task.value;
        return (
          <button
            key={task.value}
            onClick={() => onChange(task.value)}
            className={`flex items-center gap-3 rounded-[6px] px-4 py-3 text-left text-sm font-medium transition-all duration-200 ${
              isActive
                ? "bg-[rgba(245,158,11,0.15)] text-accent border border-border-active"
                : "bg-bg-elevated text-text-secondary border border-border-default hover:border-border-active hover:text-text-primary"
            }`}
          >
            {Icon && <Icon className="h-4 w-4 flex-shrink-0" />}
            <span>{task.label}</span>
          </button>
        );
      })}
    </div>
  );
}
