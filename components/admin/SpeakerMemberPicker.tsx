"use client";

import { useEffect, useState } from "react";
import { AdminField, AdminSelect } from "@/components/admin/FormFields";
import { adminFetch } from "@/lib/admin-client";
import { initialsFromName, shortNameFromFull } from "@/lib/admin-form-utils";
import type { MeetingSpeaker } from "@/components/admin/MeetingForm";

type MemberOption = {
  slug: string;
  name: string;
  shortName?: string;
  initials: string;
  role: string;
};

export default function SpeakerMemberPicker({
  speaker,
  onChange,
}: {
  speaker: MeetingSpeaker;
  onChange: (speaker: MeetingSpeaker) => void;
}) {
  const [members, setMembers] = useState<MemberOption[]>([]);
  const [manual, setManual] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState(speaker.slug);

  useEffect(() => {
    adminFetch<MemberOption[]>("/api/admin/members")
      .then(setMembers)
      .catch(() => setMembers([]));
  }, []);

  useEffect(() => {
    if (speaker.slug && members.some((m) => m.slug === speaker.slug)) {
      setSelectedSlug(speaker.slug);
      setManual(false);
    } else if (speaker.name) {
      setManual(true);
    }
  }, [speaker.slug, speaker.name, members]);

  const pickMember = (slug: string) => {
    setSelectedSlug(slug);
    if (!slug) return;
    const m = members.find((x) => x.slug === slug);
    if (!m) return;
    onChange({
      slug: m.slug,
      name: m.name,
      shortName: m.shortName || shortNameFromFull(m.name),
      initials: m.initials || initialsFromName(m.name),
      role: m.role,
    });
  };

  const setSpeakerField = (key: keyof MeetingSpeaker, value: string) => {
    onChange({ ...speaker, [key]: value });
  };

  return (
    <div className="space-y-4">
      {!manual ? (
        <>
          <AdminSelect
            label="A'zodan tanlash"
            value={selectedSlug}
            onChange={pickMember}
            options={[
              { value: "", label: "— Tanlang —" },
              ...members.map((m) => ({ value: m.slug, label: m.name })),
            ]}
          />
          <button
            type="button"
            onClick={() => setManual(true)}
            className="text-xs text-gold-light hover:underline"
          >
            Qo&apos;lda kiritish
          </button>
          {speaker.name && (
            <p className="rounded-lg border border-navy-line/60 bg-[#081426] px-3 py-2 text-sm text-paper-line">
              {speaker.name} · {speaker.role}
            </p>
          )}
        </>
      ) : (
        <>
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs text-paper-line">Qo&apos;lda kiritish rejimi</p>
            <button
              type="button"
              onClick={() => {
                setManual(false);
                pickMember(selectedSlug);
              }}
              className="text-xs text-gold-light hover:underline"
            >
              Ro&apos;yxatdan tanlash
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Ism" value={speaker.name} onChange={(v) => setSpeakerField("name", v)} />
            <AdminField label="Rol" value={speaker.role} onChange={(v) => setSpeakerField("role", v)} />
            <AdminField
              label="Slug"
              value={speaker.slug}
              onChange={(v) => setSpeakerField("slug", v)}
            />
            <AdminField
              label="Qisqa ism"
              value={speaker.shortName}
              onChange={(v) => setSpeakerField("shortName", v)}
            />
            <AdminField
              label="Bosh harflar"
              value={speaker.initials}
              onChange={(v) => setSpeakerField("initials", v)}
            />
          </div>
        </>
      )}
    </div>
  );
}
