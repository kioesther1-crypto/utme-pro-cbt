import { NextRequest, NextResponse } from "next/server";
import { getRequestUser, prisma, verifyToken } from "@/lib/auth-store";

export async function POST(req: NextRequest) {
  try {
    const user = await getRequestUser(req);
    if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

    const body = await req.json();
    const title = String(body?.title ?? "UTME Practice Session");
    const durationMinutes = Number(body?.durationMinutes ?? 42);
    const selectedSubjects: string[] = Array.isArray(body?.selectedSubjects) ? body.selectedSubjects : [];
    const totalQuestions = Number(body?.totalQuestions ?? 10);

    const whereClause = selectedSubjects.length ? { subjectId: { in: selectedSubjects } } : {};
    const questions = await prisma.question.findMany({ where: whereClause, take: totalQuestions });

    const exam = await prisma.exam.create({
      data: {
        userId: user.id,
        title,
        totalQuestions: questions.length,
        durationMinutes,
      },
    });

    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      await prisma.examQuestion.create({
        data: {
          examId: exam.id,
          questionId: question.id,
          position: i + 1,
        },
      });
      await prisma.examAnswer.create({
        data: {
          examId: exam.id,
          questionId: question.id,
          selectedOption: null,
          markedForReview: false,
          isSynced: true,
        },
      });
    }

    return NextResponse.json({ examId: exam.id, totalQuestions: questions.length, title: exam.title });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to create exam session." }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const user = await getRequestUser(req);
    if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

    const exams = await prisma.exam.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      take: 20,
    });

    return NextResponse.json({ exams });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to list exams." }, { status: 500 });
  }
}
