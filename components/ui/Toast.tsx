"use client";

import * as React from "react";
import { CheckCircle, XCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export type ToastVariant = "success" | "error" | "info";

export interface ToastProps {
  message: string;
  variant?: ToastVariant;
  onClose?: () => void;
  visible?: boolean;
}

const variantStyles: Record<ToastVariant, string> = {
  success: "bg-emerald text-white",
  error: "bg-red-500 text-white",
  info: "bg-ink/90 text-white",
};

const icons: Record<ToastVariant, React.ReactNode> = {
  success: <CheckCircle className="h-5 w-5" />,
  error: <XCircle className="h-5 w-5" />,
  info: <Info className="h-5 w-5" />,
};

export function Toast({
  message,
  variant = "success",
  onClose,
  visible = true,
}: ToastProps) {
  if (!visible) return null;

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-[100] flex items-center gap-3 rounded-lg px-4 py-3 shadow-lg animate-slide-up",
        variantStyles[variant]
      )}
      role="alert"
    >
      {icons[variant]}
      <span className="text-sm font-medium">{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-2 hover:opacity-80 transition-opacity"
          aria-label="Закрыть"
        >
          ×
        </button>
      )}
    </div>
  );
}
