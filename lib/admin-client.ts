export async function adminFetch<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(typeof data?.error === "string" ? data.error : "So'rov xatosi");
  }
  return data as T;
}

export function ensureArray<T>(data: unknown, label: string): T[] {
  if (Array.isArray(data)) return data;
  throw new Error(`${label} yuklanmadi`);
}

export function emptyLocalized() {
  return { uz: "", en: "" };
}

export function normalizeLocalized(value?: { uz?: string; en?: string } | null) {
  return { uz: value?.uz ?? "", en: value?.en ?? "" };
}

export function stripEmptyStrings(items: string[]) {
  return items.map((s) => s.trim()).filter(Boolean);
}
