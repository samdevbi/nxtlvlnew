"use client";

import ImageUpload from "@/components/admin/ImageUpload";
import {
  AdminField,
  AdminSection,
  AdminTextarea,
  LocalizedField,
  LocalizedListEditor,
  StringListEditor,
  type LocalizedValue,
} from "@/components/admin/FormFields";
import type { MemberEducation } from "@/lib/members";
import { normalizeLocalized, stripEmptyStrings } from "@/lib/admin-client";

export type MemberFormData = {
  slug: string;
  name: string;
  shortName: string;
  initials: string;
  age: number;
  role: string;
  photoUrl: string;
  location: string;
  telegram: string;
  email: string;
  bio: LocalizedValue;
  education: MemberEducation[];
  experience: { title: string; period: LocalizedValue }[];
  skills: string[];
  results: { label: LocalizedValue; text: LocalizedValue }[];
  books: string[];
  hobbies: LocalizedValue[];
};

export const emptyMemberForm: MemberFormData = {
  slug: "",
  name: "",
  shortName: "",
  initials: "",
  age: 25,
  role: "",
  photoUrl: "",
  location: "",
  telegram: "",
  email: "",
  bio: { uz: "", en: "" },
  education: [],
  experience: [],
  skills: [],
  results: [],
  books: [],
  hobbies: [],
};

export function memberFromApi(doc: Record<string, unknown>): MemberFormData {
  return {
    slug: String(doc.slug ?? ""),
    name: String(doc.name ?? ""),
    shortName: String(doc.shortName ?? ""),
    initials: String(doc.initials ?? ""),
    age: Number(doc.age ?? 0),
    role: String(doc.role ?? ""),
    photoUrl: String(doc.photoUrl ?? ""),
    location: String(doc.location ?? ""),
    telegram: String(doc.telegram ?? ""),
    email: String(doc.email ?? ""),
    bio: normalizeLocalized(doc.bio as { uz?: string; en?: string }),
    education: ((doc.education as MemberEducation[]) ?? []).map((edu) => ({
      degree: edu?.degree ?? "bachelor",
      field: edu?.field ?? "",
      university: edu?.university ?? "",
      period: normalizeLocalized(edu?.period),
    })),
    experience: ((doc.experience as MemberFormData["experience"]) ?? []).map((exp) => ({
      title: exp?.title ?? "",
      period: normalizeLocalized(exp?.period),
    })),
    skills: stripEmptyStrings((doc.skills as string[]) ?? []),
    results: ((doc.results as MemberFormData["results"]) ?? []).map((res) => ({
      label: normalizeLocalized(res?.label),
      text: normalizeLocalized(res?.text),
    })),
    books: stripEmptyStrings((doc.books as string[]) ?? []),
    hobbies: ((doc.hobbies as { uz?: string; en?: string }[]) ?? []).map((h) =>
      normalizeLocalized(h)
    ),
  };
}

export function memberToApi(data: MemberFormData, slugReadOnly?: boolean) {
  const body = {
    ...data,
    skills: stripEmptyStrings(data.skills),
    books: stripEmptyStrings(data.books),
    education: data.education
      .filter((e) => e.field.trim() || e.university.trim())
      .map((e) => ({ ...e, period: normalizeLocalized(e.period) })),
    experience: data.experience
      .filter((e) => e.title.trim())
      .map((e) => ({ ...e, period: normalizeLocalized(e.period) })),
    results: data.results
      .filter((r) => r.label.uz.trim() || r.label.en.trim() || r.text.uz.trim() || r.text.en.trim())
      .map((r) => ({ label: normalizeLocalized(r.label), text: normalizeLocalized(r.text) })),
    hobbies: data.hobbies
      .filter((h) => h.uz.trim() || h.en.trim())
      .map((h) => normalizeLocalized(h)),
    bio: normalizeLocalized(data.bio),
  };
  if (slugReadOnly) {
    const { slug: _slug, ...rest } = body;
    return rest;
  }
  return body;
}

