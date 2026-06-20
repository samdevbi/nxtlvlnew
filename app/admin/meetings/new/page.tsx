"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SaveBar } from "@/components/admin/FormFields";
import MeetingForm, { emptyMeetingForm, meetingToApi, type MeetingFormData } from "@/components/admin/MeetingForm";
import { adminFetch } from "@/lib/admin-client";

export default function NewMeetingPage() {
  const router = useRouter();
  const [data, setData] = useState<MeetingFormData>(emptyMeetingForm);
  const [error, setError] = useState("");

  const save = async () => {
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
      <h1 className="font-display text-3xl text-gold-light">Yangi uchrashuv</h1>
      <p className="mt-1 text-sm text-paper-line">Turi: keyingi yoki arxiv</p>
      <div className="mt-6">
        <MeetingForm data={data} onChange={setData} />
      </div>
      <SaveBar error={error} onSave={save} />
    </div>
  );
}
