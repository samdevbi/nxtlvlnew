"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AdminBackLink } from "@/components/admin/AdminLayout";
import { SaveBar } from "@/components/admin/FormFields";
import MeetingForm, { emptyMeetingForm, meetingToApi, type MeetingFormData } from "@/components/admin/MeetingForm";
import { adminFetch } from "@/lib/admin-client";

type MeetingListItem = { number: number };

export default function NewMeetingPage() {
  const router = useRouter();
  const [data, setData] = useState<MeetingFormData>({ ...emptyMeetingForm, type: "next" });
  const [error, setError] = useState("");

  useEffect(() => {
    adminFetch<MeetingListItem[]>("/api/admin/meetings")
      .then((meetings) => {
        const maxNumber = meetings.reduce((max, m) => Math.max(max, m.number || 0), 0);
        setData((prev) => ({ ...prev, number: maxNumber + 1 }));
      })
      .catch(() => {});
  }, []);

  const save = async () => {
    setError("");
    try {
      await adminFetch("/api/admin/meetings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(meetingToApi(data)),
      });
      router.push("/admin/meetings");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Xato");
    }
  };

  return (
    <div>
      <AdminBackLink href="/admin/meetings">Uchrashuvlar ro&apos;yxati</AdminBackLink>
      <h1 className="font-display text-2xl text-gold-light sm:text-3xl">Yangi uchrashuv</h1>
      <p className="mt-1 text-sm text-paper-line">
        O&apos;zbekcha maydonlar yetarli. Sana va slug avtomatik to&apos;ldiriladi.
      </p>
      <div className="mt-6">
        <MeetingForm data={data} onChange={setData} />
      </div>
      <SaveBar error={error} onSave={save} />
    </div>
  );
}
