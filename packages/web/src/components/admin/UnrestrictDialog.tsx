'use client';

import { useState } from 'react';
import { ConfirmActionDialog } from './ConfirmActionDialog';

interface UnrestrictDialogProps {
  open: boolean;
  userName: string;
  loading?: boolean;
  onConfirm: (reason: string) => void;
  onCancel: () => void;
}

export function UnrestrictDialog({
  open,
  userName,
  loading = false,
  onConfirm,
  onCancel,
}: UnrestrictDialogProps) {
  const [reason, setReason] = useState('');
  const [reasonError, setReasonError] = useState<string | null>(null);

  const handleConfirm = () => {
    if (reason.trim().length < 3) {
      setReasonError('Укажите причину снятия ограничений');
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
      title="Снять ограничения"
      description={`Снять все ограничения с пользователя «${userName}»? Страйки будут обнулены.`}
      confirmLabel="Снять ограничения"
      variant="warning"
      loading={loading}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
    >
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Причина снятия ограничений <span className="text-red-500">*</span>
        </label>
        <textarea
          value={reason}
          onChange={(e) => {
            setReason(e.target.value);
            if (reasonError) setReasonError(null);
          }}
          rows={3}
          placeholder="Опишите причину..."
          className="w-full rounded-input border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        />
        {reasonError && <p className="text-xs text-red-600">{reasonError}</p>}
      </div>
    </ConfirmActionDialog>
  );
}
