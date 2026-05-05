'use client';

import { useRef, useEffect } from 'react';
import { AlertTriangle, XCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ConfirmActionDialogProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel?: string;
  variant: 'danger' | 'warning';
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  children?: React.ReactNode;
}

export function ConfirmActionDialog({
  open,
  title,
  description,
  confirmLabel,
  cancelLabel = 'Отмена',
  variant,
  loading = false,
  onConfirm,
  onCancel,
  children,
}: ConfirmActionDialogProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onCancel]);

  if (!open) return null;

  const Icon = variant === 'danger' ? XCircle : AlertTriangle;
  const iconCls =
    variant === 'danger' ? 'text-red-500 bg-red-50' : 'text-amber-500 bg-amber-50';
  const confirmCls =
    variant === 'danger'
      ? 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
      : 'bg-amber-500 text-white hover:bg-amber-600 focus:ring-amber-400';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cad-title"
    >
      {/* Backdrop */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/50"
        onClick={onCancel}
      />

      {/* Panel */}
      <div className="relative z-10 mx-4 w-full max-w-md rounded-modal border border-gray-200 bg-white shadow-lg">
        <button
          onClick={onCancel}
          className="absolute right-4 top-4 rounded-input p-1 text-gray-400 hover:text-gray-600"
          aria-label="Закрыть"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className={cn('flex-shrink-0 rounded-full p-2', iconCls)}>
              <Icon className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 id="cad-title" className="text-base font-semibold text-gray-900">
                {title}
              </h2>
              <p className="mt-1 text-sm text-gray-500">{description}</p>
            </div>
          </div>

          {children && <div className="mt-4">{children}</div>}
        </div>

        <div className="flex flex-col-reverse gap-2 border-t border-gray-100 px-6 py-4 sm:flex-row sm:justify-end">
          <button
            onClick={onCancel}
            disabled={loading}
            className="rounded-input border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={cn(
              'rounded-input px-4 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50',
              confirmCls,
            )}
          >
            {loading ? 'Подождите...' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
