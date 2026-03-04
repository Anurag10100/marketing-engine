import type { Vertical, TaskType, LearningType } from "@/types";

// ── Verticals ───────────────────────────────────────────────────

export const VERTICALS: { value: Vertical; label: string }[] = [
  { value: "BFSI", label: "BFSI" },
  { value: "Healthcare", label: "Healthcare" },
  { value: "Education", label: "Education" },
  { value: "Government", label: "Government" },
  { value: "Infrastructure", label: "Infrastructure" },
  { value: "Technology", label: "Technology" },
  { value: "All", label: "All Verticals" },
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
    value: "event_invite",
    label: "Event Invite",
    icon: "CalendarPlus",
    placeholder:
      "Describe the event details: name, date, location, key speakers...",
  },
  {
    value: "newsletter_section",
    label: "Newsletter Section",
    icon: "Newspaper",
    placeholder:
      "Describe the newsletter topic or section focus area...",
  },
  {
    value: "social_media_thread",
    label: "Social Media Thread",
    icon: "MessageSquare",
    placeholder:
      "Describe the topic for a multi-post social media thread...",
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
    value: "speaker_intro",
    label: "Speaker Introduction",
    icon: "Mic",
    placeholder:
      "Provide speaker name, designation, organisation, and key achievements...",
  },
  {
    value: "sponsor_pitch",
    label: "Sponsor Pitch",
    icon: "Handshake",
    placeholder:
      "Describe the event and sponsorship opportunity for potential sponsors...",
  },
  {
    value: "post_event_summary",
    label: "Post-Event Summary",
    icon: "ClipboardCheck",
    placeholder:
      "Describe the event: what happened, key highlights, attendance numbers...",
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
    color: "#3B82F6", // blue
    placeholder:
      'e.g., "LinkedIn posts with data points get 3x more engagement in BFSI vertical"',
  },
  {
    value: "EVENT_INSIGHT",
    label: "Event Insight",
    color: "#8B5CF6", // purple
    placeholder:
      'e.g., "CIOs prefer 20-min keynotes over panel discussions at our summits"',
  },
  {
    value: "AUDIENCE_FEEDBACK",
    label: "Audience Feedback",
    color: "#EC4899", // pink
    placeholder:
      'e.g., "Delegates want more actionable takeaways, less vendor pitching"',
  },
  {
    value: "TONE_CORRECTION",
    label: "Tone Correction",
    color: "#F59E0B", // amber
    placeholder:
      'e.g., "Avoid jargon-heavy language — write for decision-makers, not technologists"',
  },
  {
    value: "WHAT_WORKED",
    label: "What Worked",
    color: "#10B981", // green
    placeholder:
      'e.g., "Subject lines with numbers and sector names had 40% higher open rates"',
  },
  {
    value: "WHAT_FAILED",
    label: "What Failed",
    color: "#EF4444", // red
    placeholder:
      'e.g., "Generic event titles like Digital Transformation Summit underperform"',
  },
  {
    value: "MANUAL_UPDATE",
    label: "Manual Update",
    color: "#6B7280", // gray
    placeholder:
      'e.g., "We now partner with NASSCOM for all technology summits"',
  },
];

// ── User Message Templates ──────────────────────────────────────

export const USER_MESSAGE_TEMPLATES: Record<TaskType, string> = {
  linkedin_post: `Write a LinkedIn post for Elets Technomedia about the following. Make it engaging, professional, and include relevant hashtags. Keep it under 300 words.\n\nContext: `,
  email_announcement: `Write an event announcement email for Elets Technomedia. Include a compelling subject line, clear event details, and a strong call-to-action. Professional but warm tone.\n\nContext: `,
  event_invite: `Write a formal event invitation for Elets Technomedia. Include event name, date, venue, key speakers, and a persuasive reason to attend. Include RSVP call-to-action.\n\nContext: `,
  newsletter_section: `Write a newsletter section for Elets Technomedia's industry newsletter. Informative, insight-driven, and positions Elets as a thought leader. 200-400 words.\n\nContext: `,
  social_media_thread: `Write a social media thread (5-7 posts) for Elets Technomedia. Each post should be self-contained but flow as a narrative. Include relevant hashtags.\n\nContext: `,
  press_release: `Write a press release for Elets Technomedia. Follow standard press release format: headline, dateline, lead paragraph, body, boilerplate. Professional and newsworthy tone.\n\nContext: `,
  whatsapp_broadcast: `Write a WhatsApp broadcast message for Elets Technomedia. Keep it concise (under 150 words), conversational but professional. Include a clear CTA.\n\nContext: `,
  speaker_intro: `Write a speaker introduction for an Elets Technomedia event. Highlight the speaker's expertise, achievements, and relevance to the audience. 100-150 words.\n\nContext: `,
  sponsor_pitch: `Write a sponsorship pitch for an Elets Technomedia event. Highlight audience demographics, event reach, past success metrics, and sponsorship benefits. Persuasive and data-driven.\n\nContext: `,
  post_event_summary: `Write a post-event summary for Elets Technomedia. Cover key highlights, notable speakers, audience size, key takeaways, and impact. Suitable for website and social media.\n\nContext: `,
};
