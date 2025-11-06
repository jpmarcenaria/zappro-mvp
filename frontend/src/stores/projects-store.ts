"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type Project = {
  id: string;
  name: string;
  status: "planned" | "active" | "archived";
  createdAt: string;
};

type ProjectsState = {
  projects: Project[];
  selectedProjectId: string | null;
  addProject: (name: string) => void;
  updateProject: (id: string, patch: Partial<Project>) => void;
  removeProject: (id: string) => void;
  selectProject: (id: string | null) => void;
};

export const useProjectsStore = create<ProjectsState>()(
  persist(
    (set) => ({
      projects: [],
      selectedProjectId: null,
      addProject: (name) =>
        set((state) => ({
          projects: [
            ...state.projects,
            {
              id: globalThis.crypto?.randomUUID?.() ?? Date.now().toString(36),
              name,
              status: "planned",
              createdAt: new Date().toISOString(),
            },
          ],
        })),
      updateProject: (id, patch) =>
        set((state) => ({
          projects: state.projects.map((p) => (p.id === id ? { ...p, ...patch } : p)),
        })),
      removeProject: (id) =>
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== id),
          selectedProjectId: state.selectedProjectId === id ? null : state.selectedProjectId,
        })),
      selectProject: (id) => set(() => ({ selectedProjectId: id })),
    }),
    {
      name: "zap-projects",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ projects: state.projects, selectedProjectId: state.selectedProjectId }),
    }
  )
);
