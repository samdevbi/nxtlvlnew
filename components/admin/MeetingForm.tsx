"use client";

import {
  AdminField,
  AdminSection,
  AdminSelect,
  LocalizedField,
  LocalizedListEditor,
  type LocalizedValue,
} from "@/components/admin/FormFields";
import { normalizeLocalized } from "@/lib/admin-client";

export type MeetingSpeaker = {
  slug: string;
  name: string;
  shortName: string;
  initials: string;
  role: string;
};

export type MeetingFormData = {
  type: "next" | "archive";
  slug: string;
  number: number;
  title: string;
  iso: string;
  dateLabel: LocalizedValue;
  dateLong: LocalizedValue;
  time: string;
  timeRange: string;
  location: string;
  attendance: string;
  speaker: MeetingSpeaker;
  summary: LocalizedValue;
  topics: LocalizedValue[];
  slides: { pages: number; url: string };
  takeaways: LocalizedValue[];
  galleryCount: number;
};

export const emptyMeetingForm: MeetingFormData = {
  type: "archive",
  slug: "",
  number: 1,
  title: "",
  iso: "",
  dateLabel: { uz: "", en: "" },
  dateLong: { uz: "", en: "" },
  time: "",
  timeRange: "",
  location: "",
  attendance: "",
  speaker: { slug: "", name: "", shortName: "", initials: "", role: "" },
  summary: { uz: "", en: "" },
  topics: [],
  slides: { pages: 0, url: "" },
  takeaways: [],
  galleryCount: 0,
};

export function meetingFromApi(doc: Record<string, unknown>): MeetingFormData {
  return {
    type: (doc.type as MeetingFormData["type"]) ?? "archive",
    slug: String(doc.slug ?? ""),
    number: Number(doc.number ?? 0),
    title: String(doc.title ?? ""),
    iso: String(doc.iso ?? ""),
    dateLabel: normalizeLocalized(doc.dateLabel as { uz?: string; en?: string }),
    dateLong: normalizeLocalized(doc.dateLong as { uz?: string; en?: string }),
    time: String(doc.time ?? ""),
    timeRange: String(doc.timeRange ?? ""),
    location: String(doc.location ?? ""),
    attendance: String(doc.attendance ?? ""),
    speaker: {
      slug: String((doc.speaker as MeetingSpeaker)?.slug ?? ""),
      name: String((doc.speaker as MeetingSpeaker)?.name ?? ""),
      shortName: String((doc.speaker as MeetingSpeaker)?.shortName ?? ""),
      initials: String((doc.speaker as MeetingSpeaker)?.initials ?? ""),
      role: String((doc.speaker as MeetingSpeaker)?.role ?? ""),
    },
    summary: normalizeLocalized(doc.summary as { uz?: string; en?: string }),
    topics: ((doc.topics as { uz?: string; en?: string }[]) ?? []).map((t) => normalizeLocalized(t)),
    slides: {
      pages: Number((doc.slides as MeetingFormData["slides"])?.pages ?? 0),
      url: String((doc.slides as MeetingFormData["slides"])?.url ?? ""),
    },
    takeaways: ((doc.takeaways as { uz?: string; en?: string }[]) ?? []).map((t) =>
      normalizeLocalized(t)
    ),
    galleryCount: Number(doc.galleryCount ?? 0),
  };
}

export function meetingToApi(data: MeetingFormData, slugReadOnly?: boolean) {
  const body = {
    ...data,
    dateLabel: normalizeLocalized(data.dateLabel),
    dateLong: normalizeLocalized(data.dateLong),
    summary: normalizeLocalized(data.summary),
    topics: data.topics.filter((t) => t.uz.trim() || t.en.trim()).map((t) => normalizeLocalized(t)),
    takeaways: data.takeaways
      .filter((t) => t.uz.trim() || t.en.trim())
      .map((t) => normalizeLocalized(t)),
    speaker: { ...data.speaker },
  };
  if (slugReadOnly) {
    const { slug: _slug, ...rest } = body;
    return rest;
  }
  return body;
}

