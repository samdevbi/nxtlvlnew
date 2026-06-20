import { NextRequest } from "next/server";
import { uploadImage, isCloudinaryConfigured } from "@/lib/cloudinary";
import { jsonOk, jsonError } from "@/lib/api-utils";
import { withAdmin } from "@/lib/admin-api";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  return withAdmin(async () => {
    if (!isCloudinaryConfigured()) {
      return jsonError("Cloudinary sozlanmagan. CLOUDINARY_* env qo'shing.", 503);
    }
    const form = await req.formData();
    const file = form.get("file") as File | null;
    const folder = (form.get("folder") as string) || "misc";
    if (!file) return jsonError("file kerak", 400);

    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await uploadImage(buffer, folder, file.name.replace(/\.[^.]+$/, ""));
    return jsonOk(result);
  });
}
