import { getAdminFromCookie } from "@/lib/auth";
import { jsonOk, jsonError } from "@/lib/api-utils";

export async function GET() {
  const admin = await getAdminFromCookie();
  if (!admin) return jsonError("Unauthorized", 401);
  return jsonOk({ email: admin.email });
}
