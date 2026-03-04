"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { Sparkles } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950">
      <div className="w-full max-w-sm space-y-8 text-center">
        <div className="space-y-2">
          <div className="flex justify-center">
            <div className="rounded-2xl bg-amber-500/10 p-4">
              <Sparkles className="h-10 w-10 text-amber-500" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-zinc-100">
            Elets Brand Engine
          </h1>
          <p className="text-sm text-zinc-500">
            AI-powered content generation that learns from every interaction
          </p>
        </div>

        <Button
          onClick={() => signIn("google", { callbackUrl: "/generate" })}
          size="lg"
          className="w-full"
        >
          Sign in with Google
        </Button>

        <p className="text-xs text-zinc-600">
          Access restricted to authorised Elets email domains
        </p>
      </div>
    </div>
  );
}
