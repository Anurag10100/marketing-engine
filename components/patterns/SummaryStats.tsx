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
      color: "text-blue-500",
    },
    {
      label: "Verticals Active",
      value: verticalsActive,
      icon: Globe,
      color: "text-purple-500",
    },
    {
      label: "Performance Data",
      value: performanceCount,
      icon: TrendingUp,
      color: "text-green-500",
    },
    {
      label: "Avg Output Rating",
      value: avgRating ? avgRating.toFixed(1) : "—",
      icon: Star,
      color: "text-amber-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="flex items-center gap-4">
          <div className={`rounded-lg bg-zinc-800 p-3 ${stat.color}`}>
            <stat.icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-2xl font-bold text-zinc-100">{stat.value}</p>
            <p className="text-xs text-zinc-500">{stat.label}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}
