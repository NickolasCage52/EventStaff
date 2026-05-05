'use client';

import { useNetworkStore } from '@/stores/networkStore';
import { WifiOff, X } from 'lucide-react';

export function NetworkErrorBanner() {
  const { hasError, setError } = useNetworkStore();
  if (!hasError) return null;
  return (
    <div
      role="alert"
      aria-live="assertive"
      className="fixed left-0 right-0 top-0 z-[9999] flex items-center justify-between gap-3 bg-amber-500 px-4 py-2.5 text-sm font-medium text-amber-950 shadow-lg"
    >
      <div className="flex items-center gap-2">
        <WifiOff className="h-4 w-4 shrink-0" />
        <span>Нет соединения с сервером. Проверьте подключение к интернету.</span>
      </div>
      <button
        onClick={() => setError(false)}
        aria-label="Закрыть"
        className="shrink-0 rounded-full p-1 hover:bg-amber-600/20"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
