import { NextResponse } from "next/server";
import { examQuestions } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json({
    questions: examQuestions,
    total: examQuestions.length,
  });
}
