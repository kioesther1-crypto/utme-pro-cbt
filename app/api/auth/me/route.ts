import { NextRequest, NextResponse } from "next/server";
import { getRequestUser, prisma } from "@/lib/auth-store";

export async function POST(req: NextRequest) {
  try {
    const user = await getRequestUser(req);
    if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

    const body = await req.json();
    const examId = String(body?.examId ?? "");
    const answers = Array.isArray(body?.answers) ? body.answers : [];

    if (!examId) {
      return NextResponse.json({ error: "examId is required." }, { status: 400 });
    }

    const exam = await prisma.exam.findUnique({
      where: { id: examId },
      include: { examQuestions: { include: { question: true } } },
    });

    if (!exam) return NextResponse.json({ error: "Exam not found." }, { status: 404 });
    if (exam.userId !== user.id) return NextResponse.json({ error: "Unauthorized." }, { status: 403 });

    let correct = 0;
    for (const answer of answers) {
      const questionId = String(answer?.questionId ?? "");
      const selected = answer?.selected ?? null;
      const questionRef = exam.examQuestions.find((entry) => entry.questionId === questionId);
      if (!questionRef) continue;

      const correctOption = questionRef.question.correctOption;
      const isCorrect = selected !== null && selected === correctOption;
      if (isCorrect) correct++;

      await prisma.examAnswer.upsert({
        where: { examId_questionId: { examId: exam.id, questionId } },
        update: {
          selectedOption: selected,
          markedForReview: Boolean(answer?.markedForReview),
          savedAt: new Date(),
          isSynced: true,
        },
        create: {
          examId: exam.id,
          questionId,
          selectedOption: selected,
          markedForReview: Boolean(answer?.markedForReview),
          savedAt: new Date(),
          isSynced: true,
        },
      });
    }

    const totalQuestions = exam.examQuestions.length || 1;
    const score = Math.round((correct / totalQuestions) * 100);

    await prisma.exam.update({
      where: { id: exam.id },
      data: { submittedAt: new Date(), score },
    });

    return NextResponse.json({
      success: true,
      score,
      totalQuestions,
      correct,
      message: "Exam submitted and graded.",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to submit exam." }, { status: 500 });
  }
}
