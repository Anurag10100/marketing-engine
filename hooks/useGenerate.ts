"use client";

import { useMutation } from "@tanstack/react-query";
import type { GenerateRequest, GenerateResponse } from "@/types";

export function useGenerate() {
  return useMutation<GenerateResponse, Error, GenerateRequest>({
    mutationFn: async (data) => {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: "Generation failed" }));
        throw new Error(err.message ?? "Generation failed");
      }
      return res.json();
    },
  });
}
