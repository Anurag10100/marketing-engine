import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const vertical = searchParams.get("vertical");
  const taskType = searchParams.get("taskType");
  const limit = parseInt(searchParams.get("limit") ?? "20", 10);
  const cursor = searchParams.get("cursor");
  const rating = searchParams.get("rating");

  const where: Record<string, unknown> = {};
  if (vertical) where.vertical = vertical;
  if (taskType) where.taskType = taskType;
  if (rating) where.rating = parseInt(rating, 10);

  const outputs = await prisma.output.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: limit,
    ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
    select: {
      id: true,
      vertical: true,
      taskType: true,
      contextInput: true,
      outputText: true,
      learningsUsed: true,
      rating: true,
      ratingNote: true,
      createdAt: true,
      user: { select: { name: true } },
    },
  });

  // Truncate contextInput to 100 chars for list view
  const formatted = outputs.map((o: (typeof outputs)[number]) => ({
    ...o,
    contextInput:
      o.contextInput.length > 100
        ? o.contextInput.slice(0, 100) + "..."
        : o.contextInput,
  }));

  return NextResponse.json(formatted);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // Rate an output: POST /api/outputs?id=xxx
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ message: "Missing output id" }, { status: 400 });
  }

  const body = await req.json();
  const rating = body.rating;
  if (!rating || rating < 1 || rating > 5) {
    return NextResponse.json(
      { message: "Rating must be 1-5" },
      { status: 400 }
    );
  }

  const output = await prisma.output.update({
    where: { id },
    data: {
      rating,
      ratingNote: body.note ?? null,
    },
  });

  return NextResponse.json({ success: true, rating: output.rating });
}
