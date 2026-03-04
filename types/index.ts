// ── Shared TypeScript Types ─────────────────────────────────────

export type Role = "ADMIN" | "MEMBER";

export type Vertical =
  | "BFSI"
  | "Healthcare"
  | "Education"
  | "Government"
  | "Infrastructure"
  | "Technology"
  | "All";

export type TaskType =
  | "linkedin_post"
  | "email_announcement"
  | "event_invite"
  | "newsletter_section"
  | "social_media_thread"
  | "press_release"
  | "whatsapp_broadcast"
  | "speaker_intro"
  | "sponsor_pitch"
  | "post_event_summary";

export type LearningType =
  | "PERFORMANCE"
  | "EVENT_INSIGHT"
  | "AUDIENCE_FEEDBACK"
  | "TONE_CORRECTION"
  | "WHAT_WORKED"
  | "WHAT_FAILED"
  | "MANUAL_UPDATE";

// ── API Types ───────────────────────────────────────────────────

export type GenerateRequest = {
  vertical: string;
  taskType: string;
  contextInput: string;
};

export type GenerateResponse = {
  outputText: string;
  learningsUsed: number;
  outputId: string;
};

// ── Data Types ──────────────────────────────────────────────────

export type LearningRecord = {
  id: string;
  vertical: string;
  type: LearningType;
  content: string;
  createdAt: string;
  createdBy: string;
  user?: { name: string | null };
};

export type OutputRecord = {
  id: string;
  vertical: string;
  taskType: string;
  contextInput: string;
  systemPrompt: string;
  outputText: string;
  learningsUsed: number;
  rating: number | null;
  ratingNote: string | null;
  createdAt: string;
  createdBy: string;
  user?: { name: string | null };
};

export type BrandBrainData = {
  id: string;
  corePrompt: string;
  version: number;
  updatedAt: string;
  updatedBy: string | null;
};

export type VerticalContextData = {
  id: string;
  vertical: string;
  content: string;
  updatedAt: string;
  updatedBy: string | null;
};

export type BrainResponse = {
  corePrompt: string;
  version: number;
  updatedAt: string;
  updatedBy: string | null;
  verticals: VerticalContextData[];
};
