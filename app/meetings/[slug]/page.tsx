import { notFound } from "next/navigation";
import MeetingDetail from "@/components/MeetingDetail";
import {
  fetchMeetingBySlug,
  fetchArchiveMeetings,
  fetchNextMeeting,
} from "@/lib/data-server";
import type { ArchiveMeeting, NextMeeting } from "@/lib/meetings";

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const [next, archive] = await Promise.all([
      fetchNextMeeting(),
      fetchArchiveMeetings(),
    ]);
    const slugs = archive.map((m) => m.slug);
    if (next) slugs.push(next.slug);
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const meeting = await fetchMeetingBySlug(params.slug);
  const title = meeting && "title" in meeting ? meeting.title : undefined;
  return { title: title ? `${title} — NXTLVL CLUB` : "NXTLVL CLUB" };
}

export default async function MeetingPage({ params }: { params: { slug: string } }) {
  const meeting = await fetchMeetingBySlug(params.slug);
  if (!meeting) notFound();

  if ("iso" in meeting && meeting.iso) {
    return <MeetingDetail kind="next" meeting={meeting as NextMeeting} />;
  }

  return <MeetingDetail kind="archive" meeting={meeting as ArchiveMeeting} />;
}
