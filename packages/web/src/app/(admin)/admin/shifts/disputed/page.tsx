'use client';

import { useCallback, useEffect, useState } from 'react';
import { apiClient, ApiError } from '@/lib/api/client';
import { useToast } from '@/components/ui/toast-context';
import { AdminEmptyState } from '@/components/admin/AdminEmptyState';
import { ChevronLeft, ChevronRight, Swords, X } from 'lucide-react';

interface ShiftBooking {
  linkedVacancy: { id: string; title: string; dateStart: string } | null;
  worker: { id: string; firstName: string; lastName: string; photoUrl: string | null } | null;
  employer: { id: string; companyName: string | null; contactName: string | null } | null;
}

interface DisputedShift {
  id: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  booking: ShiftBooking | null;
}

type Outcome = 'WORKER_FAULT' | 'EMPLOYER_FAULT' | 'MUTUAL';

const OUTCOME_LABELS: Record<Outcome, string> = {
  WORKER_FAULT: 'Вина работника',
  EMPLOYER_FAULT: 'Вина работодателя',
  MUTUAL: 'Взаимная вина',
};

export default function AdminDisputedShiftsPage() {
  const { toast } = useToast();
  const [shifts, setShifts] = useState<DisputedShift[]>([]);
  const [meta, setMeta] = useState({ page: 1, totalPages: 1, total: 0 });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // Resolve modal state
  const [selected, setSelected] = useState<DisputedShift | null>(null);
  const [outcome, setOutcome] = useState<Outcome>('MUTUAL');
  const [note, setNote] = useState('');
  const [resolving, setResolving] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    void apiClient
      .get<{ data: DisputedShift[]; meta: typeof meta }>('/admin/shifts', { status: 'DISPUTED', page })
      .then((r) => {
        setShifts(r.data);
        if (r.meta) setMeta(r.meta);
      })
      .catch(() => toast('Ошибка загрузки', 'error'))
      .finally(() => setLoading(false));
  }, [page, toast]);

  useEffect(() => {
    void load();
  }, [load]);

  const handleResolve = async () => {
    if (!selected) return;
    setResolving(true);
    try {
      await apiClient.patch(`/admin/shifts/${selected.id}/resolve`, { outcome, note: note || undefined });
      toast('Спор разрешён', 'success');
      setSelected(null);
      setNote('');
      setOutcome('MUTUAL');
      void load();
    } catch (e) {
      toast(e instanceof ApiError ? e.message : 'Ошибка', 'error');
    } finally {
      setResolving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-white">Спорные смены</h1>
          <p className="mt-1 text-sm text-white/50">
            Смены со статусом DISPUTED, требующие административного решения
          </p>
        </div>
        <span className="rounded-full bg-amber-500/20 px-3 py-1 text-sm font-medium text-amber-300">
          {meta.total} споров
        </span>
      </div>

      <div className="overflow-x-auto rounded-input border border-white/10 bg-white/[0.04]">
        <table className="w-full min-w-[700px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-xs font-medium uppercase tracking-wider text-white/50">
              <th className="px-4 py-3">Работник</th>
              <th className="px-4 py-3">Работодатель</th>
              <th className="px-4 py-3">Вакансия</th>
              <th className="px-4 py-3">Дата смены</th>
              <th className="px-4 py-3">Действие</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-white/50">
                  Загрузка…
                </td>
              </tr>
            )}
            {!loading && shifts.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-4">
                  <AdminEmptyState
                    icon={Swords}
                    title="Спорных смен нет"
                    description="Все конфликты разрешены"
                  />
                </td>
              </tr>
            )}
            {!loading &&
              shifts.map((s) => (
                <tr
                  key={s.id}
                  className="border-b border-white/[0.05] text-white/90 transition-colors hover:bg-white/[0.05]"
                >
                  <td className="px-4 py-3 text-sm">
                    {s.booking?.worker
                      ? `${s.booking.worker.firstName} ${s.booking.worker.lastName}`.trim()
                      : '—'}
                  </td>
                  <td className="px-4 py-3 text-sm text-white/70">
                    {s.booking?.employer?.companyName ?? s.booking?.employer?.contactName ?? '—'}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {s.booking?.linkedVacancy?.title ?? '—'}
                  </td>
                  <td className="px-4 py-3 text-xs text-white/60 whitespace-nowrap">
                    {s.booking?.linkedVacancy?.dateStart
                      ? new Date(s.booking.linkedVacancy.dateStart).toLocaleDateString('ru-RU')
                      : '—'}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => { setSelected(s); setOutcome('MUTUAL'); setNote(''); }}
                      className="rounded-input border border-amber-400/40 bg-amber-500/10 px-3 py-1.5 text-xs font-medium text-amber-300 hover:bg-amber-500/20"
                    >
                      Разрешить
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-end gap-2 text-sm text-white/70">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="rounded p-1 hover:bg-white/10 disabled:opacity-30"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span>{page} / {meta.totalPages || 1}</span>
        <button
          type="button"
          disabled={page >= (meta.totalPages || 1)}
          onClick={() => setPage((p) => p + 1)}
          className="rounded p-1 hover:bg-white/10 disabled:opacity-30"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Resolve Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-modal border border-white/10 bg-[#122a1e] p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Разрешить спор</h2>
              <button
                onClick={() => setSelected(null)}
                className="rounded-full p-1 text-white/40 hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-1 rounded-input bg-white/[0.04] p-3 text-sm text-white/70">
              <p><span className="text-white/40">Работник: </span>
                {selected.booking?.worker ? `${selected.booking.worker.firstName} ${selected.booking.worker.lastName}` : '—'}
              </p>
              <p><span className="text-white/40">Работодатель: </span>
                {selected.booking?.employer?.companyName ?? selected.booking?.employer?.contactName ?? '—'}
              </p>
              <p><span className="text-white/40">Вакансия: </span>
                {selected.booking?.linkedVacancy?.title ?? '—'}
              </p>
            </div>

            <div className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-medium text-white/50 mb-2">Решение</label>
                <div className="grid grid-cols-1 gap-2">
                  {(Object.keys(OUTCOME_LABELS) as Outcome[]).map((o) => (
                    <label key={o} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="outcome"
                        value={o}
                        checked={outcome === o}
                        onChange={() => setOutcome(o)}
                        className="h-4 w-4 accent-primary-500"
                      />
                      <span className={`text-sm ${
                        o === 'WORKER_FAULT' ? 'text-red-300' :
                        o === 'EMPLOYER_FAULT' ? 'text-amber-300' :
                        'text-white/80'
                      }`}>
                        {OUTCOME_LABELS[o]}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-white/50 mb-1">
                  Комментарий (необязательно)
                </label>
                <textarea
                  rows={3}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full rounded-input border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary-400"
                  placeholder="Причина решения..."
                />
              </div>
            </div>

            <div className="mt-5 flex gap-3">
              <button
                onClick={() => void handleResolve()}
                disabled={resolving}
                className="flex-1 rounded-input bg-primary-500 py-2 text-sm font-semibold text-white hover:bg-primary-600 disabled:opacity-60"
              >
                {resolving ? 'Применяем...' : 'Применить решение'}
              </button>
              <button
                onClick={() => setSelected(null)}
                className="rounded-input border border-white/15 px-4 py-2 text-sm font-medium text-white/70 hover:border-white/25 hover:text-white"
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
