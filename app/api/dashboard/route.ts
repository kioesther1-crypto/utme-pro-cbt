import { NextRequest, NextResponse } from "next/server";
import { getUserById, sanitizeUser, users, verifyToken } from "@/lib/auth-store";

export async function GET(req: NextRequest) {
  try {
    const authorization = req.headers.get("authorization") ?? "";
    const token = authorization.startsWith("Bearer ") ? authorization.slice(7) : "";

    if (!token) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const payload = await verifyToken(token);
    const user = getUserById(String(payload.sub));

    if (!user) {
      return NextResponse.json({ error: "Unauthorized user." }, { status: 401 });
    }

    const stats = {
      totalPracticeSessions: 34,
      mockExamsCompleted: 7,
      averageScore: "72%",
      bestScore: "89%",
      recentExams: [
        { title: "Mock Exam: Physics & Chemistry", score: "84%", date: "12 Sept 2026" },
        { title: "Use of English Revision", score: "74%", date: "08 Sept 2026" },
        { title: "Mathematics Drill", score: "68%", date: "04 Sept 2026" },
      ],
    };

    return NextResponse.json({
      user: sanitizeUser(user),
      stats,
    });
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
}
