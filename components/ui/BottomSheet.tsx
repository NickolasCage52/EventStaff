"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function BottomSheet({
  open,
  onClose,
  title,
  children,
}: BottomSheetProps) {
  useEffect(() => {
    if (!open) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-ink/50 transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet */}
      <div
        className={cn(
          "fixed z-50 bg-white transition-transform duration-300 ease-out flex flex-col",
          "inset-x-0 bottom-0 rounded-t-2xl max-h-[80vh] overflow-y-auto",
          "md:inset-auto md:left-1/2 md:top-1/2 md:rounded-2xl md:max-w-xl md:w-full md:max-h-[90vh] md:mx-4",
          open
            ? "translate-y-0 md:translate-x-[-50%] md:translate-y-[-50%]"
            : "translate-y-full md:translate-x-[-50%] md:translate-y-[-50%] md:opacity-0 md:pointer-events-none"
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "bottom-sheet-title" : undefined}
      >
        {/* Drag handle (mobile) */}
        <div className="flex justify-center pt-3 pb-1 md:hidden flex-shrink-0">
          <div className="w-10 h-1 rounded-full bg-mist" aria-hidden="true" />
        </div>

        {title && (
          <h2
            id="bottom-sheet-title"
            className="font-display text-xl font-medium text-ink px-6 pb-4 md:pt-6 md:pb-4"
          >
            {title}
          </h2>
        )}

        <div className="px-6 pb-6 md:pb-8">{children}</div>
      </div>
    </>
  );
}
