import { connectDB } from "@/lib/db/mongoose";
import {
  Member,
  Meeting,
  Books,
  Stats,
  LocaleString,
  SiteSettings,
} from "@/lib/db/models";
import { localesToNested } from "@/lib/api-utils";
import type { Member as MemberType } from "@/lib/members";
import type { NextMeeting, ArchiveMeeting } from "@/lib/meetings";

export async function fetchMembers(): Promise<MemberType[]> {
  await connectDB();
  const docs = await Member.find().sort({ name: 1 }).lean();
  return docs.map((m) => ({
    slug: m.slug,
    name: m.name,
    shortName: m.shortName ?? "",
    initials: m.initials ?? "",
    age: m.age ?? 0,
    role: m.role ?? "",
    photo: m.photoUrl,
    location: m.location ?? "",
    telegram: m.telegram ?? "",
    email: m.email ?? "",
    bio: m.bio ?? { uz: "", en: "" },
    education: (m.education ?? []) as MemberType["education"],
    experience: (m.experience ?? []) as MemberType["experience"],
    skills: m.skills ?? [],
    results: (m.results ?? []) as MemberType["results"],
    books: m.books ?? [],
    hobbies: (m.hobbies ?? []) as MemberType["hobbies"],
  }));
}

export async function fetchMember(slug: string): Promise<MemberType | null> {
  const all = await fetchMembers();
  return all.find((m) => m.slug === slug) ?? null;
}

export async function fetchNextMeeting(): Promise<NextMeeting | null> {
  await connectDB();
  const m = await Meeting.findOne({ type: "next" }).lean();
  if (!m) return null;
  return {
    slug: m.slug,
    number: m.number ?? 0,
    title: m.title ?? "",
    iso: m.iso ?? "",
    dateLabel: m.dateLabel ?? { uz: "", en: "" },
    time: m.time ?? "",
    timeRange: m.timeRange ?? "",
    location: m.location ?? "",
    speaker: m.speaker as NextMeeting["speaker"],
    topics: (m.topics ?? []) as NextMeeting["topics"],
  };
}

export async function fetchArchiveMeetings(): Promise<ArchiveMeeting[]> {
  await connectDB();
  const docs = await Meeting.find({ type: "archive" }).sort({ number: -1 }).lean();
  return docs.map((m) => ({
    slug: m.slug,
    number: m.number ?? 0,
    title: m.title ?? "",
    dateLabel: m.dateLabel ?? { uz: "", en: "" },
    dateLong: m.dateLong ?? { uz: "", en: "" },
    timeRange: m.timeRange ?? "",
    location: m.location ?? "",
    attendance: m.attendance ?? "",
    speaker: m.speaker as ArchiveMeeting["speaker"],
    summary: m.summary ?? { uz: "", en: "" },
    topics: (m.topics ?? []) as ArchiveMeeting["topics"],
    slides: m.slides ?? { pages: 0, url: "#" },
    takeaways: (m.takeaways ?? []) as ArchiveMeeting["takeaways"],
    galleryCount: m.galleryCount ?? 0,
  }));
}

export async function fetchMeetingBySlug(
  slug: string
): Promise<(NextMeeting | ArchiveMeeting) | null> {
  await connectDB();
  const m = await Meeting.findOne({ slug }).lean();
  if (!m) return null;
  if (m.type === "next") {
    return {
      slug: m.slug,
      number: m.number ?? 0,
      title: m.title ?? "",
      iso: m.iso ?? "",
      dateLabel: m.dateLabel ?? { uz: "", en: "" },
      time: m.time ?? "",
      timeRange: m.timeRange ?? "",
      location: m.location ?? "",
      speaker: m.speaker as NextMeeting["speaker"],
      topics: (m.topics ?? []) as NextMeeting["topics"],
    };
  }
  return {
    slug: m.slug,
    number: m.number ?? 0,
    title: m.title ?? "",
    dateLabel: m.dateLabel ?? { uz: "", en: "" },
    dateLong: m.dateLong ?? { uz: "", en: "" },
    timeRange: m.timeRange ?? "",
    location: m.location ?? "",
    attendance: m.attendance ?? "",
    speaker: m.speaker as ArchiveMeeting["speaker"],
    summary: m.summary ?? { uz: "", en: "" },
    topics: (m.topics ?? []) as ArchiveMeeting["topics"],
    slides: m.slides ?? { pages: 0, url: "#" },
    takeaways: (m.takeaways ?? []) as ArchiveMeeting["takeaways"],
    galleryCount: m.galleryCount ?? 0,
  };
}

export async function fetchBooks() {
  await connectDB();
  const b = await Books.findOne({ singleton: "default" }).lean();
  if (!b) return null;
  return {
    current: b.current,
    finishedCount: b.finishedCount ?? 0,
    finished: b.finished ?? [],
  };
}

export async function fetchStats() {
  await connectDB();
  const s = await Stats.findOne({ singleton: "default" }).lean();
  if (!s) return null;
  return {
    members: s.members,
    meetings: s.meetings,
    sport: s.sport,
    presentations: s.presentations,
    membersPeriod: { uz: s.membersPeriodUz, en: s.membersPeriodEn },
    period: { uz: s.periodUz, en: s.periodEn },
  };
}

export async function fetchLocales() {
  await connectDB();
  const entries = await LocaleString.find().lean();
  return localesToNested(entries.map((e) => ({ key: e.key, uz: e.uz, en: e.en })));
}

export async function fetchSettings() {
  await connectDB();
  return SiteSettings.findOne({ singleton: "default" }).lean();
}
