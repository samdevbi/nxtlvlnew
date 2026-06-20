"use client";

import { useEffect, useState } from "react";

export default function AdminBooksPage() {
  const [json, setJson] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/admin/books").then((r) => r.json()).then((d) => {
      const { _id, __v, singleton, createdAt, updatedAt, ...rest } = d;
      setJson(JSON.stringify(rest, null, 2));
    });
  }, []);

  const save = async () => {
    const body = JSON.parse(json);
    const res = await fetch("/api/admin/books", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setMsg(res.ok ? "Saqlandi!" : "Xato");
  };

  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-3xl text-gold-light">Kitoblar</h1>
      <textarea value={json} onChange={(e) => setJson(e.target.value)} rows={20}
        className="mt-4 w-full rounded-lg border border-navy-line bg-[#081426] px-3 py-2 font-mono text-xs text-paper" />
      {msg && <p className="mt-2 text-sm text-gold-light">{msg}</p>}
      <button type="button" onClick={save} className="mt-4 rounded-lg bg-gold px-6 py-2 text-sm font-semibold text-navy-deep">Saqlash</button>
    </div>
  );
}
