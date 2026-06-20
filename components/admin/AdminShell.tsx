"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

const NAV = [
  { href: "/admin", label: "Dashboard", short: "Dash" },
  { href: "/admin/members", label: "A'zolar", short: "A'zo" },
  { href: "/admin/meetings", label: "Uchrashuvlar", short: "Uchr" },
  { href: "/admin/books", label: "Kitoblar", short: "Kitob" },
  { href: "/admin/stats", label: "Statistika", short: "Stat" },
  { href: "/admin/applications", label: "Arizalar", short: "Ariza" },
  { href: "/admin/locales", label: "Matnlar", short: "Matn" },
  { href: "/admin/settings", label: "Sozlamalar", short: "Soz" },
];

function NavLinks({
  pathname,
  onNavigate,
  className = "",
}: {
  pathname: string;
  onNavigate?: () => void;
  className?: string;
}) {
  return (
    <nav className={`flex flex-col gap-1 ${className}`}>
      {NAV.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`rounded-lg px-3 py-2.5 text-sm transition-colors ${
              active
                ? "bg-gold/15 text-gold-light"
                : "text-paper-line hover:bg-white/5 hover:text-paper"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export default function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const isLogin = pathname === "/admin/login";

  useEffect(() => {
    if (isLogin) return;
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => setEmail(d.email))
      .catch(() => router.replace("/admin/login"));
  }, [isLogin, router, pathname]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/admin/login");
  };

  if (isLogin) return <>{children}</>;

  const currentPage = NAV.find((n) => n.href === pathname)?.label ?? "Admin";

  return (
    <div className="flex min-h-screen flex-col bg-[#081426] text-paper lg:flex-row">
      {/* Mobile header */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-navy-line bg-[#081426]/95 px-4 py-3 backdrop-blur lg:hidden">
        <button
          type="button"
          aria-label="Menyu"
          onClick={() => setMenuOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-navy-line text-paper"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
          </svg>
        </button>
        <div className="min-w-0 flex-1 px-3 text-center">
          <p className="truncate text-sm font-semibold text-paper">{currentPage}</p>
          {email && <p className="truncate text-[10px] text-paper-line">{email}</p>}
        </div>
        <button
          type="button"
          onClick={logout}
          className="rounded-lg px-2 py-1.5 text-xs text-gold-light"
        >
          Chiqish
        </button>
      </header>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Yopish"
            className="absolute inset-0 bg-black/60"
            onClick={() => setMenuOpen(false)}
          />
          <aside className="absolute left-0 top-0 flex h-full w-[min(100%,280px)] flex-col border-r border-navy-line bg-[#081426] px-4 py-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <Link href="/admin" className="font-display text-lg text-gold-light" onClick={() => setMenuOpen(false)}>
                NXTLVL Admin
              </Link>
              <button
                type="button"
                aria-label="Yopish"
                onClick={() => setMenuOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-navy-line text-paper-line"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <NavLinks pathname={pathname} onNavigate={() => setMenuOpen(false)} className="mt-6 flex-1 overflow-y-auto" />
            <div className="border-t border-navy-line pt-4 text-xs text-paper-line">
              {email && <p className="mb-2 truncate">{email}</p>}
              <button type="button" onClick={logout} className="text-gold-light hover:underline">
                Chiqish
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden w-56 shrink-0 flex-col border-r border-navy-line px-4 py-6 lg:flex">
        <Link href="/admin" className="font-display text-lg text-gold-light">
          NXTLVL Admin
        </Link>
        <NavLinks pathname={pathname} className="mt-8 flex-1" />
        <div className="border-t border-navy-line pt-4 text-xs text-paper-line">
          {email && <p className="mb-2 truncate">{email}</p>}
          <button type="button" onClick={logout} className="text-gold-light hover:underline">
            Chiqish
          </button>
        </div>
      </aside>

      <main className="min-w-0 flex-1 overflow-x-hidden px-4 py-4 pb-24 sm:px-6 sm:py-6 sm:pb-8 lg:p-8">
        {children}
      </main>
    </div>
  );
}
