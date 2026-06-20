"use client";

import { useEffect, useState } from "react";
import ImageUpload from "@/components/admin/ImageUpload";

export default function AdminSettingsPage() {
  const [form, setForm] = useState({
    email: "", telegram: "", instagram: "", linkedin: "",
    heroDesktopUrl: "", heroMobileUrl: "",
  });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/admin/settings").then((r) => r.json()).then(setForm);
  }, []);

  const save = async () => {
    const res = await fetch("/api/admin/settings", {
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
      <h1 className="font-display text-3xl text-gold-light">Sozlamalar</h1>
      <div className="mt-6 space-y-4">
        {field("email", "Email")}
        {field("telegram", "Telegram URL")}
        {field("instagram", "Instagram URL")}
        {field("linkedin", "LinkedIn URL")}
        <ImageUpload label="Hero (desktop)" folder="hero" value={form.heroDesktopUrl}
          onChange={(url) => setForm({ ...form, heroDesktopUrl: url })} />
        <ImageUpload label="Hero (mobile)" folder="hero" value={form.heroMobileUrl}
          onChange={(url) => setForm({ ...form, heroMobileUrl: url })} />
      </div>
      {msg && <p className="mt-4 text-sm text-gold-light">{msg}</p>}
      <button type="button" onClick={save} className="mt-4 rounded-lg bg-gold px-6 py-2 text-sm font-semibold text-navy-deep">Saqlash</button>
    </div>
  );
}
