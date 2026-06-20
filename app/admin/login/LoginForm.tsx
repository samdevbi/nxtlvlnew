"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

type LoginHint = { email: string; password: string };

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const el = document.createElement("textarea");
      el.value = value;
      el.style.position = "fixed";
      el.style.opacity = "0";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      disabled={!value}
      aria-label={label}
      title={copied ? "Nusxa olindi!" : label}
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-navy-line text-paper-line transition-colors hover:border-gold hover:text-gold-light disabled:opacity-40"
    >
      {copied ? (
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-gold-light" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="9" y="9" width="13" height="13" rx="2" />
          <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
        </svg>
      )}
    </button>
  );
}

export default function LoginForm({ hint }: { hint?: LoginHint }) {
  const router = useRouter();
  const [email, setEmail] = useState(hint?.email ?? "");
  const [password, setPassword] = useState(hint?.password ?? "");
  const [showPassword, setShowPassword] = useState(false);
  const [showHintPassword, setShowHintPassword] = useState(false);
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

  const inputClass =
    "min-w-0 flex-1 rounded-lg border border-navy-line bg-[#081426] px-4 py-3 text-base text-paper focus:border-gold focus:outline-none";

  const fillFromHint = () => {
    if (!hint) return;
    setEmail(hint.email);
    setPassword(hint.password);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#081426] px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-navy-line bg-navy-card p-6 sm:p-8"
      >
        <h1 className="font-display text-2xl text-gold-light">Admin kirish</h1>
        <p className="mt-1 text-sm text-paper-line">NXTLVL boshqaruv paneli</p>

        {hint && (
          <div className="mt-5 rounded-xl border border-gold/20 bg-gold/5 p-3">
            <p className="text-xs font-medium uppercase tracking-wider text-gold-light">Kirish ma&apos;lumotlari</p>
            <div className="mt-3 space-y-2">
              <div className="flex items-center gap-2">
                <code className="min-w-0 flex-1 truncate rounded-lg bg-[#081426] px-3 py-2 text-sm text-paper">
                  {hint.email}
                </code>
                <CopyButton value={hint.email} label="Emailni nusxalash" />
              </div>
              <div className="flex items-center gap-2">
                <code className="min-w-0 flex-1 truncate rounded-lg bg-[#081426] px-3 py-2 text-sm text-paper">
                  {showHintPassword ? hint.password : "•".repeat(Math.min(hint.password.length, 16))}
                </code>
                <button
                  type="button"
                  onClick={() => setShowHintPassword((v) => !v)}
                  aria-label={showHintPassword ? "Parolni yashirish" : "Parolni ko'rsatish"}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-navy-line text-paper-line hover:border-gold hover:text-gold-light"
                >
                  {showHintPassword ? (
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 3l18 18M10.5 10.5a3 3 0 004.24 4.24M7.5 7.8C5.6 9.3 4.2 11.2 3 14c2.2 4.4 6 7 9 7 1.5 0 2.9-.5 4.2-1.3M14 5.5C15.2 5.2 16.1 5 17 5c3 0 6.6 2.6 9 7-.8 1.6-1.9 3.1-3.2 4.3" strokeLinecap="round" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
                <CopyButton value={hint.password} label="Parolni nusxalash" />
              </div>
            </div>
            <button
              type="button"
              onClick={fillFromHint}
              className="mt-3 w-full rounded-lg border border-gold/40 py-2 text-xs font-medium text-gold-light hover:bg-gold/10"
            >
              Formaga to&apos;ldirish
            </button>
          </div>
        )}

        <div className="mt-6 space-y-4">
          <div>
            <label className="text-xs text-paper-line">Email</label>
            <div className="mt-1 flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@nxtlvl.uz"
                required
                className={inputClass}
              />
              <CopyButton value={email} label="Emailni nusxalash" />
            </div>
          </div>

          <div>
            <label className="text-xs text-paper-line">Parol</label>
            <div className="mt-1 flex gap-2">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Parol"
                required
                className={inputClass}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Parolni yashirish" : "Parolni ko'rsatish"}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-navy-line text-paper-line hover:border-gold hover:text-gold-light"
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 3l18 18M10.5 10.5a3 3 0 004.24 4.24M7.5 7.8C5.6 9.3 4.2 11.2 3 14c2.2 4.4 6 7 9 7 1.5 0 2.9-.5 4.2-1.3M14 5.5C15.2 5.2 16.1 5 17 5c3 0 6.6 2.6 9 7-.8 1.6-1.9 3.1-3.2 4.3" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
              <CopyButton value={password} label="Parolni nusxalash" />
            </div>
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-gold py-3.5 text-sm font-semibold text-navy-deep hover:bg-gold-light disabled:opacity-50"
          >
            {loading ? "Kirish..." : "Kirish"}
          </button>
        </div>
      </form>
    </div>
  );
}
