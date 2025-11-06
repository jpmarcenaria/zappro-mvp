"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";

const roles = [
  { value: "operador", label: "Operador" },
  { value: "gestor", label: "Gestor" },
  { value: "admin", label: "Administrador" },
];

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    role: "operador",
  });
  const { register, registerLoading, registerError } = useAuth();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await register(formData);
    } catch {
      // handled by registerError state
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Registro ZapPro</CardTitle>
        <CardDescription>
          Crie sua conta para acessar a plataforma.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="register-name">Nome</Label>
            <Input
              id="register-name"
              value={formData.name}
              onChange={(event) =>
                setFormData((state) => ({ ...state, name: event.target.value }))
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="register-email">Email</Label>
            <Input
              id="register-email"
              type="email"
              value={formData.email}
              onChange={(event) =>
                setFormData((state) => ({ ...state, email: event.target.value }))
              }
              autoComplete="email"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="register-password">Senha</Label>
            <Input
              id="register-password"
              type="password"
              value={formData.password}
              onChange={(event) =>
                setFormData((state) => ({ ...state, password: event.target.value }))
              }
              autoComplete="new-password"
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Perfil</Label>
            <div className="flex flex-wrap gap-2">
              {roles.map((role) => (
                <Badge
                  key={role.value}
                  variant={formData.role === role.value ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() =>
                    setFormData((state) => ({ ...state, role: role.value }))
                  }
                >
                  {role.label}
                </Badge>
              ))}
            </div>
          </div>
          {registerError && (
            <p className="text-sm text-red-600" role="alert">
              {registerError}
            </p>
          )}
          <Button type="submit" className="w-full" disabled={registerLoading}>
            {registerLoading ? "Criando conta..." : "Criar conta"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
