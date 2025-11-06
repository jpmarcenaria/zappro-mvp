"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  ProjectPayload,
  ProjectRecord,
  ProjectUpdatePayload,
  projectsAPI,
} from "@/lib/api-client";
import { useAuthStore } from "@/stores/auth-store";

export const useProjects = () => {
  const queryClient = useQueryClient();
  const { token } = useAuthStore();

  const fetchProjects = async (): Promise<ProjectRecord[]> => {
    return projectsAPI(token).getAll();
  };

  const projectsQuery = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
    enabled: Boolean(token),
  });

  const createMutation = useMutation({
    mutationFn: (project: ProjectPayload) => projectsAPI(token).create(project),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: ProjectUpdatePayload }) =>
      projectsAPI(token).update(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => projectsAPI(token).delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  return {
    projects: (projectsQuery.data as ProjectRecord[] | undefined) ?? [],
    isLoading: projectsQuery.isLoading,
    error:
      projectsQuery.error instanceof Error
        ? projectsQuery.error.message
        : null,
    createProject: createMutation.mutateAsync,
    updateProject: updateMutation.mutateAsync,
    deleteProject: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};

export type { ProjectRecord };
