'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api/client';
import { Shield, AlertTriangle, Phone } from 'lucide-react';

interface ReliabilityScore {
  score: number;
  level: string;
  totalShifts: number;
  successfulShifts: number;
  failedShifts: number;
  strikeCount: number;
  isRestricted: boolean;
  restrictedReason: string | null;
}

const LEVEL_CONFIG: Record<
  string,
  { label: string; badgeClass: string; emoji: string }
> = {
  NEW: { label: 'Новый участник', badgeClass: 'bg-gray-100/10 text-gray-400', emoji: '⚪' },
  BEGINNER: { label: 'Начинающий', badgeClass: 'bg-yellow-500/20 text-yellow-300', emoji: '🟡' },
  TRUSTED: { label: 'Надёжный', badgeClass: 'bg-blue-500/20 text-blue-300', emoji: '🔵' },
  VERIFIED: { label: 'Проверенный', badgeClass: 'bg-green-500/20 text-green-300', emoji: '✅' },
  RESTRICTED: { label: 'Ограничен', badgeClass: 'bg-red-500/20 text-red-300', emoji: '🔴' },
};

function scoreColor(score: number): string {
  if (score >= 76) return 'bg-green-500';
  if (score >= 41) return 'bg-yellow-500';
  return 'bg-red-500';
}

export function ReliabilityWidget() {
  const [data, setData] = useState<ReliabilityScore | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get<{ data: ReliabilityScore }>('/reliability/me')
      .then((r) => setData(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="h-40 animate-pulse rounded-card border border-white/5 bg-white/[0.04]" />
    );
  }

  if (!data) return null;

  if (data.isRestricted) {
    return (
      <div className="rounded-card border border-red-500/30 bg-red-950/40 p-5">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
          <div>
            <p className="font-semibold text-red-200">Ваш аккаунт ограничен</p>
            {data.restrictedReason && (
              <p className="mt-1 text-sm text-red-300">Причина: {data.restrictedReason}</p>
            )}
            <p className="mt-2 text-sm text-red-300/80">
              Вы не можете откликаться на вакансии и получать приглашения до снятия ограничений
              администратором.
            </p>
            <a
              href="mailto:support@unity-event.ru"
              className="mt-3 flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300"
            >
              <Phone className="h-3.5 w-3.5" /> Обратиться в поддержку
            </a>
          </div>
        </div>
      </div>
    );
  }

  const levelCfg = LEVEL_CONFIG[data.level] ?? LEVEL_CONFIG.NEW;
  const score = Math.round(data.score);

  return (
    <div className="rounded-card border border-white/[0.08] bg-white/[0.04] p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-primary-300" />
          <span className="text-sm font-semibold text-white">Надёжность</span>
        </div>
        <span className={`rounded-badge px-2.5 py-0.5 text-xs font-medium ${levelCfg.badgeClass}`}>
          {levelCfg.emoji} {levelCfg.label}
        </span>
      </div>

      <div className="flex items-end gap-2">
        <span className="text-4xl font-bold text-white">{score}</span>
        <span className="mb-1 text-sm text-white/40">из 100</span>
      </div>

      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className={`h-full rounded-full transition-all ${scoreColor(score)}`}
          style={{ width: `${score}%` }}
        />
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
        <div className="rounded-input border border-white/5 bg-white/5 py-2">
          <div className="text-base font-semibold text-green-300">{data.successfulShifts}</div>
          <div className="text-white/40">Успешных</div>
        </div>
        <div className="rounded-input border border-white/5 bg-white/5 py-2">
          <div className="text-base font-semibold text-red-300">{data.failedShifts}</div>
          <div className="text-white/40">Провальных</div>
        </div>
        <div className="rounded-input border border-white/5 bg-white/5 py-2">
          <div
            className={`text-base font-semibold ${data.strikeCount > 0 ? 'text-amber-300' : 'text-white/60'}`}
          >
            {data.strikeCount}/3
          </div>
          <div className="text-white/40">Страйков</div>
        </div>
      </div>
    </div>
  );
}
