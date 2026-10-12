import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth-store";

export async function POST(req: NextRequest) {
  try {
    const authorization = req.headers.get("authorization") ?? "";
    const token = authorization.startsWith("Bearer ") ? authorization.slice(7) : "";
    const payload = token ? await verifyToken(token) : null;
    const userId = payload ? String(payload.sub) : null;

    const body = await req.json();
    const title = String(body?.title ?? "UTME Practice Session");
    const durationMinutes = Number(body?.durationMinutes ?? 42);
    const selectedSubjects: string[] = Array.isArray(body?.selectedSubjects) ? body.selectedSubjects : [];
    const totalQuestions = Number(body?.totalQuestions ?? 10);

    // select questions from DB
    const whereClause = selectedSubjects.length ? { subjectId: { in: selectedSubjects } } : {};
    const questions = await prisma.question.findMany({ where: whereClause, take: totalQuestions });

    const exam = await prisma.exam.create({
      data: {
        userId: userId ?? undefined,
        title,
        totalQuestions: questions.length,
        durationMinutes,
      },
    });

    // create examQuestions and examAnswers
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      await prisma.examQuestion.create({ data: { examId: exam.id, questionId: q.id, position: i + 1 } });
      await prisma.examAnswer.create({ data: { examId: exam.id, questionId: q.id, selectedOption: null } });
    }

    return NextResponse.json({ examId: exam.id, totalQuestions: questions.length });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to create exam session." }, { status: 500 });
  }
}

export async function GET() {
  try {
    const exams = await prisma.exam.findMany({ orderBy: { createdAt: "desc" }, take: 20 });
    return NextResponse.json({ exams });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to list exams." }, { status: 500 });
  }
}
