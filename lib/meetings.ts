import meetingsJson from "@/data/meetings.json";
import type { LocalizedText } from "@/lib/members";

export interface MeetingSpeaker {
  slug: string;
  name: string;
  shortName: string;
  initials: string;
  role: string;
}

export interface NextMeeting {
  slug: string;
  number: number;
  title: string;
  iso: string;
  dateLabel: LocalizedText;
  time: string;
  timeRange: string;
  location: string;
  speaker: MeetingSpeaker;
  topics: LocalizedText[];
}

export interface ArchiveMeeting {
  slug: string;
  number: number;
  title: string;
  dateLabel: LocalizedText;
  dateLong: LocalizedText;
  timeRange: string;
  location: string;
  attendance: string;
  speaker: MeetingSpeaker;
  summary: LocalizedText;
  topics: LocalizedText[];
  slides: { pages: number; url: string };
  takeaways: LocalizedText[];
  galleryCount: number;
}

/** Static fallback */
export const nextMeeting: NextMeeting = meetingsJson.next;
export const archiveMeetings: ArchiveMeeting[] = meetingsJson.archive;

export function getArchiveMeeting(slug: string): ArchiveMeeting | undefined {
  return archiveMeetings.find((m) => m.slug === slug);
}
