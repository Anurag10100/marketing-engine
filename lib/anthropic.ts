import Anthropic from "@anthropic-ai/sdk";
import type { LearningRecord } from "@/types";

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// ── Helpers ─────────────────────────────────────────────────────

function groupBy<T>(arr: T[], key: keyof T): Record<string, T[]> {
  return arr.reduce(
    (acc, item) => {
      const k = String(item[key]);
      if (!acc[k]) acc[k] = [];
      acc[k].push(item);
      return acc;
    },
    {} as Record<string, T[]>
  );
}

// ── buildSystemPrompt ───────────────────────────────────────────

export function buildSystemPrompt(
  corePrompt: string,
  verticalContext: string,
  vertical: string,
  learnings: LearningRecord[]
): string {
  const byType = groupBy(learnings, "type");

  const learningsSection =
    learnings.length > 0 ? buildLearningsSection(byType, vertical) : "";

  return [
    corePrompt,
    "",
    `VERTICAL CONTEXT — ${vertical}:`,
    verticalContext,
    learningsSection,
    "",
    "You are producing marketing content for Elets Technomedia.",
    "Apply all brand knowledge above strictly.",
    "Every output must sound like it was written by someone who deeply understands this sector.",
  ]
    .filter(Boolean)
    .join("\n");
}

// ── buildLearningsSection ────────────────────────────────────────

function buildLearningsSection(
  byType: Record<string, LearningRecord[]>,
  vertical: string
): string {
  const lines: string[] = [
    "",
    `ACCUMULATED INTELLIGENCE FOR ${vertical.toUpperCase()}:`,
    "(Apply these learnings to every output — they represent what Elets has discovered works)",
    "",
  ];

  if (byType.PERFORMANCE?.length) {
    lines.push("CAMPAIGN PERFORMANCE PATTERNS:");
    byType.PERFORMANCE.slice(0, 8).forEach((l) =>
      lines.push(`• ${l.content}`)
    );
    lines.push("");
  }

  if (byType.WHAT_WORKED?.length) {
    lines.push("WHAT HAS WORKED — REINFORCE THESE:");
    byType.WHAT_WORKED.slice(0, 6).forEach((l) =>
      lines.push(`• ${l.content}`)
    );
    lines.push("");
  }

  if (byType.WHAT_FAILED?.length) {
    lines.push("WHAT HAS FAILED — AVOID THESE:");
    byType.WHAT_FAILED.slice(0, 6).forEach((l) =>
      lines.push(`• ${l.content}`)
    );
    lines.push("");
  }

  if (byType.TONE_CORRECTION?.length) {
    lines.push("VOICE AND TONE CORRECTIONS:");
    byType.TONE_CORRECTION.slice(0, 4).forEach((l) =>
      lines.push(`• ${l.content}`)
    );
    lines.push("");
  }

  if (byType.EVENT_INSIGHT?.length) {
    lines.push("AUDIENCE AND EVENT INTELLIGENCE:");
    byType.EVENT_INSIGHT.slice(0, 4).forEach((l) =>
      lines.push(`• ${l.content}`)
    );
  }

  return lines.join("\n");
}

// ── buildUserMessage ──────────────────────────────────────────────

export function buildUserMessage(
  taskType: string,
  contextInput: string
): string {
  // Dynamic import would be circular, so we inline a minimal version
  // Full templates are in lib/constants.ts — used by the API route
  return contextInput;
}
