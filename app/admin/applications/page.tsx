"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/admin-client";

type App = {
  _id: string;
  name: string;
  phone: string;
  telegram?: string;
  profession?: string;
  reason?: string;
  status: string;
  createdAt: string;
};

const STATUSES = ["new", "reviewed", "accepted", "rejected"];

export default function AdminApplicationsPage() {
  const [apps, setApps] = useState<App[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    adminFetch<App[]>("/api/admin/applications")
      .then(setApps)
      .catch((e) => {
        setError(e instanceof Error ? e.message : "Yuklash xatosi");
        setApps([]);
      });
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await fetch("/api/admin/applications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setApps((a) => a.map((x) => (x._id === id ? { ...x, status } : x)));
  };

  return (
    <div>
      <h1 className="font-display text-2xl text-gold-light sm:text-3xl">Arizalar</h1>
      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
      <div className="mt-6 space-y-3">
        {apps.map((a) => (
          <div key={a._id} className="rounded-xl border border-navy-line bg-navy-card p-4">
            <div className="flex flex-col gap-3">
              <div className="min-w-0">
                <p className="font-semibold">{a.name}</p>
                <p className="mt-1 text-sm text-paper-line">
                  {a.phone} {a.telegram && `· ${a.telegram}`}
                </p>
                {a.profession && <p className="mt-1 text-xs text-paper-line">{a.profession}</p>}
                {a.reason && <p className="mt-2 text-sm leading-relaxed">{a.reason}</p>}
              </div>
              <select
                value={a.status}
                onChange={(e) => updateStatus(a._id, e.target.value)}
                className="w-full rounded-lg border border-navy-line bg-[#081426] px-3 py-2.5 text-base text-paper sm:max-w-xs sm:text-sm"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
        {!error && apps.length === 0 && <p className="text-paper-line">Arizalar yo&apos;q</p>}
      </div>
    </div>
  );
}
