// Minimal sheet (side panel) implementation without external deps.
"use client";
import * as React from "react";

export function Sheet({ open, onOpenChange, side = "right", children }: { open: boolean; onOpenChange: (v: boolean) => void; side?: "left" | "right" | "top" | "bottom"; children: React.ReactNode }) {
  if (!open) return null;
  const base = "fixed z-50 bg-background shadow-lg";
  const pos = side === "right" ? "inset-y-0 right-0 w-80" : side === "left" ? "inset-y-0 left-0 w-80" : side === "top" ? "inset-x-0 top-0 h-64" : "inset-x-0 bottom-0 h-64";
  return (
    <div className="fixed inset-0 z-40" onClick={() => onOpenChange(false)}>
      <div className={`${base} ${pos}`} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

