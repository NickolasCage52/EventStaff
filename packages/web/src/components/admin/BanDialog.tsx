'use client';

import { useState } from 'react';
import { ConfirmActionDialog } from './ConfirmActionDialog';

interface BanDialogProps {
  open: boolean;
  userName: string;
  loading?: boolean;
  onConfirm: (reason: string) => void;
  onCancel: () => void;
}

export function BanDialog({ open, userName, loading = false, onConfirm, onCancel }: BanDialogProps) {
  const [reason, setReason] = useState('');
  const [reasonError, setReasonError] = useState<string | null>(null);

  const handleConfirm = () => {
    if (reason.trim().length < 10) {
      setReasonError('Укажите причину блокировки (минимум 10 символов)');
      return;
    }
    setReasonError(null);
    onConfirm(reason.trim());
  };

  const handleCancel = () => {
    setReason('');
    setReasonError(null);
    onCancel();
  };

  return (
    <ConfirmActionDialog
      open={open}
      title="Заблокировать пользователя"
      description={`Вы собираетесь заблокировать «${userName}». Пользователь будет немедленно выброшен из системы и не сможет войти.`}
      confirmLabel="Заблокировать"
      variant="danger"
      loading={loading}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
    >
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Причина блокировки <span className="text-red-500">*</span>
        </label>
        <textarea
          value={reason}
          onChange={(e) => {
            setReason(e.target.value);
            if (reasonError) setReasonError(null);
          }}
          rows={3}
          placeholder="Опишите причину блокировки (минимум 10 символов)..."
          className="w-full rounded-input border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        />
        {reasonError && <p className="text-xs text-red-600">{reasonError}</p>}
      </div>
    </ConfirmActionDialog>
  );
}
