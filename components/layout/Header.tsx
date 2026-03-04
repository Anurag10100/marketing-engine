"use client";

import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Menu, LogOut, Brain } from "lucide-react";
import { useUIStore } from "@/store/ui";
import { Badge } from "@/components/ui/Badge";

const pageTitles: Record<string, string> = {
  "/generate": "Generate",
  "/brain": "Brand Brain",
  "/feed": "Learning Feed",
  "/patterns": "Patterns",
  "/history": "History",
};

export function Header({ learningsCount }: { learningsCount?: number }) {
  const { data: session } = useSession();
  const { sidebarOpen, toggleSidebar } = useUIStore();
  const pathname = usePathname();
  const title = pageTitles[pathname] ?? "";

  return (
    <header
      className={`sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border-default bg-bg-primary/80 px-6 backdrop-blur-sm transition-all ${
        sidebarOpen ? "ml-sidebar" : "ml-16"
      }`}
    >
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="rounded-[6px] p-2 text-text-muted hover:bg-bg-surface hover:text-text-primary lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="font-mono text-sm font-semibold uppercase tracking-wider text-text-primary">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {learningsCount !== undefined && learningsCount > 0 && (
          <Badge color="#F59E0B" className="gap-1.5 font-mono text-xs">
            <Brain className="h-3 w-3" />
            {learningsCount} LEARNINGS
          </Badge>
        )}
        {session?.user && (
          <>
            <span className="font-mono text-xs text-text-muted">
              {session.user.name ?? session.user.email}
            </span>
            {session.user.image && (
              <img
                src={session.user.image}
                alt=""
                className="h-8 w-8 rounded-full border border-border-default"
              />
            )}
            <button
              onClick={() => signOut()}
              className="rounded-[6px] p-2 text-text-muted hover:bg-bg-surface hover:text-text-primary"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </>
        )}
      </div>
    </header>
  );
}
