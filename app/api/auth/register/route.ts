import { NextRequest, NextResponse } from "next/server";
import { getUserByEmail, hashPassword, issueToken, sanitizeUser, users } from "@/lib/auth-store";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const fullName = String(body?.fullName ?? "").trim();
    const email = String(body?.email ?? "").trim();
    const phone = String(body?.phone ?? "").trim();
    const password = String(body?.password ?? "");

    if (!fullName || !email || !password) {
      return NextResponse.json({ error: "Full name, email and password are required." }, { status: 400 });
    }

    if (getUserByEmail(email)) {
      return NextResponse.json({ error: "A user with this email already exists." }, { status: 409 });
    }

    const passwordHash = await hashPassword(password);
    const newUser = {
      id: crypto.randomUUID(),
      fullName,
      email,
      phone: phone || undefined,
      passwordHash,
      role: "student" as const,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);

    return NextResponse.json({
      message: "Registration successful.",
      user: sanitizeUser(newUser),
    });
  } catch (error) {
    return NextResponse.json({ error: "Unable to register user right now." }, { status: 500 });
  }
}
