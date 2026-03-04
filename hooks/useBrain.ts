"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { BrainResponse } from "@/types";

export function useBrain() {
  const queryClient = useQueryClient();

  const query = useQuery<BrainResponse>({
    queryKey: ["brain"],
    queryFn: async () => {
      const res = await fetch("/api/brain");
      if (!res.ok) throw new Error("Failed to fetch brain");
      return res.json();
    },
  });

  const update = useMutation({
    mutationFn: async (data: {
      corePrompt?: string;
      vertical?: string;
      content?: string;
    }) => {
      const res = await fetch("/api/brain", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update brain");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brain"] });
    },
  });

  return { ...query, update };
}
