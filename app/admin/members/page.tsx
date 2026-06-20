"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/admin-client";

type Member = { slug: string; name: string; role: string; initials: string };

export default function AdminMembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    adminFetch<Member[]>("/api/admin/members")
      .then(setMembers)
      .catch((e) => {
        // #region agent log
        fetch("http://127.0.0.1:7793/ingest/dadbd1c7-7069-4b26-b7fc-f993d02028f8", {
          method: "POST",
          headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "0951d4" },
          body: JSON.stringify({
            sessionId: "0951d4",
            runId: "pre-fix",
            hypothesisId: "A",
            location: "app/admin/members/page.tsx",
            message: "members fetch failed",
            data: { error: e instanceof Error ? e.message : "unknown" },
            timestamp: Date.now(),
          }),
        }).catch(() => {});
        // #endregion
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
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl text-gold-light">A&apos;zolar</h1>
        <Link
          href="/admin/members/new"
          className="rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-navy-deep"
        >
          + Yangi
        </Link>
      </div>
      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
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
        {!error && members.length === 0 && <p className="text-paper-line">A&apos;zolar yo&apos;q</p>}
      </div>
    </div>
  );
}
