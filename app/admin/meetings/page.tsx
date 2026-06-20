"use client";

import { useEffect, useState } from "react";
import {
  AdminActionButton,
  AdminActionLink,
  AdminListRow,
  AdminPageHeader,
} from "@/components/admin/AdminLayout";
import { adminFetch } from "@/lib/admin-client";

type Meeting = { slug: string; title: string; type: string; number: number };

export default function AdminMeetingsPage() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    adminFetch<Meeting[]>("/api/admin/meetings")
      .then(setMeetings)
      .catch((e) => {
        setError(e instanceof Error ? e.message : "Yuklash xatosi");
        setMeetings([]);
      });
  }, []);

  const remove = async (slug: string) => {
    if (!confirm("O'chirish?")) return;
    await fetch(`/api/admin/meetings/${slug}`, { method: "DELETE" });
    setMeetings((m) => m.filter((x) => x.slug !== slug));
  };

  return (
    <div>
      <AdminPageHeader title="Uchrashuvlar" actionHref="/admin/meetings/new" />
      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
      <div className="mt-6 space-y-3">
        {meetings.map((m) => (
          <AdminListRow
            key={m.slug}
            actions={
              <>
                <AdminActionLink href={`/admin/meetings/${m.slug}`}>Tahrirlash</AdminActionLink>
                <AdminActionButton onClick={() => remove(m.slug)}>O&apos;chirish</AdminActionButton>
              </>
            }
          >
            <div className="space-y-1">
              <span className="inline-block rounded bg-gold/20 px-2 py-0.5 text-xs text-gold-light">{m.type}</span>
              <p className="font-semibold leading-snug">
                #{m.number} {m.title}
              </p>
            </div>
          </AdminListRow>
        ))}
        {!error && meetings.length === 0 && <p className="text-paper-line">Uchrashuvlar yo&apos;q</p>}
      </div>
    </div>
  );
}
