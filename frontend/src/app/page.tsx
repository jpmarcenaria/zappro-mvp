import Link from "next/link";
import { Button } from "@/components/ui/button";
import HealthCheck from "@/components/health-check";
import StoresExample from "@/components/stores-example";
import UIDemo from "@/components/ui-demo";
import AuthLayout from "@/components/auth/auth-layout";
import ProjectsList from "@/components/projects/projects-list";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex max-w-4xl flex-col gap-6 px-6 py-20">
        <span className="text-sm uppercase tracking-wide text-muted-foreground">
          ZapPro
        </span>
        <h1 className="text-4xl font-semibold sm:text-5xl">
          Plataforma unificada para obras e facilities
        </h1>
        <p className="text-lg text-muted-foreground">
          Acompanhe equipes, materiais e fluxos assistidos por IA em um único
          lugar. Este projeto está na Fase 0; utilize os comandos do README
          para iniciar o backend FastAPI e o frontend Next.js.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href="/health">Verificar saúde do frontend</Link>
          </Button>
          <Button variant="outline" asChild size="lg">
            <Link href="http://localhost:8000/health">Verificar API (localhost)</Link>
          </Button>
        </div>
        <div className="mt-8">
          <HealthCheck />
        </div>
        <div className="mt-8">
          <AuthLayout />
        </div>
        <div className="mt-8">
          <ProjectsList />
        </div>
        <div className="mt-8">
          <StoresExample />
        </div>
        <div className="mt-8">
          <UIDemo />
        </div>
      </section>
    </main>
  );
}
