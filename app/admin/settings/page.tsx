"use client";

import { useEffect, useState } from "react";
import { AdminField, SaveBar } from "@/components/admin/FormFields";
import ImageUpload from "@/components/admin/ImageUpload";

export default function AdminSettingsPage() {
  const [form, setForm] = useState({
    email: "",
    telegram: "",
    instagram: "",
    linkedin: "",
    heroDesktopUrl: "",
    heroMobileUrl: "",
  });
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then(setForm);
  }, []);

  const save = async () => {
    setError("");
    setMsg("");
    const res = await fetch("/api/admin/settings", {
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
      <h1 className="font-display text-2xl text-gold-light sm:text-3xl">Sozlamalar</h1>
      <div className="mt-6 space-y-4">
        <AdminField label="Email" value={form.email} onChange={set("email")} type="email" />
        <AdminField label="Telegram URL" value={form.telegram} onChange={set("telegram")} />
        <AdminField label="Instagram URL" value={form.instagram} onChange={set("instagram")} />
        <AdminField label="LinkedIn URL" value={form.linkedin} onChange={set("linkedin")} />
        <ImageUpload
          label="Hero (desktop)"
          folder="hero"
          value={form.heroDesktopUrl}
          onChange={(url) => setForm({ ...form, heroDesktopUrl: url })}
        />
        <ImageUpload
          label="Hero (mobile)"
          folder="hero"
          value={form.heroMobileUrl}
          onChange={(url) => setForm({ ...form, heroMobileUrl: url })}
        />
      </div>
      <SaveBar error={error} message={msg} onSave={save} />
    </div>
  );
}