export default function MemberForm({
  data,
  onChange,
  slugReadOnly,
}: {
  data: MemberFormData;
  onChange: (data: MemberFormData) => void;
  slugReadOnly?: boolean;
}) {
  const set = <K extends keyof MemberFormData>(key: K, value: MemberFormData[K]) => {
    onChange({ ...data, [key]: value });
  };

  return (
    <div className="max-w-3xl">
      <AdminSection title="Asosiy ma'lumotlar">
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminField
            label="Slug (URL)"
            value={data.slug}
            readOnly={slugReadOnly}
            onChange={(v) => set("slug", v)}
          />
          <AdminField label="To'liq ism" value={data.name} onChange={(v) => set("name", v)} />
          <AdminField label="Qisqa ism" value={data.shortName} onChange={(v) => set("shortName", v)} />
          <AdminField label="Bosh harflar" value={data.initials} onChange={(v) => set("initials", v)} />
          <AdminField label="Yosh" type="number" value={data.age} onChange={(v) => set("age", Number(v) || 0)} />
          <AdminField label="Lavozim / Rol" value={data.role} onChange={(v) => set("role", v)} />
          <AdminField label="Joylashuv" value={data.location} onChange={(v) => set("location", v)} />
          <AdminField label="Telegram" value={data.telegram} onChange={(v) => set("telegram", v)} />
          <AdminField label="Email" value={data.email} onChange={(v) => set("email", v)} />
        </div>
        <LocalizedField label="Bio" value={data.bio} onChange={(v) => set("bio", v)} multiline />
        <ImageUpload value={data.photoUrl} onChange={(url) => set("photoUrl", url)} />
      </AdminSection>

      <AdminSection title="Ta'lim">
        {data.education.map((edu, i) => (
          <div key={i} className="rounded-lg border border-navy-line/60 p-3">
            <div className="mb-3 flex justify-between">
              <span className="text-xs text-paper-line">Ta&apos;lim #{i + 1}</span>
              <button
                type="button"
                onClick={() => set("education", data.education.filter((_, idx) => idx !== i))}
                className="text-xs text-red-300"
              >
                O&apos;chir
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="text-xs text-paper-line">Daraja</label>
                <select
                  value={edu.degree}
                  onChange={(e) => {
                    const next = [...data.education];
                    next[i] = { ...edu, degree: e.target.value as MemberEducation["degree"] };
                    set("education", next);
                  }}
                  className="mt-1 w-full rounded-lg border border-navy-line bg-[#081426] px-3 py-2 text-sm text-paper"
                >
                  <option value="bachelor">Bakalavr</option>
                  <option value="master">Magistr</option>
                  <option value="phd">PhD</option>
                </select>
              </div>
              <AdminField
                label="Yo'nalish"
                value={edu.field}
                onChange={(v) => {
                  const next = [...data.education];
                  next[i] = { ...edu, field: v };
                  set("education", next);
                }}
              />
              <AdminField
                label="Universitet"
                value={edu.university}
                onChange={(v) => {
                  const next = [...data.education];
                  next[i] = { ...edu, university: v };
                  set("education", next);
                }}
              />
            </div>
            <div className="mt-3">
              <LocalizedField
                label="Davri"
                value={edu.period}
                onChange={(v) => {
                  const next = [...data.education];
                  next[i] = { ...edu, period: v };
                  set("education", next);
                }}
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            set("education", [
              ...data.education,
              { degree: "bachelor", field: "", university: "", period: { uz: "", en: "" } },
            ])
          }
          className="rounded-lg border border-navy-line px-3 py-1.5 text-xs text-gold-light"
        >
          + Ta&apos;lim qo&apos;shish
        </button>
      </AdminSection>

      <AdminSection title="Tajriba">
        {data.experience.map((exp, i) => (
          <div key={i} className="rounded-lg border border-navy-line/60 p-3">
            <div className="mb-3 flex justify-between">
              <span className="text-xs text-paper-line">Tajriba #{i + 1}</span>
              <button
                type="button"
                onClick={() => set("experience", data.experience.filter((_, idx) => idx !== i))}
                className="text-xs text-red-300"
              >
                O&apos;chir
              </button>
            </div>
            <AdminField
              label="Lavozim / Kompaniya"
              value={exp.title}
              onChange={(v) => {
                const next = [...data.experience];
                next[i] = { ...exp, title: v };
                set("experience", next);
              }}
            />
            <LocalizedField
              label="Davri"
              value={exp.period}
              onChange={(v) => {
                const next = [...data.experience];
                next[i] = { ...exp, period: v };
                set("experience", next);
              }}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            set("experience", [...data.experience, { title: "", period: { uz: "", en: "" } }])
          }
          className="rounded-lg border border-navy-line px-3 py-1.5 text-xs text-gold-light"
        >
          + Tajriba qo&apos;shish
        </button>
      </AdminSection>

      <AdminSection title="Ko'nikmalar va kitoblar">
        <StringListEditor label="Ko'nikmalar" items={data.skills} onChange={(v) => set("skills", v)} />
        <StringListEditor label="Kitoblar (ro'yxat)" items={data.books} onChange={(v) => set("books", v)} />
      </AdminSection>

      <AdminSection title="Natijalar">
        {data.results.map((res, i) => (
          <div key={i} className="rounded-lg border border-navy-line/60 p-3">
            <div className="mb-3 flex justify-between">
              <span className="text-xs text-paper-line">Natija #{i + 1}</span>
              <button
                type="button"
                onClick={() => set("results", data.results.filter((_, idx) => idx !== i))}
                className="text-xs text-red-300"
              >
                O&apos;chir
              </button>
            </div>
            <LocalizedField
              label="Sarlavha / Sana"
              value={res.label}
              onChange={(v) => {
                const next = [...data.results];
                next[i] = { ...res, label: v };
                set("results", next);
              }}
            />
            <LocalizedField
              label="Matn"
              value={res.text}
              onChange={(v) => {
                const next = [...data.results];
                next[i] = { ...res, text: v };
                set("results", next);
              }}
              multiline
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            set("results", [
              ...data.results,
              { label: { uz: "", en: "" }, text: { uz: "", en: "" } },
            ])
          }
          className="rounded-lg border border-navy-line px-3 py-1.5 text-xs text-gold-light"
        >
          + Natija qo&apos;shish
        </button>
      </AdminSection>

      <AdminSection title="Qiziqishlar">
        <LocalizedListEditor label="Hobbilar" items={data.hobbies} onChange={(v) => set("hobbies", v)} />
      </AdminSection>
    </div>
  );
}
