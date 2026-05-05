'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api/client';
import { useToast } from '@/components/ui/toast-context';
import {
  User,
  Briefcase,
  Calendar,
  CheckCircle,
  Clock,
  AlertTriangle,
  Star,
  ChevronLeft,
  ChevronRight,
  CreditCard,
} from 'lucide-react';

// ─── Types ─────────────────────────────────────────────────────────────────

interface ShiftWorker {
  id: string;
  firstName: string;
  lastName: string;
  photoUrl: string | null;
}

interface ShiftBooking {
  date?: string | null;
  location?: string | null;
  rate?: number | null;
  linkedVacancy?: { id: string; title: string; dateStart?: string } | null;
  worker?: ShiftWorker | null;
}

interface ShiftPayment {
  id: string;
  status: string;
  amount: number;
}

interface ShiftReview {
  id: string;
  reviewerId: string;
}

interface Shift {
  id: string;
  status: string;
  workerConfirmed: boolean;
  employerConfirmed: boolean;
  completedAt?: string | null;
  booking: ShiftBooking;
  reviews: ShiftReview[];
  payments: ShiftPayment[];
}

interface Meta {
  total: number;
  page: number;
  totalPages: number;
}

// ─── Review Modal ───────────────────────────────────────────────────────────

const REVIEW_CRITERIA: { key: keyof ReviewScores; label: string }[] = [
  { key: 'punctuality', label: 'Пунктуальность' },
  { key: 'jobMatch', label: 'Соответствие требованиям' },
  { key: 'communication', label: 'Коммуникация' },
  { key: 'workQuality', label: 'Качество работы' },
  { key: 'termsCompliance', label: 'Соблюдение договорённостей' },
];

