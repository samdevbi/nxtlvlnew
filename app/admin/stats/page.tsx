"use client";

import { useEffect, useState } from "react";
import { AdminField, SaveBar } from "@/components/admin/FormFields";

export default function AdminStatsPage() {
  const [form, setForm] = useState({
    members: "",
    meetings: "",
    sport: "",
    presentations: "",
    membersPeriodUz: "",
    membersPeriodEn: "",
    periodUz: "",
    periodEn: "",
  });
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then(setForm);
  }, []);

  const save = async () => {
    setError("");
    setMsg("");
    const res = await fetch("/api/admin/stats", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) setMsg("Saqlandi!");
    else setError("Xato");
  };

  const set = (key: keyof typeof form) => (v: string) => setForm({ ...form, [key]: v });

  return (
    <div className="max-w-lg">
      <h1 className="font-display text-2xl text-gold-light sm:text-3xl">Statistika</h1>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <AdminField label="A'zolar" value={form.members} onChange={set("members")} />
        <AdminField label="Uchrashuvlar" value={form.meetings} onChange={set("meetings")} />
        <AdminField label="Sport" value={form.sport} onChange={set("sport")} />
        <AdminField label="Taqdimot" value={form.presentations} onChange={set("presentations")} />
        <AdminField label="A'zolar period (UZ)" value={form.membersPeriodUz} onChange={set("membersPeriodUz")} />
        <AdminField label="A'zolar period (EN)" value={form.membersPeriodEn} onChange={set("membersPeriodEn")} />
        <AdminField label="Period (UZ)" value={form.periodUz} onChange={set("periodUz")} />
        <AdminField label="Period (EN)" value={form.periodEn} onChange={set("periodEn")} />
      </div>
      <SaveBar error={error} message={msg} onSave={save} />
    </div>
  );
}
