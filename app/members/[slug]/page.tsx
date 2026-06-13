import { notFound } from "next/navigation";
import MemberProfile from "@/components/MemberProfile";
import { getMember, members } from "@/lib/members";

export function generateStaticParams() {
  return members.map((member) => ({ slug: member.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const member = getMember(params.slug);
  return { title: member ? `${member.name} — NXTLVL CLUB` : "NXTLVL CLUB" };
}

export default function MemberPage({ params }: { params: { slug: string } }) {
  const member = getMember(params.slug);
  if (!member) notFound();

  return <MemberProfile member={member} />;
}
