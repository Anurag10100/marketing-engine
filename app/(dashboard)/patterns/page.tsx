"use client";

import { useQuery } from "@tanstack/react-query";
import { useLearnings } from "@/hooks/useLearnings";
import { SummaryStats } from "@/components/patterns/SummaryStats";
import { VerticalCard } from "@/components/patterns/VerticalCard";
import { PatternInsight } from "@/components/patterns/PatternInsight";
import { Spinner } from "@/components/ui/Spinner";
import { Card } from "@/components/ui/Card";
import { Rss } from "lucide-react";
import Link from "next/link";
import type { OutputRecord } from "@/types";

export default function PatternsPage() {
  const { data: learnings, isLoading } = useLearnings({ limit: 500 });

  const { data: outputs } = useQuery<OutputRecord[]>({
    queryKey: ["outputs", "all"],
    queryFn: async () => {
      const res = await fetch("/api/outputs?limit=100");
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!learnings?.length) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-zinc-100">Patterns</h1>
        <Card className="flex flex-col items-center gap-4 py-16 text-center">
          <Rss className="h-12 w-12 text-zinc-600" />
          <h2 className="text-xl font-semibold text-zinc-300">
            No patterns yet
          </h2>
          <p className="max-w-md text-sm text-zinc-500">
            Start adding learnings to see patterns emerge. The more data you
            feed, the smarter the engine gets.
          </p>
          <Link
            href="/feed"
            className="text-sm font-medium text-amber-500 hover:text-amber-400"
          >
            Go to Learning Feed
          </Link>
        </Card>
      </div>
    );
  }

  // Group learnings by vertical
  const byVertical: Record<string, typeof learnings> = {};
  learnings.forEach((l) => {
    if (!byVertical[l.vertical]) byVertical[l.vertical] = [];
    byVertical[l.vertical].push(l);
  });

  const verticalsActive = Object.keys(byVertical).filter(
    (v) => v !== "All"
  ).length;
  const performanceCount = learnings.filter(
    (l) => l.type === "PERFORMANCE"
  ).length;

  // Calculate average rating from outputs
  const ratedOutputs = (outputs ?? []).filter((o) => o.rating !== null);
  const avgRating =
    ratedOutputs.length > 0
      ? ratedOutputs.reduce((sum, o) => sum + (o.rating ?? 0), 0) /
        ratedOutputs.length
      : null;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-zinc-100">Patterns</h1>

      <SummaryStats
        totalLearnings={learnings.length}
        verticalsActive={verticalsActive}
        performanceCount={performanceCount}
        avgRating={avgRating}
      />

      <PatternInsight learnings={learnings} />

      <div className="grid gap-4 md:grid-cols-2">
        {Object.entries(byVertical)
          .filter(([v]) => v !== "All")
          .map(([vertical, vLearnings]) => (
            <VerticalCard
              key={vertical}
              vertical={vertical}
              learnings={vLearnings}
            />
          ))}
      </div>
    </div>
  );
}
