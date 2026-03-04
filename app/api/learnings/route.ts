import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod/v4";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

const CreateLearningSchema = z.object({
  vertical: z.string().min(1),
  type: z.string().min(1),
  content: z.string().min(1).max(500),
});

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const vertical = searchParams.get("vertical");
  const type = searchParams.get("type");
  const limit = parseInt(searchParams.get("limit") ?? "50", 10);
  const cursor = searchParams.get("cursor");

  const where: Record<string, unknown> = {};
  if (vertical) where.vertical = vertical;
  if (type) where.type = type.toUpperCase();

  const learnings = await prisma.learning.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: limit,
    ...(cursor
      ? { skip: 1, cursor: { id: cursor } }
      : {}),
    include: { user: { select: { name: true } } },
  });

  return NextResponse.json(learnings);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = CreateLearningSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { message: "Validation error", errors: parsed.error.format() },
      { status: 400 }
    );
  }

  const maxLearnings = parseInt(
    process.env.MAX_LEARNINGS_PER_ORG ?? "500",
    10
  );
  const count = await prisma.learning.count();
  if (count >= maxLearnings) {
    return NextResponse.json(
      { message: `Maximum learnings limit (${maxLearnings}) reached` },
      { status: 400 }
    );
  }

  const userId = (session.user as Record<string, unknown>).id as string;
  const learning = await prisma.learning.create({
    data: {
      vertical: parsed.data.vertical,
      type: parsed.data.type as never,
      content: parsed.data.content,
      createdBy: userId,
    },
    include: { user: { select: { name: true } } },
  });

  return NextResponse.json(learning, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const role = (session.user as Record<string, unknown>).role;
  if (role !== "ADMIN") {
    return NextResponse.json({ message: "Admin only" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ message: "Missing id" }, { status: 400 });
  }

  await prisma.learning.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
