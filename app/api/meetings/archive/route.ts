import { connectDB } from "@/lib/db/mongoose";
import { Meeting } from "@/lib/db/models";
import { jsonOk } from "@/lib/api-utils";

export const revalidate = 60;

export async function GET() {
  await connectDB();
  const meetings = await Meeting.find({ type: "archive" }).sort({ number: -1 }).lean();
  return jsonOk(
    meetings.map(({ type: _t, ...m }) => m)
  );
}
