"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Spinner } from "@/components/ui/Spinner";
import { VERTICALS, TASK_TYPES } from "@/lib/constants";
import { Star, Copy, Check, Download, ChevronDown, ChevronUp } from "lucide-react";
import type { Output } from "@/types";

export default function HistoryPage() {
  const [filterVertical, setFilterVertical] = useState("");
  const [filterTaskType, setFilterTaskType] = useState("");
  const [filterRating, setFilterRating] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const { data: outputs, isLoading } = useQuery<Output[]>({
    queryKey: ["outputs", filterVertical, filterTaskType, filterRating],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filterVertical) params.set("vertical", filterVertical);
      if (filterTaskType) params.set("taskType", filterTaskType);
      if (filterRating) params.set("rating", filterRating);
      params.set("limit", "20");
      const res = await fetch(`/api/outputs?${params}`);
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
  });

  const handleCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExport = () => {
    if (!outputs?.length) return;
    const headers = ["Date", "Vertical", "Task Type", "Context", "Learnings Used", "Rating", "Output"];
    const rows = outputs.map((o) => [
      new Date(o.createdAt).toISOString(),
      o.vertical,
      o.taskType,
      `"${o.contextInput.replace(/"/g, '""')}"`,
      o.learningsUsed,
      o.rating ?? "",
      `"${o.outputText.replace(/"/g, '""')}"`,
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `outputs-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div />
        <Button variant="secondary" size="sm" onClick={handleExport}>
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <Select
          options={[
            { value: "", label: "All Verticals" },
            ...VERTICALS.map((v) => ({
              value: v.value,
              label: v.label,
            })),
          ]}
          value={filterVertical}
          onChange={(e) => setFilterVertical(e.target.value)}
        />
        <Select
          options={[
            { value: "", label: "All Task Types" },
            ...TASK_TYPES.map((t) => ({ value: t.value, label: t.label })),
          ]}
          value={filterTaskType}
          onChange={(e) => setFilterTaskType(e.target.value)}
        />
        <Select
          options={[
            { value: "", label: "Any Rating" },
            { value: "5", label: "5 Stars" },
            { value: "4", label: "4 Stars" },
            { value: "3", label: "3 Stars" },
            { value: "2", label: "2 Stars" },
            { value: "1", label: "1 Star" },
          ]}
          value={filterRating}
          onChange={(e) => setFilterRating(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="flex min-h-[300px] items-center justify-center">
          <Spinner />
        </div>
      ) : !outputs?.length ? (
        <Card className="py-12 text-center">
          <p className="font-mono text-xs uppercase tracking-wider text-text-disabled">
            No outputs found
          </p>
        </Card>
      ) : (
        <div className="space-y-2">
          {/* Table header */}
          <div className="grid grid-cols-[1fr_100px_140px_1fr_80px_80px_60px] gap-4 px-4 py-2 font-mono text-[11px] font-medium uppercase tracking-wider text-text-muted">
            <span>Date</span>
            <span>Vertical</span>
            <span>Task Type</span>
            <span>Context</span>
            <span>Learnings</span>
            <span>Rating</span>
            <span></span>
          </div>

          {outputs.map((output) => (
            <div key={output.id}>
              <button
                onClick={() =>
                  setExpandedId(expandedId === output.id ? null : output.id)
                }
                className="grid w-full grid-cols-[1fr_100px_140px_1fr_80px_80px_60px] gap-4 rounded-[6px] border border-border-default bg-bg-surface px-4 py-3 text-left text-sm transition-all duration-200 hover:border-border-active"
              >
                <span className="font-mono text-xs text-text-muted">
                  {new Date(output.createdAt).toLocaleDateString()}
                </span>
                <span className="text-text-primary">{output.vertical}</span>
                <span className="text-text-secondary">{output.taskType}</span>
                <span className="truncate text-text-secondary">
                  {output.contextInput}
                </span>
                <span className="font-mono text-xs text-text-muted">{output.learningsUsed}</span>
                <span className="flex items-center gap-1">
                  {output.rating ? (
                    <>
                      <Star className="h-3 w-3 fill-accent text-accent" />
                      <span className="font-mono text-xs text-text-primary">{output.rating}</span>
                    </>
                  ) : (
                    <span className="text-text-disabled">—</span>
                  )}
                </span>
                <span className="flex justify-end">
                  {expandedId === output.id ? (
                    <ChevronUp className="h-4 w-4 text-text-muted" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-text-muted" />
                  )}
                </span>
              </button>

              {expandedId === output.id && (
                <div className="ml-4 mt-2 rounded-[6px] border border-border-default bg-bg-elevated p-4 tab-content">
                  <div className="mb-2 flex justify-end">
                    <button
                      onClick={() => handleCopy(output.outputText, output.id)}
                      className="rounded-[4px] p-1.5 text-text-muted transition-colors duration-200 hover:bg-bg-surface hover:text-text-primary"
                    >
                      {copiedId === output.id ? (
                        <Check className="h-4 w-4 text-success" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  <div className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-text-secondary">
                    {output.outputText}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
