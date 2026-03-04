"use client";

import { useState } from "react";
import { useUIStore } from "@/store/ui";
import { useGenerate } from "@/hooks/useGenerate";
import { useLearnings } from "@/hooks/useLearnings";
import { VerticalSelector } from "@/components/generate/VerticalSelector";
import { TaskTypeGrid } from "@/components/generate/TaskTypeGrid";
import { ContextInput } from "@/components/generate/ContextInput";
import { GenerateButton } from "@/components/generate/GenerateButton";
import { OutputPanel } from "@/components/generate/OutputPanel";
import { LearningsAppliedBadge } from "@/components/generate/LearningsAppliedBadge";
import type { OutputRecord } from "@/types";

export default function GeneratePage() {
  const { activeVertical, setActiveVertical, activeTaskType, setActiveTaskType } =
    useUIStore();
  const [contextInput, setContextInput] = useState("");
  const [outputText, setOutputText] = useState("");
  const [outputId, setOutputId] = useState<string | null>(null);
  const [recentOutputs, setRecentOutputs] = useState<
    Pick<OutputRecord, "id" | "vertical" | "taskType" | "outputText" | "createdAt">[]
  >([]);

  const generate = useGenerate();
  const { data: learnings } = useLearnings({
    vertical: activeVertical,
    limit: 50,
  });

  const learningsCount = learnings?.length ?? 0;

  const handleGenerate = () => {
    generate.mutate(
      {
        vertical: activeVertical,
        taskType: activeTaskType,
        contextInput,
      },
      {
        onSuccess: (data) => {
          setOutputText(data.outputText);
          setOutputId(data.outputId);
          setRecentOutputs((prev) => [
            {
              id: data.outputId,
              vertical: activeVertical,
              taskType: activeTaskType,
              outputText: data.outputText,
              createdAt: new Date().toISOString(),
            },
            ...prev.slice(0, 4),
          ]);
        },
      }
    );
  };

  const handleRate = async (rating: number, note?: string) => {
    if (!outputId) return;
    await fetch(`/api/outputs?id=${outputId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating, note }),
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left: Controls */}
        <div className="space-y-6">
          <div>
            <label className="mb-2 block font-mono text-xs font-medium uppercase tracking-wider text-text-muted">
              Vertical
            </label>
            <VerticalSelector
              value={activeVertical}
              onChange={setActiveVertical}
            />
          </div>

          <LearningsAppliedBadge
            count={learningsCount}
            vertical={activeVertical}
          />

          <div>
            <label className="mb-2 block font-mono text-xs font-medium uppercase tracking-wider text-text-muted">
              Task Type
            </label>
            <TaskTypeGrid
              value={activeTaskType}
              onChange={setActiveTaskType}
            />
          </div>

          <ContextInput
            value={contextInput}
            onChange={setContextInput}
            taskType={activeTaskType}
          />

          <GenerateButton
            onClick={handleGenerate}
            disabled={!contextInput.trim()}
            loading={generate.isPending}
            learningsCount={learningsCount}
          />
        </div>

        {/* Right: Output */}
        <div className="space-y-4">
          <OutputPanel
            outputText={outputText}
            outputId={outputId}
            onRate={handleRate}
          />

          {/* Recent outputs */}
          {recentOutputs.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-mono text-xs font-medium uppercase tracking-wider text-text-muted">
                Recent Outputs
              </h3>
              {recentOutputs.map((output) => (
                <button
                  key={output.id}
                  onClick={() => {
                    setOutputText(output.outputText);
                    setOutputId(output.id);
                  }}
                  className="w-full rounded-[6px] border border-border-default bg-bg-surface p-3 text-left transition-all duration-200 hover:border-border-active"
                >
                  <div className="flex items-center gap-2 font-mono text-[11px] text-text-muted">
                    <span>{output.vertical}</span>
                    <span className="text-text-disabled">·</span>
                    <span>{output.taskType}</span>
                    <span className="text-text-disabled">·</span>
                    <span>
                      {new Date(output.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="mt-1 truncate text-sm text-text-secondary">
                    {output.outputText.slice(0, 80)}...
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
