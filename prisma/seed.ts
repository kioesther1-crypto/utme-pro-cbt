import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const english = await prisma.subject.upsert({
    where: { code: "ENG" },
    update: {},
    create: {
      code: "ENG",
      name: "English Language",
      description: "Use of English for all UTME candidates.",
    },
  });

  const maths = await prisma.subject.upsert({
    where: { code: "MAT" },
    update: {},
    create: {
      code: "MAT",
      name: "Mathematics",
      description: "Core quantitative subject for science and commercial courses.",
    },
  });

  const physics = await prisma.subject.upsert({
    where: { code: "PHY" },
    update: {},
    create: {
      code: "PHY",
      name: "Physics",
      description: "Essential for engineering and science-based fields.",
    },
  });

  const chemistry = await prisma.subject.upsert({
    where: { code: "CHE" },
    update: {},
    create: {
      code: "CHE",
      name: "Chemistry",
      description: "Critical for many science-oriented programs.",
    },
  });

  await prisma.question.upsert({
    where: { id: "sample-eng-1" },
    update: {},
    create: {
      id: "sample-eng-1",
      subjectId: english.id,
      questionText: "Which of the following is the best explanation of the concept of demand in economics?",
      optionA: "The quantity of goods that producers are willing to sell at a given price",
      optionB: "The desire and willingness of consumers to buy a product at various prices",
      optionC: "The cost of producing a good in the market",
      optionD: "The amount of goods stored in a warehouse",
      correctOption: "B",
      explanation: "Demand refers to the consumer's willingness and ability to purchase at various prices.",
    },
  });

  await prisma.question.upsert({
    where: { id: "sample-mat-1" },
    update: {},
    create: {
      id: "sample-mat-1",
      subjectId: maths.id,
      questionText: "Solve: 2x + 5 = 17",
      optionA: "x = 4",
      optionB: "x = 5",
      optionC: "x = 6",
      optionD: "x = 7",
      correctOption: "C",
      explanation: "Subtract 5 from both sides to get 2x = 12, then divide by 2.",
    },
  });

  await prisma.question.upsert({
    where: { id: "sample-phy-1" },
    update: {},
    create: {
      id: "sample-phy-1",
      subjectId: physics.id,
      questionText: "What is the SI unit of force?",
      optionA: "Joule",
      optionB: "Watt",
      optionC: "Newton",
      optionD: "Pascal",
      correctOption: "C",
      explanation: "Force is measured in Newtons in the SI system.",
    },
  });

  await prisma.question.upsert({
    where: { id: "sample-che-1" },
    update: {},
    create: {
      id: "sample-che-1",
      subjectId: chemistry.id,
      questionText: "The atomic number of an element represents:",
      optionA: "Number of neutrons",
      optionB: "Number of protons",
      optionC: "Mass number",
      optionD: "Valence electrons",
      correctOption: "B",
      explanation: "Atomic number equals the number of protons in the nucleus.",
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
