import { connectDB } from "@/lib/db/mongoose";
import { SiteSettings } from "@/lib/db/models";
import { jsonOk, jsonError } from "@/lib/api-utils";

export const revalidate = 60;

export async function GET() {
  await connectDB();
  const settings = await SiteSettings.findOne({ singleton: "default" }).lean();
  if (!settings) return jsonError("Not found", 404);
  return jsonOk({
    email: settings.email,
    telegram: settings.telegram,
    instagram: settings.instagram,
    linkedin: settings.linkedin,
    heroDesktopUrl: settings.heroDesktopUrl,
    heroMobileUrl: settings.heroMobileUrl,
  });
}
