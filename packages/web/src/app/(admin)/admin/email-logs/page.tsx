'use client';

import { useCallback, useEffect, useState } from 'react';
import { apiClient, ApiError } from '@/lib/api/client';
import { useToast } from '@/components/ui/toast-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail } from 'lucide-react';
import { AdminEmptyState } from '@/components/admin/AdminEmptyState';

interface EmailLogRow {
  id: string;
  to: string;
  type: string;
  status: string;
  errorText: string | null;
  createdAt: string;
  subject: string;
}

interface Meta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

function maskTo(email: string): string {
  const at = email.indexOf('@');
  if (at <= 0) return '—';
  const local = email.slice(0, at);
  const domain = email.slice(at + 1);
  return `${local.slice(0, 2)}***@${domain}`;
}

export default function AdminEmailLogsPage() {
  const { toast } = useToast();
  const [rows, setRows] = useState<EmailLogRow[]>([]);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<string>('');
  const [type, setType] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [retrying, setRetrying] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiClient.get<{ data: EmailLogRow[]; meta: Meta }>('/admin/email-logs', {
        page,
        ...(status ? { status } : {}),
        ...(type.trim() ? { type: type.trim() } : {}),
        ...(dateFrom ? { dateFrom: `${dateFrom}T00:00:00.000Z` } : {}),
        ...(dateTo ? { dateTo: `${dateTo}T23:59:59.999Z` } : {}),
      });
      setRows(res.data);
      setMeta(res.meta);
    } catch (e) {
      if (e instanceof ApiError && e.status === 403) {
        toast('Нет доступа', 'error');
      } else {
        toast('Не удалось загрузить логи', 'error');
      }
    } finally {
      setLoading(false);
    }
  }, [page, status, type, dateFrom, dateTo, toast]);

  useEffect(() => {
    void load();
  }, [load]);

  const retry = async (id: string) => {
    setRetrying(id);
    try {
      await apiClient.post(`/admin/email-logs/${id}/retry`);
      toast('Письмо поставлено в очередь', 'success');
      await load();
    } catch {
      toast('Не удалось повторить отправку', 'error');
    } finally {
      setRetrying(null);
    }
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-white">Журнал email</h1>
      <p className="mt-1 text-sm text-white/50">Отправки через Resend, статусы и ошибки.</p>

      <div className="mt-6 flex flex-wrap items-end gap-3 rounded-input border border-white/10 bg-white/[0.04] p-4">
        <div>
          <label className="text-xs text-white/50">Статус</label>
          <select
            className="mt-1 block w-40 rounded-input border border-white/15 bg-white/5 px-2 py-2 text-sm text-white"
            value={status}
            onChange={(e) => {
              setPage(1);
              setStatus(e.target.value);
            }}
          >
            <option value="" className="bg-gray-900">Все</option>
            <option value="PENDING" className="bg-gray-900">PENDING</option>
            <option value="SENT" className="bg-gray-900">SENT</option>
            <option value="FAILED" className="bg-gray-900">FAILED</option>
            <option value="BOUNCED" className="bg-gray-900">BOUNCED</option>
          </select>
        </div>
        <div>
          <label className="text-xs text-white/50">Тип (enum)</label>
          <Input
            className="mt-1 w-48 border-white/15 bg-white/5 text-white placeholder:text-white/30"
            placeholder="APPLICATION_RECEIVED"
            value={type}
            onChange={(e) => {
              setPage(1);
              setType(e.target.value);
            }}
          />
        </div>
        <div>
          <label className="text-xs text-white/50">Дата с</label>
          <Input
            type="date"
            className="mt-1 w-40 border-white/15 bg-white/5 text-white"
            value={dateFrom}
            onChange={(e) => {
              setPage(1);
              setDateFrom(e.target.value);
            }}
          />
        </div>
        <div>
          <label className="text-xs text-white/50">Дата по</label>
          <Input
            type="date"
            className="mt-1 w-40 border-white/15 bg-white/5 text-white"
            value={dateTo}
            onChange={(e) => {
              setPage(1);
              setDateTo(e.target.value);
            }}
          />
        </div>
        <Button type="button" variant="outline" onClick={() => void load()} disabled={loading}>
          Обновить
        </Button>
      </div>

      <div className="mt-6 overflow-x-auto rounded-input border border-white/10 bg-white/[0.04]">
        <table className="min-w-full divide-y divide-white/[0.06] text-sm">
          <thead>
            <tr className="border-b border-white/[0.06]">
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-white/50">Дата</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-white/50">Получатель</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-white/50">Тип</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-white/50">Статус</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-white/50">Ошибка</th>
              <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-white/50">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-white/50">
                  Загрузка…
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-4">
                  <AdminEmptyState icon={Mail} title="Записей нет" description="Email-логи появятся здесь после первой отправки" />
                </td>
              </tr>
            ) : (
              rows.map((r) => (
                <tr key={r.id} className="transition-colors hover:bg-white/[0.04]">
                  <td className="whitespace-nowrap px-4 py-3 text-white/60">
                    {new Date(r.createdAt).toLocaleString('ru-RU')}
                  </td>
                  <td className="px-4 py-3 text-white/80">{maskTo(r.to)}</td>
                  <td className="px-4 py-3 font-mono text-xs text-white/70">{r.type}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        r.status === 'SENT'
                          ? 'bg-green-500/20 text-green-300'
                          : r.status === 'FAILED'
                            ? 'bg-red-500/20 text-red-300'
                            : 'bg-white/[0.08] text-white/60'
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="max-w-xs truncate px-4 py-3 text-white/50" title={r.errorText ?? ''}>
                    {r.errorText ?? '—'}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-right">
                    {r.status === 'FAILED' ? (
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        disabled={retrying === r.id}
                        onClick={() => void retry(r.id)}
                      >
                        {retrying === r.id ? '…' : 'Retry'}
                      </Button>
                    ) : (
                      '—'
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {meta && meta.totalPages > 1 ? (
        <div className="mt-4 flex items-center justify-between text-sm text-white/60">
          <span>
            Стр. {meta.page} из {meta.totalPages} ({meta.total} записей)
          </span>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Назад
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={page >= meta.totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Вперёд
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
