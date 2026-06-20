export type LocalizedText = { uz: string; en?: string };

export function pickLocalized(
  text: { uz?: string; en?: string } | null | undefined,
  locale: "uz" | "en"
): string {
  if (!text) return "";
  const primary = text.uz?.trim() ?? "";
  const secondary = text.en?.trim() ?? "";
  if (locale === "uz") return primary || secondary;
  return secondary || primary;
}

export function normalizeLocalizedPrimary(value?: { uz?: string; en?: string } | null) {
  const uz = value?.uz?.trim() ?? "";
  const en = value?.en?.trim() ?? "";
  return { uz, en: en || uz };
}

export function isLocalizedEmpty(value?: { uz?: string; en?: string } | null) {
  return !(value?.uz?.trim() || value?.en?.trim());
}
