import { NextRequest, NextResponse } from "next/server";
import { issueToken, issueRefreshToken, setAuthCookies, verifyRefreshToken, refreshTokenStore } from "@/lib/auth-store";

export async function POST(req: NextRequest) {
  try {
    const refreshToken = req.cookies.get("refresh_token")?.value ?? "";
    if (!refreshToken) {
      return NextResponse.json({ error: "Refresh token missing." }, { status: 401 });
    }

    const payload = await verifyRefreshToken(refreshToken);
    const userId = String(payload.sub);
    const newAccess = await issueToken({ sub: userId, type: "access" });
    const newRefresh = await issueRefreshToken(userId);

    refreshTokenStore.delete(refreshToken);

    const response = NextResponse.json({ token: newAccess });
    return setAuthCookies(response, newAccess, newRefresh);
  } catch (error) {
    return NextResponse.json({ error: "Unable to refresh session." }, { status: 401 });
  }
}
