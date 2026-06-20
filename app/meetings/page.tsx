import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MeetingsPageClient from "@/components/MeetingsPageClient";
import { fetchArchiveMeetings, fetchNextMeeting } from "@/lib/data-server";
import meetingsFallback from "@/data/meetings.json";
import type { ArchiveMeeting, NextMeeting } from "@/lib/meetings";

export const revalidate = 60;

export default async function MeetingsPage() {
  let nextMeeting: NextMeeting | null = meetingsFallback.next as NextMeeting;
  let archiveMeetings: ArchiveMeeting[] = meetingsFallback.archive as ArchiveMeeting[];

  try {
    nextMeeting = await fetchNextMeeting();
    archiveMeetings = await fetchArchiveMeetings();
  } catch {
    // fallback
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <MeetingsPageClient nextMeeting={nextMeeting} archiveMeetings={archiveMeetings} />
      <Footer />
    </div>
  );
}
