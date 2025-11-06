import * as React from "react";
import { cn } from "@/lib/utils";

function Avatar({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <div className={cn("inline-flex size-10 items-center justify-center overflow-hidden rounded-full bg-muted", className)}>
      {children}
    </div>
  );
}

function AvatarFallback({ children }: { children?: React.ReactNode }) {
  return <span className="text-sm font-medium text-muted-foreground">{children}</span>;
}

export { Avatar, AvatarFallback };

