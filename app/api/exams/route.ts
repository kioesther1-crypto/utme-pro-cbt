import { NextRequest, NextResponse } from "next/server";
import { getRequestUser, prisma, sanitizeUser } from "@/lib/auth-store";

export async function GET(req: NextRequest) {
  try {
    const user = await getRequestUser(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const totalPracticeSessions = await prisma.exam.count({ where: { userId: user.id } });
    const mockExamsCompleted = await prisma.exam.count({ where: { userId: user.id, submittedAt: { not: null } } });

    const bestScoreRow = await prisma.exam.findFirst({
      where: { userId: user.id, score: { not: null } },
      orderBy: { score: "desc" },
    });

    const averageScoreRow = await prisma.exam.aggregate({
      where: { userId: user.id, score: { not: null } },
      _avg: { score: true },
    });

    const recentExams = await prisma.exam.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      take: 5,
    });

    const stats = {
      totalPracticeSessions,
      mockExamsCompleted,
      averageScore: averageScoreRow._avg.score ? `${Math.round(averageScoreRow._avg.score)}%` : "N/A",
      bestScore: bestScoreRow?.score ? `${Math.round(bestScoreRow.score)}%` : "N/A",
      recentExams: recentExams.map((exam) => ({
        title: exam.title,
        score: exam.score ? `${Math.round(exam.score)}%` : "-",
        date: exam.createdAt.toISOString().split("T")[0],
      })),
    };

    return NextResponse.json({
      user: sanitizeUser(user),
      stats,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to load dashboard." }, { status: 500 });
  }
}
