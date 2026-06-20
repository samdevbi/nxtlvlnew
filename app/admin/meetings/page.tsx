"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Meeting = { slug: string; title: string; type: string; number: number };

export default function AdminMeetingsPage() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);

  useEffect(() => {
    fetch("/api/admin/meetings").then((r) => r.json()).then(setMeetings);
  }, []);

  const remove = async (slug: string) => {
    if (!confirm("O'chirish?")) return;
    await fetch(`/api/admin/meetings/${slug}`, { method: "DELETE" });
    setMeetings((m) => m.filter((x) => x.slug !== slug));
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl text-gold-light">Uchrashuvlar</h1>
        <Link href="/admin/meetings/new" className="rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-navy-deep">
          + Yangi
        </Link>
      </div>
      <div className="mt-6 space-y-2">
        {meetings.map((m) => (
          <div key={m.slug} className="flex items-center justify-between rounded-lg border border-navy-line bg-navy-card px-4 py-3">
            <div>
              <span className="mr-2 rounded bg-gold/20 px-2 py-0.5 text-xs text-gold-light">{m.type}</span>
              <span className="font-semibold">#{m.number} {m.title}</span>
            </div>
            <div className="flex gap-2">
              <Link href={`/admin/meetings/${m.slug}`} className="text-sm text-gold-light hover:underline">Tahrirlash</Link>
              <button type="button" onClick={() => remove(m.slug)} className="text-sm text-red-400 hover:underline">O&apos;chirish</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
