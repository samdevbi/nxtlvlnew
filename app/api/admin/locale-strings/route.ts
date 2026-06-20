import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/mongoose";
import { LocaleString } from "@/lib/db/models";
import { jsonOk, jsonError, revalidatePublic } from "@/lib/api-utils";
import { withAdmin } from "@/lib/admin-api";

export async function GET(req: NextRequest) {
  return withAdmin(async () => {
    await connectDB();
    const section = req.nextUrl.searchParams.get("section");
    const filter = section ? { key: new RegExp(`^${section}\\.`) } : {};
    const strings = await LocaleString.find(filter).sort({ key: 1 }).lean();
    return jsonOk(strings);
  });
}

export async function PUT(req: NextRequest) {
  return withAdmin(async () => {
    const { key, uz, en } = await req.json();
    if (!key) return jsonError("key kerak", 400);
    await connectDB();
    const str = await LocaleString.findOneAndUpdate(
      { key },
      { $set: { uz, en } },
      { upsert: true, returnDocument: "after" }
    ).lean();
    revalidatePublic();
    return jsonOk(str);
  });
}

export async function POST(req: NextRequest) {
  return withAdmin(async () => {
    const { items } = await req.json();
    if (!Array.isArray(items)) return jsonError("items array kerak", 400);
    await connectDB();
    for (const item of items) {
      await LocaleString.findOneAndUpdate(
        { key: item.key },
        { $set: { uz: item.uz, en: item.en } },
        { upsert: true }
      );
    }
    revalidatePublic();
    return jsonOk({ count: items.length });
  });
}
