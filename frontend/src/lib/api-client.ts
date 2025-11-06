const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const apiClient = {
  get: async (endpoint: string) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    return response.json();
  },

  post: async (endpoint: string, data?: unknown) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: data !== undefined ? JSON.stringify(data) : undefined,
    });
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    return response.json();
  },
};

// Auth-specific helpers
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      let detail = "Login failed";
      try {
        const payload = await response.json();
        detail = payload.detail ?? detail;
      } catch {
        // ignore json parse errors
      }
      throw new Error(detail);
    }
    return response.json();
  },

  register: async (
    email: string,
    password: string,
    name: string,
    role: string = "operador"
  ) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name, role }),
    });
    if (!response.ok) {
      let detail = "Registration failed";
      try {
        const payload = await response.json();
        detail = payload.detail ?? detail;
      } catch {
        // ignore json parse errors
      }
      throw new Error(detail);
    }
    return response.json();
  },
};

export const authenticatedAPI = (token: string) => ({
  get: async (endpoint: string) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    return response.json();
  },

  post: async (endpoint: string, data?: unknown) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: data !== undefined ? JSON.stringify(data) : undefined,
    });
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    return response.json();
  },
});

// Health check function
export const getHealthStatus = () => apiClient.get("/health");

export type AuthResponse = {
  access_token: string;
  token_type: string;
  user: {
    id: number;
    email: string;
    name: string;
    role: string;
    created_at?: string | null;
  };
};

export type ProjectStatus = "planning" | "active" | "completed" | "paused";

export type ProjectRecord = {
  id: number;
  name: string;
  description?: string | null;
  status: ProjectStatus;
  owner_id: number;
  created_at: string;
  updated_at?: string | null;
};

export type ProjectPayload = {
  name: string;
  description?: string;
  status?: ProjectStatus;
};

export type ProjectUpdatePayload = Partial<ProjectPayload>;

export const projectsAPI = (token: string | null | undefined) => {
  if (!token) {
    throw new Error("Missing authentication token");
  }

  const headers = {
    Authorization: `Bearer ${token}`,
  } as const;

  return {
    getAll: async (): Promise<ProjectRecord[]> => {
      const response = await fetch(`${API_BASE_URL}/api/v1/projects`, {
        headers,
      });
      if (!response.ok) throw new Error("Failed to fetch projects");
      return response.json();
    },

    getById: async (id: number): Promise<ProjectRecord> => {
      const response = await fetch(`${API_BASE_URL}/api/v1/projects/${id}`, {
        headers,
      });
      if (!response.ok) throw new Error("Failed to fetch project");
      return response.json();
    },

    create: async (project: ProjectPayload): Promise<ProjectRecord> => {
      const response = await fetch(`${API_BASE_URL}/api/v1/projects`, {
        method: "POST",
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      });
      if (!response.ok) throw new Error("Failed to create project");
      return response.json();
    },

    update: async (
      id: number,
      updates: ProjectUpdatePayload
    ): Promise<ProjectRecord> => {
      const response = await fetch(`${API_BASE_URL}/api/v1/projects/${id}`, {
        method: "PUT",
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });
      if (!response.ok) throw new Error("Failed to update project");
      return response.json();
    },

    delete: async (id: number): Promise<void> => {
      const response = await fetch(`${API_BASE_URL}/api/v1/projects/${id}`, {
        method: "DELETE",
        headers,
      });
      if (!response.ok) throw new Error("Failed to delete project");
    },
  };
};

export type TaskStatus = "todo" | "in_progress" | "done";

export type TaskRecord = {
  id: number;
  title: string;
  description?: string | null;
  status: TaskStatus;
  project_id: number;
  assignee_id?: number | null;
  created_at: string;
  updated_at?: string | null;
  due_date?: string | null;
};

export type TaskPayload = {
  title: string;
  description?: string;
  status?: TaskStatus;
  assignee_id?: number | null;
  due_date?: string | null;
  project_id: number;
};

export type TaskUpdatePayload = Partial<Omit<TaskPayload, "project_id">>;

export const tasksAPI = (token: string | null | undefined) => {
  if (!token) {
    throw new Error("Missing authentication token");
  }

  const baseHeaders = {
    Authorization: `Bearer ${token}`,
  } as const;

  return {
    getByProject: async (projectId: number): Promise<TaskRecord[]> => {
      const response = await fetch(`${API_BASE_URL}/api/v1/projects/${projectId}/tasks`, {
        headers: baseHeaders,
      });
      if (!response.ok) throw new Error("Failed to fetch tasks");
      return response.json();
    },

    create: async (task: TaskPayload): Promise<TaskRecord> => {
      const response = await fetch(`${API_BASE_URL}/api/v1/tasks`, {
        method: "POST",
        headers: {
          ...baseHeaders,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
      if (!response.ok) throw new Error("Failed to create task");
      return response.json();
    },

    update: async (id: number, updates: TaskUpdatePayload): Promise<TaskRecord> => {
      const response = await fetch(`${API_BASE_URL}/api/v1/tasks/${id}`, {
        method: "PUT",
        headers: {
          ...baseHeaders,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });
      if (!response.ok) throw new Error("Failed to update task");
      return response.json();
    },

    delete: async (id: number): Promise<void> => {
      const response = await fetch(`${API_BASE_URL}/api/v1/tasks/${id}`, {
        method: "DELETE",
        headers: baseHeaders,
      });
      if (!response.ok) throw new Error("Failed to delete task");
    },
  };
};
