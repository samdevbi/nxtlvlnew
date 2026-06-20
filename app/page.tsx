import HomePage from "@/components/HomePage";
import { fetchMembers, fetchNextMeeting, fetchStats } from "@/lib/data-server";
import meetingsFallback from "@/data/meetings.json";
import membersFallback from "@/data/members.json";
import type { Member } from "@/lib/members";
import type { NextMeeting } from "@/lib/meetings";

export const revalidate = 60;

export default async function Home() {
  let stats = null;
  let nextMeeting: NextMeeting | null = null;
  let members: Member[] = membersFallback as Member[];

  try {
    stats = await fetchStats();
    nextMeeting = await fetchNextMeeting();
    members = await fetchMembers();
  } catch {
    nextMeeting = meetingsFallback.next as NextMeeting;
  }

  return <HomePage stats={stats} nextMeeting={nextMeeting} members={members} />;
}
