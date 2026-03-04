"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { Sparkles } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-primary">
      <div className="w-full max-w-sm space-y-8 text-center">
        <div className="space-y-3">
          <div className="flex justify-center">
            <div className="rounded-card bg-[rgba(245,158,11,0.15)] p-4">
              <Sparkles className="h-10 w-10 text-accent" />
            </div>
          </div>
          <h1 className="font-mono text-2xl font-bold uppercase tracking-wider text-text-primary">
            Elets Brand Engine
          </h1>
          <p className="text-sm text-text-muted">
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

        <p className="font-mono text-[11px] uppercase tracking-wider text-text-disabled">
          Access restricted to authorised Elets email domains
        </p>
      </div>
    </div>
  );
}
