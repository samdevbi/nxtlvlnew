"use client";

import {
  buildIsoDatetime,
  formatMeetingDateLabel,
  formatMeetingDateLong,
  parseIsoDatetime,
} from "@/lib/admin-form-utils";
import type { LocalizedValue } from "@/components/admin/FormFields";

const inputClass =
  "mt-1 w-full rounded-lg border border-navy-line bg-[#081426] px-3 py-2.5 text-base text-paper sm:text-sm";
const labelClass = "text-xs font-medium uppercase tracking-wider text-paper-line";

type Props = {
  iso: string;
  time: string;
  dateLabel: LocalizedValue;
  dateLong?: LocalizedValue;
  onChange: (patch: {
    iso: string;
    time: string;
    dateLabel: LocalizedValue;
    dateLong?: LocalizedValue;
  }) => void;
  showLongDate?: boolean;
};

export default function AdminDateTimePicker({
  iso,
  time,
  dateLabel,
  dateLong,
  onChange,
  showLongDate,
}: Props) {
  const { date } = parseIsoDatetime(iso);
  const displayDate = date || "";
  const displayTime = time || parseIsoDatetime(iso).time;

  const apply = (nextDate: string, nextTime: string) => {
    const nextIso = buildIsoDatetime(nextDate, nextTime);
    const autoLabelUz = formatMeetingDateLabel(nextDate, "uz");
    const autoLabelEn = formatMeetingDateLabel(nextDate, "en");
    const nextDateLabel: LocalizedValue = {
      uz: dateLabel.uz.trim() && nextDate === displayDate ? dateLabel.uz : autoLabelUz,
      en: dateLabel.en.trim() ? dateLabel.en : autoLabelEn,
    };
    const patch: Parameters<Props["onChange"]>[0] = {
      iso: nextIso,
      time: nextTime,
      dateLabel: nextDateLabel,
    };
    if (showLongDate) {
      patch.dateLong = {
        uz: dateLong?.uz?.trim() && nextDate === displayDate ? dateLong.uz : formatMeetingDateLong(nextDate, "uz"),
        en: dateLong?.en?.trim() ? dateLong.en : formatMeetingDateLong(nextDate, "en"),
      };
    }
    onChange(patch);
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Sana</label>
          <input
            type="date"
            value={displayDate}
            onChange={(e) => apply(e.target.value, displayTime)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Vaqt</label>
          <input
            type="time"
            value={displayTime}
            onChange={(e) => apply(displayDate, e.target.value)}
            className={inputClass}
          />
        </div>
      </div>
      <p className="text-xs text-paper-line/70">
        Countdown va sana matni avtomatik yaratiladi. Quyida kerak bo&apos;lsa tahrirlang.
      </p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Sana matni (UZ)</label>
          <input
            value={dateLabel.uz}
            onChange={(e) => onChange({ iso, time, dateLabel: { ...dateLabel, uz: e.target.value }, dateLong })}
            placeholder="20-iyun, juma"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Sana matni (EN, ixtiyoriy)</label>
          <input
            value={dateLabel.en}
            onChange={(e) => onChange({ iso, time, dateLabel: { ...dateLabel, en: e.target.value }, dateLong })}
            placeholder="June 20, Friday"
            className={inputClass}
          />
        </div>
      </div>
    </div>
  );
}
