"use client";

import { useEffect, useState } from "react";

export default function AdminStatsPage() {
  const [form, setForm] = useState({
    members: "", meetings: "", sport: "", presentations: "",
    membersPeriodUz: "", membersPeriodEn: "", periodUz: "", periodEn: "",
  });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/admin/stats").then((r) => r.json()).then(setForm);
  }, []);

  const save = async () => {
    const res = await fetch("/api/admin/stats", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setMsg(res.ok ? "Saqlandi!" : "Xato");
  };

  const field = (key: keyof typeof form, label: string) => (
    <div>
      <label className="text-xs text-paper-line">{label}</label>
      <input value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        className="mt-1 w-full rounded-lg border border-navy-line bg-[#081426] px-3 py-2 text-sm text-paper" />
    </div>
  );

  return (
    <div className="max-w-lg">
      <h1 className="font-display text-3xl text-gold-light">Statistika</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {field("members", "A'zolar")}
        {field("meetings", "Uchrashuvlar")}
        {field("sport", "Sport")}
        {field("presentations", "Taqdimot")}
        {field("membersPeriodUz", "A'zolar period (UZ)")}
        {field("membersPeriodEn", "A'zolar period (EN)")}
        {field("periodUz", "Period (UZ)")}
        {field("periodEn", "Period (EN)")}
      </div>
      {msg && <p className="mt-4 text-sm text-gold-light">{msg}</p>}
      <button type="button" onClick={save} className="mt-4 rounded-lg bg-gold px-6 py-2 text-sm font-semibold text-navy-deep">Saqlash</button>
    </div>
  );
}
