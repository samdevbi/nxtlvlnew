import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { Admin } from "@/lib/db/models";
import { connectDB } from "@/lib/db/mongoose";

const COOKIE_NAME = "nxtlvl_admin_token";
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";

function cookieSecure(): boolean {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  if (siteUrl.startsWith("https://")) return true;
  if (process.env.COOKIE_SECURE === "true") return true;
  return false;
}

export interface AdminPayload {
  adminId: string;
  email: string;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function signToken(payload: AdminPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): AdminPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AdminPayload;
  } catch {
    return null;
  }
}

export function setAuthCookie(token: string): void {
  const secure = cookieSecure();
  // #region agent log
  fetch("http://127.0.0.1:7793/ingest/dadbd1c7-7069-4b26-b7fc-f993d02028f8", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "0951d4" },
    body: JSON.stringify({
      sessionId: "0951d4",
      runId: "post-fix",
      hypothesisId: "A",
      location: "lib/auth.ts:setAuthCookie",
      message: "setting auth cookie",
      data: { secure, siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "", nodeEnv: process.env.NODE_ENV },
      timestamp: Date.now(),
    }),
  }).catch(() => {});
  // #endregion
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export function clearAuthCookie(): void {
  cookies().set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: cookieSecure(),
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export async function getAdminFromCookie(): Promise<AdminPayload | null> {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function requireAdmin(): Promise<AdminPayload> {
  const payload = await getAdminFromCookie();
  if (!payload) {
    throw new Error("UNAUTHORIZED");
  }
  await connectDB();
  const admin = await Admin.findById(payload.adminId);
  if (!admin) {
    throw new Error("UNAUTHORIZED");
  }
  return payload;
}

export async function authenticateAdmin(
  email: string,
  password: string
): Promise<{ token: string; email: string } | null> {
  await connectDB();
  const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
  if (!admin) return null;
  const valid = await verifyPassword(password, admin.passwordHash);
  if (!valid) return null;
  const token = signToken({ adminId: admin._id.toString(), email: admin.email });
  return { token, email: admin.email };
}
