import { notFound } from "next/navigation";
import MemberProfile from "@/components/MemberProfile";
import { fetchMember, fetchMembers } from "@/lib/data-server";

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const members = await fetchMembers();
    return members.map((m) => ({ slug: m.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const member = await fetchMember(params.slug);
  return { title: member ? `${member.name} — NXTLVL CLUB` : "NXTLVL CLUB" };
}

export default async function MemberPage({ params }: { params: { slug: string } }) {
  const member = await fetchMember(params.slug);
  if (!member) notFound();
  return <MemberProfile member={member} />;
}
