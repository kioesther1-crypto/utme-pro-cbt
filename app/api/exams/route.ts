import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { title, durationMinutes = 42, totalQuestions = 4 } = body ?? {};

  return NextResponse.json({
    success: true,
    exam: {
      id: "demo-exam-001",
      title: title ?? "UTME Practice Session",
      durationMinutes,
      totalQuestions,
      startedAt: new Date().toISOString(),
    },
  });
}
