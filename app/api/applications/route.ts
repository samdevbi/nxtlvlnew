import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/mongoose";
import { Application } from "@/lib/db/models";
import { jsonOk, jsonError } from "@/lib/api-utils";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, telegram, profession, reason } = body;
    if (!name?.trim() || !phone?.trim()) {
      return jsonError("Ism va telefon majburiy", 400);
    }
    await connectDB();
    const app = await Application.create({
      name: name.trim(),
      phone: phone.trim(),
      telegram: telegram?.trim(),
      profession: profession?.trim(),
      reason: reason?.trim(),
      status: "new",
    });
    return jsonOk({ id: app._id.toString(), status: "new" }, 201);
  } catch {
    return jsonError("Server xatosi", 500);
  }
}
