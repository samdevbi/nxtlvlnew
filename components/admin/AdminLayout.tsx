import type { ReactNode } from "react";
import Link from "next/link";

export function AdminBackLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="mb-4 inline-flex min-h-[40px] items-center gap-1 text-sm text-paper-line hover:text-gold-light"
    >
      <span aria-hidden>←</span> {children}
    </Link>
  );
}

export function AdminPageHeader({
  title,
  actionHref,
  actionLabel = "+ Yangi",
}: {
  title: string;
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h1 className="font-display text-2xl text-gold-light sm:text-3xl">{title}</h1>
      {actionHref && (
        <Link
          href={actionHref}
          className="inline-flex w-full items-center justify-center rounded-lg bg-gold px-4 py-2.5 text-sm font-semibold text-navy-deep sm:w-auto"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}

export function AdminListRow({
  children,
  actions,
}: {
  children: ReactNode;
  actions: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-navy-line bg-navy-card px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0 flex-1">{children}</div>
      <div className="flex shrink-0 flex-wrap gap-2 border-t border-navy-line/60 pt-3 sm:gap-3 sm:border-0 sm:pt-0">
        {actions}
      </div>
    </div>
  );
}

export function AdminActionLink({
  href,
  children,
  variant = "default",
}: {
  href: string;
  children: ReactNode;
  variant?: "default" | "danger";
}) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-[40px] items-center rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
        variant === "danger"
          ? "border-red-400/30 text-red-400 hover:bg-red-400/10"
          : "border-gold/30 text-gold-light hover:bg-gold/10"
      }`}
    >
      {children}
    </Link>
  );
}

export function AdminActionButton({
  children,
  onClick,
  variant = "danger",
}: {
  children: ReactNode;
  onClick: () => void;
  variant?: "default" | "danger";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex min-h-[40px] items-center rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
        variant === "danger"
          ? "border-red-400/30 text-red-400 hover:bg-red-400/10"
          : "border-gold/30 text-gold-light hover:bg-gold/10"
      }`}
    >
      {children}
    </button>
  );
}
