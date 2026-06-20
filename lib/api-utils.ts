import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export function jsonOk<T>(data: T, status = 200) {
  return NextResponse.json(data, { status });
}

export function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export function revalidatePublic() {
  revalidatePath("/");
  revalidatePath("/members");
  revalidatePath("/meetings");
  revalidatePath("/activities");
  revalidatePath("/about");
  revalidatePath("/join");
}

export function localesToNested(
  entries: { key: string; uz: string; en: string }[]
): { uz: Record<string, unknown>; en: Record<string, unknown> } {
  const uz: Record<string, unknown> = {};
  const en: Record<string, unknown> = {};

  for (const { key, uz: uzVal, en: enVal } of entries) {
    const parts = key.split(".");
    let uzCur: Record<string, unknown> = uz;
    let enCur: Record<string, unknown> = en;

    for (let i = 0; i < parts.length - 1; i++) {
      const p = parts[i];
      if (!uzCur[p]) uzCur[p] = {};
      if (!enCur[p]) enCur[p] = {};
      uzCur = uzCur[p] as Record<string, unknown>;
      enCur = enCur[p] as Record<string, unknown>;
    }

    const last = parts[parts.length - 1];
    uzCur[last] = uzVal;
    enCur[last] = enVal;
  }

  return { uz, en };
}

export function flattenLocales(
  uzObj: Record<string, unknown>,
  enObj: Record<string, unknown>,
  prefix = ""
): { key: string; uz: string; en: string }[] {
  const result: { key: string; uz: string; en: string }[] = [];

  for (const key of Object.keys(uzObj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    const uzVal = uzObj[key];
    const enVal = enObj[key];

    if (
      typeof uzVal === "object" &&
      uzVal !== null &&
      !Array.isArray(uzVal) &&
      typeof enVal === "object" &&
      enVal !== null
    ) {
      result.push(
        ...flattenLocales(
          uzVal as Record<string, unknown>,
          enVal as Record<string, unknown>,
          fullKey
        )
      );
    } else if (typeof uzVal === "string" && typeof enVal === "string") {
      result.push({ key: fullKey, uz: uzVal, en: enVal });
    }
  }

  return result;
}
