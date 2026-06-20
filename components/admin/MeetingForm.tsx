"use client";

import { useRef } from "react";
import AdminDateTimePicker from "@/components/admin/AdminDateTimePicker";
import SpeakerMemberPicker from "@/components/admin/SpeakerMemberPicker";
import {
  AdminField,
  AdminSection,
  AdminSelect,
  LocalizedFieldPrimary,
  LocalizedListEditor,
  type LocalizedValue,
} from "@/components/admin/FormFields";
import { slugify, buildTimeRange } from "@/lib/admin-form-utils";
import { isLocalizedEmpty, normalizeLocalizedPrimary } from "@/lib/localized";

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
  type: "next",
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
    dateLabel: normalizeLocalizedPrimary(doc.dateLabel as { uz?: string; en?: string }),
    dateLong: normalizeLocalizedPrimary(doc.dateLong as { uz?: string; en?: string }),
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
    summary: normalizeLocalizedPrimary(doc.summary as { uz?: string; en?: string }),
    topics: ((doc.topics as { uz?: string; en?: string }[]) ?? []).map((t) =>
      normalizeLocalizedPrimary(t)
    ),
    slides: {
      pages: Number((doc.slides as MeetingFormData["slides"])?.pages ?? 0),
      url: String((doc.slides as MeetingFormData["slides"])?.url ?? ""),
    },
    takeaways: ((doc.takeaways as { uz?: string; en?: string }[]) ?? []).map((t) =>
      normalizeLocalizedPrimary(t)
    ),
    galleryCount: Number(doc.galleryCount ?? 0),
  };
}

function fillMeetingDefaults(data: MeetingFormData): MeetingFormData {
  const dateLabel = normalizeLocalizedPrimary(data.dateLabel);
  const dateLong = isLocalizedEmpty(data.dateLong) ? dateLabel : normalizeLocalizedPrimary(data.dateLong);
  const summary =
    data.type === "next" && isLocalizedEmpty(data.summary)
      ? normalizeLocalizedPrimary({ uz: data.title, en: data.title })
      : normalizeLocalizedPrimary(data.summary);
  const timeRange = data.timeRange.trim() || buildTimeRange(data.time);

  return {
    ...data,
    dateLabel,
    dateLong,
    summary,
    timeRange,
  };
}

export function meetingToApi(data: MeetingFormData, slugReadOnly?: boolean) {
  const prepared = fillMeetingDefaults(data);

  const body = {
    ...prepared,
    dateLabel: normalizeLocalizedPrimary(prepared.dateLabel),
    dateLong: normalizeLocalizedPrimary(prepared.dateLong),
    summary: normalizeLocalizedPrimary(prepared.summary),
    topics: prepared.topics
      .filter((t) => t.uz.trim() || t.en.trim())
      .map((t) => normalizeLocalizedPrimary(t)),
    takeaways: prepared.takeaways
      .filter((t) => t.uz.trim() || t.en.trim())
      .map((t) => normalizeLocalizedPrimary(t)),
    speaker: { ...prepared.speaker },
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
  autoSlug = !slugReadOnly,
}: {
  data: MeetingFormData;
  onChange: (data: MeetingFormData) => void;
  slugReadOnly?: boolean;
  autoSlug?: boolean;
}) {
  const slugTouched = useRef(false);
  const isNext = data.type === "next";

  const set = <K extends keyof MeetingFormData>(key: K, value: MeetingFormData[K]) => {
    onChange({ ...data, [key]: value });
  };

  const onTitleChange = (title: string) => {
    const patch: Partial<MeetingFormData> = { title };
    if (autoSlug && !slugReadOnly && !slugTouched.current) {
      patch.slug = slugify(title);
    }
    onChange({ ...data, ...patch });
  };

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
            label="Raqam"
            type="number"
            value={data.number}
            onChange={(v) => set("number", Number(v) || 0)}
            hint="Avtomatik taklif qilinadi, o'zgartirish mumkin"
          />
          <div className="sm:col-span-2">
            <AdminField label="Sarlavha" value={data.title} onChange={onTitleChange} />
          </div>
          <AdminField
            label="Slug"
            value={data.slug}
            readOnly={slugReadOnly}
            onChange={(v) => {
              slugTouched.current = true;
              set("slug", v);
            }}
            hint="URL uchun. Sarlavhadan avtomatik yaratiladi"
          />
          <div className="sm:col-span-2">
            <AdminField label="Joy" value={data.location} onChange={(v) => set("location", v)} />
          </div>
        </div>

        <AdminDateTimePicker
          iso={data.iso}
          time={data.time}
          dateLabel={data.dateLabel}
          dateLong={data.dateLong}
          showLongDate={!isNext}
          onChange={(patch) =>
            onChange({
              ...data,
              iso: patch.iso,
              time: patch.time,
              dateLabel: patch.dateLabel,
              dateLong: patch.dateLong ?? data.dateLong,
              timeRange: data.timeRange.trim() || buildTimeRange(patch.time),
            })
          }
        />

        {!isNext && (
          <>
            <AdminField
              label="Vaqt oralig'i"
              value={data.timeRange}
              onChange={(v) => set("timeRange", v)}
              hint="Masalan: 10:00 — 13:00"
            />
            <AdminField label="Qatnashish" value={data.attendance} onChange={(v) => set("attendance", v)} />
            <LocalizedFieldPrimary
              label="Xulosa"
              value={data.summary}
              onChange={(v) => set("summary", v)}
              multiline
            />
          </>
        )}

        {isNext && (
          <AdminField
            label="Vaqt oralig'i (ixtiyoriy)"
            value={data.timeRange}
            onChange={(v) => set("timeRange", v)}
            hint="Bo'sh qoldirsangiz boshlanish vaqti ishlatiladi"
          />
        )}
      </AdminSection>

      <AdminSection title="Ma'ruzachi">
        <SpeakerMemberPicker speaker={data.speaker} onChange={(speaker) => set("speaker", speaker)} />
      </AdminSection>

      <AdminSection title="Mavzular">
        <LocalizedListEditor
          label="Mavzular ro'yxati"
          items={data.topics}
          onChange={(v) => set("topics", v)}
          primaryOnly
        />
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
          <LocalizedListEditor
            label="Asosiy fikrlar"
            items={data.takeaways}
            onChange={(v) => set("takeaways", v)}
            primaryOnly
          />
        </AdminSection>
      )}
    </div>
  );
}
