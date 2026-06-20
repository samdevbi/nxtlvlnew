"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AdminBackLink } from "@/components/admin/AdminLayout";
import { SaveBar } from "@/components/admin/FormFields";
import MemberForm, { emptyMemberForm, memberToApi, type MemberFormData } from "@/components/admin/MemberForm";
import { adminFetch } from "@/lib/admin-client";

export default function NewMemberPage() {
  const router = useRouter();
  const [data, setData] = useState<MemberFormData>(emptyMemberForm);
  const [error, setError] = useState("");

  const save = async () => {
    try {
      await adminFetch("/api/admin/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(memberToApi(data)),
      });
      router.push("/admin/members");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Xato");
    }
  };

  return (
    <div>
      <AdminBackLink href="/admin/members">A&apos;zolar ro&apos;yxati</AdminBackLink>
      <h1 className="font-display text-2xl text-gold-light sm:text-3xl">Yangi a&apos;zo</h1>
      <div className="mt-6">
        <MemberForm data={data} onChange={setData} />
      </div>
      <SaveBar error={error} onSave={save} />
    </div>
  );
}
