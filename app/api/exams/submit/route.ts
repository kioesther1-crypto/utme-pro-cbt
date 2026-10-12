import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const answers = Array.isArray(body?.answers) ? body.answers : [];
    const totalQuestions = Number(body?.totalQuestions ?? answers.length || 4);
    const correct = answers.filter((answer: any) => answer.selected === answer.correctAnswer).length;
    const score = Math.round((correct / totalQuestions) * 100);

    return NextResponse.json({
      success: true,
      score,
      totalQuestions,
      correct,
      message: "Exam submitted successfully.",
    });
  } catch (error) {
    return NextResponse.json({ error: "Unable to submit exam." }, { status: 500 });
  }
}
