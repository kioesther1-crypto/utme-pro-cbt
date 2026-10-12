import { NextRequest, NextResponse } from "next/server";
import { clearAuthCookies, refreshTokenStore, verifyToken } from "@/lib/auth-store";

export async function POST(req: NextRequest) {
  try {
    const cookieRefresh = req.cookies.get("refresh_token")?.value ?? "";
    if (cookieRefresh) {
      refreshTokenStore.delete(cookieRefresh);
      try {
        await verifyToken(cookieRefresh);
      } catch {
        // intentionally suppress invalid token errors during logout
      }
    }

    return clearAuthCookies(NextResponse.json({ message: "Logout successful." }));
  } catch (error) {
    return clearAuthCookies(NextResponse.json({ message: "Logout successful." }));
  }
}
