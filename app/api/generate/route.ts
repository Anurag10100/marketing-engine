import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod/v4";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { anthropic, buildSystemPrompt } from "@/lib/anthropic";
import { USER_MESSAGE_TEMPLATES } from "@/lib/constants";
import type { TaskType, LearningRecord } from "@/types";

const GenerateSchema = z.object({
  vertical: z.string().min(1),
  taskType: z.string().min(1),
  contextInput: z.string().min(1).max(1000),
});

export async function POST(req: NextRequest) {
  try {
    // 1. Authenticate
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // 2. Validate
    const body = await req.json();
    const parsed = GenerateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { message: "Validation error", errors: parsed.error.format() },
        { status: 400 }
      );
    }

    const { vertical, taskType, contextInput } = parsed.data;

    // 3. Fetch BrandBrain
    const brain = await prisma.brandBrain.findFirst();
    if (!brain) {
      return NextResponse.json(
        { message: "Brand Brain not configured" },
        { status: 500 }
      );
    }

    // 4. Fetch VerticalContext
    const verticalCtx = await prisma.verticalContext.findUnique({
      where: { vertical },
    });

    // 5. Fetch Learnings
    const learnings = await prisma.learning.findMany({
      where: { vertical: { in: [vertical, "All"] } },
      orderBy: { createdAt: "desc" },
      take: 40,
    });

    // 6. Build system prompt
    const systemPrompt = buildSystemPrompt(
      brain.corePrompt,
      verticalCtx?.content ?? "",
      vertical,
      learnings.map((l) => ({
        id: l.id,
        vertical: l.vertical,
        type: l.type as LearningRecord["type"],
        content: l.content,
        createdAt: l.createdAt.toISOString(),
        createdBy: l.createdBy,
      }))
    );

    // 7. Build user message
    const template =
      USER_MESSAGE_TEMPLATES[taskType as TaskType] ?? "";
    const userMessage = template
      ? `${template}${contextInput}`
      : contextInput;

    // 8. Call Anthropic API
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-5-20250514",
      max_tokens: 1500,
      system: systemPrompt,
      messages: [{ role: "user", content: userMessage }],
    });

    const outputText =
      response.content[0]?.type === "text"
        ? response.content[0].text
        : "";

    // 9. Save Output
    const userId = (session.user as Record<string, unknown>).id as string;
    const output = await prisma.output.create({
      data: {
        vertical,
        taskType,
        contextInput,
        systemPrompt,
        outputText,
        learningsUsed: learnings.length,
        createdBy: userId,
      },
    });

    // 10. Return
    return NextResponse.json({
      outputText,
      learningsUsed: learnings.length,
      outputId: output.id,
    });
  } catch (error) {
    console.error("Generate error:", error);
    const isAnthropicError =
      error instanceof Error && error.message.includes("Anthropic");
    return NextResponse.json(
      { message: isAnthropicError ? "AI service error" : "Internal server error" },
      { status: isAnthropicError ? 502 : 500 }
    );
  }
}
