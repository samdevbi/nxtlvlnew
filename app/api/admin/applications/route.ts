import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/mongoose";
import { Application } from "@/lib/db/models";
import { jsonOk, jsonError, revalidatePublic } from "@/lib/api-utils";
import { withAdmin } from "@/lib/admin-api";

export async function GET() {
  return withAdmin(async () => {
    await connectDB();
    const apps = await Application.find().sort({ createdAt: -1 }).lean();
    return jsonOk(apps);
  });
}

export async function PATCH(req: NextRequest) {
  return withAdmin(async () => {
    const { id, status } = await req.json();
    if (!id || !status) return jsonError("id va status kerak", 400);
    await connectDB();
    const app = await Application.findByIdAndUpdate(
      id,
      { $set: { status } },
      { returnDocument: "after" }
    ).lean();
    if (!app) return jsonError("Not found", 404);
    revalidatePublic();
    return jsonOk(app);
  });
}
