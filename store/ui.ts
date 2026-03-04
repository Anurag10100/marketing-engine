import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Vertical, TaskType } from "@/types";

type UIState = {
  activeVertical: Vertical;
  activeTaskType: TaskType;
  sidebarOpen: boolean;
  setActiveVertical: (v: Vertical) => void;
  setActiveTaskType: (t: TaskType) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
};

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      activeVertical: "BFSI",
      activeTaskType: "linkedin_post",
      sidebarOpen: true,
      setActiveVertical: (v) => set({ activeVertical: v }),
      setActiveTaskType: (t) => set({ activeTaskType: t }),
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
    }),
    { name: "elets-ui-state" }
  )
);
