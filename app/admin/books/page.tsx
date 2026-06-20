"use client";

import { useEffect, useState } from "react";
import BooksForm, { booksFromApi, emptyBooksForm, type BooksFormData } from "@/components/admin/BooksForm";
import { SaveBar } from "@/components/admin/FormFields";
import { adminFetch, normalizeLocalized } from "@/lib/admin-client";

function booksToApi(data: BooksFormData) {
  return {
    current: { ...data.current, note: normalizeLocalized(data.current.note) },
    finishedCount: data.finishedCount,
    finished: data.finished.filter((b) => b.title.trim() || b.author.trim()),
  };
}

export default function AdminBooksPage() {
  const [data, setData] = useState<BooksFormData>(emptyBooksForm);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    adminFetch<Record<string, unknown>>("/api/admin/books")
      .then((d) => {
        const { _id, __v, singleton, createdAt, updatedAt, ...rest } = d as Record<string, unknown> & {
          _id?: unknown;
          __v?: unknown;
          singleton?: unknown;
          createdAt?: unknown;
          updatedAt?: unknown;
        };
        setData(booksFromApi(rest));
      })
      .catch((e) => setLoadError(e instanceof Error ? e.message : "Yuklash xatosi"));
  }, []);

  const save = async () => {
    setError("");
    setMsg("");
    try {
      await adminFetch("/api/admin/books", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booksToApi(data)),
      });
      setMsg("Saqlandi!");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Xato");
    }
  };

  if (loadError) {
    return <p className="text-red-400">{loadError}</p>;
  }

  return (
    <div>
      <h1 className="font-display text-2xl text-gold-light sm:text-3xl">Kitoblar</h1>
      <div className="mt-6">
        <BooksForm data={data} onChange={setData} />
      </div>
      <SaveBar error={error} message={msg} onSave={save} />
    </div>
  );
}
