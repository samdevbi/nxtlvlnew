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
    // #region agent log
    fetch("http://127.0.0.1:7793/ingest/dadbd1c7-7069-4b26-b7fc-f993d02028f8", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "0951d4" },
      body: JSON.stringify({
        sessionId: "0951d4",
        runId: "pre-fix",
        hypothesisId: "C",
        location: "lib/admin-api.ts:withAdmin",
        message: "admin handler error",
        data: { error: e instanceof Error ? e.message : "unknown" },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    // #endregion
    if (e instanceof Error && e.message === "UNAUTHORIZED") {
      return adminUnauthorized();
    }
    const message = e instanceof Error ? e.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
