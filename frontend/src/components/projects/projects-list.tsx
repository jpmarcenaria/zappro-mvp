"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { useProjects, ProjectRecord } from "@/hooks/use-projects";

import ProjectCard from "./project-card";
import ProjectForm from "./project-form";
import { KanbanBoard } from "@/components/tasks/kanban-board";

export default function ProjectsList() {
  const { isAuthenticated } = useAuth();
  const { projects, isLoading, error } = useProjects();
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectRecord | null>(null);
  const [tasksProject, setTasksProject] = useState<ProjectRecord | null>(null);

  if (!isAuthenticated) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">
            Faça login para visualizar e gerenciar seus projetos.
          </p>
        </CardContent>
      </Card>
    );
  }

  const handleNewProject = () => {
    setEditingProject(null);
    setShowForm(true);
  };

  const handleEdit = (project: ProjectRecord) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProject(null);
  };

  const handleViewTasks = (project: ProjectRecord) => {
    setTasksProject(project);
    setShowForm(false);
  };

  const handleBackFromTasks = () => {
    setTasksProject(null);
  };

  if (tasksProject) {
    return (
      <KanbanBoard
        projectId={tasksProject.id}
        projectName={tasksProject.name}
        onBack={handleBackFromTasks}
      />
    );
  }

  if (showForm) {
    return <ProjectForm project={editingProject} onClose={handleCloseForm} />;
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Meus Projetos</h2>
          <p className="text-sm text-muted-foreground">
            Cadastre, edite e acompanhe seus projetos ativos.
          </p>
        </div>
        <Button onClick={handleNewProject}>Novo Projeto</Button>
      </div>

      {isLoading && <p>Carregando projetos...</p>}
      {error && <p className="text-red-600">Erro: {error}</p>}

      {!isLoading && projects.length === 0 && (
        <Card>
          <CardContent className="p-6 text-center space-y-3">
            <p className="text-muted-foreground">Nenhum projeto encontrado.</p>
            <Button onClick={handleNewProject}>Criar primeiro projeto</Button>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onEdit={handleEdit}
            onViewTasks={handleViewTasks}
          />
        ))}
      </div>
    </section>
  );
}
