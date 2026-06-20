"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ImageUpload from "@/components/admin/ImageUpload";

export default function EditMemberPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const [json, setJson] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/admin/members/${slug}`)
      .then((r) => r.json())
      .then((d) => {
        setPhotoUrl(d.photoUrl || "");
        const { _id, __v, createdAt, updatedAt, photoUrl: p, ...rest } = d;
        setJson(JSON.stringify(rest, null, 2));
      });
  }, [slug]);

  const save = async () => {
    try {
      const body = JSON.parse(json);
      body.photoUrl = photoUrl;
      const res = await fetch(`/api/admin/members/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      router.push("/admin/members");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Xato");
    }
  };

  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-3xl text-gold-light">Tahrirlash: {slug}</h1>
      <div className="mt-4">
        <ImageUpload value={photoUrl} onChange={setPhotoUrl} />
      </div>
      <textarea
        value={json}
        onChange={(e) => setJson(e.target.value)}
        rows={24}
        className="mt-4 w-full rounded-lg border border-navy-line bg-[#081426] px-3 py-2 font-mono text-xs text-paper"
      />
      {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
      <button
        type="button"
        onClick={save}
        className="mt-4 rounded-lg bg-gold px-6 py-2 text-sm font-semibold text-navy-deep"
      >
        Saqlash
      </button>
    </div>
  );
}
