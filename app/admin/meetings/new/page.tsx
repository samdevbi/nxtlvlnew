"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewMeetingPage() {
  const router = useRouter();
  const [json, setJson] = useState(
    JSON.stringify(
      {
        type: "archive",
        slug: "",
        number: 1,
        title: "",
        dateLabel: { uz: "", en: "" },
        speaker: { slug: "", name: "", shortName: "", initials: "", role: "" },
        topics: [],
      },
      null,
      2
    )
  );
  const [error, setError] = useState("");

  const save = async () => {
    try {
      const body = JSON.parse(json);
      const res = await fetch("/api/admin/meetings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      router.push("/admin/meetings");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Xato");
    }
  };

  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-3xl text-gold-light">Yangi uchrashuv</h1>
      <p className="mt-1 text-sm text-paper-line">type: &quot;next&quot; yoki &quot;archive&quot;</p>
      <textarea
        value={json}
        onChange={(e) => setJson(e.target.value)}
        rows={28}
        className="mt-4 w-full rounded-lg border border-navy-line bg-[#081426] px-3 py-2 font-mono text-xs text-paper"
      />
      {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
      <button type="button" onClick={save} className="mt-4 rounded-lg bg-gold px-6 py-2 text-sm font-semibold text-navy-deep">
        Saqlash
      </button>
    </div>
  );
}
