"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import LoginForm from "@/components/auth/login-form";
import RegisterForm from "@/components/auth/register-form";
import { useAuth } from "@/hooks/use-auth";

export default function AuthLayout() {
  const [isLogin, setIsLogin] = useState(true);
  const { user, isAuthenticated, logout } = useAuth();

  if (isAuthenticated && user) {
    return (
      <div className="space-y-4 rounded border p-6">
        <h2 className="text-xl font-semibold">Bem-vindo, {user.name ?? user.email}!</h2>
        <p className="text-sm text-muted-foreground">
          Email: {user.email} • Perfil: {user.role ?? "-"}
        </p>
        <Button variant="outline" onClick={logout}>
          Sair
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-center gap-2">
        <Button
          variant={isLogin ? "default" : "ghost"}
          onClick={() => setIsLogin(true)}
        >
          Login
        </Button>
        <Button
          variant={!isLogin ? "default" : "ghost"}
          onClick={() => setIsLogin(false)}
        >
          Registro
        </Button>
      </div>
      {isLogin ? <LoginForm /> : <RegisterForm />}
    </div>
  );
}

