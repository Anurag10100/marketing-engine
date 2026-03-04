"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Learning } from "@/types";

type LearningsParams = {
  vertical?: string;
  type?: string;
  limit?: number;
};

export function useLearnings(params: LearningsParams = {}) {
  const queryClient = useQueryClient();

  const query = useQuery<Learning[]>({
    queryKey: ["learnings", params],
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      if (params.vertical) searchParams.set("vertical", params.vertical);
      if (params.type) searchParams.set("type", params.type);
      if (params.limit) searchParams.set("limit", String(params.limit));
      const res = await fetch(`/api/learnings?${searchParams}`);
      if (!res.ok) throw new Error("Failed to fetch learnings");
      return res.json();
    },
  });

  const create = useMutation({
    mutationFn: async (data: {
      vertical: string;
      type: string;
      content: string;
    }) => {
      const res = await fetch("/api/learnings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create learning");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["learnings"] });
    },
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/learnings?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete learning");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["learnings"] });
    },
  });

  return { ...query, create, remove };
}
