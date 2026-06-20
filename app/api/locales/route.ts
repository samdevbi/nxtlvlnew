import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/mongoose";
import { LocaleString } from "@/lib/db/models";
import { jsonOk, localesToNested } from "@/lib/api-utils";

export const revalidate = 60;

export async function GET(req: NextRequest) {
  await connectDB();
  const locale = req.nextUrl.searchParams.get("locale");
  const entries = await LocaleString.find().lean();

  if (locale === "uz" || locale === "en") {
    const nested: Record<string, unknown> = {};
    for (const e of entries) {
      const parts = e.key.split(".");
      let cur: Record<string, unknown> = nested;
      for (let i = 0; i < parts.length - 1; i++) {
        if (!cur[parts[i]]) cur[parts[i]] = {};
        cur = cur[parts[i]] as Record<string, unknown>;
      }
      cur[parts[parts.length - 1]] = locale === "uz" ? e.uz : e.en;
    }
    return jsonOk(nested);
  }

  const { uz, en } = localesToNested(
    entries.map((e) => ({ key: e.key, uz: e.uz, en: e.en }))
  );
  return jsonOk({ uz, en });
}