export default function MeetingForm({
  data,
  onChange,
  slugReadOnly,
}: {
  data: MeetingFormData;
  onChange: (data: MeetingFormData) => void;
  slugReadOnly?: boolean;
}) {
  const set = <K extends keyof MeetingFormData>(key: K, value: MeetingFormData[K]) => {
    onChange({ ...data, [key]: value });
  };

  const setSpeaker = (key: keyof MeetingSpeaker, value: string) => {
    onChange({ ...data, speaker: { ...data.speaker, [key]: value } });
  };

  const isNext = data.type === "next";

  return (
    <div className="max-w-3xl">
      <AdminSection title="Asosiy">
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminSelect
            label="Turi"
            value={data.type}
            onChange={(v) => set("type", v as MeetingFormData["type"])}
            options={[
              { value: "next", label: "Keyingi uchrashuv" },
              { value: "archive", label: "Arxiv" },
            ]}
          />
          <AdminField
            label="Slug"
            value={data.slug}
            readOnly={slugReadOnly}
            onChange={(v) => set("slug", v)}
          />
          <AdminField label="Raqam" type="number" value={data.number} onChange={(v) => set("number", Number(v) || 0)} />
          <AdminField label="Sarlavha" value={data.title} onChange={(v) => set("title", v)} />
          {isNext && (
            <AdminField label="ISO sana (countdown)" value={data.iso} onChange={(v) => set("iso", v)} />
          )}
          <AdminField label="Joy" value={data.location} onChange={(v) => set("location", v)} />
          {isNext ? (
            <AdminField label="Vaqt" value={data.time} onChange={(v) => set("time", v)} />
          ) : null}
          <AdminField label="Vaqt oralig'i" value={data.timeRange} onChange={(v) => set("timeRange", v)} />
          {!isNext && (
            <AdminField label="Qatnashish" value={data.attendance} onChange={(v) => set("attendance", v)} />
          )}
        </div>
        <LocalizedField label="Sana (qisqa)" value={data.dateLabel} onChange={(v) => set("dateLabel", v)} />
        {!isNext && (
          <LocalizedField label="Sana (uzun)" value={data.dateLong} onChange={(v) => set("dateLong", v)} />
        )}
        {!isNext && (
          <LocalizedField label="Xulosa" value={data.summary} onChange={(v) => set("summary", v)} multiline />
        )}
      </AdminSection>

      <AdminSection title="Ma'ruzachi">
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminField label="Slug" value={data.speaker.slug} onChange={(v) => setSpeaker("slug", v)} />
          <AdminField label="Ism" value={data.speaker.name} onChange={(v) => setSpeaker("name", v)} />
          <AdminField label="Qisqa ism" value={data.speaker.shortName} onChange={(v) => setSpeaker("shortName", v)} />
          <AdminField label="Bosh harflar" value={data.speaker.initials} onChange={(v) => setSpeaker("initials", v)} />
          <AdminField label="Rol" value={data.speaker.role} onChange={(v) => setSpeaker("role", v)} />
        </div>
      </AdminSection>

      <AdminSection title="Mavzular">
        <LocalizedListEditor label="Mavzular ro'yxati" items={data.topics} onChange={(v) => set("topics", v)} />
      </AdminSection>

      {!isNext && (
        <AdminSection title="Arxiv qo'shimcha">
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField
              label="Slayd sahifalari"
              type="number"
              value={data.slides.pages}
              onChange={(v) => set("slides", { ...data.slides, pages: Number(v) || 0 })}
            />
            <AdminField
              label="Slayd URL"
              value={data.slides.url}
              onChange={(v) => set("slides", { ...data.slides, url: v })}
            />
            <AdminField
              label="Galereya soni"
              type="number"
              value={data.galleryCount}
              onChange={(v) => set("galleryCount", Number(v) || 0)}
            />
          </div>
          <LocalizedListEditor label="Asosiy fikrlar" items={data.takeaways} onChange={(v) => set("takeaways", v)} />
        </AdminSection>
      )}
    </div>
  );
}
