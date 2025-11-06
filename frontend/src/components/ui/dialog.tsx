// Minimal fallback dialog (no external deps). For real usage, replace with @radix-ui/react-dialog.
"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

export function Dialog({ open, onOpenChange, children }: { open: boolean; onOpenChange: (v: boolean) => void; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40" onClick={() => onOpenChange(false)}>
      <div className={cn("w-full max-w-md rounded-lg bg-background p-4 shadow-lg")} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

export function DialogContent({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-3">{children}</div>;
}

export function DialogHeader({ children }: { children: React.ReactNode }) {
  return <div className="mb-1">{children}</div>;
}

export function DialogTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-lg font-semibold leading-none tracking-tight">{children}</h3>;
}

export function DialogDescription({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-muted-foreground">{children}</p>;
}

