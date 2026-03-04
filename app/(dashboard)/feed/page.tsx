"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useLearnings } from "@/hooks/useLearnings";
import { LearningForm } from "@/components/feed/LearningForm";
import { LearningLog } from "@/components/feed/LearningLog";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { VERTICALS, LEARNING_TYPES } from "@/lib/constants";
import { Download } from "lucide-react";
import { Spinner } from "@/components/ui/Spinner";

export default function FeedPage() {
  const { data: session } = useSession();
  const [filterVertical, setFilterVertical] = useState("");
  const [filterType, setFilterType] = useState("");

  const { data: learnings, isLoading, create, remove } = useLearnings({
    vertical: filterVertical || undefined,
    type: filterType || undefined,
    limit: 50,
  });

  const isAdmin =
    (session?.user as Record<string, unknown>)?.role === "ADMIN";
  const enableExport = process.env.NEXT_PUBLIC_ENABLE_EXPORT !== "false";

  const handleExport = () => {
    if (!learnings?.length) return;
    const headers = ["ID", "Vertical", "Type", "Content", "Created At"];
    const rows = learnings.map((l) => [
      l.id,
      l.vertical,
      l.type,
      `"${l.content.replace(/"/g, '""')}"`,
      l.createdAt,
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join(
      "\n"
    );
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `learnings-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-zinc-100">Learning Feed</h1>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left: Form */}
        <div>
          <LearningForm
            onSubmit={(data) => create.mutate(data)}
            loading={create.isPending}
          />
        </div>

        {/* Right: Log */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Select
              options={[
                { value: "", label: "All Verticals" },
                ...VERTICALS.map((v) => ({ value: v.value, label: v.label })),
              ]}
              value={filterVertical}
              onChange={(e) => setFilterVertical(e.target.value)}
            />
            <Select
              options={[
                { value: "", label: "All Types" },
                ...LEARNING_TYPES.map((t) => ({
                  value: t.value,
                  label: t.label,
                })),
              ]}
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            />
            {isAdmin && enableExport && (
              <Button
                variant="secondary"
                size="sm"
                onClick={handleExport}
                disabled={!learnings?.length}
              >
                <Download className="h-4 w-4" />
                CSV
              </Button>
            )}
          </div>

          {isLoading ? (
            <div className="flex min-h-[200px] items-center justify-center">
              <Spinner />
            </div>
          ) : (
            <LearningLog
              learnings={learnings ?? []}
              isAdmin={isAdmin}
              onDelete={(id) => remove.mutate(id)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
