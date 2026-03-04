"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Brain, Rss, BarChart3, History } from "lucide-react";

const navItems = [
  { href: "/generate", label: "Generate", icon: Sparkles },
  { href: "/brain", label: "Brain", icon: Brain },
  { href: "/feed", label: "Feed", icon: Rss },
  { href: "/patterns", label: "Patterns", icon: BarChart3 },
  { href: "/history", label: "History", icon: History },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex border-t border-border-default bg-bg-primary lg:hidden">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-1 flex-col items-center gap-1 py-2 font-mono text-[10px] uppercase tracking-wider transition-colors duration-200 ${
              isActive ? "text-accent" : "text-text-muted"
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
