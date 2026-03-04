"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { Save } from "lucide-react";

interface CoreBrainEditorProps {
  corePrompt: string;
  version: number;
  updatedAt: string | null;
  updatedBy: string | null;
  isAdmin: boolean;
  onSave: (corePrompt: string) => void;
  saving?: boolean;
}

export function CoreBrainEditor({
  corePrompt,
  version,
  updatedAt,
  updatedBy,
  isAdmin,
  onSave,
  saving,
}: CoreBrainEditorProps) {
  const [value, setValue] = useState(corePrompt);

  useEffect(() => {
    setValue(corePrompt);
  }, [corePrompt]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-mono text-sm font-semibold uppercase tracking-wider text-text-primary">
          Core Brand Knowledge
        </h3>
        {isAdmin && (
          <Button
            onClick={() => onSave(value)}
            loading={saving}
            disabled={value === corePrompt}
            size="sm"
          >
            <Save className="h-4 w-4" />
            Save
          </Button>
        )}
      </div>

      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!isAdmin}
        className="min-h-[400px] font-mono text-sm"
      />

      <p className="font-mono text-[11px] text-text-muted">
        v{version}
        {updatedAt && ` — ${new Date(updatedAt).toLocaleDateString()}`}
        {updatedBy && ` — ${updatedBy}`}
      </p>
    </div>
  );
}
