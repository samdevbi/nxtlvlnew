"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ImageUpload from "@/components/admin/ImageUpload";

const empty = {
  slug: "",
  name: "",
  shortName: "",
  initials: "",
  age: 25,
  role: "",
  location: "",
  telegram: "",
  email: "",
  photoUrl: "",
  bio: { uz: "", en: "" },
  education: [],
  experience: [],
  skills: [],
  results: [],
  books: [],
  hobbies: [],
};

export default function NewMemberPage() {
  const router = useRouter();
  const [data, setData] = useState(empty);
  const [jsonExtra, setJsonExtra] = useState(
    JSON.stringify({ education: [], experience: [], skills: [], results: [], books: [], hobbies: [] }, null, 2)
  );
  const [error, setError] = useState("");

  const save = async () => {
    try {
      const extra = JSON.parse(jsonExtra);
      const body = { ...data, ...extra };
      const res = await fetch("/api/admin/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error);
      }
      router.push("/admin/members");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Xato");
    }
  };

  const field = (key: keyof typeof data, label: string) => (
    <div>
      <label className="text-xs text-paper-line">{label}</label>
      <input
        value={String(data[key] ?? "")}
        onChange={(e) => setData({ ...data, [key]: e.target.value })}
        className="mt-1 w-full rounded-lg border border-navy-line bg-[#081426] px-3 py-2 text-sm text-paper"
      />
    </div>
  );

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-3xl text-gold-light">Yangi a&apos;zo</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {field("slug", "Slug")}
        {field("name", "Ism")}
        {field("shortName", "Qisqa ism")}
        {field("initials", "Bosh harflar")}
        {field("role", "Lavozim")}
        {field("age", "Yosh")}
        {field("location", "Joy")}
        {field("telegram", "Telegram")}
        {field("email", "Email")}
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs text-paper-line">Bio (UZ)</label>
          <textarea
            value={data.bio.uz}
            onChange={(e) => setData({ ...data, bio: { ...data.bio, uz: e.target.value } })}
            rows={3}
            className="mt-1 w-full rounded-lg border border-navy-line bg-[#081426] px-3 py-2 text-sm text-paper"
          />
        </div>
        <div>
          <label className="text-xs text-paper-line">Bio (EN)</label>
          <textarea
            value={data.bio.en}
            onChange={(e) => setData({ ...data, bio: { ...data.bio, en: e.target.value } })}
            rows={3}
            className="mt-1 w-full rounded-lg border border-navy-line bg-[#081426] px-3 py-2 text-sm text-paper"
          />
        </div>
      </div>
      <div className="mt-4">
        <ImageUpload value={data.photoUrl} onChange={(url) => setData({ ...data, photoUrl: url })} />
      </div>
      <div className="mt-4">
        <label className="text-xs text-paper-line">Qo'shimcha (JSON: education, experience, skills...)</label>
        <textarea
          value={jsonExtra}
          onChange={(e) => setJsonExtra(e.target.value)}
          rows={12}
          className="mt-1 w-full rounded-lg border border-navy-line bg-[#081426] px-3 py-2 font-mono text-xs text-paper"
        />
      </div>
      {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
      <button
        type="button"
        onClick={save}
        className="mt-6 rounded-lg bg-gold px-6 py-2 text-sm font-semibold text-navy-deep"
      >
        Saqlash
      </button>
    </div>
  );
}
