import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth-store";
import { prisma, sanitizeUser } from "@/lib/auth-store";

export async function GET(req: NextRequest) {
  try {
    const authorization = req.headers.get("authorization") ?? "";
    const token = authorization.startsWith("Bearer ") ? authorization.slice(7) : "";
    if (!token) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

    const payload = await verifyToken(token);
    const userId = String(payload.sub);
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return NextResponse.json({ error: "Unauthorized user." }, { status: 401 });

    // compute stats from DB
    const totalPracticeSessions = await prisma.exam.count({ where: { userId } });
    const mockExamsCompleted = await prisma.exam.count({ where: { userId, submittedAt: { not: null } } });

    const bestScoreRow = await prisma.exam.findFirst({ where: { userId, score: { not: null } }, orderBy: { score: "desc" } });
    const avgScoreAgg = await prisma.exam.aggregate({ where: { userId, score: { not: null } }, _avg: { score: true } });

    const recentExams = await prisma.exam.findMany({ where: { userId }, orderBy: { createdAt: "desc" }, take: 5 });

    const stats = {
      totalPracticeSessions,
      mockExamsCompleted,
      averageScore: avgScoreAgg._avg.score ? `${Math.round(avgScoreAgg._avg.score)}%` : "N/A",
      bestScore: bestScoreRow?.score ? `${Math.round(bestScoreRow.score)}%` : "N/A",
      recentExams: recentExams.map((e) => ({ title: e.title, score: e.score ? `${Math.round(e.score)}%` : "-", date: e.createdAt.toISOString().split("T")[0] })),
    };

    return NextResponse.json({ user: sanitizeUser(user), stats });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
}
