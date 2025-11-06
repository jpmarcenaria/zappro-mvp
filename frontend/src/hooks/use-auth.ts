"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { authAPI, AuthResponse } from "@/lib/api-client";
import { useAuthStore } from "@/stores/auth-store";

type LoginVariables = {
  email: string;
  password: string;
};

type RegisterVariables = {
  email: string;
  password: string;
  name: string;
  role?: string;
};

export const useAuth = () => {
  const queryClient = useQueryClient();
  const { login: setAuth, logout: clearAuth, user, isAuthenticated, token } =
    useAuthStore();

  const loginMutation = useMutation({
    mutationFn: async ({ email, password }: LoginVariables): Promise<AuthResponse> => {
      const result = await authAPI.login(email, password);
      setAuth(result.user, result.access_token);
      queryClient.invalidateQueries();
      return result;
    },
  });

  const registerMutation = useMutation({
    mutationFn: async ({ email, password, name, role }: RegisterVariables) => {
      const createdUser = await authAPI.register(email, password, name, role);
      // Auto-login to obtain token
      const loginResult = await authAPI.login(email, password);
      setAuth(loginResult.user, loginResult.access_token);
      queryClient.invalidateQueries();
      return { createdUser, loginResult };
    },
  });

  const logout = () => {
    clearAuth();
    queryClient.clear();
  };

  return {
    user,
    token,
    isAuthenticated,
    login: loginMutation.mutateAsync,
    loginLoading: loginMutation.isPending,
    loginError: loginMutation.error instanceof Error ? loginMutation.error.message : null,
    register: registerMutation.mutateAsync,
    registerLoading: registerMutation.isPending,
    registerError:
      registerMutation.error instanceof Error ? registerMutation.error.message : null,
    logout,
  };
};

