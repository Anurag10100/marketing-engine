"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { VERTICALS } from "@/lib/constants";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Save } from "lucide-react";
import type { VerticalContextData } from "@/types";

interface VerticalEditorProps {
  verticals: VerticalContextData[];
  isAdmin: boolean;
  onSave: (vertical: string, content: string) => void;
  saving?: boolean;
}

export function VerticalEditor({
  verticals,
  isAdmin,
  onSave,
  saving,
}: VerticalEditorProps) {
  const [selected, setSelected] = useState(VERTICALS[0].value);
  const verticalData = verticals.find((v) => v.vertical === selected);
  const [content, setContent] = useState(verticalData?.content ?? "");
  const debounceRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    setContent(verticalData?.content ?? "");
  }, [verticalData]);

  const handleChange = useCallback(
    (value: string) => {
      setContent(value);
      if (!isAdmin) return;
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        onSave(selected, value);
      }, 2000);
    },
    [isAdmin, onSave, selected]
  );

  const filteredVerticals = VERTICALS.filter((v) => v.value !== "All");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-zinc-100">
          Vertical Contexts
        </h3>
        {isAdmin && (
          <Button
            onClick={() => onSave(selected, content)}
            loading={saving}
            size="sm"
          >
            <Save className="h-4 w-4" />
            Save
          </Button>
        )}
      </div>

      <div className="flex gap-6">
        {/* Vertical list */}
        <div className="w-48 space-y-1">
          {filteredVerticals.map((v) => (
            <button
              key={v.value}
              onClick={() => setSelected(v.value)}
              className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                selected === v.value
                  ? "bg-amber-500/10 text-amber-500"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>

        {/* Editor */}
        <div className="flex-1">
          <Textarea
            value={content}
            onChange={(e) => handleChange(e.target.value)}
            disabled={!isAdmin}
            className="min-h-[350px] font-mono text-sm"
          />
          {verticalData?.updatedAt && (
            <p className="mt-2 text-xs text-zinc-500">
              Last updated{" "}
              {new Date(verticalData.updatedAt).toLocaleDateString()}
              {verticalData.updatedBy && ` by ${verticalData.updatedBy}`}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
