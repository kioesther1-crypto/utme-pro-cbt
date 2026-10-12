import { NextRequest, NextResponse } from "next/server";
import { getUserByEmail, hashPassword, issueToken, sanitizeUser, prisma } from "@/lib/auth-store";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const fullName = String(body?.fullName ?? "").trim();
    const email = String(body?.email ?? "").trim().toLowerCase();
    const phone = String(body?.phone ?? "").trim();
    const password = String(body?.password ?? "");

    if (!fullName || !email || !password) {
      return NextResponse.json({ error: "Full name, email and password are required." }, { status: 400 });
    }

    const existing = await getUserByEmail(email);
    if (existing) {
      return NextResponse.json({ error: "A user with this email already exists." }, { status: 409 });
    }

    const passwordHash = await hashPassword(password);
    const newUser = await prisma.user.create({
      data: {
        fullName,
        email,
        phone: phone || null,
        passwordHash,
        role: "student",
      },
    });

    // issue a token on registration
    const token = await issueToken({ sub: newUser.id, email: newUser.email, role: newUser.role, fullName: newUser.fullName });

    return NextResponse.json({
      message: "Registration successful.",
      user: sanitizeUser(newUser),
      token,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to register user right now." }, { status: 500 });
  }
}
