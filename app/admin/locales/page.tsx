"use client";

import { useEffect, useState } from "react";

const SECTIONS = ["nav", "footer", "header", "home", "about", "meetings", "members", "activities", "join"];

type LocaleItem = { key: string; uz: string; en: string };

export default function AdminLocalesPage() {
  const [section, setSection] = useState("home");
  const [items, setItems] = useState<LocaleItem[]>([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch(`/api/admin/locale-strings?section=${section}`)
      .then((r) => r.json())
      .then(setItems);
  }, [section]);

  const saveAll = async () => {
    const res = await fetch("/api/admin/locale-strings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    });
    setMsg(res.ok ? "Saqlandi!" : "Xato");
  };

  const update = (key: string, field: "uz" | "en", value: string) => {
    setItems((prev) => prev.map((i) => (i.key === key ? { ...i, [field]: value } : i)));
  };

  return (
    <div>
      <h1 className="font-display text-3xl text-gold-light">Matnlar (CMS)</h1>
      <div className="mt-4 flex flex-wrap gap-2">
        {SECTIONS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setSection(s)}
            className={`rounded-lg px-3 py-1.5 text-sm ${
              section === s ? "bg-gold text-navy-deep" : "bg-navy-card text-paper-line hover:text-paper"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
      <div className="mt-6 max-h-[60vh] space-y-3 overflow-y-auto">
        {items.map((item) => (
          <div key={item.key} className="rounded-lg border border-navy-line bg-navy-card p-3">
            <p className="mb-2 font-mono text-xs text-gold-light">{item.key}</p>
            <div className="grid gap-2 sm:grid-cols-2">
              <input value={item.uz} onChange={(e) => update(item.key, "uz", e.target.value)}
                placeholder="UZ" className="rounded border border-navy-line bg-[#081426] px-2 py-1.5 text-sm text-paper" />
              <input value={item.en} onChange={(e) => update(item.key, "en", e.target.value)}
                placeholder="EN" className="rounded border border-navy-line bg-[#081426] px-2 py-1.5 text-sm text-paper" />
            </div>
          </div>
        ))}
      </div>
      {msg && <p className="mt-4 text-sm text-gold-light">{msg}</p>}
      <button type="button" onClick={saveAll} className="mt-4 rounded-lg bg-gold px-6 py-2 text-sm font-semibold text-navy-deep">
        Barchasini saqlash
      </button>
    </div>
  );
}
