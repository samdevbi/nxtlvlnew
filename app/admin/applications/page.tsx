"use client";

import { useEffect, useState } from "react";

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

  useEffect(() => {
    fetch("/api/admin/applications").then((r) => r.json()).then(setApps);
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
      <h1 className="font-display text-3xl text-gold-light">Arizalar</h1>
      <div className="mt-6 space-y-3">
        {apps.map((a) => (
          <div key={a._id} className="rounded-lg border border-navy-line bg-navy-card p-4">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="font-semibold">{a.name}</p>
                <p className="text-sm text-paper-line">{a.phone} {a.telegram && `· ${a.telegram}`}</p>
                {a.profession && <p className="text-xs text-paper-line">{a.profession}</p>}
                {a.reason && <p className="mt-2 text-sm">{a.reason}</p>}
              </div>
              <select
                value={a.status}
                onChange={(e) => updateStatus(a._id, e.target.value)}
                className="rounded border border-navy-line bg-[#081426] px-2 py-1 text-sm text-paper"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
        ))}
        {apps.length === 0 && <p className="text-paper-line">Arizalar yo&apos;q</p>}
      </div>
    </div>
  );
}
