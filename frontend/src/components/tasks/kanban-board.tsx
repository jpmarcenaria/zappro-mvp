"use client";

import { useMemo, useState, type DragEvent } from "react";

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
import { Textarea } from "@/components/ui/textarea";
import { useTasks } from "@/hooks/use-tasks";
import { cn } from "@/lib/utils";

import type { TaskRecord, TaskStatus } from "@/lib/api-client";

const STATUS_COLUMNS: Record<TaskStatus, { title: string; color: string }> = {
  todo: { title: "A Fazer", color: "bg-blue-50 border-blue-200" },
  in_progress: { title: "Em andamento", color: "bg-yellow-50 border-yellow-200" },
  done: { title: "Concluído", color: "bg-green-50 border-green-200" },
};

type KanbanBoardProps = {
  projectId: number;
  projectName: string;
  onBack: () => void;
};

type NewTaskFormState = {
  title: string;
  description: string;
  status: TaskStatus;
};

export function KanbanBoard({ projectId, projectName, onBack }: KanbanBoardProps) {
  const { tasks, isLoading, error, createTask, updateTask, deleteTask, isCreating, isUpdating } =
    useTasks(projectId);

  const [showForm, setShowForm] = useState(false);
  const [formState, setFormState] = useState<NewTaskFormState>({
    title: "",
    description: "",
    status: "todo",
  });
  const [draggedTaskId, setDraggedTaskId] = useState<number | null>(null);
  const [dragOverStatus, setDragOverStatus] = useState<TaskStatus | null>(null);

  const groupedTasks = useMemo(() => {
    return tasks.reduce<Record<TaskStatus, TaskRecord[]>>(
      (acc, task) => {
        acc[task.status] = acc[task.status] ? [...acc[task.status], task] : [task];
        return acc;
      },
      { todo: [], in_progress: [], done: [] }
    );
  }, [tasks]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await createTask({
        project_id: projectId,
        title: formState.title,
        description: formState.description || undefined,
        status: formState.status,
      });
      setFormState({ title: "", description: "", status: "todo" });
      setShowForm(false);
    } catch (submissionError) {
      const message =
        submissionError instanceof Error ? submissionError.message : "Erro ao criar tarefa";
      window.alert(message);
    }
  };

  const handleStatusChange = async (taskId: number, status: TaskStatus) => {
    try {
      await updateTask({ id: taskId, updates: { status } });
    } catch (updateError) {
      const message = updateError instanceof Error ? updateError.message : "Erro ao mover tarefa";
      window.alert(message);
    }
  };

  const handleDragStart = (event: DragEvent<HTMLDivElement>, task: TaskRecord) => {
    event.dataTransfer.setData("text/plain", String(task.id));
    event.dataTransfer.effectAllowed = "move";
    setDraggedTaskId(task.id);
  };

  const handleDragEnd = () => {
    setDraggedTaskId(null);
    setDragOverStatus(null);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>, status: TaskStatus) => {
    if (!draggedTaskId) {
      return;
    }
    event.preventDefault();
    if (dragOverStatus !== status) {
      setDragOverStatus(status);
    }
  };

  const handleDragLeave = (status: TaskStatus) => {
    if (dragOverStatus === status) {
      setDragOverStatus(null);
    }
  };

  const handleDrop = async (
    event: DragEvent<HTMLDivElement>,
    status: TaskStatus,
  ) => {
    if (!draggedTaskId) {
      return;
    }
    event.preventDefault();

    const task = tasks.find((item) => item.id === draggedTaskId);
    if (task && task.status !== status) {
      await handleStatusChange(task.id, status);
    }

    setDraggedTaskId(null);
    setDragOverStatus(null);
  };

  const handleDelete = async (taskId: number) => {
    if (!window.confirm("Deseja excluir esta tarefa?")) {
      return;
    }
    try {
      await deleteTask(taskId);
    } catch (deleteError) {
      const message = deleteError instanceof Error ? deleteError.message : "Erro ao excluir tarefa";
      window.alert(message);
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold">Tarefas — {projectName}</h2>
          <p className="text-sm text-muted-foreground">
            Organize o fluxo de trabalho movendo tarefas entre colunas.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onBack}>
            Voltar aos projetos
          </Button>
          <Button onClick={() => setShowForm((prev) => !prev)}>
            {showForm ? "Cancelar" : "Nova tarefa"}
          </Button>
        </div>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Criar tarefa</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="task-title">Título</Label>
                <Input
                  id="task-title"
                  value={formState.title}
                  onChange={(event) => setFormState((state) => ({ ...state, title: event.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="task-description">Descrição</Label>
                <Textarea
                  id="task-description"
                  value={formState.description}
                  onChange={(event) =>
                    setFormState((state) => ({ ...state, description: event.target.value }))
                  }
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label>Status inicial</Label>
                <div className="flex gap-2 flex-wrap">
                  {(Object.keys(STATUS_COLUMNS) as TaskStatus[]).map((status) => (
                    <Badge
                      key={status}
                      variant={formState.status === status ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setFormState((state) => ({ ...state, status }))}
                    >
                      {STATUS_COLUMNS[status].title}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="submit" disabled={isCreating} className="flex-1">
                  {isCreating ? "Criando..." : "Criar tarefa"}
                </Button>
                <Button type="button" variant="outline" className="flex-1" onClick={() => setShowForm(false)}>
                  Fechar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {error && <p className="text-red-600">Erro: {error}</p>}
      {isLoading ? (
        <p>Carregando tarefas...</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          {(Object.keys(STATUS_COLUMNS) as TaskStatus[]).map((status) => (
            <Card
              key={status}
              className={cn(
                STATUS_COLUMNS[status].color,
                "transition-colors",
                dragOverStatus === status
                  ? "border-primary ring-2 ring-primary/40"
                  : "",
              )}
              onDragOver={(event) => handleDragOver(event, status)}
              onDragEnter={(event) => handleDragOver(event, status)}
              onDragLeave={() => handleDragLeave(status)}
              onDrop={(event) => handleDrop(event, status)}
            >
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  {STATUS_COLUMNS[status].title} ({groupedTasks[status]?.length ?? 0})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {(groupedTasks[status] ?? []).map((task) => (
                  <Card
                    key={task.id}
                    className="shadow-sm"
                    draggable
                    onDragStart={(event) => handleDragStart(event, task)}
                    onDragEnd={handleDragEnd}
                  >
                    <CardContent className="space-y-2 p-3">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-medium text-sm leading-tight">{task.title}</h3>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-xs"
                          onClick={() => handleDelete(task.id)}
                          disabled={isUpdating}
                        >
                          Excluir
                        </Button>
                      </div>
                      {task.description && (
                        <p className="text-xs text-muted-foreground whitespace-pre-wrap">
                          {task.description}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-1">
                        {(Object.keys(STATUS_COLUMNS) as TaskStatus[])
                          .filter((candidate) => candidate !== status)
                          .map((candidate) => (
                            <Button
                              key={candidate}
                              size="sm"
                              variant="outline"
                              className="text-xs"
                              onClick={() => handleStatusChange(task.id, candidate)}
                              disabled={isUpdating}
                            >
                              → {STATUS_COLUMNS[candidate].title}
                            </Button>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
