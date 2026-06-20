import { clearAuthCookie } from "@/lib/auth";
import { jsonOk } from "@/lib/api-utils";

export const dynamic = "force-dynamic";

export async function POST() {
  clearAuthCookie();
  return jsonOk({ ok: true });
}