interface ReviewScores {
  punctuality: number;
  jobMatch: number;
  communication: number;
  workQuality: number;
  termsCompliance: number;
}

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          className={`text-xl transition ${n <= value ? 'text-amber-400' : 'text-gray-300 hover:text-amber-200'}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

function ReviewModal({
  shiftId,
  workerName,
  onClose,
  onSaved,
}: {
  shiftId: string;
  workerName: string;
  onClose: () => void;
  onSaved: () => void;
}) {
  const { toast } = useToast();
  const [scores, setScores] = useState<ReviewScores>({
    punctuality: 0,
    jobMatch: 0,
    communication: 0,
    workQuality: 0,
    termsCompliance: 0,
  });
  const [comment, setComment] = useState('');
  const [saving, setSaving] = useState(false);

  const allFilled = Object.values(scores).every((v) => v > 0);

  const handleSubmit = async () => {
    if (!allFilled) { toast('Оцените все 5 критериев', 'error'); return; }
    setSaving(true);
    try {
      await apiClient.post(`/shifts/${shiftId}/review`, { ...scores, comment: comment || undefined });
      toast('Оценка сохранена', 'success');
      onSaved();
    } catch {
      toast('Ошибка сохранения оценки', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative z-10 mx-4 w-full max-w-md rounded-modal border border-gray-200 bg-white p-6 shadow-xl">
        <h3 className="mb-1 text-lg font-semibold text-gray-900">Оценить работника</h3>
        <p className="mb-4 text-sm text-gray-500">{workerName}</p>

        <div className="space-y-4">
          {REVIEW_CRITERIA.map(({ key, label }) => (
            <div key={key} className="flex items-center justify-between gap-4">
              <span className="text-sm text-gray-700">{label}</span>
              <StarRating value={scores[key]} onChange={(v) => setScores((s) => ({ ...s, [key]: v }))} />
            </div>
          ))}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Комментарий (необязательно)
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              maxLength={4000}
              placeholder="Поделитесь впечатлением..."
              className="w-full rounded-input border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-input border border-gray-300 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
          >
            Отмена
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving || !allFilled}
            className="flex-1 rounded-input bg-primary-500 py-2.5 text-sm font-semibold text-white hover:bg-primary-600 disabled:opacity-50"
          >
            {saving ? 'Сохраняем...' : 'Сохранить'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Shift Card ─────────────────────────────────────────────────────────────

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  PENDING: { label: 'Ожидает', color: 'bg-gray-100 text-gray-600' },
  ACTIVE: { label: 'Идёт сейчас', color: 'bg-blue-100 text-blue-700' },
  COMPLETED: { label: 'Завершена', color: 'bg-green-100 text-green-700' },
  FAILED: { label: 'Не выполнена', color: 'bg-red-100 text-red-700' },
  CANCELLED: { label: 'Отменена', color: 'bg-gray-100 text-gray-500' },
  DISPUTED: { label: 'Спорная', color: 'bg-amber-100 text-amber-700' },
};

function ShiftCard({
  shift,
  currentUserId,
  onConfirm,
  onReview,
  onPay,
  confirmingId,
  payingId,
}: {
  shift: Shift;
  currentUserId: string;
  onConfirm: (id: string) => void;
  onReview: (shift: Shift) => void;
  onPay: (id: string) => void;
  confirmingId: string | null;
  payingId: string | null;
}) {
  const st = STATUS_MAP[shift.status] ?? { label: shift.status, color: 'bg-gray-100 text-gray-600' };
  const worker = shift.booking.worker;
  const workerName = worker
    ? `${worker.firstName} ${worker.lastName}`.trim() || 'Работник'
    : 'Работник';
  const vacancy = shift.booking.linkedVacancy;
  const payment = shift.payments[0];

  const dateStr = vacancy?.dateStart
    ? new Date(vacancy.dateStart).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })
    : shift.booking.date
    ? new Date(shift.booking.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })
    : null;

  const canConfirm = ['ACTIVE', 'PENDING', 'DISPUTED'].includes(shift.status) && !shift.employerConfirmed;
  const canPay = shift.status === 'COMPLETED' && (!payment || payment.status === 'FAILED');
  const isPaid = payment?.status === 'COMPLETED';
  const alreadyReviewed = shift.reviews.some((r) => r.reviewerId === currentUserId);
  const canReview = shift.status === 'COMPLETED' && !alreadyReviewed;

  return (
    <div className="rounded-card border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100">
            {worker?.photoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={worker.photoUrl} alt="" className="h-10 w-10 rounded-full object-cover" />
            ) : (
              <User className="h-5 w-5 text-gray-400" />
            )}
          </div>
          <div className="min-w-0">
            <p className="font-medium text-gray-900">{workerName}</p>
            <p className="truncate text-sm text-gray-500">
              {vacancy?.title ?? shift.booking.location ?? 'Смена'}
            </p>
          </div>
        </div>
        <span className={`shrink-0 rounded-badge px-2.5 py-0.5 text-xs font-medium ${st.color}`}>
          {st.label}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap gap-3 text-xs text-gray-500">
        {dateStr && (
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" /> {dateStr}
          </span>
        )}
        {isPaid && (
          <span className="flex items-center gap-1 text-green-600">
            <CheckCircle className="h-3.5 w-3.5" /> Оплачено
          </span>
        )}
        {payment && !isPaid && payment.status !== 'FAILED' && (
          <span className="flex items-center gap-1 text-amber-600">
            <Clock className="h-3.5 w-3.5" /> Оплата обрабатывается
          </span>
        )}
      </div>

      {shift.status === 'DISPUTED' && (
        <div className="mt-3 flex items-start gap-2 rounded-input border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-700">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>Спорная ситуация. Администратор рассматривает обращение.</span>
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {canConfirm && (
          <button
            onClick={() => onConfirm(shift.id)}
            disabled={confirmingId === shift.id}
            className="rounded-input bg-primary-500 px-4 py-1.5 text-xs font-semibold text-white hover:bg-primary-600 disabled:opacity-50"
          >
            {confirmingId === shift.id ? 'Подтверждаем...' : 'Подтвердить завершение'}
          </button>
        )}

        {canPay && (
          <button
            onClick={() => onPay(shift.id)}
            disabled={payingId === shift.id}
            className="flex items-center gap-1.5 rounded-input bg-emerald-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
          >
            <CreditCard className="h-3.5 w-3.5" />
            {payingId === shift.id ? 'Перенаправляем...' : 'Оплатить'}
          </button>
        )}

        {canReview && (
          <button
            onClick={() => onReview(shift)}
            className="flex items-center gap-1.5 rounded-input border border-amber-300 px-4 py-1.5 text-xs font-semibold text-amber-700 hover:border-amber-400 hover:bg-amber-50"
          >
            <Star className="h-3.5 w-3.5" /> Оценить работника
          </button>
        )}
      </div>

      {!canConfirm && shift.status === 'ACTIVE' && shift.employerConfirmed && (
        <p className="mt-2 text-xs text-gray-400">
          ✓ Вы подтвердили. Ожидаем подтверждения работника.
        </p>
      )}
    </div>
  );
}

function EmptyState({ tab }: { tab: string }) {
  const messages: Record<string, string> = {
    active: 'Нет активных смен',
    completed: 'Нет завершённых смен',
    needs_payment: 'Нет смен, ожидающих оплаты',
  };
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Briefcase className="mb-4 h-12 w-12 text-gray-200" />
      <p className="text-sm text-gray-500">{messages[tab] ?? 'Нет смен'}</p>
    </div>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────

const TABS = [
  { key: 'active', label: 'Активные' },
  { key: 'completed', label: 'Завершённые' },
  { key: 'needs_payment', label: 'Требуют оплаты' },
] as const;

type Tab = (typeof TABS)[number]['key'];

export default function EmployerShiftsPage() {
  const { toast } = useToast();
  const [tab, setTab] = useState<Tab>('active');
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [meta, setMeta] = useState<Meta>({ total: 0, page: 1, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const [payingId, setPayingId] = useState<string | null>(null);
  const [reviewShift, setReviewShift] = useState<Shift | null>(null);
  const [currentUserId, setCurrentUserId] = useState('');

  useEffect(() => {
    apiClient
      .get<{ data: { user: { id: string } } }>('/auth/me')
      .then((r) => setCurrentUserId(r.data.user.id))
      .catch(() => {});
  }, []);

  const loadShifts = () => {
    setLoading(true);
    apiClient
      .get<{ data: Shift[]; meta: Meta }>('/employer/shifts', { status: tab, page })
      .then((r) => {
        setShifts(r.data);
        setMeta(r.meta!);
      })
      .catch(() => toast('Ошибка загрузки смен', 'error'))
      .finally(() => setLoading(false));
  };

  useEffect(loadShifts, [tab, page]);

  const handleTabChange = (t: Tab) => { setTab(t); setPage(1); };

  const handleConfirm = async (shiftId: string) => {
    setConfirmingId(shiftId);
    try {
      const res = await apiClient.post<{ data: Shift }>(`/shifts/${shiftId}/confirm`);
      setShifts((prev) => prev.map((s) => (s.id === shiftId ? { ...s, ...res.data } : s)));
      if (res.data.workerConfirmed && res.data.employerConfirmed) {
        toast('Смена завершена! Теперь вы можете её оплатить.', 'success');
      } else {
        toast('Завершение подтверждено. Ожидаем работника.', 'success');
      }
    } catch {
      toast('Ошибка подтверждения', 'error');
    } finally {
      setConfirmingId(null);
    }
  };

  const handlePay = async (shiftId: string) => {
    setPayingId(shiftId);
    try {
      const res = await apiClient.post<{ data: { paymentUrl: string } }>('/payments/create', {
        shiftId,
      });
      window.location.href = res.data.paymentUrl;
    } catch {
      toast('Ошибка создания платежа. Попробуйте позже.', 'error');
      setPayingId(null);
    }
  };

  const handleReviewSaved = () => {
    setReviewShift(null);
    loadShifts();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Смены</h1>

      <div className="mt-6 flex gap-1 border-b border-gray-200">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => handleTabChange(t.key)}
            className={`px-4 py-2.5 text-sm font-medium transition ${
              tab === t.key
                ? 'border-b-2 border-primary-500 text-primary-600'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-28 animate-pulse rounded-card border border-gray-200 bg-gray-50" />
            ))}
          </div>
        ) : shifts.length === 0 ? (
          <EmptyState tab={tab} />
        ) : (
          <div className="space-y-4">
            {shifts.map((shift) => (
              <ShiftCard
                key={shift.id}
                shift={shift}
                currentUserId={currentUserId}
                onConfirm={handleConfirm}
                onReview={setReviewShift}
                onPay={handlePay}
                confirmingId={confirmingId}
                payingId={payingId}
              />
            ))}
          </div>
        )}

        {meta.totalPages > 1 && (
          <div className="mt-6 flex items-center justify-between">
            <span className="text-sm text-gray-500">{meta.total} смен</span>
            <div className="flex items-center gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
                className="rounded-full p-1.5 hover:bg-gray-100 disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-sm text-gray-500">{page} / {meta.totalPages}</span>
              <button
                disabled={page >= meta.totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="rounded-full p-1.5 hover:bg-gray-100 disabled:opacity-40"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {reviewShift && (
        <ReviewModal
          shiftId={reviewShift.id}
          workerName={
            reviewShift.booking.worker
              ? `${reviewShift.booking.worker.firstName} ${reviewShift.booking.worker.lastName}`.trim()
              : 'Работник'
          }
          onClose={() => setReviewShift(null)}
          onSaved={handleReviewSaved}
        />
      )}
    </div>
  );
}
