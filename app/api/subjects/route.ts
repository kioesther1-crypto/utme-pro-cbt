import { NextResponse } from "next/server";

const subjects = [
  "English Language",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Economics",
  "Government",
  "Literature in English",
  "Commerce",
  "Accounting",
  "Geography",
  "Agricultural Science",
  "Christian Religious Studies",
  "Islamic Studies",
  "History",
];

export async function GET() {
  return NextResponse.json({
    subjects: subjects.map((name, index) => ({
      id: `subject-${index + 1}`,
      name,
      type: index === 0 ? "Compulsory" : "Optional",
      description: "UTME subject option suitable for a range of course combinations.",
    })),
  });
}
