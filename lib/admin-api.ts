import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";

export function adminUnauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function withAdmin(
  handler: () => Promise<NextResponse>
): Promise<NextResponse> {
  try {
    await requireAdmin();
    return await handler();
  } catch (e) {
    if (e instanceof Error && e.message === "UNAUTHORIZED") {
      return adminUnauthorized();
    }
    const message = e instanceof Error ? e.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
