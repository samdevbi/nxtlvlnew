import { notFound } from "next/navigation";
import MeetingDetail from "@/components/MeetingDetail";
import { archiveMeetings, getArchiveMeeting, nextMeeting } from "@/lib/meetings";

export function generateStaticParams() {
  return [
    { slug: nextMeeting.slug },
    ...archiveMeetings.map((meeting) => ({ slug: meeting.slug })),
  ];
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const title =
    params.slug === nextMeeting.slug
      ? nextMeeting.title
      : getArchiveMeeting(params.slug)?.title;
  return { title: title ? `${title} — NXTLVL CLUB` : "NXTLVL CLUB" };
}

export default function MeetingPage({ params }: { params: { slug: string } }) {
  if (params.slug === nextMeeting.slug) {
    return <MeetingDetail kind="next" meeting={nextMeeting} />;
  }

  const meeting = getArchiveMeeting(params.slug);
  if (!meeting) notFound();

  return <MeetingDetail kind="archive" meeting={meeting} />;
}
