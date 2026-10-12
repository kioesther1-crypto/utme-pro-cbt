import { NextResponse } from "next/server";
import { subjectOptions } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json({
    subjects: subjectOptions.map((name, index) => ({
      id: `subject-${index + 1}`,
      name,
      type: index === 0 ? "Compulsory" : "Optional",
    })),
  });
}
