import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/mongoose";
import { Member } from "@/lib/db/models";
import { jsonOk, jsonError, revalidatePublic } from "@/lib/api-utils";
import { withAdmin } from "@/lib/admin-api";

export async function GET() {
  return withAdmin(async () => {
    await connectDB();
    const members = await Member.find().sort({ name: 1 }).lean();
    return jsonOk(members);
  });
}

export async function POST(req: NextRequest) {
  return withAdmin(async () => {
    const body = await req.json();
    if (!body.slug || !body.name) return jsonError("slug va name kerak", 400);
    await connectDB();
    const exists = await Member.findOne({ slug: body.slug });
    if (exists) return jsonError("Slug mavjud", 409);
    const member = await Member.create(body);
    revalidatePublic();
    return jsonOk(member, 201);
  });
}
