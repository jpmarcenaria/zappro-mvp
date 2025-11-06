"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useProjects, ProjectRecord } from "@/hooks/use-projects";

const statusColors: Record<ProjectRecord["status"], string> = {
  planning: "bg-blue-100 text-blue-800",
  active: "bg-green-100 text-green-800",
  completed: "bg-gray-100 text-gray-800",
  paused: "bg-yellow-100 text-yellow-800",
};

const statusLabels: Record<ProjectRecord["status"], string> = {
  planning: "Planejamento",
  active: "Ativo",
  completed: "Concluído",
  paused: "Pausado",
};

type ProjectCardProps = {
  project: ProjectRecord;
  onEdit: (project: ProjectRecord) => void;
  onViewTasks: (project: ProjectRecord) => void;
};

export default function ProjectCard({ project, onEdit, onViewTasks }: ProjectCardProps) {
  const { deleteProject, isDeleting } = useProjects();

  const handleDelete = async () => {
    const confirmed = window.confirm("Tem certeza que deseja excluir este projeto?");
    if (!confirmed) {
      return;
    }

    try {
      await deleteProject(project.id);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro ao excluir projeto";
      window.alert(message);
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex justify-between gap-3">
          <div className="space-y-1">
            <CardTitle className="text-lg">{project.name}</CardTitle>
            <CardDescription>{project.description || "Sem descrição"}</CardDescription>
          </div>
          <Badge className={statusColors[project.status]}>{statusLabels[project.status]}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">
          Criado em {new Date(project.created_at).toLocaleDateString("pt-BR")}
        </p>
        <div className="flex gap-2 justify-end">
          <Button size="sm" onClick={() => onViewTasks(project)}>
            Ver tarefas
          </Button>
          <Button size="sm" variant="outline" onClick={() => onEdit(project)}>
            Editar
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Excluindo..." : "Excluir"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
