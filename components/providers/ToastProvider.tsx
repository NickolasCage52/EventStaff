"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { Toast, ToastVariant } from "@/components/ui/Toast";

interface ToastContextType {
  showToast: (message: string, variant?: ToastVariant) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<{
    message: string;
    variant: ToastVariant;
    visible: boolean;
  } | null>(null);

  const showToast = useCallback((message: string, variant: ToastVariant = "success") => {
    setToast({ message, variant, visible: true });
    setTimeout(() => {
      setToast((t) => (t ? { ...t, visible: false } : null));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <Toast
          message={toast.message}
          variant={toast.variant}
          visible={toast.visible}
        />
      )}
    </ToastContext.Provider>
  );
}
