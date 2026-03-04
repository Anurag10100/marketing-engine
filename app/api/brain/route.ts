import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const brain = await prisma.brandBrain.findFirst();
  const verticals = await prisma.verticalContext.findMany({
    orderBy: { vertical: "asc" },
  });

  return NextResponse.json({
    corePrompt: brain?.corePrompt ?? "",
    version: brain?.version ?? 0,
    updatedAt: brain?.updatedAt?.toISOString() ?? null,
    updatedBy: brain?.updatedBy ?? null,
    verticals,
  });
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const role = (session.user as Record<string, unknown>).role;
  if (role !== "ADMIN") {
    return NextResponse.json({ message: "Admin only" }, { status: 403 });
  }

  const body = await req.json();
  const userId = (session.user as Record<string, unknown>).id as string;

  // Update core prompt
  if (body.corePrompt !== undefined) {
    const existing = await prisma.brandBrain.findFirst();
    if (existing) {
      await prisma.brandBrain.update({
        where: { id: existing.id },
        data: {
          corePrompt: body.corePrompt,
          version: { increment: 1 },
          updatedBy: userId,
        },
      });
    } else {
      await prisma.brandBrain.create({
        data: {
          corePrompt: body.corePrompt,
          updatedBy: userId,
        },
      });
    }
  }

  // Update vertical context
  if (body.vertical && body.content !== undefined) {
    await prisma.verticalContext.upsert({
      where: { vertical: body.vertical },
      update: {
        content: body.content,
        updatedBy: userId,
      },
      create: {
        vertical: body.vertical,
        content: body.content,
        updatedBy: userId,
      },
    });
  }

  return NextResponse.json({ success: true });
}
