import { NextRequest } from "next/server";
import { authenticateAdmin, setAuthCookie } from "@/lib/auth";
import { jsonOk, jsonError } from "@/lib/api-utils";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return jsonError("Email va parol kerak", 400);
    }
    const result = await authenticateAdmin(email, password);
    if (!result) {
      return jsonError("Email yoki parol noto'g'ri", 401);
    }
    setAuthCookie(result.token);
    return jsonOk({ email: result.email });
  } catch {
    return jsonError("Server xatosi", 500);
  }
}
