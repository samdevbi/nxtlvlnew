const DEFAULT_TZ = "+09:00";

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[''`]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function shortNameFromFull(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length <= 1) return name.trim();
  return parts[0];
}

export function meetingTimezone(): string {
  return process.env.MEETING_TIMEZONE || DEFAULT_TZ;
}

export function buildIsoDatetime(date: string, time: string, tz = meetingTimezone()): string {
  if (!date || !time) return "";
  const [h, m] = time.split(":");
  const hh = h?.padStart(2, "0") ?? "00";
  const mm = m?.padStart(2, "0") ?? "00";
  return `${date}T${hh}:${mm}:00${tz}`;
}

export function parseIsoDatetime(iso: string): { date: string; time: string } {
  if (!iso) return { date: "", time: "" };
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return { date: "", time: "" };
  const date = d.toISOString().slice(0, 10);
  const time = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  return { date, time };
}

export function formatMeetingDateLabel(dateStr: string, locale: "uz" | "en"): string {
  if (!dateStr) return "";
  const d = new Date(`${dateStr}T12:00:00`);
  if (Number.isNaN(d.getTime())) return "";
  const tag = locale === "uz" ? "uz-UZ" : "en-US";
  return new Intl.DateTimeFormat(tag, {
    day: "numeric",
    month: "long",
    weekday: "long",
  }).format(d);
}

export function formatMeetingDateLong(dateStr: string, locale: "uz" | "en"): string {
  if (!dateStr) return "";
  const d = new Date(`${dateStr}T12:00:00`);
  if (Number.isNaN(d.getTime())) return "";
  const tag = locale === "uz" ? "uz-UZ" : "en-US";
  return new Intl.DateTimeFormat(tag, {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(d);
}

export function buildTimeRange(time: string, endTime?: string): string {
  if (!time) return "";
  if (endTime?.trim()) return `${time} — ${endTime}`;
  return time;
}
