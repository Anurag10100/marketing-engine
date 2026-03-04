import { PrismaClient } from "@prisma/client";
import { DEFAULT_BRAIN, DEFAULT_VERTICALS } from "../lib/brain-defaults";

const prisma = new PrismaClient();

async function main() {
  // Only seed if no brain exists
  const existing = await prisma.brandBrain.count();
  if (existing > 0) {
    console.log("Brain already seeded — skipping");
    return;
  }

  // Create Brand Brain
  await prisma.brandBrain.create({
    data: { corePrompt: DEFAULT_BRAIN, version: 1 },
  });

  // Create vertical contexts
  for (const [vertical, content] of Object.entries(DEFAULT_VERTICALS)) {
    await prisma.verticalContext.create({
      data: { vertical, content },
    });
  }

  console.log("Brain seeded successfully");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

// Run with: npx prisma db seed
