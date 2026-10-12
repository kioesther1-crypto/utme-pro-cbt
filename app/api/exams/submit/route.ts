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
    const examId = String(body?.examId ?? "");
    const answers = Array.isArray(body?.answers) ? body.answers : [];

    if (!examId) {
      return NextResponse.json({ error: "examId is required." }, { status: 400 });
    }

    const exam = await prisma.exam.findUnique({ where: { id: examId }, include: { examQuestions: { include: { question: true } } } });
    if (!exam) return NextResponse.json({ error: "Exam not found." }, { status: 404 });
    if (userId && exam.userId && exam.userId !== userId) return NextResponse.json({ error: "Unauthorized." }, { status: 403 });

    // compute correct count
    let correct = 0;
    for (const ans of answers) {
      const q = exam.examQuestions.find((eq) => eq.questionId === ans.questionId);
      if (!q) continue;
      const correctOption = (q.question as any).correctOption;
      const selected = ans.selected ?? null;
      const isCorrect = selected && selected === correctOption;
      if (isCorrect) correct++;

      // upsert answer record
      await prisma.examAnswer.upsert({
        where: { examId_questionId: { examId: exam.id, questionId: q.questionId } },
        update: { selectedOption: selected, savedAt: new Date(), isSynced: true },
        create: { examId: exam.id, questionId: q.questionId, selectedOption: selected, savedAt: new Date(), isSynced: true },
      });
    }

    const totalQuestions = exam.examQuestions.length || 1;
    const score = Math.round((correct / totalQuestions) * 100);

    await prisma.exam.update({ where: { id: exam.id }, data: { submittedAt: new Date(), score } });

    return NextResponse.json({ success: true, score, totalQuestions, correct, message: "Exam submitted and graded." });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to submit exam." }, { status: 500 });
  }
}
