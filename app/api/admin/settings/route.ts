import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/mongoose";
import { SiteSettings } from "@/lib/db/models";
import { jsonOk, revalidatePublic } from "@/lib/api-utils";
import { withAdmin } from "@/lib/admin-api";

export async function GET() {
  return withAdmin(async () => {
    await connectDB();
    const settings = await SiteSettings.findOne({ singleton: "default" }).lean();
    return jsonOk(settings);
  });
}

export async function PUT(req: NextRequest) {
  return withAdmin(async () => {
    const body = await req.json();
    await connectDB();
    const settings = await SiteSettings.findOneAndUpdate(
      { singleton: "default" },
      { $set: { ...body, singleton: "default" } },
      { upsert: true, returnDocument: "after" }
    ).lean();
    revalidatePublic();
    return jsonOk(settings);
  });
}
