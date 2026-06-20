import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MembersPageClient from "@/components/MembersPageClient";
import { fetchMembers } from "@/lib/data-server";
import membersFallback from "@/data/members.json";
import type { Member } from "@/lib/members";

export const revalidate = 60;

export default async function MembersPage() {
  let members: Member[] = membersFallback as Member[];
  try {
    members = await fetchMembers();
  } catch {
    // fallback
  }
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <MembersPageClient members={members} />
      <Footer />
    </div>
  );
}
