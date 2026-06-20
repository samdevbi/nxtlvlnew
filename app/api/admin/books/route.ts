import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/mongoose";
import { Books } from "@/lib/db/models";
import { jsonOk, revalidatePublic } from "@/lib/api-utils";
import { withAdmin } from "@/lib/admin-api";

export const dynamic = "force-dynamic";

export async function GET() {
  return withAdmin(async () => {
    await connectDB();
    const books = await Books.findOne({ singleton: "default" }).lean();
    return jsonOk(books);
  });
}

export async function PUT(req: NextRequest) {
  return withAdmin(async () => {
    const body = await req.json();
    await connectDB();
    const books = await Books.findOneAndUpdate(
      { singleton: "default" },
      { $set: { ...body, singleton: "default" } },
      { upsert: true, returnDocument: "after" }
    ).lean();
    revalidatePublic();
    return jsonOk(books);
  });
}
