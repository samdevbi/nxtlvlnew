import { connectDB } from "@/lib/db/mongoose";
import { Stats } from "@/lib/db/models";
import { jsonOk, jsonError } from "@/lib/api-utils";

export const revalidate = 60;

export async function GET() {
  await connectDB();
  const stats = await Stats.findOne({ singleton: "default" }).lean();
  if (!stats) return jsonError("Not found", 404);
  return jsonOk({
    members: stats.members,
    meetings: stats.meetings,
    sport: stats.sport,
    presentations: stats.presentations,
    membersPeriod: { uz: stats.membersPeriodUz, en: stats.membersPeriodEn },
    period: { uz: stats.periodUz, en: stats.periodEn },
  });
}
