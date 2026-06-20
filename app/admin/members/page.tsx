"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AdminActionButton,
  AdminActionLink,
  AdminListRow,
  AdminPageHeader,
} from "@/components/admin/AdminLayout";
import { adminFetch } from "@/lib/admin-client";

type Member = { slug: string; name: string; role: string; initials: string };

export default function AdminMembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    adminFetch<Member[]>("/api/admin/members")
      .then(setMembers)
      .catch((e) => {
        setError(e instanceof Error ? e.message : "Yuklash xatosi");
        setMembers([]);
      });
  }, []);

  const remove = async (slug: string) => {
    if (!confirm("O'chirishni tasdiqlaysizmi?")) return;
    await fetch(`/api/admin/members/${slug}`, { method: "DELETE" });
    setMembers((m) => m.filter((x) => x.slug !== slug));
  };

  return (
    <div>
      <AdminPageHeader title="A'zolar" actionHref="/admin/members/new" />
      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
      <div className="mt-6 space-y-3">
        {members.map((m) => (
          <AdminListRow
            key={m.slug}
            actions={
              <>
                <AdminActionLink href={`/admin/members/${m.slug}`}>Tahrirlash</AdminActionLink>
                <AdminActionButton onClick={() => remove(m.slug)}>O&apos;chirish</AdminActionButton>
              </>
            }
          >
            <p className="font-semibold">{m.name}</p>
            <p className="text-xs text-paper-line">{m.role}</p>
          </AdminListRow>
        ))}
        {!error && members.length === 0 && <p className="text-paper-line">A&apos;zolar yo&apos;q</p>}
      </div>
    </div>
  );
}
