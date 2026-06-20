"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      router.replace("/admin");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || "Xato");
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#081426] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-navy-line bg-navy-card p-8"
      >
        <h1 className="font-display text-2xl text-gold-light">Admin kirish</h1>
        <p className="mt-1 text-sm text-paper-line">NXTLVL boshqaruv paneli</p>
        <div className="mt-6 space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full rounded-lg border border-navy-line bg-[#081426] px-4 py-3 text-sm text-paper focus:border-gold focus:outline-none"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Parol"
            required
            className="w-full rounded-lg border border-navy-line bg-[#081426] px-4 py-3 text-sm text-paper focus:border-gold focus:outline-none"
          />
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-gold py-3 text-sm font-semibold text-navy-deep hover:bg-gold-light disabled:opacity-50"
          >
            {loading ? "Kirish..." : "Kirish"}
          </button>
        </div>
      </form>
    </div>
  );
}
