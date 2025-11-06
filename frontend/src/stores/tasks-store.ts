"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type Task = {
  id: string;
  projectId: string;
  title: string;
  status: "todo" | "in_progress" | "done";
  createdAt: string;
};

type TasksState = {
  tasks: Task[];
  addTask: (projectId: string, title: string) => void;
  updateTask: (id: string, patch: Partial<Task>) => void;
  removeTask: (id: string) => void;
  getTasksByProject: (projectId: string) => Task[];
};

export const useTasksStore = create<TasksState>()(
  persist(
    (set, get) => ({
      tasks: [],
      addTask: (projectId, title) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              id: globalThis.crypto?.randomUUID?.() ?? Date.now().toString(36),
              projectId,
              title,
              status: "todo",
              createdAt: new Date().toISOString(),
            },
          ],
        })),
      updateTask: (id, patch) =>
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...patch } : t)),
        })),
      removeTask: (id) =>
        set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) })),
      getTasksByProject: (projectId) => get().tasks.filter((t) => t.projectId === projectId),
    }),
    {
      name: "zap-tasks",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ tasks: state.tasks }),
    }
  )
);

