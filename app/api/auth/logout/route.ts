import { NextRequest, NextResponse } from "next/server";
import { getRequestUser, sanitizeUser } from "@/lib/auth-store";

export async function GET(req: NextRequest) {
  const user = await getRequestUser(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  return NextResponse.json({ user: sanitizeUser(user) });
}
