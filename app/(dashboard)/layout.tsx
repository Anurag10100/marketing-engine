"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";
import { useUIStore } from "@/store/ui";
import { Spinner } from "@/components/ui/Spinner";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const { sidebarOpen } = useUIStore();

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg-primary">
        <Spinner size={32} />
      </div>
    );
  }

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      <Sidebar />
      <Header />
      <main
        className={`mx-auto min-h-[calc(100vh-4rem)] max-w-content p-8 pb-20 transition-all lg:pb-8 ${
          sidebarOpen ? "ml-sidebar" : "ml-16"
        }`}
      >
        <div className="tab-content">{children}</div>
      </main>
      <MobileNav />
    </div>
  );
}
