import { NextRequest, NextResponse } from "next/server";
import { issueToken, sanitizeUser, users, verifyPassword } from "@/lib/auth-store";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = String(body?.email ?? "").trim();
    const password = String(body?.password ?? "");

    const user = users.find((entry) => entry.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const token = await issueToken({
      sub: user.id,
      role: user.role,
      email: user.email,
      fullName: user.fullName,
    });

    return NextResponse.json({
      token,
      user: sanitizeUser(user),
    });
  } catch (error) {
    return NextResponse.json({ error: "Unable to authenticate user." }, { status: 500 });
  }
}
