"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useBrain } from "@/hooks/useBrain";
import { CoreBrainEditor } from "@/components/brain/CoreBrainEditor";
import { VerticalEditor } from "@/components/brain/VerticalEditor";
import { Spinner } from "@/components/ui/Spinner";

export default function BrainPage() {
  const { data: session } = useSession();
  const { data: brain, isLoading, update } = useBrain();
  const [activeTab, setActiveTab] = useState<"core" | "verticals">("core");

  const isAdmin =
    (session?.user as Record<string, unknown>)?.role === "ADMIN";

  if (isLoading || !brain) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-zinc-100">Brand Brain</h1>

      {/* Tab switcher */}
      <div className="flex gap-1 rounded-lg bg-zinc-900 p-1">
        {(["core", "verticals"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab
                ? "bg-zinc-800 text-zinc-100"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {tab === "core" ? "Core Brand Knowledge" : "Vertical Contexts"}
          </button>
        ))}
      </div>

      {activeTab === "core" ? (
        <CoreBrainEditor
          corePrompt={brain.corePrompt}
          version={brain.version}
          updatedAt={brain.updatedAt}
          updatedBy={brain.updatedBy}
          isAdmin={isAdmin}
          onSave={(corePrompt) => update.mutate({ corePrompt })}
          saving={update.isPending}
        />
      ) : (
        <VerticalEditor
          verticals={brain.verticals}
          isAdmin={isAdmin}
          onSave={(vertical, content) =>
            update.mutate({ vertical, content })
          }
          saving={update.isPending}
        />
      )}
    </div>
  );
}
