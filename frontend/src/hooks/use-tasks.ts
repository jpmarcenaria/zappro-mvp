"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  TaskPayload,
  TaskRecord,
  TaskUpdatePayload,
  tasksAPI,
} from "@/lib/api-client";
import { useAuthStore } from "@/stores/auth-store";

export const useTasks = (projectId: number | null | undefined) => {
  const queryClient = useQueryClient();
  const { token } = useAuthStore();

  const tasksQuery = useQuery({
    queryKey: ["tasks", projectId],
    queryFn: async (): Promise<TaskRecord[]> => tasksAPI(token).getByProject(projectId!),
    enabled: Boolean(token) && projectId !== null && projectId !== undefined,
  });

  const createMutation = useMutation({
    mutationFn: (task: TaskPayload) => tasksAPI(token).create(task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", projectId] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: TaskUpdatePayload }) =>
      tasksAPI(token).update(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", projectId] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => tasksAPI(token).delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", projectId] });
    },
  });

  return {
    tasks: (tasksQuery.data as TaskRecord[] | undefined) ?? [],
    isLoading: tasksQuery.isLoading,
    error:
      tasksQuery.error instanceof Error ? tasksQuery.error.message : null,
    createTask: createMutation.mutateAsync,
    updateTask: updateMutation.mutateAsync,
    deleteTask: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};

