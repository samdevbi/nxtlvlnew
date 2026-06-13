"use client";

import Link from "next/link";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import { useApp } from "@/components/providers/AppProviders";
import type { ArchiveMeeting } from "@/lib/meetings";

export default function MeetingCard({ meeting }: { meeting: ArchiveMeeting }) {
  const { t, locale } = useApp();

  return (
    <Link
      href={`/meetings/${meeting.slug}`}
      className="clip-cut group block border border-paper-line bg-paper-card p-3 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/10 dark:border-navy-line dark:border-b-2 dark:border-b-gold dark:bg-navy-card dark:hover:shadow-black/40"
    >
      <div className="relative">
        <PhotoPlaceholder aspect="aspect-[3/1]" silhouette="group" className="rounded-sm" />
        <span className="absolute left-3 top-3 rounded-sm bg-navy-deep/80 px-2 py-1 text-[9px] font-semibold uppercase tracking-[2px] text-gold-light">
          {meeting.dateLabel[locale]}
        </span>
      </div>
      <div className="px-1.5 pb-1.5 pt-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl text-inkc dark:text-paper">
            {meeting.title}
          </h3>
          <span className="font-display text-lg text-paper-line dark:text-navy-line">
            #{meeting.number}
          </span>
        </div>
        <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-[2px] text-gold-ink dark:text-gold-light">
          {t("meetings.speaker")} — {meeting.speaker.shortName}
        </p>
        <div className="mt-1.5 flex items-end justify-between gap-2">
          <p className="text-[13px] text-inkc-sub dark:text-paper-line/80">
            {meeting.summary[locale]}
          </p>
          <svg
            viewBox="0 0 24 24"
            aria-hidden
            className="mb-0.5 h-3.5 w-3.5 shrink-0 text-inkc-sub transition-colors group-hover:text-gold-ink dark:text-paper-line dark:group-hover:text-gold-light"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 17 17 7M9 7h8v8" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
