import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/mongoose";
import { Member } from "@/lib/db/models";
import { jsonOk, jsonError, revalidatePublic } from "@/lib/api-utils";
import { withAdmin } from "@/lib/admin-api";

export async function GET(_req: Request, { params }: { params: { slug: string } }) {
  return withAdmin(async () => {
    await connectDB();
    const member = await Member.findOne({ slug: params.slug }).lean();
    if (!member) return jsonError("Not found", 404);
    return jsonOk(member);
  });
}

export async function PUT(req: NextRequest, { params }: { params: { slug: string } }) {
  return withAdmin(async () => {
    const body = await req.json();
    await connectDB();
    const member = await Member.findOneAndUpdate(
      { slug: params.slug },
      { $set: body },
      { returnDocument: "after" }
    ).lean();
    if (!member) return jsonError("Not found", 404);
    revalidatePublic();
    return jsonOk(member);
  });
}

export async function DELETE(_req: Request, { params }: { params: { slug: string } }) {
  return withAdmin(async () => {
    await connectDB();
    await Member.deleteOne({ slug: params.slug });
    revalidatePublic();
    return jsonOk({ ok: true });
  });
}
