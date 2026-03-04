// types/index.ts — all shared types

export type Vertical =
  | "BFSI"
  | "Healthcare"
  | "Smart Cities"
  | "Education"
  | "eGov / Digital India"
  | "Security & Defence"
  | "AI & Emerging Tech";

export type TaskType =
  | "linkedin_post"
  | "email_announcement"
  | "speaker_announcement"
  | "sponsor_email"
  | "event_landing"
  | "press_release"
  | "whatsapp_broadcast"
  | "post_event_pack"
  | "newsletter_section"
  | "custom";

export type LearningType =
  | "PERFORMANCE"
  | "EVENT_INSIGHT"
  | "AUDIENCE_FEEDBACK"
  | "TONE_CORRECTION"
  | "WHAT_WORKED"
  | "WHAT_FAILED"
  | "MANUAL_UPDATE";

export type UserRole = "ADMIN" | "MEMBER";

export interface Learning {
  id: string;
  vertical: string;
  type: LearningType;
  content: string;
  createdAt: string;
  createdBy: string;
  user?: { name: string | null };
}

export interface Output {
  id: string;
  vertical: string;
  taskType: string;
  contextInput: string;
  outputText: string;
  learningsUsed: number;
  rating: number | null;
  ratingNote: string | null;
  createdAt: string;
  user?: { name: string | null };
}

export interface BrainData {
  corePrompt: string;
  version: number;
  updatedAt: string;
  updatedBy: string | null;
  verticals: VerticalContext[];
}

export interface VerticalContext {
  vertical: string;
  content: string;
  updatedAt: string;
  updatedBy?: string | null;
}

export interface GenerateRequest {
  vertical: string;
  taskType: TaskType;
  contextInput: string;
}

export interface GenerateResponse {
  outputText: string;
  learningsUsed: number;
  outputId: string;
}
