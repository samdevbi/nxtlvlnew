import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/mongoose";
import { Stats } from "@/lib/db/models";
import { jsonOk, revalidatePublic } from "@/lib/api-utils";
import { withAdmin } from "@/lib/admin-api";

export async function GET() {
  return withAdmin(async () => {
    await connectDB();
    const stats = await Stats.findOne({ singleton: "default" }).lean();
    return jsonOk(stats);
  });
}

export async function PUT(req: NextRequest) {
  return withAdmin(async () => {
    const body = await req.json();
    await connectDB();
    const stats = await Stats.findOneAndUpdate(
      { singleton: "default" },
      { $set: { ...body, singleton: "default" } },
      { upsert: true, returnDocument: "after" }
    ).lean();
    revalidatePublic();
    return jsonOk(stats);
  });
}
