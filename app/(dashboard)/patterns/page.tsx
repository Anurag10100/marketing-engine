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
import type { Output } from "@/types";

export default function PatternsPage() {
  const { data: learnings, isLoading } = useLearnings({ limit: 500 });

  const { data: outputs } = useQuery<Output[]>({
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
        <Card className="flex flex-col items-center gap-4 py-16 text-center">
          <Rss className="h-12 w-12 text-text-disabled" />
          <h2 className="font-mono text-lg font-semibold uppercase tracking-wider text-text-secondary">
            No patterns yet
          </h2>
          <p className="max-w-md text-sm text-text-muted">
            Start adding learnings to see patterns emerge. The more data you
            feed, the smarter the engine gets.
          </p>
          <Link
            href="/feed"
            className="font-mono text-sm font-medium uppercase tracking-wider text-accent hover:text-accent-hover"
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

  const verticalsActive = Object.keys(byVertical).length;
  const performanceCount = learnings.filter(
    (l) => l.type === "PERFORMANCE"
  ).length;

  const ratedOutputs = (outputs ?? []).filter((o) => o.rating !== null);
  const avgRating =
    ratedOutputs.length > 0
      ? ratedOutputs.reduce((sum, o) => sum + (o.rating ?? 0), 0) /
        ratedOutputs.length
      : null;

  return (
    <div className="space-y-6">
      <SummaryStats
        totalLearnings={learnings.length}
        verticalsActive={verticalsActive}
        performanceCount={performanceCount}
        avgRating={avgRating}
      />

      <PatternInsight learnings={learnings} />

      <div className="grid gap-4 md:grid-cols-2">
        {Object.entries(byVertical)
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
