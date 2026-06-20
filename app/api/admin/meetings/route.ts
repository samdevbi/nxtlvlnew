import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/mongoose";
import { Meeting } from "@/lib/db/models";
import { jsonOk, jsonError, revalidatePublic } from "@/lib/api-utils";
import { withAdmin } from "@/lib/admin-api";

export async function GET(req: NextRequest) {
  return withAdmin(async () => {
    await connectDB();
    const type = req.nextUrl.searchParams.get("type");
    const filter = type ? { type } : {};
    const meetings = await Meeting.find(filter).sort({ number: -1 }).lean();
    return jsonOk(meetings);
  });
}

export async function POST(req: NextRequest) {
  return withAdmin(async () => {
    const body = await req.json();
    if (!body.slug || !body.type) return jsonError("slug va type kerak", 400);
    await connectDB();
    if (body.type === "next") {
      await Meeting.updateMany({ type: "next" }, { $set: { type: "archive" } });
    }
    const meeting = await Meeting.create(body);
    revalidatePublic();
    return jsonOk(meeting, 201);
  });
}
