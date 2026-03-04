import type { Vertical, TaskType, LearningType } from "@/types";

// ── Verticals ───────────────────────────────────────────────────

export const VERTICALS: { value: Vertical; label: string }[] = [
  { value: "BFSI", label: "BFSI" },
  { value: "Healthcare", label: "Healthcare" },
  { value: "Smart Cities", label: "Smart Cities" },
  { value: "Education", label: "Education" },
  { value: "eGov / Digital India", label: "eGov / Digital India" },
  { value: "Security & Defence", label: "Security & Defence" },
  { value: "AI & Emerging Tech", label: "AI & Emerging Tech" },
];

// ── Task Types ──────────────────────────────────────────────────

export const TASK_TYPES: {
  value: TaskType;
  label: string;
  icon: string;
  placeholder: string;
}[] = [
  {
    value: "linkedin_post",
    label: "LinkedIn Post",
    icon: "Linkedin",
    placeholder:
      "Describe the topic, event, or announcement for the LinkedIn post...",
  },
  {
    value: "email_announcement",
    label: "Email Announcement",
    icon: "Mail",
    placeholder:
      "Describe the event or announcement to be communicated via email...",
  },
  {
    value: "speaker_announcement",
    label: "Speaker Announcement",
    icon: "Mic",
    placeholder:
      "Provide speaker name, designation, organisation, and key achievements...",
  },
  {
    value: "sponsor_email",
    label: "Sponsor Email",
    icon: "Handshake",
    placeholder:
      "Describe the event and sponsorship opportunity for potential sponsors...",
  },
  {
    value: "event_landing",
    label: "Event Landing Page",
    icon: "Globe",
    placeholder:
      "Describe the event details: name, date, location, key speakers, themes...",
  },
  {
    value: "press_release",
    label: "Press Release",
    icon: "FileText",
    placeholder:
      "Describe the news, event outcome, or announcement for the press release...",
  },
  {
    value: "whatsapp_broadcast",
    label: "WhatsApp Broadcast",
    icon: "Smartphone",
    placeholder:
      "Describe the message for WhatsApp broadcast (keep it concise)...",
  },
  {
    value: "post_event_pack",
    label: "Post-Event Pack",
    icon: "ClipboardCheck",
    placeholder:
      "Describe the event: what happened, key highlights, attendance numbers...",
  },
  {
    value: "newsletter_section",
    label: "Newsletter Section",
    icon: "Newspaper",
    placeholder:
      "Describe the newsletter topic or section focus area...",
  },
  {
    value: "custom",
    label: "Custom",
    icon: "Pencil",
    placeholder:
      "Describe exactly what you need — specify format, tone, length, and audience...",
  },
];

// ── Learning Types ──────────────────────────────────────────────

export const LEARNING_TYPES: {
  value: LearningType;
  label: string;
  color: string;
  placeholder: string;
}[] = [
  {
    value: "PERFORMANCE",
    label: "Campaign Performance",
    color: "#3B82F6",
    placeholder:
      'e.g., "LinkedIn posts with data points get 3x more engagement in BFSI vertical"',
  },
  {
    value: "EVENT_INSIGHT",
    label: "Event Insight",
    color: "#8B5CF6",
    placeholder:
      'e.g., "CIOs prefer 20-min keynotes over panel discussions at our summits"',
  },
  {
    value: "AUDIENCE_FEEDBACK",
    label: "Audience Feedback",
    color: "#EC4899",
    placeholder:
      'e.g., "Delegates want more actionable takeaways, less vendor pitching"',
  },
  {
    value: "TONE_CORRECTION",
    label: "Tone Correction",
    color: "#F59E0B",
    placeholder:
      'e.g., "Avoid jargon-heavy language — write for decision-makers, not technologists"',
  },
  {
    value: "WHAT_WORKED",
    label: "What Worked",
    color: "#10B981",
    placeholder:
      'e.g., "Subject lines with numbers and sector names had 40% higher open rates"',
  },
  {
    value: "WHAT_FAILED",
    label: "What Failed",
    color: "#EF4444",
    placeholder:
      'e.g., "Generic event titles like Digital Transformation Summit underperform"',
  },
  {
    value: "MANUAL_UPDATE",
    label: "Manual Update",
    color: "#6B7280",
    placeholder:
      'e.g., "We now partner with NASSCOM for all technology summits"',
  },
];

// ── User Message Templates ──────────────────────────────────────

export const USER_MESSAGE_TEMPLATES: Record<TaskType, string> = {
  linkedin_post: `Write a LinkedIn post for Elets Technomedia about the following. Make it engaging, professional, and include relevant hashtags. Keep it under 300 words.\n\nContext: `,
  email_announcement: `Write an event announcement email for Elets Technomedia. Include a compelling subject line, clear event details, and a strong call-to-action. Professional but warm tone.\n\nContext: `,
  speaker_announcement: `Write a speaker announcement for an Elets Technomedia event. Highlight the speaker's expertise, achievements, and relevance to the audience. Suitable for social media and email. 150-250 words.\n\nContext: `,
  sponsor_email: `Write a sponsorship outreach email for an Elets Technomedia event. Highlight audience demographics, event reach, past success metrics, and sponsorship benefits. Persuasive and data-driven.\n\nContext: `,
  event_landing: `Write landing page copy for an Elets Technomedia event. Include a compelling headline, event overview, key themes, speaker highlights, and a strong registration CTA. Engaging and conversion-focused.\n\nContext: `,
  press_release: `Write a press release for Elets Technomedia. Follow standard press release format: headline, dateline, lead paragraph, body, boilerplate. Professional and newsworthy tone.\n\nContext: `,
  whatsapp_broadcast: `Write a WhatsApp broadcast message for Elets Technomedia. Keep it concise (under 150 words), conversational but professional. Include a clear CTA.\n\nContext: `,
  post_event_pack: `Write a comprehensive post-event content pack for Elets Technomedia. Include: post-event summary, key highlights, notable speakers, audience size, key takeaways, social media posts, and impact metrics. Suitable for website, social media, and stakeholder reporting.\n\nContext: `,
  newsletter_section: `Write a newsletter section for Elets Technomedia's industry newsletter. Informative, insight-driven, and positions Elets as a thought leader. 200-400 words.\n\nContext: `,
  custom: `You are writing custom marketing content for Elets Technomedia. Follow the user's specific instructions carefully while maintaining the Elets brand voice and guidelines.\n\nContext: `,
};
