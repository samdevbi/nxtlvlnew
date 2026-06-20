"use client";

import { useEffect, useState } from "react";
import { useApp } from "@/components/providers/AppProviders";

interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function diffParts(target: number): CountdownParts {
  const total = Math.max(0, target - Date.now());
  return {
    days: Math.floor(total / 86_400_000),
    hours: Math.floor(total / 3_600_000) % 24,
    minutes: Math.floor(total / 60_000) % 60,
    seconds: Math.floor(total / 1_000) % 60,
  };
}

/** Keyingi meetinggacha real vaqtda sanovchi countdown */
export default function Countdown({
  iso,
  className = "",
}: {
  iso: string;
  className?: string;
}) {
  const { t } = useApp();
  // Hydration mismatch bo'lmasligi uchun birinchi renderda bo'sh holat
  const [parts, setParts] = useState<CountdownParts | null>(null);

  useEffect(() => {
    const target = new Date(iso).getTime();
    setParts(diffParts(target));
    const interval = setInterval(() => setParts(diffParts(target)), 1000);
    return () => clearInterval(interval);
  }, [iso]);

  const cells: { value: string; key: string }[] = [
    { value: String(parts?.days ?? 0).padStart(2, "0"), key: "meetings.countdown.days" },
    { value: String(parts?.hours ?? 0).padStart(2, "0"), key: "meetings.countdown.hours" },
    { value: String(parts?.minutes ?? 0).padStart(2, "0"), key: "meetings.countdown.minutes" },
    { value: String(parts?.seconds ?? 0).padStart(2, "0"), key: "meetings.countdown.seconds" },
  ];

  return (
    <div className={`grid grid-cols-4 gap-2.5 ${className}`}>
      {cells.map((cell) => (
        <div
          key={cell.key}
          className="flex flex-col items-center gap-1.5 rounded-md border border-navy-line bg-navy-deep/40 px-2 py-3"
        >
          <span
            className={`font-display text-2xl leading-none text-gold-light md:text-3xl ${
              parts ? "" : "opacity-40"
            }`}
          >
            {cell.value}
          </span>
          <span className="text-micro font-semibold uppercase tracking-[2px] text-paper-line/70">
            {t(cell.key)}
          </span>
        </div>
      ))}
    </div>
  );
}
