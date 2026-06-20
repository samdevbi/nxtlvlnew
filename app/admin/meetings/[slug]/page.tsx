"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SaveBar } from "@/components/admin/FormFields";
import MeetingForm, { meetingFromApi, meetingToApi, type MeetingFormData } from "@/components/admin/MeetingForm";
import { adminFetch } from "@/lib/admin-client";

export default function EditMeetingPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const [data, setData] = useState<MeetingFormData | null>(null);
  const [error, setError] = useState("");
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    adminFetch<Record<string, unknown>>(`/api/admin/meetings/${slug}`)
      .then((d) => {
        const { _id, __v, createdAt, updatedAt, ...rest } = d as Record<string, unknown> & {
          _id?: unknown;
          __v?: unknown;
          createdAt?: unknown;
          updatedAt?: unknown;
        };
        setData(meetingFromApi(rest));
      })
      .catch((e) => setLoadError(e instanceof Error ? e.message : "Yuklash xatosi"));
  }, [slug]);

  const save = async () => {
    if (!data) return;
    try {
      await adminFetch(`/api/admin/meetings/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(meetingToApi(data, true)),
      });
      router.push("/admin/meetings");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Xato");
    }
  };

  if (loadError) {
    return <p className="text-red-400">{loadError}</p>;
  }

  if (!data) {
    return <p className="text-paper-line">Yuklanmoqda...</p>;
  }

  return (
    <div>
      <h1 className="font-display text-3xl text-gold-light">Uchrashuv: {slug}</h1>
      <div className="mt-6">
        <MeetingForm data={data} onChange={setData} slugReadOnly />
      </div>
      <SaveBar error={error} onSave={save} />
    </div>
  );
}
