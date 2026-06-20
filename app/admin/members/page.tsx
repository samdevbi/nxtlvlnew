"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Member = { slug: string; name: string; role: string; initials: string };

export default function AdminMembersPage() {
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    fetch("/api/admin/members")
      .then((r) => r.json())
      .then(setMembers);
  }, []);

  const remove = async (slug: string) => {
    if (!confirm("O'chirishni tasdiqlaysizmi?")) return;
    await fetch(`/api/admin/members/${slug}`, { method: "DELETE" });
    setMembers((m) => m.filter((x) => x.slug !== slug));
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl text-gold-light">A&apos;zolar</h1>
        <Link
          href="/admin/members/new"
          className="rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-navy-deep"
        >
          + Yangi
        </Link>
      </div>
      <div className="mt-6 space-y-2">
        {members.map((m) => (
          <div
            key={m.slug}
            className="flex items-center justify-between rounded-lg border border-navy-line bg-navy-card px-4 py-3"
          >
            <div>
              <p className="font-semibold">{m.name}</p>
              <p className="text-xs text-paper-line">{m.role}</p>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/admin/members/${m.slug}`}
                className="text-sm text-gold-light hover:underline"
              >
                Tahrirlash
              </Link>
              <button
                type="button"
                onClick={() => remove(m.slug)}
                className="text-sm text-red-400 hover:underline"
              >
                O&apos;chirish
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
