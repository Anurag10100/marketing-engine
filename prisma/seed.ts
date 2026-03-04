import { PrismaClient } from "@prisma/client";
import {
  DEFAULT_CORE_PROMPT,
  DEFAULT_VERTICAL_CONTEXTS,
} from "../lib/brain-defaults";

const prisma = new PrismaClient();

async function main() {
  // Seed Brand Brain if not exists
  const existingBrain = await prisma.brandBrain.findFirst();
  if (!existingBrain) {
    await prisma.brandBrain.create({
      data: {
        corePrompt: DEFAULT_CORE_PROMPT,
        version: 1,
      },
    });
    console.log("✓ Brand Brain seeded");
  } else {
    console.log("→ Brand Brain already exists, skipping");
  }

  // Seed Vertical Contexts
  for (const vc of DEFAULT_VERTICAL_CONTEXTS) {
    await prisma.verticalContext.upsert({
      where: { vertical: vc.vertical },
      update: {},
      create: {
        vertical: vc.vertical,
        content: vc.content,
      },
    });
  }
  console.log(`✓ ${DEFAULT_VERTICAL_CONTEXTS.length} Vertical Contexts seeded`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
