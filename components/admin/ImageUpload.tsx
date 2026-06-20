"use client";

import { useState, useRef } from "react";

export default function ImageUpload({
  value,
  onChange,
  folder = "members",
  label = "Rasm yuklash",
}: {
  value?: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = async (file: File) => {
    setLoading(true);
    setError("");
    const form = new FormData();
    form.append("file", file);
    form.append("folder", folder);
    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      onChange(data.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Xato");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-wider text-gold-light">{label}</p>
      {value && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="" className="h-28 w-28 rounded-lg object-cover sm:h-32 sm:w-32" />
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) upload(f);
        }}
      />
      <button
        type="button"
        disabled={loading}
        onClick={() => inputRef.current?.click()}
        className="w-full rounded-lg border border-navy-line bg-navy-card px-4 py-3 text-sm text-paper hover:border-gold disabled:opacity-50 sm:w-auto"
      >
        {loading ? "Yuklanmoqda..." : value ? "Rasmni almashtirish" : "Rasm tanlash"}
      </button>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
