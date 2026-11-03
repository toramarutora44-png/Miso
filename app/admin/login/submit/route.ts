import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_SESSION_COOKIE, createSessionToken } from "@/lib/admin/session";
import { clearAttempts, isLocked, recordFailure } from "@/lib/admin/rateLimit";

export const runtime = "nodejs";

function getRequestIp(request: NextRequest): string {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: NextRequest) {
  const ip = getRequestIp(request);
  const url = request.nextUrl.clone();

  if (isLocked(ip)) {
    url.pathname = "/admin/login";
    url.search = "?error=locked";
    return NextResponse.redirect(url, 302);
  }

  const formData = await request.formData();
  const password = String(formData.get("password") ?? "");
  const expected = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!expected || !secret || password !== expected) {
    recordFailure(ip);
    url.pathname = "/admin/login";
    url.search = "?error=invalid";
    return NextResponse.redirect(url, 302);
  }

  clearAttempts(ip);

  const token = await createSessionToken(secret);
  url.pathname = "/admin/qr";
  url.search = "";
  const response = NextResponse.redirect(url, 302);
  response.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 30 * 24 * 60 * 60,
  });
  return response;
}
