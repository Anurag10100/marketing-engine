"use client";

import { useSession, signOut } from "next-auth/react";
import { Menu, LogOut } from "lucide-react";
import { useUIStore } from "@/store/ui";

export function Header() {
  const { data: session } = useSession();
  const { sidebarOpen, toggleSidebar } = useUIStore();

  return (
    <header
      className={`sticky top-0 z-30 flex h-16 items-center justify-between border-b border-zinc-800 bg-zinc-950/80 px-6 backdrop-blur transition-all ${
        sidebarOpen ? "ml-64" : "ml-16"
      }`}
    >
      <button
        onClick={toggleSidebar}
        className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="flex items-center gap-4 ml-auto">
        {session?.user && (
          <>
            <span className="text-sm text-zinc-400">
              {session.user.name ?? session.user.email}
            </span>
            {session.user.image && (
              <img
                src={session.user.image}
                alt=""
                className="h-8 w-8 rounded-full"
              />
            )}
            <button
              onClick={() => signOut()}
              className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </>
        )}
      </div>
    </header>
  );
}
