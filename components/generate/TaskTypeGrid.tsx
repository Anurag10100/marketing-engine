"use client";

import {
  Linkedin,
  Mail,
  CalendarPlus,
  Newspaper,
  MessageSquare,
  FileText,
  Smartphone,
  Mic,
  Handshake,
  ClipboardCheck,
} from "lucide-react";
import { TASK_TYPES } from "@/lib/constants";
import type { TaskType } from "@/types";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Linkedin,
  Mail,
  CalendarPlus,
  Newspaper,
  MessageSquare,
  FileText,
  Smartphone,
  Mic,
  Handshake,
  ClipboardCheck,
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
            className={`flex items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors ${
              isActive
                ? "bg-amber-500/10 text-amber-500 ring-1 ring-amber-500/30"
                : "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
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
