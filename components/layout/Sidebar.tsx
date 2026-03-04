"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  Brain,
  Rss,
  BarChart3,
  History,
  Settings,
  ChevronLeft,
} from "lucide-react";
import { useUIStore } from "@/store/ui";

const navItems = [
  { href: "/generate", label: "Generate", icon: Sparkles },
  { href: "/brain", label: "Brand Brain", icon: Brain },
  { href: "/feed", label: "Learning Feed", icon: Rss },
  { href: "/patterns", label: "Patterns", icon: BarChart3 },
  { href: "/history", label: "History", icon: History },
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen, toggleSidebar } = useUIStore();

  return (
    <aside
      className={`fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-border-default bg-bg-primary transition-all duration-300 ${
        sidebarOpen ? "w-sidebar" : "w-16"
      }`}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-border-default px-4">
        {sidebarOpen && (
          <span className="font-mono text-base font-bold text-accent">
            ELETS ENGINE
          </span>
        )}
        <button
          onClick={toggleSidebar}
          className="rounded-[6px] p-1.5 text-text-muted hover:bg-bg-surface hover:text-text-primary"
        >
          <ChevronLeft
            className={`h-5 w-5 transition-transform ${
              !sidebarOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-[6px] px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-[rgba(245,158,11,0.15)] text-accent"
                  : "text-text-secondary hover:bg-bg-surface hover:text-text-primary"
              }`}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {sidebarOpen && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Settings — bottom */}
      <div className="border-t border-border-default p-3">
        <button className="flex w-full items-center gap-3 rounded-[6px] px-3 py-2.5 text-sm font-medium text-text-muted transition-all duration-200 hover:bg-bg-surface hover:text-text-primary">
          <Settings className="h-5 w-5 flex-shrink-0" />
          {sidebarOpen && <span>Settings</span>}
        </button>
      </div>
    </aside>
  );
}
