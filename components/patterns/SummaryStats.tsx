"use client";

import { Card } from "@/components/ui/Card";
import { BookOpen, Globe, TrendingUp, Star } from "lucide-react";

interface SummaryStatsProps {
  totalLearnings: number;
  verticalsActive: number;
  performanceCount: number;
  avgRating: number | null;
}

export function SummaryStats({
  totalLearnings,
  verticalsActive,
  performanceCount,
  avgRating,
}: SummaryStatsProps) {
  const stats = [
    {
      label: "Total Learnings",
      value: totalLearnings,
      icon: BookOpen,
      color: "text-info",
      bg: "bg-info/10",
    },
    {
      label: "Verticals Active",
      value: verticalsActive,
      icon: Globe,
      color: "text-purple-400",
      bg: "bg-purple-400/10",
    },
    {
      label: "Performance Data",
      value: performanceCount,
      icon: TrendingUp,
      color: "text-success",
      bg: "bg-success/10",
    },
    {
      label: "Avg Rating",
      value: avgRating ? avgRating.toFixed(1) : "—",
      icon: Star,
      color: "text-accent",
      bg: "bg-accent/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="flex items-center gap-4">
          <div className={`rounded-[6px] p-3 ${stat.bg} ${stat.color}`}>
            <stat.icon className="h-5 w-5" />
          </div>
          <div>
            <p className="font-mono text-2xl font-bold text-text-primary">{stat.value}</p>
            <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted">{stat.label}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}
