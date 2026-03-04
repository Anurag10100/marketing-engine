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
      <h1 className="text-2xl font-bold text-zinc-100">Generate Content</h1>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left: Controls */}
        <div className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-400">
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
            <label className="mb-2 block text-sm font-medium text-zinc-400">
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
              <h3 className="text-sm font-medium text-zinc-500">
                Recent Outputs
              </h3>
              {recentOutputs.map((output) => (
                <button
                  key={output.id}
                  onClick={() => {
                    setOutputText(output.outputText);
                    setOutputId(output.id);
                  }}
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-900 p-3 text-left transition-colors hover:border-zinc-700"
                >
                  <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <span>{output.vertical}</span>
                    <span>·</span>
                    <span>{output.taskType}</span>
                    <span>·</span>
                    <span>
                      {new Date(output.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="mt-1 truncate text-sm text-zinc-400">
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
