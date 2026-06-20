"use client";

import { useEffect, useState } from "react";
import { SaveBar } from "@/components/admin/FormFields";

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
      <h1 className="font-display text-2xl text-gold-light sm:text-3xl">Matnlar (CMS)</h1>
      <div className="-mx-4 mt-4 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
        <div className="flex w-max gap-2 sm:flex-wrap sm:w-auto">
          {SECTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSection(s)}
              className={`shrink-0 rounded-lg px-3 py-2 text-sm ${
                section === s ? "bg-gold text-navy-deep" : "bg-navy-card text-paper-line hover:text-paper"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-6 max-h-[55vh] space-y-3 overflow-y-auto sm:max-h-[60vh]">
        {items.map((item) => (
          <div key={item.key} className="rounded-xl border border-navy-line bg-navy-card p-3">
            <p className="mb-2 break-all font-mono text-[11px] text-gold-light sm:text-xs">{item.key}</p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <input
                value={item.uz}
                onChange={(e) => update(item.key, "uz", e.target.value)}
                placeholder="UZ"
                className="rounded-lg border border-navy-line bg-[#081426] px-3 py-2.5 text-base text-paper sm:text-sm"
              />
              <input
                value={item.en}
                onChange={(e) => update(item.key, "en", e.target.value)}
                placeholder="EN"
                className="rounded-lg border border-navy-line bg-[#081426] px-3 py-2.5 text-base text-paper sm:text-sm"
              />
            </div>
          </div>
        ))}
      </div>
      <SaveBar message={msg} onSave={saveAll} label="Barchasini saqlash" />
    </div>
  );
}
