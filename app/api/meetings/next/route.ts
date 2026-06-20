import { connectDB } from "@/lib/db/mongoose";
import { Meeting } from "@/lib/db/models";
import { jsonOk, jsonError } from "@/lib/api-utils";

export const revalidate = 60;

export async function GET() {
  await connectDB();
  const meeting = await Meeting.findOne({ type: "next" }).lean();
  if (!meeting) return jsonError("Not found", 404);
  const { type: _t, ...data } = meeting;
  return jsonOk(data);
}
