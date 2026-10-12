import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title = "UTME Practice Session", durationMinutes = 42 } = body ?? {};

    return NextResponse.json({
      success: true,
      exam: {
        id: crypto.randomUUID(),
        title,
        durationMinutes,
        totalQuestions: 4,
        startedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Unable to start exam." }, { status: 500 });
  }
}
