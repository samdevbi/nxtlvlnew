"use client";

import type { ReactNode } from "react";

const inputClass =
  "mt-1 w-full rounded-lg border border-navy-line bg-[#081426] px-3 py-2.5 text-base text-paper sm:text-sm";
const labelClass = "text-xs font-medium uppercase tracking-wider text-paper-line";

export function AdminSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-6 rounded-xl border border-navy-line bg-navy-card/40 p-3 sm:mt-8 sm:p-4">
      <h2 className="font-display text-lg text-gold-light">{title}</h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

export function AdminField({
  label,
  value,
  onChange,
  type = "text",
  readOnly,
  hint,
}: {
  label: string;
  value: string | number;
  onChange: (v: string) => void;
  type?: string;
  readOnly?: boolean;
  hint?: string;
}) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <input
        type={type}
        value={value}
        readOnly={readOnly}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputClass}${readOnly ? " opacity-60" : ""}`}
      />
      {hint && <p className="mt-1 text-xs text-paper-line/70">{hint}</p>}
    </div>
  );
}

export function AdminTextarea({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className={inputClass}
      />
    </div>
  );
}

export function AdminSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} className={inputClass}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export type LocalizedValue = { uz: string; en: string };

export function LocalizedFieldPrimary({
  label,
  value,
  onChange,
  multiline,
}: {
  label: string;
  value: LocalizedValue;
  onChange: (v: LocalizedValue) => void;
  multiline?: boolean;
}) {
  const Input = multiline ? AdminTextarea : AdminField;
  return (
    <div>
      {label ? <p className={labelClass}>{label}</p> : null}
      <div className={label ? "mt-2 space-y-3" : "space-y-3"}>
        <Input
          label="O'zbekcha"
          value={value.uz}
          onChange={(uz) => onChange({ ...value, uz })}
        />
        <details className="rounded-lg border border-navy-line/50 bg-[#081426]/40 px-3 py-2">
          <summary className="cursor-pointer text-xs text-paper-line hover:text-gold-light">
            Inglizcha (ixtiyoriy)
          </summary>
          <div className="pt-2">
            <Input
              label=""
              value={value.en}
              onChange={(en) => onChange({ ...value, en })}
            />
          </div>
        </details>
      </div>
    </div>
  );
}

export function LocalizedField({
  label,
  value,
  onChange,
  multiline,
}: {
  label: string;
  value: LocalizedValue;
  onChange: (v: LocalizedValue) => void;
  multiline?: boolean;
}) {
  return (
    <div>
      {label ? <p className={labelClass}>{label}</p> : null}
      <div className={`grid grid-cols-1 gap-3 sm:grid-cols-2${label ? " mt-2" : ""}`}>
        {multiline ? (
          <>
            <AdminTextarea label="O'zbekcha" value={value.uz} onChange={(uz) => onChange({ ...value, uz })} />
            <AdminTextarea label="Inglizcha" value={value.en} onChange={(en) => onChange({ ...value, en })} />
          </>
        ) : (
          <>
            <AdminField label="O'zbekcha" value={value.uz} onChange={(uz) => onChange({ ...value, uz })} />
            <AdminField label="Inglizcha" value={value.en} onChange={(en) => onChange({ ...value, en })} />
          </>
        )}
      </div>
    </div>
  );
}

export function StringListEditor({
  label,
  items,
  onChange,
  placeholder = "Qiymat",
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
}) {
  const update = (index: number, value: string) => {
    onChange(items.map((item, i) => (i === index ? value : item)));
  };

  return (
    <div>
      <p className={labelClass}>{label}</p>
      <div className="mt-2 space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex flex-col gap-2 sm:flex-row">
            <input
              value={item}
              onChange={(e) => update(i, e.target.value)}
              placeholder={placeholder}
              className={`${inputClass} mt-0`}
            />
            <button
              type="button"
              onClick={() => onChange(items.filter((_, idx) => idx !== i))}
              className="shrink-0 rounded-lg border border-red-400/40 px-3 py-2.5 text-xs text-red-300 sm:py-1"
            >
              O&apos;chir
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...items, ""])}
          className="rounded-lg border border-navy-line px-3 py-1.5 text-xs text-gold-light hover:border-gold"
        >
          + Qo&apos;shish
        </button>
      </div>
    </div>
  );
}

export function LocalizedListEditor({
  label,
  items,
  onChange,
  primaryOnly,
}: {
  label: string;
  items: LocalizedValue[];
  onChange: (items: LocalizedValue[]) => void;
  primaryOnly?: boolean;
}) {
  const update = (index: number, value: LocalizedValue) => {
    onChange(items.map((item, i) => (i === index ? value : item)));
  };

  const Field = primaryOnly ? LocalizedFieldPrimary : LocalizedField;

  return (
    <div>
      <p className={labelClass}>{label}</p>
      <div className="mt-2 space-y-3">
        {items.map((item, i) => (
          <div key={i} className="rounded-lg border border-navy-line/60 p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs text-paper-line">#{i + 1}</span>
              <button
                type="button"
                onClick={() => onChange(items.filter((_, idx) => idx !== i))}
                className="text-xs text-red-300"
              >
                O&apos;chir
              </button>
            </div>
            <Field label="" value={item} onChange={(v) => update(i, v)} multiline />
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...items, { uz: "", en: "" }])}
          className="rounded-lg border border-navy-line px-3 py-1.5 text-xs text-gold-light hover:border-gold"
        >
          + Qo&apos;shish
        </button>
      </div>
    </div>
  );
}

export function SaveBar({
  error,
  message,
  onSave,
  label = "Saqlash",
}: {
  error?: string;
  message?: string;
  onSave: () => void;
  label?: string;
}) {
  return (
    <div className="sticky bottom-0 -mx-4 mt-8 border-t border-navy-line bg-[#081426]/95 px-4 py-4 backdrop-blur sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:backdrop-blur-none">
      {error && <p className="mb-2 text-sm text-red-400">{error}</p>}
      {message && <p className="mb-2 text-sm text-gold-light">{message}</p>}
      <button
        type="button"
        onClick={onSave}
        className="w-full rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-navy-deep sm:w-auto sm:py-2"
      >
        {label}
      </button>
    </div>
  );
}
