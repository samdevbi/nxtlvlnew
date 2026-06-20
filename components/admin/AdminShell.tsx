"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/members", label: "A'zolar" },
  { href: "/admin/meetings", label: "Uchrashuvlar" },
  { href: "/admin/books", label: "Kitoblar" },
  { href: "/admin/stats", label: "Statistika" },
  { href: "/admin/applications", label: "Arizalar" },
  { href: "/admin/locales", label: "Matnlar (CMS)" },
  { href: "/admin/settings", label: "Sozlamalar" },
];

export default function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const isLogin = pathname === "/admin/login";

  useEffect(() => {
    if (isLogin) return;
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => setEmail(d.email))
      .catch(() => router.replace("/admin/login"));
  }, [isLogin, router, pathname]);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/admin/login");
  };

  if (isLogin) return <>{children}</>;

  return (
    <div className="flex min-h-screen bg-[#081426] text-paper">
      <aside className="flex w-56 shrink-0 flex-col border-r border-navy-line px-4 py-6">
        <Link href="/admin" className="font-display text-lg text-gold-light">
          NXTLVL Admin
        </Link>
        <nav className="mt-8 flex flex-1 flex-col gap-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                pathname === item.href
                  ? "bg-gold/15 text-gold-light"
                  : "text-paper-line hover:bg-white/5 hover:text-paper"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-navy-line pt-4 text-xs text-paper-line">
          {email && <p className="mb-2 truncate">{email}</p>}
          <button
            type="button"
            onClick={logout}
            className="text-gold-light hover:underline"
          >
            Chiqish
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto p-6 lg:p-8">{children}</main>
    </div>
  );
}
