"use client";

import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProjects, ProjectRecord } from "@/hooks/use-projects";

type ProjectFormProps = {
  project?: ProjectRecord | null;
  onClose: () => void;
};

const statuses: { value: ProjectRecord["status"]; label: string }[] = [
  { value: "planning", label: "Planejamento" },
  { value: "active", label: "Ativo" },
  { value: "completed", label: "Concluído" },
  { value: "paused", label: "Pausado" },
];

export default function ProjectForm({ project, onClose }: ProjectFormProps) {
  const { createProject, updateProject, isCreating, isUpdating } = useProjects();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "planning" as ProjectRecord["status"],
  });

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name,
        description: project.description ?? "",
        status: project.status,
      });
    }
  }, [project]);

  const isLoading = isCreating || isUpdating;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (project) {
        await updateProject({ id: project.id, updates: formData });
      } else {
        await createProject(formData);
      }
      onClose();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro ao salvar projeto";
      window.alert(message);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{project ? "Editar Projeto" : "Novo Projeto"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="project-name">Nome</Label>
            <Input
              id="project-name"
              value={formData.name}
              onChange={(event) =>
                setFormData((state) => ({ ...state, name: event.target.value }))
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="project-description">Descrição</Label>
            <Input
              id="project-description"
              value={formData.description}
              onChange={(event) =>
                setFormData((state) => ({ ...state, description: event.target.value }))
              }
              placeholder="Opcional"
            />
          </div>
          <div className="space-y-2">
            <Label>Status</Label>
            <div className="flex flex-wrap gap-2">
              {statuses.map((status) => (
                <Badge
                  key={status.value}
                  variant={formData.status === status.value ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() =>
                    setFormData((state) => ({ ...state, status: status.value }))
                  }
                >
                  {status.label}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <Button type="submit" className="flex-1" disabled={isLoading}>
              {isLoading ? "Salvando..." : "Salvar"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onClose}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

