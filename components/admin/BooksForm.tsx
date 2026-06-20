"use client";

import {
  AdminField,
  AdminSection,
  LocalizedField,
  type LocalizedValue,
} from "@/components/admin/FormFields";
import { normalizeLocalized } from "@/lib/admin-client";

export type BooksFormData = {
  current: {
    title: string;
    author: string;
    note: LocalizedValue;
    progressPercent: number;
    chapter: number;
    totalChapters: number;
  };
  finishedCount: number;
  finished: { title: string; author: string }[];
};

export const emptyBooksForm: BooksFormData = {
  current: {
    title: "",
    author: "",
    note: { uz: "", en: "" },
    progressPercent: 0,
    chapter: 0,
    totalChapters: 0,
  },
  finishedCount: 0,
  finished: [],
};

export function booksFromApi(doc: Record<string, unknown>): BooksFormData {
  const current = (doc.current as BooksFormData["current"]) ?? emptyBooksForm.current;
  return {
    current: {
      title: String(current.title ?? ""),
      author: String(current.author ?? ""),
      note: normalizeLocalized(current.note),
      progressPercent: Number(current.progressPercent ?? 0),
      chapter: Number(current.chapter ?? 0),
      totalChapters: Number(current.totalChapters ?? 0),
    },
    finishedCount: Number(doc.finishedCount ?? 0),
    finished: ((doc.finished as BooksFormData["finished"]) ?? []).map((b) => ({
      title: b?.title ?? "",
      author: b?.author ?? "",
    })),
  };
}

export default function BooksForm({
  data,
  onChange,
}: {
  data: BooksFormData;
  onChange: (data: BooksFormData) => void;
}) {
  const setCurrent = <K extends keyof BooksFormData["current"]>(
    key: K,
    value: BooksFormData["current"][K]
  ) => {
    onChange({ ...data, current: { ...data.current, [key]: value } });
  };

  return (
    <div className="max-w-3xl">
      <AdminSection title="Hozir o'qilayotgan kitob">
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminField label="Nomi" value={data.current.title} onChange={(v) => setCurrent("title", v)} />
          <AdminField label="Muallif" value={data.current.author} onChange={(v) => setCurrent("author", v)} />
          <AdminField
            label="Progress (%)"
            type="number"
            value={data.current.progressPercent}
            onChange={(v) => setCurrent("progressPercent", Number(v) || 0)}
          />
          <AdminField
            label="Joriy bob"
            type="number"
            value={data.current.chapter}
            onChange={(v) => setCurrent("chapter", Number(v) || 0)}
          />
          <AdminField
            label="Jami boblar"
            type="number"
            value={data.current.totalChapters}
            onChange={(v) => setCurrent("totalChapters", Number(v) || 0)}
          />
        </div>
        <LocalizedField label="Izoh" value={data.current.note} onChange={(v) => setCurrent("note", v)} multiline />
      </AdminSection>

      <AdminSection title="Tugatilgan kitoblar">
        <AdminField
          label="Tugatilganlar soni (ko'rsatish)"
          type="number"
          value={data.finishedCount}
          onChange={(v) => onChange({ ...data, finishedCount: Number(v) || 0 })}
        />
        {data.finished.map((book, i) => (
          <div key={i} className="rounded-lg border border-navy-line/60 p-3">
            <div className="mb-3 flex justify-between">
              <span className="text-xs text-paper-line">Kitob #{i + 1}</span>
              <button
                type="button"
                onClick={() =>
                  onChange({ ...data, finished: data.finished.filter((_, idx) => idx !== i) })
                }
                className="text-xs text-red-300"
              >
                O&apos;chir
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <AdminField
                label="Nomi"
                value={book.title}
                onChange={(v) => {
                  const next = [...data.finished];
                  next[i] = { ...book, title: v };
                  onChange({ ...data, finished: next });
                }}
              />
              <AdminField
                label="Muallif"
                value={book.author}
                onChange={(v) => {
                  const next = [...data.finished];
                  next[i] = { ...book, author: v };
                  onChange({ ...data, finished: next });
                }}
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange({ ...data, finished: [...data.finished, { title: "", author: "" }] })}
          className="rounded-lg border border-navy-line px-3 py-1.5 text-xs text-gold-light"
        >
          + Kitob qo&apos;shish
        </button>
      </AdminSection>
    </div>
  );
}
