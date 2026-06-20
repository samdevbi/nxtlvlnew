import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/mongoose";
import { Meeting } from "@/lib/db/models";
import { jsonOk, jsonError, revalidatePublic } from "@/lib/api-utils";
import { withAdmin } from "@/lib/admin-api";

export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: { slug: string } }) {
  return withAdmin(async () => {
    await connectDB();
    const meeting = await Meeting.findOne({ slug: params.slug }).lean();
    if (!meeting) return jsonError("Not found", 404);
    return jsonOk(meeting);
  });
}

export async function PUT(req: NextRequest, { params }: { params: { slug: string } }) {
  return withAdmin(async () => {
    const body = await req.json();
    await connectDB();
    if (body.type === "next") {
      await Meeting.updateMany({ type: "next", slug: { $ne: params.slug } }, { $set: { type: "archive" } });
    }
    const meeting = await Meeting.findOneAndUpdate(
      { slug: params.slug },
      { $set: body },
      { returnDocument: "after" }
    ).lean();
    if (!meeting) return jsonError("Not found", 404);
    revalidatePublic();
    return jsonOk(meeting);
  });
}

export async function DELETE(_req: Request, { params }: { params: { slug: string } }) {
  return withAdmin(async () => {
    await connectDB();
    await Meeting.deleteOne({ slug: params.slug });
    revalidatePublic();
    return jsonOk({ ok: true });
  });
}
